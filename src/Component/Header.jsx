import React from 'react'

function Header() {
  return (
    <div className='flex items-center h-[100px] justify-between text-white pt-20 px-10 pb-20 backdrop-blur-sm sticky top-0'>
      <div className='flex flex-col -space-y-4 text-left py-10'>
        <div className='font-IBM text-[40px] md:px-10'>ZHLN</div>
        <div className='font-Afacad text-[18px] space-y-0 px-4 md:px-14'>RUSMAWAN</div>
      </div>
      <a className='cursor-pointer hidden md:flex font-InterReg text-[24px] px-10 hover:scale-110 hover:font-InterSemi transition-all ease-in-out duration-500 text-white hover:text-white' href="mailto:zhilaanabdrsyd@gmail.com">
        Contact
      </a>
    </div>
  )
}
export default Header