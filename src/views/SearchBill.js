import React, { Component } from 'react';
import SearchBox from '../business/SearchBillBox';
import firebase from "firebase/index";

class SearchBill extends Component {

    constructor() {
        super ();
        this.state = {
            bills: [],
            fields: null,
            billData : {},
        };
    };

    componentDidMount(){
        this.updateList();
    }

    updateList = () => {
        const list = this.executeFindAll();
        this.setState({
            patients: this.filterBills(this.state.fields, list)
        });
    };

    executeFindAll = () => {
        const data = [];
        const patientsRef = firebase.database().ref('bills/' + this.getUser());
        patientsRef.orderByChild("name").on("value", function(item) {
            item.forEach(function(snapshot) {
                const patient = snapshot.val();
                patient.id = snapshot.key;
                data.push(patient);
            });
        });
        console.log("Found " + data.length + " bills in database");
        return data;
    };

    getUser = () => {
        return this.props.user.uid;
    };

    filterBills = (fields, patients) => {
        return !fields ? [] : patients.filter(item => this.filterBill(fields, item))
    };

    filterBill = (fields, item) => {
        return this.filterByField(fields.patient, item.name) && this.filterByField(fields.bill, item.number)
    };

    filterByField = (filter, item) => {
        return !filter || filter ==="" || item.toLowerCase().includes(filter.toLowerCase());
    };

    search = fields => {
        const list = this.executeFindAll();
        this.setState({
            fields: fields,
            bills: this.filterBills(fields, list)
        });
    };


    render(){
        return (
            <div>
                <SearchBox search={this.search}/>
            </div>
        );
    }
}

export default SearchBill;