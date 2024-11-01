import React from 'react'

export const About = () => {
  return (
    <div className='pb-10'>
        <div className='flex-col items-center pt-20'>
          <h4>ABOUT ME</h4>
          <h5 className='text-transparent bg-clip-text bg-gradient-to-r from-purple-900 from-40% via-orange-300 via-50% to-white to-55%'>DISCOVER NOW</h5>
          <div className="mx-auto aspect-video w-[800px] h-[280px] mt-6 rounded-3xl shadow-lg ring-1 ring-black/5 bg-gradient-to-tl from-slate-900/30 to-white/20 backdrop-blur-sm">
            <p className='flex h-[273px] text-center items-center justify-center font-InterMed text-[18px] text-white/75  '>
              As an AI engineer fresh graduate, I thrive on the intricate dance between logic<br></br>and creativity. 
              Currently immersed in the ever-evolving world of Artificial<br></br>Intelligence,my expertise centers around Python, where I applied my<br></br>theoretical knowledge and practical skills to cutting-edge technologies.<br></br><br></br>With a dream for providing solutions for tomorrow, I eagerly explore the<br></br> dynamic landscape of robotic system development. My Exploration involves<br></br>translating concept into code, adapting to new technology, and constantly<br></br> pushing the boundaries of what’s possible with collaboration.
            </p>              
          </div>
        </div>
    </div>
  )
}
