import React from 'react'
import Image from 'next/image';
import loader from '../../public/my-loader.svg';

const Load = () => {
  return (
    <div 
    className='fixed flex -mt-6 ml-56'
    >
    <Image src={loader} alt="loader" className="w-[60px] h-[60px] object-contain rounded-full" width={100} height={100}/>    
  </div>
  )
}

export default Load