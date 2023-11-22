import { useState, useEffect } from 'react';
import Data from './data.csv';
import Papa from 'papaparse';
import './App.css';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

function App() {

  const [data, setData] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, { 
        header: true, 
        skipEmptyLines: true 
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);

  console.log(data)

  return (
    // <div className="App">

     

    //   {data.length ? (
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th>Name</th>
    //           <th>Algeriandinar</th>
           
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.map((row, index) => (
    //           <tr key={index}>
    //             <td>{row.Date}</td>
    //             <td>{row.Algeriandinar}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : null}

    //   <br /><br />
   

    // </div>
    <div style={{ textAlign: "center" }}>
    <h1>Socail Media Users</h1>
    <div className="App">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="Algeriandinar"
          isAnimationActive={false}
          data={data}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
      {/* <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 80,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis
          dataKey="Date"
          scale="point"
          padding={{ left: 10, right: 10 }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="Dates" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart> */}
     <BarChart
  width={500}
  height={300}
  data={data}
  margin={{
    top: 5,
    right: 30,
    left: 80,
    bottom: 5,
  }}
  barSize={20}
>
  <XAxis
    dataKey="Date"
    scale="point"
    padding={{ left: 10, right: 10 }}
  />
  <YAxis />
  <Tooltip />
  <Legend />
  <CartesianGrid strokeDasharray="3 3" />

  {data.length > 0 && Object.keys(data[0]).map((key, index) => {
    // Skip Date and Algeriandinar columns
    if (key !== "Date" && key !== "Algeriandinar") {
      return (
        <Bar key={index} dataKey={key} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
      );
    }
    return null;
  })}
</BarChart>
    </div>
  </div>
  );
}

export default App;