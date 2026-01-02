import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

describe('Footer Component', () => {
  it('renders the brand/logo', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(screen.getByText('Estate Agent')).toBeInTheDocument()
  })

  it('renders social media icons', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(3) 
    
  })

  it('renders section headings', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(screen.getByText('Quick Links')).toBeInTheDocument()
    expect(screen.getByText('Property Types')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    expect(screen.getByText(/123 Property Lane/i)).toBeInTheDocument()
    expect(screen.getByText(/\+44 20 1234 5678/i)).toBeInTheDocument()
    expect(screen.getByText(/info@estateagent\.co\.uk/i)).toBeInTheDocument()
  })

  it('renders bottom copyright text with current year', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )

    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText(`© ${currentYear} Estate Agent. All rights reserved`)
    ).toBeInTheDocument()
  })
})
