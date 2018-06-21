import React, { Component } from 'react';
import Logout from "../login/Logout";

const styleParent = {
    display: 'flex'
};

const styleTitle = {
    flexGrow: 2,
    textAlign: 'left',
    paddingLeft: 10
};

const styleButton = {
    paddingRight: 10
};

class TitleBar extends Component {

    render() {

        const logout = this.props.handleLogout &&
            <span style={styleButton}><Logout handleLogout={this.props.handleLogout}/></span>;

        return (
            <div style={styleParent}>
                <span style={styleTitle}>Pacientes App V1.0</span>
                {logout}
            </div>
        );
    }
}

export default TitleBar;