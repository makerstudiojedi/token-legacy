import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./EditableField.module.scss";

interface EditableFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange: Dispatch<SetStateAction<number>>;
  value: number;
  max: number;
}

const EditableField: React.FC<EditableFieldProps> = ({ onValueChange, value, max, ...props }): JSX.Element => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (inputRef.current && isInputFocused) {
      inputRef.current.focus();
    }
  }, [isInputFocused, inputRef]);

  const onValueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const parsedValue = Number(value);

    if ((!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= max) || value === "") {
      onValueChange(parsedValue);
    }
  };

  return (
    <div className={styles.EditableField} onClick={() => setIsInputFocused(true)}>
      <input type="text" {...props} value={value} ref={inputRef} onChange={onValueChangeHandler} autoFocus={true} />
      <h3 className="font-bold">%</h3>
    </div>
  );
};

export default EditableField;
