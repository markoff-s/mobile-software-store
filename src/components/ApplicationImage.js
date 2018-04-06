import React, { Component } from 'react'
import Cfg from './UiUrlCfg'

export default class ApplicationImage extends Component {
  render () {
    const cfg = new Cfg()

    const imgSrc = 'data:image/png;base64, ' + this.props.image
    const appDetailsUrl = cfg.appDetails(this.props.appId)
    return (
      <a href={appDetailsUrl}>
        <img src={imgSrc} className="small" />
      </a>
    )
  }
}
