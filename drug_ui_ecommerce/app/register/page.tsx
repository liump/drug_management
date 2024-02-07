'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { axios } from '@/app/utils/request.js'
import { message } from 'antd';

export default function Page() {

    const [messageApi, contextHolder] = message.useMessage();

    const [form, setForm] = useState({
        userName: '',
        userPassword: '',
        role: 'user'
    })

    const router = useRouter()

    function handleUserNameChange(e: any) {
        setForm({
            ...form,
            userName: e.target.value
        })
    }
    function handleUserPasswordChange(e: any) {
        setForm({
            ...form,
            userPassword: e.target.value
        })
    }
    function handleRegister() {
        axios({
            url: '/user',
            method: 'post',
            data: form
        }).then((res: any) => {
            console.log("🚀 ~ handleRegister ~ res:", res)
            if (res.code === 200) {
                messageApi.info('注册成功, 即将返回登录页.')
                setTimeout(() => {
                    router.push('/login')
                }, 2000)
            }
        })
    }


    return (
        <div className="bg-white w-screen h-screen relative">
            {contextHolder}
            <img
                src='/image/bg-2.jpg'
                className="h-full w-full absolute object-cover object-center lg:h-full lg:w-full"
            />

            <div className="w-[600px] h-[400px] absolute top-0 bottom-0 left-0 right-0 m-auto border border-gray-400 rounded-lg bg-gray-300/70 flex flex-col">
                <h2 className="text-center my-4 text-2xl ">注 册</h2>

                <div className="border flex-1 m-4 mt-0 p-4">
                    <div className="">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            账户名:
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 "
                                    placeholder="请输入账户名"
                                    value={form.userName}
                                    onChange={handleUserNameChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            密码:
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 "
                                    placeholder="请输入密码"
                                    value={form.userPassword}
                                    onChange={handleUserPasswordChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-4 flex justify-end">
                        <Link href='/login'>登录</Link>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button className="w-4/5 h-10 border rounded-lg bg-indigo-500 text-white" onClick={() => handleRegister()}>
                            注 册
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}