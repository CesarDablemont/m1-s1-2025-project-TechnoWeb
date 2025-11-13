import { Outlet } from '@tanstack/react-router'
import { BookList } from '../components/BookList'

export function BooksPage() {
  return (
    <div style={{color : '#FFFFFF'}}>
      <h1>List of Books</h1>
      <BookList />
      <Outlet />
    </div>
  )
}
