import React from 'react';

import Content from '../Content/Content';

import { defaults } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import './Stats.css';


function Stats(props) {

  // Kaavioiden oletusfontin määritys
  defaults.global.defaultFontFamily = 'Roboto';

  // +-----------------+
  // |  Pylväskaaviot  |
  // +-----------------+

  // Vaatteet: filtteröidään datasta pois asusteet, kengät ja kausivälineet
  let dataClothes = props.data.filter(item =>
    item.kategoria !== "Asusteet" &&
    item.kategoria !== "Kengät" &&
    item.kategoria !== "Kausivälineet");

  // Kengät: filtteröidään datasta pelkät kengät
  let dataShoes = props.data.filter(item => item.kategoria === "Kengät");


  /**
   * Funktio, joka muodostaa pylväsgraafeihin tarvittavan datan
   * 
   * @param {*} data // Props.data filtteröitynä (joko vaatteet tai kengät)
   */
  const createBarChartData = (data) => {

    // Irrotetaan datasta pelkkä kokojakauma
    data = data.map(item => item.koko);

    // Jos jakaumasta löytyy koko 999, muutetaan se muotoon "Muu"
    const indexOf999 = data.findIndex(item => item === 999);
    if (indexOf999 > 0) {
      data.splice(indexOf999, 1, "Muu")
    }

    // Lasketaan, miten monta kpl kutakin kokoa on jakaumassa
    const groupedBarData = data.reduce((kpl, koko) => {
      kpl[koko] = (kpl[koko] || 0) + 1;
      return kpl;
    }, {})

    // Jaetaan objektien arvot (kpl) x-akselille ja nimet (koko) y-akselille
    const barXData = Object.values(groupedBarData);
    const barYData = Object.keys(groupedBarData);

    // Datan määritys Chart.js:ää varten
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
    return barChartData;
  }

  // Asetusten määritys Chart.js:ää varten
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

  // +---------------+
  // |  Viivakaavio  |
  // +---------------+

  // Reducer summaa ostohinnat ostovuoden mukaan groupedLineData-taulukkoon
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

  // Datan määritys Chart.js:ää varten
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

  // Asetusten määritys Chart.js:ää varten
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
          <Bar data={createBarChartData(dataClothes)} options={barChartOptions} />
        </div>

        <h3>Kenkien kokojakauma</h3>
        <div className="stats__graph">
          <Bar data={createBarChartData(dataShoes)} options={barChartOptions} />
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