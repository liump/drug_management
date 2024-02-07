'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'

import { axios } from '@/app/utils/request'
import { message } from 'antd';

const products: any = [
    // {
    //     id: '1',
    //     name: 'T恤',
    //     href: '#',
    //     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    //     imageAlt: "黑色T恤.",
    //     price: '¥35',
    //     approvalNumber: '黑色',
    // },
]


export default function OrderSummaryForm() {
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
    let [productList, setProductList] = useState(products)

    let [userObj, setUserObj] = useState<any>({
        userId: 'user-1',
        userName: 'liump',
    })

    // 获取页面数据(购物车中的商品)
    useEffect(() => {
        axios({
            url: '/shoppingCart',
            method: 'get'
        }).then(res => {
            let data = res?.data?.data || []
            console.log("🚀 ~ useEffect ~ data:", data)
            data = data.map((item: any) => {
                let obj = {
                    id: '1',
                    drugCode: '',
                    name: 'T恤',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "黑色T恤.",
                    dosage: '',
                    price: '¥35',
                    approvalNumber: '黑色',
                }

                obj = {
                    ...obj,
                    id: item.id,
                    drugCode: item.drugCode,
                    name: item.drugName,
                    imageAlt: item.drugName,
                    dosage: item.dosage,
                    price: item.price || 0,
                    approvalNumber: item.approvalNumber
                }

                return obj
            })

            setProductList(data)
        })
    }, [])

    // 获取用户信息
    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('pro__ecommerce__userInfo')!)

            setUserObj({
                ...userObj,
                userId: userInfo.id,
                userName: userInfo.nickName || userInfo.userName
            })

        } catch (error) {
            console.log("🚀 ~ useEffect ~ error:", error)
        }
    }, [])

    const totalPrice = useMemo(() => {
        return productList.reduce((pre: number, next: any) => pre + parseFloat(next.price), 0)
    }, [productList])

    function handleAddOrder() {
        const params = productList.map((item: any) => {
            return {
                drugCode: item.drugCode,
                price: item.price
            }
        })
        console.log(params)
        axios({
            url: '/order',
            method: 'post',
            data: { list: params }
        }).then((res: any) => {
            messageApi.info(res.msg)
            setTimeout(() => {
                router.push('/home')
            }, 2000)
        })
    }

    return (
        <div className="bg-white">
            {contextHolder}
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-2">订单汇总</h2>

                {/* form */}
                <form className='border rounded bg-slate-100 w-full p-4 '>
                    <h2 className='text-xl'>
                        信息
                    </h2>

                    <div className='ml-4 text-slate-600'>
                        {userObj.userName}
                    </div>

                    <h2 className='text-xl my-4'>
                        订单信息
                    </h2>
                    <div className="border rounded bg-white gap-y-10 p-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {productList.map((product: any, index: number) => (
                            <div key={index} className="flex relative py-6 border-b">
                                <div className="aspect-h-1 aspect-w-1 h-32 w-32 mr-6 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 ">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="h-32 w-32 object-cover object-center "
                                    />
                                </div>
                                <div className="relative w-full ">
                                    <div className="flex justify-between">
                                        <h3 className="text-gray-700 text-lg">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-900">
                                            {product.price}
                                        </p>
                                    </div>

                                    <p className="my-2 text-sm text-gray-500">
                                        剂型: {product.dosage}
                                    </p>

                                    <p className="my-2 text-sm text-gray-500">
                                        {product.approvalNumber}
                                    </p>

                                    <div className=" flex justify-end absolute bottom-0 right-0 cursor-pointer">
                                        <span className='mr-4'>数量: </span>
                                        <span className='text-blue-400'>1</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* summary */}
                        <div className=' bg-white p-4 border-b -mx-4'>
                            <div className='mt-2 flex justify-between items-center'>
                                <span>总计</span>
                                <span>¥ {totalPrice}</span>

                            </div>
                        </div>

                        {/* confirm */}
                        <div className=' w-auto h-12 rounded text-white flex justify-center items-center text-lg font-bold bg-indigo-500 m-4 cursor-pointer' onClick={() => handleAddOrder()}>
                            确认订单
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
