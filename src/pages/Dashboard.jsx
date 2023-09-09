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

    return variableString;
  };

  const handleSubmission = () => {
    const variableString = generateVariableString();

    // Store the variable string in local storage
    localStorage.setItem('variableString', variableString);

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
          <div className={`checkbox-group ${selectedOptions.SMF ? 'show' : ''}`}>
            <label>
              <input
                type='checkbox'
                name='N1'
                checked={selectedOptions.N1}
                onChange={handleCheckBoxChange}
              />
              N1
            </label>
            <label>
              <input
                type='checkbox'
                name='N2'
                checked={selectedOptions.N2}
                onChange={handleCheckBoxChange}
              />
              N2
            </label>
            <label>
              <input
                type='checkbox'
                name='N4'
                checked={selectedOptions.N4}
                onChange={handleCheckBoxChange}
              />
              N4
            </label>
            <label>
              <input
                type='checkbox'
                name='N7'
                checked={selectedOptions.N7}
                onChange={handleCheckBoxChange}
              />
              N7
            </label>
            <label>
              <input
                type='checkbox'
                name='N10'
                checked={selectedOptions.N10}
                onChange={handleCheckBoxChange}
              />
              N10
            </label>
            <label>
              <input
                type='checkbox'
                name='N11'
                checked={selectedOptions.N11}
                onChange={handleCheckBoxChange}
              />
              N11
            </label>
            <label>
              <input
                type='checkbox'
                name='N16'
                checked={selectedOptions.N16}
                onChange={handleCheckBoxChange}
              />
              N16
            </label>
            <label>
              <input
                type='checkbox'
                name='N40'
                checked={selectedOptions.N40}
                onChange={handleCheckBoxChange}
              />
              N40
            </label>
          </div>
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

          {/* Add the submit button */}
          <button onClick={handleSubmission}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

