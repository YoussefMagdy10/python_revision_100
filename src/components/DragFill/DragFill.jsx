import React, { useState } from "react";
import "./DragFill.css";

const DragFill = ({ paragraphTemplate, words, feedbackCorrect, feedbackWrong }) => {
  // State: save dropped answers in their paragraph positions
  const [userAnswers, setUserAnswers] = useState(
    Array(paragraphTemplate.length).fill("")
  );
  const [checked, setChecked] = useState(false);

  // Step 1 — Extract indexes of blanks from paragraph
  const blankIndexes = paragraphTemplate
    .map((p, i) => (p === "___" ? i : null))
    .filter((i) => i !== null);

  // Drag handlers
  const handleDragStart = (word, e) => {
    e.dataTransfer.setData("text", word);
  };

  const handleDrop = (index, e) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("text");

    const updated = [...userAnswers];
    updated[index] = word;
    setUserAnswers(updated);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleCheck = () => {
    setChecked(true);
  };

  const handleRetry = () => {
    setUserAnswers(Array(paragraphTemplate.length).fill(""));
    setChecked(false);
  };

  // Step 2 — Correctness check using the FIXED mapping
  const isCorrect = () => {
    for (let i = 0; i < words.length; i++) {
      const blankPos = blankIndexes[i]; // actual paragraph index of this blank
      if (userAnswers[blankPos] !== words[i]) return false;
    }
    return true;
  };

  return (
    <div className="dragfill-container">

      {/* Word bank */}
      <div className="word-bank">
        {words.map((w, idx) => (
          <span
            key={idx}
            className="draggable-word"
            draggable={!checked}
            onDragStart={(e) => handleDragStart(w, e)}
          >
            {w}
          </span>
        ))}
      </div>

      {/* Paragraph with blanks */}
      <p className="paragraph">
        {paragraphTemplate.map((part, idx) =>
          part === "___" ? (
            <span
              key={idx}
              className={`drop-zone ${
                checked
                  ? userAnswers[idx] === words[blankIndexes.indexOf(idx)]
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              onDrop={(e) => handleDrop(idx, e)}
              onDragOver={handleDragOver}
            >
              {userAnswers[idx]}
            </span>
          ) : (
            <span key={idx}>{part}</span>
          )
        )}
      </p>

      {/* Buttons */}
      <div className="buttons">
        <button className="dragbtn" onClick={handleCheck}>Check</button>
        <button className="dragbtn" onClick={handleRetry}>Retry</button>
      </div>

      {/* Feedback */}
      {checked && (
        <div className="feedback">
          {isCorrect() ? feedbackCorrect : feedbackWrong}
        </div>
      )}
    </div>
  );
};

export default DragFill;
