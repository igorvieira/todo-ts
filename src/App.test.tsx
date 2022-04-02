import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

const expectedValueOne = 'Drink a coffee'
const expectedValueTwo = 'Read a book'
const expectedValueThree = 'Drink a coffee-Edited!'


const addNewItems = (items: string[]) => {
  items.forEach(newItem => {
    userEvent.type(screen.getByTestId('input-text'), newItem)
    fireEvent.click(screen.getByTestId('submit'))
  })
}

const editItem = (item: string) => {
  const input = screen.getByTestId('input-text')
  const submitButton = screen.getByTestId('submit')

  fireEvent.click(screen.getByTestId('edit-button-0'))

  userEvent.type(input, '')
  userEvent.type(input, item)
  fireEvent.click(submitButton)
}

describe('<App />', () => {
  test('add items into the list', () => {
    render(<App />)

    const CONTENT_VALUES = [expectedValueOne, expectedValueTwo]
    addNewItems(CONTENT_VALUES)

    const todoList = screen.getAllByTestId('todo-item')

    expect(todoList.length).toBe(CONTENT_VALUES.length)
    expect(screen.getByText(expectedValueOne)).toBeInTheDocument()
    expect(screen.getByText(expectedValueTwo)).toBeInTheDocument()
    expect(screen.queryByText(expectedValueThree)).not.toBeInTheDocument()
  })

  test('remove an item of the list', () => {
    render(<App />)

    const CONTENT_VALUES = [expectedValueOne]

    const firstListItems = screen.queryAllByTestId('todo-items')
    expect(firstListItems.length).toBe(CONTENT_VALUES.length - 1)

    addNewItems(CONTENT_VALUES)

    const secondListItems = screen.queryAllByTestId('todo-item')
    expect(secondListItems.length).toBe(CONTENT_VALUES.length)

    fireEvent.click(screen.getByTestId('remove-button-0'))
    const thirdListItems = screen.queryAllByTestId('todo-item')
    expect(thirdListItems.length).toBe(CONTENT_VALUES.length - 1)
  })

  test('edit an item of the list', () => {
    render(<App />)

    const CONTENT_VALUES = [expectedValueOne]
    const newChange = '-Edited!'

    const firstListItems = screen.queryAllByTestId('todo-item')
    expect(firstListItems.length).toBe(CONTENT_VALUES.length - 1)

    addNewItems(CONTENT_VALUES)

    const secondListItems = screen.queryAllByTestId('todo-item')
    expect(secondListItems.length).toBe(CONTENT_VALUES.length)

    editItem(newChange)

    const thirdListItems = screen.getAllByTestId('todo-item')
    expect(thirdListItems.length).toBe(CONTENT_VALUES.length)
    expect(screen.getByText(expectedValueThree)).toBeInTheDocument()
  })
})