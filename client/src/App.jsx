import { useState } from 'react'
import CanvasModel from './canvas'
import Customizer from './pages/Customizer'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='app transition-all ease-in '>
     <Home />
     <CanvasModel />
     <Customizer />
    
    </main>
  )
}

export default App
