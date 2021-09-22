import React, { Component } from 'react';
import {
    Card, CardHeader, CardBody,
    Row,
    Col

} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
class ActiveEvents extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                dataField: 'id',
                text: 'ID',
            },
            {
                dataField: 'title',
                text: 'Title',
            },
            {
                dataField: 'description',
                text: 'Description',
            },
            {
                dataField: 'due_date:',
                text: 'Due Date:',
            },
            {
                dataField: 'status',
                text: 'Status',
            },
            {
                dataField: 'Timestamp',
                text: 'Created On',
            },
        ]

        this.state = {
            data: {},
            todo_list: [],
            title_error: '',
            description_error: '',
            status_error: '',

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validation = this.validation.bind(this);


    }

    handleChange(key, value) {
        const { data } = this.state;
        data[key] = value;
        console.info(data);
        this.setState({ data, title_error: '', description_error: '', status_error: '' });
    }

    validation(list) {
        let flag = true;
        if (list.title == '' || !list.title) {
            flag = false;
            this.setState({title_error: 'Title is required!'})
        }
        if (list.description == '' || !list.description) {
            flag = false;
            this.setState({description_error: 'Description is required!'})
        }
        if (list.status == '' || !list.status) {
            flag = false;
            this.setState({status_error: 'Status is required!'})
        }
        return flag
    }

    handleSubmit() {
        const { data, todo_list } = this.state;
        let isSubmit = this.validation(data);
        console.info(isSubmit);
        if (isSubmit) {
            todo_list.push(data);
            console.info(todo_list)
            this.setState({ todo_list });
        }
    }

    render() {
        const { title_error, description_error, status_error } = this.state;
        return (
            <div style={{ padding: '10px' }}>
                <div style={{ width: '30%' }}>
                    <Card>
                        <CardHeader></CardHeader>
                        <CardBody></CardBody>
                    </Card>
                    <Row>
                        <form id="create-form">
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Title: </span>
                                    <input class="form-control" type="text"
                                        onChange={e => this.handleChange('title', e.target.value)}
                                    />
                                    <small style={{ color: 'red' }}>{title_error}</small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Description: </span>
                                    <input class="form-control" type="text"
                                        onChange={e => this.handleChange('description', e.target.value)}
                                    />
                                    <small style={{ color: 'red' }}>{description_error}</small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Due date: </span>
                                    <input class="form-control" type="text"
                                        onChange={e => this.handleChange('due_date', e.target.value)}
                                    />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Tag </span>
                                    <input class="form-control" type="text"
                                        onChange={e => this.handleChange('title', e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Created On </span>
                                    <input class="form-control" type="date"
                                        onChange={e => this.handleChange('Timestamp', e.target.value)}
                                    />
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Status </span>
                                    <select class="form-control" type="text"
                                        onChange={e => this.handleChange('status', e.target.value)}
                                    >
                                        <option>OPEN</option>
                                        <option>WORKING</option>
                                        <option>DONE</option>
                                        <option>OVERDUE</option>
                                    </select>
                                    <small style={{ color: 'red' }}>{status_error}</small>
                                </div>
                            </Col>
                        </form>
                    </Row>
                    <button className="btn btn-primary btn-sm radius-md" onClick={() => this.handleSubmit()}><span>Submit</span></button>
                </div>
                <div>
                </div>
            </div>
        )
    }
}

export default ActiveEvents;