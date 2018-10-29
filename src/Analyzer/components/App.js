import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import Message from './Message'
import Results from './Results'

import sampleImg from '../img/sample.jpg'
import { FaceFinder } from '../ml/face'
import { EmotionNet } from '../ml/models'
import { readFile, nextFrame, drawBox, drawText } from '../util'

class App extends Component {
  state = {
    ready: false,
    loading: false,
    detections: [],
    faces: [],
    emotions: [],
  }

  componentDidMount() {
    this.initModels()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  initModels = async () => {
    const faceModel = new FaceFinder()
    await faceModel.load()

    const emotionModel = new EmotionNet()
    await emotionModel.load()

    this.models = { face: faceModel, emotion: emotionModel }
    this.setState({ ready: true }, this.initPredict)
  }

  initPredict = () => {
    if (!this.img || !this.img.complete) return
    this.setState({ loading: true })
    this.analyzeFaces()
  }

  handleImgLoaded = () => {
    if (this.props.done) return 
    this.clearCanvas()
    this.analyzeFaces()
  }

  handleResize = debounce(() => this.drawDetections(), 100)

  analyzeFaces = async () => {
    await nextFrame()
    this.setState({
      loading: true
    })
    if (!this.models) return
    if (this.props.done) return
    // get face bounding boxes and canvases
    const faceResults = await this.models.face.findAndExtractFaces(this.img)
    const { detections, faces } = faceResults

    if (faces.length === 0) return 
    const audio = document.getElementById("camera_audio")
    audio.play()
    // get emotion predictions
    if (faces.length > 0) {
      this.props.onDone(true, this.img)
    }
    let emotions = await Promise.all(
      faces.map(async face => await this.models.emotion.classify(face))
    )

    this.setState(
      { loading: false, detections, faces, emotions },
      // this.drawDetections
    )
    
  }

  clearCanvas = () => {
    this.canvas.width = 0
    this.canvas.height = 0
  }

  drawDetections = () => {
    const { detections, emotions } = this.state
    if (!detections.length) return

    const { width, height } = this.img
    this.canvas.width = width
    this.canvas.height = height

    const ctx = this.canvas.getContext('2d')
    const detectionsResized = detections.map(d => d.forSize(width, height))

    detectionsResized.forEach((det, i) => {
      const { x, y } = det.box
      const { emoji } = emotions[i][0].label

      drawBox({ ctx, ...det.box })
      drawText({ ctx, x, y, text: emoji })
    })
  }

  render() {
    const { ready, loading, faces, emotions } = this.state
    const { imgUrl } = this.props
    const noFaces = ready && !loading && imgUrl && !faces.length && (this.img && this.img.complete)
    const _award = window.getStorageAward()
    return (
      <div className={this.props.className}>
        {imgUrl && (
          <div className="analyzer-sec relative">
            <img
              ref={el => (this.img = el)}
              onLoad={this.handleImgLoaded}
              src={imgUrl}
              alt=""
            />
            <canvas
              ref={el => (this.canvas = el)}
              className="absolute top-0 left-0"
            />
          </div>
        )}
        {/* {!ready && <Message>take a picture</Message>}
        {loading && <Message>Analyzing image...</Message>}
        {noFaces && (
          <Message bg="red" color="white">
            <strong>Sorry!</strong> No faces were detected. Please try another
            image.
          </Message>
        )} */}
        {
          faces.length > 0 
          ?
          <Results faces={[faces[0]]} emotions={[emotions[0]]} />
          :
          <Results faces={['']} emotions={[['', '', '', '']]} />
        }
        {
          (faces.length > 0 ) && this.props.done && _award
          ?
          <div className="award-sec">
            恭喜你获得{_award}等奖
          </div>
          :
          null
        }
          
      </div>
    )
  }
}

export default App
