import { combineReducers } from 'redux'
import counter from './counter'
// import login from './login'
//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  counter
  // ,login
})
export default rootReducer