import "./styles.css";

export const TransparentButton = ({ children, onClick }) => {
    return (
    <button onClick={onClick} className="transparent-btn">{children}</button>
  );
}