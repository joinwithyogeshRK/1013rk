import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Medal, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type LeaderboardEntry = {
  id: number;
  username: string;
  score: number;
  challenge: string;
  completionTime: string;
  date: string;
};

// Mock data - in a real app, this would come from an API
const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: 1,
    username: "CyberNinja",
    score: 95,
    challenge: "Don't Look",
    completionTime: "00:12:45",
    date: "2023-06-15"
  },
  {
    id: 2,
    username: "PixelPirate",
    score: 88,
    challenge: "I'll catch u",
    completionTime: "00:14:30",
    date: "2023-06-14"
  },
  {
    id: 3,
    username: "CodePhantom",
    score: 92,
    challenge: "He said, 'It's fine'",
    completionTime: "00:18:22",
    date: "2023-06-13"
  },
  {
    id: 4,
    username: "ByteBreaker",
    score: 85,
    challenge: "Don't Look",
    completionTime: "00:15:10",
    date: "2023-06-12"
  },
  {
    id: 5,
    username: "HackMaster",
    score: 90,
    challenge: "I'll catch u",
    completionTime: "00:16:05",
    date: "2023-06-11"
  },
  {
    id: 6,
    username: "DataDrifter",
    score: 82,
    challenge: "He said, 'It's fine'",
    completionTime: "00:20:15",
    date: "2023-06-10"
  },
  {
    id: 7,
    username: "CipherSage",
    score: 87,
    challenge: "Don't Look",
    completionTime: "00:14:55",
    date: "2023-06-09"
  }
];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<string>('all');
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLeaderboardData(mockLeaderboardData);
    }, 500);
  }, []);
  
  const filteredData = selectedChallenge === 'all' 
    ? leaderboardData 
    : leaderboardData.filter(entry => entry.challenge === selectedChallenge);
  
  const sortedData = [...filteredData].sort((a, b) => b.score - a.score);
  
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
          
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            Hacker Leaderboard
          </h1>
        </div>
        
        <div className="terminal-window mb-8">
          <div className="terminal-header">
            <span>terminal@hacker:~</span>
            <span>Leaderboard</span>
          </div>
          <div className="terminal-body p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-primary font-bold">{sortedData.length} Hackers</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-primary">Filter:</span>
                <select 
                  className="bg-surface border border-primary/30 text-primary px-3 py-1 rounded-sm"
                  value={selectedChallenge}
                  onChange={(e) => setSelectedChallenge(e.target.value)}
                >
                  <option value="all">All Challenges</option>
                  <option value="Don't Look">Don't Look</option>
                  <option value="I'll catch u">I'll catch u</option>
                  <option value="He said, 'It's fine'">He said, 'It's fine'</option>
                </select>
              </div>
            </div>
            
            {leaderboardData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-primary/60">Loading leaderboard data...</p>
              </div>
            ) : (
              <div className="leaderboard">
                <div className="leaderboard-header grid grid-cols-12 gap-4">
                  <div className="col-span-1">#</div>
                  <div className="col-span-3">Hacker</div>
                  <div className="col-span-2">Score</div>
                  <div className="col-span-3">Challenge</div>
                  <div className="col-span-2">Time</div>
                  <div className="col-span-1">Date</div>
                </div>
                
                {sortedData.map((entry, index) => (
                  <div key={entry.id} className="leaderboard-item grid grid-cols-12 gap-4">
                    <div className="col-span-1 flex items-center">
                      {index === 0 && <Medal className="h-4 w-4 text-warning" />}
                      {index === 1 && <Medal className="h-4 w-4 text-secondary" />}
                      {index === 2 && <Medal className="h-4 w-4 text-accent" />}
                      {index > 2 && index + 1}
                    </div>
                    <div className="col-span-3 font-bold">{entry.username}</div>
                    <div className="col-span-2">{entry.score}</div>
                    <div className="col-span-3">{entry.challenge}</div>
                    <div className="col-span-2 font-mono">{entry.completionTime}</div>
                    <div className="col-span-1 text-primary/60">{entry.date}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
