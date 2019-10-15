import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchMigrations } from '../actions/migration-actions';
import _ from 'lodash';
import placeholder from '../assets/placeholder.svg';
import migrationSchema from "../infrastructure/types/Migration-schema";

class MigrationList extends Component {
    componentDidMount() {
        this.props.fetchMigrations();
    }

    renderMigrations() {
        return _.map(this.props.migrations, (migration) => {
            const m = migrationSchema.parse(migration);
            if (m) {
                return (
                    <li className="list-group-item" key={m.id}>
                        <div className="media">
                            <img className="mr-3" src={placeholder} alt="Generic placeholder"/>
                            <div className="media-body">
                                <h5 className="mt-0">{m.name}</h5>
                                <span> <strong>ID: </strong> {m.id}</span>
                                <span> <strong>NAME: </strong> {m.name}</span>
                                <span> <strong>SOURCE HOST NAME: </strong> {m.sourceHostName}</span>
                                <span> <strong>SOURCE DB: </strong> {m.sourceDB}</span>
                                <span> <strong>DEST NAME: </strong> {m.destName}</span>
                                <span> <strong>DEST DB: </strong> {m.destDB}</span>
                                <span> <strong>PHASE: </strong> {m.phase}</span>
                                <span> <strong>TARGET DATE: </strong> {m.targetDate}</span>
                                <span> <strong>CREATED: </strong> {m.createdDate}</span>

                                <Link to={ "/migration/details/" + m.id }> Details </Link>
                            </div>
                        </div>
                    </li>
                );
            } //TODO: Here we can make sure all object are valid. We can force a retry if not all objects are good
        });
    }

    render() {
        return (
            <div>
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
                <ul className="list-group">
                    { this.renderMigrations() }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { migrations: state.migrations };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchMigrations
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MigrationList);