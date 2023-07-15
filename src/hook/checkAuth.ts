import {GetServerSidePropsContext} from "next";
import nookies from "nookies";
import axios from "@/core/axios";
import * as Api from "@/api";
import {useEffect, useState} from "react";
import {userDto} from "@/api/dto/user.dto";

export const checkAuth = async (ctx: GetServerSidePropsContext) => {

    const {access_token} = nookies.get(ctx)
    axios.defaults.headers.Authorization = `Bearer ${access_token}`

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