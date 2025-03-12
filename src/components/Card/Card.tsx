import { useEffect } from 'react'

interface CardInfo {
  name: string;
  desc: string;
  quantity: number;
  key: number;
}

const Card: React.FC<CardInfo> = ({ name, desc, quantity, key }) => {

  return (
    <div className='card w-full flex items-center justify-center' key={key}>
      <div className='w-3/4 bg-blue-500 flex flex-row h-32'>
        <div className='card-name w-1/4 flex justify-center items-center'>{name}</div>
        <div className='card-description flex justify-center items-center w-1/2 text-sm'>{desc}</div>
        <div className='card-quantity flex justify-center items-center w-1/6'>{quantity}</div>
      </div>
    </div>
  )
}

export default Card;