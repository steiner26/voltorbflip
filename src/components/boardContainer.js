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
    if (this.props.status === states.GAME && prevProps.status !== states.GAME) {
      this.setState(this.generateSums)
    }
  }

  handleClick = (row, col) => {
    this.props.onChange(row, col)
  }

  render() {
    var cursor = this.props.cursor
    return (
      //I also need to include the column/row info.
      //The board should be be mostly center with the other items placed relative to it
      <div className={styles.boardContainer}>
        {this.props.board.map((boardRow, row) => {
          var result = boardRow.map((tile, col) => {
            return (
              <Tile
                key={col}
                memo={this.props.memo[row][col]}
                onChange={this.handleClick}
                cursor={cursor.row === row && cursor.col === col}
                inMemo={this.props.status === states.MEMO}
                {...tile} //spread the row, col, value and flipped as props
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
