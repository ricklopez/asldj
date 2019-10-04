import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchMigration, fetchLOBMappings, fetchPeriodMappings } from '../actions/migration-actions';
import { completeTask } from '../actions/task-actions';
import AppHeader from '../components/header';
import loadingImg from '../assets/loading-one.gif';
import Task from '../components/details-task.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import _ from 'lodash';


const columnsLOB = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true},
    { field: 'migrationId', headerName: 'Migration Id', sortable: true, filter: true, editable:true},
    { field: 'clientLOB', headerName: 'Client LOB', sortable: true, filter: true},
    { field: 'clientCoverage', headerName: 'Client Coverage', sortable: true, filter: true, editable:true},
    { field: 'displayName', headerName: 'Display Name', sortable: true, filter: true},
    { field: 'countOfClientRows', headerName: 'Count Client Rows', sortable: true, filter: true},
    { field: 'createdAt', headerName: 'Created', sortable: true, filter: true, editable:true}
];

const columnsPeriods = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true},
    { field: 'migrationId', headerName: 'Migration Id', sortable: true, filter: true, editable:true},
    { field: 'clientPeriod', headerName: 'Client Period', sortable: true, filter: true},
    { field: 'catalystPeriod', headerName: 'Catalyst Period', sortable: true, filter: true, editable:true},
    { field: 'createdAt', headerName: 'Created', sortable: true, filter: true, editable:true}
];

class MigrationDetails extends Component {
    constructor(props) {
        super(props);
        this.onTaskClick = this.onTaskClick.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchMigration(id);
        this.props.fetchLOBMappings(id);
        this.props.fetchPeriodMappings(id);
    }

    onTaskClick(event) {
        event.preventDefault();
        this.props.completeTask({
            id: this.props.match.params.id,
            taskId: event.target.dataset.id,
            completed: true
        });
    }

    renderTasks() {

        return _.map(this.props.migration.tasks, (task) => {
            return (
                <Task
                    key={task.id}
                    data-id={task.id}
                    name={task.name}
                    value={task.name}
                    id={task.id}
                    active={task.active}
                    complete={task.complete.toString()}
                    description={task.description}
                    onClick={this.onTaskClick}
                >
                </Task>
            );
        });
    }

    render() {
        const { migration } = this.props;
        const divStyle = {
            width: '20 rem'
        };

        if (!migration) {
            return <div> <img src={loadingImg} alt="loading" /> </div>;
        }
        return (
            <div>
                <AppHeader></AppHeader>
                <div className="container my-5">
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <h2> Migrations</h2>
                                </div>
                                <div className="col">
                                    <div className="text-xs-right">
                                        <Link className="btn btn-outline-info float-right" to="/migration/edit/1">
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={divStyle}>
                                <div className="card-body">
                                    <h4 className="card-title">{migration.name ? migration.name : ''}</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">{migration.type ? migration.type : ''}</h6>
                                    <p className="card-text"> <strong>Source Host: </strong> {migration.sourceHostName}</p>
                                    <p className="card-text"> <strong>Source DB: </strong> {migration.sourceDB}</p>
                                    <p className="card-text"> <strong>Source Schema: </strong> {migration.sourceSchema}</p>
                                    <p className="card-text"> <strong>Source XML Count: </strong> {migration.sourceXMLCount}</p>
                                    <hr/>
                                    <Link to="/dashboard"> Back To Dashboard </Link>

                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <h2>Status</h2>
                                </div>
                                <div className="col">
                                    <div className="text-xs-right">
                                        <Link className="btn btn-outline-info float-right mr-2" to="/migration/new">
                                            Stand Up
                                        </Link>
                                        <Link className="btn btn-outline-info float-right mr-2" to="/migration/new">
                                            Notify Team
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={divStyle}>
                                <div className="card-body">
                                    <h4 className="card-title">Summary</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">Overall</h6>
                                    <p className="card-text"> <strong>Progress: </strong> 0%</p>
                                    <p className="card-text"> Status: Not Started</p>
                                    <h6 className="card-subtitle mb-2 text-muted">DBE Approval</h6>
                                    <p className="card-text"> <strong>Progress: </strong> 0%</p>
                                    <p className="card-text"> Status: Not Started</p>
                                    <h6 className="card-subtitle mb-2 text-muted">QA Approval</h6>
                                    <p className="card-text"> <strong>Progress: </strong> 0%</p>
                                    <p className="card-text"> Status: Not Started</p>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <h2> Mappings</h2>
                        </div>
                        <div className="col">
                            <div className="text-xs-right">
                                <Link className="btn btn-outline-info float-right" to="/migration/edit/1">
                                    New Mapping
                                </Link>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <h4 className="text-muted">Lines Of Business</h4>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div
                                        className="ag-theme-balham"
                                        style={{
                                            height: '800px',
                                            width: '100%' }}
                                    >
                                        <AgGridReact
                                            columnDefs={columnsLOB}
                                            rowData={this.props.lobs}
                                            pagination= {true}
                                            onRowClicked= {(e) => {
                                                console.log(e);
                                            } }>
                                        </AgGridReact>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <h4 className="text-muted">Periods</h4>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div
                                        className="ag-theme-balham"
                                        style={{
                                            height: '800px',
                                            width: '100%' }}
                                    >
                                        <AgGridReact
                                            columnDefs={columnsPeriods}
                                            rowData={this.props.periods}
                                            pagination= {true}
                                            onRowClicked= {(e) => {
                                                console.log(e);
                                            } }
                                            >
                                        </AgGridReact>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ migrations, lobMappings, periodsMappings }, ownProps) {
    return {
        migration: migrations[ownProps.match.params.id],
        lobs: lobMappings,
        periods: periodsMappings
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(
        {
            fetchMigration,
            fetchLOBMappings,
            fetchPeriodMappings,
            completeTask
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MigrationDetails);