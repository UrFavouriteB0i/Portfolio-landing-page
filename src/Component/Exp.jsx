import React from 'react';

export const Exp = () => {
  return (
    <div className="pb-10">
      <div className="flex flex-col items-center pt-10 px-10 md:px-0">
        <h4 className="text-[28px] font-bold text-white md:text-[40px] lg:text-[52px]">EXPERIENCE</h4>
        <h5 className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-orange-300 to-white md:text-lg">
          DISCOVER NOW
        </h5>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0 md:space-x-8 pt-6 w-full max-w-3xl">
          <p className="font-InterBld text-[16px] md:text-[20px] text-center md:text-left">
            PT. Adhikara Wiyasa Ghani/ <span className="font-InterReg">Robotic Engineer</span>
          </p>
          <p className="font-InterBld text-[14px] md:text-[16px] text-center md:text-right">
            June 2022 - August 2023, Surabaya
          </p>
        </div>
        <div className="mt-6 font-InterReg text-justify text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed w-full max-w-3xl mx-auto">
          When I worked here, I developed Automatic Guided Vehicle (AGV) robot for logistic transport
          within industry’s sites. The program was designed with C++ and C# for its onboard user interface.
          Furthermore, MODBUS Protocols were used to communicate between server station and AGV units to
          match condition requirements and learned to assemble hardware and electrical components. Inside
          the company, I’ve also been given the chance to collaborate with a team of engineers to troubleshoot
          and resolve issues in robotic systems to increase system reliability.
          <br /><br />
          These experiences have equipped me with professional skills to develop autonomous robots that run
          seamlessly in industrial implementation. Additionally, my proficiency in Python has increased since
          this period, allowing me to create broader and scalable robotic systems, including computer vision,
          deep neural networks, and natural language processing with open-source large language models.
        </div>
        <div className="mt-6 w-full max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="font-InterReg text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40 p-2">
              Python
            </div>
            <div className="font-InterReg text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40 p-2">
              Computer Vision
            </div>
            <div className="font-InterReg text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40 p-2">
              C++
            </div>
            <div className="font-InterReg text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40 p-2">
              C#
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
