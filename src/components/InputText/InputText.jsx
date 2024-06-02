import "./styles.css";

export const InputText = ({ placeHolder, value, onChange }) => {
    return (
        <input
        className="input-text"
            type="text"
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
        />
    )
}