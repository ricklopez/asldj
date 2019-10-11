import React, {Component} from "react";
import { connect } from 'react-redux';
import {createMigration, fetchLOBMappings, fetchMigration, fetchPeriodMappings} from '../../actions/migration-actions'
import {bindActionCreators} from "redux";
import {completeTask, createStandUpDB} from "../../actions/task-actions";
import axios from "axios";
import * as env from "../../constants/app-environment";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const scaryAnimals = [
    { label: "Alligators", value: 1 },
    { label: "Crocodiles", value: 2 },
    { label: "Sharks", value: 3 },
    { label: "Small crocodiles", value: 4 },
    { label: "Smallest crocodiles", value: 5 },
    { label: "Snakes", value: 6 },
];


export default class NameCellRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = { lobs: []};
    }

    componentDidMount() {
        const { id } = 1;

        // this.props.fetchLOBMappings(id);
        // this.props.fetchPeriodMappings(id);

        const reqPromise = axios.get(`${env.AUTH_ROOT_URL}/Catalyst-LOB`);


        reqPromise.then((r) => {
            const newState = {...this.state};
            newState.lobs = r.data;
            this.setState(newState, (r) => console.log(this.state));
        });


    }

    onChange = (e) => {
        console.log(this.props.actions);
        this.props.setValue(e.target.value);
    }


    render() {

        const optionsList = this.state.lobs.map((item) => {
            return <option key={item.id} value={item.id}>{item.id}</option>
        });

        return (
            <select value={this.state.value} onChange={this.onChange}>
                {optionsList}
            </select>
        );
    }
}
