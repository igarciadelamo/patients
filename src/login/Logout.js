import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const style = {
    margin: 0
};

class Logout extends Component {

    render() {
        return (
            <Button variant="outlined" color="secondary" size="small" onClick={this.props.handleLogout} style={style}>
                Cerrar sesión
            </Button>
        );
    }
}

export default Logout;