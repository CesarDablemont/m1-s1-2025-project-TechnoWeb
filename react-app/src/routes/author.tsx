import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/author')({
  component: Author,
})

function Author() {
  return <div>Hello "/author"!</div>
}
