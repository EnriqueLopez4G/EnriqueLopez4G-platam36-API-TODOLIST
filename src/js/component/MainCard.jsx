import React, {useState, useEffect} from "react";

const MainCard =()=> {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // Estado para el hover

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
        alert('Elemento Aniquilado')
      };

    return (
        <div 
          className="card" 
          style={{ 
                  width           : '500px', 
                  backgroundColor : 'rgb(240, 240, 240)', 
                  boxShadow       : '0 4px 8px rgba(0, 0, 0, 0.2)',
                  margin          : '10px 0' 
                }}
        >
          <p 
            className =" text-center" 
            style = {{
                      color      : 'rgba(86,7,12,0.5)',  
                      fontSize   : '5rem', 
                      fontWeight : '200' 
                    }}
          >
				    todos
			    </p>
          <div className="card-body">
            <input
              type        = "text"
              className   = "form-control"
              onChange    = {(e) => setInputValue(e.target.value)}
              style       = {{ backgroundColor: 'white', color: 'black' }} //linea par estilos del input
              placeholder = "Write new activiy here..."
              onKeyDown   = {handleKeyDown} 
              value       = {inputValue} //contenido del input sincronizado con el state
            />
            <ul>
                {todos.map((todo, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span 
                      style = {{ 
                                  fontFamily : 'system-ui', 
                                  fontSize   : '1.5rem', 
                                  fontWeight : '100',
                                  color      : hoveredIndex===index ? '#F00':'#474B4E' //con esto cambio a rojo si hay hover

                      }}
                      onMouseEnter={() => setHoveredIndex(index)} // Detectar hover
                      onMouseLeave={() => setHoveredIndex(null)}  // Limpiar hover
                      
                    >
                      {todo}
                    </span>
                    <button
                      onClick={() => handleDelete(index)} 
                      onMouseEnter={() => setHoveredIndex(index)} // Detectar hover
                      onMouseLeave={() => setHoveredIndex(null)}  // Limpiar hover
                      style={{ 
                                border       : 'none', 
                                borderRadius : '50%',
                                background   : 'white',
                                cursor       : 'pointer',
                                opacity      : hoveredIndex === index ? 1 : 0, // Mostrar solo si coincide el índice
                                transition   : 'opacity 0.3s ease', //suave suave suavecito
                              }}
                    >
                     {/* Icono de tache &#10006; nunca pude ponerlo en rojo caray! */}
                     <span
                      src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi27ThgGKW7oZdbq8yWtM2rW0r6Yhtm8ZWrFGxjY6fhJ9dR6hl5AR1Ds5fVTAMk768Yes&usqp=CAU" 
                      alt = "Red Cross Icon" 
                      style = {{ 
                              width       : '24px', 
                              height      : '24px',  
                            }} 
                    >
                      ❌
                    </span>
                  </button>
                </li>
                ))}
                
            </ul>
            <p 
              style = {todos.length <= 0 ? { animation: 'parpadeo 1s infinite' } : {}}> {(todos.length <= 0 ? 'No tasks, add a task': '')} 
            </p>
            {/* encontre este fragmento en la web para dar efecto de parpadeo, logre adaptarlo aqui, si me funciono a mi */}
            <style>
                {`
                    @keyframes parpadeo {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                `}
            </style>
            <hr/>
            <p style = {{opacity:'0.5'}}><strong>{todos.length}</strong>  Activities in the list</p>
            <p className = "text-end" style = {{color: 'blue',opacity:'0.7'}}><strong></strong>🏆Enrique Lopez 4G</p>
          </div>
        </div>
    )
}

export default MainCard;