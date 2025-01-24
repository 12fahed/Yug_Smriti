import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function CreatePostForm() {
  return (
    <Card className="relative overflow-hidden mb-6">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/paper2-qQ5l0yJB5uoKFja5wJyryk5koHBy1M.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10">
        <CardHeader>
          <CardTitle className="text-xl text-[#2C1810]">Share Your Historical Insight</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="What's on your mind, historian?"
            className="bg-transparent border-[#8B4513] text-[#2C1810] placeholder-[#8B4513]/70"
          />
        </CardContent>
        <CardFooter>
          <Button className="bg-[#8B4513] text-[#FFF8DC] hover:bg-[#D4AF37]">Post</Button>
        </CardFooter>
      </div>
    </Card>
  )
}

