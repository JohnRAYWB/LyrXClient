import React from 'react';
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {useFetchUserByIdQuery} from "@/store/api/UserApi";
import styles from "@/components/Content/ProfilePage/styles/ProfilePage.module.css";
import {LoadingOutlined} from "@ant-design/icons";
import UserCollectionHeader from "@/components/Content/UserCollectionPage/UserCollectionHeader";

interface CollectionParam {
    userId: string
}

const UserCollection: NextPageWithLayout<CollectionParam> = ({userId}) => {

    const {data: user, isLoading} = useFetchUserByIdQuery(userId)

    if(isLoading) {
        return (
            <div className={styles.fetchingWarn}>
                <p>Fetching data... Wait a sec</p>
                <LoadingOutlined/>
            </div>
        )
    }

    return (
        <div>
            <UserCollectionHeader user={user} type={'user'}/>
        </div>
    );
};

UserCollection.getLayout = (page: React.ReactNode) => <MainLayout name={'Collection'}>{page}</MainLayout>

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if(!access_token) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        return {
            props: {
                userId: ctx.params.id
            }
        }
    } catch (e) {
        console.log(e)
    }
})

export default UserCollection;