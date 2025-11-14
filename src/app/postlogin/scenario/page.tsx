// app/postlogin/scenario/page.tsx
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { NavMenu } from "@/components/prelogin/nav-menu"

// Only dynamically import the problematic component
const ScenarioCard = dynamic(() => import('@/components/ScenarioCard'), {
  ssr: false,
  loading: () => <div>Loading scenario...</div>
})

export default function RPGGAME() {
  return (
    <div>   
      <NavMenu />
      <ScenarioCard />
    </div>
  )
}