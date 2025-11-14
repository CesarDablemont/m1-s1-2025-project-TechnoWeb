import { createFileRoute } from '@tanstack/react-router'
import { AuthorDetails } from '../authors/components/AuthorDetails'
import { useAuthorProvider } from '../authors/providers/useAuthorsProvider'

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailsPage,
})

function AuthorDetailsPage() {
  const { authorId } = Route.useParams()
  const { updateAuthor } = useAuthorProvider()

  return <AuthorDetails id={authorId} onUpdate={updateAuthor} />
}
