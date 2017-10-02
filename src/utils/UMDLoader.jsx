import React from 'react';
import PropTypes from 'prop-types';
import script from 'scriptjs';

class UMDLoader extends React.Component {
    constructor() {
        super();

        this.state = {
            Component: null,
            error: null
        }
    }

    componentDidMount() {
        // expose React for UMD build
        window.React = React;
        // async load of remote UMD component
        script(this.props.url, () => {
            const target = window[this.props.name];
            if (target) {
                // loaded OK
                this.setState({
                    error: null,
                    Component: target
                })
            } else {
                // loaded fail
                this.setState({
                    error: `Cannot load component ${this.props.name} at ${this.props.url}`,
                    Component: null
                })
            }
        });
    }
    render() {
        if (this.state.Component) {
            return <this.state.Component {...this.props.props || {} } />
        } else if (this.state.error) {
            return <div>{ this.state.error }</div>
        } else {
            return this.props.children
        }
    }
}

UMDLoader.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.object
};

export default UMDLoader;