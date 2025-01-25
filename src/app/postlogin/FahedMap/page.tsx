"use client";

import React, { useState } from "react";
import FahedMap from "@/components/FahedMap";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/prelogin/nav-menu";

const Home = () => {
  const [year, setYear] = useState(100);

  const options = Array.from({ length: 20 }, (_, i) => (i + 1) * 100);

  return (

    <div>
        <NavMenu />
        <div className="flex flex-col items-center justify-center h-screen">
        <div className="absolute bottom-4 left-4 bg-white shadow-md p-4 rounded">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
            Select Year
            </label>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{`Year: ${year}`}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options.map((option) => (
                <DropdownMenuItem
                    key={option}
                    onClick={() => setYear(option)}
                >
                    {option}
                </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <FahedMap year={year} />
        </div>
    </div>
  );
};

export default Home;
