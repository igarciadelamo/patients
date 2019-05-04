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
import SeeIcon from '@material-ui/icons/Visibility';

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

class InvoiceTable extends Component {

    see = id => {
        this.props.see(id);
    };

    render() {
        if (this.props.invoices == null || this.props.invoices.length === 0) {
            return null;
        } else {
            const {classes} = this.props;
            return (
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Num. Factura</CustomTableCell>
                                <CustomTableCell>Destinatario</CustomTableCell>
                                <CustomTableCell>Concepto</CustomTableCell>
                                <CustomTableCell>Cantidad</CustomTableCell>
                                <CustomTableCell>Fecha</CustomTableCell>
                                <CustomTableCell>Acciones</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.invoices.map(n => {
                                return (
                                    <TableRow className={classes.row} key={n.id}>
                                        <CustomTableCell component="th" scope="row">{n.invoiceId}</CustomTableCell>
                                        <CustomTableCell>{n.patientName} <br/> {n.patientIdCard}</CustomTableCell>
                                        <CustomTableCell>{n.concept}</CustomTableCell>
                                        <CustomTableCell>TOTAL: {n.total} €
                                            <br/>B.I: {n.taxBase} €
                                            <br/>IVA: {n.tax}%
                                        </CustomTableCell>
                                        <CustomTableCell>{n.date}</CustomTableCell>
                                        <CustomTableCell>
                                            <IconButton aria-label="See" onClick={() => this.see(n.id)}>
                                                <SeeIcon/>
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
}

InvoiceTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InvoiceTable);