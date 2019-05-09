import React from 'react';

import Content from '../Content/Content';

import { defaults } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import './Stats.css';



function Stats(props) {

  defaults.global.defaultFontFamily = 'Roboto';


  // Pylväskaaviot

  // Vaatteiden kokojakauma

  // Filtteröidään datasta pois kengät ja kausivälineet
  let dataSizes = props.data.filter(item => item.kategoria !== "Kengät" && item.kategoria !== "Kausivälineet");
  // Irrotetaan datasta pelkkä kokojakauma
  dataSizes = dataSizes.map(item => item.koko);

  // Lasketaan, miten monta kpl kutakin kokoa on jakaumassa
  const groupedBarData = dataSizes.reduce((kpl, koko) => {
    kpl[koko] = (kpl[koko] || 0) + 1;
    return kpl;
  }, {})

  const barXData = Object.values(groupedBarData);
  const barYData = Object.keys(groupedBarData);


  let barChartData = {
    labels: barYData,
    datasets: [
      {
        label: 'Kpl',
        data: barXData,
        fill: false,
        backgroundColor: '#fdece7',
        borderColor: '#f18c8e',
        borderWidth: '1',
      }
    ]
  };

  // Kenkien kokojakauma

  // Filtteröidään datasta pelkät kengät
  let dataSizesShoes = props.data.filter(item => item.kategoria === "Kengät");
  // Irrotetaan datasta pelkkä kokojakauma
  dataSizesShoes = dataSizesShoes.map(item => item.koko);

  // Lasketaan, miten monta kpl kutakin kokoa on jakaumassa
  const groupedBarDataShoes = dataSizesShoes.reduce((kpl, koko) => {
    kpl[koko] = (kpl[koko] || 0) + 1;
    return kpl;
  }, {})

  const barXDataShoes = Object.values(groupedBarDataShoes);
  const barYDataShoes = Object.keys(groupedBarDataShoes);


  let barChartDataShoes = {
    labels: barYDataShoes,
    datasets: [
      {
        label: 'Kpl',
        data: barXDataShoes,
        fill: false,
        backgroundColor: '#fdece7',
        borderColor: '#f18c8e',
        borderWidth: '1',
      }
    ]
  };


  let barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      xAxes: [
        {
          type: "category",
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [{
        ticks: {
          stepSize: 1,
          beginAtZero: true
        }
      }
      ]
    }
  }


  // Viivakaavio

  // summaa ostohinnat ostovuoden mukaan groupedLineData-taulukkoon
  const lineDataReducer = (groupedLineData, currentItem) => {
    const index = groupedLineData.findIndex(item => item.ostovuosi === currentItem.ostovuosi);
    if (index >= 0) {
      groupedLineData[index].ostohinta = groupedLineData[index].ostohinta + currentItem.ostohinta;
    } else {
      groupedLineData.push({ ostovuosi: currentItem.ostovuosi, ostohinta: currentItem.ostohinta });
    }
    return groupedLineData;
  }

  let groupedLineData = props.data.reduce(lineDataReducer, []);
  groupedLineData = groupedLineData.sort((a, b) => {
    const aYear = parseInt(a.ostovuosi);
    const bYear = parseInt(b.ostovuosi);
    return aYear - bYear;
  });


  let lineData = groupedLineData.map(item => ({ x: item.ostovuosi, y: item.ostohinta }));


  let lineChartData = {
    datasets: [
      {
        label: "kulut (€)",
        data: lineData,
        fill: false,
        backgroundColor: '#fdece7',
        borderColor: '#f18c8e'
      }
    ]
  };

  let lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend:
    {
      position: "bottom"
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            displayFormats: {
              year: "YYYY"
            }
          },
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [{
        ticks: {
          stepSize: 100,
          beginAtZero: true
        }
      }
      ]
    }
  }

  return (
    <Content>
      <div className="stats__header">
        <h2>Tilastot</h2>
      </div>
      <div className="stats__graphs">

        <h3>Vaatteiden kokojakauma</h3>
        <div className="stats__graph">
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        <h3>Kenkien kokojakauma</h3>
        <div className="stats__graph">
          <Bar data={barChartDataShoes} options={barChartOptions} />
        </div>

        <h3>Kulut vuosittain</h3>
        <div className="stats__graph">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

      </div>
    </Content>
  );
}

export default Stats;