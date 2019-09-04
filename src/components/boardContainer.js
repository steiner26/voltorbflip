import React from "react"
import styles from "../styles/components/board-container.module.scss"

import Tile from "./tile"
import Info from "./info"
import { states } from "../variables"

class BoardContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.generateSums()
  }

  generateSums = () => {
    var rsums = Array.from({ length: 5 }, (_, i) => ({ points: 0, bombs: 0 }))
    var csums = Array.from({ length: 5 }, (_, i) => ({ points: 0, bombs: 0 }))
    this.props.board.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        let value = tile.value
        if (value) {
          rsums[rowIndex].points += value
          csums[colIndex].points += value
        } else {
          rsums[rowIndex].bombs += 1
          csums[colIndex].bombs += 1
        }
      })
    })

    return { rsums, csums }
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.status === states.NEWLEVEL &&
        prevProps.status !== states.NEWLEVEL) ||
      (this.props.status === states.GAME && prevProps.status === states.LOADING)
    ) {
      this.setState(this.generateSums)
    }
  }

  handleClick = (row, col) => {
    this.props.onChange(row, col)
  }

  render() {
    var cursor = this.props.cursor
    return (
      <div className={styles.boardContainer}>
        {this.props.board.map((boardRow, row) => {
          var result = boardRow.map((tile, col) => {
            const { flipped, ...other } = tile
            return (
              <Tile
                key={col}
                memo={this.props.memo[row][col]}
                onChange={this.handleClick}
                cursor={cursor.row === row && cursor.col === col}
                inMemo={this.props.status === states.MEMO}
                flipped={
                  flipped ||
                  this.props.status === states.FLIPLOST ||
                  this.props.status === states.FLIPWON
                }
                {...other}
              />
            )
          })
          result.push(<Info key={5} index={row} {...this.state.rsums[row]} />)
          return result
        })}
        {this.state.csums.map((item, index) => (
          <Info key={index} index={index} {...item} />
        ))}
      </div>
    )
  }
}

export default BoardContainer
