import {handleAction} from 'redux-actions'
import Action from './actions'

export default handleAction(Action, (state, action) => {
    console.log(state, action)
    return {...state, ...action.payload}
}, {})