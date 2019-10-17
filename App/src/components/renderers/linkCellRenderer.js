import React, {Component} from "react";
import { connect } from 'react-redux';
import {createMigration, fetchLOBMappings, fetchMigration, fetchPeriodMappings} from '../../actions/migration-actions'
import {bindActionCreators} from "redux";
import {completeTask, createStandUpDB} from "../../actions/task-actions";
import axios from "axios";
import * as env from "../../constants/app-environment";

import { Link } from 'react-router-dom';

export default class LinkCellRenderer extends Component {
    constructor(props) {
        super(props);
    }




    render() {

        return (
            <a className="text-primary" href={`/migrations/${this.props.value}`}>
                {this.props.value}
            </a>
        );
    }
}
