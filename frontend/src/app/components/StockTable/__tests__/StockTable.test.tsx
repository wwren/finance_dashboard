import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StockTable } from '@/components/StockTable/StockTable'

// Mock data for testing
const mockStockData = [
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
]

const setUpComponent = (data = mockStockData) => {
  render(<StockTable data={data} />)
  
  return {
    table: screen.getByRole('table'),
    symbolHeader: screen.getByText('Symbol'),
    companyNameHeader: screen.getByText('Company Name'),
    weightHeader: screen.getByText('Weight'),
    gicsSectorHeader: screen.getByText('GICS Sector'),
    gicsSubIndustryHeader: screen.getByText('GICS Sub-industry'),
    dateAddedHeader: screen.getByText('Date added'),
    priceHeader: screen.getByText('Price'),
    msftSymbol: screen.getByText('MSFT'),
    msftCompany: screen.getByText('Microsoft'),
    msftWeight: screen.getByText('6.62%'),
    msftSector: screen.getByText('Excellent'),
    msftSubIndustry: screen.getByText('75%'),
    msftPrice: screen.getByText('$1,799'),
    aaplSymbol: screen.getByText('AAPL'),
    aaplCompany: screen.getByText('Apple'),
    aaplWeight: screen.getByText('N/A'),
    aaplSector: screen.getByText('Very Good'),
    aaplSubIndustry: screen.getByText('60%'),
    aaplPrice: screen.getByText('$449'),
    checkboxes: screen.getAllByRole('checkbox'),
    rows: screen.getAllByRole('row'),
    noDataMessage: screen.queryByText('No data available')
  }
}

describe('StockTable', () => {
  it('renders table headers correctly', () => {
    const { 
      symbolHeader, 
      companyNameHeader, 
      weightHeader, 
      gicsSectorHeader, 
      gicsSubIndustryHeader, 
      dateAddedHeader, 
      priceHeader 
    } = setUpComponent()
    
    expect(symbolHeader).toBeInTheDocument()
    expect(companyNameHeader).toBeInTheDocument()
    expect(weightHeader).toBeInTheDocument()
    expect(gicsSectorHeader).toBeInTheDocument()
    expect(gicsSubIndustryHeader).toBeInTheDocument()
    expect(dateAddedHeader).toBeInTheDocument()
    expect(priceHeader).toBeInTheDocument()
  })

  it('renders stock data correctly', () => {
    render(<StockTable data={mockStockData} />)
    
    expect(screen.getByText('MSFT')).toBeInTheDocument()
    expect(screen.getByText('Microsoft')).toBeInTheDocument()
    expect(screen.getByText('6.62%')).toBeInTheDocument()
    expect(screen.getByText('Excellent')).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
    expect(screen.getByText('$1,799')).toBeInTheDocument()
    
    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('N/A')).toBeInTheDocument()
    expect(screen.getByText('Very Good')).toBeInTheDocument()
    expect(screen.getByText('60%')).toBeInTheDocument()
    expect(screen.getByText('$449')).toBeInTheDocument()
  })

  it('renders checkboxes for row selection', () => {
    render(<StockTable data={mockStockData} />)
    
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(mockStockData.length)
    
    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked()
    })
  })

  it('handles row selection correctly', async () => {
    const user = userEvent.setup()
    render(<StockTable data={mockStockData} />)
    
    const firstCheckbox = screen.getAllByRole('checkbox')[0]
    await user.click(firstCheckbox)
    
    expect(firstCheckbox).toBeChecked()
  })

  it('handles sorting correctly', async () => {
    const user = userEvent.setup()
    render(<StockTable data={mockStockData} />)
    
    const symbolHeader = screen.getByText('Symbol')
    await user.click(symbolHeader)
    
    // Check if sort icon appears
    expect(screen.getByText('↑')).toBeInTheDocument()
  })

  it('displays correct date format', () => {
    render(<StockTable data={mockStockData} />)
    
    // The date should be formatted according to locale
    const dateElement = screen.getByText(/6\/1\/2024/)
    expect(dateElement).toBeInTheDocument()
  })

  it('handles null weight values correctly', () => {
    render(<StockTable data={mockStockData} />)
    
    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  it('applies correct CSS classes for sector ratings', () => {
    render(<StockTable data={mockStockData} />)
    
    const excellentSector = screen.getByText('Excellent')
    const veryGoodSector = screen.getByText('Very Good')
    
    expect(excellentSector).toHaveClass('sectorExcellent')
    expect(veryGoodSector).toHaveClass('sectorVeryGood')
  })

  it('renders no data message when data is empty', () => {
    render(<StockTable data={[]} />)
    
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('renders no data message when data is null', () => {
    render(<StockTable data={null as any} />)
    
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('renders table with correct structure', () => {
    render(<StockTable data={mockStockData} />)
    
    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    
    const rows = screen.getAllByRole('row')
    // Header row + 2 data rows
    expect(rows).toHaveLength(3)
  })

  it('handles price formatting correctly', () => {
    render(<StockTable data={mockStockData} />)
    
    expect(screen.getByText('$1,799')).toBeInTheDocument()
    expect(screen.getByText('$449')).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    expect(() => render(<StockTable data={mockStockData} />)).not.toThrow()
  })
})
