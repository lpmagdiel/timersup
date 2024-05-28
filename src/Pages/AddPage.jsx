import { Calendar2WeekFill, ChatSquareTextFill } from "react-bootstrap-icons";

export const AddPage = () => {
  return <div className="add-page page">
    <div className="task-box-btn">
    <Calendar2WeekFill size={32} fill="#9FE2BF" />
        <small><b>Recurrente</b></small>
    </div>
    <div className="task-box-btn">
    <ChatSquareTextFill size={32} fill="#DE3163" />
        <small><b>Unica</b></small>
    </div>
  </div>;
};