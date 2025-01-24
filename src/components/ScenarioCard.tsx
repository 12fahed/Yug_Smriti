"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import ReactConfetti from 'react-confetti';

interface Decision {
  decision: string;
  outcome: string;
  score: number;
}

interface Scenario {
  title: string;
  description: string;
  role: string;
  decisions: Decision[];
}

const ScenarioCard: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    axios
      .get('http://localhost:8001/api/random_scenarios/')
      .then((response) => {
        setScenarios(response.data);
      })
      .catch((error) => {
        console.error('Error fetching scenarios:', error);
      });

    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
    };
  }, []);

  const handleDecision = (scoreChange: number) => {
    setScore((prevScore) => prevScore + scoreChange);
    const nextScenarioIndex = currentScenarioIndex + 1;

    if (nextScenarioIndex < 5) {
      setCurrentScenarioIndex(nextScenarioIndex);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentScenarioIndex(0);
    setGameOver(false);
  };

  const getCurrentScenario = () => {
    return scenarios[currentScenarioIndex];
  };

  const currentScenario = getCurrentScenario();

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ 
        backgroundImage: 'url("/game-bg.png")',
      }}
    >
      {gameOver && score > 15 && (
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={200}
          gravity={0.2}
          recycle={false}
        />
      )}

      <Card 
        className="w-[500px] shadow-2xl rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#FFF8DC',
          boxShadow: '0 15px 30px rgba(44, 24, 16, 0.3)'
        }}
      >
        <CardHeader 
          className="p-6 text-center"
          style={{ 
            backgroundColor: '#2C1810',
            color: '#F5E6D3'
          }}
        >
          <h2 className="text-3xl font-bold tracking-wider">
            {gameOver ? 'Game Over' : "Historian's Challenge"}
          </h2>
        </CardHeader>

        <CardContent className="p-6">
          {gameOver ? (
            <div className="text-center">
              <p 
                className="text-2xl font-semibold mb-6"
                style={{ color: '#8B4513' }}
              >
                Final Score: <span style={{ color: '#D4AF37' }}>{score}</span>
              </p>
              <Button
                onClick={restartGame}
                className="w-full"
                style={{
                  backgroundColor: '#D4AF37',
                  color: '#2C1810',
                  fontWeight: 'bold',
                  padding: '12px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(44, 24, 16, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Restart Game
              </Button>
            </div>
          ) : (
            <>
              {currentScenario ? (
                <>
                  <h3 
                    className="text-2xl font-bold mb-4 text-center"
                    style={{ color: '#2C1810' }}
                  >
                    {currentScenario.title}
                  </h3>
                  <p 
                    className="text-lg mb-4 text-center font-semibold"
                    style={{ color: '#8B4513' }}
                  >
                    You are a {currentScenario.role} during the era of {currentScenario.title}.  
                    {currentScenario.description} What critical decision will you make?
                  </p>
                  <div className="space-y-4">
                    {currentScenario.decisions.map((decision, index) => (
                      <Button
                        key={index}
                        onClick={() => handleDecision(decision.score)}
                        className="w-full py-4" // Increased padding to accommodate more text
                        style={{
                          backgroundColor: '#8B4513',
                          color: '#FFF8DC',
                          whiteSpace: 'normal', // Allow text to wrap
                          textAlign: 'center',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#2C1810';
                          e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = '#8B4513';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        {decision.decision}
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                <p 
                  className="text-center text-lg"
                  style={{ color: '#8B4513' }}
                >
                  Loading scenarios...
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScenarioCard;