import { Link, routes } from '@redwoodjs/router'

const UserPage = () => {
  return (
    <>
      <h1>UserPage</h1>
      <p>
        Find me in <code>./web/src/pages/UserPage/UserPage.js</code>
      </p>
      <p>
        My default route is named <code>user</code>, link to me with `
        <Link to={routes.user()}>User</Link>`
      </p>
    </>
  )
}

export default UserPage
