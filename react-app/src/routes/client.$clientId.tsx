import { createFileRoute } from '@tanstack/react-router'
import { ClientDetails } from '../client/components/ClientDetails'

export const Route = createFileRoute('/client/$clientId')({
  component: ClientDetailsPage,
})

function ClientDetailsPage() {
  const { clientId } = Route.useParams()

  return <ClientDetails id={clientId} />
}
