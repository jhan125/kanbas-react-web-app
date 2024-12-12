export default function DisplayFillInBlank({ question }: { question: any }) {

    return (
        <div>
            {/* <div className="mt-3"><h5>{question.title}</h5></div> */}
            <div className="ms-2">
                <h6>{question.question}</h6>
            </div>

            <ul className="list-group" style={{ marginBottom: "10px" }}>
                {question.answers.length > 0 ? (question.answers.map((answer: string) => (
                    <li className="list-group-item" style={{ borderColor: "white",}}>
                        Correct Answer: {answer}
                    </li>
                ))) : ""}
            </ul>
        </div>
    )
}