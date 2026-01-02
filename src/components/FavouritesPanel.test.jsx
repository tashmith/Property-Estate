import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FavouritesPanel from './FavouritesPanel'

vi.mock('@/types/property', () => ({
  getPropertyImage: (imageName) => '/placeholder.svg',
}))

describe('FavouritesPanel', () => {
  it('renders empty state when no favourites', () => {
    render(
      <FavouritesPanel
        favourites={[]}
        onRemove={vi.fn()}
        onClear={vi.fn()}
        onDrop={vi.fn()}
        onDragOver={vi.fn()}
        onDragLeave={vi.fn()}
        isDragOver={false}
      />
    )
    expect(screen.getByText(/No favourites yet/i)).toBeInTheDocument()
  })

  it('renders favourite items', () => {
    const mockFavourites = [
      { id: 1, title: 'House 1', price: 500000, images: ['house1.jpg'] },
      { id: 2, title: 'House 2', price: 750000, images: ['house2.jpg'] },
    ]

    render(
      <FavouritesPanel
        favourites={mockFavourites}
        onRemove={vi.fn()}
        onClear={vi.fn()}
        onDrop={vi.fn()}
        onDragOver={vi.fn()}
        onDragLeave={vi.fn()}
        isDragOver={false}
      />
    )

    expect(screen.getByText('House 1')).toBeInTheDocument()
    expect(screen.getByText('House 2')).toBeInTheDocument()
  })
})
