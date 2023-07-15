import HomePage from "../components/screens/Home/Home"
import {GetServerSidePropsContext} from "next";
import nookies from "nookies"
import React from "react";

export default function Home() {
    return <HomePage/>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const {access_token} = nookies.get(ctx)

    if(access_token) {
        return {
            redirect: {
                destination: '/pth/hub',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}