import React from "react"
import styles from "../styles/components/tile.module.scss"
import classNames from "classnames/bind"

import TileBack from "../images/blanktile.svg"
import Memo0 from "../images/icons/memo-0.svg"
import Memo1 from "../images/icons/memo-1.svg"
import Memo2 from "../images/icons/memo-2.svg"
import Memo3 from "../images/icons/memo-3.svg"

const cx = classNames.bind(styles)

/** Tile expected props:
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
  }

  static defaultProps = {
    flipped: false,
  }

  render() {
    const {
      row,
      col,
      value,
      flipped,
      onChange,
      memo,
      cursor,
      inMemo,
    } = this.props
    return (
      <div className={styles.tile} onClick={() => onChange(row, col)}>
        <div
          className={cx("front", {
            flipped,
            cursor,
            inMemo,
            bomb: value === 0,
          })}
        >
          {value || ""}
        </div>
        <div className={cx("back", { flipped, cursor, inMemo })}>
          <Memo0 className={cx("memo0", { active: memo[0] })} />
          <Memo1 className={cx("memo1", { active: memo[1] })} />
          <Memo2 className={cx("memo2", { active: memo[2] })} />
          <Memo3 className={cx("memo3", { active: memo[3] })} />
          {/* <TileBack className={styles.tileBack} /> */}
        </div>
      </div>
    )
  }
}

export default Tile
