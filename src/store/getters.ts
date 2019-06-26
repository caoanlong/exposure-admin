const getters = {
    authorization: (state: any) => state.sysUser.authorization,
    userInfo: (state: any) => state.sysUser.userInfo,
    sidebar: (state: any) => state.app.sidebar,
    visitedViews: (state: any) => state.app.visitedViews
}
export default getters