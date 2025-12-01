import "./Text.css";

const Text = ({ content }) => {
  return (
    <div className="text-container">
      {content.map((item, index) => {
        if (item.sentence === "/n") {
          return <br key={index} />;
        }

        return (
          <span
            key={index}
            className={item.font === "bold" ? "text-bold" : "text-normal"}
          >
            {item.sentence}
          </span>
        );
      })}
    </div>
  );
};

export default Text;
