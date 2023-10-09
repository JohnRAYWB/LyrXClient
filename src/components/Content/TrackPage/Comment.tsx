import React, {useState} from 'react';
import {DeleteOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import {ConfigProvider, Input, notification} from "antd";
import Link from "next/link";

import styles from "./styles/Comment.module.css";
import {useDeleteCommentMutation, useEditCommentMutation} from "@/store/api/TrackApi";
import {commentDto} from "@/api/dto/track.dto";
import {userDto} from "@/api/dto/user.dto";
import Image from "next/image";
import {profileImagePath} from "@/util/ImagePath";

interface CommentParam {
    comment: commentDto
    user: userDto
}

const Comment: React.FC<CommentParam> = ({comment, user}) => {

    const [editComment] = useEditCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()
    const [edit, setEdit] = useState(false)
    const [editText, setEditText] = useState(comment.text)

    const handleEdit = (e) => {
        setEditText(e.target.value)
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.userContainer}>
                    {comment.user.avatar ?
                        <Image
                            className={styles.avatar}
                            width={40}
                            height={40}
                            priority={true}
                            src={profileImagePath(comment.user)}
                            alt={'profile_logo'}
                        />
                        :
                        <UserOutlined className={styles.emptyAvatar}/>
                    }
                    <Link
                        href={
                            comment.user._id === user._id ?
                                `/pth/hub/profile`
                                :
                                `/pth/hub/users/${comment.user._id}`
                        }
                        className={styles.username}
                    >
                        {comment.user.username}
                    </Link>
                </div>
                <div className={styles.editContainer}>
                    {comment.user._id === user._id ?
                        <>
                            <EditOutlined className={styles.iconEdit} onClick={() => setEdit(true)}/>
                            <DeleteOutlined className={styles.iconDelete} onClick={() => {
                                deleteComment(comment._id)
                                notification.success({
                                    style: {backgroundColor: "#646464", width: 300},
                                    message: <p className={styles.notification}>Done!</p>,
                                    description: <p className={styles.notification}>Comment deleted</p>,
                                    placement: "bottomLeft",
                                    duration: 2
                                })
                            }}/>
                        </>
                        :
                        null
                    }
                    {
                        comment.__v !== 0 ?
                            <div className={styles.editedContainer}>
                                <EditOutlined style={{fontSize: 10}}/>
                                <p>edited</p>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
            {
                !edit ?
                    <p className={styles.comment}>{comment.text}</p>
                    :
                    <div>
                        <ConfigProvider theme={{
                            token: {
                                colorBorder: '#232323FF',
                                colorTextPlaceholder: '#404040',
                                colorPrimary: '#ff2929',
                            }
                        }}>
                            <Input className={styles.commentInput} onChange={handleEdit} defaultValue={comment.text}/>
                        </ConfigProvider>
                        <button className={styles.editButton} onClick={() => {
                            if(editText.length !== 0) {
                                editComment({cId: comment._id, text: editText})
                                notification.success({
                                    style: {backgroundColor: "#646464", width: 300},
                                    message: <p className={styles.notification}>Done!</p>,
                                    description: <p className={styles.notification}>Comment edited</p>,
                                    placement: "bottomLeft",
                                    duration: 2
                                })
                                setEdit(false)
                            } else {
                                notification.error({
                                    style: {backgroundColor: "#646464", width: 300},
                                    message: <p className={styles.notification}>Error!</p>,
                                    description: <p className={styles.notification}>Please input text</p>,
                                    placement: "bottomLeft",
                                    duration: 2
                                })
                            }
                        }}>
                            Edit
                        </button>
                    </div>
            }
        </div>
    );
};

export default Comment