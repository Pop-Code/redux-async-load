import {connect} from 'react-redux'
import Loader from './Loader'
import asyncSetStatus from './action'

export default connect((state, {stateKey = 'asyncLoad', loadId}) => {
    const asyncIsLoading = (state[stateKey][loadId] && state[stateKey][loadId].loading === true) || false
    return {asyncIsLoading}
}, {asyncSetStatus})(Loader)