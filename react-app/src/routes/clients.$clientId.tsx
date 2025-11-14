import { createFileRoute } from '@tanstack/react-router'
import { ClientDetails } from '../clients/components/ClientDetails'
import { useClientProvider } from '../clients/providers/useClientProvider'


export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailsPage,
})

function ClientDetailsPage() {
  const { clientId } = Route.useParams()
  const {updateClient } = useClientProvider()

  return <ClientDetails id={clientId} onUpdate={updateClient} />
}
