// import {GO_TO, CHANGE_USER_NAME, CHANGE_USER_HELP} from '../actions/login'



// const init  = {
//     uNameHelp: '',
//     userName:''
// }

// //reducer其实也是个方法而已,参数是state和action,返回值是新的state
// export default function counter(state = init , action) {
//   switch (action.type) {
//     case GO_TO:
//       console.log('action:' + JSON.stringify(action));
//       return {
//           uNameHelp: action.uNameHelp,
//           userName: ''
//       }
//     case CHANGE_USER_NAME:
//         console.log('action:' + JSON.stringify(action));
//         return {
//           uNameHelp: state.uNameHelp,
//           userName: action.userName
//         }
//     case CHANGE_USER_HELP:
//         console.log('action:' + JSON.stringify(action));
//         return {
//           uNameHelp: action.uNameHelp,
//           userName: action.uNameHelp
//         }
//     default:
//       return state
//   }

// }