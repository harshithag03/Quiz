import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';
import { CheckCircle, XCircle } from 'lucide-react';

export const ReportPage: React.FC = () => {
  const { questions, userAnswers, email, resetQuiz } = useQuizStore();
  const navigate = useNavigate();

  const handleRetakeQuiz = () => {
    resetQuiz();
    navigate('/');
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">Quiz Report</h1>
          <p className="text-gray-600">Email: {email}</p>
          <p className="text-lg font-semibold mt-4">
            Score: {calculateScore()} out of {questions.length}
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => {
            const isCorrect = userAnswers[index] === question.correct_answer;
            return (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow border-l-4 ${
                  isCorrect ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3
                      className="text-lg font-medium mb-4"
                      dangerouslySetInnerHTML={{ __html: question.question }}
                    />
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-gray-500">Your Answer:</p>
                        <p
                          className={`font-medium ${
                            isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}
                          dangerouslySetInnerHTML={{ __html: userAnswers[index] || 'No answer' }}
                        />
                      </div>
                      {!isCorrect && (
                        <div>
                          <p className="text-sm text-gray-500">Correct Answer:</p>
                          <p
                            className="font-medium text-green-600"
                            dangerouslySetInnerHTML={{ __html: question.correct_answer }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleRetakeQuiz}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    </div>
  );
};