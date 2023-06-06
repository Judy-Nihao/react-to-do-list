// 這是元件

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function TodoItem({completed, id, title, toggleTodo, deleteTodo }){
    return(
        <li>
            <label>
                <input 
                type="checkbox" 
                checked={completed} 
                onChange={e => toggleTodo(id, e.target.checked)}
                />
                <span>{title}</span>
            </label>
            <button 
            onClick={() => deleteTodo(id)} 
            className="btn btn-delete"
            ><FontAwesomeIcon icon="fa-solid fa-trash" /></button>
        </li>
    )
};