import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(0);
  // const [hid, setHid] = useState(0);

  const deleteTodo = (idx) => {
    setTodos((current) =>
      current.filter((obj) => {
        return obj.id !== idx;
      })
    );
    setTodos((current) =>
      current.map((obj, i) => {
        return { ...obj, id: i };
      })
    );
  };

  const markTodo = (idx) => {
    setTodos((current) =>
      current.map((obj, i) => {
        return { ...obj, id: i };
      })
    );
    setTodos((current) =>
      current.map((obj) => {
        if (obj.id === idx) {
          if (obj.completed === false) {
            return { ...obj, completed: true };
          } else {
            return { ...obj, completed: false };
          }
        }
        return obj;
      })
    );
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const title = todos[idx].title;
    const completed = todos[idx].completed;
    const id = todos.indexOf(todos[idx]);
    setTodos((current) =>
      current.map((obj) => {
        if (obj.id === idx) {
          return {
            ...obj,
            title: todos[idx - 1].title,
            completed: todos[idx - 1].completed,
          };
        }
        return obj;
      })
    );
    setTodos((current) =>
      current.map((obj) => {
        if (obj.id === idx - 1) {
          return { ...obj, title: title, completed: completed };
        }
        return obj;
      })
    );
  };

  const moveDown = (idx) => {
    setTodos((current) =>
      current.map((obj, i) => {
        return { ...obj, id: i };
      })
    );
    if (idx === todos.length - 1) return;
    const title = todos[idx].title;
    const completed = todos[idx].completed;
    setTodos((current) =>
      current.map((obj) => {
        if (obj.id === idx) {
          return {
            ...obj,

            title: todos[idx + 1].title,
            completed: todos[idx + 1].completed,
          };
        }
        return obj;
      })
    );
    setTodos((current) =>
      current.map((obj) => {
        if (obj.id === idx + 1) {
          return { ...obj, title: title, completed: completed };
        }
        return obj;
      })
    );
  };

  const handleKeyDown = (event) => {
    if (event.key !== "Enter") return;
    else if (input === "") {
      alert("Todo cannot be empty");
    } else if (event.key === "Enter") {
      const myInput = input;
      makeTodo(myInput, false);
    }
  };
  const makeTodo = (x, y) => {
    const obj = { id: index, title: x, completed: y };

    setTodos((current) => [...current, obj]);
    setIndex(index + 1);
  };
  //localstl

  useEffect(() => {
    if (todos.length === 0) {
      if (localStorage.getItem("items") !== null) {
        const a = JSON.parse(localStorage.getItem("items"));
        a.forEach((x) => {
          setTodos((current) => [...current, x]);
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* Todos */}
        {/* Example 1 */}
        {/* <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
          <span className="me-auto">Todo</span>
        </div> */}
        {/* Example 2 */}
        {/* <div className="border-bottom p-1 py-2 fs-2 d-flex gap-2">
          <span className="me-auto">Todo with buttons</span>

          <button className="btn btn-success">
            <IconCheck />
          </button>
          <button className="btn btn-secondary">
            <IconArrowUp />
          </button>
          <button className="btn btn-secondary">
            <IconArrowDown />
          </button>
          <button className="btn btn-danger">
            <IconTrash />
          </button>
        </div> */}
        {todos.map((todo, i) => (
          <Todo
            key={i}
            title={todo.title}
            completed={todo.completed}
            deleteFn={() => deleteTodo(i)}
            markFn={() => markTodo(i)}
            onMoveUp={() => moveUp(i)}
            onMoveDown={() => moveDown(i)}
          />
        ))}

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((x) => x.completed === false).length}){" "}
          </span>
          <span className="text-success">
            Completed ({todos.filter((x) => x.completed === true).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Sirinnicha Tawiwuttirat 620612152
        </p>
      </div>
    </div>
  );
}
