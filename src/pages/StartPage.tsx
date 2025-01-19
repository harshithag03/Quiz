import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';

export const StartPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setEmail: setStoreEmail, setQuestions, resetQuiz } = useQuizStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    resetQuiz(); // Clear previous quiz data

    try {
      const response = await fetch('https://opentdb.com/api.php?amount=15', {
        cache: 'no-store' // Prevent caching
      });
      const data = await response.json();
      if (data.results) {
        setStoreEmail(email);
        setQuestions(data.results);
        navigate('/quiz');
      } else {
        throw new Error('No questions received');
      }
    } catch (error) {
      setError('Failed to fetch questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <Brain className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome to the Quiz</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your email to start the quiz
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Start Quiz'}
          </button>
        </form>
      </div>
    </div>
  );
};