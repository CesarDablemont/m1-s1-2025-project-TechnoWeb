import { useState, useEffect } from 'react'

interface PopularAuthorProps {
  authors: Array<{ id: number; name: string; bio: string }>
}

export function PopularAuthor({ authors }: PopularAuthorProps) {
  const [displayedAuthors, setDisplayedAuthors] = useState([1, 2, 3])

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedAuthors((prev) => {
        const newAuthors = prev.map((id) => (id === authors.length ? 1 : id + 1))
        return newAuthors
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [authors.length])

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* En-tête */}
      <div style={{
        padding: '10px 40px',
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
          ✍️ Popular Authors
        </h2>
      </div>

      {/* Barre avec les auteurs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        backgroundColor: '#222831',
        justifyContent: 'stretch',
        alignItems: 'center',
        minHeight: '80px',
        width: '100%',
        flexWrap: 'nowrap',
      }}>
        {authors
          .filter((author) => displayedAuthors.includes(author.id))
          .map((author) => (
            <button
              key={author.id}
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
                
                transition: 'all 0.5s ease',
                minWidth: '0',
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
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',            // occupe toute la largeur du bouton
                whiteSpace: 'normal',     // autorise le retour à la ligne
                overflowWrap: 'break-word' // coupe les mots longs si nécessaire
              }}>
                <span>Nom : {author.name}</span>      
                <span>Bio : {author.bio}</span>
              </div>

            </button>
          ))}
      </div>
    </div>
  )
}