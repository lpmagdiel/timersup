import { TaskList, DateInformation } from "../components";

export const ResumePage = () => {
    return (
        <>
        <DateInformation />
        <div className="resume-page page">
            <TaskList/>
        </div>
        </>
    )
}