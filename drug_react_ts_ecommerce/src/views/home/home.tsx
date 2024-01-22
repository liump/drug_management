import { Component, ReactNode } from 'react'

class Home extends Component {
    render(): ReactNode {
        return (
            <>
                {/* list */}
                <div className="list w-full bg-rose-300 flex justify-center items-center">
                    <div className='w-[1200px] h-[200px] bg-white'>
                        list
                    </div>
                </div>
            </>
        )
    }
}

export default Home