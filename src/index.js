import ReduxLoader from './Container'
import Loader from './Loader'
import actions from './actions'
import reducer from './reducer'

const isReady = ({asyncComponent}) => {
    const comps = Object.keys(asyncComponent).filter(k => asyncComponent[k].loading)
    if (!comps.length) {
        return true
    }
}

export {
    Loader,
    ReduxLoader,
    actions,
    reducer,
    isReady
}