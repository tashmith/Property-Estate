import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

describe('Header component', () => {
  it('renders the logo text', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Estate Agent')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getAllByText('Search').length).toBeGreaterThan(0);
    expect(screen.getByText('Properties')).toBeInTheDocument();
  });

  it('opens mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const menuButton = screen.getByLabelText('Toggle menu');
    await user.click(menuButton);

    expect(screen.getAllByText('Search').length).toBeGreaterThan(1);
  });
});
