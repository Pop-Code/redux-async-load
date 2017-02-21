import {connect} from 'react-redux'
import Loader from './Loader'
import asyncSetStatus from './action'

export default connect((state, {loadId}) => {
    const asyncIsLoading = (state.asyncLoad[loadId] && state.asyncLoad[loadId].loading === true) || false
    return {asyncIsLoading}
}, {asyncSetStatus})(Loader)