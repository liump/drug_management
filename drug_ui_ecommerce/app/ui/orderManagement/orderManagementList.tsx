'use client'
import { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ListBulletIcon, UserIcon } from '@heroicons/react/24/outline'
import { axios } from '@/app/utils/request'


export default function OrderManagementList() {
    let [userObj, setUserObj] = useState({
        userId: 'user-1',
        userName: 'liump',
        address: '深圳市宝安区xxx',
        phone: '181xxxxxxxx'
    })

    let [orderList, setOrderList] = useState<any>([
        // {
        //     id: '1',
        //     orderCode: 'order-20130103001',
        //     createTime: '2024-01-03 12:12:29',
        //     price: '¥140',
        //     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
        // }
    ])

    let [dialogObj, setDialogObj] = useState({
        id: '1',
        orderCode: 'order-20130103001',
        createTime: '2024-01-03 12:12:29',
        price: '¥140',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        orderDetails: [
            {
                id: '1',
                name: 'T恤',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                imageAlt: "黑色T恤.",
                price: '¥35',
                color: '黑色',
            },
            {
                id: '2',
                name: 'T恤',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
                imageAlt: "白色T恤.",
                price: '¥35',
                color: '白色',
            },
            {
                id: '3',
                name: 'T恤',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
                imageAlt: "白色T恤.",
                price: '¥35',
                color: '白色',
            },
            {
                id: '4',
                name: 'T恤',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
                imageAlt: "白色T恤.",
                price: '¥35',
                color: '白色',
            },
            {
                id: '5',
                name: 'T恤',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                imageAlt: "黑色T恤.",
                price: '¥35',
                color: '黑色',
            },
            {
                id: '6',
                name: 'T恤',
                href: '#',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
                imageAlt: "白色T恤.",
                price: '¥35',
                color: '白色',
            }
        ]
    })

    const [isOpen, setIsOpen] = useState(false)


    function handleOpenDialog(orderItems: any) {
        setIsOpen(true)
        setDialogObj(orderItems)
    }

    function handleCloseDialog() {
        setIsOpen(false)
    }
    useEffect(() => {
        axios({
            url: '/orderList',
            method: 'get'
        }).then(res => {
            let data = res.data || []
            // 拆分数据
            const obj: any = {}
            data.forEach((item: any) => {
                // 图片
                item.imageSrc = 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
                if (!obj[item.orderCode]) {
                    obj[item.orderCode] = {
                        orderCode: item.orderCode,
                        createTime: item.createTime,
                        price: '',
                        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                        orderDetails: [item]
                    }
                } else {
                    obj[item.orderCode].orderDetails.push(item)
                }
            })
            // 总价计算
            for (const key in obj) {
                obj[key].price = obj[key].orderDetails.reduce((pre: number, next: any) => pre + parseFloat(next.price), 0)
            }
            // 构造数据
            const _list: any = []
            for (const key in obj) {
                _list.push(obj[key])
            }
            // console.log('_list', _list)
            setOrderList(_list)
        })
    }, [])

    return (
        <div className="">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">订单管理</h2>
                {
                    orderList.map((orderItems: any, index: number) => (
                        <div key={index} className="border rounded-md w-md mt-8 p-4 flex space-x-4 hover:border-cyan-400 cursor-pointer" onClick={() => handleOpenDialog(orderItems)}>
                            <div className="w-32 h32 flex justify-center items-center">
                                <img
                                    src={orderItems.imageSrc}
                                    className="h-32 w-32 object-cover object-center "
                                />
                            </div>
                            <div className="flex-1  p-4 flex flex-col space-y-4">
                                <div className="flex space-x-4">
                                    <span>订单编号:</span>
                                    <span className="text-gray-400">
                                        {orderItems.orderCode}
                                    </span>
                                </div>
                                <div className="flex space-x-4">
                                    <span>创建时间:</span>
                                    <span className="text-gray-400">
                                        {orderItems.createTime}
                                    </span>
                                </div>
                                <div className="flex space-x-4">
                                    <span>订单总额:</span>
                                    <span className="text-gray-400">
                                        ¥ {orderItems.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={handleCloseDialog}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        订单详情
                                    </Dialog.Title>

                                    <div className="mt-4">
                                        <div className="w-[600px] border p-4 rounded-md flex flex-col space-y-4">
                                            <div className="">
                                                <span className='mr-2'>订单编号:</span>
                                                <span className='text-gray-600'>{dialogObj.orderCode}</span>
                                            </div>
                                            <div className="">
                                                <span className='mr-2'>创建时间:</span>
                                                <span className='text-gray-600'>{dialogObj.createTime}</span>
                                            </div>
                                            <div className="">
                                                <span className='mr-2'>订单总额:</span>
                                                <span className='text-gray-600'>¥ {dialogObj.price}</span>
                                            </div>
                                            <div className="">
                                                <span className='mr-2'>订单商品:</span>

                                            </div>
                                            <div className="w-full overflow-auto flex space-x-4">
                                                {
                                                    dialogObj.orderDetails.map(orderDetailsItem => (
                                                        <img key={orderDetailsItem.id} src={orderDetailsItem.imageSrc}
                                                            className='w-44 h-44 mb-4 border rounded-md inline-block object-cover object-center'>
                                                        </img>
                                                    ))
                                                }
                                            </div>

                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="mr-4 inline-flex justify-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-blue-100 "
                                            onClick={handleCloseDialog}
                                        >
                                            关闭
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 "
                                            onClick={handleCloseDialog}
                                        >
                                            确认
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}