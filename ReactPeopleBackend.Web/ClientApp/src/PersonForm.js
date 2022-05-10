import React from "react";

export default function PersonForm(props) {
    const { firstName, lastName, age } = props.person;
    const { onTextChange, onAddClick, isUpdating, onUpdateClick, onCancelClick } = props;
    return (
        <div className="row" style={{marginBottom: 20}} >
            <div className="col-md-3">
                <input type="text" className="form-control" placeholder="First Name" name="firstName" 
                value={firstName} onChange={onTextChange} />
            </div>
            <div className="col-md-3">
                <input type="text" className="form-control" placeholder="Last Name" name="lastName"
                value={lastName} onChange={onTextChange}/>
            </div>
            <div className="col-md-3">
                <input type="text" className="form-control" placeholder="Age" name="age"
                value={age} onChange={onTextChange}/>
            </div>
            <div className="col-md-3">
                {!isUpdating ? 
                 <button className="btn btn-primary btn-block" onClick={onAddClick}>Add</button> :
                <div>
                <button className="btn btn-warning btn-block" onClick={onUpdateClick}>Update</button>
                <button className="btn btn-info btn-block" onClick={onCancelClick}>Cancel</button>
                </div>
                }
               
            </div>
        </div>)
}