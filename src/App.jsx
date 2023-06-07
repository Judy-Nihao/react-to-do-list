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

  // todos 最一開始是設定為空陣列
  // 這邊改成讓 todos 值等於 localStorage 儲存的資料 (記得字串轉陣列)
  // 如果 localStorage 沒有存東西，也就是值為 null 
  // 那 todos 就定義為 空陣列

  // todos 是變數，setTodos 是一個函式，用來改變 todos 的值。 不可以直接修改 todos 變數。(immutatble)
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null ) return [];
    return JSON.parse(localValue);
  });
  
  // useEffect 這個方法的參數中需要帶入一個函式，而這個函式會在「畫面渲染完成」後被呼叫
  // 也就是說，每次畫面有異動有重新渲染，就會把陣列 todos 的資料存進 localStorage
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  },[todos]);

  // setTodos 函式不要直接把 todos 當參數帶進來，不然每次執行時 todos 都會有點像是被歸零？更動無法累積，白做工
  // 而是另外自訂一個參數名稱，去運算，再把異動結果存進去 todos 當作 todos 最新值
  // setTodos 函式的 return 就是 return 給 todos
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
          //把被點擊到的清單項目的id拿去跟 todos 陣列中的物件的 id 核對，找到同樣 id 的物件，然後把那個物件的 completed 屬性值改為 true (因為 checkbox input 被點擊到自動 checked 屬性會轉換成 ture，現在把這個 true 拿去更新陣列中相同 id 物件的 completed 屬性。) 
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

  // 清除已完成的 todo ，也就是說只回傳尚未完成的 todo，意即 completed:false
  function clearCompleted(completed){
    setTodos(currentTodos =>{
      return currentTodos.filter(todo => todo.completed == false);
    })
  }
  
  
  function clearAll(){
    setTodos(currentTodos =>{
      return currentTodos = [];
    })
  }

  return (
    <>
      <div className="container">
        <h1 className="header">A React To Do List</h1>
        <NewTodoForm onSubmit={addTodo}/>
        <TodoList todos={todos} toggleTodo={toggleTodo}  deleteTodo={deleteTodo}/>
        <div className="">
        <button className="clear completed" onClick={clearCompleted}>清除已完成的</button>
          <button className="clear all" onClick={clearAll}>清除全部</button>
        </div>
      </div>
    </>
  )
}