import React from 'react'

const DogTable = props => (
  <table>
    <thead>
      <tr>
        <th>Breed</th>
        <th>Nick</th>
        <th>Price</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.dogs.length > 0 ? (
        props.dogs.map(dog => (
          <tr key={dog.id}>
            <td>{dog.breed}</td>
            <td>{dog.nick}</td>
            <td>{dog.price}</td>
              <td><img src={dog.url} width="150" height="100"></img></td>
            <td>
              <button
                onClick={() => {
                  props.editRow(dog)
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteDog(dog.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No data</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default DogTable
