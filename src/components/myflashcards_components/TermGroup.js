import React from 'react';



export const TermGroup = () => {
  
  return (
    <div   className='p-5'>
      <div>
        <div className='flex flex-row'>
          <div className='mr-3'>
            <button className='text-[15px]'  /*here on click for going back */ >
              {/* left arrow icon here */}
            </button>
          </div>
          <div className='mb-4'>
            <h1 className='text-[18px] font-bold mb-3'>
              {/* here the mainGroupName */}
            </h1>
            <p className='text-[13px] '>
              {/* here the mainGroupDescription */}
            </p>
          </div>
        </div>

        <div className='flex flex-row space-x-3'>
          <div className='bg-white w-40 h-60'>
            <div className='border-b-2 flex justify-center'>
              <h1 className='text-[16px] mt-3 mb-3'>Flashcards</h1>
            </div>
            {/* here we have to display the term names in the specific flashcards of the mainGroup */}
              <div className='text-2xl flex ml-5' >
                <h2
                    /*make the styleing for the term name , the active term name must be in the red color*/
                >
                  {/* here the termName comes  */}
                </h2>
              </div>

          </div>

          <div className='bg-white flex flex-row w-4/5 h-80 p-20px'>
            <img
            /* here add the image and make a image carousel */
              src=''
              className='ml-4 w-1/2 h-64 mt-5'
              alt='term img'

            />
            <p className='ml-4 text-[13px] w-1/2 h-72 mt-5'>
              {/* here has to be termGroupDescription */}
            </p>
          </div>

            {/* Make on Click handles to every button and sutable icons before the text , to every button under this comment */}
          <div className='flex flex-col items-left space-y-3'>
            <button className='w-36 p-2 text-[15px] text-black bg-white flex items-center space-x-2' >
              
              <span className='ml-4'>Share</span>
            </button>
            <button className='w-36 p-2 text-[15px] text-black bg-white flex items-center space-x-2' >

              <span className='ml-4'>Download</span>
            </button>
            <button className='w-36 p-2 text-[15px] text-black bg-white flex items-center space-x-2' >

              <span className='ml-4'>Print</span>
            </button>
          </div>
        </div>
        {/* Make on Click handles to every button and sutable icons before the text , to every button under this comment */}
        <div className='flex flex-row justify-center mt-3 space-x-3'>
          <button className='text-[15px]' >
            {/* here  make the lessthan icon */}
          </button>
          <p className='text-[13px]'>
            {/* here it has to show the no of slices and indexes */}
          </p>
          <button className='text-[15px]' >
            {/* here make the greater than icon */}
          </button>
        </div>
      </div>

      {/* this is the modal it has to get visible when click of the share button */}
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white w-80 h-48 p-2'>
            <button  className='text-[12px] hover:text-red-500 float-right'>
              {/* here the closed icon */}
            </button>
            <h2 className='text-[15px] font-bold mt-4 ml-6'>Share</h2>
            <div className='flex flex-row'>
              <input type='text' className='w-auto p-2 text-[10px] ml-2 mt-6 mb-6 border border-grey-300' value=' https://example.com/flashcards  ' readOnly />
              <button  className='text-[13px]'>
                {/* make a copy button here */}
              </button>
              <button className='text-[13px]'>
                {/* share icon here  */}
              </button>
            </div>
            <div className='flex flex-row space-x-5 justify-center mt-4'>
              {/* here make a facebook icon, it have to open the facebook page when they click the icon */}
              
              {/* here make a facebook icon, it have to open the whatsapp page when they click the icon */}
             
              {/* here make a facebook icon, it have to open the linkDin page when they click the icon */}

              {/* here make a facebook icon, it have to open the gmail page when they click the icon */}

              {/* here make a facebook icon, it have to open the whatsapp page when they click the icon */}

            </div>
            <div className='mt-3'></div>
          </div>
        </div>

    </div>
  );
};


