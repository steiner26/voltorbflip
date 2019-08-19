import React from "react"

import BoardContainer from "./boardContainer"
import createBoard from "../data/levels"

class GameContainer extends React.Component {
  constructor(props) {
    super(props)

    const gameState = JSON.parse(window.localStorage.getItem("gameState"))
    if (gameState) {
      this.state = {
        ...gameState,
        inMemo: false,
        cursorPos: { row: 0, col: 0 },
      }
    } else {
      const { board, maxCoins } = createBoard(1)
      this.state = {
        level: 1,
        totalCoins: 0,
        currentCoins: 0,
        maxCoins: maxCoins,
        board: board,
        memo: this.createMemo(),
        inMemo: false,
        cursorPos: { row: 0, col: 0 },
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCoins !== this.state.currentCoins) {
      this.updateStorage()
    }
    if (this.state.currentCoins === this.state.maxCoins) {
      console.log("new level!")
    }
  }

  createMemo = () => {
    return Array(5)
      .fill()
      .map((_, __) =>
        Array(5)
          .fill()
          .map((_, __) => ({
            0: false,
            1: false,
            2: false,
            3: false,
          }))
      )
  }

  updateStorage = () => {
    //make sure to keep track of flips!!!!
    window.localStorage.setItem("gameState", JSON.stringify(this.state))
  }

  handleClick = (row, col) => {
    const tile = this.state.board[row][col]
    if (!tile.flipped && !this.state.inMemo) {
      tile.flipped = true
      const value = tile.value
      if (value) {
        this.setState(prevState => {
          const newCoins =
            prevState.currentCoins > 0 ? prevState.currentCoins * value : value
          return {
            currentCoins: newCoins,
          }
        })
      } else {
        this.setState(
          () => ({ currentCoins: 0 }),
          () => {
            /* Add callback for loss */
          }
        )
        console.log("boom")
      }
    }
    this.setState(() => ({ cursor: { row: row, col: col } }))
  }

  render() {
    return (
      <div>
        <div>
          {/* Level and coin counts */}
          <div>Level: {this.state.level}</div>
          <div>Total Coins: {this.state.totalCoins}</div>
          <div>Coins collected this Level: {this.state.currentCoins}</div>
        </div>
        <BoardContainer
          board={this.state.board}
          memo={this.state.memo}
          onChange={this.handleClick}
        />
      </div>
    )
  }
}

export default GameContainer
