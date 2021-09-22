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
            todo_list: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, value) {
        const { data } = this.state;
        data[key] = value;
        console.info(data);
        this.setState({ data });
    }

    handleSubmit() {
        const { data, todo_list} = this.state;
        todo_list.push(data);
        console.info(todo_list)
        this.setState({todo_list});
    }

    render() {
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
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Desvription: </span>
                                    <input class="form-control" type="text"
                                        onChange={e => this.handleChange('description', e.target.value)}
                                    />
                                    <small style={{ color: 'red' }}></small>
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
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Created On </span>
                                    <input class="form-control" type="date"
                                        onChange={e => this.handleChange('Timestamp', e.target.value)}
                                    />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Status </span>
                                    <input class="form-control" type="text"
                                        onChange={e => this.handleChange('status', e.target.value)}
                                    />
                                    <small style={{ color: 'red' }}></small>
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