import React from "react";
import Link from "next/link";

export default function Card({
  price,
  description,
  title,
  onClick,
  seed,
  fontSize,
  amount,
  onChange
  }) {
return (
  <div className='border-2 border-white border-solid flex flex-col px-5 pt-8 pb-10 gap-3 w-60 hover:border-green-300'>
    <img className="rounded-lg self-center w-full" src={`https://picsum.photos/seed/${seed}/180/100`} alt="card img"></img>
    <h1 className={`text-start font-bold text-white mb-3 cursor-pointer`}
      style={{fontSize: `${fontSize}px`}}
      onClick={onClick}
      >
        {title.length > 60 ? (title.slice(0, 60) + '...') : title}
    </h1>
    <div className='flex flex-row gap-1 font-bold gap-4 items-center'>
      <p className='text-white text-18px'> ${(price*(Math.round(amount))).toFixed(2)} </p>
      <input
        className="w-10 text-white/50 text-end bg-black border-2 border-white border-solid"
        min={0}
        max={99}
        step={1}
        value={amount}
        type='number'
        onChange={onChange}/>
    </div>
    <div className='flex flex-col justify-between h-full'>
      <p className='text-white/50 text-xs mb-5 break-words'> {description.length > 200 ? (description.slice(0, 200) + '...') : description} </p>
      <div className='flex flex-col gap-2'>
        <button className='bg-green-950 self-center h-[2.75rem] w-[7.5rem] border-white border-solid border-2 text-white'>Add to cart</button>
        <Link href="#" className='text-center text-white underline'>Learn more</Link>
      </div>
    </div>
  </div>
  )
}