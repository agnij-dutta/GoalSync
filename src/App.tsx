import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/dashboard/Dashboard';
import AuthCallback from './components/auth/AuthCallback';
import PodList from './components/dashboard/PodList';
import GoalList from './components/dashboard/GoalList';
import ProgressTracker from './components/progress/ProgressTracker';
import AchievementSystem from './components/achievements/AchievementSystem';
import NotificationCenter from './components/notifications/NotificationCenter';
import Feedback from './components/feedback/PodFeedback';
import StreakCounter from './components/gamification/StreakCounter';
import axios from 'axios';
import { Pod } from './types';

function App() {
  const [pods, setPods] = useState<Pod[]>([]);

  const handlePodCreated = (newPod: Pod) => {
    setPods((prevPods) => [...prevPods, newPod]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/pods" element={<PodList pods={pods} onPodCreated={handlePodCreated} />} />
        <Route path="/goals" element={<GoalList />} />
        <Route path="/progress" element={<ProgressTracker />} />
        <Route path="/achievements" element={<AchievementSystem />} />
        <Route path="/notifications" element={<NotificationCenter />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/streak" element={<StreakCounter />} />
      </Routes>
    </Router>
  );
}

export default App;