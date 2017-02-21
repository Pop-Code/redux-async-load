import {createAction} from 'redux-actions'

export const Type = '@@redux-async-load/STATUS'
export default createAction(Type, (key, value) => ({[key]: value}))