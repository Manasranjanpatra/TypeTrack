import React from 'react';
import { Trophy, Target, Zap, RotateCcw, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface TypingStats {
  wpm: number;
  accuracy: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  incorrectKeystrokes: number;
}

interface ResultsSummaryProps {
  stats: TypingStats;
  onRestart: () => void;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({ stats, onRestart }) => {
  const getPerformanceLevel = (wpm: number) => {
    if (wpm >= 70) return { level: 'Expert', color: 'text-yellow-500', emoji: '🏆' };
    if (wpm >= 50) return { level: 'Advanced', color: 'text-green-500', emoji: '⭐' };
    if (wpm >= 30) return { level: 'Intermediate', color: 'text-blue-500', emoji: '👍' };
    if (wpm >= 15) return { level: 'Beginner', color: 'text-purple-500', emoji: '🌱' };
    return { level: 'Learning', color: 'text-gray-500', emoji: '📚' };
  };

  const performance = getPerformanceLevel(stats.wpm);

  const handleShare = () => {
    const shareText = `I just completed a typing test! 🎯\n\n⚡ Speed: ${stats.wpm} WPM\n🎯 Accuracy: ${stats.accuracy}%\n📊 Performance: ${performance.level}\n\nTry it yourself!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Typing Test Results',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Results copied to clipboard!');
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">{performance.emoji}</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Test Complete!
        </h1>
        <p className={`text-xl font-semibold ${performance.color}`}>
          {performance.level} Level
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="stats-card text-center animate-in zoom-in duration-300">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-yellow-500 mr-2" />
            <span className="text-lg font-medium text-muted-foreground">Speed</span>
          </div>
          <div className="text-4xl font-bold text-yellow-500 mb-2">{stats.wpm}</div>
          <div className="text-sm text-muted-foreground">Words Per Minute</div>
        </Card>
        
        <Card className="stats-card text-center animate-in zoom-in duration-300" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-center mb-4">
            <Target className="w-8 h-8 text-green-500 mr-2" />
            <span className="text-lg font-medium text-muted-foreground">Accuracy</span>
          </div>
          <div className="text-4xl font-bold text-green-500 mb-2">{stats.accuracy}%</div>
          <div className="text-sm text-muted-foreground">Correct Characters</div>
        </Card>
        
        <Card className="stats-card text-center animate-in zoom-in duration-300" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-purple-500 mr-2" />
            <span className="text-lg font-medium text-muted-foreground">Keystrokes</span>
          </div>
          <div className="text-4xl font-bold text-purple-500 mb-2">{stats.totalKeystrokes}</div>
          <div className="text-sm text-muted-foreground">Total Characters</div>
        </Card>
      </div>

      {/* Detailed Stats */}
      <Card className="stats-card">
        <h3 className="text-xl font-semibold mb-6 text-center">Detailed Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-2xl font-bold text-green-600">{stats.correctKeystrokes}</div>
            <div className="text-sm text-green-700">Correct</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="text-2xl font-bold text-red-600">{stats.incorrectKeystrokes}</div>
            <div className="text-sm text-red-700">Incorrect</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{Math.round(stats.wpm * 5)}</div>
            <div className="text-sm text-blue-700">Chars/Min</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">{stats.totalKeystrokes > 0 ? Math.round((stats.correctKeystrokes / stats.totalKeystrokes) * 100) : 0}%</div>
            <div className="text-sm text-purple-700">Precision</div>
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="stats-card bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="text-lg font-semibold mb-4 text-center">💡 Tips for Improvement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {stats.accuracy < 90 && (
            <div className="flex items-start space-x-2">
              <span className="text-yellow-500">⚡</span>
              <span>Focus on accuracy first, then speed will follow naturally.</span>
            </div>
          )}
          {stats.wpm < 40 && (
            <div className="flex items-start space-x-2">
              <span className="text-blue-500">👆</span>
              <span>Practice proper finger placement on the home row keys.</span>
            </div>
          )}
          <div className="flex items-start space-x-2">
            <span className="text-green-500">🎯</span>
            <span>Take regular breaks to maintain focus and prevent fatigue.</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-500">📈</span>
            <span>Consistent daily practice leads to significant improvement.</span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onRestart}
          className="btn-gradient"
          size="lg"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Take Another Test
        </Button>
        
        <Button
          onClick={handleShare}
          variant="outline"
          size="lg"
          className="border-2 hover:bg-muted/50"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </Button>
      </div>
    </div>
  );
};