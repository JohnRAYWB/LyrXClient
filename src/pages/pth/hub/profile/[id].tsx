import React from 'react';
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import {NextPageWithLayout} from "@/pages/_app";

const UserProfile: NextPageWithLayout = () => {
    return (
        <div>
            hello another user
        </div>
    );
};

UserProfile.getLayout = (page: React.ReactNode) => {
    return <MainLayout name={'UserProfile'}>{page}</MainLayout>
}
export default UserProfile;