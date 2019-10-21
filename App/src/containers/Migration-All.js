import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMigrations } from '../actions/migration-actions';

import AppHeader from '../components/header';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columns = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true},
    { field: 'name', headerName: 'Name', sortable: true, filter: true, editable:true},
    { field: 'complete', headerName: 'Complete', editable:true },
    { field: 'phase', headerName: 'Phase' },

    { field: 'sourceHostName', headerName: 'Source Host Name', editable:true  },
    { field: 'sourceDB', headerName: 'Source DB', editable:true },
    { field: 'sourceSchema', headerName: 'Source Schema', editable:true },
    { field: 'sourceXMLCount', headerName: 'Source XML Count' },
    { field: 'destName', headerName: 'Dest Name', editable:true },
    { field: 'destDB', headerName: 'Dest DB', editable:true },
    { field: 'destSchema', headerName: 'Dest Schema', editable:true },
    { field: 'destXMLCount', headerName: 'Dest XML Count' },
    { field: 'targetDate', headerName: 'Target Date', editable:true },
    { field: 'createdDate', headerName: 'Created' }
];


class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchMigrations({token: this.props.auth.token});
    }

    render() {
        const data = this.props.migrations || [];
        return (
            <div>
                <AppHeader></AppHeader>


                <div className="container my-5">
                    <div className="row">
                        <div className="col">
                            <h2>All Migrations</h2>
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