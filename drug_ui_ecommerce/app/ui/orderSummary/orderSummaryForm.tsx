'use client'

import Link from 'next/link'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
let products = [
    {
        id: '1',
        name: 'T恤',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "黑色T恤.",
        price: '¥35',
        total: 1,
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
        total: 1,
        color: '白色',
    },
    {
        id: '3',
        name: 'T恤',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
        imageAlt: "灰色T恤.",
        price: '¥35',
        total: 1,
        color: '灰色',
    },
    {
        id: '4',
        name: 'T恤',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
        imageAlt: "粉色T恤.",
        price: '¥35',
        total: 1,
        color: '粉色',
    },
]


export default function OrderSummaryForm() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-2">订单汇总</h2>

                {/* form */}
                <form className='border rounded bg-slate-100 w-full p-4 '>
                    <h2 className='text-xl'>
                        地址信息
                    </h2>
                    <div className='ml-4 text-slate-600'>
                        广东省深圳市宝安区xxx
                    </div>
                    <div className='ml-4 text-slate-600'>
                        18108637xxx
                    </div>
                    <div className='ml-4 text-slate-600'>
                        liump
                    </div>

                    <h2 className='text-xl my-4'>
                        订单信息
                    </h2>
                    <div className="border rounded bg-white gap-y-10 p-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                                <span>¥140</span>

                            </div>
                        </div>

                        {/* confirm */}
                        <Link href='#' className=' w-auto h-12 rounded text-white flex justify-center items-center text-lg font-bold bg-indigo-500 m-4 '>
                            确认订单
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}
