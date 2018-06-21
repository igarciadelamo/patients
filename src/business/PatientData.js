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
    button: {
        padding: 0,
        margin: 0,
    },
});

class PatientData extends Component {

    state = {
        data : {
            name: '',
            dni: '',
            email: '',
            phone: '',
            address: '',
            zip: '',
            locality: '',
            province: ''
        },
        errors: {
            name: 'Campo obligatorio',
            dni: 'Campo obligatorio',
            phone: 'Campo obligatorio'
        },
        invalidData: true
    };

    doAction = () => {
        this.props.doAction(this.state.data);
    };

    handleChange = (name, required) => event => {
        this.setState({
            data : {
                ...this.state.data,
                [name]: event.target.value
            },
            errors : {
                ...this.state.errors,
                [name]: required && event.target.value === '' ? 'Campo obligatorio' : null
            }
        });
        this.validateForm();
    };

    validateForm = () => {
        const invalidData = Object.keys(this.state.errors)
            .map(key => this.state.errors[key] != null)
            .reduce((previous, current) => previous || current, false);
        this.setState({invalidData : invalidData});
   };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} autoComplete="off">
                <TextField
                    id="name"
                    label="Nombre"
                    className={classes.textFieldLarge}
                    value={this.state.data.name}
                    required
                    error={this.state.errors.name != null}
                    helperText={this.state.errors.name}
                    onChange={this.handleChange('name', true)}
                    onBlur={this.handleChange('name', true)}
                    margin="dense"
                />
                <TextField
                    id="dni"
                    label="DNI/NIF"
                    className={classes.textFieldSmall}
                    value={this.state.data.dni}
                    required
                    error={this.state.errors.dni != null}
                    helperText={this.state.errors.dni}
                    onChange={this.handleChange('dni', true)}
                    onBlur={this.handleChange('dni', true)}
                    margin="dense"
                />
                <br/>
                <TextField
                    id="email"
                    label="Email"
                    className={classes.textFieldSmall}
                    value={this.state.data.email}
                    onChange={this.handleChange('email', false)}
                    margin="dense"
                />
                <TextField
                    id="phone"
                    label="Teléfono"
                    className={classes.textFieldSmall}
                    value={this.state.data.phone}
                    required
                    error={this.state.errors.phone != null}
                    helperText={this.state.errors.phone}
                    onChange={this.handleChange('phone', true)}
                    onBlur={this.handleChange('phone', true)}
                    margin="dense"
                />
                <br/>
                <TextField
                    id="address"
                    label="Dirección"
                    className={classes.textFieldLarge}
                    value={this.state.data.address}
                    onChange={this.handleChange('address', false)}
                    margin="dense"
                />
                <br/>
                <TextField
                    id="zip"
                    label="Código postal"
                    className={classes.textFieldNumber}
                    numeric="true"
                    value={this.state.data.zip}
                    onChange={this.handleChange('zip', false)}
                    margin="dense"
                />
                <TextField
                    id="locality"
                    label="Localidad"
                    className={classes.textFieldSmall}
                    value={this.state.data.locality}
                    onChange={this.handleChange('locality', false)}
                    margin="dense"
                />
                <TextField
                    id="province"
                    label="Provincia"
                    className={classes.textFieldSmall}
                    value={this.state.data.province}
                    onChange={this.handleChange('province', false)}
                    margin="dense"
                />
                <br/>
                <Button variant="raised" 
                        color="primary" 
                        size="small" 
                        onClick={this.doAction} 
                        disabled={this.state.invalidData}>
                    {this.props.buttonLabel}
                </Button>
            </form>
        );
    }
}

PatientData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientData);