import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabView from "./TabView";
import SearchPatient from "../views/SearchPatient";

import { withStyles } from '@material-ui/core/styles';
import NewPatient from "../views/NewPatient";
import SearchInvoice from "../views/SearchInvoice";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class MainTabs extends Component {

    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        return (
            <div className={this.props.root}>
                <Tabs value={this.state.value} onChange={this.handleChange} fullWidth >
                    <Tab label="Mis pacientes" />
                    <Tab label="Nuevo paciente" />
                    <Tab label="Mis Facturas" />
                    <Tab label="Nueva factura" />
                    <Tab label="Estadísticas" />
                </Tabs>
                {value === 0 && <TabView><SearchPatient user={this.props.user}/></TabView>}
                {value === 1 && <TabView><NewPatient user={this.props.user}/></TabView>}
                {value === 2 && <TabView><SearchInvoice user={this.props.user}/></TabView>}
                {value === 3 && <TabView/>}
                {value === 4 && <TabView/>}
            </div>
        )
    }
}

export default withStyles(styles)(MainTabs);