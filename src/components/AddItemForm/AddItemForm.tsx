import { KeyboardEvent, ChangeEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value);
  };
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      if (newTaskTitle.trim() === "") {
        setError("Поле обязательно");
        return;
      }
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    }
  };
  const addTaskHandler = () => {
    if (newTaskTitle.trim() === "") {
      setError("Поле обязательно");
      return;
    }
    props.addItem(newTaskTitle.trim());
    setNewTaskTitle("");
  };

  return (
    <div>
      <input
        type="text"
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyUp={onKeyUpHandler}
        className={error ? "error add__input" : "add__input"}
      />
      <button onClick={addTaskHandler}>Добавить</button>
      {error && <div className="error__message">{error}</div>}
    </div>
  );
}
