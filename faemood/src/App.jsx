import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Auth from './components/auth'
import './App.css'
import Login from './components/login'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
     <div className="App">
      {isLoggedIn ? <Login /> : <Auth />}
    </div>
    </>
  )
}

export default App
