import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AllBooks from './components/All-Books'
import AddBook from './components/Add-Book'
import FindBook from './components/Find-Book'

function App() {
  return (
    <>
      <h1>Add a new Book</h1>
      <AddBook onAdd={() => window.location.reload()} />
      <h1>Get Specific Book:</h1>
      <FindBook />
      <h1>All Books:</h1>
      <AllBooks/>
    </>
  )
}

export default App
