import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/user" page={UserPage} name="user" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/" page={HomePage} name="home" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/users/{address}" page={UserPage} name="user" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
