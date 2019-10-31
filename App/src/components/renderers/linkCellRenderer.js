import React, {Component} from "react";

export default class LinkCellRenderer extends Component {

    render() {

        return (
            <a className="text-primary" href={`/migrations/${this.props.value}`}>
                {this.props.value}
            </a>
        );
    }
}
