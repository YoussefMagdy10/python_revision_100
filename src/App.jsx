import './App.css'
import Matcher from "./components/Matcher/Matcher";
import DragFill from "./components/DragFill/DragFill";
import MCQ from "./components/MCQ/MCQ";
import TrueFalseCorrect from "./components/TrueFalseCorrect/TrueFalseCorrect";
import MultipleMCQ from "./components/MultipleMCQ/MultipleMCQ";
import PythonEditor from "./components/PythonEditor/PythonEditor";

function App() {
// 1
  const instructions = `
    <b>Task:</b> Write a function called <i>add</i> that returns the sum of two numbers.<br>
    <b>Example:</b> add(2, 3) → 5
  `;
  const starterCode = `def add(a, b):\n    # write your code here`;
  const expectedResult = `5`;


  // Actual Questions:
  // Mol7ak 1
  const hwSwMCQ = {
    question: "اختار كل الأمثلة على ال Hardware",
    choices: [
      { text: "الكيبورد", correct: true },
      { text: "الماوس", correct: true },
      { text: "البرامج", correct: false },
      { text: "الوينذوز", correct: false },
      { text: "الشاشة", correct: true },
      { text: "السماعة", correct: true },
    ],
  };  
  // Mol7ak 2
  const inOutMCQ = {
    question: "اختار كل الأمثلة على أجهزة الإدخال input",
    choices: [
      { text: "الكيبورد", correct: true },
      { text: "السماعة", correct: false },
      { text: "الماوس", correct: true },
      { text: "المايكروفون", correct: true},
      { text: "الشاشة العادية", correct: false },
      { text: "الكاميرا", correct: true}, 
    ],
  };  
// Mol7ak 3
  const questions = [
    {
      text: "print \"Hello\"",     // Wrong Python 3 syntax
      isTrue: false,
      correctAnswer: "print(\"Hello\")"
    },
    {
      text: "x = 5",             // Correct syntax
      isTrue: true,
      correctAnswer: ""          // Not required for true questions
    },
    {
      text: "name = \"Mariam\"",
      isTrue: true,
      correctAnswer: ""
    },
    {
      text: "print(My age is, 5)",
      isTrue: false,
      correctAnswer: "print(\"My age is\", 5)"
    },
    {
      text: "لو عايزين نطبع كلمة True، هانكتب:\nis_egyptian = True\nprint(\"is_egyptian\")",
      isTrue: false,
      correctAnswer: "print(is_egyptian)"
    }
  ];

  console.log("Working in App.jsx");

  return (
    
    <div className="App">
      <h1 style={{ textAlign: "center"}}>Revision 1 - Python</h1>
      {/* <img src="/Revision_Python_1_1_Smouha/branch1/images/1.png" alt="explanation 1"  */}
      {/* <img src={`${import.meta.env.BASE_URL}images/1.png`} alt="explanation 1"
       style={{
        display: "block",
        margin: "0 auto",   // centers the image
        width: "80%",       // percent of page width
       }}
      /> */}
      <h2 style={{ textAlign: "right", fontWidth: "700" }}>من خلال الصورة اللي قدامك، أكمل الفراغات بالكلمات اللي في المستطيل</h2>
      <DragFill
        paragraphTemplate={["نستنتج ان الكمبيوتر بيفهم لغة", "___", "لكن كود البايثون بتاعنا دا قريب من لغة", "___", "وهي ديه اللغة اللي احنا هانكتبها في الكورس دا", "."]}
        words={["أصفار ووحايد", "الانجليزي"]}
        feedbackCorrect="عااااش 🙌️🥳️"
        feedbackWrong="Incorrect."
      />
      {/* ****************************************************** */}
      <h2>يلا نفتكر الفرق بين ال hardware وال software</h2>
      <MultipleMCQ
        question={hwSwMCQ.question}
        choices={hwSwMCQ.choices}
        maxTrials={3}
      />
      {/* ****************************************************** */}
      <h2>طيب يا ترى فاكرين الفرق بين أجهزة الإدخال والإخراج input/output</h2>
      <MultipleMCQ
        question={inOutMCQ.question}
        choices={inOutMCQ.choices}
        maxTrials={3}
      />
      {/* ****************************************************** */}
      <h2>والسؤال اللي أغلبنا وقع فيه</h2>
      <MCQ
        question={"الشاشة التاتش ديه من أدوات ......"}
        choices={["الإدخال", "الإخراج", "جميع ما سبق"]}
        correctIndex={2}
        feedbackCorrect="عاااش 🥳️"
        feedbackWrong="حاول كمان مرة 🙃️"
      />
      {/* ****************************************************** */}
      <h2>ودلوقتي، وصل ما بين A و B</h2>
      <h2>(دوس على حاجة في A، وبعدين دوس على المناسب ليها في B، هاتلاقيهم اتوصلوا)</h2>
      <Matcher
        columnA={["CPU", "RAM", "SSD", "battery"]}
        columnB={["مخ الكمبيوتر", "ذاكرة مؤقتة", "أداة تخزين", "قلب الجهاز"]}
        feedbackCorrect="عااااش 🙌️🥳️"
        feedbackWrong="لا، حاول كمان مرة 🙃️"
      />

      <h2>ودلوقتي يلا نبتدي في الأكواد والشغل العاااالي 🤩️ </h2>
      <MCQ
        question={"أي لغة برمجة هي عبارة عن مجموعة ..... و ...."}
        choices={["برامج - عناوين", "أوامر - قواعد", "قوانين - كتابات", "أوامر - أمثلة"]}
        correctIndex={1}
        feedbackCorrect="عاااش 🥳️"
        feedbackWrong="حاول كمان مرة 🙃️"
      />
      <MCQ
        question={"ومن ضمن أوامر لغة بايثون"}
        choices={["أمر الطباعة", "الأسامي ماينفعش تبدأ برقم", "ال variable مايقدرش يخزن أكتر من قيمة", "جميع ما سبق"]}
        correctIndex={0}
        feedbackCorrect="عاااش 🥳️"
        feedbackWrong="خد بالك من الفرق بين الأوامر والقواعد!! حاول كمان مرة 🙃️"
      />
      <MCQ
        question={"أمر الطباعة في Python ممكن يطبع أكتر من حاجة"}
        choices={["صح", "غلط"]}
        correctIndex={0}
        feedbackCorrect="عاااش 🥳️"
        feedbackWrong='انت ناسي لما فصلنا بين الحاجة ب , وكتبنا print("My name is" , Youssef) - حاول كمان مرة'
      />
      {/* ****************************************************** */}      

      <h2>تعالى بقا دلوقتي ألغبطك 😎️</h2>
      <h2>لو الكود اللي قدامك صح: اختار صح، لو غلط: اختار غلط وصلحه</h2>
      <TrueFalseCorrect questions={questions} />
      <PythonEditor
        instructions={instructions}
        starterCode={starterCode}
        expectedResult={expectedResult}
      />
      {/* <MCQ
        question={question}
        choices={choices}
        correctIndex={correctIndex}
        feedbackCorrect="Correct!"
        feedbackWrong="Try again."
      />
      <h1>MCQ Example</h1>
      <MultipleMCQ
        question={mcqExample.question}
        choices={mcqExample.choices}
        maxTrials={3}
      />
      <DragFill
        paragraphTemplate={["The color of sky is ", "___", "."]}
        words={["blue"]}
        feedbackCorrect="Perfect!"
        feedbackWrong="Incorrect."
      /> */}

    </div>
    
  );
}

export default App;
