import {handleAction} from 'redux-actions'
import Action from './actions'

export default handleAction(Action, (state, action) => ({...state, ...action.payload}), {})