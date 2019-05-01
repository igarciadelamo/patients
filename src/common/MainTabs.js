import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabView from "./TabView";
import SearchPatient from "../views/SearchPatient";

import { withStyles } from '@material-ui/core/styles';
import NewPatient from "../views/NewPatient";
import SearchBill from "../views/SearchBill";

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

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { value } = this.state;
        return (
            <div className={this.props.root}>
                <Tabs value={this.state.value} onChange={this.handleChange} fullWidth >
                    <Tab label="Mis pacientes" />
                    <Tab label="Añadir nuevo paciente" />
                    <Tab label="Facturas" />
                    <Tab label="Configuración" />
                </Tabs>
                {value === 0 && <TabView><SearchPatient user={this.props.user}/></TabView>}
                {value === 1 && <TabView><NewPatient user={this.props.user}/></TabView>}
                {value === 2 && <TabView><SearchBill user={this.props.user}/></TabView>}
                {value === 3 && <TabView/>}
            </div>
        )
    }
}

export default withStyles(styles)(MainTabs);