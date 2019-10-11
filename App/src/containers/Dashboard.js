import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { Link } from 'react-router-dom';
import { fetchMigrations } from '../actions/migration-actions';
import MigrationList from './Migration-List';
import logo from '../logo.svg';
import AppHeader from '../components/header';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {Link} from "react-router-dom";

const columns = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true},
    { field: 'name', headerName: 'Name', sortable: true, filter: true},
    { field: 'complete', headerName: 'Complete', sortable: true, filter: true },
    { field: 'phase', headerName: 'Phase', sortable: true, filter: true },

    { field: 'sourceHostName', headerName: 'Source Host Name', sortable: true, filter: true },
    { field: 'sourceDB', headerName: 'Source DB', sortable: true, filter: true },
    { field: 'sourceSchema', headerName: 'Source Schema', sortable: true, filter: true},
    { field: 'sourceXMLCount', headerName: 'Source XML Count', sortable: true, filter: true},
    { field: 'destName', headerName: 'Dest Name', sortable: true, filter: true },
    { field: 'destDB', headerName: 'Dest DB', sortable: true, filter: true},
    { field: 'destSchema', headerName: 'Dest Schema', sortable: true, filter: true},
    { field: 'destXMLCount', headerName: 'Dest XML Count', sortable: true, filter: true},
    { field: 'targetDate', headerName: 'Target Date', sortable: true, filter: true},
    { field: 'createdDate', headerName: 'Created', sortable: true, filter: true}
];

class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchMigrations();
    }

    render() {
        const data = this.props.migrations || [];
        return (
            <div>
                <AppHeader></AppHeader>
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="bg-dark">
                        <img src={logo} className="App-logo m-auto" alt="logo" />
                    </div>
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">
                                    <span data-feather="home"></span>
                                    Dashboard <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file"></span>
                                    Migrations
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="shopping-cart"></span>
                                    Mappings
                                </a>

                                <ul className="nav flex-column ml-2 mb-2">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <span data-feather="file-text"></span>
                                            LOB
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <span data-feather="file-text"></span>
                                            Payments Periods
                                        </a>
                                    </li>
                                </ul>
                            </li>

                        </ul>

                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <span>Reports</span>
                            <a className="d-flex align-items-center text-muted" href="#">
                                <span data-feather="plus-circle"></span>
                            </a>
                        </h6>

                    </div>
                </nav>
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div className="jumbotron"></div>

                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3> Migrations</h3>
                            </div>
                            <div className="col">
                                <div className="text-xs-right">
                                    <Link className="btn btn-outline-info float-right" to="/migration/new">
                                        Add a migration
                                    </Link>
                                </div>
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
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        migrations: state.migrations
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchMigrations,
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);