import { useEffect, useState, type ChangeEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'

interface Book { id: number; title: string }
interface Author { id: number; name: string }

interface SearchBarProps {
  books: Book[]
  authors: Author[]
}

export function SearchBar({ books, authors }: SearchBarProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<(Book | Author)[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!query) {
      setResults([])
      setOpen(false)
      return
    }

    const timer = setTimeout(() => {
      const q = query.trim().toLowerCase()
      const bookMatches = books.filter((b) => b.title.toLowerCase().includes(q))
      const authorMatches = authors.filter((a) => a.name.toLowerCase().includes(q))

      // Combine and mark type by property presence
      const combined: (Book | Author)[] = [...bookMatches, ...authorMatches]
      setResults(combined)
      setOpen(combined.length > 0)
    }, 200) // debounce

    return () => clearTimeout(timer)
  }, [query, books, authors])

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }

  function onSelect(item: Book | Author) {
    if ('title' in item) {
      // It's a Book
      setOpen(false)
      navigate({ to: `/books/${encodeURIComponent(item.title)}` })
      setQuery('')
    } else if ('name' in item) {
      // It's an Author
      setOpen(false)
      navigate({ to: `/author/${encodeURIComponent(item.name)}` })
      setQuery('')
    }
  }

  return (
    <div style={{ position: 'relative', minWidth: 260 }}>
      <input
        placeholder="Search books or authors..."
        value={query}
        onChange={onChange}
        onFocus={() => { if (results.length) setOpen(true) }}
        style={{
          padding: '8px 12px',
          borderRadius: 6,
          border: '1px solid rgba(0,0,0,0.15)',
          width: '100%',
          boxSizing: 'border-box',
          outline: 'none',
          backgroundColor: 'white',
          color: 'black',
        }}
      />

      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          left: 0,
          marginTop: 8,
          background: 'white',
          borderRadius: 6,
          boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
          zIndex: 30,
          maxHeight: 260,
          overflowY: 'auto',
        }}>
          {results.map((r) => (
            <div
              key={('title' in r ? `book-${r.id}` : `author-${r.id}`)}
              onClick={() => onSelect(r)}
              style={{
                padding: '10px 12px',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontWeight: 600 }}>
                {'title' in r ? (r as Book).title : (r as Author).name}
              </div>
              <div style={{ fontSize: 12, color: '#666' }}>
                {'title' in r ? (r as Book).title : (r as Author).name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
