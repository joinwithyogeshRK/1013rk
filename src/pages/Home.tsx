import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Trophy, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import ChallengeCard from '../components/ChallengeCard';
import Footer from '../components/Footer';

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

const Home = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-16">
          <div className="terminal-window mb-8">
            <div className="terminal-header">
              <span>terminal@hacker:~</span>
              <span>System Access</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="terminal-prompt">$</span>
                <span className="terminal-text typing-effect">Welcome to Hacker Challenge Cards</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">$</span>
                <span className="terminal-text">Select a challenge to begin...</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Available Challenges</h2>
            <button 
              className="hacker-btn-secondary flex items-center gap-2"
              onClick={() => navigate('/leaderboard')}
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                isHovered={hoveredCard === challenge.id}
                onMouseEnter={() => setHoveredCard(challenge.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(`/challenge/${challenge.id}`)}
              />
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-6">How It Works</h2>
          <div className="terminal-window">
            <div className="terminal-header">
              <span>terminal@hacker:~</span>
              <span>Instructions</span>
            </div>
            <div className="terminal-body p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 p-2 rounded-md">
                    <Terminal className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">Select a Challenge</h3>
                    <p className="text-foreground/80">Choose from our collection of hacking challenges</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 p-2 rounded-md">
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">Complete the Task</h3>
                    <p className="text-foreground/80">Follow the instructions and beat the timer</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 p-2 rounded-md">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">Climb the Leaderboard</h3>
                    <p className="text-foreground/80">Compete with other hackers for the top spot</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
