import { render, screen } from '@testing-library/react'
import Dashboard from '@/app/(dashboard)/page'

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

const setUpComponent = () => {
  render(<Dashboard />)
  
  return {
    mainHeading: screen.getByRole('heading', { level: 1 }),
    sp500Text: screen.getByText('S&P 500'),
    stockTable: screen.getByTestId('stock-table'),
    stockTableData: screen.getByTestId('stock-table-data'),
    stock1: screen.getByTestId('stock-1'),
    stock2: screen.getByTestId('stock-2'),
    msftText: screen.getByText('MSFT - Microsoft'),
    aaplText: screen.getByText('AAPL - Apple'),
    main: screen.getByRole('main'),
    header: screen.getByText('S&P 500').closest('div'),
    pageDiv: screen.getByText('S&P 500').closest('.page'),
    mainElement: screen.getByRole('main')
  }
}

describe('Dashboard Page', () => {
  it('renders the main heading', () => {
    const { mainHeading, sp500Text } = setUpComponent()
    
    expect(mainHeading).toBeInTheDocument()
    expect(sp500Text).toBeInTheDocument()
  })

  it('renders the StockTable component', () => {
    const { stockTable } = setUpComponent()
    
    expect(stockTable).toBeInTheDocument()
  })

  it('passes stock data to StockTable', () => {
    const { stockTableData, stock1, stock2 } = setUpComponent()
    
    expect(stockTableData).toBeInTheDocument()
    expect(stock1).toBeInTheDocument()
    expect(stock2).toBeInTheDocument()
  })

  it('displays correct stock information', () => {
    const { msftText, aaplText } = setUpComponent()
    
    expect(msftText).toBeInTheDocument()
    expect(aaplText).toBeInTheDocument()
  })

  it('has correct page structure', () => {
    const { main, header } = setUpComponent()
    
    expect(main).toBeInTheDocument()
    expect(header).toHaveClass('header')
  })

  it('renders without crashing', () => {
    expect(() => setUpComponent()).not.toThrow()
  })

  it('has correct CSS classes applied', () => {
    const { pageDiv, mainElement } = setUpComponent()
    
    expect(pageDiv).toBeInTheDocument()
    expect(mainElement).toHaveClass('main')
  })
})
