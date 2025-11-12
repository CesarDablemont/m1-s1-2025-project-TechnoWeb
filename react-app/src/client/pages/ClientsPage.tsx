import { Outlet } from '@tanstack/react-router'
import { ClientList } from '../components/ClientList'

export function ClientsPage() {
  return (
    <div>
      <h1>Clients</h1>
      <ClientList />
      <Outlet />
    </div>
  )
}