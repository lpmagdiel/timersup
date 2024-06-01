import "./styles.css";

export const BasicButton = ({ children, onClick }) => {
    return (
    <button onClick={onClick} className="basic-btn">{children}</button>
  );
}