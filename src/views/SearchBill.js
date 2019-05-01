import React, { Component } from 'react';
import SearchBox from '../business/SearchBillBox';
import SearchResultTable from "../business/BillTable";

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
            bills: this.filterBills(this.state.fields, list)
        });
    };

    executeFindAll = () => {
        const data = [];
        const billsRef = firebase.database().ref('bills/' + this.getUser());
        billsRef.orderByChild("date").on("value", function(item) {
            item.forEach(function(snapshot) {
                const bill = snapshot.val();
                bill.id = snapshot.key;
                data.push(bill);
            });
        });
        console.log("Found " + data.length + " bills in database");
        return data;
    };

    getUser = () => {
        return this.props.user.uid;
    };

    filterBills = (fields, bills) => {
        return !fields ? [] : bills.filter(item => this.filterBill(fields, item))
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
                <SearchResultTable bills={this.state.bills} />
            </div>
        );
    }
}

export default SearchBill;