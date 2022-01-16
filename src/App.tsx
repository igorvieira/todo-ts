import React, { useState } from 'react';
import './App.css';

function App() {

  interface Task  {
    id: string;
    title: string;
  }

  const initialContent = {
    id: '',
    title: ''
  }

  const [ newItem, setNewItem ] = useState<Task>(initialContent)
  const [ listOfItems, setListOfItems ] = useState<Task[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (newItem.id) {
      const newList = listOfItems.filter(listItem => listItem.id !== newItem.id)

      setListOfItems([...newList, newItem])
    } else {
      setListOfItems([...listOfItems, newItem])
    }

  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (newItem.id) {
      setNewItem({
        id: newItem.id,
        title: event.target.value
      })
    } else {
      setNewItem({
        id: `${event.target.value} - ${Math.random() * 100}`,
        title: event.target.value
      })
    }
  }

  const handleDeleteItemByID = (id: string) => {
    const newList = listOfItems.filter(item => item.id !== id)
    setListOfItems(newList)
  }

  const handleEditItemByID  = (id: string) => {
    const editItem = listOfItems.find(item => item.id === id)

    setNewItem({
      id: editItem?.id || '',
      title: editItem?.title  || ''
    })
  }


  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        {
        listOfItems.map((item: Task) => (
            <div>
              <span>{item?.title}</span>
              {' '}
              <button onClick={() => handleDeleteItemByID(item?.id)}>Remove</button>
              <button onClick={() => handleEditItemByID(item?.id)}>Edit</button>
            </div>
          ))
        }
      </div>

      <div>
        <input
          value={newItem?.title}
          onChange={(e) => handleOnChange(e)}
        />
        <button>Add</button>
      </div>
    </form>
  );
}

export default App;
