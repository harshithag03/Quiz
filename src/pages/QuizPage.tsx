import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer } from '../components/Timer';
import { QuestionNavigation } from '../components/QuestionNavigation';
import { useQuizStore } from '../store/quizStore';

export const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();
  const { questions, email, userAnswers, setAnswer, markVisited } = useQuizStore();

  useEffect(() => {
    // Redirect to start if no email or questions
    if (!email || questions.length === 0) {
      navigate('/');
      return;
    }
    
    markVisited(currentQuestion);
  }, [currentQuestion, markVisited, questions.length, email, navigate]);

  const handleAnswerSelect = (answer: string) => {
    setAnswer(currentQuestion, answer);
  };

  const handleNavigate = (index: number) => {
    setCurrentQuestion(index);
  };

  if (!email || questions.length === 0) {
    return null; // Don't show loading, we'll redirect
  }

  const question = questions[currentQuestion];
  const answers = [...question.incorrect_answers, question.correct_answer].sort();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <h1 className="text-xl font-bold">Quiz</h1>
          <Timer />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p
                className="text-gray-800 mb-6"
                dangerouslySetInnerHTML={{ __html: question.question }}
              />
              <div className="space-y-3">
                {answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(answer)}
                    className={`w-full p-3 text-left rounded-lg transition-colors ${
                      userAnswers[currentQuestion] === answer
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    dangerouslySetInnerHTML={{ __html: answer }}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={() => navigate('/report')}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Finish Quiz
                </button>
              ) : (
                <button
                  onClick={() =>
                    setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              )}
            </div>
          </div>

          <div className="md:col-span-1">
            <QuestionNavigation
              currentQuestion={currentQuestion}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};