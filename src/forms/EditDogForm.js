import React, { useState, useEffect } from 'react'

const EditDogForm = props => {
  const [ dog, setDog ] = useState(props.currentDog)

  useEffect(
    () => {
      setDog(props.currentDog)
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target
    setDog({ ...dog, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.updateDog(dog.id, dog)
      }}
    >
      <label>Breed</label>
      <input type="text" name="breed" value={dog.breed} onChange={handleInputChange} />
      <label>Nick</label>
      <input type="text" name="nick" maxlength="10" value={dog.nick} onChange={handleInputChange} />
      <label>Price</label>
      <input type="number" name="price" value={dog.price} onChange={handleInputChange} />
      <label>Image</label>
      <input type="text" name="url" value={dog.url} onChange={handleInputChange} />
      <button>Update</button>
      <button onClick={() => props.setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  )
}

export default EditDogForm