import React, { useEffect, useState } from 'react';

const AddProductionProcessTaskFormModal = ({ closeModal }) => {
  const [productionProcessName, setProductionProcessName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
      const reqBody = {
          name: productionProcessName
        }; 
      try {
          const response = await fetch("/productionProcess", {
              headers: {
                "Content-Type": "application/json",
              },
              method: "post",
              body: JSON.stringify(reqBody),
            })
          
          if(response.status === 200) {
              const data = await response.json();
              alert('Dodano pomyślnie!');
            } else if(response.status === 409) {
              const data = await response.json();
              setError("Błąd autoryzacji, zaloguj się ponownie!");
            } else {
              throw new Error();
            }
            
      } catch(error) {
          console.log(error);
          setError('An error occurred, please try again later.')
      }
      closeModal(); // Close the modal after form submission
    }

  return (
    <div>
      <h2>Form Modal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
                  type="text"
                  name="productionProcessName"
                  placeholder='Nazwa procesu produkcyjnego'
                  value={productionProcessName}
                  onChange={event => setProductionProcessName(event.target.value)}
                />
        </label>
        <br />
              {error && <div className="login-error" style={{ color: 'red' }}>{error}</div>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductionProcessTaskFormModal;