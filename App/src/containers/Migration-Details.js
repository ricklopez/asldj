import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchMigration, fetchLOBMappings, fetchPeriodMappings } from '../actions/migration-actions';
import { completeTask, updateLobMapping, createStandUpDB } from '../actions/task-actions';
import AppHeader from '../components/header';
import loadingImg from '../assets/loading-one.gif';
import Task from '../components/details-task.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import _ from 'lodash';
import moment from 'moment';
import NameCellRenderer from '../components/renderers/nameCellRenderer';

function getCharCodeFromEvent(event) {
    event = event || window.event;
    return (typeof event.which == "undefined") ? event.keyCode : event.which;
}

function isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
}

function isKeyPressedNumeric(event) {
    var charCode = getCharCodeFromEvent(event);
    var charStr = String.fromCharCode(charCode);
    return isCharNumeric(charStr);
}

// simple function cellRenderer, just returns back the name of the country
function CountryCellRenderer(params) {
    return params.value.name;
}

const columnsLOB = [
    { field: 'migrationId', headerName: 'Migration Id', sortable: true, filter: true},
    { field: 'evolutionLOB', headerName: 'Client LOB', sortable: true, filter: true, actions:completeTask },
    {
        field: 'catalystLOB',
        headerName: 'Catalyst LOB',
        cellRendererFramework: NameCellRenderer},
    { field: 'evolutionCoverage', headerName: 'Client Coverage', sortable: true, filter: true, editable:true},
    { field: 'displayName', headerName: 'Display Name', sortable: true, filter: true},
    { field: 'countOfClientRows', headerName: 'Count Client Rows', sortable: true, filter: true},
];

const columnsPeriods = [
    { field: 'migrationId', headerName: 'Migration Id', sortable: true, filter: true, editable:true},
    { field: 'evolutionPeriod', headerName: 'Client Period', sortable: true, filter: true},
    { field: 'catalystPeriod', headerName: 'Catalyst Period', sortable: true, filter: true, editable:true},
];


class MigrationDetails extends Component {
    constructor(props) {
        super(props);
        this.onTaskClick = this.onTaskClick.bind(this);
        this.onStandUp = this.onStandUp.bind(this);
        this.onNotify = this.onNotify.bind(this);
        this.CountryCellRenderer = this.CountryCellRenderer.bind(this);
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

    onStandUp(event) {
        const { id } = this.props.match.params;
        this.props.createStandUpDB(this.props.migration);
    }

    onNotify(event) {

    }

    CountryCellRenderer(params) {

        return params.value.name;
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
                                    <h4 className="card-title">{migration.migrationName ? migration.migrationName : ''}</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">Migration Type:  {migration.migrationTypeID ? migration.migrationTypeID : ''}</h6>
                                    <p className="card-text"> <strong>Source Host: </strong> {migration.sourceHostName}</p>
                                    <p className="card-text"> <strong>Source DB: </strong> {migration.sourceDb}</p>
                                        <p className="card-text"> <strong>Source Schema: </strong> {migration.sourceSchema}</p>
                                    <p className="card-text"> <strong>Source XML Count: </strong> {migration.sourceXmlCount}</p>
                                    <p className="card-text"> <strong>Dest Host: </strong> {migration.destDbHostName}</p>
                                    <p className="card-text"> <strong>Dest DB: </strong> {migration.destDb}</p>
                                    <p className="card-text"> <strong>Dest Schema: </strong> {migration.destSchema}</p>
                                    <p className="card-text"> <strong>Dest QQ Id: </strong> {migration.destQqID}</p>
                                    <p className="card-text"> <strong>Agency Phone: </strong> {migration.agencyPhoneLine}</p>
                                    <p className="card-text"> <strong>Agency Email: </strong> {migration.agencyEmailLine}</p>
                                    <p className="card-text"> <strong>CSR Notes: </strong> {migration.csrNotes}</p>

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
                                        <button className="btn btn-outline-info float-right mr-2" onClick={this.onStandUp}>
                                            Stand Up
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div className="card" style={divStyle}>
                                <div className="card-body">
                                    <h4 className="card-title">Summary</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">Stand Up</h6>
                                    <p className="card-text"> <strong>Progress: </strong> {migration.isPhase1 ? "Complete" : "Not Started"}</p>
                                    <p className="card-text"> Status: Not Started</p>
                                    <h6 className="card-subtitle mb-2 text-muted">DBE Approval</h6>
                                    <p className="card-text"> <strong>Progress: </strong> {migration.isPhase2 ? "Complete" : "Not Started"}</p>
                                    <p className="card-text"> Status: Not Started</p>
                                    <h6 className="card-subtitle mb-2 text-muted">QA Approval</h6>
                                    <p className="card-text"> <strong>Progress: </strong> {migration.isPhase3 ? "Complete" : "Not Started"}</p>
                                    <p className="card-text"> Status: Not Started</p>
                                    <hr/>
                                    <p className="card-text"> <strong>Target Date: </strong> {moment(migration.targetDate).format('MMMM Do YYYY, h:mm:ss a') }</p>
                                    <p className="card-text"> <strong>Migration Date: </strong> {moment(migration.migrationDate).format('MMMM Do YYYY, h:mm:ss a') }</p>
                                    <p className="card-text"> <strong>Last Processed Date: </strong> {moment(migration.beginProcesDate).format('MMMM Do YYYY, h:mm:ss a') }</p>
                                    <p className="card-text"> <strong>Created Date: </strong> {moment(migration.createdAt).format('MMMM Do YYYY, h:mm:ss a') }</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.migration.phase !== 0 ?
                        (<div>
                            <div className="row mt-5">
                        <div className="col">
                            <h2> Mappings</h2>
                        </div>
                        <div className="col">
                            <div className="text-xs-right">

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
                                            deltaRowDataMode={true}
                                            // return id required for tree data and delta updates
                                            treeData={true}
                                            getRowNodeId={data => data.migrationId}
                                            onCellValueChanged={this.onCellValueChanged}
                                            >
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
                                            deltaRowDataMode={true}
                                            // return id required for tree data and delta updates
                                            treeData={true}
                                            getRowNodeId={data => data.migrationId}
                                            onCellValueChanged= {(e) => {
                                                console.log(e);
                                            } }
                                            >
                                        </AgGridReact>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>)
                        : (<div></div>)}
                </div>
            </div>
        );
    }

    onCellValueChanged = (event) => {
        console.log({...event.data});
        this.props.updateLobMapping({...event.data});
    };

}



function mapStateToProps({ migration, lobMappings, periodsMappings }, ownProps) {
    return {
        migration: migration,
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
            updateLobMapping,
            completeTask,
            createStandUpDB
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MigrationDetails);