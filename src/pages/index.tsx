import React from "react";
import {wrapper} from "@/store/store";
import {parseCookies} from "nookies"

import HomePage from "../components/screens/Home/Home"

export default function Home() {
    return <HomePage/>
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {

    try {
        const {access_token} = parseCookies(ctx)

        if(access_token) {
            return {
                redirect: {
                    destination: '/pth/hub',
                    permanent: false
                }
            }
        }

    } catch (e) {
        console.log(e)
    }
})