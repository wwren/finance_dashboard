import { render, screen } from '@testing-library/react'
import Dashboard from '../page'

// Mock the stock data
jest.mock('@/data/stockData.json', () => [
  {
    id: "1",
    symbol: "MSFT",
    companyName: "Microsoft",
    weight: 6.62,
    gicsSector: "Excellent",
    gicsSubIndustry: "75%",
    dateAdded: "2024-06-01T10:00:00Z",
    price: 1799
  },
  {
    id: "2",
    symbol: "AAPL",
    companyName: "Apple",
    weight: null,
    gicsSector: "Very Good",
    gicsSubIndustry: "60%",
    dateAdded: "2024-06-01T10:00:00Z",
    price: 449
  }
], { virtual: true })

describe('Dashboard Page', () => {
  it('renders the main heading', () => {
    render(<Dashboard />)
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('S&P 500')).toBeInTheDocument()
  })

  it('renders the StockTable component', () => {
    render(<Dashboard />)
    
    expect(screen.getByTestId('stock-table')).toBeInTheDocument()
  })

  it('passes stock data to StockTable', () => {
    render(<Dashboard />)
    
    expect(screen.getByTestId('stock-table-data')).toBeInTheDocument()
    expect(screen.getByTestId('stock-1')).toBeInTheDocument()
    expect(screen.getByTestId('stock-2')).toBeInTheDocument()
  })

  it('displays correct stock information', () => {
    render(<Dashboard />)
    
    expect(screen.getByText('MSFT - Microsoft')).toBeInTheDocument()
    expect(screen.getByText('AAPL - Apple')).toBeInTheDocument()
  })

  it('has correct page structure', () => {
    render(<Dashboard />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    
    const header = screen.getByText('S&P 500').closest('div')
    expect(header).toHaveClass('header')
  })

  it('renders without crashing', () => {
    expect(() => render(<Dashboard />)).not.toThrow()
  })

  it('has correct CSS classes applied', () => {
    render(<Dashboard />)
    
    const pageDiv = screen.getByText('S&P 500').closest('.page')
    expect(pageDiv).toBeInTheDocument()
    
    const mainElement = screen.getByRole('main')
    expect(mainElement).toHaveClass('main')
  })
})
