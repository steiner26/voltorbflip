import React from "react"
import styles from "../styles/components/game-container.module.scss"

import BoardContainer from "./boardContainer"
import Memo from "./memo"
import Counter from "./counter"
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
    window.addEventListener("keydown", this.handleKeyDown)
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

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown)
  }

  handleKeyDown = e => {
    const { row, col } = this.state.cursor
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault()
        if (col !== 5) {
          this.setState(() => ({
            cursor: { row: row - 1 === -1 ? 4 : row - 1, col },
          }))
        }
        break
      case "ArrowDown":
        e.preventDefault()
        if (col !== 5) {
          this.setState(() => ({
            cursor: { row: (row + 1) % 5, col },
          }))
        }
        break
      case "ArrowRight":
        e.preventDefault()
        this.setState(() => ({ cursor: { row, col: (col + 1) % 6 } }))
        break
      case "ArrowLeft":
        e.preventDefault()
        this.setState(() => ({
          cursor: { row, col: col - 1 === -1 ? 5 : col - 1 },
        }))
        break
      case " ":
      case "Enter":
        e.preventDefault()
        if (col !== 5) {
          this.handleClick(row, col)
        } else {
          this.toggleMemo()
        }
        break
      case "x":
        this.toggleMemo()
        break
      case "0":
      case "1":
      case "2":
      case "3":
        this.updateMemo(e.key)
        break
      case "`":
        this.updateMemo(0)
        break
      default:
        break
    }
  }

  createMemo = () =>
    createGrid(() => ({
      0: false,
      1: false,
      2: false,
      3: false,
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

  toggleMemo = () => {
    if (this.state.status === states.MEMO) {
      this.setState(() => ({ status: states.GAME }))
    } else if (this.state.status === states.GAME) {
      this.setState(() => ({ status: states.MEMO }))
    }
  }

  updateMemo = num => {
    const { row, col } = this.state.cursor
    if (
      (this.state.status === states.MEMO ||
        this.state.status === states.GAME) &&
      col !== 5
    ) {
      var memo = this.state.memo
      memo[row][col][num] = !memo[row][col][num]
      this.setState(() => ({ memo }))
    }
  }

  render() {
    const { row, col } = this.state.cursor
    var cursorMemo = {}
    if (col !== 5 && !this.state.board[row][col].flipped) {
      cursorMemo = this.state.memo[row][col]
    }
    return (
      <div>
        <div>
          <div>
            Level: <Counter id="level" value={this.state.level} />
          </div>
          <div>
            Total Coins:{" "}
            <Counter id="totalcoins" value={this.state.totalCoins} />
          </div>
          <div>
            Coins collected this Level:{" "}
            <Counter id="currentcoins" value={this.state.currentCoins} />
          </div>
        </div>
        <div className={styles.gameContainer}>
          <div className={styles.boardContainer}>
            <BoardContainer
              board={this.state.board}
              memo={this.state.memo}
              status={this.state.status}
              cursor={this.state.cursor}
              onChange={this.handleClick}
            />
          </div>
          <Memo
            toggleMemo={this.toggleMemo}
            updateMemo={this.updateMemo}
            cursor={this.state.cursor.col === 5}
            memo={this.state.status === states.MEMO}
            cursorMemo={cursorMemo}
          />
        </div>
      </div>
    )
  }
}

export default GameContainer
