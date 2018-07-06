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
    textFieldNumber: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 100,
    },
});

class Patient extends Component {

    handleChange = (name, required, value) => {
        this.props.handleChange(name, required, value);
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} autoComplete="off">
                <TextField
                    id="name"
                    label="Nombre"
                    className={classes.textFieldLarge}
                    value={this.props.data.name}
                    required
                    error={this.props.errors.name != null}
                    helperText={this.props.errors.name}
                    onChange={e => this.handleChange('name', true, e.target.value)}
                    onBlur={e => this.handleChange('name', true, e.target.value)}
                    margin="dense"
                />
                <TextField
                    id="dni"
                    label="DNI/NIF"
                    className={classes.textFieldSmall}
                    value={this.props.data.dni}
                    required
                    error={this.props.errors.dni != null}
                    helperText={this.props.errors.dni}
                    onChange={e => this.handleChange('dni', true, e.target.value)}
                    onBlur={e => this.handleChange('dni', true, e.target.value)}
                    margin="dense"
                />
                <br/>
                <TextField
                    id="email"
                    label="Email"
                    className={classes.textFieldSmall}
                    value={this.props.data.email}
                    onChange={e => this.handleChange('email', false, e.target.value)}
                    margin="dense"
                />
                <TextField
                    id="phone"
                    label="Teléfono"
                    className={classes.textFieldSmall}
                    value={this.props.data.phone}
                    required
                    error={this.props.errors.phone != null}
                    helperText={this.props.errors.phone}
                    onChange={e => this.handleChange('phone', true, e.target.value)}
                    onBlur={e => this.handleChange('phone', true, e.target.value)}
                    margin="dense"
                />
                <br/>
                <TextField
                    id="address"
                    label="Dirección"
                    className={classes.textFieldLarge}
                    value={this.props.data.address}
                    onChange={e => this.handleChange('address', false, e.target.value)}
                    margin="dense"
                />
                <br/>
                <TextField
                    id="zip"
                    label="Código postal"
                    className={classes.textFieldNumber}
                    numeric="true"
                    value={this.props.data.zip}
                    onChange={e => this.handleChange('zip', false, e.target.value)}
                    margin="dense"
                />
                <TextField
                    id="locality"
                    label="Localidad"
                    className={classes.textFieldSmall}
                    value={this.props.data.locality}
                    onChange={e => this.handleChange('locality', false, e.target.value)}
                    margin="dense"
                />
                <TextField
                    id="province"
                    label="Provincia"
                    className={classes.textFieldSmall}
                    value={this.props.data.province}
                    onChange={e => this.handleChange('province', false, e.target.value)}
                    margin="dense"
                />
            </form>
        );
    }
}

Patient.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Patient);