import React from 'react';

function Hero() {
  return (
    <div className='flex flex-col items-center text-center py-12 px-6 md:px-14 md:py-20 min-h-[80vh] justify-center'>
      {/* Profile Image Section */}
      <section className='hero container max-w-screen-lg mb-6'>
        <img 
          className='mx-auto w-36 h-36 md:w-48 md:h-48 rounded-full object-cover ring-4 ring-white/10 shadow-2xl' 
          src='./Head picture.png'
          alt='Zhilaan Rusmawan'
        />
      </section>

      {/* Hero Content */}
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-white font-Montblack text-[36px] tracking-tight md:text-[52px] lg:text-[68px] leading-tight'>
          Zhilaan Rusmawan
        </h1>
        
        <h2 className='text-white font-InterSemi text-[20px] md:text-[32px] lg:text-[38px] mt-2 leading-snug'>
          I build production AI Agents & autonomous systems that{' '}
          <span className='inline-flex items-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-orange-300 to-white'>
            ship
            <img 
              className='inline-block object-contain h-8 w-8 md:h-12 md:w-12 ml-2 animate-bounce' 
              src='./image1.png'
              alt=''
            />
          </span>
        </h2>
        
        <p className='text-white/80 font-InterMed text-[15px] md:text-[17px] lg:text-[19px] text-center text-balance my-6 leading-relaxed max-w-2xl mx-auto'>
          AI Software Engineer specializing in scalable LLM pipelines, multimodal generation architectures, and high-throughput agentic workflows that drive measurable latency and cost reductions.
        </p>
      </div>

      {/* CTA Button Section */}
      <section className='w-full mt-4 flex justify-center'>
        <a
          href="mailto:zhilaanabdrsyd@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-InterReg text-sm md:text-base text-center rounded-full px-10 h-14 bg-white/5 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center border border-white/20 hover:border-white transition-all duration-300 shadow-lg hover:shadow-violet-500/20"
        >
          Let's collaborate
        </a>
      </section>
    </div>
  );
}

export default Hero;