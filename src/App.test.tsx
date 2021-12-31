import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('should render a title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hey/i);
  expect(linkElement).toBeInTheDocument();
});
