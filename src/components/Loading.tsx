import React from 'react'
import Image from 'next/image';
import loader from '../../public/my-loader.svg';
import loading from '../../public/loading.svg';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <Image src={loading} alt="loader" className="w-[100px] h-[100px] object-contain rounded-full" width={100} height={100}/>
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center"><br /> Please wait...</p>
    </div>
  )
}

export default Loading