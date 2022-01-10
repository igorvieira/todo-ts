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
    setNewItem(initialContent)
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    setNewItem({
      id: `${event.target.value} - ${Math.random() * 100}`,
      title: event.target.value
    })
  }

  const handleDeleteItemByID = (id: string) => {
    const newList = listOfItems.filter(item => item.id !== id)
    setListOfItems(newList)
  }

  return (
    <div>
      <div>
        {
        listOfItems.map((item: Task) => (
            <div>
              <span>{item?.title}</span>
              {' '}
              <button onClick={() => handleDeleteItemByID(item?.id)}>Remove</button>
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
