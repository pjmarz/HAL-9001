import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from '../Welcome';

// Import the types to fix TypeScript errors
import '@testing-library/jest-dom';
import 'jest';

// Mock the useNavigate hook
const mockNavigate = jest.fn();

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Welcome Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the welcome screen with logo and begin button', () => {
    render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );

    // Check if the logo is present
    expect(screen.getByAltText('')).toBeInTheDocument();
    
    // Check if the HAL-9001 text is present
    expect(screen.getByText('HAL-9001')).toBeInTheDocument();
    
    // Check if the Begin button is present
    expect(screen.getByText('Begin')).toBeInTheDocument();
  });

  it('navigates to selection-menu when Begin button is clicked', () => {
    render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );

    // Click the Begin button
    fireEvent.click(screen.getByText('Begin'));

    // Check if navigation was called with correct path
    expect(mockNavigate).toHaveBeenCalledWith('/selection-menu');
  });
}); 