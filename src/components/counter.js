import React from "react"
import { CountUp } from "countup.js"

class Counter extends React.Component {
  componentDidMount() {
    this.options = {
      startVal: this.props.value,
      duration: 0.5,
    }
    this.countUp = new CountUp(this.props.id, this.props.value, this.options)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value && this.props.value !== 0) {
      this.options.startVal = prevProps.value
      this.countUp.update(this.props.value)
      this.countUp.start()
    }
  }

  render() {
    return <span id={this.props.id}>{this.props.value}</span>
  }
}

export default Counter
