import React, { useState } from "react";
import "./MultipleMCQ.css";

const MultipleMCQ = ({ question, choices, maxTrials = 3 }) => {
  const [selected, setSelected] = useState([]);
  const [trials, setTrials] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleVerify = () => {
    let correctCount = 0, actualCorrectCount = 0;
    selected.forEach((idx) => {
      if (choices[idx].correct) {
        correctCount++;
      }
    });
    for(const choice of choices) {
        if(choice.correct)  actualCorrectCount++;
    }
    if(correctCount === actualCorrectCount) {
        setTrials((prev) => prev + 3)
        setFeedback("عااااش 🙌️🥳️")
    } else {
        setTrials((prev) => prev + 1)
        setFeedback(
        `ركز! انت اخترت عدد${selected.length} اختيارات، منهم ${correctCount} صح.`
        );
    }


  // DO NOT set showAnswer here!
  // After maxTrials, only the "Show Answer" button will appear
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setFeedback("الاجابات الصح متلونة بالأخضر، واللي انت اخترته غلط متلون بالأحمر");
  };

  return (
    <div className="multiple-mcq-container">
      <div className="multiple-mcq-question">{question}</div>

      <div className="multiple-mcq-choices">
        {choices.map((choice, idx) => {
            let className = "multiple-mcq-choice";
            if (selected.includes(idx)) className += " selected";

            if (showAnswer) {
            if (selected.includes(idx) && !choice.correct) {
                className += " wrong"; // red for wrongly selected
            }
            if (choice.correct) {
                className += " correct"; // green for correct answers
            }
            }

          return (
            <div
              key={idx}
              className={className}
              onClick={() => toggleSelect(idx)}
            >
              {choice.text}
            </div>
          );
        })}
      </div>


      <div className="multiple-mcq-buttons">
        <button className="btn" onClick={handleVerify}>Verify</button>
          {trials >= maxTrials && !showAnswer && (
        <button className="btn" onClick={handleShowAnswer}>Show Answer</button>
      )}
    </div>

      <div className="feedback">{feedback}</div>
    </div>
  );
};

export default MultipleMCQ;
