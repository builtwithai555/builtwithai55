import { useState } from 'react';
import { Activity } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import QuizQuestion from './components/QuizQuestion';
import EmailCapture from './components/EmailCapture';
import ResultsScreen from './components/ResultsScreen';
import './App.css';

const QUIZ_QUESTIONS = [
  {
    id: 'goal',
    question: "What is your primary health goal?",
    options: [
      { label: "Weight Loss & Metabolism", value: "Weight Loss & Metabolism" },
      { label: "Muscle Recovery & Growth", value: "Muscle Recovery & Growth" },
      { label: "Anti-Aging & Longevity", value: "Anti-Aging & Longevity" },
      { label: "General Wellness & Energy", value: "General Wellness & Energy" }
    ]
  },
  {
    id: 'age',
    question: "What is your age range?",
    options: [
      { label: "18 - 30", value: "18-30" },
      { label: "31 - 45", value: "31-45" },
      { label: "46 - 60", value: "46-60" },
      { label: "61+", value: "61+" }
    ]
  },
  {
    id: 'experience',
    question: "Have you ever used peptide therapies before?",
    options: [
      { label: "Yes, currently using them", value: "current" },
      { label: "Yes, in the past", value: "past" },
      { label: "No, but I'm familiar with them", value: "familiar" },
      { label: "No, I'm completely new to this", value: "new" }
    ]
  }
];

function App() {
  const [step, setStep] = useState('welcome'); // welcome, quiz, email, results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [, setEmail] = useState('');

  const handleStart = () => {
    setStep('quiz');
  };

  const handleAnswer = (option) => {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: option.value }));

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('email');
    }
  };

  const handleEmailSubmit = (submittedEmail) => {
    setEmail(submittedEmail);
    // In a real app, you would send the email and answers to your backend here
    setStep('results');
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'quiz':
        const progress = ((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100;
        return (
          <QuizQuestion 
            question={QUIZ_QUESTIONS[currentQuestionIndex].question}
            options={QUIZ_QUESTIONS[currentQuestionIndex].options}
            progress={progress}
            onAnswer={handleAnswer}
          />
        );
      case 'email':
        return <EmailCapture onSubmit={handleEmailSubmit} />;
      case 'results':
        return <ResultsScreen answers={answers} />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <a href="/" className="logo">
          <Activity size={24} /> GetPeptides
        </a>
      </header>
      
      <main className="main-content">
        {renderCurrentStep()}
      </main>
      
      <footer className="footer">
        <p className="disclaimer-text">
          <strong>Disclaimer:</strong> The information provided on this website is for educational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before starting any new treatment or peptide therapy.
        </p>
        <p className="disclaimer-text">
          This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
        </p>
      </footer>
    </div>
  );
}

export default App;
