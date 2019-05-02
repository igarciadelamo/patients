import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        backgroundColor: 'lightgrey',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    groupTextFields: {
        marginTop: 0,
        flexGrow: 3,
        display: 'flex',
        flexWrap: 'wrap',
    },
    textFieldLarge: {
        marginTop: 0,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        flexGrow: 0.5,
    },
    textFieldSmall: {
        marginTop: 0,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    groupButton: {
        paddingRight: 10,
    }
});

class SearchBox extends Component {

    state = {
        primary: '',
        secondary: ''
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

        return <div className={classes.container}>
                <span className={classes.groupTextFields}>
                    <TextField
                        id="primary"
                        label={this.props.primaryLabel}
                        className={classes.textFieldLarge}
                        value={this.state.primary}
                        onChange={this.handleChange('primary')}
                        margin="dense"
                    />
                    <TextField
                        id="secondary"
                        label={this.props.secondaryLabel}
                        className={classes.textFieldSmall}
                        value={this.state.secondary}
                        onChange={this.handleChange('secondary')}
                        margin="dense"
                    />
                </span>
                <span className={classes.groupButton}>
                    <Button variant="outlined" color="primary" size="small" onClick={this.search}>
                        Buscar
                    </Button>
                </span>
        </div>;
    }
}

SearchBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBox);