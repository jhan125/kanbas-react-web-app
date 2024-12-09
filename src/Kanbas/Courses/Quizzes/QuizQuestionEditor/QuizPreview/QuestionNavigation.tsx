import { CiCircleQuestion } from "react-icons/ci";

interface QuestionNavigationProps {
  totalQuestions: number;
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
}


export default function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  setCurrentQuestion,
}: QuestionNavigationProps) {
  return (
    <div className="question-navigation">
      {Array.from({ length: totalQuestions }, (_, index) => (
        <button
          key={index}
          className={`question-link ${index === currentQuestion ? 'active' : ''}`}
          onClick={() => setCurrentQuestion(index)}
          aria-label={`Go to question ${index + 1}`}
        >
          <CiCircleQuestion className="question-icon" />
          Question {index + 1}
        </button>
      ))}
    </div>
  );
}