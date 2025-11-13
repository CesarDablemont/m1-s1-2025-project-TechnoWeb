import { Outlet } from '@tanstack/react-router'
import { ClientList } from '../components/ClientList'

export function ClientsPage() {
  return (
    <div style={{color : '#FFFFFF'}}>
      <h1>List of Clients</h1>
      <ClientList />
      <Outlet />
    </div>
  )
}