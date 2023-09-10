// import React, { useState } from 'react';
// import './Dashboard.css';

// function Dashboard() {
//   const [selectedType, setSelectedType] = useState('');
//   const [imsiInput, setImsiInput] = useState('');
//   const [proceedClicked, setProceedClicked] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState({
//     SMF: false,
//     AMF: false,
//     PCF: false,
//     N1: false,
//     N2: false,
//     N4: false,
//     N7: false,
//     N10: false,
//     N11: false,
//     N16: false,
//     N40: false,
//   });

//   const [selectAllN, setSelectAllN] = useState(false);

//   const [variableString, setVariableString] = useState('');
  
//   // State to store user-entered numbers for N checkboxes
//   const [userEnteredNumbers, setUserEnteredNumbers] = useState({
//     N1: '',
//     N2: '',
//     N4: '',
//     N7: '',
//     N10: '',
//     N11: '',
//     N16: '',
//     N40: '',
//   });

//   const handleTypeChange = (event) => {
//     setSelectedType(event.target.value);
//     setSelectedOptions({
//       SMF: false,
//       AMF: false,
//       PCF: false,
//       N1: false,
//       N2: false,
//       N4: false,
//       N7: false,
//       N10: false,
//       N11: false,
//       N16: false,
//       N40: false,
//     });
//     setImsiInput('');
//     setProceedClicked(false);
//     setSelectAllN(false);
//     setVariableString('');
//   };

//   const handleImsiInputChange = (event) => {
//     setImsiInput(event.target.value);
//   };

//   const handleProceedClick = () => {
//     if (imsiInput.trim() !== '') {
//       setProceedClicked(true);
//     }
//   };

//   const handleCheckBoxChange = (event) => {
//     const { name, checked } = event.target;
//     setSelectedOptions({ ...selectedOptions, [name]: checked });

//     if (name === 'SMF' && checked) {
//       // If SMF is selected, show the N checkboxes
//       setSelectedOptions((prevOptions) => ({
//         ...prevOptions,
//         N1: false,
//         N2: false,
//         N4: false,
//         N7: false,
//         N10: false,
//         N11: false,
//         N16: false,
//         N40: false,
//       }));
//     }
//   };

//   const handleSelectAllN = () => {
//     const newSelectedOptions = { ...selectedOptions };
//     for (const key in newSelectedOptions) {
//       if (key.startsWith('N')) {
//         newSelectedOptions[key] = !selectAllN;
//       }
//     }
//     setSelectedOptions(newSelectedOptions);
//     setSelectAllN(!selectAllN);
//   };

//   const handleUserEnteredNumber = (event, checkboxName) => {
//     const { value } = event.target;
//     setUserEnteredNumbers({ ...userEnteredNumbers, [checkboxName]: value });
//   };
  
//   const appendUserEnteredNumber = (checkboxName) => {
//     const num = userEnteredNumbers[checkboxName].trim();
//     if (num !== '') {
//       // Create a regex pattern to match the existing checkbox value in the variableString
//       const regexPattern = new RegExp(`\\.${checkboxName}\\.[^.$]*`);
  
//       // Replace any existing value for the checkbox with the new one
//       const updatedVariableString = variableString.replace(regexPattern, `.${checkboxName}.${num}`);
  
//       setVariableString(updatedVariableString);
//       setUserEnteredNumbers({ ...userEnteredNumbers, [checkboxName]: '' });
//     }
//   };
  
  
//   const generateVariableString = () => {
//     const selectedTypes = [];
  
//     if (selectedOptions.SMF) selectedTypes.push('SMF');
//     if (selectedOptions.AMF) selectedTypes.push('AMF');
//     if (selectedOptions.PCF) selectedTypes.push('PCF');
  
//     let variableString = '';
  
//     if (selectedType === 'Sub Based Tracing') {
//       if (imsiInput.trim() !== '') {
//         variableString += imsiInput + '$'; // Add user input followed by '$'
//       }
//       if (selectedTypes.length > 0) {
//         // Join selected types with '.' for Sub Based Tracing
//         variableString += selectedTypes.join('.');
//       }
//     } else if (selectedType === 'NF Bases Tracing') {
//       // For NF Bases Tracing, include selected checkboxes directly
//       if (selectedTypes.length > 0) {
//         variableString += selectedTypes.join('.');
//       }
//     }
  
//     // Append '$' between the selected types and N checkboxes
//     if (
//       variableString &&
//       (selectedOptions.N1 ||
//         selectedOptions.N2 ||
//         selectedOptions.N4 ||
//         selectedOptions.N7 ||
//         selectedOptions.N10 ||
//         selectedOptions.N11 ||
//         selectedOptions.N16 ||
//         selectedOptions.N40)
//     ) {
//       variableString += '$';
//     }
  
//     const selectedNTypes = [];
  
//     if (selectedOptions.N1) selectedNTypes.push('N1');
//     if (selectedOptions.N2) selectedNTypes.push('N2');
//     if (selectedOptions.N4) selectedNTypes.push('N4');
//     if (selectedOptions.N7) selectedNTypes.push('N7');
//     if (selectedOptions.N10) selectedNTypes.push('N10');
//     if (selectedOptions.N11) selectedNTypes.push('N11');
//     if (selectedOptions.N16) selectedNTypes.push('N16');
//     if (selectedOptions.N40) selectedNTypes.push('N40');
  
//     // Join selected N types with '.' for both Sub and NF Based Tracing
//     if (selectedNTypes.length > 0) {
//       variableString += selectedNTypes.join('.');
//     }
  
//     return variableString;
//   };

//   const handleSubmission = () => {
//     const variableString = generateVariableString();

//     // Retrieve existing variableStrings from local storage
//     const existingVariableStrings = JSON.parse(localStorage.getItem('variableStrings')) || [];

//     // Add the new value to the array of variable strings
//     const updatedVariableStrings = [...existingVariableStrings, variableString];

//     // Store the updated array of variable strings in local storage
//     localStorage.setItem('variableStrings', JSON.stringify(updatedVariableStrings));

//     // Update the variableString state
//     setVariableString('');

//     // You can also display a success message to the user or perform other actions as needed.
//     alert('Variable string has been stored in local storage.');
//   };

//   const showAllCheckbox = selectedOptions.SMF || selectedOptions.AMF || selectedOptions.PCF;

//   return (
//     <div className="tbaas-container">
//       <p className="instruction">Please select a type.</p>
//       <div>
//         <label>
//           <input
//             type="radio"
//             value="Sub Based Tracing"
//             checked={selectedType === 'Sub Based Tracing'}
//             onChange={handleTypeChange}
//           />
//           Sub Based Tracing
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="NF Bases Tracing"
//             checked={selectedType === 'NF Bases Tracing'}
//             onChange={handleTypeChange}
//           />
//           NF Bases Tracing
//         </label>
//       </div>
//       {selectedType === 'Sub Based Tracing' && (
//         <div>
//           <input
//             type='text'
//             placeholder='Enter IMSI'
//             value={imsiInput}
//             onChange={handleImsiInputChange}
//           />
//           <button onClick={handleProceedClick}>Proceed</button>
//         </div>
//       )}
//       {(selectedType === 'NF Bases Tracing' || (selectedType === 'Sub Based Tracing' && proceedClicked)) && (
//         <div className='horizontal-checkboxes'>
//           <div className='Making_nf_horizontal'>
//             <label>
//               <input
//                 type='checkbox'
//                 name='SMF'
//                 checked={selectedOptions.SMF}
//                 onChange={handleCheckBoxChange}
//               />
//               SMF
//             </label>
//             <label>
//               <input
//                 type='checkbox'
//                 name='AMF'
//                 checked={selectedOptions.AMF}
//                 onChange={handleCheckBoxChange}
//               />
//               AMF
//             </label>
//             <label>
//               <input
//                 type='checkbox'
//                 name='PCF'
//                 checked={selectedOptions.PCF}
//                 onChange={handleCheckBoxChange}
//               />
//               PCF
//             </label>
//           </div>
//           <div className={`checkbox-group ${selectedOptions.SMF ? 'show' : ''}`}>
//             {Object.keys(selectedOptions).map((key) => {
//               if (key.startsWith('N')) {
//                 return (
//                   <div key={key} className='checkbox-input-group'>
//                     <label>
//                       <input
//                         type='checkbox'
//                         name={key}
//                         checked={selectedOptions[key]}
//                         onChange={handleCheckBoxChange}
//                       />
//                       {key}
//                     </label>
//                     {selectedOptions[key] && (
//                       <div className='user-input'>
//                         <input
//                           type='text'
//                           placeholder='Enter'
//                           onChange={(event) => handleUserEnteredNumber(event, key)}
//                           value={userEnteredNumbers[key]}
//                           onKeyPress={(event) => {
//                             if (event.key === 'Enter') {
//                               appendUserEnteredNumber(key);
//                             }
//                           }}
//                         />
//                         <button onClick={() => appendUserEnteredNumber(key)}>Enter</button>
//                       </div>
//                     )}
//                   </div>
//                 );
//               }
//               return null;
//             })}
//             {/* Conditionally render the "All" checkbox */}
//             {showAllCheckbox && (
//               <label>
//                 <input
//                   type='checkbox'
//                   name='All'
//                   checked={selectAllN}
//                   onChange={handleSelectAllN}
//                 />
//                 All
//               </label>
//             )}
//             <div className='variable-string'>
//               Variable String: {generateVariableString()}
//             </div>

//             {/* Add the submit button */}
//             <button onClick={handleSubmission}>Submit</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;





















import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [selectedType, setSelectedType] = useState('');
  const [imsiInput, setImsiInput] = useState('');
  const [proceedClicked, setProceedClicked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    SMF: false,
    AMF: false,
    PCF: false,
    N1: false,
    N2: false,
    N4: false,
    N7: false,
    N10: false,
    N11: false,
    N16: false,
    N40: false,
  });

  const [selectAllN, setSelectAllN] = useState(false);

  const [variableString, setVariableString] = useState('');

  const [enteredNumber, setEnteredNumber] = useState('');

  // State to store user-entered numbers for N checkboxes
  const [userEnteredNumbers, setUserEnteredNumbers] = useState({
    N1: '',
    N2: '',
    N4: '',
    N7: '',
    N10: '',
    N11: '',
    N16: '',
    N40: '',
  });

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedOptions({
      SMF: false,
      AMF: false,
      PCF: false,
      N1: false,
      N2: false,
      N4: false,
      N7: false,
      N10: false,
      N11: false,
      N16: false,
      N40: false,
    });
    setImsiInput('');
    setProceedClicked(false);
    setSelectAllN(false);
    setVariableString('');
  };

  const handleImsiInputChange = (event) => {
    setImsiInput(event.target.value);
  };

  const handleProceedClick = () => {
    if (imsiInput.trim() !== '') {
      setProceedClicked(true);
    }
  };

  const handleCheckBoxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedOptions({ ...selectedOptions, [name]: checked });
  };

  const handleSelectAllN = () => {
    const newSelectedOptions = { ...selectedOptions };
    for (const key in newSelectedOptions) {
      if (key.startsWith('N')) {
        newSelectedOptions[key] = !selectAllN;
      }
    }
    setSelectedOptions(newSelectedOptions);
    setSelectAllN(!selectAllN);
  };

  const handleUserEnteredNumber = (event, checkboxName) => {
    const { value } = event.target;
    setEnteredNumber(value); // Update the entered number state
  };
  
  const appendUserEnteredNumber = (checkboxName) => {
    const num = enteredNumber.trim(); // Use the enteredNumber state here
    if (num !== '' && selectedOptions[checkboxName]) {
      const newVariableString = `${variableString}.${checkboxName}.${num}`;
      setVariableString(newVariableString);
      setUserEnteredNumbers({ ...userEnteredNumbers, [checkboxName]: num }); // Update the corresponding userEnteredNumbers value
      setEnteredNumber(''); // Clear the entered number state
    }
  };

  const generateVariableString = () => {
    const selectedTypes = [];

    if (selectedOptions.SMF) selectedTypes.push('SMF');
    if (selectedOptions.AMF) selectedTypes.push('AMF');
    if (selectedOptions.PCF) selectedTypes.push('PCF');

    let variableString = '';

    if (selectedType === 'Sub Based Tracing') {
      if (imsiInput.trim() !== '') {
        variableString += imsiInput + '$'; // Add user input followed by '$'
      }
      if (selectedTypes.length > 0) {
        // Join selected types with '.' for Sub Based Tracing
        variableString += selectedTypes.join('.');
      }
    } else if (selectedType === 'NF Bases Tracing') {
      // For NF Bases Tracing, include selected checkboxes directly
      if (selectedTypes.length > 0) {
        variableString += selectedTypes.join('.');
      }
    }

    // Append '$' between the selected types and N checkboxes
    if (variableString && (selectedOptions.N1 || selectedOptions.N2 || selectedOptions.N4 || selectedOptions.N7 || selectedOptions.N10 || selectedOptions.N11 || selectedOptions.N16 || selectedOptions.N40)) {
      variableString += '$';
    }

    const selectedNTypes = [];

    if (selectedOptions.N1) selectedNTypes.push('N1');
    if (selectedOptions.N2) selectedNTypes.push('N2');
    if (selectedOptions.N4) selectedNTypes.push('N4');
    if (selectedOptions.N7) selectedNTypes.push('N7');
    if (selectedOptions.N10) selectedNTypes.push('N10');
    if (selectedOptions.N11) selectedNTypes.push('N11');
    if (selectedOptions.N16) selectedNTypes.push('N16');
    if (selectedOptions.N40) selectedNTypes.push('N40');

    // Join selected N types with '.' for both Sub and NF Based Tracing
    if (selectedNTypes.length > 0) {
      variableString += selectedNTypes.join('.');
    }

    // Append user-entered numbers to the variableString
    for (const key in userEnteredNumbers) {
      const num = userEnteredNumbers[key].trim();
      if (num !== '' && selectedOptions[key]) {
        variableString += `.${key}.${num}`;
      }
    }

    return variableString;
  };

  const handleSubmission = () => {
    const variableString = generateVariableString();

    // Retrieve existing variableStrings from local storage
    const existingVariableStrings = JSON.parse(localStorage.getItem('variableStrings')) || [];

    // Add the new value to the array of variable strings
    const updatedVariableStrings = [...existingVariableStrings, variableString];

    // Store the updated array of variable strings in local storage
    localStorage.setItem('variableStrings', JSON.stringify(updatedVariableStrings));

    // Clear the user-entered numbers and reset the variable string
    setUserEnteredNumbers({
      N1: '',
      N2: '',
      N4: '',
      N7: '',
      N10: '',
      N11: '',
      N16: '',
      N40: '',
    });
    setVariableString('');

    // You can also display a success message to the user or perform other actions as needed.
    alert('Variable string has been stored in local storage.');
  };

  const showAllCheckbox = selectedOptions.SMF || selectedOptions.AMF || selectedOptions.PCF;

  return (
    <div className='tbaas-container'>
      <p className='instruction'>Please select a type.</p>
      <div>
        <label>
          <input
            type='radio'
            value='Sub Based Tracing'
            checked={selectedType === 'Sub Based Tracing'}
            onChange={handleTypeChange}
          />
          Sub Based Tracing
        </label>
        <label>
          <input
            type='radio'
            value='NF Bases Tracing'
            checked={selectedType === 'NF Bases Tracing'}
            onChange={handleTypeChange}
            />
            NF Bases Tracing
          </label>
        </div>
        {selectedType === 'Sub Based Tracing' && (
          <div>
            <input
              type='text'
              placeholder='Enter IMSI'
              value={imsiInput}
              onChange={handleImsiInputChange}
            />
            <button onClick={handleProceedClick}>Proceed</button>
          </div>
        )}
        {(selectedType === 'NF Bases Tracing' || (selectedType === 'Sub Based Tracing' && proceedClicked)) && (
          <div className='horizontal-checkboxes'>
            <div className='Making_nf_horizontal'>
              <label>
                <input
                  type='checkbox'
                  name='SMF'
                  checked={selectedOptions.SMF}
                  onChange={handleCheckBoxChange}
                />
                SMF
              </label>
              <label>
                <input
                  type='checkbox'
                  name='AMF'
                  checked={selectedOptions.AMF}
                  onChange={handleCheckBoxChange}
                />
                AMF
              </label>
              <label>
                <input
                  type='checkbox'
                  name='PCF'
                  checked={selectedOptions.PCF}
                  onChange={handleCheckBoxChange}
                />
                PCF
              </label>
            </div>
            <div className={`checkbox-group ${selectedOptions.SMF ? 'show' : ''}`}>
              {Object.keys(selectedOptions).map((key) => {
                if (key.startsWith('N')) {
                  return (
                    <div key={key} className='checkbox-input-group'>
                      <label>
                        <input
                          type='checkbox'
                          name={key}
                          checked={selectedOptions[key]}
                          onChange={handleCheckBoxChange}
                        />
                        {key}
                      </label>
                      {selectedOptions[key] && (
                        <div>
                          <input
                            type='text'
                            placeholder='Enter'
                            onChange={(event) => handleUserEnteredNumber(event, key)}
                            value={enteredNumber} 
                          />
                          <button onClick={() => appendUserEnteredNumber(key)}>Enter</button>
                        </div>
                      )}

                    </div>
                  );
                }
                return null;
              })}
              {/* Conditionally render the "All" checkbox */}
              {showAllCheckbox && (
                <label>
                  <input
                    type='checkbox'
                    name='All'
                    checked={selectAllN}
                    onChange={handleSelectAllN}
                  />
                  All
                </label>
              )}
              <div className='variable-string'>
                Variable String: {generateVariableString()}
              </div>
              <button onClick={handleSubmission}>Submit</button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default Dashboard;
  
