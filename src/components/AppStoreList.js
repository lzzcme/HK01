import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { PullToRefresh, ListView } from 'antd-mobile'
import LazyLoad from 'react-lazy-load'
import Star from '../components/Star'

const NUM_ROWS = 10
let pageIndex = 0

function genData (pIndex = 0) {
  const dataArr = []
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`)
  }
  return dataArr
}
class AppStoreList extends Component {
  constructor (props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false
    }
  }

  componentDidUpdate () {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }

  componentDidMount () {
    const hei = this.state.height - findDOMNode(this.lv).offsetTop

    setTimeout(() => {
      this.rData = genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      })
    }, 300)
  }

  // 刷新
  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true })
    setTimeout(() => {
      this.rData = genData()
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      })
    }, 300)
  }

  // 加载更多
  onEndReached = (event) => {
    const { appList } = this.props
    let checkLen = this.rData.length >= appList.length
    let status = this.state.isLoading && !this.state.hasMore
    if (status || checkLen) {
      return
    }
    this.setState({ isLoading: true })
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)]
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      })
    }, 600)
  }

  render () {
    const { appList } = this.props
    let index = appList.length - 1
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = appList.length - 1
      }
      const obj = appList[index--]
      return (
        <div key={rowID} className='list-item'>
          <span className='num'>{+rowID + 1}</span>
          <LazyLoad className='wrap'>
            <img className='img' src={obj['im:image'][1].label} alt=""/>
          </LazyLoad>
          <div className='content'>
            <p className='name'>{obj['im:name'].label}</p>
            <p className='type'>{obj['category'].attributes.label}</p>
            <Star rateValue={4} disabled /> (17)
          </div>
        </div>
      )
    }
    return (
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '到底了~'}
        </div>)}
        renderRow={row}
        useBodyScroll={this.state.useBodyScroll}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    appList: state.appList
  }
}

export default connect(mapStateToProps)(AppStoreList)