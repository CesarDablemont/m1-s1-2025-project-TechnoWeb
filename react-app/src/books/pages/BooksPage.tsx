import { Outlet } from '@tanstack/react-router'
import { BookList } from '../components/BookList'

export function BooksPage() {
  return (
    <div>
      <h1>Books</h1>
      <BookList />
      <Outlet />
    </div>
  )
}
