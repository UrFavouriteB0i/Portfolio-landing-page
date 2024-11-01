import React from 'react'

export const Exp = () => {
  return (
    <div className='pb-10'>
        <div className='flex flex-col items-center pt-20'>
            <h4>EXPERIENCE</h4>
            <h5 className='text-transparent bg-gradient-to-r from-purple-900 from-10% via-orange-300 via-50% to-white to-80%'>DISCOVER NOW</h5>
            <div className='flex flex-row items-end justify-center space-x-28 pt-10'>
                <p className='font-InterBld text-[20px]'>PT. Adhikara Wiyasa Ghani/ <span className='font-InterReg'> Robotic Engineer</span></p>
                <p className='font-InterMed text-[18px]'>June 2022 - August 2023, Surabaya</p>
            </div>
            <div className='container w-[820px] mx-auto self-center text-justify mt-4 font-InterReg text-[18px]'>When I worked here, I developed Automatic Guided Vehicle (AGV) robot for logistic transport within industry’s sites. The program was designed with C++ and C# for its onboard user interface. Furthermore, MODBUS
                Protocols were used to communicate between server station and AGV units to match condition requirements and learned to assembled hardware and electrical components. Inside the company, I’ve also given chance to collaborate with a team of engineers to troubleshoot and resolve issues in robotic system to increase system reliability.
                <br></br><br></br>
                These experiences have equipped me with professional skills to develop autonomous robot that run seamlessly in industrial implementation. Additionally, my proficiency in Python has been increased since this period, allowing me to create broader and scalable robotic system including computer vision, deep neural network and natural language processing with open-source large language model.
            </div>
            <div className='container w-[820px] mx-auto'>
              <div className='grid grid-flow-col auto-cols-fr items-center justify-center space-x-4 pt-4'>
                <div className='font-Afacad text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40'>Python</div>
                <div className='font-Afacad text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40'>Computer Vision</div>
                <div className='font-Afacad text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40'>C++</div>
                <div className='font-Afacad text-center rounded-lg shadow-lg ring-1 ring-black/5 bg-gradient-to-br from-purple-900/30 via-orange-400/20 to-white/20 backdrop-blur-sm border border-white/40'>C#</div>
                <div> </div>
                <div> </div>
              </div>
            </div>
        </div>
    </div>
  )
}
