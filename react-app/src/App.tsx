import { useState } from 'react'
import './App.css'
import { Hello } from './Hello'
import { PopularBook } from './PopularBook'

function App() {
  const [name, setName] = useState<string>('')
  const [newName, setNewName] = useState<string>('')

  // Livres populaires en exmple a remplacer par les données dans la DB
  const popularBooks = [
    { id: 1, title: '1984' },
    { id: 2, title: 'Le Seigneur des Anneaux' },
    { id: 3, title: 'Fondation' },
    { id: 4, title: 'Dune' },
    { id: 5, title: 'Le Hobbit' },
  ]

  const onValidate = () => {
    setName(newName)
    setNewName('')
  }

  return (
    <>
      
      <PopularBook books={popularBooks} />

      <Hello name={name}>How are you man ?</Hello>
      <input value={newName} onChange={e => setNewName(e.target.value)} />
      <button onClick={onValidate}>OK</button>
      <h3>This is a subtitle</h3>
      <h3>This is a subtitle</h3>
    </>
  )
}

export default App
