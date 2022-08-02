import { render, screen } from '@testing-library/react';
import App from './App';
import Home from  "./components/Home"

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/ Welcome to Guau Guau Landing Page/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

