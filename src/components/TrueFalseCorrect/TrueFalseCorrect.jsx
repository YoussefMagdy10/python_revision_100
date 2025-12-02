import React, { useState } from "react";
import "./TrueFalseCorrect.css";

/*
  props:
  questions: [
    { text: "...", isTrue: true|false, correctAnswer: "..." },
    ...
  ]
*/

const TrueFalseCorrect = ({ explanation, questions }) => {
  // answers: array of { selected: null | "true" | "false", correction: string }
  const [answers, setAnswers] = useState(
    questions.map(() => ({ selected: null, correction: "" }))
  );

  // submitted = user pressed "Submit All" at least once
  const [submitted, setSubmitted] = useState(false);

  // locked[i] === true means question i was correct at last submit and is locked (can't edit)
  const [locked, setLocked] = useState(questions.map(() => false));

  const [showAnswer, setShowAnswer] = useState(false);

  const normalize = (s = "") => String(s).replace(/\s+/g, "");

  const handleSelect = (idx, value) => {
    // ignore selection if this question is locked
    if (locked[idx]) return;
    const updated = [...answers];
    updated[idx] = { ...updated[idx], selected: value };
    // if selecting true, clear correction
    if (value === "true") updated[idx].correction = "";
    setAnswers(updated);
  };

  const handleCorrection = (idx, val) => {
    if (locked[idx]) return;
    const updated = [...answers];
    updated[idx] = { ...updated[idx], correction: val };
    setAnswers(updated);
  };
  
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const isQuestionCorrectNow = (q, a) => {
    // If the statement is true, the user must select "true"
    if (q.isTrue) return a.selected === "true";

    // If the statement is false, user must select "false" and provide correction matching correctAnswer
    if (a.selected !== "false") return false;
    return normalize(a.correction) === normalize(q.correctAnswer);
  };

  const handleSubmitAll = () => {
    // compute locked array: true if correct, false if wrong
    const newLocked = answers.map((a, i) => {
      const q = questions[i];
      return isQuestionCorrectNow(q, a);
    });
    setLocked(newLocked);
    setSubmitted(true);
  };

  const handleRetry = (idx) => {
    // clear only this question's answer and unlock it so the user can edit
    const updatedAnswers = [...answers];
    updatedAnswers[idx] = { selected: null, correction: "" };
    setAnswers(updatedAnswers);

    const newLocked = [...locked];
    newLocked[idx] = false; // unlock it
    setLocked(newLocked);

    // Keep submitted = true so other questions keep their locked state and feedback.
    // Optionally we could set submitted=false when all unlocked; here we keep it true.
  };

  const hasIncorrect = submitted && answers.some((a, i) => !locked[i]);
  const uid = React.useId();
  return (
    <div className="tf-container">
      <p className="title">{explanation}</p>
      {questions.map((q, idx) => {
        const a = answers[idx];
        const wasSubmitted = submitted;
        const isLocked = locked[idx];
        const correct = wasSubmitted ? isQuestionCorrectNow(q, a) : null;

        return (
          <div
            key={idx}
            className={`tf-question ${wasSubmitted ? (correct ? "correct" : "wrong") : ""}`}
          >
            <p className="tf-text">{q.text}</p>

            <div className="tf-options">
              <label>
                <input
                  type="radio"
                  name={`tf-${uid}-${idx}`}
                  disabled={wasSubmitted && isLocked}
                  checked={a.selected === "true"}
                  onChange={() => handleSelect(idx, "true")}
                />
                True
              </label>

              <label>
                <input
                  type="radio"
                  name={`tf-${idx}`}
                  disabled={wasSubmitted && isLocked}
                  checked={a.selected === "false"}
                  onChange={() => handleSelect(idx, "false")}
                />
                False
              </label>
            </div>

            {a.selected === "false" && (
              <textarea
                className="tf-correction"
                placeholder="Write the correct code here..."
                disabled={wasSubmitted && isLocked}
                value={a.correction}
                onChange={(e) => handleCorrection(idx, e.target.value)}
              />
            )}

            {wasSubmitted && !correct && (
              <button className="retry-btn truefalsebtn" onClick={() => handleRetry(idx)}>
                Retry
              </button>
            )}

            {wasSubmitted && (
              <div className="tf-feedback">
                {correct ? "✔ Correct!" : "✘ Incorrect"}
              </div>
            )}

            {/* 🔥 FIXED: This must be inside the returned JSX */}
            {showAnswer && !correct && (
              <div className="tf-correct-answer">
                Correct Answer: {q.isTrue ? "True" : `False — ${q.correctAnswer}`}
              </div>
            )}
          </div>
        );

      })}

      {/* If not submitted, show the Submit All button. If submitted but there are still wrong unlocked questions,
          you may want to allow re-submit; keep Submit All visible so user can check again after retries. */}
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button className="submit-btn truefalsebtn" onClick={handleSubmitAll}>
          Submit
        </button>

        {/* {hasIncorrect && !showAnswer && (
          <div style={{ marginTop: 10 }}>
            <button className="show-answer-btn truefalsebtn" onClick={handleShowAnswer}>
              Show Correct Answer
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TrueFalseCorrect;
