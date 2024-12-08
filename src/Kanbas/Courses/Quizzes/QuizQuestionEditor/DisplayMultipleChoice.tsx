export default function DisplayMultipleChoice({ question }: { question: any }) {
  const correctAnswer = question.correctAnswer;

  return (
      <div>
          <div className="mt-3"><h5>{question.title}</h5></div>
          <div><h6>{question.question}</h6></div>
                  

          <ul className="list-group" style={{ marginBottom: "50px" }}>
              {question.answers.length > 0 ? (question.answers.map((answer: string, index:number) => (

                  <li className="list-group-item" style={{ borderColor: "white" }}>
                      <input
                          type="radio"
                          name={"choice" + question._id}
                          id={"choice" + index}
                          style={{ marginRight: "10px", marginBottom: "15px" }}
                          checked = {correctAnswer === answer}
                      />

                      <label htmlFor={"choice" + index}> {answer} </label>
                  </li>
              ))): ""}
          </ul>
      </div>
  )
}