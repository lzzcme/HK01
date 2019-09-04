export const addAppList = list => {
  return {
    type: 'ADD_APP_LIST',
    list
  }
}

export const changeInput = (results, inputValue) => {
  return {
    type: 'CHANGE_INPUT',
    results,
    inputValue
  }
}
