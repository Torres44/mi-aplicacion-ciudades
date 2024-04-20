/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CitySelector from './CitySelector';

test('renders city selector component', async () => {
  const mockCities = [
    { name: 'Bay Minette', lat: '30.88296', lng: '-87.77305' },
    { name: 'Edna', lat: '28.97859', lng: '-96.64609' },
  ];
  
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => mockCities,
  } as Response);

  const onSelect = jest.fn();

  const { getByPlaceholderText, getByText, findByText } = render(<CitySelector onSelect={onSelect} />);

  const input = getByPlaceholderText('Selecciona una ciudad');
  fireEvent.focus(input);
  fireEvent.keyDown(input, { key: 'ArrowDown' });
  await findByText('Bay Minette');
  fireEvent.click(getByText('Bay Minette'));

  expect(onSelect).toHaveBeenCalledWith(mockCities[0]);
});
