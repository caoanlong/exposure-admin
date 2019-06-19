const app = {
    state: {
        sidebar: {
            opened: true
        },
        visitedViews: [],
        cachedViews: []
    },
    mutations: {
        TOGGLE_SIDEBAR: (state: any) => {
            state.sidebar.opened = !state.sidebar.opened
        },
        ADD_VISITED_VIEWS: (state: any, view: any) => {
            if (state.visitedViews.some((v: any) => v.path === view.path)) return
            state.visitedViews.push({
                name: view.name,
                path: view.path,
                query: view.query,
                title: view.meta.title || 'no-name'
            })
            if (!view.meta.noCache) {
                state.cachedViews.push(view.name)
            }
        },
        DEL_VISITED_VIEWS: (state: any, view: any) => {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.path === view.path) {
                    state.visitedViews.splice(i, 1)
                    break
                }
            }
            for (const i of state.cachedViews) {
                if (i === view.name) {
                    const index = state.cachedViews.indexOf(i)
                    state.cachedViews.splice(index, 1)
                    break
                }
            }
        },
        DEL_OTHERS_VIEWS: (state: any, view: any) => {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.path === view.path) {
                    state.visitedViews = state.visitedViews.slice(i, i + 1)
                    break
                }
            }
            for (const i of state.cachedViews) {
                if (i === view.name) {
                    const index = state.cachedViews.indexOf(i)
                    state.cachedViews = state.cachedViews.slice(index, i + 1)
                    break
                }
            }
        },
        DEL_ALL_VIEWS: (state: any) => {
            state.visitedViews = []
            state.cachedViews = []
        }
    }
}

export default app