"use client"

import Game from "@/pages/Game"
import { NavMenu } from "@/components/prelogin/nav-menu"
import GameSelection from "@/pages/game-selection"

export default function StoryTellingPage(){

    return(
        <div>
            <NavMenu />
            <GameSelection />
        </div>
    )

}