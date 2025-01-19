import React from 'react';
import { useQuizStore } from '../store/quizStore';

interface Props {
  currentQuestion: number;
  onNavigate: (index: number) => void;
}

export const QuestionNavigation: React.FC<Props> = ({ currentQuestion, onNavigate }) => {
  const { questions, visitedQuestions, userAnswers } = useQuizStore();

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow">
      <h3 className="w-full text-lg font-semibold mb-2">Question Overview</h3>
      {questions.map((_, index) => {
        const isVisited = visitedQuestions.has(index);
        const isAnswered = userAnswers[index] !== undefined;
        const isCurrent = currentQuestion === index;

        return (
          <button
            key={index}
            onClick={() => onNavigate(index)}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all
              ${isCurrent ? 'ring-2 ring-blue-500' : ''}
              ${
                isAnswered
                  ? 'bg-green-500 text-white'
                  : isVisited
                  ? 'bg-yellow-100'
                  : 'bg-gray-100'
              }`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};