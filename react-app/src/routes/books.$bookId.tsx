import { createFileRoute } from '@tanstack/react-router'
import { BookDetails } from '../books/components/BookDetails'
import { useBookProvider } from '../books/providers/useBookProvider'

export const Route = createFileRoute('/books/$bookId')({
  component: BookDetailsPage,
})

function BookDetailsPage() {
  const { bookId } = Route.useParams()
  const { updateBook } = useBookProvider()

  return <BookDetails id={bookId} onUpdate={ updateBook } />
}
