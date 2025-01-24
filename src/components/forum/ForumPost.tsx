import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react"
import { SocialShareButtons } from "./SocialShareButtons"

interface ForumPostProps {
  author: string
  avatar: string
  date: string
  content: string
  likes: number
  comments: number
}

export function ForumPost({ author, avatar, date, content, likes, comments }: ForumPostProps) {
  return (
    <Card className="bg-[#FFF8DC]/90 backdrop-blur-sm border-2 shadow-lg mb-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} alt={author} />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold text-[#2C1810]">{author}</h3>
          <p className="text-sm text-[#8B4513]">{date}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-[#2C1810]">{content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="text-[#8B4513]">
            <ThumbsUp className="mr-2 h-4 w-4" /> {likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-[#8B4513]">
            <MessageCircle className="mr-2 h-4 w-4" /> {comments}
          </Button>
        </div>
        <SocialShareButtons />
      </CardFooter>
    </Card>
  )
}

