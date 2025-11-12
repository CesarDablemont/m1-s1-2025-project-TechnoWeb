import { createFileRoute } from '@tanstack/react-router'
import { ClientsPage } from '../client/pages/ClientsPage'

export const Route = createFileRoute('/client')({
  component: ClientsPage, // contient ClientList + Outlet
})