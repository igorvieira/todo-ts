import React, { useState } from 'react';
import './App.css';

function App() {

  interface Task  {
    id: string;
    title: string;
  }

  const initialContent = { id: '', title: ''}


  const [ newItem, setNewItem ] = useState<Task>(initialContent)
  const [ listOfItems, setListOfItems ] = useState<Task[]>([]);

  const handleAddNewItems = (): void => {
    setListOfItems([...listOfItems, newItem])
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    setNewItem({
      id: `${event.target.value} - ${Math.random() * 100}`,
      title: event.target.value
    })
  }

  return (
    <div>
      <div>
        {
        listOfItems.map((item: Task) => (
            <div>
              {item?.title}
            </div>
          ))
        }
      </div>

      <div>
        <input
          value={newItem?.title}
          onChange={(e) => handleOnChange(e)}
        />
        <button onClick={() => handleAddNewItems()}>Add</button>
      </div>
    </div>
  );
}

export default App;
