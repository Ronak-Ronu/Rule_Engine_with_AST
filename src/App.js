import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const App = () => {
    const [rule1, setRule1] = useState('');
    const [rule2, setRule2] = useState('');
    const [data, setData] = useState({ age: '', department: '', salary: '', experience: '' });
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    
    const handleEvaluate = async () => {
      try {
          const response = await axios.post('http://localhost:5000/evaluate', { rules: [rule1, rule2], data });
          setResult({ success: response.data.result, reasons: response.data.reasons });
      } catch (error) {
          console.error(error);
      }
  };
  

    return (
        <div className="container">
            <div className='inputSection'>

            <h1>Rule Engine</h1>
            <div className="input-section">
                <h2>Input Data</h2>
                <input type="number" name="age" placeholder="Age" onChange={handleInputChange} />
                <input type="text" name="department" placeholder="Department" onChange={handleInputChange} />
                <input type="number" name="salary" placeholder="Salary" onChange={handleInputChange} />
                <input type="number" name="experience" placeholder="Experience" onChange={handleInputChange} />
            </div>
            <div className="input-section">
                <h2>Input Rule 1</h2>
                <textarea
                    rows="4"
                    cols="50"
                    value={rule1}
                    onChange={(e) => setRule1(e.target.value)}
                    placeholder="Enter rule 1 (e.g., (age > 30 AND department = 'Sales'))"
                />
            </div>
            <div className="input-section">
                <h2>Input Rule 2</h2>
                <textarea
                    rows="4"
                    cols="50"
                    value={rule2}
                    onChange={(e) => setRule2(e.target.value)}
                    placeholder="Enter rule 2 (e.g., (age < 25 OR department = 'IT'))"
                />
            </div>
            <button className="evaluate-button" onClick={handleEvaluate}>Evaluate Rules</button>
            </div>
<div className='outputSection'>

            {result !== null && (
                <div className="result-section">
                    {result && (
               <div className="result-section">
                <h2>Result: {result.success ? 'True' : 'False'}</h2>
                {!result.success && (
                    <div>
                        <h3>Reasons:</h3>
                        <ul>
                            {result.reasons.map((reason, index) => (
                                <li key={index}>{reason}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )}

                </div>
            )}
</div>

        </div>
    );
};

export default App;
