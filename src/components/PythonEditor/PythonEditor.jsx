import React, { useState, useRef } from "react";
import "./PythonEditor.css";

// Skulpt loader
const loadSkulpt = () => {
  if (window.Sk) return Promise.resolve();
  return new Promise((resolve) => {
    const script1 = document.createElement("script");
    script1.src =
      "https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js";
    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.src =
        "https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js";
      script2.onload = () => resolve();
      document.body.appendChild(script2);
    };
    document.body.appendChild(script1);
  });
};

const PythonEditor = ({ explanation="", instructions, starterCode, expectedResult }) => {
  const [output, setOutput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [code, setCode] = useState(
    starterCode ? starterCode.replace(/\\n/g, "\n") : ""
  );
  expectedResult = expectedResult.replace(/\\n/g, "\n");
  console.log("Expected Result ==> \n" , expectedResult);
  const textareaRef = useRef(null);

  const builtinRead = (x) => {
    if (
      window.Sk.builtinFiles === undefined ||
      window.Sk.builtinFiles["files"][x] === undefined
    )
      throw "File not found: '" + x + "'";
    return window.Sk.builtinFiles["files"][x];
  };

  // Run Python code
const runPython = async () => {
  await loadSkulpt();
  setOutput("");
  setFeedback("");

  let result = ""; // <-- local variable to accumulate output

  window.Sk.pre = "output";
  window.Sk.configure({
    output: (text) => {
      result += text;      // accumulate output here
      setOutput((prev) => prev + text); // still update React state for display
    },
    read: builtinRead,
  });

  window.Sk.misceval
    .asyncToPromise(() =>
      window.Sk.importMainWithBody("<stdin>", false, code, true)
    )
    .then(() => {
      if (expectedResult !== undefined) {
        if (result.trim() === expectedResult.trim()) { // <-- compare local variable
          setFeedback("✅ Correct!");
        } else {
          setFeedback("❌ Incorrect.");
        }
      } else {
        setFeedback("⚠️ No expected result provided.");
      }
    })
    .catch((err) => {
      setOutput(err.toString());
      setFeedback("❌ Error in code");
    });
};

  // Add indentation at cursor
  const addTab = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = code.substring(0, start);
    const after = code.substring(end);

    const newCode = before + "    " + after; // 4 spaces
    setCode(newCode);

    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 4;
      textarea.focus();
    }, 0);
  };

  // Capture Tab key
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      addTab();
    }
  };

  return (
    <div
      className={`python-editor ${
        feedback === "✅ Correct!" ? "correct" :
        feedback.startsWith("❌") ? "incorrect" :
        ""
      }`}
    >
      <p className="title">{explanation}</p>
      <div
        className="instructions"
        dangerouslySetInnerHTML={{ __html: instructions }}
      />

      <button onClick={addTab} className="pythonbtn tab-button">Tab</button>

      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={10}
        cols={60}
      />
      <br />

      <button onClick={runPython} className="pythonbtn">Run</button>

      <pre className="output">{output}</pre>
      <div className="feedback">{feedback}</div>
    </div>
  );
};

export default PythonEditor;
