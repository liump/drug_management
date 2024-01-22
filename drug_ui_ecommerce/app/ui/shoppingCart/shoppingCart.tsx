'use client'

import Link from 'next/link'

let products = [
    {
        id: '1',
        name: 'T恤',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "黑色T恤.",
        price: '¥35',
        color: '黑色',
    },
    // More products...
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
        imageAlt: "灰色T恤.",
        price: '¥35',
        color: '灰色',
    },
    {
        id: '4',
        name: 'T恤',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
        imageAlt: "粉色T恤.",
        price: '¥35',
        color: '粉色',
    },
]


export default function ShoppingCart() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">购物车</h2>

                <div className="border-t mt-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="flex relative py-6 border-b">
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
                                    {product.color}
                                </p>

                                <div className="text-red-400 flex justify-end absolute bottom-0 right-0 cursor-pointer">
                                    删除
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <div className="flex justify-between">
                        <span>总计</span>
                        <span>¥140</span>
                    </div>

                    <Link href='/orderSummary' className="w-full h-12 mt-14 border rounded-md flex items-center justify-center text-2xl font-medium text-white bg-indigo-500 cursor-pointer">
                        结算
                    </Link>
                </div>
            </div>
        </div>
    )
}
