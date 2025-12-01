import DragFill from "./components/DragFill/DragFill";
import MCQ from "./components/MCQ/MCQ";
import MultipleMCQ from "./components/MultipleMCQ/MultipleMCQ";
import PythonEditor from "./components/PythonEditor/PythonEditor";
import TrueFalseCorrect from "./components/TrueFalseCorrect/TrueFalseCorrect";
import Matcher from "./components/Matcher/Matcher";

export default function QuestionRenderer({ data }) {
  switch (data.type) {
    case "dragfill":
      return <DragFill {...data} />;
    case "mcq":
      return <MCQ {...data} />;
    case "multiplemcq":
      return <MultipleMCQ {...data} />;
    case "python":
      return <PythonEditor {...data} />;
    case "truefalse":
      return <TrueFalseCorrect {...data} />;
    case "matcher":
      return <Matcher {...data} />;
    default:
      return <div>❌ Unknown question type: {data.type}</div>;
  }
}
