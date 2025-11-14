import { createFileRoute } from '@tanstack/react-router'
import { SalesPage } from '../sales/pages/SalesPage'


export const Route = createFileRoute('/sale')({
  component: SalesPage,
})