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

class SearchBillBox extends Component {

    state = {
        patient: '',
        bill: ''
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
                    id="patient"
                    label="Nombre del paciente"
                    className={classes.textFieldLarge}
                    value={this.state.patient}
                    onChange={this.handleChange('patient')}
                    margin="dense"
                />
                <TextField
                    id="bill"
                    label="Número de factura"
                    className={classes.textFieldLarge}
                    value={this.state.bill}
                    onChange={this.handleChange('bill')}
                    margin="dense"
                />
                <Button variant="outlined" color="primary" size="small" onClick={this.search}>
                    Buscar
                </Button>
            </form>
        );
    }
}

SearchBillBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBillBox);