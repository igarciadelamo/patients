import React, { Component } from 'react';
import PatientData from '../business/PatientData';
import Message from '../common/Message';
import Snackbar from '@material-ui/core/Snackbar';
import firebase from 'firebase';

class NewPatient extends Component {

    state = {
        toaster: false,
        success: true,
        patient : {
            name: '',
            dni: '',
            email: '',
            phone: '',
            address: '',
            zip: '',
            locality: '',
            province: ''
        }
    };

    showMessage = (success) => {
        this.setState({
            toaster: true,
            success: success
        });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') { return;}
        this.setState({ toaster: false });
    };

    create = (fields) => {
        this.save(fields);
    };

    save = (data) => {
        const user = this.props.user.uid;
        const patientsRef = firebase.database().ref(user + '/patients/');
        const patient = patientsRef.push();
        patient.set(data).then(() => {
            this.showMessage(true);
        }).catch(error => {
            console.error("Error creating patient ", error);
            this.showMessage(false);
        });
    };

    render() {
        const message = (this.state.success)?
            <Message onClose={this.handleClose} variant="success" message="Paciente creado correctamente" /> :
            <Message onClose={this.handleClose} variant="error" message="Se ha producido un error creando un paciente" />;

        return (
            <div>

                <PatientData doAction={this.create} buttonLabel="Crear" />

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.toaster}
                    autoHideDuration={2000}
                    onClose={this.handleClose}
                >
                    {message}
                </Snackbar>
            </div>
        );
    }
}

export default NewPatient;