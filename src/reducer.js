import {handleAction} from 'redux-actions'
import Action from './action'

export default handleAction(Action, (state, action) => ({...state, ...action.payload}), {})