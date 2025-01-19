import { create } from 'zustand';
import { QuizState } from '../types/quiz';

export const useQuizStore = create<QuizState>((set) => ({
  email: '',
  questions: [],
  userAnswers: {},
  visitedQuestions: new Set(),
  timeRemaining: 30 * 60, // 30 minutes in seconds

  setEmail: (email) => set({ email }),
  setQuestions: (questions) => set({ questions }),
  setAnswer: (questionIndex, answer) =>
    set((state) => ({
      userAnswers: { ...state.userAnswers, [questionIndex]: answer },
    })),
  markVisited: (questionIndex) =>
    set((state) => ({
      visitedQuestions: new Set([...state.visitedQuestions, questionIndex]),
    })),
  setTimeRemaining: (time) => set((state) => ({ timeRemaining: time })),
  resetQuiz: () =>
    set({
      questions: [],
      userAnswers: {},
      visitedQuestions: new Set(),
      timeRemaining: 30 * 60,
    }),
}));