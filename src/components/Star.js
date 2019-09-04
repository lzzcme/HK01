import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Star extends Component {

  constructor(props) {
    super(...arguments)
    this.state={
      rateValue: props.rateValue,
      rateArray: new Array(Number(props.rateNum)).fill('')
    }
  }

  static propTypes = {
    canClick: PropTypes.bool,
    rateNum: PropTypes.number,
    onSelectRate: PropTypes.func,
    rateValue: PropTypes.number,
  }

  static defaultProps = {
    disabled: false, // 可否点击
    rateNum: 5, // 星星个数
    onSelectRate: null, // 选中星星后的回调
    rateValue: 0, // 选中星星的个数
  }
  
  shouldComponentUpdate (nextProps) {
    return nextProps.rateValue !== this.props.rateValue
  }

  handleSelectRate (value) {
    if (this.props.disabled) {
      return
    }
    this.setState({
      rateValue: value
    })
    this.props.onSelectRate && this.props.onSelectRate(value)
  }

  render(){
    const {rateArray, rateValue} = this.state
    const {rateNum} = this.props
    return (
      <div className='rate' style={{letterSpacing: '10px'}}>
        <div className='rate__bg'>
          {
            rateArray.map((item, index) => (
              <div className='item' key={index} onClick={this.handleSelectRate.bind(this, index + 1)}>
                <img className='icon' src={require('../images/icon/star.png')} alt=""/>
              </div>
              // <AtIcon
              //   key={index}
              //   value='star'
              //   size={size}
              //   color='#bdbdbd'
              //   onClick={this.handleSelectRate.bind(this, index + 1)}
              // />
            ))
          }
          <div
            className='bg__realrate'
            style={{width: `calc(${rateValue ? rateValue : this.props.rateValue} / ${rateNum} * 100%)`}}
          >
            {
              rateArray.map((item, index) => (
                <div className='item' key={index} onClick={this.handleSelectRate.bind(this, index + 1)}>
                  <img className='icon' src={require('../images/icon/star_fill.png')} alt=""/>
                </div>
                // <AtIcon
                //   key={index}
                //   value='star-2'
                //   size={size}
                //   color='#89612d'
                //   onClick={this.handleSelectRate.bind(this, index + 1)}
                // />
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}