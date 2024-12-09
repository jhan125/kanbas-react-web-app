export default function DisplayTrueFalse({ question }: { question: any }) {
    const correctAnswer = question.correctAnswer;
    console.log(question);
    return (
        <div>
            <div className="mt-3"><h5>{question.title}</h5></div>
            <div><h6>{question.question}</h6></div>
                    
            <div style={{ marginBottom: "50px" }}>
                <div className="form-check" style={{ borderColor: "white" }}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name={"choice" + question._id}
                        id="t"
                        style={{ marginRight: "10px", marginBottom: "15px" }}
                        checked = {correctAnswer === "True"}
                    />

                    <label className="form-check-label" htmlFor="t"> True </label>
                </div>
                <div className="form-check" style={{ borderColor: "white" }}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name={"choice" + question._id}
                        id="f"
                        style={{ marginRight: "10px", marginBottom: "15px" }}
                        checked = {correctAnswer === "False"}
                    />

                    <label className="form-check-label" htmlFor="f"> False </label>
                </div>
            </div>
        </div>
    )
}