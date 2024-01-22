'use client'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { axios } from '@/app/utils/request'

function HomeLists() {
    const [isOpen, setIsOpen] = useState(false)
    const [dialogObj, setDialogObj] = useState({
        id: '',
        name: '',
        href: '',
        imageSrc: '',
        imageAlt: "",
        price: '',
        color: '',
    })

    let [dataSource, setDataSource] = useState<any>([
        {
            id: '1',
            name: 'T恤',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "黑色T恤.",
            price: '¥35',
            color: '黑色',
        }
    ])

    // function handleListInfo() {
    //     const params = {
    //         pageNo: 1,
    //         pageSize: 10,
    //         drugName: ''
    //     }
    //     axios({
    //         url: '/eCommerce/list',
    //         method: 'get',
    //         params: params
    //     })
    //         .then((res: any) => {
    //             res = res.data || {}
    //             console.log("🚀 ~ useEffect ~ res:", res)
    //             let list = res.map((el: any, index: number) => {
    //                 const obj = {
    //                     id: index,
    //                     name: el.drugName,
    //                     href: '#',
    //                     imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    //                     imageAlt: el.drugName,
    //                     price: '¥35',
    //                     color: el.dosage,
    //                 }
    //                 return obj
    //             })
    //             setDataSource(list)

    //         })
    // }

    // // handleListInfo()


    function closeModal() {
        setIsOpen(false)
    }

    function handleProClick(product: any) {
        console.log("🚀 ~ file: homeLists.tsx:53 ~ handleProClick ~ product:", product)
        setDialogObj(product)
        setIsOpen(true)
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">热销品</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {dataSource.map((product: any) => (
                        <div key={product.id} className="group relative" onClick={() => handleProClick(product)}>
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        详情
                                    </Dialog.Title>

                                    <div className="mt-2 flex space-x-4">
                                        <div className="w-32 h32 ">
                                            <img
                                                src={dialogObj.imageSrc}
                                                alt={dialogObj.imageAlt}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="w-[400px] border p-4 rounded flex flex-col space-y-4">
                                            <div className="">
                                                <span className='mr-2'>名称:</span>
                                                <span className='text-gray-600'>{dialogObj.name}</span>
                                            </div>
                                            <div className="">
                                                <span className='mr-2'>颜色:</span>
                                                <span className='text-gray-600'>{dialogObj.color}</span>
                                            </div>
                                            <div className="">
                                                <span className='mr-2'>价格:</span>
                                                <span className='text-gray-600'>{dialogObj.price}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="mr-4 inline-flex justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium text-black hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            关闭
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
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

export default HomeLists