// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/users/new" page={NewUserPage} name="newUser" />
      <Route path="/users/{id}/edit" page={EditUserPage} name="editUser" />
      <Route path="/users/{id}" page={UserPage} name="user" />
      <Route path="/users" page={UsersPage} name="users" />
      <Route path="/auth-details/new" page={NewAuthDetailPage} name="newAuthDetail" />
      <Route path="/auth-details/{id}/edit" page={EditAuthDetailPage} name="editAuthDetail" />
      <Route path="/auth-details/{id}" page={AuthDetailPage} name="authDetail" />
      <Route path="/auth-details" page={AuthDetailsPage} name="authDetails" />
      <Route path="/nfts/new" page={NewNftPage} name="newNft" />
      <Route path="/nfts/{id}/edit" page={EditNftPage} name="editNft" />
      <Route path="/nfts/{id}" page={NftPage} name="nft" />
      <Route path="/nfts" page={NftsPage} name="nfts" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
