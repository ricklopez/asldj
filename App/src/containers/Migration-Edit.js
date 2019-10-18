import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createMigration } from '../actions/migration-actions'
import { Link } from 'react-router-dom';
import CoreHeader from '../components/header'
import './Migration-New.css';
const phase = {"label": "Phase", "multiple": false, "data": ['Phase One', 'Phase Two', 'Phase Three', 'Phase Four']};
const completed = {"label": "Completed", "multiple": false, "data": ['True','False']};
const tasks = {"label": "Tasks (select multiple)", "multiple": true, "data": ['A', 'B', 'C', 'D']};
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

class MigrationRequestNew extends Component {

    renderSelector(input, list){
        const { meta: {touched, error }} = input;
        return(
            <div className="form-group">
                <label>{list.label}</label>
                <select  {...input.input} className="form-control" {...input} >
                    {!list.multiple ?(
                        <option value="">Select a {list.label}...</option>
                    ) : (null)
                    }

                    {list.data.map((val) => <option value={val} key={val}>{val}</option>)}
                </select>
                <div className="text-help">
                    { touched ? error : ''}
                </div>
            </div>
        )};

    renderField(field) {
        const { meta: {touched, error }} = field;
        const className = `form-group ${touched && error ? 'has-error' : ''}`;
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type = {field.type}
                    {...field.input}
                />
                <div className="text-help">
                    { touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {

        this.props.createLoanRequest(values);
    }


    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <CoreHeader></CoreHeader>
                <div className="jumbotron jumbotron-fluid jumbotron-white">
                    <div className="container">
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-6">
                            <h2 className="text-center">Create New Migration</h2>
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <Field
                                    label="Name"
                                    name="migrationName"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Source Host Name"
                                    name="sourceHostName"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Source DB"
                                    name="sourceDb"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Source Schema"
                                    name="sourceSchema"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Source XML Count"
                                    name="sourceXmlCount"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Dest Host Name"
                                    name="destDbHostName"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Dest DB"
                                    name="destDb"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    label="Dest Schema"
                                    name="destSchema"
                                    type="text"
                                    component={this.renderField}
                                />
                                <Field
                                    name="isPhase1"
                                    component={(e) => this.renderSelector(e, phase)}
                                />
                                <Field
                                    name="isPhase4"
                                    component={(e) => this.renderSelector(e, completed)}
                                />
                                <Field
                                    label="Target Date"
                                    name="targetDate"
                                    type="date"
                                    component={this.renderField}
                                />

                                <button  className="btn btn-outline-info btn-lg btn-block" type="submit">Create Migration</button>
                                <Link to="/" className="btn btn-outline-danger btn-lg btn-block" >Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function validate(values){
    //Error State
    const errors = {};

    // Check Inputs with our custom validations
    if (!values.migrationName || values.migrationName.length < 3) {
        errors.migrationName = "Enter a valid title. Must be at least 3 characters.";
    }
    if (!values.type) {
        errors.type = 'Enter a type';
    }

    // Return error state
    return errors;
}

export default reduxForm({
    form: 'MigrationRequestNewForm' // Make sure this is unique
})(
    connect(null, {createLoanRequest: createMigration})(MigrationRequestNew)
);