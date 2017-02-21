import ReduxLoader from './Container'
import Loader from './Loader'
import Actions from './actions'
import Reducer from './reducer'

const isReady = ({asyncComponent}) => {
    const comps = Object.keys(asyncComponent).filter(k => asyncComponent[k].loading)
    if (!comps.length) {
        return true
    }
}

export {
    Loader,
    Actions,
    Reducer,
    ReduxLoader,
    isReady
}