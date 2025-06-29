import { useState } from 'react';
import FileUploader from './FileUploader';
import DataTable from './DataTable';
import RuleBuilder from './RuleBuilder';
import './App.css';

function App() {
  const [uploadedData, setUploadedData] = useState({});

  return (
    <div className="container">
      <h1>Data Alchemist</h1>

      <FileUploader onUpload={setUploadedData} />

      {Object.entries(uploadedData).map(([filename, obj]) => (
        <DataTable
          key={filename}
          fileName={filename}
          rows={obj.data || []}
          errors={obj.errors || []}
        />
      ))}

      <RuleBuilder />
    </div>
  );
}

export default App;
