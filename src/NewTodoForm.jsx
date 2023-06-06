// 記得 import useState
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 元件名稱字首大寫
// 注意括號內要代入 props。這邊的 props 是一個物件
export function NewTodoForm(props){
    const [newitem, setNewItem] = useState("");

    function handleSubmit(e){
        e.preventDefault();     

        // 如果 form 裡面的 input  沒有輸入東西，就什麼也不做，不會新增空的項目。
        if(newitem === "") return;
        
        // addTodo(newitem); 

        props.onSubmit(newitem); 
        
        
        setNewItem("");
    };


    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                {/* <label htmlFor="item">New Item</label> */}
                <input placeholder="請輸入待辦事項..."
                value={newitem} 
                onChange={e => setNewItem(e.target.value)} 
                type="text" id="item" />
                <button className="btn btn-add">add <FontAwesomeIcon icon="fa-regular fa-square-plus" /></button>
            </div>
        </form>
    )
}