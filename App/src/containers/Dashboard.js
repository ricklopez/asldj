import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { Link } from 'react-router-dom';
import { fetchMigrations } from '../actions/migration-actions';
//import _ from 'lodash';
import MigrationList from './Migration-List';
import logo from '../logo.svg';
import AppHeader from '../components/header';

class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchMigrations();
    }

    render() {
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
                                <MigrationList></MigrationList>
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
        fetchMigrations
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);