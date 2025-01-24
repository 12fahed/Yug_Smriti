"use client"

import AnimatedClouds from "@/components/What-If-Cloud"
import StoryTelling from "@/components/StoryTelling"
import { NavMenu } from "@/components/prelogin/nav-menu"
import { fetchFromGenAI } from "@/lib/genAIClient"
import { SchemaType } from "@google/generative-ai"
import { useState } from "react"

export default function StoreTellingPage(){

    const [event, setEvent] = useState("");
    const [impact, setImpact] = useState("");
    const [showClouds, setShowClouds] = useState(false);

    const handleSelection = async (event: string) => {
        console.log(event)
        try{

            console.log("Inside the Handle Selections")

            const schema = {
                type: "object",
                properties: {
                    impact: { type: "string" }
                }
            };
            

            const prompt = `What would have happened if ${event} would have never happened ? Give A concise one para reply over the impact and most significant change in history of that Era. The Para should not be more than 170 Characters`

            const response = await fetchFromGenAI(schema, prompt)

            setEvent(event)
            setShowClouds(true)
            setImpact(response.impact)

        } catch(error){
            console.error("Error fetching countries:", error)
        }
    };

    return(
        <div>
            <NavMenu />
            <StoryTelling setEventSelected={handleSelection}/>
            {event && showClouds && 
                <AnimatedClouds title={`What if the ${event} never had happened ?`} content={impact} onClose={() => setShowClouds(false)}
            />}
            
        </div>
    )

}