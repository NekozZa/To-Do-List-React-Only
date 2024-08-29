import React, { useEffect, useState } from 'react';
import useMousePosition from './features/useMousePosition'
import Table from './components/Table';
import axios from 'axios';
import './styles/layout.css'

function App() {
  const [tables, setTables] = useState(["Homework", "Chores"]);
  const [newTable, setNewTable] = useState('');
  const [currentTable, setCurrentTable] = useState('Homework');


  function updateTableName (event) {
    setNewTable(event.target.value);
  }

  function handleClick() {
    setTables(tables.concat(newTable))

    axios.post('http://localhost:5000/api/add-table', {
      tableName: newTable,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
   
    setNewTable('');
  }

  return (
    <div className='app'>
      <div className='table-list'>
        {tables.map((table, index) => <button className='btn' key={index} onClick={() => {setCurrentTable(table)}}>{table}</button>)}
        <div>
          <input type='text' name='tableName'  onChange={updateTableName} value={newTable}></input>
          <button type='submit' onClick={handleClick}><i class="ri-check-line"></i></button> 
        </div>
      </div>
      

      <div className='table'>
        <Table tableName={currentTable}/>
      </div>

    </div>
  );
}

export default App;
