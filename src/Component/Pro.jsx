import React from 'react'

export const Pro = () => {
  return (
    <div className='pb-10'>
      <div className='flex flex-col items-center pt-20 xl:px-40 md:px-20 sm:px-0'>
        <h4>PROJECTS</h4>
        <h5 className='text-transparent bg-clip-text bg-gradient-to-r from-purple-900 from-10% via-orange-300 via-50% to-white to-80%'>DISCOVER NOW</h5>
        
        <div className='container mx-auto px-4 xl:px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-y-8 gap-x-4 xl:mx-20 mt-8'>
            {/* Project 1 */}
            <div className='flex items-center space-x-2'>
              <img className='mix-blend-luminosity w-32 sm:w-40 md:w-56' src='./image 2.png' alt='EC Brain Detection' />
              <div className='font-InterBld text-sm sm:text-base w-full max-w-xs'>
                <p>EC Brain Detection</p>
                <span className='font-InterMed text-xs sm:text-sm block'>
                  Developed an early cancer detection on brain using Faster R-CNN Model with 98% classification result
                </span>
              </div>
            </div>

            {/* Project 2 */}
            <div className='flex items-center space-x-2'>
              <img className='mix-blend-luminosity w-32 sm:w-40 md:w-56' src='./image 3.png' alt='Mediscript' />
              <div className='font-InterBld text-sm sm:text-base w-full max-w-xs'>
                <p>Mediscript</p>
                <span className='font-InterMed text-xs sm:text-sm block'>
                  Developed Clinician Assistant to ease administrative and patient management with LLAMA 3 LLM
                </span>
              </div>
            </div>

            {/* Project 3 */}
            <div className='flex items-center space-x-2'>
              <img className='mix-blend-luminosity w-32 sm:w-40 md:w-56' src='./image 4.png' alt='Defect Inspector' />
              <div className='font-InterBld text-sm sm:text-base w-full max-w-xs'>
                <p>Defect Inspector</p>
                <span className='font-InterMed text-xs sm:text-sm block'>
                  Designed and developed defect inspection system for inner surface of Recorder / Block flute instrument
                </span>
              </div>
            </div>

            {/* Project 4 */}
            <div className='flex items-center space-x-2'>
              <img className='mix-blend-luminosity w-32 sm:w-40 md:w-56' src='./image 5.png' alt='e-skincare chatbot' />
              <div className='font-InterBld text-sm sm:text-base w-full max-w-xs'>
                <p>e-skincare chatbot</p>
                <span className='font-InterMed text-xs sm:text-sm block'>
                  Developed Skincare e-commerce chatbot to guide product choices, matched with user complexion using Falcon 180B LLM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <section className='container pt-10 px-10 mx-0 min-w-full flex flex-col items-center'>
        <a
          href="https://github.com/UrFavouriteB0i?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="font-InterReg hover:text-xl text-center rounded-full w-[250px] sm:w-[300px] md:w-[400px] h-14 bg-transparent hover:bg-slate-800 text-white flex items-center justify-center border hover:border-violet-800 transition-all ease-in-out duration-300"
        >
          More projects
        </a>
      </section>
    </div>
  )
}
