import React, { Component } from 'react';
import {
    Card, CardHeader, CardBody,
    Row,
    Col

} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
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
                dataField: 'timestamp',
                text: 'Created On',
            },
        ]

        this.state = {
            title: '',
            description: '',
            due_date: '',
            timestamp: '',
            status: '',

            data: {},
            todo_list: [],
            title_error: '',
            description_error: '',
            status_error: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validation = this.validation.bind(this);


    }


    validation() {
        let flag = true;
        if (this.state.title === '') {
            flag = false;
            this.setState({title_error: 'Title is required!'})
        }
        if (this.state.description === '') {
            flag = false;
            this.setState({description_error: 'Description is required!'})
        }
        if (this.state.status === '') {
            flag = false;
            this.setState({status_error: 'Status is required!'})
        }
        return flag
    }

    handleSubmit() {
        const { todo_list } = this.state;
        let isSubmit = this.validation();
        let data = {
            id: todo_list.length + 1,
            title: this.state.title,
            description: this.state.description,
            due_date: this.state.due_date,
            status: this.state.status,
            timestamp: new Date()
        }
        console.info('isSubmit', isSubmit);
        if (isSubmit) {
            todo_list.push(data);
            this.setState({ title_error: '', description_error: '', status_error: '' })
            console.info(todo_list);
            this.setState({ todo_list });

        }
    }

    render() {
        const { title_error, description_error, status_error, todo_list} = this.state;
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
                                    
                                    <input type="text" class="form-control"
                                        maxLength='100'
                                        onChange={e => this.setState({title: e.target.value})}
                                    />
                                    <small style={{ color: 'red' }}>{title_error}</small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Description: </span>
                                    <textarea class="form-control" type="text"
                                        maxLength='1000'
                                        onChange={e => this.setState({description: e.target.value})}
                                    />
                                    <small style={{ color: 'red' }}>{description_error}</small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Due date: </span>
                                    <input class="form-control" type="date"
                                        onChange={e => this.setState({due_date: e.target.value})}
                                    />
                                    <small style={{ color: 'red' }}></small>
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Tag </span>
                                    <input class="form-control" type="text"
                                        onChange={e => this.setState({title: e.target.value})}
                                    />
                                </div>
                            </Col>
                            <Col id="spaces" md="8">
                                <div className="form-group mb-2">
                                    <span>Status </span>
                                    <select class="form-control" type="text"
                                        onChange={e => this.setState({status: e.target.value})}
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
                    <ToolkitProvider keyField="admin_id" data={todo_list} columns={this.columns} search>
                        {
                            props => (

                                <div className="mb-4">
                                    <Card>
                                        <CardHeader><span className="font-18 d-inline-block mt-2">User List</span></CardHeader>
                                        <CardBody className="p-2">
                                            <BootstrapTable {...props.baseProps}
                                                hover wrapperClasses="table-responsive custom-table"
                                                condensed noDataIndication="No todo list"
                                                tabIndexCell pagination={paginationFactory()} />
                                        </CardBody>
                                    </Card>
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>
            </div>
        )
    }
}

export default ActiveEvents;