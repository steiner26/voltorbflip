import React from "react"
import styles from "../styles/components/about.module.scss"

export default function About() {
  return (
    <div className={styles.container}>
      <h2>Controls</h2>
      <ul className={styles.rules}>
        <li>X: Open/Close Memo</li>
        <li>Space or Enter: Flip Tile</li>
        <li>0 or ~: Toggle 0 Memo</li>
        <li>1: Toggle 1 Memo</li>
        <li>2: Toggle 2 Memo</li>
        <li>3: Toggle 3 Memo</li>
      </ul>
      <hr />
      <h2>About</h2>
      <p>
        This is a recreatation of the Voltorb Flip game that appears in the
        Korean and Western releases of Pokémon HeartGold and SoulSilver. The
        game is a mix between Minesweeper and Picture Cross and the placement of
        the bombs are given for each row and column. The goal of the game is to
        uncover all of the 2 and 3 tiles on a given board and move up to higher
        levels which have higher coin totals.
      </p>
      <p>
        The numbers on the side and bottom of the game board denote the sum of
        the tiles and how many bombs are present in that row/column,
        respectively. Each tile you flip multiplies your collected coins by that
        value. Once you uncover all of the 2 and 3 tiles, all of the coins you
        gained this level will be added to your total and you'll go up one level
        to a max of 7. If you flip over a Voltorb, you lose all your coins from
        the current level and risk going down to a lower level.
      </p>
      <p>
        You can read more about this project on{" "}
        <a href="https://www.brandon-stein.com/projects/voltorbflip">
          my personal webpage
        </a>{" "}
        and the source code is available on{" "}
        <a href="https://github.com/steiner26/voltorbflip">my GitHub</a>. If you
        find any issues or have any suggestions, feel free to submit an issue or
        pull request on GitHub. I do not claim to own any of the assets used on
        this website, including the Voltorb sprite and tile background, or the
        Voltorb Flip game itself. Enjoy!
      </p>
    </div>
  )
}
