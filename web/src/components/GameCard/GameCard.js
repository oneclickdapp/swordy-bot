import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { Gif } from 'src/utils/gfychess/gif'

import ChessImageGenerator from 'src/utils/chess-image-generator'
const LOADING_GIF_SRC = '/skeleton.png'

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toLocaleString().split(',')[0]}
    </time>
  )
}

const GameCard = ({ game }) => {
  const { addMessage } = useFlash()
  const [src, setSrc] = React.useState(LOADING_GIF_SRC)

  // const [url, setUrl] = React.useState('')
  // <Gif className="w-full" pgn={game.moves} url={url} setUrl={setUrl} />
  // const fetchThumbnail = async () => {
  //   // const res = await fetch(`/api/thumbnail?moves=${game.moves}`)
  //   const res = await fetch(
  //     `api/thumbnail?moves=1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 `
  //   )
  //   // const res = await fetch(`api/thumbnail?moves=1. e4 e5 2. Nf3 Nc6 3. Bb5 a6`)
  //   console.log(res)
  //   const blob = await res.data()
  //   var bytes = new Uint8Array(blob.length / 2);
  //   // const json = await res.text()
  //   // console.log(blob)
  //   console.log(blob)
  //   setSrc(blob)
  //   // console.log(URL.createObjectURL(blob))
  //   setSrc(URL.createObjectURL(blob))
  // }

  const loadThumbnail = async () => {
    const imageGenerator = new ChessImageGenerator()
    try {
      const image = imageGenerator.loadPGN(game.moves.replace('pgn', ''))
      const dataURL = await imageGenerator.generateDataURL()
      // setSrc(`'data:image/jpeg;base64,${buf.toString('base64')}`)
      setSrc(dataURL)
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    loadThumbnail()
    // fetchThumbnail()
  }, [])

  // <img src={imageGenerator.generateBuffer()} />
  return (
    <div className="bg-white h-full shadow-sm rounded-md overflow-hidden group">
      <Link to={routes.game({ id: game.id })}>
        <div className="group-hover:opacity-75 transition duration-150 ease-in-out">
          <img className="h-full w-full" src={src} />
        </div>
        <div className="text-left p-4 sm:p-5">
          <h1 className="sm:text-lg text-gray-900 font-semibold">
            <div className="flex">
              <svg height="20" width="20" className="mr-2 mt-1">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="black"
                  strokeWidth="2"
                  fill="black"
                />
              </svg>
              {game.black}{' '}
            </div>
            <div className="flex">
              <svg height="20" width="20" className="mr-2 mt-1">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="black"
                  strokeWidth="2"
                  fill="white"
                />
              </svg>
              {game.white}
            </div>
          </h1>
          <p className="text-sm sm:text-base text-gray-700">
            {timeTag(game.playedAt)}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default GameCard
