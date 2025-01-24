"use client"

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { X, MessageCircle } from "lucide-react";

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
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  // Debug useEffect to track state changes
  useEffect(() => {
    console.log("Chat open state changed:", isChatOpen);
  }, [isChatOpen]);

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

  // Explicitly define toggle function with console log
  const toggleChat = (e?: React.MouseEvent) => {
    console.log("Toggle chat function called");
    if (e) {
      e.stopPropagation(); // Prevent event bubbling
    }
    setIsChatOpen(prevState => {
      console.log("Changing from", prevState, "to", !prevState);
      return !prevState;
    });
  };

  // Floating circle when chat is closed
  if (!isChatOpen) {
    return (
      <div 
        id="chat-circle"
        onClick={(e) => {
          console.log("Circle clicked");
          toggleChat(e);
        }}
        className="fixed bottom-8 right-8 cursor-pointer z-50 
        bg-[#D4AF37] text-[#2C1810] rounded-full w-16 h-16 
        flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        style={{zIndex: 9999}} // Explicitly set high z-index
      >
        <MessageCircle size={32} />
      </div>
    );
  }

  // Full chat interface when open
  return (
    <div 
      className="fixed bottom-8 right-8 z-50"
      style={{ 
        width: '400px', 
        zIndex: 9999 // Ensure high z-index for full interface
      }}
    >
      <div 
        className="w-full p-8 shadow-2xl rounded-2xl relative"
        style={{ 
          backgroundColor: '#FFF8DC', 
          borderColor: '#8B4513', 
          border: '2px solid',
          zIndex: 9999 // Consistent z-index
        }}
      >
        {/* Close Button */}
        <button 
          onClick={(e) => toggleChat(e)} 
          className="absolute top-4 right-4 text-[#2C1810] hover:text-opacity-70 transition-colors"
        >
          <X size={24} />
        </button>

        <h1 
          className="text-3xl font-bold text-center mb-6"
          style={{ color: '#2C1810' }}
        >
          Historical Dialogue
        </h1>

        {/* Character Selection Dropdown */}
        <div className="mb-6">
          <label 
            htmlFor="character" 
            className="block text-lg mb-2"
            style={{ color: '#2C1810' }}
          >
            Choose a Historical Figure:
          </label>
          <select
            id="character"
            value={selectedCharacter}
            onChange={handleCharacterChange}
            className="w-full p-3 rounded-lg"
            style={{ 
              backgroundColor: '#F5E6D3', 
              color: '#2C1810', 
              borderColor: '#8B4513' 
            }}
          >
            <option value="">Select a Character</option>
            <option value="gandhi">Gandhiji</option>
            <option value="nehru">Nehru</option>
            <option value="sarojini_naidu">Sarojini Naidu</option>
          </select>
        </div>

        {/* Chat Messages Display */}
        <div 
          className="overflow-y-auto h-64 p-4 rounded-lg mb-6 shadow-inner"
          style={{ 
            backgroundColor: '#F5E6D3', 
            border: '1px solid #8B4513' 
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
                    ? '#D4AF37' 
                    : '#8B4513', 
                  color: message.sender === "user" 
                    ? '#2C1810'  
                    : '#FFF8DC'  
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            rows={2}
            className="resize-none p-3"
            style={{
              backgroundColor: '#F5E6D3', 
              color: '#2C1810', 
              borderColor: '#8B4513' 
            }}
          />
          <Button 
            type="submit" 
            disabled={loading || !selectedCharacter} 
            className="w-full p-3 rounded-lg"
            style={{
              backgroundColor: '#D4AF37', 
              color: '#2C1810', 
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