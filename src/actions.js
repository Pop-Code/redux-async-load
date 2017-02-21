import {createAction} from 'redux-actions'

export const Type = '@@redux-async-load/ASYNC_COMPONENT_STATUS'
export default createAction(Type, (key, value) => ({[key]: value}))