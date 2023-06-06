import { useEffect, useState } from "react";
// icon
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import "./styles.css";

library.add(fas, far);



export default function App(){
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null ) return [];
    return JSON.parse(localValue);
  });
  
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  },[todos]);

  function addTodo(inputContent){  
        setTodos((currentTodos)=>{
          return [...currentTodos,{
            id: crypto.randomUUID(),
            title: inputContent,
            completed: false
          }]
        }); 
  };
  
  console.log(todos); //檢查表單新增項目後，todos 這個陣列現在裡面有幾個物件
  
  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo=>{
        if(todo.id == id){
          return { ...todo, completed} 
          //把被點擊到的清單項目的id拿去跟 todos 陣列中的物件的 id 核對，找到同樣 id 的物件，然後把那個物件的 completed 屬性值改為 true (因為 checkbox input 被點擊到自動 checked 屬性會轉換成 ture，現在把這個 true 拿去更新陣列中相同 id 物件的completed 屬性。) 
          // map方法會回傳新陣列，裡面存放的是經過驗證後的「每一個值」，假如原本有3個，就回傳3個，值的狀態可能會改變，例如被點擊到的這個物件，它的 completed 屬性就會被改成 true，才放進新陣列中。
        }

        return todo;
        // 其他沒有被點擊到的清單項目的 input ，就什麼也不做，checked 屬性不變。
      }
      )
    })
  } 

  function deleteTodo(id){
    setTodos(currentTodos =>{
      return currentTodos.filter(todo => todo.id !== id);
      // filter方法會回傳一個新陣列，裡面只存放通過條件的值
      // 所以只有沒被點擊到的項目，才會在回傳的陣列中
      // 等於變相刪除被點擊到的那個項目
      // 所以 todos 陣列就會被更新成剩餘的沒有被點擊到的項目所組成
    })
  }

  return (
    <>
      <div className="container">
        <h1 className="header">A React To Do List</h1>
        <NewTodoForm onSubmit={addTodo}/>
        <TodoList todos={todos} toggleTodo={toggleTodo}  deleteTodo={deleteTodo}/>
      </div>
    </>
  )
}