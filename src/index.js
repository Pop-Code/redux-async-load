import ReduxLoader from './Container'
import Loader from './Loader'
import action from './action'
import reducer from './reducer'

export const isReady = (state) => {
    if (!state) {
        throw new Error('isReady first args must be an existing state')
    }
    const comps = Object.keys(state).filter(k => state[k].loading)
    if (!comps.length) {
        return true
    }
}

export const stateSelector = (key, state) => {
    return state[key]
}

export const renderAsync = (store, render, stateKey = 'asyncLoad') => {
    let asyncComponentsState
    return new Promise((ok) => {
        const subscriber = store.subscribe(() => {
            let previousState = asyncComponentsState
            asyncComponentsState = stateSelector(stateKey, store.getState())
            if (!!previousState && (previousState !== asyncComponentsState) && isReady(asyncComponentsState)) {
                const html = render()
                if (html) {
                    subscriber()
                    return ok(html)
                }
            }
        })
        const html = render()
        if (isReady(stateSelector(stateKey, store.getState()))) {
            subscriber()
            return ok(html)
        }
    })
}


export {
    Loader,
    ReduxLoader,
    action,
    reducer
}