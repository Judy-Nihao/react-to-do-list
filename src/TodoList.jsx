// 記得要 import 用到的子元件
import { TodoItem } from "./TodoItem";

export function TodoList({todos, toggleTodo, deleteTodo}){
    return(
        <ul className="list">
            {todos.length === 0 && <p className="no-todos">待辦清單為空</p>}
            
            {todos.map(todo => {
            return (
                <TodoItem 
                id={todo.id} 
                completed={todo.completed} 
                title={todo.title} 
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                key={todo.id}/>
            )
            })}
        </ul>
    )
}