"use client"

import { NavMenu } from "@/components/prelogin/nav-menu"
import { ForumPost } from "@/components/forum/ForumPost"
import { CommentSection } from "@/components/forum/CommentSection"
import { CreatePostForm } from "@/components/forum/CreatePostForm"

const forumPosts = [
  {
    author: "HistoryBuff42",
    avatar: "/avatars/user1.jpg",
    date: "2024-01-23",
    content:
      "Did you know that the Great Wall of China is not actually visible from space with the naked eye? This is a common myth that has been debunked by many astronauts!",
    likes: 42,
    comments: 7,
  },
  {
    author: "TimeExplorer",
    avatar: "/avatars/user2.jpg",
    date: "2024-01-22",
    content:
      "Just finished a fascinating book on the Byzantine Empire. It's amazing how their influence on art, law, and religion still impacts our world today. Any recommendations for further reading on this topic?",
    likes: 38,
    comments: 12,
  },
]

const comments = [
  {
    author: "AncientScholar",
    avatar: "/avatars/user3.jpg",
    content:
      "That's a fascinating fact! It's always interesting to see how historical myths get started and perpetuated.",
    date: "2024-01-23",
  },
  {
    author: "ModernHistorian",
    avatar: "/avatars/user4.jpg",
    content:
      "I'd recommend 'Byzantium: The Surprising Life of a Medieval Empire' by Judith Herrin. It's a great overview of Byzantine history and culture!",
    date: "2024-01-22",
  },
]

export default function ForumPage() {
  return (
    <div
      className="min-h-screen bg-[#D6C08F]"
      style={{
        fontFamily: "Cinzel, serif",
        backgroundImage: `url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20(10).jpg-Dd3dTAph1BHsiK0R3CuG7aAhWifvyL.jpeg")`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
      }}
    >
      <NavMenu />
      <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[#2C1810] text-center tracking-wide">Historical Forum</h1>
        <CreatePostForm />
        <div className="space-y-6">
          {forumPosts.map((post, index) => (
            <ForumPost key={index} {...post} />
          ))}
        </div>
      </main>
    </div>
  )
}

