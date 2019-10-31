import React, {Component} from "react";
import moment from 'moment';

export default class DateCellRender extends Component {

    render() {

        const dataDisplay = moment(this.props.value).format('MMMM Do YYYY, h:mm:ss a');
        return (
            <time> {dataDisplay}</time>
        );
    }
}

