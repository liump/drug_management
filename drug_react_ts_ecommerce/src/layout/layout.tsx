import React from 'react'
import { Outlet } from 'react-router-dom'
import CommonHeader from './commonHeader'

class Layout extends React.Component {
    render(): React.ReactNode {
        return (
            <>
                <CommonHeader />
                <Outlet />
                <div>
                    Footer
                </div>
            </>
        )
    }
}

export default Layout