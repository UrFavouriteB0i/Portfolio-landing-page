import React from 'react';

export const About = () => {
  return (
    <div className="pb-10">
      <div className="flex flex-col items-center pt-10 px-10 md:px-0">
        <h4 className="text-[28px] font-bold text-white md:text-[40px] lg:text-[52px]">ABOUT ME</h4>
        <h5 className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-900 from-20% via-orange-300 via-50% to-white to-70% md:text-lg">
          DISCOVER NOW
        </h5>
        <div className="mt-6 rounded-2xl shadow-lg ring-1 ring-black/5 bg-gradient-to-tl from-slate-900/30 to-white/20 backdrop-blur-sm w-full max-w-lg md:max-w-xl lg:max-w-3xl mx-auto">
          <p className="flex h-auto text-center items-center justify-center font-InterMed text-[14px] text-white/75 p-4 leading-relaxed md:text-[16px] lg:text-[18px] lg:h-[273px]">
            As an AI engineer fresh graduate, I thrive on the intricate dance between logic
            and creativity. Currently immersed in the ever-evolving world of Artificial
            Intelligence, my expertise centers around Python, where I applied my
            theoretical knowledge and practical skills to cutting-edge technologies.
            <br /><br />
            With a dream for providing solutions for tomorrow, I eagerly explore the
            dynamic landscape of robotic system development. My exploration involves
            translating concepts into code, adapting to new technology, and constantly
            pushing the boundaries of what’s possible with collaboration.
          </p>
        </div>
      </div>
    </div>
  );
};
