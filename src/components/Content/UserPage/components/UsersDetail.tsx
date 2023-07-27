import React from 'react';

import styles from "../styles/User.module.css";
import {userDto} from "@/api/dto/user.dto";

interface UserParam {
    user: userDto
}

const UsersDetail: React.FC<UserParam> = ({user}) => {

    return (
        <div className={styles.detailedInfoContainer}>
            <div className={styles.detailedList}>
                <p className={styles.detailedListTitle}>Comments</p>
                {
                    user.comments.length !== 0 ?
                        <div>
                            {user.comments.map(comment =>
                                <p key={comment._id} className={styles.detailedListEntity}>
                                    {comment.text}
                                </p>
                            )}
                        </div>
                        :
                        <p className={styles.emptyListTitle}>User don't have comments</p>
                }
            </div>
            <div className={styles.detailedList}>
                <p className={styles.detailedListTitle}>Reasons</p>
                <div className={styles.detailedCounter}>
                    <p className={styles.detailedCounterTitle}>Total ban count: </p>
                    <p className={styles.detailedCounterScore}>{user.banReason.length}</p>
                </div>
                {
                    user.banReason.length !== 0 ?
                        <div>
                            {user.banReason.map((reason, index) => {
                                    if (reason !== '') {
                                        return <p key={index}
                                                  className={styles.detailedListEntity}>{reason}</p>
                                    }
                                }
                            )}
                        </div>
                        :
                        <p className={styles.emptyListTitle}>Reason list is empty</p>
                }
            </div>
        </div>
    );
};

export default UsersDetail;