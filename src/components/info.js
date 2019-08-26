import React from "react"
import styles from "../styles/components/info.module.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

export default ({ points, bombs, index }) => {
  return (
    <div className={cx("info", `info${index}`)}>
      <div className={styles.content}>
        <div className={styles.points}>
          {points < 10 ? "0" + points : points}
        </div>
        <div className={styles.bombs}>{bombs}</div>
      </div>
    </div>
  )
}
