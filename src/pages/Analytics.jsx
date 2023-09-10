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

function Analytics() {
  const [selectedType, setSelectedType] = useState('Sub Based Tracing');
  const [variableStrings, setVariableStrings] = useState([]);
  const [filteredStrings, setFilteredStrings] = useState([]);

  useEffect(() => {
    // Load variable strings from local storage on component mount
    const storedVariableStrings = JSON.parse(localStorage.getItem('variableStrings')) || [];
    setVariableStrings(storedVariableStrings);
  }, []);

  useEffect(() => {
    // Filter and update the list of variable strings based on the selected type
    if (selectedType === 'Sub Based Tracing') {
      const filtered = variableStrings.filter((str) => {
        // Check if there are exactly 2 $ characters with any content in between
        return (str.match(/\$/g) || []).length === 2;
      });
      setFilteredStrings(filtered);
    } else if (selectedType === 'NF Based Tracing') {
      const filtered = variableStrings.filter((str) => {
        // Check if there is exactly 1 $ character
        return (str.match(/\$/g) || []).length === 1;
      });
      setFilteredStrings(filtered);
    }
  }, [selectedType, variableStrings]);

  const handleStopProvisioning = (fileName) => {
    // Open a new tab and fetch and display the data
    fetchAndDisplayData(fileName);
  };

  const fetchAndDisplayData = async (fileName) => {
    try {
      // Assuming your file is in the downloads folder, construct the file URL
      const fileURL = `/path/to/downloads/${fileName}`;
      
      // Fetch the file's data
      const response = await fetch(fileURL);

      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }

      // Read the file content as JSON
      const jsonData = await response.json();

      // Open a new tab and display the JSON data
      const newTab = window.open('', '_blank');
      newTab.document.write('<pre>' + JSON.stringify(jsonData, null, 2) + '</pre>');
    } catch (error) {
      console.error('Error fetching or displaying data:', error);
    }
  };

  return (
    <div className="analytics-container">
      {/* ... (your existing JSX) */}
      <div className="list-of-provisions">
        <h2>List of Provisions:</h2>
        <div className="provision-buttons">
          {filteredStrings.map((str, index) => (
            <button
              className="provision-button"
              key={index}
              onClick={() => handleStopProvisioning(str)}
            >
              {str}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
