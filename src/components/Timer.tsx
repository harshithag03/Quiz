import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { useNavigate } from 'react-router-dom';

export const Timer: React.FC = () => {
  const { timeRemaining, setTimeRemaining } = useQuizStore();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(Math.max(0, timeRemaining - 1));
      if (timeRemaining <= 1) {
        clearInterval(timer);
        navigate('/report');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, setTimeRemaining, navigate]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex items-center gap-2 text-xl font-semibold">
      <Clock className="w-6 h-6" />
      <span>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};