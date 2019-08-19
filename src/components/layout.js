import React from "react"

import Header from "./header"
import Footer from "./footer"
import "./layout.scss"

class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div
          style={{
            margin: `0 auto`,
            paddingTop: 0,
            zIndex: -1,
          }}
        >
          <main>{this.props.children}</main>
        </div>
        <Footer />
      </>
    )
  }
}

export default Layout
