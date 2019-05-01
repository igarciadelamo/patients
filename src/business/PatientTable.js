import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Edit';


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 16
    },
    body: {
        fontSize: 14
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class PatientTable extends Component {

    update = (id) => {
        this.props.update(id)
    };

    delete = id => {
        this.props.delete(id);
    };

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Nombre</CustomTableCell>
                            <CustomTableCell>DNI/NIF</CustomTableCell>
                            <CustomTableCell>Contacto</CustomTableCell>
                            <CustomTableCell>Dirección</CustomTableCell>
                            <CustomTableCell>Acciones</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.patients.map(n => {
                            return (
                                <TableRow className={classes.row} key={n.id}>
                                    <CustomTableCell component="th" scope="row">{n.name}</CustomTableCell>
                                    <CustomTableCell>{n.dni}</CustomTableCell>
                                    <CustomTableCell>{n.email} <br/> {n.phone}</CustomTableCell>
                                    <CustomTableCell>{n.address} <br/> {n.zip} {n.locality} ({n.province})</CustomTableCell>
                                    <CustomTableCell>
                                        <IconButton aria-label="Edit" color="primary" onClick={() => this.update(n.id)}>
                                            <UpdateIcon/>
                                        </IconButton>
                                        <IconButton aria-label="Delete" onClick={() => this.delete(n.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

PatientTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientTable);