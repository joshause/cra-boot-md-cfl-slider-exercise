import React from 'react'
import '../style/Slider.css'
import { Carousel } from 'react-bootstrap'
import { SliderContent } from '../lib/contentful'

class Slider extends React.Component {
  constructor(props) {
    super(props)

    this._onTouchStart = this._onTouchStart.bind(this)
    this._onTouchMove = this._onTouchMove.bind(this)
    this._onTouchEnd = this._onTouchEnd.bind(this)

    this.state = {
      index: 0,
      direction: null,
      slides: []
    }

    this._swipe = {}
    this.minDistance = 50
    this.countSlides = 3
  }

  componentDidMount() {
    SliderContent()
      .then(response => {
        const slides = response.items.map(item => item.fields)
        this.setState({ slides })
      })
      .catch(error => {
        console.error(error)
      })
  }

  _onTouchStart(e) {
    const touch = e.touches[0]
    this._swipe = { x: touch.clientX }
  }

  _onTouchMove(e) {
    e.preventDefault()
    if (e.changedTouches && e.changedTouches.length) {
      this._swipe.swiping = true
    }
  }

  _onTouchEnd(e) {
    const touch = e.changedTouches[0]
    const absX = Math.abs(touch.clientX - this._swipe.x)
    if (this._swipe.swiping && absX > this.minDistance ) {
      if (touch.clientX > this._swipe.x) {
        this.setState({
          index: this.state.index === 0 ? this.countSlides - 1 : this.state.index - 1,
          direction: 'prev'
        })
      } else {
        this.setState({
          index: this.state.index === this.countSlides - 1 ? 0 : this.state.index + 1,
          direction: 'next'
        })
      }
    }
    this._swipe = {}
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    })
  }

  render() {

    if (this.state.slides) {

      const rows = []
      const _this = this

      this.state.slides.forEach(function(data) {
        rows.push(
          <Carousel.Item key={data.order} onTouchStart={_this._onTouchStart} onTouchMove={_this._onTouchMove} onTouchEnd={_this._onTouchEnd}>
            <div className="top">
              <Carousel.Caption>
                <div className="count">{ data.order }</div>
                <h2 className="caption-title">{ data.title }</h2>
                <h3 className="caption-subtitle">{ data.subtitle }</h3>
              </Carousel.Caption>
            </div>
            <div className="bottom">
              <i className="material-icons md-light">{ data.icon }</i>
            </div>
          </Carousel.Item>
        )
      })

      return (
        <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
          {rows}
        </Carousel>
      )
    } else {
      return (
        <div>There was a problem.</div>
      )

    }

  }
}

export default Slider
