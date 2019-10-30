import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMigrations } from '../actions/migration-actions';

import AppHeader from '../components/header';
import DateCellRender from '../components/renderers/dateCellRenderer';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import LinkCellRenderer from "../components/renderers/linkCellRenderer";
import {Link} from "react-router-dom";

const columns = [
    { field: 'migrationId', headerName: 'ID',
        cellRendererFramework: LinkCellRenderer,
        sortable: true,
        filter: true},
    { field: 'migrationName', headerName: 'Migration Name', sortable: true, filter: true},
    { field: 'migrationTypeID', headerName: 'Type',  sortable: true, filter: true },
    { field: 'acordAgencyLine1', headerName: 'Address 1',  sortable: true, filter: true },
    { field: 'acordAgencyLine2', headerName: 'Address 2',  sortable: true, filter: true },
    { field: 'acordAgencyLine2', headerName: 'Address 3',  sortable: true, filter: true },

    { field: 'sourceHostName', headerName: 'Source Host Name',  sortable: true, filter: true },
    { field: 'sourceDb', headerName: 'Source DB',  sortable: true, filter: true },
    { field: 'sourceSchema', headerName: 'Source Schema',  sortable: true, filter: true },
    { field: 'sourceXmlCount', headerName: 'Source XML Count',   sortable: true, filter: true },
    { field: 'destDbHostName', headerName: 'Dest Host Name',  sortable: true, filter: true },
    { field: 'destDb', headerName: 'Dest DB',  sortable: true, filter: true },
    { field: 'destSchema', headerName: 'Dest Schema',  sortable: true, filter: true},
    { field: 'destQqID', headerName: 'Dest QQ Id    ',  sortable: true, filter: true},
    { field: 'isPhase1', headerName: 'Phase 1',  sortable: true, filter: true },
    { field: 'isPhase2', headerName: 'Phase 2',  sortable: true, filter: true },
    { field: 'isPhase3', headerName: 'Phase 3',  sortable: true, filter: true },
    { field: 'isPhase4', headerName: 'Phase 4',  sortable: true, filter: true },
    { field: 'isPhase5', headerName: 'Phase 5' },
    { field: 'isPhase6', headerName: 'Phase 6' },
    { field: 'targetDate', headerName: 'Target Date',
        cellRendererFramework: DateCellRender,
        sortable: true, filter: true},
    { field: 'createdAt',
        headerName: 'Created Date',
        cellRendererFramework: DateCellRender,}
];


class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchMigrations({token: this.props.auth.token});
    }

    render() {
        const data = this.props.migrations || [];
        return (
            <div>
                <AppHeader user={this.props.auth}></AppHeader>


                <div className="container my-5">
                    <div className="row">
                        <div className="col">
                            <h2>All Migrations</h2>
                        </div>
                        <div className="col float-right">
                            <Link to="/dashboard" className="float-right"> Back To Dashboard </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div
                            className="ag-theme-balham"
                            style={{
                            height: '800px',
                            width: '100%' }}
                            >
                            <AgGridReact
                                columnDefs={columns}
                                rowData={data}
                                pagination= {true}
                                onRowClicked= {(e) => {console.log(e)}}
                            />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        migrations: state.migrations,
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchMigrations
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);