import DisplayFillInBlank from "./DisplayFillInBlank"
import DisplayMultipleChoice from "./DisplayMultipleChoice"
import DisplayTrueFalse from "./DisplayTrueFalse"

export default function DisplayQuestion({ question }: { question: any }) {
    if (question.questionType === "Multiple Choice") {
        return(
            <DisplayMultipleChoice question={question} />
        );
    } else if (question.questionType === "True False") {
        return(
            <DisplayTrueFalse question={question} />
        );
    } else{
        return(
            <DisplayFillInBlank question={question} />
        );
    }
}