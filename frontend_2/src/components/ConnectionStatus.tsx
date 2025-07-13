import React, { useState, useEffect } from 'react';
import { socketService } from '../services/socket';

const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = () => {
      // Check if socket is connected
      const socket = (socketService as any).socket;
      setIsConnected(socket && socket.connected);
    };

    // Check connection status immediately
    checkConnection();

    // Set up interval to check connection status
    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-full shadow-lg ${
        isConnected 
          ? 'bg-green-100 border border-green-400 text-green-700' 
          : 'bg-red-100 border border-red-400 text-red-700'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}></div>
        <span className="text-xs font-medium">
          {isConnected ? 'Live Updates' : 'Offline'}
        </span>
      </div>
    </div>
  );
};

export default ConnectionStatus; 