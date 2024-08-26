import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import './styles/layout.css'

function App() {
  const [tables, setTables] = useState(["Game Project", "Homework"]);
  const [currentTable, setCurrentTable] = useState('');

  return (
    <div className='app'>
      <div className='table-list'>
        {tables.map((table) => <button onClick={() => {setCurrentTable(table)}}>{table}</button>)}
      </div>
      

      <div className='table'>
        <Table fields={["To-Do", "Doing", "Done"]}/>
      </div>

    </div>
  );
}

export default App;
