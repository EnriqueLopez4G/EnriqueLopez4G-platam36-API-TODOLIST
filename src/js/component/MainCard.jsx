import React, {useState} from "react";

const MainCard =()=> {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);

    //tuve que usar esto, porque me marcaba deprecated con el OnkeyPress
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue.trim() !== '') {
          setTodos([...todos, inputValue]);
          setInputValue('');
        }
      };

      const handleDelete = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
      };
    
    return (
        
        <div className="card" style={{ width: '500px', backgroundColor: 'rgb(240, 240, 240)' }}>
          <div className="card-body">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setInputValue(e.target.value)}
              style={{ backgroundColor: 'white', color: 'black' }}
              placeholder="Write new activiy here..."
              onKeyDown={handleKeyDown} 
            />
            <ul>
                {todos.map((todo, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style = {{ fontFamily: 'Cinzel, serif', fontSize: '2rem'}}>{todo}</span>
                    <button onClick={() => handleDelete(index)} style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}>
                    &#10006; {/* Icono de tache */}
                    </button>
                </li>
                ))}
            </ul>
          </div>
        </div>
    )
}

export default MainCard;