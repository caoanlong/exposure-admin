const app = {
    state: {
        sidebar: {
            opened: true
        }
    },
    mutations: {
        TOGGLE_SIDEBAR: (state: any) => {
            state.sidebar.opened = !state.sidebar.opened
        }
    }
}

export default app