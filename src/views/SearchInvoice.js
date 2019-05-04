import React, { Component } from 'react';
import SearchBox from '../common/SearchBox';
import SearchResultTable from "../business/InvoiceTable";

import firebase from "firebase/index";

class SearchInvoice extends Component {

    constructor() {
        super ();
        this.state = {
            invoices: [],
            fields: null,
            invoiceData : {},
        };
    };

    getRefInvoicePath = () => {
        return this.getUser()  + '/invoices/';
    };

    componentDidMount(){
        this.updateList();
    }

    updateList = () => {
        const list = this.executeFindAll();
        this.setState({
            invoices: this.filterInvoices(this.state.fields, list)
        });
    };

    executeFindAll = () => {
        const data = [];
        const invoicesRef = firebase.database().ref(this.getRefInvoicePath());
        invoicesRef.orderByChild("date").on("value", function(item) {
            item.forEach(function(snapshot) {
                const invoice = snapshot.val();
                invoice.id = snapshot.key;
                data.push(invoice);
            });
        });
        console.log("Found " + data.length + " invoices in database");
        return data;
    };

    getUser = () => {
        return this.props.user.uid;
    };

    seeInvoice = id => {
       alert("See invoice " + id);
    };

    filterInvoices = (fields, invoices) => {
        return !fields ? [] : invoices.filter(item => this.filterInvoice(fields, item))
    };

    filterInvoice = (fields, item) => {
        return this.filterByField(fields.primary, item.patientName) && this.filterByField(fields.secondary, item.invoiceId)
    };

    filterByField = (filter, item) => {
        return !filter || filter ==="" || item.toLowerCase().includes(filter.toLowerCase());
    };

    search = fields => {
        const list = this.executeFindAll();
        this.setState({
            fields: fields,
            invoices: this.filterInvoices(fields, list)
        });
    };


    render(){
        return (
            <div>
                <SearchBox search={this.search} primaryLabel="Nombre" secondaryLabel="Num. Factura" />
                <SearchResultTable invoices={this.state.invoices} see={this.seeInvoice}/>
            </div>
        );
    }
}

export default SearchInvoice;