import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAll } from '../Redux/FlashCardSlice';
import { useParams } from 'react-router-dom';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { AiOutlineArrowLeft, AiOutlineCopy, AiOutlineDownload, AiOutlinePrinter } from 'react-icons/ai';
import { BsFacebook, BsWhatsapp } from 'react-icons/bs';
import { AiFillLinkedin, AiOutlineTwitter, AiOutlineCheck, AiOutlineShareAlt } from 'react-icons/ai';
import { CgMail } from 'react-icons/cg';
import { TfiShare } from 'react-icons/tfi';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'



export const TermGroup = () => {
    const { flashcardIndex } = useParams();
    const navigate = useNavigate();
    const flashcardId = parseInt(flashcardIndex);
    const flashcards = useSelector((state) => selectAll(state));
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showShareModal, setShowShareModal] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
  
    const totalPictures = flashcards[flashcardId]?.termGroup.length;
  
    const handleGoBack = () => {
      navigate(-1)
    }
  
    const handlePrevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + totalPictures - 1) % totalPictures);
    };
  
    const handleNextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalPictures);
    };
  
    const handleTermClick = (index) => {
      setCurrentSlide(index);
    };
  
    const handleShare = () => {
      setShowShareModal(true);
    };
  
    const handleCloseShareModal = () => {
      setShowShareModal(false);
    };
  
    const handleCopy = () => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };
  
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = flashcards[flashcardId]?.termGroup[currentSlide]?.termImage?.termImageURL;
      link.download = 'flashcard.png';
      link.click();
    };
  
    const handlePrint = () => {
      window.print();
    };
  
  
  return (
    <div   className='p-5'>
      <div>
        <div className='flex flex-row'>
          <div className='mr-3'>
            <button className='text-[15px]'  onClick={handleGoBack} >
            <AiOutlineArrowLeft />
            </button>
          </div>
          <div className='mb-4'>
            <h1 className='text-[18px] font-bold mb-3'>
            {flashcards[flashcardId]?.mainGroup?.mainGroupName}
            </h1>
            <p className='text-[13px] '>
            {flashcards[flashcardId]?.mainGroup?.mainGroupDescription}
            </p>
          </div>
        </div>

        <div className='flex flex-row space-x-3'>
          <div className='bg-white w-40 h-60'>
            <div className='border-b-2 flex justify-center'>
              <h1 className='text-[16px] mt-3 mb-3'>Flashcards</h1>
            </div>
            {flashcards[flashcardId]?.termGroup.map((term, index) => (
              <div className='text-2xl flex ml-5' key={index}>
                <h2
                  className={`${currentSlide === index ? 'text-red-500' : ''}`}
                  onClick={() => handleTermClick(index)}
                  style={{ marginTop: '3px', marginLeft: '5px', fontSize: '13px', cursor: 'pointer' }}
                >
                  {term.termGroupName}
                </h2>
              </div>
            ))}
            

          </div>

          <div className='bg-white flex flex-row w-4/5 h-80 p-20px'>
            <motion.img
              src={flashcards[flashcardId]?.termGroup[currentSlide]?.termImage?.termImageURL}
              className='ml-4 w-1/2 h-64 mt-5'
              alt='term img'

            />
            <p className='ml-4 text-[13px] w-1/2 h-72 mt-5'>
            {flashcards[flashcardId]?.termGroup[currentSlide]?.termGroupDescription}
            </p>
          </div>

          
          <div className='flex flex-col items-left space-y-3'>
            <button className='w-36 p-2 text-[15px] text-black bg-white flex items-center space-x-2' onClick={handleShare} >
            <TfiShare />
              <span className='ml-4'>Share</span>
            </button>
            <button className='w-36 p-2 text-[15px] text-black bg-white flex items-center space-x-2' onClick={handleDownload} >
            <AiOutlineDownload />
            <span className='ml-4'>Download</span>
            </button>
            <button className='w-36 p-2 text-[15px] text-black bg-white flex items-center space-x-2' onClick={handlePrint} >
            <AiOutlinePrinter />
            <span className='ml-4'>Print</span>
            </button>
          </div>
        </div>
        <div className='flex flex-row justify-center mt-3 space-x-3' onClick={handlePrevSlide}>
          <button className='text-[15px]' >
          <FaLessThan />
          </button>
          <p className='text-[13px]'>
          {currentSlide + 1} / {flashcards[flashcardId]?.termGroup?.length || 0}
          </p>
          <button className='text-[15px]' onClick={handleNextSlide} >
          <FaGreaterThan />
          </button>
        </div>
      </div>

      {showShareModal && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white w-80 h-48 p-2'>
            <button  className='text-[12px] hover:text-red-500 float-right' onClick={handleCloseShareModal} >
            <IoMdClose />
            </button>
            <h2 className='text-[15px] font-bold mt-4 ml-6'>Share</h2>
            <div className='flex flex-row'>
              <input type='text' className='w-auto p-2 text-[10px] ml-2 mt-6 mb-6 border border-grey-300' value=' https://example.com/flashcards  ' readOnly />
              <button onClick={handleCopy} className='text-[13px]'>
              {isCopied ? <AiOutlineCheck /> : <AiOutlineCopy />}
              </button>
              <button className='text-[13px]'>
              <AiOutlineShareAlt />
              </button>
            </div>
            <div className='flex flex-row space-x-5 justify-center mt-4'>
            <a href='https://www.facebook.com' target='_blank' rel='noreferrer'>
                <BsFacebook className='text-[25px] text-blue-500' />
              </a>
              <a href='https://www.whatsapp.com' target='_blank' rel='noreferrer'>
                <BsWhatsapp className='text-[25px] text-green-500' />
              </a>
              <a href='https://www.linkedin.com' target='_blank' rel='noreferrer'>
                <AiFillLinkedin className='text-[25px] text-blue-600' />
              </a>
              <a href='https://www.gmail.com' target='_blank' rel='noreferrer'>
                <CgMail className='text-[25px] text-red-500 ' />
              </a>
              <a href='https://www.twitter.com' target='_blank' rel='noreferrer'>
                <AiOutlineTwitter className='text-[25px] text-blue-300' />
              </a>

            </div>
            <div className='mt-3'></div>
          </div>
        </div>
        )}

    </div>
  );
};


