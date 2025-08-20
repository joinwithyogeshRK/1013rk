import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Timer from '../components/Timer';
import DontLookChallenge from '../components/challenges/DontLookChallenge';
import TypeRapidlyChallenge from '../components/challenges/TypeRapidlyChallenge';
import SecurityVulnerabilityChallenge from '../components/challenges/SecurityVulnerabilityChallenge';

const challenges = [
  {
    id: 1,
    title: "Don't Look",
    description: "Memorize code sequence without looking at screen",
    difficulty: "Medium",
    timeLimit: 30
  },
  {
    id: 2,
    title: "I'll catch u",
    description: "Type rapidly while avoiding digital traps",
    difficulty: "Hard",
    timeLimit: 45
  },
  {
    id: 3,
    title: "He said, 'It's fine'",
    description: "Identify security vulnerabilities in code snippets",
    difficulty: "Expert",
    timeLimit: 60
  }
];

type ChallengeStatus = 'ready' | 'active' | 'success' | 'failed';

const ChallengeScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<typeof challenges[0] | null>(null);
  const [status, setStatus] = useState<ChallengeStatus>('ready');
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    if (id) {
      const foundChallenge = challenges.find(c => c.id === parseInt(id));
      if (foundChallenge) {
        setChallenge(foundChallenge);
        setTimeLeft(foundChallenge.timeLimit);
      } else {
        navigate('/not-found');
      }
    }
  }, [id, navigate]);
  
  const startChallenge = () => {
    setStatus('active');
  };
  
  const completeChallenge = useCallback((achievedScore: number) => {
    setStatus('success');
    setScore(achievedScore);
    // In a real app, we would save the score to a database here
  }, []);
  
  const failChallenge = useCallback(() => {
    setStatus('failed');
  }, []);
  
  const resetChallenge = () => {
    if (challenge) {
      setTimeLeft(challenge.timeLimit);
      setStatus('ready');
      setScore(0);
    }
  };
  
  const renderChallengeComponent = () => {
    if (!challenge) return null;
    
    switch (challenge.id) {
      case 1:
        return <DontLookChallenge 
          status={status} 
          onComplete={completeChallenge} 
          onFail={failChallenge} 
        />;
      case 2:
        return <TypeRapidlyChallenge 
          status={status} 
          onComplete={completeChallenge} 
          onFail={failChallenge} 
        />;
      case 3:
        return <SecurityVulnerabilityChallenge 
          status={status} 
          onComplete={completeChallenge} 
          onFail={failChallenge} 
        />;
      default:
        return null;
    }
  };
  
  const renderStatusScreen = () => {
    if (status === 'success') {
      return (
        <div className="success-screen">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-success" />
            <h2 className="text-xl font-bold">Challenge Complete!</h2>
          </div>
          <p className="mb-4">You've successfully hacked the system.</p>
          <p className="text-lg font-bold mb-6">Score: {score}</p>
          <div className="flex gap-4">
            <button className="hacker-btn" onClick={resetChallenge}>Try Again</button>
            <button className="hacker-btn-secondary" onClick={() => navigate('/')}>Back to Challenges</button>
          </div>
        </div>
      );
    }
    
    if (status === 'failed') {
      return (
        <div className="failure-screen">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="h-6 w-6 text-error" />
            <h2 className="text-xl font-bold">Access Denied</h2>
          </div>
          <p className="mb-6">Security protocols have locked you out.</p>
          <div className="flex gap-4">
            <button className="hacker-btn" onClick={resetChallenge}>Try Again</button>
            <button className="hacker-btn-secondary" onClick={() => navigate('/')}>Back to Challenges</button>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  if (!challenge) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <button 
            className="hacker-btn-secondary flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Challenges
          </button>
          
          {status === 'active' && (
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <Timer 
                initialTime={challenge.timeLimit} 
                isRunning={status === 'active'} 
                onTimeUp={failChallenge}
              />
            </div>
          )}
        </div>
        
        <div className="terminal-window mb-8">
          <div className="terminal-header">
            <span>terminal@hacker:~</span>
            <span>Challenge #{challenge.id}</span>
          </div>
          <div className="terminal-body p-4">
            <h2 className="text-2xl font-bold text-primary mb-2">{challenge.title}</h2>
            <p className="mb-4 text-foreground/80">{challenge.description}</p>
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-primary/20 text-primary text-sm px-2 py-1 rounded">
                {challenge.difficulty}
              </span>
              <span className="bg-primary/20 text-primary text-sm px-2 py-1 rounded flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {challenge.timeLimit}s
              </span>
            </div>
            
            {status === 'ready' && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  <p>Are you ready to begin the challenge?</p>
                </div>
                <button className="hacker-btn" onClick={startChallenge}>Start Challenge</button>
              </div>
            )}
            
            {(status === 'success' || status === 'failed') && renderStatusScreen()}
            
            {status === 'active' && renderChallengeComponent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChallengeScreen;
