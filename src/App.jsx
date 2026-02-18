import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {DesignerContainer} from './designer/DesignerContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DesignerContainer />
    </>
  )
}

export default App
