import React, { Component } from 'react';
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle

} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Card, Button, Input, Select, DatePicker, Row, Col, Modal } from 'antd'
import 'antd/dist/antd.css';
import {
	WhatsappShareButton,
	WhatsappIcon
} from "react-share";
import { Helmet } from "react-helmet";
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
                dataField: 'tags',
                text: 'Tags',
                sort: true
            },
            {
                dataField: 'link',
                text: 'Action',
                formatter: this.actionFormatUser.bind(this)
            }
        ]

        this.state = {
            dateFormat: 'YYYY-MM-DD',
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
            isEdit: false,
            editData: {},
            show: false,
            tags: ['default tag']

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validation = this.validation.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    actionFormatUser(rowContent, row) {

        return (
            <div>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle className="bg-light">&bull;	&bull;	&bull;</DropdownToggle>
                    <DropdownMenu>
                        <ul>
                            <li><button onClick={() => this.edit(row)}><i class="fa fa-check mr-2"></i><span>Edit</span></button></li>
                            <li><button onClick={() => this.delete(row)}><i class="fa fa-check mr-2"></i><span>Delete</span></button></li>
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
            editData: data,

        })
    }

    delete(data) {
        const { todo_list } = this.state;
        todo_list.map((item, index) => {
            if (item.id === data.id) {
                todo_list.splice(index, 1);
            }
        })
        this.setState({ todo_list })
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
        const { todo_list, editData, isEdit, tags } = this.state;
        let isSubmit = this.validation();
        let data = new Object();
        let todos = ''
        tags.map(item => {
            console.info('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', item)
            todos = todos.concat(item+', ')
        })
        data = {
            id: todo_list.length + 1,
            title: this.state.title,
            description: this.state.description,
            due_date: this.state.due_date,
            status: this.state.status,
            timestamp: new Date().toLocaleString('en-IN'),
            tags: todos
        }
        console.info('dddddddddddddd', data)
        if (isSubmit) {
            if (isEdit) {
                todo_list.map((item, index) => {
                    if (item.id === editData.id) {
                        todo_list[index] = data;
                    }
                });
            } else {
                todo_list.push(data);
            }
            this.setState({ title_error: '', description_error: '', status_error: '', isEdit: false })
            this.setState({ todo_list });
            this.setState({ title: '', description: '', due_date: '', status: '' })

        }
    }

    switchEl(el, id) {
        const { todo_list } = this.state;
        if (todo_list.el && todo_list[el].includes(id)) todo_list[el] = todo_list[el].filter(r => r !== id);
        else todo_list[el].push(id);
        this.setState({ todo_list });
    }
    handleSelect(value) {
        const { tags } = this.state;
        this.setState({ status: value, tags })
    }
    handleDateSelect(date, stringDate) {
        console.info(stringDate)
        this.setState({ due_date: stringDate })
    }
    showModal() {
        this.setState({ show: true })
    }
    handleCancel() {
        this.setState({ show: false })
    }

    handleOk() {
        const { tags, tag } = this.state;
        if (!tags.includes(tag)) tags.push(tag)
        this.setState({ tags })
        this.setState({ show: false })
    }

    render() {
        const { title_error, description_error, status_error, todo_list, show, tags } = this.state;
        const { TextArea } = Input;
        const { Option } = Select;
        return (
            <div style={{ backgroundColor: 'Lavender' }}>
	        <WhatsappShareButton
                    url={'https://anubhav-todo-list-demo.netlify.app'}
                    quote={'ssdsdsdsd'}
			title={`Ritu's First  Todo List`}
                    	description={`Ritu's First  Todo List`}
                    hashtag={'#ssdsdsdsd'}
                ><WhatsappIcon /></WhatsappShareButton>
                <Row style={{ backgroundColor: 'DarkGrey' }}>
                    <Col span={24}><h2 style={{ color: 'white' }}>{`Ritu's First  Todo List`}</h2></Col>
                </Row>
                <Modal title="Basic Modal" visible={show} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Input
                        maxLength='100'
                        onChange={e => this.setState({ tag: e.target.value })}
                    />
                </Modal>
                <div style={{ padding: '30px', display: 'flex' }}>

                    <div style={{ width: '30%' }}>
                        <Card title="Create List" style={{ width: 400 }}>
                            <Row>
                                <form>
                                    <Col>
                                        <div>
                                            <span>Title: </span>
                                            <Input type="text"
                                                maxLength='100'
                                                value={this.state.title && this.state.title}
                                                onChange={e => this.setState({ title: e.target.value })}
                                            />
                                            <small style={{ color: 'red' }}>{title_error}</small>
                                        </div>
                                    </Col>
                                    <br />
                                    <Col>
                                        <div>
                                            <span>Description: </span>
                                            <TextArea class="form-control" type="text"
                                                maxLength='1000'
                                                value={this.state.description && this.state.description}
                                                onChange={e => this.setState({ description: e.target.value })}
                                            />
                                            <small style={{ color: 'red' }}>{description_error}</small>
                                        </div>
                                    </Col>
                                    <br />
                                    <Col>
                                        <div>
                                            <span>Due date: </span>
                                            <br />
                                            <DatePicker
                                                style={{ width: 350 }}
                                                defaultValue={this.state.due_date && ''}
                                                onChange={this.handleDateSelect}
                                            />
                                            <small style={{ color: 'red' }}></small>
                                        </div>
                                    </Col>
                                    <br />
                                    <Col>
                                        <span>Tag </span><Button size='small' type="primary" onClick={this.showModal}>+</Button>
                                        <br />
                                        <br />
                                        <Select
                                            mode="multiple"
                                            placeholder="Select a tag"
                                            style={{ width: 350 }}
                                            onChange={this.handleSelect}
                                        >
                                            {tags.map(item => {
                                                return <Option value={item}>{item}</Option>
                                            })}
                                        </Select>
                                    </Col>
                                    <br />
                                    <Col>
                                        <div>
                                            <span>Status </span>
                                            <br />
                                            <Select
                                                placeholder="Select a status"
                                                style={{ width: 350 }}
                                                onChange={this.handleSelect}
                                            >
                                                <Option value="">SELECT</Option>
                                                <Option value="OPEN">OPEN</Option>
                                                <Option value="WORKING">WORKING</Option>
                                                <Option value="DONE">DONE</Option>
                                                <Option value="OVERDUE">OVERDUE</Option>
                                            </Select>
                                            <small style={{ color: 'red' }}>{status_error}</small>
                                        </div>
                                    </Col>
                                </form>
                            </Row>
                            <br />
                            <Button type="primary" onClick={this.handleSubmit}>Button</Button>
                        </Card>

                    </div>
                    <div style={{ width: '68%' }}>
                        <div className="mb-4">
                            <Card title="TODO List">
                                <BootstrapTable keyField='id' columns={this.columns} data={todo_list}
                                    hover wrapperClasses="table-responsive custom-table"
                                    condensed noDataIndication="No list"
                                    tabIndexCell pagination={paginationFactory()} />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ActiveEvents;
