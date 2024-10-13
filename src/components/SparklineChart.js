import React from 'react';
import Chart from 'react-apexcharts';

const SparklineChart = ({ data, type }) => {
  const visitorsByDate = {};

  data.forEach((booking) => {
    const date = booking.arrival_date.toISOString().split('T')[0];
    const visitorCount = booking[type] || 0;
    if (visitorsByDate[date]) {
      visitorsByDate[date] += visitorCount;
    } else {
      visitorsByDate[date] = visitorCount;
    }
  });

  const sortedDates = Object.keys(visitorsByDate).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const series = [
    {
      name: type.charAt(0).toUpperCase() + type.slice(1),
      data: sortedDates.map((date) => visitorsByDate[date]),
    },
  ];

  const options = {
    chart: {
      type: 'line',
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: `Total Number of ${type.charAt(0).toUpperCase() + type.slice(1)} Visitors`,
      align: 'left',
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" height={100} />
    </div>
  );
};

export default SparklineChart;
