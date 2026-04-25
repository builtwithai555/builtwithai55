export default function QuizQuestion({ question, options, progress, onAnswer }) {
  return (
    <div className="card">
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <h2 className="mb-6">{question}</h2>
      <div>
        {options.map((option, index) => (
          <button
            key={index}
            className="option-btn"
            onClick={() => onAnswer(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
