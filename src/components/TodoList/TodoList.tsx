// import React from "react";
import { ChangeEvent } from "react";
import "./TodoList.css";
import { FilterValuesType } from "../../App";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  id: string;
  tasks: Array<TaskType>;
  deleteTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  filter: FilterValuesType;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (id: string, isDone: boolean, todoListId: string) => void;
  changeTitle: (id: string, newTitle: string, todoListId: string) => void;
  deleteTodoList: (todoListId: string) => void;
  changeTodoListTitle: (todoListId: string, newTitle: string) => void;
};

export function TodoList(props: PropsType) {
  const onAllFilterClickHandler = () => props.changeFilter("all", props.id);
  const onActiveFilterClickHandler = () =>
    props.changeFilter("active", props.id);
  const onCompletedFilterClickHandler = () =>
    props.changeFilter("completed", props.id);
  const deleteTodoListHandler = () => {
    props.deleteTodoList(props.id);
  };
  const changeTodoListTitleHandler = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan
          title={props.title}
          onChange={changeTodoListTitleHandler}
        />
        <button onClick={deleteTodoListHandler}>Удалить</button>
      </h3>

      <AddItemForm addItem={addTask} />

      <ul>
        {props.tasks.map((task) => {
          const onDeleteTaskHandler = () => props.deleteTask(task.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeStatus(task.id, e.target.checked, props.id);
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTitle(task.id, newValue, props.id);
          };

          return (
            <li
              key={task.id}
              className={task.isDone === true ? "is__done" : ""}
            >
              <input
                type="checkbox"
                onChange={onChangeStatusHandler}
                checked={task.isDone}
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
              <button onClick={onDeleteTaskHandler}>Удалить</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active__filter" : ""}
          onClick={onAllFilterClickHandler}
        >
          Все
        </button>
        <button
          className={props.filter === "active" ? "active__filter" : ""}
          onClick={onActiveFilterClickHandler}
        >
          В процессе
        </button>
        <button
          className={props.filter === "completed" ? "active__filter" : ""}
          onClick={onCompletedFilterClickHandler}
        >
          Сделано
        </button>
      </div>
    </div>
  );
}
