import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FeaturedProperties from './FeaturedProperties'

vi.mock('@/data/properties.json', () => ({
  default: {
    properties: [
      { id: 1, title: 'House 1', price: 500000, images: ['house1.jpg'] },
      { id: 2, title: 'House 2', price: 750000, images: ['house2.jpg'] },
      { id: 3, title: 'House 3', price: 600000, images: ['house3.jpg'] },
    ],
  },
}))

vi.mock('./PropertyCard', () => {
  return {
    default: ({ property }) => (
      <div data-testid="property-card">{property.title}</div>
    ),
  }
})

describe('FeaturedProperties Component', () => {
  it('renders the section header', () => {
    render(
      <MemoryRouter>
        <FeaturedProperties />
      </MemoryRouter>
    )

    expect(
      screen.getByText('Discover Our Top Properties')
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        /Handpicked properties that offer exceptional value/i
      )
    ).toBeInTheDocument()

    expect(screen.getByText('View All Properties')).toBeInTheDocument()
  })

  it('renders the correct number of featured properties', () => {
    render(
      <MemoryRouter>
        <FeaturedProperties />
      </MemoryRouter>
    )

    const cards = screen.getAllByTestId('property-card')
    expect(cards.length).toBe(3) 
  })

  it('renders property titles correctly', () => {
    render(
      <MemoryRouter>
        <FeaturedProperties />
      </MemoryRouter>
    )

    expect(screen.getByText('House 1')).toBeInTheDocument()
    expect(screen.getByText('House 2')).toBeInTheDocument()
    expect(screen.getByText('House 3')).toBeInTheDocument()
  })
})
