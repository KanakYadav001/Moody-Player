import { useState } from 'react'
import MoodDetector from './Components/faceExpression'
import './App.css'
import MoodSongs from './Components/MoodSongs'

function App() {

    const [Songs,setSongs] = useState([
    
      ])
  return (
    <>
    <MoodDetector setSongs={setSongs}/>
    <MoodSongs Songs={Songs}  />
    </>
  )
}

export default App
