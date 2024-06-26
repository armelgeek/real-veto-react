import React, { createContext, useEffect } from 'react';
import io from 'socket.io-client';
export const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
  const socket = io('http://192.168.1.1:8100');
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
