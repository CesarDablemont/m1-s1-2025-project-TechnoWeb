import { useState, useEffect } from 'react'

interface PopularBookProps {
  books: Array<{ id: number; title: string }>
}

export function PopularBook({ books }: PopularBookProps) {
  const [displayedBooks, setDisplayedBooks] = useState([1, 2, 3])

  // Animation de défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedBooks((prev) => {
        const newBooks = prev.map((id) => (id === books.length ? 1 : id + 1))
        return newBooks
      })
    }, 5000) // Change tous les 5 secondes

    return () => clearInterval(interval)
  }, [books.length])

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Titre */}
      <div style={{
        padding: '10px 40px',
        backgroundColor: '#395E66',
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
        gap: '15px',
        padding: '5px 20px 20px 20px',
        backgroundColor: '#395E66',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80px',
        width: '100%',
        flexWrap: 'wrap',
      }}>
      {books
        .filter((book) => displayedBooks.includes(book.id))
        .map((book) => (
          <button
            key={book.id}
            style={{
              padding: '20px 35px',
              backgroundColor: '#2a4450',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontSize: '20px',
              fontWeight: 'bold',
              flex: '1 1 calc(33.333% - 10px)',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.5s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a2c34'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2a4450'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            📚 {book.title}
          </button>
        ))}
      </div>
    </div>
  )
}
