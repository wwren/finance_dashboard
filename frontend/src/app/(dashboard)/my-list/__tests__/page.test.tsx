import { render, screen } from '@testing-library/react'
import MyDashboard from '@/app/(dashboard)/my-list/page'

const setUpComponent = () => {
  render(<MyDashboard />)
  
  return {
    mainHeading: screen.getByRole('heading', { level: 1 }),
    myDashboardText: screen.getByText('My Dashboard'),
    container: screen.getByText('My Dashboard').closest('div'),
    allText: screen.getAllByText(/./)
  }
}

describe('My Dashboard Page', () => {
  it('renders the main heading', () => {
    const { mainHeading, myDashboardText } = setUpComponent()
    
    expect(mainHeading).toBeInTheDocument()
    expect(myDashboardText).toBeInTheDocument()
  })

  it('has correct page structure', () => {
    const { mainHeading, container } = setUpComponent()
    
    expect(mainHeading).toBeInTheDocument()
    expect(container).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    expect(() => setUpComponent()).not.toThrow()
  })

  it('has minimal content as expected', () => {
    const { myDashboardText, allText } = setUpComponent()
    
    // Should only have the heading
    expect(myDashboardText).toBeInTheDocument()
    
    // Should not have any other content
    expect(allText).toHaveLength(1)
  })

  it('is accessible with proper heading hierarchy', () => {
    const { mainHeading } = setUpComponent()
    
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading.textContent).toBe('My Dashboard')
  })
})
