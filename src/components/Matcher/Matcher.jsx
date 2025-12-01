// import React, { useState, useRef, useEffect } from "react";
// import "./Matcher.css";

// const Matcher = ({ columnA, columnB, feedbackCorrect, feedbackWrong }) => {
//   const [connections, setConnections] = useState([]);
//   const [selectedA, setSelectedA] = useState(null);
//   const [selectedB, setSelectedB] = useState(null);
//   const [resultFeedback, setResultFeedback] = useState("");
//   const [shuffledB, setShuffledB] = useState([]);
//   const [bIndexMap, setBIndexMap] = useState([]); // shuffled index → original index

//   useEffect(() => {
//     // Shuffle columnB when component mounts
//     const indices = columnB.map((_, i) => i);

//     // Simple Fisher-Yates shuffle
//     for (let i = indices.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [indices[i], indices[j]] = [indices[j], indices[i]];
//     }

//     setBIndexMap(indices); // map from shuffled index → original index
//     setShuffledB(indices.map(i => columnB[i]));
//   }, [columnB]);

//   const containerRef = useRef();

//   // Draw SVG lines
//   const [lines, setLines] = useState([]);

//   useEffect(() => {
//     const newLines = connections.map(({ aIndex, bIndex }) => {
//       const aEl = document.getElementById(`a-${aIndex}`);
//       const bEl = document.getElementById(`b-${bIndex}`);
//       if (!aEl || !bEl) return null;

//       const aRect = aEl.getBoundingClientRect();
//       const bRect = bEl.getBoundingClientRect();
//       const containerRect = containerRef.current.getBoundingClientRect();

//       const x1 = aRect.right - containerRect.left;
//       const y1 = aRect.top + aRect.height / 2 - containerRect.top;
//       const x2 = bRect.left - containerRect.left;
//       const y2 = bRect.top + bRect.height / 2 - containerRect.top;

//       return { x1, y1, x2, y2 };
//     });

//     setLines(newLines.filter(l => l !== null));
//   }, [connections, containerRef.current]);

//   const handleSelectA = (index) => {
//     setSelectedA(index);
//     if (selectedB !== null) {
//       // Connect selectedA → selectedB
//       if (!connections.some(c => c.aIndex === index || c.bIndex === selectedB)) {
//         setConnections([...connections, { aIndex: index, bIndex: selectedB }]);
//       }
//       setSelectedA(null);
//       setSelectedB(null);
//     }
//   };

//   const handleSelectB = (index) => {
//     setSelectedB(index);
//     if (selectedA !== null) {
//       // Connect selectedA → selectedB
//       if (!connections.some(c => c.aIndex === selectedA || c.bIndex === index)) {
//         setConnections([...connections, { aIndex: selectedA, bIndex: index }]);
//       }
//       setSelectedA(null);
//       setSelectedB(null);
//     }
//   };

//   const handleCheck = () => {
//     // Check correctness: correct is index match
//     const correct = columnA.every((_, i) => {
//       return connections.some(c => c.aIndex === i && bIndexMap[c.bIndex] === i);
//     });
//     setResultFeedback(correct ? feedbackCorrect : feedbackWrong);
//   };

//   const handleReset = () => {
//     setConnections([]);
//     setSelectedA(null);
//     setSelectedB(null);
//     setResultFeedback("");
//   };

//   return (
//     <div className="matcher-container" ref={containerRef}>
//       <div className="columns">
//         <div className="column-a">
//           {columnA.map((item, i) => (
//             <div
//               key={i}
//               id={`a-${i}`}
//               className={`item ${selectedA === i ? "selected" : ""}`}
//               onClick={() => handleSelectA(i)}
//             >
//               {item}
//             </div>
//           ))}
//         </div>
//         <div className="column-b">
//           {shuffledB.map((item, i) => (
//             <div
//               key={i}
//               id={`b-${i}`}
//               className={`item ${selectedB === i ? "selected" : ""}`}
//               onClick={() => handleSelectB(i)}
//             >
//               {item}
//             </div>
//           ))}
//         </div>
//       </div>

//       <svg className="lines-svg">
//         {lines.map((line, idx) => (
//           <line
//             key={idx}
//             x1={line.x1}
//             y1={line.y1}
//             x2={line.x2}
//             y2={line.y2}
//             stroke="green"
//             strokeWidth="2"
//           />
//         ))}
//       </svg>

//       <div className="buttons">
//         <button className="matcherbtn" onClick={handleCheck}>Check Answer</button>
//         <button className="matcherbtn" onClick={handleReset}>Reset</button>
//       </div>

//       {resultFeedback && <div className="feedback">{resultFeedback}</div>}
//     </div>
//   );
// };

// export default Matcher;


import React, { useState, useRef, useEffect } from "react";
import "./Matcher.css";

const Matcher = ({ explanation = "", columnA, columnB, feedbackCorrect, feedbackWrong }) => {
  const [connections, setConnections] = useState([]);
  const [shuffledB, setShuffledB] = useState([]);
  const [bIndexMap, setBIndexMap] = useState([]);
  const [resultFeedback, setResultFeedback] = useState("");
  const [dragging, setDragging] = useState(null); // { aIndex, startX, startY }
  const [tempLine, setTempLine] = useState(null);

  const containerRef = useRef();

  // Shuffle B initially
  useEffect(() => {
    const indices = columnB.map((_, i) => i);

    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    setBIndexMap(indices);
    setShuffledB(indices.map(i => columnB[i]));
  }, [columnB]);

  // Add pointer listeners for dragging temp line
  useEffect(() => {
    const handleMove = (e) => {
      if (!dragging) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      setTempLine({
        x1: dragging.startX,
        y1: dragging.startY,
        x2: e.clientX - containerRect.left,
        y2: e.clientY - containerRect.top,
      });
    };

    const handleUp = (e) => {
      if (!dragging) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      // Check if pointer released over a B item
      const bHit = shuffledB.findIndex((_, i) => {
        const el = document.getElementById(`b-${i}`);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      });

      if (bHit !== -1) {
        // Make sure both sides are free
        const aInUse = connections.some(c => c.aIndex === dragging.aIndex);
        const bInUse = connections.some(c => c.bIndex === bHit);

        if (!aInUse && !bInUse) {
          setConnections([...connections, { aIndex: dragging.aIndex, bIndex: bHit }]);
        }
      }

      setDragging(null);
      setTempLine(null);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dragging, connections, shuffledB]);

  const startDrag = (aIndex) => {
    // If already matched → unmatch it
    const existing = connections.find(c => c.aIndex === aIndex);
    if (existing) {
      setConnections(connections.filter(c => c.aIndex !== aIndex));
      return;
    }

    const el = document.getElementById(`a-${aIndex}`);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const startX = rect.right - containerRect.left;
    const startY = rect.top + rect.height / 2 - containerRect.top;

    setDragging({ aIndex, startX, startY });
  };

  // Delete existing connection by clicking B item
  const clickB = (bIndex) => {
    const existing = connections.find(c => c.bIndex === bIndex);
    if (existing) {
      setConnections(connections.filter(c => c.bIndex !== bIndex));
    }
  };

  const handleCheck = () => {
    const correct = columnA.every((_, i) => {
      return connections.some(c => c.aIndex === i && bIndexMap[c.bIndex] === i);
    });
    if(correct) {
      setResultFeedback(feedbackCorrect);
    } else {
      setResultFeedback(feedbackWrong);
    }
    // alert(correct ? feedbackCorrect : feedbackWrong);
  };

  const handleReset = () => {
    setConnections([]);
    setDragging(null);
    setTempLine(null);
    setResultFeedback("");
  };

  const containerRect = containerRef.current?.getBoundingClientRect();

  // Compute permanent lines
  const permanentLines = connections.map(({ aIndex, bIndex }) => {
    const aEl = document.getElementById(`a-${aIndex}`);
    const bEl = document.getElementById(`b-${bIndex}`);
    if (!aEl || !bEl || !containerRect) return null;

    const aRect = aEl.getBoundingClientRect();
    const bRect = bEl.getBoundingClientRect();

    return {
      x1: aRect.right - containerRect.left,
      y1: aRect.top + aRect.height / 2 - containerRect.top,
      x2: bRect.left - containerRect.left,
      y2: bRect.top + bRect.height / 2 - containerRect.top
    };
  }).filter(Boolean);

  return (
    <div className="matcher-container" ref={containerRef}>
      <p className="title">{explanation}</p>
      <div className="columns">
        <div className="column-a">
          {columnA.map((item, i) => (
            <div
              key={i}
              id={`a-${i}`}
              className="item"
              onPointerDown={() => startDrag(i)}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="column-b">
          {shuffledB.map((item, i) => (
            <div
              key={i}
              id={`b-${i}`}
              className="item"
              onPointerDown={() => clickB(i)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <svg className="lines-svg">
        {permanentLines.map((line, idx) => (
          <line
            key={idx}
            {...line}
            stroke="green"
            strokeWidth="2"
          />
        ))}

        {tempLine && (
          <line
            {...tempLine}
            stroke="orange"
            strokeWidth="2"
          />
        )}
      </svg>

      <div className="buttons">
        <button className="matcherbtn" onClick={handleCheck}>Check Answer</button>
        <button className="matcherbtn" onClick={handleReset}>Reset</button>
      </div>
      
      <div className="feedback">{resultFeedback}</div>
    </div>
  );
};

export default Matcher;
