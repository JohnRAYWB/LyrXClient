import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import MainLayout from "@/components/screens/MainLayout/MainLayout";
import AdminToolPage from "@/components/Content/ToolsPage/AdminToolPage";

const Admin: NextPageWithLayout = () => {

    return <AdminToolPage/>
};

Admin.getLayout = (page: React.ReactNode) => <MainLayout name={'Admin Tools'}>{page}</MainLayout>

export default Admin;