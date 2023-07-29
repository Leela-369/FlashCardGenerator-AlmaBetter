import React from 'react'
import { selectAll } from '../Redux/FlashCardSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'



export const MainGroup = () => {
const flashcards = useSelector((state) => selectAll(state));

const [showAllCards, setShowAllCards] = useState(false);

const maxVisibleCards = 6;

const handleSeeAll = () => {
  setShowAllCards(!showAllCards);
};

const displayedFlashcards = showAllCards ? flashcards : flashcards.slice(0, maxVisibleCards);
    
  return (
    <div>
      <div
       className='flex flex-wrap gap-3 ml-2'
       
       >
        {displayedFlashcards.map((flashcard, flashcardIndex) => (
            <div key={flashcardIndex}  className='flex flex-shrink-0'>
              <div className='flex flex-col items-center'>
              <img src={flashcard?.mainGroup?.groupImage?.mainImageURL} alt='' className=' w-12 h-12 rounded-full z-10 position relative top-3 shadow-md'/>
              <div className='bg-white w-72 h-48 flex flex-col space-y-3 items-center z-0'>
                <h1 className='text-[15px] font-bold mt-8'>{flashcard?.mainGroup?.groupName}</h1>
                <p className='text-[10px] text-center'>{flashcard?.mainGroup?.description} </p>
                <p className='text-[13px]'>{flashcard.termGroup.length} cards</p>
                <nav>
                <Link to={`/termGroup/${flashcardIndex}`}>
              <button className='w-36 h-8 text-red-500 text-[13px] p-1 border border-red-500'>View Cards</button>
              </Link>
              </nav>
                  </div>
                </div>
              </div>
          ))}
          </div>
              {!showAllCards && flashcards.length > maxVisibleCards && (
        <button 
         className=' text-red-500 mt-4 float-right '
        onClick={handleSeeAll}>
          See All
        </button>
      )}
    </div>
  )
}
