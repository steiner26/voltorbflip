import React from "react"
import styles from "../styles/components/memo.module.scss"

import MemoX from "../images/icons/memo-x.svg"
import MemoVoltorb from "../images/icons/large-voltorb.svg"
import Memo1 from "../images/icons/large-1.svg"
import Memo2 from "../images/icons/large-2.svg"
import Memo3 from "../images/icons/large-3.svg"

import classNames from "classnames/bind"

const cx = classNames.bind(styles)

var MemoNew = ({ toggleMemo, updateMemo, cursor, memo, cursorMemo }) => {
  return (
    <div className={styles.container}>
      <div className={cx("memoToggle", { cursor, memo })} onClick={toggleMemo}>
        <div className={styles.toggleContent}>
          <div className={styles.toggleX}>
            <MemoX />
          </div>
          <div className={styles.toggleText}>
            <div>{memo ? "Close" : "Open"}</div>
            <div>Memo</div>
          </div>
        </div>
      </div>
      <div className={cx("memoSettings", { active: memo })}>
        <div className={styles.settingsContent}>
          <div
            className={cx("settingsButton", { active: cursorMemo[0], cursor })}
            onClick={() => updateMemo(0)}
          >
            <MemoVoltorb className={styles.memoVoltorb} />
          </div>
          <div
            className={cx("settingsButton", { active: cursorMemo[1], cursor })}
            onClick={() => updateMemo(1)}
          >
            <Memo1 />
          </div>
          <div
            className={cx("settingsButton", { active: cursorMemo[2], cursor })}
            onClick={() => updateMemo(2)}
          >
            <Memo2 />
          </div>
          <div
            className={cx("settingsButton", { active: cursorMemo[3], cursor })}
            onClick={() => updateMemo(3)}
          >
            <Memo3 />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoNew
