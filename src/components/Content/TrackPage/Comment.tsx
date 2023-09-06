import React, {useState} from 'react';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ConfigProvider, Divider, Input, notification} from "antd";
import Link from "next/link";

import styles from "@/styles/TrackPage.module.css";
import {useDeleteCommentMutation, useEditCommentMutation} from "@/store/api/TrackApi";
import {commentDto} from "@/api/dto/track.dto";
import {userDto} from "@/api/dto/user.dto";

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
        <div className={styles.commentItem}>
            <div className={styles.editButtons}>
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
                        <>
                            <EditOutlined style={{fontSize: 10}}/>
                            edited
                        </>
                        :
                        null
                }
            </div>
            <Divider style={{color: "white", border: "#343434", margin: "5px 0 10px 0"}} orientation={"left"}>
                <Link
                    href={
                        comment.user._id === user._id ?
                            `/pth/hub/profile`
                            :
                            `/pth/hub/users/${comment.user._id}`
                    }
                    className={styles.link}
                >
                    {comment.user.username}
                </Link>
            </Divider>
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
                        <button className={styles.edit} onClick={() => {
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