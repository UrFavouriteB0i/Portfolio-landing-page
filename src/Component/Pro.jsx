import React from 'react'

export const Pro = () => {
  return (
    <div className='pb-10'>
        <div className='flex flex-col items-center pt-20'>
            <h4>PROJECTS</h4>
            <h5 className='text-transparent bg-clip-text bg-gradient-to-r from-purple-900 from-10% via-orange-300 via-50% to-white to-80%'>DISCOVER NOW</h5>
            <div className='container mx-auto'>
                <div className='grid grid-cols-2 grid-rows-2 grid-flow-col gap-row-1 gap-4 mt-16 mx-56'>
                    <div className='grid grid-cols-2 items-center'>
                        <div>
                            <img className='mix-blend-luminosity w-56 ml-8'src='./image 2.png'>
                            </img>
                        </div>
                        <div className='font-InterBld text-[14px]'>EC Brain Detection <span className='font-InterMed text-[12px]'><br></br>Developed an early cancer detection on brain using Faster R-CNN Model with 98% classification result</span></div>                    
                    </div>
                    <div className='grid grid-cols-2 items-center'>
                        <div>
                            <img className='mix-blend-luminosity w-56 ml-8'src='./image 3.png'>
                            </img>
                        </div>
                        <div className='font-InterBld text-[14px]'>Mediscript<span className='font-InterMed text-[12px]'><br></br> Developed Clinician Assistant to ease administrative and patient management with LLAMA 3 LLM</span></div>                    
                    </div>
                    <div className='grid grid-cols-2 items-center'>
                        <div>
                        <img className='mix-blend-luminosity w-56 ml-8'src='./image 4.png'>
                        </img>
                        </div>
                        <div className='font-InterBld text-[14px]'>Defect Inspector<span className='font-InterMed text-[12px]'><br></br>Designed and developed defect inspection sytem for inner surface of Recorder / Block flute instrument </span></div>                    
                    </div>
                    <div className='grid grid-cols-2 items-center'>
                        <div>
                        <img className='mix-blend-luminosity w-56 ml-8'src='./image 5.png'>
                        </img>
                        </div>
                        <div className='font-InterBld text-[14px]'>e-skincare chatbot<span className='font-InterMed text-[12px]'><br></br>Developed Skincare e-commerce chatbot to guide product choices, matched with user complexion using Falcon 180B LLM</span></div>                    
                    </div>
                </div>
            </div>
        </div>
        <section className='container pt-10 px-10 mx-0 min-w-full flex flex-col items-center'>
            <a
            href="https://github.com/UrFavouriteB0i?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="font-InterReg hover:text-xl text-center rounded-full w-[400px] h-14 bg-transparent hover:bg-slate-800 text-white flex items-center justify-center border hover:border-violet-800 transition-all ease-in-out duration-300"
            >
            More projects
            </a>
        </section>
    </div>
  )
}
