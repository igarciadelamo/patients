import React, { Component } from 'react';
import SearchBox from '../business/SearchBox';
import SearchResultTable from "../business/SearchResultTable";
import firebase from "firebase/index";
import Confirmation from "../common/Confirmation";

class SearchPatient extends Component {

    constructor() {
        super ();
        this.state = {
            patients: [],
            fields: null,
            showDeleteAlert: false
        };
    };

    componentDidMount(){
        this.updateList();
    }

    updateList = () => {
        const list = this.executeQuery();
        this.setState({
            patients: this.filterPatients(this.state.fields, list)
        });
    };

    executeQuery = () => {
        const data = [];
        const patientsRef = firebase.database().ref('patients/' + this.getUser());
        patientsRef.orderByChild("name").on("value", function(item) {
            item.forEach(function(snapshot) {
                const patient = snapshot.val();
                patient.id = snapshot.key;
                data.push(patient);
            });
        });
        console.log("Found " + data.length + " patients in database");
        return data;
    };

    getUser = () => {
      return this.props.user.uid;
    };

    filterPatients = (fields, patients) => {
        return !fields ? [] : patients.filter(item => this.filterPatient(fields, item))
    };

    filterPatient = (fields, item) => {
        return this.filterByField(fields.phone, item.phone) && this.filterByField(fields.name, item.name)
    };

    filterByField = (filter, item) => {
        return !filter || filter ==="" || item.toLowerCase().includes(filter.toLowerCase());
    };

    search = fields => {
        const list = this.executeQuery();
        this.setState({
            fields: fields,
            patients: this.filterPatients(fields, list)
        });
    };

    delete = id => {
        console.log("Delete final by id", id) ;
        this.setState({
            showDeleteAlert : true,
            selectedPatient: id
        });
    };

    cancelDelete = () => {
        this.setState({
            showDeleteAlert : false,
            selectedPatient: null
        });
    };

    doDelete = () => {
        console.log("Delete final by id", this.state.selectedPatient) ;
        const patientRef = firebase.database().ref('patients/' + this.getUser() + "/" + this.state.selectedPatient);
        patientRef.remove()
            .then(this.updateList)
            .catch(error => { console.error("Error deleting patient ", error)});
        this.cancelDelete();
    };

    render() {

        return (
            <div>
                <SearchBox search={this.search} />
                <SearchResultTable patients={this.state.patients} delete={this.delete} />
                <Confirmation open={this.state.showDeleteAlert}
                              title="Borrar paciente"
                              text="¿Desea borrar todos los datos de este paciente?"
                              cancel={this.cancelDelete} accept={this.doDelete} />
            </div>
        );
    }
}

export default SearchPatient;