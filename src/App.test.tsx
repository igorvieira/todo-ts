import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const expectedValueOne = 'Drink a coffee'
const expectedValueTwo = 'Read an book'
const expectedValueThree = 'Drink a coffee-Edited!'

const addNewItems = (items: string[]) => {
  items.forEach(newItem  => {
    const input = screen.getByTestId('input-text');
    const submitButton = screen.getByTestId('submit');

    userEvent.type(input, newItem)
    fireEvent.click(submitButton);
  });
}

describe('<App />', () => {
  test('add items to the list',  async () => {
    render(<App />);
    const CONTENT_VALUES = [expectedValueOne, expectedValueTwo]

    addNewItems(
      CONTENT_VALUES,
    );

    const todoList = screen.getAllByTestId("todo-item");

    expect(todoList.length).toBe(CONTENT_VALUES.length);
    expect(screen.getByText(expectedValueOne)).toBeInTheDocument();
    expect(screen.getByText(expectedValueTwo)).toBeInTheDocument();
  });

  test('remove an item of the list',  async () => {
    render(<App />);
    const CONTENT_VALUE = [expectedValueOne]
    const firstListItems = screen.queryAllByTestId("todo-item");

    expect(firstListItems.length).toBe(0);

    addNewItems(CONTENT_VALUE);

    const secondListItems = screen.queryAllByTestId("todo-item");
    expect(secondListItems.length).toBe(1);


    fireEvent.click(screen.getByTestId('remove-button-0'));
    const thirdListItems = screen.queryAllByTestId("todo-item");
    expect(thirdListItems.length).toBe(0);
  });
})