import React from "react"

/** Tile state model:
 * -----------------------------------------------------------------------------
 * row: which row this tile is in [number]
 * col: which column this tile is in [number]
 * flipped: whether this tile has been flipped [boolean]
 * value: the value of this tile [number 0..3]
 * memo: the memo for this tile [object] eg. {0:false, 1:false, 2:false, 3:false}
 */
class Tile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flipped: props.flipped,
    }

    this.handleClick = this.handleClick.bind(this)
  }

  static defaultProps = {
    flipped: false,
  }

  handleClick() {
    var flipped = this.state.flipped
    this.setState(
      () => ({ flipped: true }),
      () => this.props.onChange(this.props.row, this.props.col, flipped)
    )
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <div>
          {/* Tile back w/ memo */}
          <div>
            {/* memo top row */}
            <span>&#9679;</span>
            <span>1</span>
          </div>
          <div>
            {/* memo bottom row */}
            <span>2</span>
            <span>3</span>
          </div>
        </div>
        <div>
          {/* Tile front with number/voltorb */}
          {this.props.value} {this.props.flipped ? "true" : "false"}
        </div>
      </div>
    )
  }
}

export default Tile
