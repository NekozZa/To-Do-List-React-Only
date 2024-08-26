import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import axios from 'axios';
import './styles/layout.css'

function App() {
  const [tables, setTables] = useState(["Chores", "Homework"]);
  const [currentTable, setCurrentTable] = useState('Homework');

  return (
    <div className='app'>
      <div className='table-list'>
        {tables.map((table, index) => <button key={index} onClick={() => {setCurrentTable(table)}}>{table}</button>)}
      </div>
      

      <div className='table'>
        <Table tableName={currentTable}/>
      </div>

    </div>
  );
}

export default App;
