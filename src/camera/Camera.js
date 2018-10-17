import React, { Component } from 'react';

class Camera extends Component {

    getMedia() {
      let constraints = {
          video: {width: 500, height: 500},
          audio: true
      };
      let video = document.getElementById("video");
      let promise = navigator.mediaDevices.getUserMedia(constraints);
      promise.then(function (MediaStream) {
          video.srcObject = MediaStream;
          video.play();
      });
    }
  
    takePhoto() {
      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 500, 500);
    }

    render() {
        return<div>test</div>
    }
}

export default Camera;