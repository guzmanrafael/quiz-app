import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IQuestion } from '../data/IQuestions';
import { shuffle } from '../utils/shuffle';

interface QuestionState {
  questions: IQuestion[];
  selectedQuestion: IQuestion | null;
  updateQuestion: (question: IQuestion) => void;
  resetQuestions: () => void;
  setSelectedQuestion: () => void;
  setQuestions: (questions: IQuestion[]) => void;
}

export const useQuestionStore = create<QuestionState>()(
  devtools((set) => ({
    questions: [],
    selectedQuestion: null,
    updateQuestion: (questionData: IQuestion) => {
      set((state) => {
        const question = state.questions.findIndex((q) => q.id === questionData.id);
        state.questions[question].status = true;
        return { questions: state.questions };
      });
    },
    resetQuestions: () => {
      set((state) => {
        return {
          questions: state.questions.map((question) => {
            question.status = false;
            return question;
          }),
          selectedQuestion: null,
        };
      });
    },
    setSelectedQuestion: () => {
      set((state) => {
        const dataFilter = state.questions.filter((question) => question.status === false);
        const question = dataFilter[Math.floor(Math.random() * dataFilter.length)];
        const questionShuffle = shuffle(question.choices);
        question.choices = questionShuffle;
        if (dataFilter.length > 0) {
          return {
            selectedQuestion: question,
          };
        } else {
          return {
            selectedQuestion: null,
          };
        }
      });
    },
    setQuestions: (questions: IQuestion[]) => {
      set({ questions: questions });
    },
  })),
);
