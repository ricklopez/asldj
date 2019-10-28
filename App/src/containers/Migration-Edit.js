import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {editMigration, fetchMigrations} from '../actions/migration-actions'
import { Link } from 'react-router-dom';
import CoreHeader from '../components/header'
import './Migration-New.css';
import moment from "moment";
const phase = {"label": "Phase", "multiple": false, "data": ['Phase One', 'Phase Two', 'Phase Three', 'Phase Four']};
const completed = {"label": "Completed", "multiple": false, "data": ['True','False']};
const tasks = {"label": "Tasks (select multiple)", "multiple": true, "data": ['A', 'B', 'C', 'D']};
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

class MigrationRequestNew extends Component {

    componentWillMount(nextProps) {
        const { change } = this.props;
        const values = this.props.initialValues;
        if (values !== null) {
            console.log(values);
            for (let item in values) {
                change(item, values[item]);

            }
            // change('migrationName', values.migrationName);
            // change('sourceHostName', values.sourceHostName);
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     const { change } = this.props;
    //     const values = nextProps.initialValues;
    //     if (values !== null) {
    //         console.log(values);
    //         change('migrationName', values.migrationName);
    //         change('sourceHostName', values.sourceHostName);
    //     }
    // }

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
        // console.log(field);
        if (field.type === 'date')
            field.input.value = moment(field.input.value).format('YYYY-MM-DD');
        const { meta: {touched, error }} = field;
        const className = `form-group ${touched && error ? 'has-error' : ''}`;
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type = {field.type}
                    placeholder={field.placeholder}
                    {...field.input}
                />
                <div className="text-help">
                    { touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.editMigration(values, this.props.auth.token);
    }


    render() {
        const { handleSubmit } = this.props;
        if(this.props.initialValues.redirect)
            this.props.history.push(`/migrations/${this.props.initialValues.migrationId}`);
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
                            <h2 className="text-center">Edit Migration</h2>
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
    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a valid title. Must be at least 3 characters.";
    }
    if (!values.type) {
        errors.type = 'Enter a type';
    }

    // Return error state
    return errors;
}

const mapStateToProps = state => ({
    initialValues: state.migration,
    auth:state.auth
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        editMigration
    }, dispatch);
}

MigrationRequestNew = connect(
    mapStateToProps,
    mapDispatchToProps
)(MigrationRequestNew)

export default reduxForm({
    form: 'MigrationRequestEditForm' // Make sure this is unique
})(
    connect(mapStateToProps, mapDispatchToProps)(MigrationRequestNew)
);