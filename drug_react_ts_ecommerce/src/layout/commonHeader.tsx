import React from 'react'
import {
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Carousel, Image } from 'antd';
import DrugImage1 from '/images/drug_1.jpg'
import DrugImage2 from '/images/drug_2.jpg'
import DrugImage3 from '/images/drug_3.jpg'

class CommonHeader extends React.Component {
    render(): React.ReactNode {
        return (
            <div className='w-full  border border-indigo-400'>
                {/* title icon user */}
                <div className='w-full flex justify-center items-center'>
                    <div className=" w-[1200px] h-[90px] flex justify-between items-center">
                        <div className='text-3xl font-bold'>
                            shopDrug
                        </div>

                        <div className='h-full flex justify-center items-center'>
                            <div className='h-full px-4 flex justify-center items-center cursor-pointer'>
                                <ShoppingCartOutlined className='text-2xl' />
                                <span className='ml-2'>购物车</span>
                            </div>
                            <div className='px-4 h-full flex items-center cursor-pointer'>
                                <UserOutlined className='text-2xl' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* nav */}
                <div className='bg-violet-600 w-full h-[78px] flex justify-center items-center'>
                    <div className="nav w-[1200px] h-[68px] flex">
                        <div className="home h-full mx-4 ml-0 text-white flex items-center font-bold cursor-pointer">
                            首页
                        </div>
                        <div className="home h-full mx-4 text-white flex items-center font-bold cursor-pointer">
                            购物车
                        </div>
                    </div>
                </div>

                {/* Carousel */}
                <Carousel autoplay className='w-full'>
                    <div className="">
                        <img 
                            src={DrugImage1}
                            className='w-full h-full'
                        />
                    </div>
                    <div className="">
                        <img 
                            src={DrugImage2}
                            className='w-full h-full'
                        />
                    </div>
                    <div className="">
                        <img 
                            src={DrugImage3}
                            className='w-full h-full'
                        />
                    </div>
                </Carousel>

                
            </div>
        )
    }
}

export default CommonHeader