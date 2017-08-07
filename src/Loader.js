import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Loader extends Component {

    static propTypes = {
        loadId: PropTypes.string.isRequired,
        shouldLoad: PropTypes.func.isRequired,
        load: PropTypes.func.isRequired,
        shouldReload: PropTypes.func.isRequired,
        render: PropTypes.func,

        //redux component specific props
        asyncIsLoading: PropTypes.bool.isRequired,
        asyncSetStatus: PropTypes.func.isRequired,
    }

    componentWillMount() {
        const {loadId, shouldLoad, load, asyncIsLoading, asyncSetStatus} = this.props
        if (!asyncIsLoading && shouldLoad(this.props)) {
            asyncSetStatus(loadId, {loading: true})
            const p = load(this.props)
            if (typeof p === 'object' && typeof p.then === 'function') {
                p.then(() => asyncSetStatus(loadId, {loading: false}))
            }
        }
    }

    componentWillReceiveProps(props) {
        const {shouldReload, load, asyncIsLoading} = props
        return !asyncIsLoading && shouldReload(props, this.props) && load(props)
    }

    render() {
        const {children, render} = this.props
        let props = {...this.props};
        ['children', 'render', 'load', 'shouldLoad', 'loadId'].forEach(k => delete props[k])
        if (render) {
            return render(props)
        }
        return React.cloneElement((Array.isArray(children)) ? children[0] : React.Children.only(children), props)
    }
}