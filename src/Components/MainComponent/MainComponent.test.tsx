
// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
// the component to test
import MainComponent from './MainComponent';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { debug } from 'console';

test('Test if Pokemons loaded', async () => {
  render(<MainComponent width="lg" />);
  await waitFor(() => screen.getByAltText('bulbasaur'));
  expect(screen.getByAltText('bulbasaur'));
  expect(screen.getByText(/bulbasaur/i));
})

test('Check if Pokemons Update on next Page', async () => {
  render(<MainComponent width="lg" />);

  await waitFor(() => screen.getAllByRole('button', { name: /next/i })[0]); 
  fireEvent.click(screen.getAllByRole('button', { name: /next/i })[0]);
  await waitFor(() => screen.getByText(/bulbasaur/i));
  fireEvent.click(screen.getAllByRole('button', { name: /next/i })[0]);
  await waitFor(() => screen.getByText(/persian/i));
  expect(screen.getByText(/persian/i));
})

test('Test if alert message shows up', async () => {
  render(<MainComponent width="lg" />);

  await waitFor(() => screen.getAllByRole('button', { name: /next/i })[0]);
  expect(screen.getByText(/bulbasaur/i));
  fireEvent.click(screen.getAllByRole('button', { name: /next/i })[0]);
  await waitFor(() => screen.getByText(/persian/i));
  fireEvent.click(screen.getAllByRole('button', { name: /next/i })[0]);
  await waitFor(() => screen.getByText(/error occured while loading data error: request failed with status code 500/i));
  expect(screen.getByText(/error occured while loading data error: request failed with status code 500/i));
})

test('Check if ErrorBoundary is shown in case of error', () => {
  const spy = jest.spyOn(console, 'error')
  spy.mockImplementation(() => { });

  const Throw = () => {
    throw new Error('Dont Hassle the Hoff');
  }

  render(
    <ErrorBoundary>
      <Throw />
    </ErrorBoundary>,
  )

  expect(screen.getByText('Sorry.. there was an error')).toBeDefined();
  expect(screen.getByRole('img', { name: /error/i }));
  // screen.debug();
  // screen.logTestingPlaygroundURL();
  spy.mockRestore();
})

