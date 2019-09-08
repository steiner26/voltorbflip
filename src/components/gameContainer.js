import React from "react"
import styles from "../styles/components/game-container.module.scss"

import BoardContainer from "./boardContainer"
import Memo from "./memo"
import Counter from "./counter"
import { createBoard, createGrid, levelDown, states } from "../variables"
import classNames from "classnames/bind"

var cx = classNames.bind(styles)

class GameContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prevLevel: 1,
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
      this.setState(() => ({
        status: states.GAMEWON,
        cursor: {},
      }))
    }
    if (
      (this.state.status === states.GAMEWON &&
        prevState.status !== states.GAMEWON) ||
      (this.state.status === states.GAMELOST &&
        prevState.status !== states.GAMELOST)
    ) {
      setTimeout(() => window.addEventListener("click", this.newLevel), 1)
    }
    if (this.state.status === states.GAME && prevState.status > states.MEMO) {
      this.setState(() => ({ cursor: { row: 0, col: 0 } }))
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown)
    window.removeEventListener("click", this.newLevel)
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
        if (this.state.status > states.MEMO) {
          this.newLevel()
        } else {
          if (col !== 5) {
            this.handleClick(row, col)
          } else {
            this.toggleMemo()
          }
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
    window.localStorage.setItem("gameState", JSON.stringify(this.state))
  }

  handleClick = (row, col) => {
    this.setState(prevState => {
      const newState = {}
      if (
        this.state.status === states.GAME ||
        this.state.status === states.MEMO
      ) {
        newState.cursor = { row, col }
      }
      const tile = this.state.board[row][col]
      if (!tile.flipped && this.state.status === states.GAME) {
        tile.flipped = true
        const value = tile.value
        if (value) {
          newState.currentCoins = (prevState.currentCoins || 1) * value
        } else {
          newState.currentCoins = 0
          newState.status = states.GAMELOST
          newState.cursor = {}
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

  newLevel = () => {
    this.setState(prevState => {
      var newState = {}
      if (prevState.status === states.GAMEWON) {
        newState.status = states.FLIPWON
      } else if (prevState.status === states.GAMELOST) {
        newState.status = states.FLIPLOST
      } else if (prevState.status === states.FLIPWON) {
        const level = Math.min(prevState.level + 1, 7)
        newState.level = level
        newState.prevLevel = prevState.level
        newState.totalCoins = Math.min(
          prevState.totalCoins + prevState.currentCoins,
          99999
        )
        newState.currentCoins = 0
        const { board, maxCoins } = createBoard(level)
        newState.board = board
        newState.maxCoins = maxCoins
        newState.memo = this.createMemo()
        newState.status = states.NEWLEVEL
        this.timer = setTimeout(this.startGame, 2000)
      } else if (prevState.status === states.FLIPLOST) {
        const level = levelDown(prevState.level)
        newState.level = level
        newState.prevLevel = prevState.level
        const { board, maxCoins } = createBoard(level)
        newState.board = board
        newState.maxCoins = maxCoins
        newState.memo = this.createMemo()
        newState.status = states.NEWLEVEL
        this.timer = setTimeout(this.startGame, 2000)
      } else if (prevState.status === states.NEWLEVEL) {
        clearTimeout(this.timer)
        newState.status = states.GAME
        window.removeEventListener("click", this.newLevel)
      }
      return newState
    })
  }

  startGame = () => {
    clearTimeout(this.timer)
    this.setState(() => ({ status: states.GAME }))
    window.removeEventListener("click", this.newLevel)
  }

  messageText = () => {
    if (
      this.state.status === states.GAMEWON ||
      this.state.status === states.FLIPWON
    ) {
      return `Game clear! You received ${this.state.currentCoins} Coins!`
    }
    if (
      this.state.status === states.GAMELOST ||
      this.state.status === states.FLIPLOST
    ) {
      return "Oh no! You get 0 Coins!"
    }
    if (
      this.state.status === states.NEWLEVEL ||
      this.state.status === states.GAME
    ) {
      if (this.state.level > this.state.prevLevel) {
        return `Advanced to Game Lv. ${this.state.level}!`
      }
      if (this.state.level === this.state.prevLevel) {
        return `Ready to play Game Lv. ${this.state.level}!`
      }
      if (this.state.level < this.state.prevLevel) {
        return `Dropped to Game Lv. ${this.state.level}!`
      }
    }
  }

  render() {
    const { row, col } = this.state.cursor
    var cursorMemo = {}
    if (col < 5 && !this.state.board[row][col].flipped) {
      cursorMemo = this.state.memo[row][col]
    }
    return (
      <div className={styles.gameContent}>
        <div className={styles.scoreContainer}>
          <div className={styles.scoreItem}>
            Level: <span id="level">{this.state.level}</span>
          </div>
          <div className={styles.scoreItem}>
            Total Coins:{" "}
            <Counter id="totalcoins" value={this.state.totalCoins} />
          </div>
          <div className={styles.scoreItem}>
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
            <div
              className={cx("message", {
                show:
                  this.state.status === states.GAMEWON ||
                  this.state.status === states.GAMELOST ||
                  this.state.status === states.NEWLEVEL,
              })}
            >
              <div className={styles.messageText}>{this.messageText()}</div>
            </div>
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
