import { render } from '@redwoodjs/testing'

import UserPage from './UserPage'

describe('UserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserPage />)
    }).not.toThrow()
  })
})
