import { useEffect } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'

export function ClientList() {
  const { books, loadBooks, deleteBook, updateBook, createBook } =
    useBookProvider()

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <>
     <div>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={'title'}
          onChange={e => {}}
        />
        <input
          type="number"
          placeholder="Year Published"
          value={'yearPublished'}
          onChange={e => {}}
        />
        <button onClick={() => {}}>
          Create Book
        </button>
      </div>
      <ul>
        {books.map(book => (
          <ClientListItem key={book.id} book={book} onDelete={deleteBook} onUpdate={updateBook}/>
        ))}
      </ul>
    </div>
    </>
  )
}
