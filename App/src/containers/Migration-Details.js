import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchMigration, fetchLOBMappings, fetchPeriodMappings } from '../actions/migration-actions';
import { completeTask, createStandUpDB } from '../actions/task-actions';
import AppHeader from '../components/header';
import loadingImg from '../assets/loading-one.gif';
import Task from '../components/details-task.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import _ from 'lodash';
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
    { field: 'id', headerName: 'ID', sortable: true, filter: true},
    { field: 'migrationId', headerName: 'Migration Id', sortable: true, filter: true},
    { field: 'clientLOB', headerName: 'Client LOB', sortable: true, filter: true, actions:completeTask },
    {
        field: 'catalystLOB',
        headerName: 'Catalyst LOB',
        cellRendererFramework: NameCellRenderer},
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

// create your cellRenderer as a React component

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
        this.props.createStandUpDB( id, (r) => {
            console.log("Response");
            console.log(r);
            //TODO: Edit Migration and Phase 1 complete
            this.props.completeTask({id: r.data.migrationId, phase: 1});
            this.props.history.push(`/migration/details/${r.data.migrationId}`);
        });
        console.log(event);
    }

    onNotify(event) {
        console.log(event);
    }

    CountryCellRenderer(params) {
        console.log(params);
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
                                        <button className="btn btn-outline-info float-right mr-2" onClick={this.onStandUp}>
                                            Stand Up
                                        </button>
                                        <button className="btn btn-outline-info float-right mr-2" onClick={this.onNotify}>
                                            Notify Team
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card" style={divStyle}>
                                <div className="card-body">
                                    <h4 className="card-title">Summary</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">Phase One</h6>
                                    <p className="card-text"> <strong>Progress: </strong> {migration.phase === 1 ? "Complete" : "Not Started"}</p>
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
                    {this.props.migration.phase !== 0 ?
                        (<div>
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
                                            deltaRowDataMode={true}
                                            // return id required for tree data and delta updates
                                            treeData={true}
                                            getRowNodeId={data => data.id}
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
                                            getRowNodeId={data => data.id}
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


        console.log(event);
        this.props.completeTask({id:1});
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
            completeTask,
            createStandUpDB
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MigrationDetails);