import React from 'react';
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies";

const Collection: NextPageWithLayout = () => {
    return (
        <div>
            collection
        </div>
    );
};

Collection.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'Collection'}>{page}</MainLayout>
}

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

    } catch (e) {
        console.log(e)
    }
})

export default Collection;