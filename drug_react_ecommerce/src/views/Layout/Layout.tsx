import { Route, Outlet } from 'react-router-dom'
import CommonHeader from '@/views/Common/CommonHeader'
import CommonFooter from '@/views/Common/CommonFooter'

export default function Layout() {
    return (
        <>
            <CommonHeader />

            <Outlet />

            <CommonFooter />
        </>
    )
}