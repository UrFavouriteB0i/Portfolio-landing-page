import React from 'react';

export const About = () => {
  return (
    <div className="pb-10">
      <div className="flex flex-col items-center pt-10 px-4 md:px-10">
        <h4 className="text-[28px] font-bold text-white md:text-[40px] lg:text-[52px]">
          ABOUT ME
        </h4>
        <h5 className="text-sm font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-orange-300 to-white md:text-lg">
          DISCOVER NOW
        </h5>
        
        {/* Glassmorphism Container */}
        <div className="mt-6 rounded-2xl shadow-xl ring-1 ring-white/10 bg-gradient-to-tl from-slate-900/40 to-white/10 backdrop-blur-md w-full max-w-lg md:max-w-xl lg:max-w-3xl mx-auto overflow-hidden">
          <p className="text-center font-InterMed text-[14px] text-white/80 p-6 md:p-8 lg:p-10 leading-relaxed md:text-[16px] lg:text-[18px]">
            As an AI engineer, I thrive on the intricate dance between logic
            and creativity. Currently immersed in the ever-evolving world of Artificial
            Intelligence, my expertise centers around Python, JS and C++ where I applied my
            theoretical knowledge and practical skills to cutting-edge technologies.
            <br /><br />
            I build AI systems that ship. Over the past 1.5 years as an Applied AI Engineer, 
            I've designed production LLM pipelines, multimodal generation platforms, and evaluation workflows,
            reducing latency by 30% and generation costs by 28% on live systems serving thousands of users. 
            My background spans computer vision, edge inference, and enterprise deployment, 
            with a consistent focus on making AI reliable and measurable in production.
          </p>
        </div>
      </div>
    </div>
  );
};