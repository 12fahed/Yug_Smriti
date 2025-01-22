import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Scenario {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
  nextScenario: number | null;
  wrongPath: number | null;
  consequence?: string;
}

interface Character {
  name: string;
  scenarios: Scenario[];
}

const characters: Character[] = [
  {
    name: 'Mahatma Gandhi',
    scenarios: [
      {
        id: 0,
        question: "You are young Gandhi in South Africa. How do you respond to being thrown off a train despite having a first-class ticket?",
        options: [
          "Practice non-violent resistance and fight for rights legally",
          "Retaliate with physical force",
          "Leave South Africa immediately",
          "Comply and travel in third class"
        ],
        correctOption: 0,
        nextScenario: 1,
        wrongPath: 5,
        consequence: "Your choice to fight peacefully begins a lifelong journey of non-violent resistance."
      },
      {
        id: 1,
        question: "British authorities have imposed the Salt Tax. What action do you take?",
        options: [
          "Lead the Salt March to produce salt",
          "Pay the tax quietly",
          "Organize violent protests",
          "Leave India in protest"
        ],
        correctOption: 0,
        nextScenario: 2,
        wrongPath: 6,
        consequence: "The Salt March becomes a pivotal moment in India's freedom struggle."
      },
      {
        id: 2,
        question: "The British have proposed dividing India during independence. Your response?",
        options: [
          "Advocate for united India through fasting and peaceful negotiations",
          "Accept partition immediately",
          "Call for armed resistance",
          "Reject independence entirely"
        ],
        correctOption: 0,
        nextScenario: 3,
        wrongPath: 7,
        consequence: "Your commitment to peace influences the independence process."
      },
      {
        id: 3,
        question: "Hindu-Muslim riots have broken out. What do you do?",
        options: [
          "Fast until the violence stops",
          "Support one community over another",
          "Leave the area",
          "Call for military intervention"
        ],
        correctOption: 0,
        nextScenario: null,
        wrongPath: 8,
        consequence: "Your fast helps bring peace between communities."
      },
      // Wrong path scenarios
      {
        id: 5,
        question: "Your violent response has led to arrest. What now?",
        options: [
          "Continue fighting physically",
          "Accept defeat",
          "Seek revenge",
          "Reflect on non-violence"
        ],
        correctOption: 3,
        nextScenario: null,
        wrongPath: null,
        consequence: "The path of violence leads to a cycle of retaliation."
      },
      {
        id: 6,
        question: "The Salt Tax remains, weakening the independence movement. Your next move?",
        options: [
          "Give up the fight",
          "Join the British government",
          "Leave India",
          "Reconsider peaceful protest"
        ],
        correctOption: 3,
        nextScenario: null,
        wrongPath: null,
        consequence: "Compliance with unjust laws strengthens colonial rule."
      },
      {
        id: 7,
        question: "Violence erupts during partition. Your final decision?",
        options: [
          "Continue supporting violence",
          "Leave India forever",
          "Embrace non-violence now",
          "Accept defeat"
        ],
        correctOption: 2,
        nextScenario: null,
        wrongPath: null,
        consequence: "The violence of partition shows the importance of peaceful resistance."
      },
      {
        id: 8,
        question: "The riots worsen. What is your last action?",
        options: [
          "Give up on peace",
          "Try one last fast",
          "Leave India",
          "Join the fighting"
        ],
        correctOption: 1,
        nextScenario: null,
        wrongPath: null,
        consequence: "The path of violence only leads to more suffering."
      }
    ]
  }
];

const Game: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<number>(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);
  const [consequence, setConsequence] = useState<string>("");

  const startGame = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentScenario(0);
    setGameOver(false);
    setIsVictory(false);
    setConsequence("");
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (!selectedCharacter) return;

    const scenario = selectedCharacter.scenarios[currentScenario];
    const isCorrect = selectedAnswer === scenario.correctOption;

    setConsequence(scenario.consequence || "");

    if (isCorrect) {
      if (scenario.nextScenario !== null) {
        setCurrentScenario(scenario.nextScenario);
      } else {
        setGameOver(true);
        setIsVictory(true);
      }
    } else {
      if (scenario.wrongPath !== null) {
        setCurrentScenario(scenario.wrongPath);
      } else {
        setGameOver(true);
        setIsVictory(false);
      }
    }
  };

  const GameOver: React.FC = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-1/2"
    >
      <Card className="bg-[#FFF8DC] shadow-lg rounded-lg">
        <h1 className="bg-[#2C1810] text-[#F5E6D3] text-center py-6 text-3xl font-bold">
          {isVictory ? "Victory!" : "Game Over"}
        </h1>
        <CardContent className="p-8">
          <p className="text-lg mb-6 text-[#2C1810]">
            {isVictory 
              ? "You have successfully followed the path of non-violence and wisdom!"
              : "Your choices led to a different outcome. Try again to discover the path of peace."}
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              className="bg-[#8B4513] hover:bg-[#2C1810] text-[#F5E6D3] w-full transition-colors duration-300"
              onClick={() => {
                setGameOver(false);
                setSelectedCharacter(null);
              }}
            >
              Play Again
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const mainContent = () => {
    if (gameOver) return <GameOver />;
    if (!selectedCharacter) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-1/2"
        >
          <Card className="bg-[#FFF8DC] shadow-lg rounded-lg">
            <h1 className="bg-[#2C1810] text-[#F5E6D3] text-center py-6 text-3xl font-bold">
              Choose Your <span className="text-[#D4AF37]">Historical</span> Journey
            </h1>
            <CardContent className="p-8">
              {characters.map((character, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mb-4"
                >
                  <Button 
                    className="bg-[#8B4513] hover:bg-[#2C1810] text-[#F5E6D3] w-full transition-colors duration-300"
                    onClick={() => startGame(character)}
                  >
                    {character.name}
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      );
    }

    const scenario = selectedCharacter.scenarios[currentScenario];
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-1/2"
      >
        <Card className="bg-[#FFF8DC] shadow-lg rounded-lg">
          <h1 className="bg-[#2C1810] text-[#F5E6D3] text-center py-6 text-3xl font-bold">
            {selectedCharacter.name}
          </h1>
          <CardContent className="p-8">
            <p className="text-xl mb-8 text-[#2C1810]">{scenario.question}</p>
            {consequence && (
              <p className="text-[#D4AF37] mb-6 italic">{consequence}</p>
            )}
            <div className="space-y-4">
              {scenario.options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="bg-[#8B4513] hover:bg-[#2C1810] text-[#F5E6D3] w-full transition-colors duration-300"
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] p-8 flex">
      {mainContent()}
      <div className="w-1/2 flex items-center justify-center border-l-2 border-[#8B4513]">
        <p className="text-[#2C1810] text-xl">3D Avatar Space</p>
      </div>
    </div>
  );
};

export default Game;