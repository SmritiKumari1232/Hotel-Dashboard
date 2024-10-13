import React from 'react';
import Chart from 'react-apexcharts';

const TimeSeriesChart = ({ data }) => {
  const visitorsPerDay = {};

  data.forEach((booking) => {
    const date = booking.arrival_date.toISOString().split('T')[0];
    const totalVisitors = booking.adults + booking.children + booking.babies;
    if (visitorsPerDay[date]) {
      visitorsPerDay[date] += totalVisitors;
    } else {
      visitorsPerDay[date] = totalVisitors;
    }
  });

  const sortedDates = Object.keys(visitorsPerDay).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const series = [
    {
      name: 'Visitors',
      data: sortedDates.map((date) => ({
        x: date,
        y: visitorsPerDay[date],
      })),
    },
  ];

  const options = {
    chart: {
      type: 'line',
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Visitors',
      },
    },
    title: {
      text: 'Number of Visitors Per Day',
      align: 'left',
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default TimeSeriesChart;
