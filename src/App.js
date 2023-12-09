import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
var count = 1;
function App() {
  //var todo = []
  const [todo, setTodo] = useState([]);
  const [editingFlag, setEditingFlag] = useState(-1);
  const inssertDefaultValue = () => {
    var tempArray = [];
    for (let countTemp = 0; countTemp < 10; countTemp++) {
      tempArray.push({
        id: countTemp + 1,
        text: "Todo " + (countTemp + 1),
        completed: false,
      });
      count = countTemp + 1;
    }

    console.log(tempArray);
    setTodo([...tempArray]);
  };

  if (todo.length === 0) inssertDefaultValue();

  const addTodo = () => {
    console.log("addTodo");
    var todoInput = document.getElementById("todoInput").value;
    console.log("Todo text: " + todoInput);
    console.log("Todo Array: " + todo);

    const todoTempObject = {
      id: count,
      text: todoInput,
      completed: true,
    };
    count += 1;
    todo.push(todoTempObject);
    setTodo([...todo]);
    console.log(todo);
    document.getElementById("todoInput").value = "";
  };

  const deleteTodo = (tempId) => {
    console.log("deleteTodo");
    console.log("tempId: " + tempId);
    var todoUpdate = todo.filter((todoTemp) => {
      if (todoTemp.id === tempId) {
        return false;
      } else return true;
    });
    setTodo([...todoUpdate]);
  };

  const checkedChange = (todoTemp) => {
    console.log(todoTemp);
    todo.map((element) => {
      if (todoTemp.id === element.id) {
        element.completed = !element.completed;
      }
      return element;
    });
    setTodo([...todo]);
  };

  const editingTodo = (id) => {
    setEditingFlag(id);
  };

  const saveTodo = (obj) => {
    todo.map((element) => {
      if (obj.id === element.id) {
        element.text = document.getElementById("editingTodo").value;
      }
      return element;
    });
    setTodo([...todo]);
    setEditingFlag(-1);
  };

  console.log(todo);

  return (
    <div style={{ color: "blue", textAlign: "center" }}>
      <h1>Todo App</h1>
      <div>
        <input id="todoInput" type="text" placeholder="Enter todo here"></input>
        <button onClick={addTodo}>Add todo</button>
      </div>
      {todo.map((todoTemp) => {
        return (
          <div>
            {todoTemp.completed ? (
              <input
                type="checkbox"
                onChange={() => checkedChange(todoTemp)}
                checked
              ></input>
            ) : (
              <input type="checkbox" onChange={() => checkedChange(todoTemp)} />
            )}
            {editingFlag !== todoTemp.id ? (
              <>
                {todoTemp.text}
                <button onClick={() => deleteTodo(todoTemp.id)}>Delete</button>
                <button onClick={() => editingTodo(todoTemp.id)}>Edit</button>
              </>
            ) : (
              <>
                <input
                  id="editingTodo"
                  type="text"
                  placeholder="Edit Todo"
                  Value={todoTemp.text}
                ></input>

                <button onClick={() => deleteTodo(todoTemp.id)}>Delete</button>
                <button onClick={() => saveTodo(todoTemp)}>Save Todo</button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
