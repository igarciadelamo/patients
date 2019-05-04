import React, { Component } from 'react';
import Patient from '../business/Patient';
import Invoice from '../business/Invoice';
import SearchBox from '../common/SearchBox';
import SearchResultTable from "../business/PatientTable";
import firebase from "firebase/index";
import Confirmation from "../common/Confirmation";
import ModalForm from "../common/ModalForm";

class SearchPatient extends Component {

    constructor() {
        super ();
        this.state = {
            patients: [],
            fields: null,
            showDeleteAlert: false,
            showEditionModel: false,
            showInvoiceModel: false,
            patientData : {},
            invoiceData: {},
            validations : {}
        };
    };

    componentDidMount(){
        this.updateList();
    }

    updateList = () => {
        const list = this.executeFindAll();
        this.setState({
            patients: this.filterPatients(this.state.fields, list)
        });
    };

    executeFindAll = () => {
        const data = [];
        const patientsRef = firebase.database().ref(this.getRefPatientPath());
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

    executeFindOne = (id) => {
        let patient = {};
        const patientsRef = firebase.database().ref(this.getRefPatientPath() + id);
        patientsRef.on("value", function(snapshot) {
            patient = snapshot.val();
            console.log("Got patient by id", patient)
        });
        return patient;
    };

    getUser = () => {
      return this.props.user.uid;
    };

    getRefPatientPath = () => {
        return this.getUser()  + '/patients/';
    };

    getRefInvoicePath = () => {
        return this.getUser()  + '/invoices/';
    };

    filterPatients = (fields, patients) => {
        return !fields ? [] : patients.filter(item => this.filterPatient(fields, item))
    };

    filterPatient = (fields, item) => {
        return this.filterByField(fields.secondary, item.phone) && this.filterByField(fields.primary, item.name)
    };

    filterByField = (filter, item) => {
        return !filter || filter ==="" || item.toLowerCase().includes(filter.toLowerCase());
    };

    search = fields => {
        const list = this.executeFindAll();
        this.setState({
            fields: fields,
            patients: this.filterPatients(fields, list)
        });
    };

    delete = id => {
        this.setState({
            showDeleteAlert : true,
            selectedPatient: id
        });
    };

    update = id => {
        this.setState({
            showEditionModel: true,
            selectedPatient: id,
            patientData: this.executeFindOne(id)
        });
    };

    addInvoice = id => {
        const patient = this.executeFindOne(id);
        this.setState({
            showInvoiceModel: true,
            selectedPatient: id,
            patientData: patient,
            invoiceData: {
                tax : 21,
                date: new Date().toISOString().substring(0, 10),
                patientName: patient.name,
                patientIdCard: patient.dni,
                patientRef: id

            }
        });
    };

    cancelDelete = () => {
        this.setState({
            showDeleteAlert : false,
            selectedPatient: null
        });
    };

    cancelUpdate = () => {
        this.setState({
            showEditionModel : false,
            selectedPatient: null,
            patientData: {},
        });
    };

    cancelInvoice = () => {
        this.setState({
            showInvoiceModel : false,
            selectedPatient: null,
            patientData : {},
            invoiceData: {},
        });
    };

    doDelete = () => {
        console.log("Delete final by id", this.state.selectedPatient) ;
        const patientRef = firebase.database().ref(this.getRefPatientPath() + this.state.selectedPatient);
        patientRef.remove()
            .then(this.updateList)
            .catch(error => { console.error("Error deleting patient ", error)});
        this.cancelDelete();
    };

    doUpdate = () => {
        console.log("Updating final by id", this.state.selectedPatient) ;
        const patientRef = firebase.database().ref(this.getRefPatientPath() + this.state.selectedPatient);
        patientRef.update(this.state.patientData)
            .then(this.updateList)
            .then(this.cancelUpdate)
            .catch(error => { console.error("Error updating patient ", error)});
    };

    doAddInvoice = () => {
        console.log("Adding invoice to patient", this.state.selectedPatient) ;
        const invoiceRef = firebase.database().ref(this.getRefInvoicePath());
        const invoice = invoiceRef.push();
        invoice.set(this.state.invoiceData)
            .then(this.cancelInvoice)
            .catch(error => { console.error("Error updating patient ", error)});
    };

    handleChangeUpdating = (name, required, value) => {
        this.setState({
            patientData : {
                ...this.state.patientData,
                [name]: value
            },
            validations : {
                ...this.state.validations,
                [name]: required && value === '' ? 'Campo obligatorio' : null
            }
        });
    };

    handleAddInvoice = (name, required, value) => {
        this.setState({
            invoiceData : {
                ...this.state.invoiceData,
                [name]: value
            },
            validations : {
                ...this.state.validations,
                [name]: required && value === '' ? 'Campo obligatorio' : null
            }
        });
    };

    render() {

        return (
            <div>
                <SearchBox search={this.search} primaryLabel="Nombre" secondaryLabel="Teléfono" />
                <SearchResultTable patients={this.state.patients}
                                   delete={this.delete}
                                   update={this.update}
                                   addInvoice={this.addInvoice} />
                <Confirmation open={this.state.showDeleteAlert}
                              title="Borrar paciente"
                              text="¿Desea borrar todos los datos de este paciente?"
                              cancel={this.cancelDelete} accept={this.doDelete} />
                <ModalForm open={this.state.showEditionModel}
                              title="Datos del paciente"
                              text="Actualizar los datos del paciente"
                              cancel={this.cancelUpdate} accept={this.doUpdate}>
                    <Patient handleChange={this.handleChangeUpdating}
                             data={this.state.patientData}
                             errors={this.state.validations} />
                </ModalForm>
                <ModalForm open={this.state.showInvoiceModel}
                           title="Nueva factura"
                           text="Datos de la factura"
                           cancel={this.cancelInvoice} accept={this.doAddInvoice}>
                    <Invoice handleChange={this.handleAddInvoice}
                             data={this.state.invoiceData}
                             errors={this.state.validations} />
                </ModalForm>
            </div>
        );
    }
}

export default SearchPatient;