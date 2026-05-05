import React from 'react';
import Sidebar from '../Navigation/Sidebar';
import TopBar from '../Navigation/TopBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <TopBar />
      <Sidebar />
      <main className="xl:ml-64 pt-20 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default Layout;
