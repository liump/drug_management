'use client'

import Link from 'next/link'
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


export default function ShoppingCart() {
    const [messageApi, contextHolder] = message.useMessage();
    let [productList, setProductList] = useState(products)
    const [controlCount, setControlCount] = useState(0)

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
    }, [controlCount])

    const totalPrice = useMemo(() => {
        return productList.reduce((pre: number, next: any) => pre + parseFloat(next.price), 0)
    }, [productList])

    function handleDelete(item: any) {
        axios({
            url: '/shoppingCart',
            method: 'delete',
            data: { drugCode: item.drugCode }
        }).then(res => {
            // 操作变更后操作数加1 页面内容刷新
            setControlCount(controlCount + 1)
        })
    }

    return (
        <div className="bg-white">
            {contextHolder}
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">购物车</h2>

                <div className="border-t mt-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                                        ¥ {product.price}
                                    </p>
                                </div>

                                <p className="my-2 text-sm text-gray-500">
                                    剂型: {product.dosage}
                                </p>

                                <p className="my-2 text-sm text-gray-500">
                                    {product.approvalNumber}
                                </p>

                                <div className="text-red-400 flex justify-end absolute bottom-0 right-0 cursor-pointer" onClick={() => handleDelete(product)}>
                                    删除
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <div className="flex justify-between">
                        <span>总计</span>
                        <span>¥ {totalPrice}</span>
                    </div>

                    <Link href='/orderSummary' className="w-full h-12 mt-14 border rounded-md flex items-center justify-center text-2xl font-medium text-white bg-indigo-500 cursor-pointer">
                        结算
                    </Link>
                </div>
            </div>
        </div>
    )
}
