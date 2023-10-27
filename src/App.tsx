import { useState } from "react";
import "./App.css";
import { TodoList } from "./components/TodoList/TodoList";
import { v4 as uuidv4 } from "uuid";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import { TaskType } from "./components/TodoList/TodoList";

export type FilterValuesType = "all" | "completed" | "active";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todoListId1 = uuidv4();
  let todoListId2 = uuidv4();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {
      id: todoListId1,
      title: "Игры",
      filter: "all",
    },
    {
      id: todoListId2,
      title: "Аниме",
      filter: "all",
    },
  ]);

  const [tasksObj, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      {
        id: uuidv4(),
        title: "Dota2",
        isDone: true,
      },
      {
        id: uuidv4(),
        title: "Dead By Daylight",
        isDone: true,
      },
      {
        id: uuidv4(),
        title: "Genshin Impact",
        isDone: false,
      },
      {
        id: uuidv4(),
        title: "Counter Strike GO",
        isDone: true,
      },
    ],
    [todoListId2]: [
      {
        id: uuidv4(),
        title: "Dota2",
        isDone: true,
      },
      {
        id: uuidv4(),
        title: "Dead By Daylight",
        isDone: true,
      },
      {
        id: uuidv4(),
        title: "Genshin Impact",
        isDone: false,
      },
      {
        id: uuidv4(),
        title: "Counter Strike GO",
        isDone: true,
      },
    ],
  });

  function deleteTodoList(todoListId: string) {
    let filteredTodoLists = todoLists.filter(
      (todoList) => todoList.id !== todoListId
    );
    setTodoLists(filteredTodoLists);
    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let newTask = {
      id: uuidv4(),
      title,
      isDone: false,
    };
    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;

    setTasks({ ...tasksObj });
  }

  function deleteTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function changeTodoListTitle(todoListId: string, newTitle: string) {
    const todoList = todoLists.find((todoList) => todoList.id === todoListId);
    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let chosenTodoList = todoLists.find(
      (todoList) => todoList.id === todoListId
    );
    if (chosenTodoList) {
      chosenTodoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function changeStatus(id: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let changedTask = tasks.find((task) => task.id === id);
    if (changedTask) {
      changedTask.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function changeTitle(id: string, newTitle: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let changedTask = tasks.find((task) => task.id === id);
    if (changedTask) {
      changedTask.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }

  function addTodoList(title: string) {
    let todoList: TodoListType = {
      id: uuidv4(),
      filter: "all",
      title,
    };
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasksObj,
      [todoList.id]: [],
    });
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />

      {todoLists.map((todoList) => {
        let tasksForTodoList = tasksObj[todoList.id];

        if (todoList.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter(
            (task) => task.isDone === true
          );
        }

        if (todoList.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter(
            (task) => task.isDone === false
          );
        }
        return (
          <TodoList
            key={todoList.id}
            id={todoList.id}
            title={todoList.title}
            tasks={tasksForTodoList}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={todoList.filter}
            deleteTodoList={deleteTodoList}
            changeTodoListTitle={changeTodoListTitle}
            changeTitle={changeTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
