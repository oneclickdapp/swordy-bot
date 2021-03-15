import * as React from 'react'
import { ChessGif } from './chessgif'
import { parseMoves } from './parse_moves'

interface Props {
  pgn: string
  // moves: string[]
  // range: number[]
  flipBoard: boolean
  url: string
  setUrl: (url: string) => void
}

export class Gif extends React.Component<Props, {}> {
  chessGif = new ChessGif()

  public componentDidMount() {
    this.updateAnimatedGif()
  }

  public async componentDidUpdate(prevProps: Props) {
    if (JSON.stringify(prevProps.pgn) != JSON.stringify(this.props.pgn)) {
      this.chessGif.resetCache()
    }

    if (
      JSON.stringify(prevProps.pgn) != JSON.stringify(this.props.pgn) ||
      // prevProps.range[0] != this.props.range[0] ||
      // prevProps.range[1] != this.props.range[1] ||
      prevProps.flipBoard != this.props.flipBoard
    ) {
      this.updateAnimatedGif()
    }
  }

  public async updateAnimatedGif() {
    const moves = parseMoves(this.props.pgn)
    if (moves.length > 0) {
      this.chessGif.loadMoves(moves)
      await this.chessGif.createGif(
        // this.props.range[0],
        // this.props.range[1],
        0,
        moves.length,
        this.props.flipBoard
      )

      const url = this.chessGif.asBase64Gif()
      this.props.setUrl(url)
    }
  }

  public render() {
    return <img id="animated-gif" src={this.props.url} alt="" />
  }
}
