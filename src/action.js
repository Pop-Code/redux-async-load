import {createAction} from 'redux-actions'

export const Type = '@@redux-async-load/STATUS'
const asyncSetStatus = createAction(Type, (key, value) => ({[key]: value}))

export default asyncSetStatus