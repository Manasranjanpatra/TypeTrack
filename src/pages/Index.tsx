import React, { useState } from 'react';
import { TypingTest } from '@/components/TypingTest';
import { ResultsSummary } from '@/components/ResultsSummary';

interface TypingStats {
  wpm: number;
  accuracy: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  incorrectKeystrokes: number;
}

const Index = () => {
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [testResults, setTestResults] = useState<TypingStats | null>(null);

  const handleTestComplete = (stats: TypingStats) => {
    setTestResults(stats);
    setIsTestComplete(true);
  };

  const handleRestart = () => {
    setIsTestComplete(false);
    setTestResults(null);
  };

  return (
    <div className="min-h-screen py-8">
      {isTestComplete && testResults ? (
        <ResultsSummary 
          stats={testResults} 
          onRestart={handleRestart}
        />
      ) : (
        <TypingTest onComplete={handleTestComplete} />
      )}
    </div>
  );
};

export default Index;
