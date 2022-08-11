import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../../config/firebase";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { doc, updateDoc } from "firebase/firestore";
let unsubscribe = () => {};
const Todo = ({ user }) => {
  // console.log(user);
  const [text, setText] = useState("");
  const [mytodos, setTodos] = useState([]);
  // const [newText, setNewText] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (user) {
      console.log(user);
      const docref = db.collection("todos").doc(user.uid);
      unsubscribe = docref.onSnapshot((docsnap) => {
        if (docsnap.exists) {
          console.log(docsnap.data().todos);
          setTodos(docsnap.data().todos);
        } else {
          console.log("no docs");
        }
      });
    } else {
      // console.log(`hdshdhsds `);
      history.push("/login");
    }
    return () => {
      unsubscribe();
    };
  }, []);

  const addtodo = () => {
    db.collection("todos")
      .doc(user.uid)
      .set({ todos: [...mytodos, { text, completed: false }] });
  };

  const todohandler = (e) => {
    setText(e.target.value);
  };
  const deletetodo = (deletetodo) => {
    const docref = db.collection("todos").doc(user.uid);
    docref.get().then((docsnap) => {
      const result = docsnap
        .data()
        .todos.filter((todo) => todo.text != deletetodo);
      docref.update({
        todos: result,
      });
    });
  };
  const completeTodo = (text) => {
    const docref = db.collection("todos").doc(user.uid);
    docref.get().then((docsnap) => {
      const result = docsnap.data().todos.filter((todo) => todo.text != text);
      // console.log(result);
      docref.update({
        todos: [...result, { text: text, completed: true }],
      });
    });
    // console.log(result);
    // db.collection("todos")
    //   .doc(user.uid)
    //   .set({
    //     todos: [...mytodos, { text: text, completed: true }],
    //   });
    // const docref = db.collection("todos").doc(user.uid);
    // console.log(docref);
    // // docref.update(doc(db, "todos", todo.text), {completed=!todo.completed})
    // docref.get().then((docsnap) => {
    //   const result = docsnap.data().todos.map((todo) => {
    //     console.log(text  );
    //     todo.text === text
    //       ? { {todo.text = text, todo.completed = true }
    //       : todo;
    //   });
    // .forEach((todo) => {
    //   todo.completed = true;
    // });
    //   console.log(result);
    //   docref.update({
    //     todos: result,
    //   });
    // });
  };
  // const upadatetodo = (text, newText) => {
  //   const docref = db.collection("todos").doc(user.uid);
  //   docref.get().then((docsnap) => {
  //     const result = docsnap.data().todos.map((todo) =>{
  //      todo.text === text ? todo.text : newText;
  //     },
  //     docref.update({
  //       todos: result,
  //     });
  //   });
  // };
  return (
    <>
      <div className="container">
        <h1>Add Todos</h1>
        <div className="input-field ">
          <input
            type="text"
            placeholder="Add todos"
            value={text}
            onChange={todohandler}
          />
        </div>
        <button className="btn light-blue darken-4 " onClick={addtodo}>
          Add
        </button>
        <ul className="collection">
          {console.log("in todo")}
          {console.log(mytodos)}
          {mytodos.map((todo) => {
            return (
              <li
                className="collection-item  light-blue lighten-4
              "
                style={{ margin: "3px 0" }}
                key={todo.text}
              >
                {todo.text}
                <i
                  className="material-icons right"
                  onClick={() => deletetodo(todo.text)}
                  style={{ cursor: "pointer" }}
                >
                  delete
                </i>
                {todo.completed === false && (
                  <DoneIcon
                    className="right"
                    onClick={() => completeTodo(todo.text)}
                  />
                )}
                {todo.completed && <DoneAllIcon className="right" />}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Todo;
