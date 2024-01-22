'use client'
import { useState } from "react"
import { ListBulletIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


export default function UserManagementList() {
    let [userObj, setUserObj] = useState({
        userId: 'user-1',
        userName: 'liump',
        address: '深圳市宝安区xxx',
        phone: '181xxxxxxxx'
    })

    return (
        <div className="">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
                {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">我的</h2> */}
                <div className="text-center space-y-4">
                    <div>{userObj.userName}</div>
                    <div>{userObj.address}</div>
                    <div>{userObj.phone}</div>
                </div>

                <Link href='/orderManagement' className="border rounded w-md mt-8 p-4 flex space-x-4">
                    <ListBulletIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                    <span>订单管理</span>
                </Link>
            </div>
        </div>
    )
}