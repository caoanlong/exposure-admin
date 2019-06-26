const sysUser = {
    state: {
        authorization: '',
        userInfo: null
    },
    mutations: {
        SET_AUTH: (state: any, authorization: string) => {
            state.authorization = authorization
        },
        REMOVE_AUTH: (state: any) => {
            state.authorization = ''
        },
        SET_USERINFO: (state: any, userInfo: any) => {
            state.userInfo = userInfo
        },
        REMOVE_USERINFO: (state: any) => {
            state.userInfo = null
        }
    }
}

export default sysUser