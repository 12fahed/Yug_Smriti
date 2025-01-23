import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  title: string;
  scenarios: Scenario[];
}

const TypewriterText: React.FC<{ text: string; onComplete: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        onComplete();
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <p className="text-xl text-[#2C1810] min-h-[8rem]">{displayedText}</p>;
};

const characters: Character[] = [
  {
    name: 'Mahatma Gandhi',
    title: 'Father of the Nation',
    scenarios: [
      {
        id: 0,
        question: "South Africa, 1893. After being forcibly thrown from a first-class train compartment at Pietermaritzburg station, you stand shivering in the cold night. This moment of humiliation will shape your future path. What do you choose?",
        options: [
          "Use nonviolence to fight injustice",
          "Protest with force",
          "Return to India",
          "Accept and stay quiet"
        ],
        correctOption: 0,
        nextScenario: 1,
        wrongPath: 5,
        consequence: "Your choice of peaceful resistance becomes Satyagraha."
      },
      {
        id: 1,
        question: "India, 1930. The British Salt Laws have created an oppressive monopoly on salt production, affecting millions of poor Indians. The Congress looks to you for direction on challenging this unjust law. How will you respond?",
        options: [
          "March to make salt",
          "Call for uprising",
          "Private negotiations",
          "Accept the law"
        ],
        correctOption: 0,
        nextScenario: 2,
        wrongPath: 6,
        consequence: "The Salt March ignites nationwide civil disobedience."
      },
      {
        id: 2,
        question: "1942. With World War II raging, the British have rejected Indian independence. The Congress awaits your guidance while the nation stands at a crucial crossroads. What path will you choose?",
        options: [
          "Launch Quit India Movement",
          "Wait for war to end",
          "Accept partial freedom",
          "Armed resistance"
        ],
        correctOption: 0,
        nextScenario: 3,
        wrongPath: 7,
        consequence: "Quit India becomes a powerful mass movement."
      },
      {
        id: 3,
        question: "1946. Religious tensions are escalating between Hindu and Muslim communities. Violence has erupted in Calcutta, threatening to spread across India. The nation's unity hangs by a thread. How will you respond?",
        options: [
          "Fast for unity",
          "Support partition",
          "Take political sides",
          "Leave for ashram"
        ],
        correctOption: 0,
        nextScenario: 4,
        wrongPath: 8,
        consequence: "Your fast helps calm communal tensions in Bengal."
      },
      {
        id: 4,
        question: "1947. India has gained independence, but the joy is marred by widespread violence during partition. Communities that lived together for centuries are now turning against each other. What action will you take?",
        options: [
          "Walk through riot areas",
          "Stay in Delhi",
          "Guard Hindu temples",
          "Protect only Congress"
        ],
        correctOption: 0,
        nextScenario: null,
        wrongPath: 9,
        consequence: "Your presence brings peace to troubled areas."
      },
      {
        id: 5,
        question: "1947. As religious riots spread across the newly formed nations, millions are displaced and thousands killed. The dream of peaceful independence seems to be slipping away. How do you respond?",
        options: [
          "Fast for peace",
          "Accept division",
          "Choose sides",
          "Leave India"
        ],
        correctOption: 0,
        nextScenario: 4,
        wrongPath: null,
        consequence: "Your fast helps restore sanity amid chaos."
      },
      {
        id: 6,
        question: "1948. The violence following partition continues unabated. Your philosophy of nonviolence is being tested as never before. You must decide how to address this growing crisis.",
        options: [
          "Preach nonviolence",
          "Support police action",
          "Ignore the issue",
          "Blame others"
        ],
        correctOption: 0,
        nextScenario: 3,
        wrongPath: null,
        consequence: "Your message of peace reaches troubled hearts."
      },
      {
        id: 7,
        question: "The newly independent India faces severe internal divisions along linguistic and regional lines. Some predict the nation's imminent collapse. As a moral leader, how do you guide the nation?",
        options: [
          "Unite through peace",
          "Military control",
          "Regional autonomy",
          "Strict borders"
        ],
        correctOption: 0,
        nextScenario: 4,
        wrongPath: null,
        consequence: "Unity through peaceful means prevails."
      },
      {
        id: 8,
        question: "Communal tensions have reached a boiling point, threatening to tear apart the fabric of the nation. Your lifelong principles of nonviolence and Hindu-Muslim unity are being challenged. What will you do?",
        options: [
          "March for harmony",
          "Enforce separation",
          "Choose majority",
          "Flee violence"
        ],
        correctOption: 0,
        nextScenario: 4,
        wrongPath: null,
        consequence: "Your march brings communities together."
      }
    ]
  },
  {
    name: 'Sardar Vallabhbhai Patel',
    title: 'Iron Man of India',
    scenarios: [
      {
        id: 0,
        question: "1947. As the first Deputy Prime Minister of independent India, you face the mammoth task of integrating 562 princely states. The Nizam of Hyderabad refuses to join the Indian Union. What's your approach?",
        options: [
          "Launch Operation Polo",
          "Offer more autonomy",
          "Accept independence",
          "Delay decision"
        ],
        correctOption: 0,
        nextScenario: null,
        wrongPath: null,
        consequence: "Hyderabad successfully integrates into India."
      }
    ]
  },
  {
    name: 'Dr. B.R. Ambedkar',
    title: 'Father of Indian Constitution',
    scenarios: [
      {
        id: 0,
        question: "1927. The practice of untouchability continues to oppress millions. The traditional Hindu leadership resists change. As a leader of the depressed classes, how do you challenge this ancient system?",
        options: [
          "Launch Mahad Satyagraha",
          "Accept gradual change",
          "Armed rebellion",
          "Await reforms"
        ],
        correctOption: 0,
        nextScenario: null,
        wrongPath: null,
        consequence: "The movement inspires millions to fight caste discrimination."
      }
    ]
  },
  {
    name: 'Subhas Chandra Bose',
    title: 'Netaji',
    scenarios: [
      {
        id: 0,
        question: "1941. World War II rages on and Britain refuses to promise Indian independence. You've escaped British surveillance and reached Germany. How will you fight for India's freedom?",
        options: [
          "Form Azad Hind Fauj",
          "Return to Congress",
          "Stay in Britain",
          "Choose neutrality"
        ],
        correctOption: 0,
        nextScenario: null,
        wrongPath: null,
        consequence: "The Indian National Army becomes a symbol of resistance."
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
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const startGame = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentScenario(0);
    setGameOver(false);
    setIsVictory(false);
    setConsequence("");
    setShowOptions(false);
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (!selectedCharacter) return;

    const scenario = selectedCharacter.scenarios[currentScenario];
    const isCorrect = selectedAnswer === scenario.correctOption;
    setShowOptions(false);
    setConsequence(scenario.consequence || "");

    setTimeout(() => {
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
    }, 1500);
  };

  const mainContent = () => {
    if (gameOver) {
      return (
        <Card className="bg-[#FFF8DC] shadow-lg rounded-lg">
          <h1 className="bg-[#2C1810] text-[#F5E6D3] text-center py-6 text-3xl font-bold">
            {isVictory ? "Victory!" : "Game Over"}
          </h1>
          <CardContent className="p-8">
            <p className="text-lg mb-6 text-[#2C1810]">
              {isVictory 
                ? "You have successfully followed the path of wisdom and righteousness!"
                : "History took a different turn. Try again to discover the path of truth."}
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
      );
    }

    if (!selectedCharacter) {
      return (
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
                  disabled={character.scenarios.length === 0}
                >
                  <div>
                    <div>{character.name}</div>
                    <div className="text-sm opacity-80">{character.title}</div>
                  </div>
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      );
    }

    const scenario = selectedCharacter.scenarios[currentScenario];
    return (
      <Card className="bg-[#FFF8DC] shadow-lg rounded-lg">
        <h1 className="bg-[#2C1810] text-[#F5E6D3] text-center py-6 text-3xl font-bold">
          {selectedCharacter.name}
        </h1>
        <CardContent className="p-8">
          <TypewriterText 
            text={scenario.question} 
            onComplete={() => setShowOptions(true)}
          />
          {consequence && (
            <p className="text-[#D4AF37] my-6 italic">{consequence}</p>
          )}
          <AnimatePresence>
            {showOptions && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 mt-8"
              >
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
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] p-8 flex">
      <div className="w-2/3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {mainContent()}
        </motion.div>
      </div>
      <div className="w-1/3 flex items-center justify-center border-l-2 border-[#8B4513] pl-8">
        <p className="text-[#2C1810] text-xl">3D Avatar Space</p>
      </div>
    </div>
  );
};

export default Game;