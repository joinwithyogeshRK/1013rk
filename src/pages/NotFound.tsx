import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="terminal-window max-w-md w-full">
        <div className="terminal-header">
          <span>terminal@hacker:~</span>
          <span>Error 404</span>
        </div>
        <div className="terminal-body p-6">
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="h-16 w-16 text-error mb-4 animate-pulse" />
            <h1 className="text-2xl font-bold text-error mb-2">ACCESS DENIED</h1>
            <p className="mb-6 text-foreground/80">The system could not locate the requested resource.</p>
            <div className="typing-effect mb-6 text-primary w-full">
              Error: Path not found. Security breach detected.
            </div>
            <button 
              className="hacker-btn flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4" />
              Return to Base
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
