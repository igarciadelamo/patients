import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

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

class Invoice extends Component {

    handleChange = (name, required, value) => {
        this.props.handleChange(name, required, value);
    };

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.container} autoComplete="off">
                <TextField
                    id="invoiceId"
                    label="Num. Factura"
                    className={classes.textFieldSmall}
                    value={this.props.data.invoiceId}
                    required
                    error={this.props.errors.invoiceId != null}
                    helperText={this.props.errors.invoiceId}
                    onChange={e => this.handleChange('invoiceId', true, e.target.value)}
                    onBlur={e => this.handleChange('invoiceId', true, e.target.value)}
                    margin="dense"
                />
                <TextField
                    id="date"
                    label="Fecha de la factura"
                    type="date"
                    className={classes.textFieldSmall}
                    value={this.props.data.date}
                    defaultValue={this.props.data.date}
                    required
                    error={this.props.errors.date != null}
                    helperText={this.props.errors.date}
                    onChange={e => this.handleChange('date', true, e.target.value)}
                    onBlur={e => this.handleChange('date', true, e.target.value)}
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                />
                <br/>
                <TextField
                    id="concept"
                    label="Concepto"
                    className={classes.textFieldLarge}
                    value={this.props.data.concept}
                    required
                    error={this.props.errors.concept != null}
                    helperText={this.props.errors.concept}
                    onChange={e => this.handleChange('concept', true, e.target.value)}
                    onBlur={e => this.handleChange('concept', true, e.target.value)}
                    margin="dense"
                />
                <br/>
                <TextField
                    id="taxBase"
                    label="Base imponible"
                    type="number"
                    className={classes.textFieldSmall}
                    value={this.props.data.taxBase}
                    required
                    error={this.props.errors.taxBase != null}
                    helperText={this.props.errors.taxBase}
                    onChange={e => this.handleChange('taxBase', true, e.target.value)}
                    onBlur={e => this.handleChange('taxBase', true, e.target.value)}
                    margin="dense"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }}
                />
                <br/>
                <TextField
                    id="tax"
                    label="IVA"
                    type="number"
                    className={classes.textFieldSmall}
                    value={this.props.data.tax}
                    defaultValue={this.props.data.tax}
                    required
                    error={this.props.errors.tax != null}
                    helperText={this.props.errors.tax}
                    onChange={e => this.handleChange('tax', true, e.target.value)}
                    onBlur={e => this.handleChange('tax', true, e.target.value)}
                    margin="dense"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                />
                <br/>
                <TextField
                    id="total"
                    label="Total"
                    type="number"
                    className={classes.textFieldSmall}
                    value={this.props.data.total}
                    required
                    error={this.props.errors.total != null}
                    helperText={this.props.errors.total}
                    onChange={e => this.handleChange('total', false, e.target.value)}
                    onBlur={e => this.handleChange('total', true, e.target.value)}
                    margin="dense"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }}
                />
            </form>
        );
    }
}

Invoice.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Invoice);