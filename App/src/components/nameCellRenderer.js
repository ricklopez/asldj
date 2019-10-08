import React, {Component} from "react";


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

export default class NameCellRenderer extends Component {

    render() {

        return (
            <select onChange={this.props.handleChange}>
                <option value="EO">Errors and Omissions</option>
                <option value="AUTOP">Personal Auto</option>
                <option value="BOP">Business Owners Policy</option>
                <option value="CGL">Commercial General Liability</option>
            </select>
        );
    }
}