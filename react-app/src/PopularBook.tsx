import { useState, useEffect } from 'react'



export function PopularBook() {
  
  const [books, setBooks] = useState<Array<{
  id: string
  title: string
  yearPublished: number
  authorId: string
}>>([])
  
  // Récupère 5 livres aléatoires via Get books random
  useEffect(() => {
    fetch("http://localhost:3000/books/random")
      .then((res) => res.json())
      .then((data) => setBooks(data))

      .catch((err) => console.error("Erreur lors du chargement des livres :", err))
  }, [])
  console.log("Réponse API :", books)  
  const [displayedBooks, setDisplayedBooks] = useState<number[]>([1, 2, 3])
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedBooks((prev) => {
        const newBooks = prev.map((id) => (id === books.length ? 1 : id + 1))
        return newBooks
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [books.length])

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div style={{
        padding: '30px 40px',
        backgroundColor: '#222831',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        <h2 style={{
          color: 'white',
          margin: '0',
          fontSize: '25px',
          fontWeight: 700,
          lineHeight: 1,
        }}>
          📚 Popular Books
        </h2>
      </div>

      {/* Barre avec les livres */}
      <div style={{
        display: 'flex',
        gap: '10px',
        backgroundColor: '#222831',
        justifyContent: 'stretch',
        alignItems: 'center',
        minHeight: '80px',
        width: '100%',
        flexWrap: 'wrap',
      }}>
      {books
          .filter((book, index) => displayedBooks.includes(index)) // attention : displayedBooks contient maintenant des indices
          .map((book) => (
            <button
              key={book.id}
              style={{
                padding: '15px 15px',
                boxSizing: 'border-box',
                backgroundColor: '#646262ff',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '20px',
                fontWeight: 'bold',
                flex: '1 1 0',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.5s ease',
                transform: 'scale(0.95)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c7c6c6ff'
                e.currentTarget.style.transform = 'scale(1.00)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#646262ff'
                e.currentTarget.style.transform = 'scale(0.95)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>Titre : {book.title}</span>
                <span>Année : {book.yearPublished}</span>
              </div>
            </button>
          ))
        }
      </div>
    </div>
  )
}
