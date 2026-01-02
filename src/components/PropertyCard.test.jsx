import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PropertyCard from './PropertyCard'

vi.mock('@/types/property', () => ({
  getPropertyImage: (image) => `mocked-url/${image}`,
}))

describe('PropertyCard Component', () => {
  const mockProperty = {
    id: 1,
    title: 'Beautiful House',
    price: 750000,
    type: 'House',
    location: 'London',
    images: ['house1.jpg'],
  }

  it('renders property title, price, type, and location', () => {
    render(
      <MemoryRouter>
        <PropertyCard property={mockProperty} />
      </MemoryRouter>
    )

    expect(screen.getByText('£750,000')).toBeInTheDocument()
    
    expect(screen.getByText('House')).toBeInTheDocument()
    
    expect(screen.getByText('London')).toBeInTheDocument()
    
    const img = screen.getByAltText('Beautiful House')
    expect(img).toHaveAttribute('src', 'mocked-url/house1.jpg')
    
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/property/1')
  })

  it('uses a placeholder when image is missing', () => {
    const propertyWithoutImage = { ...mockProperty, images: [] }
    render(
      <MemoryRouter>
        <PropertyCard property={propertyWithoutImage} />
      </MemoryRouter>
    )

    const img = screen.getByAltText('Beautiful House')
    
    expect(img).toHaveAttribute('src', 'mocked-url/undefined')
  })
})
