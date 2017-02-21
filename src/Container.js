import {connect} from 'react-redux'
import Loader from './Loader'
import asyncComponentStatus from './actions'

export default connect((state, {loadId}) => {
    const loading = (state.asyncComponent[loadId] && state.asyncComponent[loadId].loading === true) || false
    return {loading}
}, {asyncComponentStatus})(Loader)