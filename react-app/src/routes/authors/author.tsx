import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authors/author')({
  component: Author,
})

function Author() {
  return <div>Hello "/author"!</div>
}
