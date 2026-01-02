import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'

describe('Header Component', () => {
  it('renders the logo and brand name', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByText('Estate Agent')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /estate agent/i })).toBeInTheDocument()
  })

  it('renders desktop navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Properties')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /toggle menu/i })
    expect(button).toBeInTheDocument()
  })

  it('toggles mobile navigation when menu button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const button = screen.getByRole('button', { name: /toggle menu/i })
    
    
    expect(screen.queryByText('List Your Property')).not.toBeInTheDocument()
    
    
    await user.click(button)
    expect(screen.getByText('List Your Property')).toBeInTheDocument()
    
    
    await user.click(button)
    expect(screen.queryByText('List Your Property')).not.toBeInTheDocument()
  })

  it('highlights the active link based on location', () => {
    render(
      <MemoryRouter initialEntries={['/properties']}>
        <Header />
      </MemoryRouter>
    )

    const propertiesLink = screen.getByText('Properties')
    expect(propertiesLink.className).toMatch(/text-accent/)
  })
})
