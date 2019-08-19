import { Link } from "gatsby"
import React from "react"
import styles from "../styles/components/header.module.scss"

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/">Voltorb Flip</Link>
      </header>
    )
  }
}

export default Header
