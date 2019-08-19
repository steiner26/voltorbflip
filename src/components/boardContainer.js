import React from "react"

import Tile from "./tile"

class BoardContainer extends React.Component {
  constructor(props) {
    super(props)

    this.rsums = Array.from({ length: 5 }, (_, i) => ({ points: 0, bombs: 0 }))
    this.csums = Array.from({ length: 5 }, (_, i) => ({ points: 0, bombs: 0 }))
    props.board.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        let value = tile.value
        if (value) {
          this.rsums[rowIndex].points += value
          this.csums[colIndex].points += value
        } else {
          this.rsums[rowIndex].bombs += 1
          this.csums[colIndex].bombs += 1
        }
      })
    })
  }

  handleClick = (row, col) => {
    this.props.onChange(row, col)
  }

  render() {
    return (
      //I also need to include the column/row info.
      //The board should be be mostly center with the other items placed relative to it
      <div>
        {this.props.board.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((tile, colIndex) => {
                return (
                  <Tile
                    key={colIndex}
                    memo={this.props.memo[rowIndex][colIndex]}
                    onChange={this.handleClick}
                    {...tile} //spread the row, col and value as props
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default BoardContainer
