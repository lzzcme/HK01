import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SearchBar, Toast } from 'antd-mobile'
import LazyLoad from 'react-lazy-load'
import http from './utils/http'

import { addAppList, changeInput } from './store/action'
import AppStoreList from './components/AppStoreList'
import { recomendData, appListData, lookUp } from './api/api'

class AppStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recomendList: [], // 推介列表
      appList: [], // app列表
      lookUpList: [] // 搜索列表
    }
  }

  // 模拟用
  componentDidUpdate () {
    const { results } = this.props
    // 搜索数据弹出
    if (results.length) {
      Toast.info(results[0].trackName)
    }
  }

  componentDidMount () {
    this.getRecomendData()
    this.getAppListData()
    this.getLookUp()
  }

  // 获取推介数据
  getRecomendData () {
    http.get(recomendData).then(res => {
      this.setState({ recomendList: res.feed.entry })
    })
  }

  // 获取app数据
  getAppListData () {
    http.get(appListData).then(res => {
      const { dispatch } = this.props
      dispatch(addAppList(res.feed.entry))
      this.setState({ appList: res.feed.entry })
    })
  }

  // 获取搜索数据
  getLookUp () {
    http.get(lookUp).then(res => {
      this.setState({ lookUpList: res.results })
    })
  }

  onChange (inputValue) {
    const { dispatch } = this.props
    const { lookUpList } = this.state
    console.log(inputValue)
    dispatch(changeInput(lookUpList, inputValue))
  }

  render() {
    const { recomendList, appList } = this.state
    const { inputValue } = this.props
    return (
      <div className='app'>
        {/* search */}
        <div className='search'>
          <SearchBar
            value={inputValue}
            onChange={this.onChange.bind(this)}
            placeholder='搜尋'
          />
        </div>
        {/* recommend */}
        <div className='recommend'>
          <p className='recommend__caption'>推介</p>
          <div className='recommend__carousel'>
            {
              recomendList.length > 0 && recomendList.map((item, index) => (
                <a
                  className='recommend__carousel-item'
                  key={index}
                  href={item.link.attributes.href}
                >
                  <LazyLoad className='wrap'>
                    <img
                      className='img'
                      src={item['im:image'][1].label}
                      alt=''
                    />
                  </LazyLoad>
                  <p className='name'>{item['im:name'].label}</p>
                  <p className='dec'>{item['category'].attributes.label}</p>
                </a>
              ))
            }
          </div>
        </div>
        {/* AppStoreList */}
        { appList.length > 0 && <AppStoreList />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    inputValue: state.inputValue,
    results: state.results
  }
}

export default connect(mapStateToProps)(AppStore)
