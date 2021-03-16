import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'

const READY = 'ready'
const LOADING = 'loading'
const COMPLETE = 'complete'
const ERROR = 'error'

const LoginPage = () => {
  const [status, setStatus] = React.useState(READY)
  const { logIn, logOut, isAuthenticated, loading } = useAuth()
  const { redirectTo } = useParams()

  const onLogIn = async (type) => {
    setStatus(LOADING)
    try {
      await logIn(type)
      setStatus(COMPLETE)
    } catch (e) {
      console.log(e)
      setStatus(ERROR)
    }
  }
  const onLogOut = async () => {
    await logOut()
  }

  return (
    <>
      <div className="mt-8 sm:text-center lg:text-left">
        <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          👋 Welcome
        </h1>
        <p className="mt-4">
          Click the button below to sign in using your wallet
        </p>
        {status !== COMPLETE ? (
          <>
            <button
              disabled={status === LOADING}
              onClick={onLogIn}
              className="mt-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {status === LOADING ? 'Waiting...' : 'MetaMask'}
            </button>
            <button
              disabled={status === LOADING}
              onClick={() => onLogIn('walletConnect')}
              className="mt-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {status === LOADING ? 'Waiting...' : 'Wallet Connect'}
            </button>
          </>
        ) : (
          <p className="mt-4">
            🎉 Awesome! Close this window and check your DMs.
          </p>
        )}
        <p className="mt-4 text-s text-grey-600">
          Having trouble? Try clicking <button onClick={onLogOut}>here</button>{' '}
          and starting over.
        </p>
      </div>
    </>
  )
}

export default LoginPage
