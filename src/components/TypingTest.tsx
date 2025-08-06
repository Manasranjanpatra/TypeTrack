import React, { useState, useEffect, useCallback } from 'react';
import { Timer, RotateCcw, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const sampleParagraphs = [
  "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet and is often used for typing practice. It helps improve finger dexterity and keyboard familiarity while maintaining a natural flow of words.",
  "Technology has revolutionized the way we communicate, work, and learn. From smartphones to artificial intelligence, innovation continues to shape our daily lives in ways we never imagined possible just a few decades ago.",
  "The art of typing efficiently requires practice, patience, and proper finger placement. Good posture, regular breaks, and consistent practice sessions will help you develop muscle memory and increase your words per minute.",
  "In today's digital world, fast and accurate typing skills are essential for productivity. Whether you're a student, professional, or casual computer user, improving your typing speed can save valuable time and reduce frustration.",
  "Programming languages like JavaScript, Python, and TypeScript have become fundamental tools for creating modern web applications. Understanding syntax, logic, and best practices enables developers to build innovative solutions."
];

interface TypingStats {
  wpm: number;
  accuracy: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  incorrectKeystrokes: number;
}

interface TypingTestProps {
  onComplete: (stats: TypingStats) => void;
}

export const TypingTest: React.FC<TypingTestProps> = ({ onComplete }) => {
  const [text] = useState(() => sampleParagraphs[Math.floor(Math.random() * sampleParagraphs.length)]);
  const [userInput, setUserInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    totalKeystrokes: 0,
    correctKeystrokes: 0,
    incorrectKeystrokes: 0
  });

  const calculateStats = useCallback(() => {
    const totalChars = userInput.length;
    const correctChars = userInput.split('').filter((char, index) => char === text[index]).length;
    const incorrectChars = totalChars - correctChars;
    const wordsTyped = totalChars / 5; // Standard: 5 characters = 1 word
    const timeElapsed = (60 - timeLeft) / 60; // Time in minutes
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

    return {
      wpm,
      accuracy,
      totalKeystrokes: totalChars,
      correctKeystrokes: correctChars,
      incorrectKeystrokes: incorrectChars
    };
  }, [userInput, text, timeLeft]);

  useEffect(() => {
    console.log('Timer effect triggered:', { isActive, timeLeft, isCompleted });
    
    if (isActive && timeLeft > 0 && !isCompleted) {
      console.log('Starting timer interval');
      const timer = setInterval(() => {
      
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
   
          return newTime;
        });
      }, 1000);
      return () => {

        clearInterval(timer);
      };
    } else if (timeLeft === 0 && !isCompleted) {
     
      setIsCompleted(true);
      setIsActive(false);
      onComplete(calculateStats());
    }
  }, [isActive, timeLeft, isCompleted, onComplete]);

  useEffect(() => {
    const newStats = calculateStats();
    setStats(newStats);
  }, [calculateStats]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    console.log('Input changed:', { value: value.length, isActive, timeLeft });
    
    if (!isActive && value.length === 1) {
      console.log('Activating timer - first character typed');
      setIsActive(true);
    }
    
    if (value.length <= text.length) {
      setUserInput(value);
      setCurrentIndex(value.length);
    }
  };

  const handleRestart = () => {
    setUserInput('');
    setCurrentIndex(0);
    setTimeLeft(60);
    setIsActive(false);
    setIsCompleted(false);
    setStats({
      wpm: 0,
      accuracy: 0,
      totalKeystrokes: 0,
      correctKeystrokes: 0,
      incorrectKeystrokes: 0
    });
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'char-untyped';
      
      if (index < userInput.length) {
        className = userInput[index] === char ? 'char-correct' : 'char-incorrect';
      } else if (index === currentIndex) {
        className = 'char-current';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Typing Speed Test
        </h1>
        <p className="text-muted-foreground text-lg">
          Test your typing speed and accuracy with our modern typing checker
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="stats-card text-center">
          <div className="flex items-center justify-center mb-2">
            <Timer className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm font-medium text-muted-foreground">Time</span>
          </div>
          <div className="text-2xl font-bold text-primary">{formatTime(timeLeft)}</div>
        </Card>
        
        <Card className="stats-card text-center">
          <div className="text-sm font-medium text-muted-foreground mb-2">WPM</div>
          <div className="text-2xl font-bold text-green-600">{stats.wpm}</div>
        </Card>
        
        <Card className="stats-card text-center">
          <div className="text-sm font-medium text-muted-foreground mb-2">Accuracy</div>
          <div className="text-2xl font-bold text-blue-600">{stats.accuracy}%</div>
        </Card>
        
        <Card className="stats-card text-center">
          <div className="text-sm font-medium text-muted-foreground mb-2">Keystrokes</div>
          <div className="text-2xl font-bold text-purple-600">{stats.totalKeystrokes}</div>
        </Card>
      </div>

      {/* Typing Area */}
      <Card className="stats-card">
        <div className="typing-text mb-6 p-6 bg-muted/30 rounded-xl min-h-[120px] leading-relaxed">
          {renderText()}
        </div>
        
        <textarea
          value={userInput}
          onChange={handleInputChange}
          disabled={isCompleted}
          placeholder={isActive ? "Keep typing..." : "Start typing to begin the test..."}
          className="w-full p-4 border rounded-xl bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-lg"
          rows={4}
          autoFocus
        />
        
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleRestart}
            className="btn-gradient"
            size="lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Test
          </Button>
        </div>
      </Card>

      {/* Progress Indicator */}
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(userInput.length / text.length) * 100}%` }}
        />
      </div>
    </div>
  );
};