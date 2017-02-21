import React, {Component} from 'react'

export default class Loader extends Component {

    static propTypes = {

        loadId: React.PropTypes.string.isRequired,
        shouldLoad: React.PropTypes.func.isRequired,
        load: React.PropTypes.func.isRequired,
        shouldReload: React.PropTypes.func.isRequired,
        render: React.PropTypes.func,

        //redux component specific props
        asyncIsLoading: React.PropTypes.bool.isRequired,
        asyncSetStatus: React.PropTypes.func.isRequired
    }

    componentWillMount() {
        const {loadId, shouldLoad, load, asyncIsLoading, asyncSetStatus} = this.props
        if (!shouldLoad(this.props) && !asyncIsLoading) {
            asyncSetStatus(loadId, {loading: true})
            load(this.props).then(() => asyncSetStatus(loadId, {loading: false}))
        }
    }

    componentWillReceiveProps(props) {
        const {shouldReload, load, asyncIsLoading} = props
        return shouldReload(props, this.props) && !asyncIsLoading && load(props)
    }

    render() {
        const {children, render} = this.props
        let props = {...this.props};
        ['children', 'render'].forEach(k => delete props[k])
        if (render) {
            return render(props)
        }
        return React.cloneElement((Array.isArray(children)) ? children[0] : React.Children.only(children), props)
    }
}