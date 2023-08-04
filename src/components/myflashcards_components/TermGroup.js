import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAll } from '../../features/flashCardSlice';
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



// this component contains the code for the term group section of myflashcards page. 
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
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalPictures );
      console.log(currentSlide)
      
    };
  
    const handleTermClick = (index) => {
      setCurrentSlide(index);
    };
  // Function to open the share modal when the "Share" button is clicked.
    const handleShare = () => {
      setShowShareModal(true);
    };
  
    const handleCloseShareModal = () => {
      setShowShareModal(false);
    };
  
    // Function to handle copying the share link to the clipboard and show a confirmation message.
    const handleCopy = () => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };

  // Function to handle download of the created flashcard
    const handleDownload = () => {
      const link = document.createElement('a');
      link.href = flashcards[flashcardId]?.termGroup[currentSlide]?.termImage?.termImageURL;
      link.download = 'flashcard.pdf';
      link.click();
    };
  
    // Function to handle print of the created flashcard
    const handlePrint = () => {
      window.print();
    };
  
  
  return (
    <div   className='p-5'>
      <div>
        <div className='flex flex-row'>
          <div className='mr-3'>
            {/* Button to go back to the previous page */}
            <button className='text-[15px]'  onClick={handleGoBack} >
            <AiOutlineArrowLeft />
            </button>
          </div>
          {/* Title and description of the current main group */}
          <div className='mb-4'>
            <h1 className='text-[18px] font-bold mb-3'>
            {flashcards[flashcardId]?.mainGroup?.mainGroupName}
            </h1>
            <p className='text-[13px] '>
            {flashcards[flashcardId]?.mainGroup?.mainGroupDescription}
            </p>
          </div>
        </div>

        {/* Flashcard Navigation and Details */}
        <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row lg:space-x-3'>
             {/* Flashcard Navigation Sidebar */}
          <div className='bg-white w-auto mb-3  h-9 sm:h-9 sm:w-full sm:h-auto md:w-full md:h-9 lg:w-40 lg:h-60'>
            <div className='hidden sm:hidden md:hidden lg:block border-b-2 flex items-center justify-center p-2'>
              <h1 className='text-[16px] mt-3 mb-3'>Flashcards</h1>
            </div>
            <div
         className='space-y-1 sm:space-y-0 sm:space-x-1 
           flex flex-row sm:flex-row md:flex-row lg:flex-col items-center justify-center'
           >
            {/* Displaying the list of term groups as clickable links */}
            {flashcards[flashcardId]?.termGroup.map((term, index) => (
              <div  key={index}
              className={`flex items-center px-2 py-1 cursor-pointer ${
                currentSlide === index ? 'text-red-500' : ''
              }`}
              onClick={() => handleTermClick(index)}
              >
                <h2
                   className={`text-sm sm:text-base ${
            currentSlide === index ? 'font-bold' : ''
          }`}
          style={{
            marginTop: '3px',
            marginLeft: '5px',
            fontSize: '13px',
            cursor: 'pointer',
          }}
                >
                  {term.termGroupName}
                </h2>
              </div>
            ))}
            
            </div>
          </div>

          {/* Flashcard Image and Description */}
          <div className='bg-white flex flex-col sm:flex-col md:flex-row lg:flex-row sm:w-full md:w-full lg:w-4/5 h-80 p-20px items-center justify-center'>
            <motion.img
              src={flashcards[flashcardId]?.termGroup[currentSlide]?.termGroupImage?.termImageURL}
              className='ml-4 w-1/2 h-64 '
              alt='term img'
              initial={{ opacity: 0, x: 100  }}
              animate={{ opacity: 1 , x: 0 }}
              exit={{opacity: 0 , x: -100}}
              transition={{duration: 1}}

            />
            <p className='ml-4 text-[13px] w-1/2 h-72 mt-5'>
            {flashcards[flashcardId]?.termGroup[currentSlide]?.termGroupDescription}
            </p>
          </div>

          
          <div className=' hidden sm:hidden md:hidden lg:block flex flex-row sm:flex-row md:flex-row lg:flex-col items-left space-y-3'>
             {/* Share Button */}
            <button className='w-36 p-2 text-[15px] text-black bg-white flex items-center space-x-2' onClick={handleShare} >
            <TfiShare />
              <span className='ml-4'>Share</span>
            </button>
             {/* Download Button */}
            <button className='w-36 p-2 text-[15px] text-black bg-white flex items-center space-x-2' onClick={handleDownload} >
            <AiOutlineDownload />
            <span className='ml-4'>Download</span>
            </button>
            {/* Print Button */}
            <button className='w-36 p-2 text-[15px] text-black bg-white flex items-center space-x-2' onClick={handlePrint} >
            <AiOutlinePrinter />
            <span className='ml-4'>Print</span>
            </button>
          </div>
        </div>
          
           {/* Previous flashcard Button */}
        <div className='flex flex-row justify-center mt-3 mb-3 space-x-3' >
          <button className='text-[15px]'onClick={handlePrevSlide} >
          <FaLessThan />
          </button>

          {/* Current flashcard index and total number of flashcards */}
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
            {/* Close button for the share modal */}
            <button  className='text-[12px] hover:text-red-500 float-right' onClick={handleCloseShareModal} >
            <IoMdClose />
            </button>
            <h2 className='text-[15px] font-bold mt-4 ml-6'>Share</h2>
            <div className='flex flex-row'>
              <input type='text' className='w-auto p-2 text-[10px] ml-2 mt-6 mb-6 border border-grey-300' value=' https://example.com/flashcards  ' readOnly />
              {/* Copy button for the share link */}
              <button onClick={handleCopy} className='text-[13px]'>
              {isCopied ? <AiOutlineCheck /> : <AiOutlineCopy />}
              </button>
              <button className='text-[13px]'>
              <AiOutlineShareAlt />
              </button>
            </div>
             {/* Social media icons for sharing */}
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

<div className='block shrink sm:flex md:flex lg:hidden flex flex-row sm:flex-row md:flex-row lg:flex-col items-center justify-center space-x-1 sm:space-x-1 md:space-x-3 lg:space-x-3'>
  {/* Share Button */}
  <button className=' w-24 sm:w-24 md:w-36 lg:w-36 p-2 text-[10px] sm:text-[10px] md:text-[15px] lg:text-[15px] text-black bg-white flex items-center space-x-2' onClick={handleShare}>
    <TfiShare />
    <span >Share</span>
  </button>
  {/* Download Button */}
  <button className=' w-24 sm:w-24 md:w-36 lg:w-36 p-2 text-[10px] sm:text-[10px] md:text-[15px] lg:text-[15px] text-black bg-white flex items-center space-x-2' onClick={handleDownload}>
    <AiOutlineDownload />
    <span >Download</span>
  </button>
  {/* Print Button */}
  <button className=' w-24 sm:w-24 md:w-36 lg:w-36 p-2 text-[10px] sm:text-[10px] md:text-[15px] lg:text-[15px] text-black bg-white flex items-center space-x-2' onClick={handlePrint}>
    <AiOutlinePrinter />
    <span >Print</span>
  </button>
</div>

        
    </div>
  );
};


