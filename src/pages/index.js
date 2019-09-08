import React from "react"
import styles from "../styles/pages/index.module.scss"

// import Layout from "../components/layout"
import SEO from "../components/seo"
import GameContainer from "../components/gameContainer"
import About from "../components/about"

const IndexPage = () => (
  <div className={styles.container}>
    <SEO title="Home" />
    <GameContainer />
    <About />
  </div>
)

export default IndexPage
