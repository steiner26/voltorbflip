import React from "react"
import styles from "../styles/components/game-container.module.scss"

import BoardContainer from "./boardContainer"
import { createBoard, createGrid, states } from "../variables"

class GameContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 1,
      totalCoins: 0,
      currentCoins: 0,
      maxCoins: 1,
      board: createGrid(() => ({})),
      memo: this.createMemo(),
      status: states.LOADING,
      cursor: { row: 0, col: 0 },
    }
  }

  componentDidMount() {
    const gameState = JSON.parse(window.localStorage.getItem("gameState"))
    if (gameState) {
      this.setState(() => ({
        ...gameState,
        cursor: { row: 0, col: 0 },
      }))
    } else {
      const { board, maxCoins } = createBoard(1)
      this.setState(() => ({ board, maxCoins, status: states.GAME }))
    }
    window.addEventListener("keydown", this.setCursor)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCoins !== this.state.currentCoins) {
      // this.updateStorage()
    }
    if (
      this.state.status === states.GAME &&
      this.state.currentCoins === this.state.maxCoins
    ) {
      this.setState(() => ({ status: states.GAMEWON }))
    }
    if (
      this.state.status === states.GAMEWON &&
      prevState.status !== states.GAMEWON
    ) {
      console.log("won!")
    }
    if (
      this.state.status === states.GAMELOST &&
      prevState.status !== states.GAMELOST
    ) {
      console.log("lost!")
    }
  }

  setCursor = e => {}

  createMemo = () =>
    createGrid(() => ({
      0: true,
      1: true,
      2: true,
      3: true,
    }))

  updateStorage = () => {
    //make sure to keep track of flips!!!!
    window.localStorage.setItem("gameState", JSON.stringify(this.state))
  }

  handleClick = (row, col) => {
    this.setState(prevState => {
      const newState = {}
      newState.cursor = { row, col }
      const tile = this.state.board[row][col]
      if (!tile.flipped && this.state.status === states.GAME) {
        tile.flipped = true
        const value = tile.value
        if (value) {
          newState.currentCoins = (prevState.currentCoins || 1) * value
        } else {
          newState.currentCoins = 0
          newState.status = states.GAMELOST
        }
      }
      return newState
    })
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
        <div>
          <div onClick={() => window.localStorage.clear()}>Reset</div>
        </div>
        <div className={styles.boardContainer}>
          <BoardContainer
            board={this.state.board}
            memo={this.state.memo}
            status={this.state.status}
            cursor={this.state.cursor}
            onChange={this.handleClick}
          />
        </div>
      </div>
    )
  }
}

export default GameContainer
