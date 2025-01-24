"use client"
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface CharacterQA {
  question: string;
  answer: string;
}

const characterQA: { [key: string]: CharacterQA } = {
  gandhi: {
    question: "Hey",
    answer: "Namaste"
  },
  nehru: {
    question: "What does democracy mean to you?",
    answer: "Democracy is a government of the people, by the people, and for the people. It allows every citizen to have a voice in shaping the nation's destiny."
  },
  sarojini_naidu: {
    question: "What inspired you to become a poet?",
    answer: "My inspiration came from the beauty of nature, the struggles of the people, and the dreams of a free and just India."
  }
};

const ChatBot: React.FC = () => {
  const [input, setInput] = useState<string>(""); 
  const [messages, setMessages] = useState<Message[]>([]); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [selectedCharacter, setSelectedCharacter] = useState<string>(''); 

  const handleCharacterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCharacter = e.target.value;
    setSelectedCharacter(newCharacter);
    setMessages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedCharacter) return;

    const newUserMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);

    const hardcodedAnswer = characterQA[selectedCharacter]?.answer;

    if (input.trim().toLowerCase() === characterQA[selectedCharacter]?.question.toLowerCase()) {
      setTimeout(() => {
        const botMessage: Message = { sender: "bot", text: hardcodedAnswer };
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 1000);
    } else {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/chat/", {
          input_text: input,
          character: selectedCharacter,
        });
        const botMessage: Message = { sender: "bot", text: res.data.response };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "An error occurred. Please try again." },
        ]);
      } finally {
        setLoading(false);
        setInput("");
      }
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: '#F5E6D3' }} // Antique White background
    >
      <div 
        className="w-full max-w-lg p-8 shadow-2xl rounded-2xl"
        style={{ 
          backgroundColor: '#FFF8DC', // Cornsilk card background
          borderColor: '#8B4513', // Saddle Brown border
          border: '2px solid' 
        }}
      >
        <h1 
          className="text-3xl font-bold text-center mb-6"
          style={{ color: '#2C1810' }} // Deep Brown text
        >
          Historical Dialogue
        </h1>

        {/* Character Selection */}
        <div className="mb-6">
          <label 
            htmlFor="character" 
            className="block text-lg mb-2"
            style={{ color: '#2C1810' }} // Deep Brown label
          >
            Choose a Historical Figure:
          </label>
          <select
            id="character"
            value={selectedCharacter}
            onChange={handleCharacterChange}
            className="w-full p-3 rounded-lg"
            style={{ 
              backgroundColor: '#F5E6D3', // Antique White select background
              color: '#2C1810', // Deep Brown text
              borderColor: '#8B4513', // Saddle Brown border
            }}
          >
            <option value="">Select a Character</option>
            <option value="gandhi">Gandhiji</option>
            <option value="nehru">Nehru</option>
            <option value="sarojini_naidu">Sarojini Naidu</option>
          </select>
        </div>

        {/* Chat Messages */}
        <div 
          className="overflow-y-auto h-64 p-4 rounded-lg mb-6 shadow-inner"
          style={{ 
            backgroundColor: '#F5E6D3', // Antique White chat background
            border: '1px solid #8B4513' // Saddle Brown border
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-3`}
            >
              <div
                className="p-3 rounded-lg max-w-xs"
                style={{
                  backgroundColor: message.sender === "user" 
                    ? '#D4AF37' // Gold for user messages
                    : '#8B4513', // Saddle Brown for bot messages
                  color: message.sender === "user" 
                    ? '#2C1810'  // Deep Brown text for user
                    : '#FFF8DC'  // Cornsilk text for bot
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            rows={2}
            className="resize-none p-3"
            style={{
              backgroundColor: '#F5E6D3', // Antique White textarea
              color: '#2C1810', // Deep Brown text
              borderColor: '#8B4513' // Saddle Brown border
            }}
          />
          <Button 
            type="submit" 
            disabled={loading || !selectedCharacter} 
            className="w-full p-3 rounded-lg"
            style={{
              backgroundColor: '#D4AF37', // Gold button
              color: '#2C1810', // Deep Brown text
              opacity: (loading || !selectedCharacter) ? 0.5 : 1
            }}
          >
            {loading ? "Thinking..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;