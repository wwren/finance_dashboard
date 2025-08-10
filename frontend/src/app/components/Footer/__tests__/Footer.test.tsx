import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/Footer/Footer'

const setUpComponent = () => {
  render(<Footer />)
  
  return {
    githubLink: screen.getByRole('link', { name: /GitHub/i }),
    linkedinLink: screen.getByRole('link', { name: /LinkedIn/i }),
    githubIcon: screen.getByRole('img', { hidden: true }),
    linkedinIcon: screen.getByRole('img', { hidden: true }),
    footer: screen.getByRole('contentinfo'),
    copyrightText: screen.getByText(/Copyright/),
    dashboardText: screen.getByText(/Ran's Finance Dashboard 2025/),
    githubText: screen.getByText(/GitHub/),
    linkedinText: screen.getByText(/LinkedIn/)
  }
}

describe('Footer', () => {
  it('renders copyright information', () => {
    const { copyrightText, dashboardText } = setUpComponent()

    expect(copyrightText).toBeInTheDocument()
    expect(dashboardText).toBeInTheDocument()
  })

  it('renders GitHub link with correct attributes', () => {
    const { githubLink } = setUpComponent()

    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/wwren/finance_dashboard')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noreferrer')
    expect(githubLink).toHaveAttribute('id', 'github-link')
  })

  it('renders LinkedIn link with correct attributes', () => {
    const { linkedinLink } = setUpComponent()

    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ding-ran/')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
    expect(linkedinLink).toHaveAttribute('rel', 'noreferrer')
    expect(linkedinLink).toHaveAttribute('id', 'linkedin-link')
  })

  it('renders GitHub icon', () => {
    const { githubIcon } = setUpComponent()

    expect(githubIcon).toBeInTheDocument()
  })

  it('renders LinkedIn icon', () => {
    const { linkedinIcon } = setUpComponent()

    expect(linkedinIcon).toBeInTheDocument()
  })

  it('has correct footer structure', () => {
    const { footer, copyrightText, githubText, linkedinText } = setUpComponent()

    expect(footer).toBeInTheDocument()

    // Check that both main sections exist
    expect(copyrightText).toBeInTheDocument()
    expect(githubText).toBeInTheDocument()
    expect(linkedinText).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    expect(() => setUpComponent()).not.toThrow()
  })
})
