export default function DisplayMultipleChoice({ question }: { question: any }) {
    const correctAnswer = question.correctAnswer;

    return (
        <div>
            {/* <div className="mt-3"><h5>{question.title}</h5></div> */}
            <div className="ms-2">
                <h6>{question.question}</h6>
            </div>

            <ul className="list-group" style={{ marginBottom: "10px" }}>
                {question.answers.length > 0 ? (question.answers.map((answer: string, index: number) => (

                    <li className="list-group-item" style={{ borderColor: "white" }}>
                        <input
                            type="radio"
                            name={"choice" + question._id}
                            id={"choice" + index}
                            style={{ marginRight: "10px"}}
                            checked={correctAnswer === answer}
                        />

                        <label htmlFor={"choice" + index}> {answer} </label>
                    </li>
                ))) : ""}
            </ul>
        </div>
    );

    // return (
    //     <table className="table" 
    //     style={{ width: '100%', marginBottom: '50px', borderCollapse: 'collapse', border: "1px solid #ddd",}}>
    //         <thead>
    //             <tr style={{ backgroundColor: '#f0f0f0' }}>
    //                 <th style={{ textAlign: 'left', border: "1px solid #ddd", }}>
    //                     {question.title}
    //                 </th>
    //                 <th style={{ textAlign: 'right', border: "1px solid #ddd", }}>
    //                     {question.points}
    //                 </th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             <tr>
    //                 <td colSpan={2} style={{ border: "1px solid #ddd", }}>
    //                     <p style={{ margin: '0 0 0 0' }}>
    //                         {question.question}
    //                     </p>
    //                 </td>
    //             </tr>
    //             {question.answers.length > 0 && question.answers.map((answer: string, index: number) => (
    //                 <tr key={index}>
    //                     <td colSpan={2} style={{ border: "1px solid #ddd", padding: '5px 10px' }}>
    //                         <div style={{ display: 'flex', alignItems: 'center' }}>
    //                             <input
    //                                 type="radio"
    //                                 name={"choice" + question._id}
    //                                 id={"choice" + index}
    //                                 style={{ marginRight: '10px' }}
    //                                 checked={correctAnswer === answer}
    //                             />
    //                             <label htmlFor={"choice" + index} style={{ margin: 0 }}>
    //                                 {answer}
    //                             </label>
    //                         </div>
    //                     </td>
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </table>
    // );
}