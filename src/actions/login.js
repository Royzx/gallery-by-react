export const CHANGE_USER_NAME = 'CHANGE_USER_NAME';
export const GO_TO = 'GO_TO';
export const CHANGE_USER_HELP = 'CHANGE_USER_HELP';

export function changeUserName(e) {
    return {
        type: CHANGE_USER_NAME,
        userName: e.target.value
    }
}

export function login() {
    return (dispatch, getstate) => {
        console.log(JSON.stringify(getstate()))
        const userName = getstate().login.userName;
        if(userName === '' || userName === null) {
            dispatch({
              type: CHANGE_USER_HELP,
              uNameHelp: '用户名不能为空哦'
            })
        } else if (userName == 'Royzx') {
            dispatch({
              type: GO_TO,
              uNameHelp: '登录成功登台跳转'
            })
        }
    }
}