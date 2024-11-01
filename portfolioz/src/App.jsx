import { useState } from 'react'
import DesktopImg from './assets/background.png'
import './App.css'
import Header from './Component/Header'
import Hero from './Component/Hero'
import { About } from './Component/About'
import { Exp } from './Component/Exp'
import { Pro } from './Component/Pro'
import { Involves } from './Component/Involves'
import Footer from './Component/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-cover bg-no-repeat w-screen h-max bg-[url("./assets/background.png")]'>
      <Header/>
      <Hero/>
      <About/>
      <Exp/>
      <Pro/>
      <Involves/>
      <Footer/>
    </div>
  )
}

export default App
