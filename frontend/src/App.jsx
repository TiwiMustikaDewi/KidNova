import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detection from './pages/Detection';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-shell">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      <main className="main-content">
        {currentView === 'home' ? (
          <Home onStartCheck={() => handleNavigate('detection')} />
        ) : (
          <Detection />
        )}
      </main>

      <Footer />
    </div>
  );
}
