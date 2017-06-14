import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter'
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
export default function counter(state = { count: 0}, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        count: state.count + 1
      }
    case DECREMENT_COUNTER:
      return {
        count: state.count - 1
      }
    default:
      return state
  }

}
