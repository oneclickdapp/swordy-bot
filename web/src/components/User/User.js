import GameCard from 'src/components/GameCard'
import Pagination from 'src/components/Pagination'

import { QUERY } from 'src/components/UsersCell'
import { BLOCKSCOUT_URL } from 'src/utils/constants'
const User = ({ user }) => {
  return (
    <>
      <h2 className="rw-heading rw-heading-secondary">
        Filtered by owner{' '}
        <a href={`${BLOCKSCOUT_URL}${user.address}`} target="_blank">
          {user.address}
        </a>
      </h2>
      <div className="container text-center">
        <div className="flex flex-wrap -mx-3 lg:-mx-6">
          {user.gamesOwned.length ? (
            user.gamesOwned.map((game) => (
              <div
                key={game.id}
                className="w-full sm:w-1/2 lg:w-1/3 p-3 md:p-6"
              >
                <GameCard game={game} />
              </div>
            ))
          ) : (
            <div className="m-4">
              Sorry, we couldn't find any games for this address.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default User
