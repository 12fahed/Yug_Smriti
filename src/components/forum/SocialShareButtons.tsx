import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin } from "lucide-react"

export function SocialShareButtons() {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" className="text-blue-600 border-blue-600 hover:bg-blue-100">
        <Facebook className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="text-sky-500 border-sky-500 hover:bg-sky-100">
        <Twitter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="text-blue-700 border-blue-700 hover:bg-blue-100">
        <Linkedin className="h-4 w-4" />
      </Button>
    </div>
  )
}

