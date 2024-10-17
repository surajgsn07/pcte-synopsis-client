import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DocumentGenerator from './Doc'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import Modal from './Modal/Modal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <DocumentGenerator topic={"deforestation in the United States"} />
    <Modal/>
    <Footer/>
    </>
  )
}

export default App
