import { useState, useMemo, useRef } from 'react'
import cardObjects from "@/data/cards"
import Card from '@/components/Card';

export default function Home() {
  const [cards, setCards] = useState(cardObjects);
  const [editionIndex, setEditionIndex] = useState(null);
  const [editing, setEditing] = useState(false);

  const newCardRef = {
    title: useRef(),
    description: useRef(),
    seed: useRef(),
    price: useRef(),
    fontSize: useRef()
  }

  const addCard = () => {
    setCards([...cards, {
      title: newCardRef.title.current.value,
      description: newCardRef.description.current.value,
      seed: newCardRef.seed.current.value,
      fontSize: 24,
      price: newCardRef.price.current.value,
      amount: 1
    }])
  }

  const manageEdit = (index) => {
    if (editionIndex === index) return setEditing((prevState) => !prevState)
    setEditing(true)
    setEditionIndex(index)
  }

  const handleAmount = (e, index) => {
    e.preventDefault()
    const updateCards = [...cards]
    updateCards[index].amount = e.target.value
    setCards(updateCards)
  }

  const handleTitle = (evt) => {
    const updateCards = [...cards]
    updateCards[editionIndex].title = evt.target.value
    setCards(updateCards)
  }

  const handleFontSize = (evt) => {
    const updateCards = [...cards]
    updateCards[editionIndex].fontSize = evt.target.value
    setCards(updateCards)
  }

  const total = useMemo(() => {
    return cards.reduce((accumulator, currentItem) => {
      accumulator.totalAmount += Number(currentItem.amount);
      accumulator.totalPrice += Number(currentItem.price) * Number(currentItem.amount);
      return accumulator;
    }, { totalAmount: 0, totalPrice: 0 });
  }, [cards])

  return (
    <div className='bg-black min-h-screen min-w-screen text-white flex flex-col justify-center items-center py-10'>
      <div className='w-full text-white flex flex-row text-black justify-center gap-10'>
        <div className={`flex flex-col gap-3 ${editing ? '' : 'hidden'}`}>
          <h1 className='font-bold text-lg text-white'>Edit selected card</h1>
          <input className="px-1 rounded-sm text-black" type='text' value={cards[editionIndex]?.title} onChange={handleTitle}/>
          <input className="px-1 rounded-sm text-black" type='number' min={0} value={cards[editionIndex]?.fontSize} onChange={handleFontSize}/>
        </div>
        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-lg text-white'>Add new card</h1>
          <input className="px-1 rounded-sm" type='text' ref={newCardRef.title} placeholder='Title'/>
          <textarea className="px-1 rounded-sm" ref={newCardRef.description} placeholder='Description'/>
          <input className="px-1 rounded-sm" type='text' ref={newCardRef.seed} placeholder='Seed... can be whatever'/>
          <input className="px-1 rounded-sm" type='number' ref={newCardRef.price} min={0} placeholder='Price'/>
          <button className='bg-white w-12 self-center text-black' onClick={addCard}> Add </button>
        </div>
        <div className='flex flex-col gap-3'>
          <h1 className='font-bold text-lg text-white'>Total amount of items: {total.totalAmount}</h1>
          <h1 className='font-bold text-lg text-white'>Total price of items: {total.totalPrice.toFixed(3)}</h1>
        </div>
      </div>
      <div className='px-2 py-5 grid gap-3 gris-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {cards.map((card, index) =>
          <Card
            key={index}
            price={card.price}
            description={card.description}
            title={card.title}
            seed={card.seed}
            fontSize={card.fontSize}
            amount={card.amount}
            onChange={(evt) => {handleAmount(evt, index)}}
            onClick={() => {
              manageEdit(index)
            }}
          />)}
      </div>
    </div>
  )
}
