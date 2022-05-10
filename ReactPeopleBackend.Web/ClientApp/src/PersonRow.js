import React from "react";

export default function PersonRow(props) {
    const { firstName, lastName, age } = props.person;
    const { onEditClick, onDeleteClick, isSetToDelete, onSetToDeleteChange } = props;

    return (
        <tr>
            <td>
                <input type="checkbox" className="form-control" 
                onChange={onSetToDeleteChange} checked={isSetToDelete}/>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                <button className="btn btn-danger" style={{ marginLeft: 10 }} onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>
    )
}