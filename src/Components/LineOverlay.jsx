// Adapted from Scatterplot example in react-map-gl library

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { CanvasOverlay } from 'react-map-gl';

const propTypes = {
  locations: PropTypes.instanceOf(Array).isRequired,
  lngLatAccessor: PropTypes.func,
  renderWhileDragging: PropTypes.bool,
  globalOpacity: PropTypes.number,
  dotRadius: PropTypes.number,
  dotFill: PropTypes.string,
  compositeOperation: PropTypes.string
};

const defaultProps = {
  lngLatAccessor: ({ longitude, latitude }) => [longitude, latitude],
  renderWhileDragging: true,
  dotRadius: 4,
  dotFill: '#1FBAD6',
  globalOpacity: 1,
  // Same as browser default.
  compositeOperation: 'source-over'
};

export default class LineOverlay extends PureComponent {
  /* eslint-disable max-statements */
  _redraw = ({ width, height, ctx, isDragging, project, unproject }) => {
    const {
      dotRadius,
      dotFill,
      compositeOperation,
      renderWhileDragging,
      locations,
      lngLatAccessor
    } = this.props;

    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = compositeOperation;

    if ((renderWhileDragging || !isDragging) && locations.length > 2) {
      for (const location of locations) {
        const pixel = project(lngLatAccessor(location));

        ctx.lineWidth = 6;
        ctx.strokeStyle = 'orange';
        ctx.lineTo(pixel[0], pixel[1]);
        ctx.stroke();

        // const pixelRounded = [round(pixel[0], 1), round(pixel[1], 1)];
        // if (
        //   pixelRounded[0] + dotRadius >= 0 &&
        //   pixelRounded[0] - dotRadius < width &&
        //   pixelRounded[1] + dotRadius >= 0 &&
        //   pixelRounded[1] - dotRadius < height
        // ) {
        //   ctx.fillStyle = dotFill;
        //   ctx.beginPath();
        //   ctx.arc(pixelRounded[0], pixelRounded[1], dotRadius, 0, Math.PI * 2);
        //   ctx.fill();
        // }
      }
    }
  };
  /* eslint-enable max-statements */

  render() {
    return <CanvasOverlay redraw={this._redraw} />;
  }
}

LineOverlay.displayName = 'LineOverlay';
LineOverlay.propTypes = propTypes;
LineOverlay.defaultProps = defaultProps;
