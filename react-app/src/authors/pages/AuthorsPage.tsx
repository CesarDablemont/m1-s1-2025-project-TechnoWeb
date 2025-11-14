import { Outlet } from '@tanstack/react-router'
import { AuthorList } from '../components/AuthorList'

export function AuthorsPage() {
  return (
    <div style={{color : '#FFFFFF'}}>
      <h1>List of Authors</h1>
      <AuthorList />
      <Outlet />
    </div>
  )
}
