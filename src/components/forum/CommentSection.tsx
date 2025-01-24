import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Comment {
  author: string
  avatar: string
  content: string
  date: string
}

interface CommentSectionProps {
  comments: Comment[]
}

export function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="mt-4 space-y-4">
      {comments.map((comment, index) => (
        <Card key={index} className="relative overflow-hidden mb-4">
          <CardContent className="relative z-10 p-4">
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/paper2-qQ5l0yJB5uoKFja5wJyryk5koHBy1M.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="relative z-10 flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-[#2C1810]">{comment.author}</h4>
                  <span className="text-xs text-[#8B4513]">{comment.date}</span>
                </div>
                <p className="mt-1 text-sm text-[#2C1810]">{comment.content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="mt-4">
        <Textarea
          placeholder="Add a comment..."
          className="bg-transparent border-[#8B4513] text-[#2C1810] placeholder-[#8B4513]/70"
        />
        <Button className="mt-2 bg-[#8B4513] text-[#FFF8DC] hover:bg-[#D4AF37]">Post Comment</Button>
      </div>
    </div>
  )
}

