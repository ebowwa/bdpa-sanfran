/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cSK4ooVOVV6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/common/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export interface Project {
  id: string
  name: string
  description: string
  imageUrl: string
  status: "New" | "Pending" | "In Progress" | "Completed"
  price: number
  dueDate: Date
  client: Client
}

export interface Client {
  name: string
  avatarUrl: string
  initials: string
  location: string
}
interface AdminPageProps {
  projects: Project[]
}

export default function AdminPage({ projects }: AdminPageProps) {
  return (
    <div className="bg-white p-8">
      <div className="flex justify-between border-b-2 border-blue-600 pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Projects</h1>
        <Select>
          <SelectTrigger id="project-filter">
            <SelectValue>All Projects</SelectValue>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all-projects">All Projects</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-6 mt-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex justify-between bg-gray-50 p-6">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage alt={project.client.name} src={project.client.avatarUrl} />
                <AvatarFallback>{project.client.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{project.client.name}</h2>
                <p className="text-sm text-gray-500">{project.client.location}</p>
                <div className="mt-4 flex gap-4">
                  <img
                    alt={project.name}
                    className="rounded-lg"
                    height="80"
                    src={project.imageUrl}
                    style={{
                      aspectRatio: "142/80",
                      objectFit: "cover",
                    }}
                    width="142"
                  />
                  <div>
                    <p className="text-sm">{project.description}</p>
                    <Badge className="mt-2" variant="secondary">
                      {project.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <div className="text-right">
                <h3 className="text-lg font-semibold">Price</h3>
                <p className="text-sm text-gray-500">${project.price.toLocaleString()}</p>
              </div>
              <Button className="mt-4">View Details</Button>
              <div className="text-right mt-4">
                <h3 className="text-lg font-semibold">Due in</h3>
                <p className="text-sm text-gray-500">{project.dueDate.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}