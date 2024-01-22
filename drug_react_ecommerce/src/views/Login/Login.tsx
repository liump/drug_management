import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { message } from 'antd';

import bgImage from 'images/bg-2.jpg'
import { HttpLogin } from '@/api/login'

export default function Login() {
    const [messageApi, contextHolder] = message.useMessage();

    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const navigate = useNavigate();
    // navigate("/session-timed-out");

    function handleUserNameChange(e: any) {
        const value = e.target.value
        setUserName(value)
    }
    function handlePasswordChange(e: any) {
        const value = e.target.value
        setUserPassword(value)
    }

    function handleSubmit() {
        console.log(userName)
        console.log(userPassword)
        if (userName && userPassword) {
            const params = {
                userName,
                userPassword
            }
            HttpLogin(params)
                .then((res: any) => {
                    res = res.data || {
                        userInfo: {},
                        token: ''
                    }

                    localStorage.setItem('pro__ecommerce__token', res.token)
                    localStorage.setItem('pro__ecommerce__userInfo', JSON.stringify(res.userInfo))

                    navigate('/home')

                })
        } else {
            messageApi.info('请检查用户名与密码!');
        }
    }

    return (
        <div className="bg-white w-screen h-screen relative">
            {contextHolder}
            <img
                src={bgImage}
                className="h-full w-full absolute object-cover object-center lg:h-full lg:w-full"
            />

            <div className="w-[600px] h-[400px] absolute top-0 bottom-0 left-0 right-0 m-auto border border-gray-400 rounded-lg bg-gray-300/70 flex flex-col">
                <h2 className="text-center my-4 text-2xl ">登 录</h2>

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
                                    value={userName}
                                    onChange={handleUserNameChange}
                                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 "
                                    placeholder="请输入账户名"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="userPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            密码:
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 ">
                                <input
                                    type="text"
                                    name="userPassword"
                                    id="userPassword"
                                    value={userPassword}
                                    onChange={handlePasswordChange}
                                    className="block flex-1 border-0 bg-white py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 "
                                    placeholder="请输入密码"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-4 flex justify-end">
                        <Link to='/register' className='no-underline'>注册</Link>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button className="w-4/5 h-10 border rounded-lg bg-indigo-500 text-white" onClick={() => handleSubmit()}>
                            登 录
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}

