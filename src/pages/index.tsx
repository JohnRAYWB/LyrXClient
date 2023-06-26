import HomePage from "../components/screens/Home/Home"
import {GetServerSidePropsContext} from "next";
import nookies from "nookies"
import axios from "@/core/axios";

export default function Home() {
    return <HomePage/>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const {_token} = nookies.get(ctx)

    if(_token) {
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