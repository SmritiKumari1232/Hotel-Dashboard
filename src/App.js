import React, { useState, useEffect } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';
import moment from 'moment';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  useEffect(() => {
    fetch('/data/hotel_bookings.json')
      .then((response) => response.json())
      .then((jsonData) => {
      
        const processedData = jsonData.map((item) => ({
          ...item,
          arrival_date: new Date(
            item.arrival_date_year,
            getMonthNumber(item.arrival_date_month) - 1,
            item.arrival_date_day_of_month
          ),
        }));
        setData(processedData);
        setFilteredData(processedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  
  useEffect(() => {
    if (startDate && endDate) {
      const filtered = data.filter((item) =>
        moment(item.arrival_date).isBetween(startDate, endDate, 'day', '[]')
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [startDate, endDate, data]);

  
  const getMonthNumber = (monthName) => {
    return moment().month(monthName).format('M');
  };

  return (
    <div className="App">
      <h1>Hotel Booking Dashboard</h1>
      <div className="date-picker-container">
        <div>
          <label>Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Select Start Date"
            isClearable
          />
        </div>
        <div>
          <label>End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Select End Date"
            isClearable
          />
        </div>
      </div>
      <div className="charts-container">
        <div className="chart-item">
          <TimeSeriesChart data={filteredData} />
        </div>
        <div className="chart-item">
          <ColumnChart data={filteredData} />
        </div>
        <div className="chart-item">
          <SparklineChart data={filteredData} type="adults" />
        </div>
        <div className="chart-item">
          <SparklineChart data={filteredData} type="children" />
        </div>
      </div>
    </div>
  );
}

export default App;
