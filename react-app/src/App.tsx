import './App.css'
import { PopularBook } from './PopularBook'

function App() {
  const popularBooks = [
    { id: 1, title: '1984' },
    { id: 2, title: 'Le Seigneur des Anneaux' },
    { id: 3, title: 'Fondation' },
    { id: 4, title: 'Dune' },
    { id: 5, title: 'Le Hobbit' },
  ]

  return (
    <>
      <PopularBook books={popularBooks} />
    </>
  )
}

export default App
