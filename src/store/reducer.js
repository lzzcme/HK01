const defaultState = {
  inputValue : '',
  results: [],
  appList: []
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_APP_LIST':
      return Object.assign({}, state, {
        appList: action.list
      })
    case 'CHANGE_INPUT':
      const inputValue = action.inputValue
      let results = action.results.filter(item => {
        return inputValue && item.trackName.indexOf(inputValue) >= 0
      })
      console.log(Object.assign({}, state, {
        results,
        inputValue
      }))
      return Object.assign({}, state, {
        results,
        inputValue
      })
    default:
      return state
  }
}
