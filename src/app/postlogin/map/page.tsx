"use client"

import MapWithRegions from "@/components/Map-Component"
import { NavMenu } from "@/components/prelogin/nav-menu"

export default function Page(){

  return(
    <div>
      <NavMenu />
      <MapWithRegions />
    </div>
  )

}