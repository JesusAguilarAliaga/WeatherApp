import { useState } from 'react'
import './App.css'
import WeatherStructure from './components/Weather'

function App() {
  const [image, setImage] = useState("")
  const [filter, setFilter] = useState("")
  
  
  const changeBackground = (newImage, letterIcon) => {
    setImage(newImage)
    if(letterIcon == "d") setFilter("none")
    if(letterIcon == "n") setFilter("brightness(0.5)")
  }

  return (
    <div className='app'>
      <div className='appBackground' style={{backgroundImage: `url(${image})`, filter: `${filter}`}}></div>
      <WeatherStructure background={changeBackground} cicleDay={filter} filter={filter} setFilter={setFilter}/>
    </div>
  )
}

export default App
