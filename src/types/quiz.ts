export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  email: string;
  questions: Question[];
  userAnswers: Record<number, string>;
  visitedQuestions: Set<number>;
  timeRemaining: number;
  setEmail: (email: string) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswer: (questionIndex: number, answer: string) => void;
  markVisited: (questionIndex: number) => void;
  setTimeRemaining: (time: number) => void;
  resetQuiz: () => void;
}