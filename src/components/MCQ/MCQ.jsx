import React, { useState } from "react";
import "./MCQ.css";

const MCQ = ({ question, choices, correctIndex, feedbackCorrect, feedbackWrong }) => {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => setChecked(true);
  const handleRetry = () => {
    setSelected(null);
    setChecked(false);
  };

  return (
    <div className="mcq-container">
      <p className="question">{question}</p>

      <ul className="choices">
        {choices.map((choice, idx) => {
          let className = "";
          if (checked) {
            if (idx === selected && idx === correctIndex) className = "correct";
            else if (idx === selected && idx !== correctIndex) className = "wrong";
          }
          return (
            <li key={idx}>
              <label className={className}>
                <input
                  type="radio"
                  name={question}
                  value={idx}
                  checked={selected === idx}
                  onChange={() => setSelected(idx)}
                  disabled={checked}
                />
                {choice}
              </label>
            </li>
          );
        })}
      </ul>
      
      <div className="mcq-buttons">
        <button className="mcqbtn" onClick={handleCheck} disabled={selected === null || checked}>
          Check Answer
        </button>
        <button className="mcqbtn" onClick={handleRetry}>Retry</button>
      </div>

      {checked && (
        <div className="feedback">
          {selected === correctIndex ? feedbackCorrect : feedbackWrong}
        </div>
      )}
    </div>
  );
};

export default MCQ;
