import React, { useState } from 'react'

const AddDogForm = props => {
	const initialFormState = { id: null, breed: '', nick: '', price: '', url: '' }
	const [ dog, setDog ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target
		setDog({ ...dog, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!dog.breed || !dog.nick || !dog.price) return
				props.addDog(dog)
				setDog(initialFormState)
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
			<button>Add</button>
		</form>
	)
}

export default AddDogForm
