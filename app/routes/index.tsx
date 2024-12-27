import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (<div>Hello "/"!
    <div>
      <Button variant="outline">Test Button</Button>
    </div>
  </div>)
}
