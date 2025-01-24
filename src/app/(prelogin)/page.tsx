"use client";

import { useRouter } from "next/navigation";
import { NavMenu } from "@/components/prelogin/nav-menu";
import { HistoryFacts } from "@/components/prelogin/history-facts";
import { ImageCarousel } from "@/components/prelogin/image-carousel";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push("/postlogin");
  };

  return (
    <main className="relative min-h-screen">
      <NavMenu />

      <div className="fixed top-4 right-4 z-[60]">
        <Button
          className="bg-[#2C1810] hover:bg-[#8B4513] text-[#F5E6D3]"
          onClick={handleSignUpClick}
        >
          Start Exploring
        </Button>
      </div>

      <ImageCarousel />
      <HistoryFacts />
    </main>
  );
}
