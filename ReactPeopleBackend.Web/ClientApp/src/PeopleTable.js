import React from "react";
import axios from 'axios';
import PersonForm from "./PersonForm";
import PersonRow from "./PersonRow";

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isUpdating: false,
        selectedPeople: []
    }

    componentDidMount = async () => {
        await this.generateBody();
    }

    generateBody = async () => {
        const response = await axios.get('/api/home/getpeople');
        const people = response.data;
        this.setState({ people });
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onAddClick = () => {
        axios.post('/api/home/addperson', this.state.person).then(() => {
            axios.get('/api/home/getpeople').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    },
                });
            });
        });
    }

    onDeleteAllClick = async () => {
        await axios.post('/api/home/deleteall',  { ids: this.state.selectedPeople });
        await this.generateBody();
    }

    onDeleteClick = async person => {
        await axios.post('/api/home/delete', { person });
        this.generateBody();
    }

    onEditClick = person => {
        this.setState({ person });
        this.setState({ isUpdating: true });
    }

    onUpdateClick = () => {
        axios.post('/api/home/updateperson', this.state.person).then(() => {
            axios.get('/api/home/getpeople').then(res => {
                this.setState({
                    people: res.data,
                    person: {
                        firstName: '',
                        lastName: '',
                        age: ''
                    },
                    isUpdating: false
                });
            });
        });
    }

    onCancelClick = () => {
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            },
            isUpdating: false
        });
    }

onSetToDeleteChange = id => {
    const { selectedPeople } = this.state;
    let peopleToDelete;
    if (selectedPeople.includes(id)) {
        peopleToDelete = selectedPeople.filter(i => i !== id);
    } else {
        peopleToDelete = [...selectedPeople, id];
    }
    
    this.setState({ selectedPeople: peopleToDelete });
}

checkAll = () => {
    this.setState({ selectedPeople: this.state.people.map(p =>p.id) });
}

unCheckAll = () => {
    this.setState({ selectedPeople: [] });
}

    render() {
        const { firstName, lastName, age } = this.state.person;

        return (
            <div className='container mt-5'>
                <PersonForm
                    person={this.state.person}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isUpdating={this.state.isUpdating}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick}
                />

                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>
                                <button className="btn btn-danger btn-block" onClick={this.onDeleteAllClick}>Delete All</button>
                                <button className="btn btn-info btn-block" onClick={this.checkAll}>Check All</button>
                                <button className="btn btn-info btn-block" onClick={this.unCheckAll}>Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(p => 
                            <PersonRow 
                            key={p.id}
                            person={p}
                            onEditClick={() => this.onEditClick(p)}
                            onDeleteClick={() => this.onDeleteClick(p)}
                            isSetToDelete={this.state.selectedPeople.includes(p.id)}
                            onSetToDeleteChange={() => this.onSetToDeleteChange(p.id)}
                            />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PeopleTable;