// import React from "react";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (value: string) => void;
};

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [inputTitle, setInputTitle] = useState("");

  const activateEditMode = () => {
    setInputTitle(props.title);
    setEditMode(true);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(inputTitle);
  };
  const onChangeInputTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setInputTitle(e.target.value);

  return editMode ? (
    <input
      onBlur={activateViewMode}
      value={inputTitle}
      autoFocus
      onChange={onChangeInputTitleHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
