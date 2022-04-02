import React, { useState } from "react";


export type ItemProps = {
  id: string
  text: string
}


function App() {

  const initialState = { id: '', text: ''}

  const [item, setItem] = useState<ItemProps>(initialState)
  const [list, setList] = useState<ItemProps[]>([])

  const handleOnChange = (event: any) => {

    if (item.id) {
      setItem({
        id: item.id,
        text: event.target.value
      })
    } else {
      setItem({
        id: `${event.target.value} - ${Math.random() * 100}`,
        text: event.target.value
      })
    }

  }

  const handleSubmit = (event:any) => {
    event.preventDefault()

    if (item.id) {
      const newList = list.filter(listItem => listItem.id !== item.id)

      setList([...newList, item])
    } else {
      setList([...list, item])
    }

    setItem(initialState)
  }

  const handleDelete = (id: string) => {
    const newList = list.filter(item =>  item.id !== id)
    setList(newList)
  }

  const handleEdit = (id: string) => {
    const editItem = list.find(item => item.id === id)
    setItem({
      id: `${editItem?.id}`,
      text: `${editItem?.text}`
    })
  }

  return (
    <div>
      <div>
        <div>
          <div>
            {
              list?.map((item, index) => (
                <div
                  data-testid="todo-item"
                  key={`${item.id}-${index}`}>
                  <span>{item.text}</span>
                  <span> - </span>
                  <span
                    onClick={() => handleDelete(item.id)}
                    data-testid={`remove-button-${index}`}
                  >
                    Excluir
                  </span>
                  {' / '}
                  <span
                    onClick={() => handleEdit(item.id)}
                    data-testid={`edit-button-${index}`}
                  >
                    Editar
                  </span>
                </div>
              ))
            }
          </div>
        </div>

        <form>
          <input
            type="text"
            name="item"
            value={item.text}
            data-testid="input-text"
            onChange={(e) => handleOnChange(e)}
          />
          <button
            onClick={handleSubmit}
            data-testid="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App