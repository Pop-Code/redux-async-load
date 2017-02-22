import ReduxLoader from './Container'
import Loader from './Loader'
import action from './action'
import reducer from './reducer'

export const isReady = (state) => {
    if (!state) {
        throw new Error('isReady first args must be an existing state')
    }
    if (!Object.keys(state).filter(k => state[k].loading).length) {
        return true
    }
    return false
}

export const stateSelector = (key, state) => state[key]

export const renderAsync = (store, render, stateKey = 'asyncLoad') => {
    let asyncComponentsState
    let html
    return new Promise((ok) => {
        const subscriber = store.subscribe(() => {
            let previousState = asyncComponentsState
            asyncComponentsState = stateSelector(stateKey, store.getState())
            if (!!previousState && (previousState !== asyncComponentsState) && isReady(asyncComponentsState)) {
                html = render()
                subscriber()
                return ok(html)
            }
        })
        html = render()
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