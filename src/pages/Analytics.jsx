// import React, { useState, useEffect } from 'react';
// import './Analytics.css';

// function Analytics() {
//   const [selectedType, setSelectedType] = useState('Sub Based Tracing');
//   const [variableStrings, setVariableStrings] = useState([]);
//   const [filteredStrings, setFilteredStrings] = useState([]);

//   useEffect(() => {
//     // Load variable strings from local storage on component mount
//     const storedVariableStrings = JSON.parse(localStorage.getItem('variableStrings')) || [];
//     setVariableStrings(storedVariableStrings);
//   }, []);

//   useEffect(() => {
//     // Filter and update the list of variable strings based on the selected type
//     if (selectedType === 'Sub Based Tracing') {
//       const filtered = variableStrings.filter((str) => {
//         // Check if there are exactly 2 $ characters with any content in between
//         return (str.match(/\$/g) || []).length === 2;
//       });
//       setFilteredStrings(filtered);
//     } else if (selectedType === 'NF Based Tracing') {
//       const filtered = variableStrings.filter((str) => {
//         // Check if there is exactly 1 $ character
//         return (str.match(/\$/g) || []).length === 1;
//       });
//       setFilteredStrings(filtered);
//     }
//   }, [selectedType, variableStrings]);

//   const handleStopProvisioning = () => {
//     // Clear the data in local storage
//     localStorage.removeItem('variableStrings');
//     // Clear the variableStrings state
//     setVariableStrings([]);
//   };

//   return (
//     <div className="analytics-container">
//       <div className="radio-buttons">
//         <label>
//           <input
//             type="radio"
//             value="Sub Based Tracing"
//             checked={selectedType === 'Sub Based Tracing'}
//             onChange={() => setSelectedType('Sub Based Tracing')}
//           />
//           Sub Based Tracing
//         </label>
//         <label>
//           <input
//             type="radio"
//             value="NF Based Tracing"
//             checked={selectedType === 'NF Based Tracing'}
//             onChange={() => setSelectedType('NF Based Tracing')}
//           />
//           NF Based Tracing
//         </label>
//       </div>
//       <div className="buttons-container">
//         <button className="provision-button" onClick={handleStopProvisioning}>
//           Stop Provisioning
//         </button>
//       </div>
//       <div className="list-of-provisions">
//         <h2>List of Provisions:</h2>
//         <div className="provision-buttons">
//           {filteredStrings.map((str, index) => (
//             <button className="provision-button" key={index}>
//               {str}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Analytics;






import React, { useState, useEffect } from 'react';
import './Analytics.css';
import beautify from 'js-beautify';

function Analytics() {
  const [selectedType, setSelectedType] = useState('Sub Based Tracing');
  const [variableStrings, setVariableStrings] = useState([]);
  const [filteredStrings, setFilteredStrings] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedProvision, setSelectedProvision] = useState('');

  useEffect(() => {
    // Load variable strings from local storage on component mount
    const storedVariableStrings = JSON.parse(localStorage.getItem('variableStrings')) || [];
    setVariableStrings(storedVariableStrings);
  }, []);

  useEffect(() => {
    // Filter and update the list of variable strings based on the selected type
    if (selectedType === 'NF Based Tracing') {
      const filtered = variableStrings.filter((str) => {
        // Check if there are exactly 2 $ characters with any content in between
        // return (str.match(/\$/g) || []).length === 2;
        return /^(SMF|AMF|PCF)/.test(str);

      });
      setFilteredStrings(filtered);
    } else if (selectedType === 'Sub Based Tracing') {
      const filtered = variableStrings.filter((str) => {
        // Check if there is exactly 1 $ character
        // return (str.match(/\$/g) || []).length === 1;
        return /^(?!SMF|AMF|PCF)/.test(str);
      });
      setFilteredStrings(filtered);
    }
  }, [selectedType, variableStrings]);

  const handleStopProvisioning = () => {
    // Clear the data in local storage
    localStorage.removeItem('variableStrings');
    // Clear the variableStrings state
    setVariableStrings([]);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleProceed = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
          // Get the file content as text
          const textContent = e.target.result;

          // Use js-beautify to format the text content as JSON
          const formattedData = beautify(textContent, { indent_size: 2 });

          // Create a new tab and display the formatted data
          const newTab = window.open();
          newTab.document.open();
          newTab.document.write(`<pre>${formattedData}</pre>`);
          newTab.document.close();
        } catch (error) {
          alert('Error processing the file.');
          console.error(error); // Log the error to the console for debugging
        }
      };

      // Read the content of the selected file as text
      fileReader.readAsText(selectedFile);
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div className="analytics-container">
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            value="Sub Based Tracing"
            checked={selectedType === 'Sub Based Tracing'}
            onChange={() => setSelectedType('Sub Based Tracing')}
          />
          Sub Based Tracing
        </label>
        <label>
          <input
            type="radio"
            value="NF Based Tracing"
            checked={selectedType === 'NF Based Tracing'}
            onChange={() => setSelectedType('NF Based Tracing')}
          />
          NF Based Tracing
        </label>
      </div>
      
      <div className="list-of-provisions">
        <br></br>
        <h2>List of Provisions:</h2>
        {filteredStrings.length === 0 ? (
          <p>No Provisions Available</p>
        ) : (
          <select
            value={selectedProvision}
            onChange={(e) => setSelectedProvision(e.target.value)}
            className="provision-dropdown"
          >
            <option value="">Select a Provision</option>
            {filteredStrings.map((str, index) => (
              <option value={str} key={index}>
                {str}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="file-analytics">
        <h2>File Analytics</h2>
        <label htmlFor="file-input" className="file-input-label">
          Choose File
        </label>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          className="file-input"
        />
        {selectedFile && (
          <div>
            <p>Selected file is: {selectedFile.name}</p>
            <button onClick={handleProceed} className="proceed-button">
              Proceed
            </button>
          </div>
        )}
      </div>
      <div className="buttons-container">
        <button className="provision-button" onClick={handleStopProvisioning}>
          Stop Provisioning
        </button>
      </div>
    </div>
  );
}

export default Analytics;
