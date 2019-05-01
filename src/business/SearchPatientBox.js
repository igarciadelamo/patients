import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        backgroundColor: 'lightgrey',
    },
    textFieldLarge: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    textFieldSmall: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        padding: 0,
        margin: 0,
    },
});

class SearchPatientBox extends Component {

    state = {
        name: '',
        phone: ''
    };

    search = () => {
        this.props.search(this.state);
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="name"
                    label="Nombre"
                    className={classes.textFieldLarge}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="dense"
                />
                <TextField
                    id="phone"
                    label="Teléfono"
                    className={classes.textFieldSmall}
                    value={this.state.phone}
                    onChange={this.handleChange('phone')}
                    margin="dense"
                />
                <Button variant="outlined" color="primary" size="small" onClick={this.search}>
                    Buscar
                </Button>
            </form>
        );
    }
}

SearchPatientBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchPatientBox);