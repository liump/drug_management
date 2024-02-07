'use client'

import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { axios } from '@/app/utils/request'

export default function PageHeader() {
    const [open, setOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [shoppingCartCount, setShoppingCartCount] = useState(0)

    let [userObj, setUserObj] = useState<any>({
        userId: 'user-1',
        userName: 'liump',
    })

    useEffect(() => {
        // 获取用户信息
        try {
            const userInfo = JSON.parse(localStorage.getItem('pro__ecommerce__userInfo')!)

            setUserObj({
                ...userObj,
                userId: userInfo.id,
                userName: userInfo.nickName || userInfo.userName
            })

            if (userInfo) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        } catch (error) {
            console.log("🚀 ~ useEffect ~ error:", error)
        }
    }, [])

    useEffect(() => {
        axios({
            url: '/shoppingCart',
            method: 'get'
        }).then((res: any) => {
            let data = res?.data?.data || []
            setShoppingCartCount(data.length || 0)
        })
    }, [])

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {
                                    !isLogin
                                    &&
                                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                        <div className="flow-root">
                                            <Link href="/login" className="-m-2 block p-2 font-medium text-gray-900">
                                                登录
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link href="/register" className="-m-2 block p-2 font-medium text-gray-900">
                                                注册
                                            </Link>
                                        </div>
                                    </div>
                                }

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className="relative bg-white">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <a href="#">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt=""
                                    />
                                </a>
                            </div>
                            {/* menu */}
                            <Link href="/home" className='ml-4 hover:text-blue-400'>首页</Link>

                            <div className="ml-auto flex items-center">
                                {
                                    !isLogin
                                    &&
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                        <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            登录
                                        </Link>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        <Link href="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            注册
                                        </Link>
                                    </div>
                                }

                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Link href="/shoppingCart" className="group -m-2 flex items-center p-2">
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{shoppingCartCount}</span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>

                                {/* User */}
                                <div className="ml-4 lg:ml-6">
                                    <Link href="/userManagement" className="group -m-2 flex items-center p-2">

                                        <UserIcon
                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                        <span className='ml-2'>欢迎您! {userObj.userName}</span>
                                </Link>


                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

        </div >
    )
}
