import React, { Component } from 'react';
import {
    Card, CardHeader, CardBody,
    Row,
    Col,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle

} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
class ActiveEvents extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                dataField: 'id',
                text: 'ID',
                sort: true
            },
            {
                dataField: 'title',
                text: 'Title',
                sort: true
            },
            {
                dataField: 'description',
                text: 'Description',
                sort: true
            },
            {
                dataField: 'due_date',
                text: 'Due Date:',
                sort: true
            },
            {
                dataField: 'status',
                text: 'Status',
                sort: true
            },
            {
                dataField: 'link',
                text: 'Action',
                formatter: this.actionFormatUser.bind(this)
            }
        ]

        this.state = {
            title: '',
            description: '',
            due_date: '',
            timestamp: '',
            status: 'OPEN',

            data: {},
            todo_list: [],
            title_error: '',
            description_error: '',
            status_error: '',
            isEdit: false,
            editData: {} 

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validation = this.validation.bind(this);


    }

    actionFormatUser(rowContent, row) {

        return (
            <div>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle className="bg-light">&bull;	&bull;	&bull;</DropdownToggle>
                    <DropdownMenu>
                        <ul>
                            <li><button onClick={() => this.edit(row)}><i class="fa fa-check mr-2"></i><span>edit</span></button></li>
                        </ul>
                    </DropdownMenu>
                </UncontrolledDropdown>

            </div>
        );
    }

    edit(data) {

        this.setState({
            title: data.title,
            description: data.description,
            due_date: data.due_date,
            status: data.status,
            isEdit: true,
            editData: data
        })
    }

    validation() {
        let flag = true;
        if (this.state.title === '') {
            flag = false;
            this.setState({ title_error: 'Title is required!' })
        }
        if (this.state.description === '') {
            flag = false;
            this.setState({ description_error: 'Description is required!' })
        }
        if (this.state.status === '') {
            flag = false;
            this.setState({ status_error: 'Status is required!' })
        }
        return flag
    }

    handleSubmit() {
        const { todo_list, editData, isEdit } = this.state;
        let isSubmit = this.validation();
        let data = new Object();
        data = {
            id: todo_list.length + 1,
            title: this.state.title,
            description: this.state.description,
            due_date: this.state.due_date,
            status: this.state.status,
            timestamp: new Date().toLocaleString('en-IN'),
        }
        console.info('isSubmit', isSubmit);
        if (isSubmit) {
            if (isEdit) {
                todo_list.map((item, index) => {
                    if(item.id == editData.id) {
                        todo_list[index] = data;
                    }
                });
            } else {
                todo_list.push(data);
            }
            this.setState({ title_error: '', description_error: '', status_error: '' })
            this.setState({ todo_list });
            this.setState({ title: '', description: '', due_date: '', status: '' })

        }
    }

    render() {
        const { title_error, description_error, status_error, todo_list } = this.state;
        return (
            <div>
                <h2 style={{ textAlign: 'center' }}> TODO List </h2>
                <div style={{ padding: '10px', display: 'flex' }}>
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
                                            value={this.state.title && this.state.title}
                                            onChange={e => this.setState({ title: e.target.value })}
                                        />
                                        <small style={{ color: 'red' }}>{title_error}</small>
                                    </div>
                                </Col>
                                <Col id="spaces" md="8">
                                    <div className="form-group mb-2">
                                        <span>Description: </span>
                                        <textarea class="form-control" type="text"
                                            maxLength='1000'
                                            value={this.state.description && this.state.description}
                                            onChange={e => this.setState({ description: e.target.value })}
                                        />
                                        <small style={{ color: 'red' }}>{description_error}</small>
                                    </div>
                                </Col>
                                <Col id="spaces" md="8">
                                    <div className="form-group mb-2">
                                        <span>Due date: </span>
                                        <input class="form-control" type="date"
                                            value={this.state.due_date && this.state.due_date}
                                            onChange={e => this.setState({ due_date: e.target.value })}
                                        />
                                        <small style={{ color: 'red' }}></small>
                                    </div>
                                </Col>
                                <Col id="spaces" md="8">
                                    <div className="form-group mb-2">
                                        <span>Tag </span>
                                        <input class="form-control" type="text"
                                            onChange={e => this.setState({ title: e.target.value })}
                                        />
                                    </div>
                                </Col>
                                <Col id="spaces" md="8">
                                    <div className="form-group mb-2">
                                        <span>Status </span>
                                        <select class="form-control" type="text"
                                            value={this.state.status && this.state.status}
                                            onChange={e => this.setState({ status: e.target.value })}
                                        >
                                            <option value=''>SELECT</option>
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
                        <button className="btn btn-primary btn-sm radius-md" onClick={this.handleSubmit}><span>Submit</span></button>
                    </div>
                    <div style={{ width: '68%' }}>
                        <div className="mb-4">
                            <Card>
                                <CardHeader><span className="font-18 d-inline-block mt-2"> TODO List </span></CardHeader>
                                <CardBody className="p-2">
                                    <BootstrapTable keyField='id' columns={this.columns} data={todo_list}
                                        hover wrapperClasses="table-responsive custom-table"
                                        condensed noDataIndication="No list"
                                        tabIndexCell pagination={paginationFactory()} />
                                </CardBody>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ActiveEvents;