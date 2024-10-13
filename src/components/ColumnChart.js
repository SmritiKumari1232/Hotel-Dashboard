import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = ({ data }) => {
  const visitorsPerCountry = {};

  data.forEach((booking) => {
    const country = booking.country || 'Unknown';
    const totalVisitors = booking.adults + booking.children + booking.babies;
    if (visitorsPerCountry[country]) {
      visitorsPerCountry[country] += totalVisitors;
    } else {
      visitorsPerCountry[country] = totalVisitors;
    }
  });

  const countries = Object.keys(visitorsPerCountry).sort();
  const visitors = countries.map((country) => visitorsPerCountry[country]);

  const series = [
    {
      name: 'Visitors',
      data: visitors,
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: countries,
      title: {
        text: 'Country',
      },
    },
    yaxis: {
      title: {
        text: 'Number of Visitors',
      },
    },
    title: {
      text: 'Number of Visitors Per Country',
      align: 'left',
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;
