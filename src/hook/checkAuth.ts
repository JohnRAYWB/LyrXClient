import {GetServerSidePropsContext} from "next";
import nookies from "nookies";
import axios from "@/core/axios";
import * as Api from "@/api";

export const checkAuth = async (ctx: GetServerSidePropsContext) => {

    const {_token} = nookies.get(ctx)
    axios.defaults.headers.Authorization = `Bearer ${_token}`

    try {
        await Api.auth.getProfile()

        return {
            props: {}
        }
    } catch (e) {
        return {
            redirect: {
                destination: "/pth/auth?form=signin",
                permanent: false
            }
        }
    }
}