import { useState } from 'react'
import MoodDetector from './Components/faceExpression'
import './App.css'
import MoodSongs from './Components/MoodSongs'

function App() {

  return (
    <>
    <MoodDetector/>
    <MoodSongs/>
    </>
  )
}

export default App
