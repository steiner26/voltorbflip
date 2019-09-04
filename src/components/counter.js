import React from "react"
import CountUp from "react-countup"

class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      prevVal: this.props.value,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && this.props.value !== 0) {
      this.setState(() => ({
        startVal: prevProps.value,
      }))
    }
  }

  calculatePrefix(val) {
    return "0".repeat(5 - val.toString().length)
  }

  render() {
    return (
      <CountUp
        start={this.state.startVal}
        end={this.props.value}
        duration={0.5}
        prefix={this.calculatePrefix(this.props.value)}
      />
    )
  }
}

export default Counter
