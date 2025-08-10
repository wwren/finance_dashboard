import { render, screen } from '@testing-library/react'
import MyDashboard from '../page'

describe('My Dashboard Page', () => {
  it('renders the main heading', () => {
    render(<MyDashboard />)
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('My Dashboard')).toBeInTheDocument()
  })

  it('has correct page structure', () => {
    render(<MyDashboard />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    
    const container = heading.closest('div')
    expect(container).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    expect(() => render(<MyDashboard />)).not.toThrow()
  })

  it('has minimal content as expected', () => {
    render(<MyDashboard />)
    
    // Should only have the heading
    expect(screen.getByText('My Dashboard')).toBeInTheDocument()
    
    // Should not have any other content
    const allText = screen.getAllByText(/./)
    expect(allText).toHaveLength(1)
  })

  it('is accessible with proper heading hierarchy', () => {
    render(<MyDashboard />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.textContent).toBe('My Dashboard')
  })
})
