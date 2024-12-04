import React from 'react'

function Hero() {
  return (
    <div className='flex flex-col items-center text-center py-8 px-14 md:py-12'>
      <section className='hero container max-w-screen-lg'>
        <img 
          className='mx-auto w-40 md:w-60' 
          src='./Head picture.png'
          alt='Profile'
        />
      </section>
      <div>
        <p className='text-center text-white font-Montblack text-[28px] md:text-[40px] lg:text-[60px]'>
          Zhilaan Rusmawan!
        </p>
        <p className='text-center text-white font-InterSemi text-[18px] md:text-[28px] -my-2'>
          I tinker robot and
          <span class='bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-orange-300 via-20% to-white to-50%'> code
            <img 
              className='inline object-scale-down h-16 w-16 animate-bounce' 
              src='./image1.png'
            />
          </span>
        </p>
        <p className='text-center text-white font-InterMed text-[20px] text-justify md:text-[18px] md:text-center md:text-balance my-4'>
          Passionate digital craftman with a focus on neural network development,
          dedicated to crafting state-of-the-art robotic system.
        </p>
      </div>
      <section className='container pb-10 px-10 mx-0 min-w-full flex flex-col items-center'>
        <a
          href="mailto:zhilaanabdrsyd@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-InterReg hover:text-xl text-center rounded-full w-60 h-14 bg-transparent hover:bg-slate-800 text-white flex items-center justify-center border hover:border-violet-800 transition-all ease-in-out duration-300"
        >
        Contact me
        </a>
      </section>
    </div>
  )
}

export default Hero