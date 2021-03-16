import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'

const READY = 'ready'
const LOADING = 'loading'
const COMPLETE = 'complete'
const ERROR = 'error'

const MERGE_WITH_USER = gql`
  mutation mergeWithUser($id: String!) {
    mergeWithUser(id: $id) {
      id
    }
  }
`

const LoginPage = () => {
  const [status, setStatus] = React.useState(READY)
  const { logIn, logOut, isAuthenticated, loading } = useAuth()
  const { id } = useParams()

  const [mergeWithUser, { _, error: mergeError }] = useMutation(
    MERGE_WITH_USER,
    {
      onCompleted: () => {
        setStatus(COMPLETE)
      },
    }
  )

  const onLogIn = async (type) => {
    setStatus(LOADING)
    try {
      await logIn(type)
      if (id) {
        await mergeWithUser({ variables: { id } })
      }
      // send mutation with id
    } catch (e) {
      console.log(e)
      setStatus(ERROR)
    }
  }
  const onLogOut = async () => {
    await logOut()
  }

  const renderCallToAction = () => {
    if (mergeError)
      return (
        <p className="mt-8 text-xl">
          We had a problem! Please contact us if this keeps happening.
        </p>
      )
    if (!id)
      return (
        <p className="mt-8 text-xl">
          Uh oh! Looks like your url is missing some things. Please start over.
        </p>
      )
    // Happy case
    return (
      <>
        {status !== COMPLETE ? (
          <>
            <button
              disabled={status === LOADING}
              onClick={onLogIn}
              className="mt-8 mr-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green hover:bg-green-light"
            >
              {status === LOADING ? 'Waiting...' : 'MetaMask'}
            </button>
            or
            <button
              disabled={status === LOADING}
              onClick={() => onLogIn('walletConnect')}
              className="mt-8 ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green hover:bg-green-light"
            >
              {status === LOADING ? 'Waiting...' : 'Wallet Connect'}
            </button>
          </>
        ) : (
          <p className="mt-8 text-xl">
            🎉 Done! Close this page and check your DMs.
          </p>
        )}
      </>
    )
  }

  return (
    <>
      <div className="mt-8 sm:text-center lg:text-left">
        <h1 className="text-l tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          👋 Welcome
        </h1>
        <p className="mt-4">Click to sign-in with your wallet</p>
        {renderCallToAction()}
        <p className="mt-12 text-s text-grey-600">
          Having trouble? Try clicking <button onClick={onLogOut}>here</button>{' '}
          and starting over.
        </p>
      </div>
    </>
  )
}

export default LoginPage
