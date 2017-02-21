import React, {Component} from 'react'

export default class Loader extends Component {

    static propTypes = {
        loadId: React.PropTypes.string.isRequired,
        shouldLoad: React.PropTypes.func.isRequired,
        load: React.PropTypes.func.isRequired,
        shouldReload: React.PropTypes.func.isRequired,
        render: React.PropTypes.func,
        loading: React.PropTypes.bool.isRequired,
        asyncComponentStatus: React.PropTypes.func
    }

    componentWillMount() {
        const {loadId, shouldLoad, load, loading, asyncComponentStatus} = this.props
        if (!shouldLoad(this.props) && !loading) {
            asyncComponentStatus(loadId, {loading: true})
            load(this.props).then(() => this.props.asyncComponentStatus(loadId, {loading: false}))
        }
    }

    componentWillReceiveProps(props) {
        const {shouldReload, load} = props
        if (shouldReload(props, this.props)) {
            load(props)
        }
    }

    render() {
        const {children, render} = this.props;
        let props = {...this.props}
        delete props.children
        delete props.render
        if (render) {
            return render(props)
        }
        return React.cloneElement((Array.isArray(children)) ? children[0] : React.Children.only(children), props)
    }
}


