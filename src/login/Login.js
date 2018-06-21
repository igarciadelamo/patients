import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const style = {
    margin: 20
};

class Login extends Component {

    render() {
        return <Button variant="outlined" color="primary" size="large" onClick={this.props.handleAuth} style={style}>
            Login con Google
        </Button>;
    }
}

export default Login;