import React, { PureComponent } from 'react'
import Transition from 'react-transition-group/Transition'
import PropTypes from 'prop-types'

const TIMEOUT = 0
const TRASITION_TIME = 400
const START_OPACITY = 0
const END_OPACITY = 1

const OPACITY_DEFAULT = {
  start: 0,
  end: 1,
}

const AXIS = 'y'

class Fade extends PureComponent {
  static propTypes = {
    /** Delay in milliseconds until animation start. */
    timeout: PropTypes.number,

    /** Time of animation in milliseconds. */
    transitionTime: PropTypes.number,

    /**
     * Settings for opacity during animation.
     *
     * Default start: 0
     * Default end: 1500 (If content's height is larger than 1500, pass the content's height here )
    */
    opacity: PropTypes.shape({
      start: PropTypes.number,
      end: PropTypes.number,
    }),

    /** Axis that is animated */
    axis: PropTypes.oneOf(['x', 'y']),

    /** Show the component; triggers the enter or exit states */
    in: PropTypes.bool,

    /**
     * A convenience prop that enables or disabled appear animations for
     * all children. Note that specifying this will override any defaults
     * set on individual children Transitions.
     */
    appear: PropTypes.bool,

    /** Optional style overrides. */
    style: PropTypes.object,
  }

  static defaultProps = {
    timeout: TIMEOUT,
    transitionTime: TRASITION_TIME,
    opacity: OPACITY_DEFAULT,
    axis: AXIS,
    style: {},
    in: true,
    appear: true,
  }

  get opacity() {
    const { start = START_OPACITY, end = END_OPACITY } = this.props.opacity
    return {
      start,
      end
    }
  }

  get transitionStyles() {
    const { start: opacityStart, end: opacityEnd } = this.opacity

    return {
      entering: {
        opacity: opacityStart
      },
      entered: {
        opacity: opacityEnd
      },
    }
  }

  get initialStyles() {
    const { transitionTime } = this.props
    const { start: opacityStart } = this.opacity
    return {
      opacity: opacityStart,
      transition: `all ${transitionTime}ms ease-in-out`,
    }
  }

  renderChild = (state) => {
    const { style, children } = this.props
    const styles = {
      ...style,
      ...this.initialStyles,
      ...this.transitionStyles[state]
    }
    return (
      <div style={styles} >
        {children}
      </div>
    )
  }

  render() {
    const { in: inProp, timeout, appear } = this.props
    return (
      <Transition
        in={inProp}
        appear={appear}
        timeout={timeout}
      >
        {this.renderChild}
      </Transition>
    )
  }
}

export default Fade