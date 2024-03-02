import 'chartjs-adapter-moment'
import './Stats.css'

import { BarElement, CategoryScale, Chart, LinearScale, LineElement, PointElement, TimeScale } from 'chart.js'
import PropTypes from 'prop-types'
import { Bar, Line } from 'react-chartjs-2'

import Content from '../Content/Content'

Chart.register(CategoryScale, LinearScale, TimeScale, BarElement, PointElement, LineElement)

// Komponentti, joka näyttää datasta muodostetut tilastokaaviot
const Stats = ({ data }) => {
  // Apufunktio, joka hakee css-muuttujat (värit)
  const cssvar = name => {
    return getComputedStyle(document.documentElement).getPropertyValue(name)
  }

  // Kaavioiden oletusfontin määritys
  Chart.defaults.font.family = 'Roboto'

  // +-----------------+
  // |  Pylväskaaviot  |
  // +-----------------+

  // Vaatteet: filtteröidään datasta pois asusteet, kengät ja kausivälineet
  const dataClothes = data.filter(item =>
    item.kategoria !== 'Asusteet' &&
    item.kategoria !== 'Kengät' &&
    item.kategoria !== 'Kausivälineet')

  // Kengät: filtteröidään datasta pelkät kengät
  const dataShoes = data.filter(item => item.kategoria === 'Kengät')

  /**
   * Funktio, joka muodostaa pylväsgraafeihin tarvittavan datan
   * @param {*} data // Props.data filtteröitynä (joko vaatteet tai kengät)
   */
  const createBarChartData = (data) => {
    // Irrotetaan datasta pelkkä kokojakauma
    data = data.map(item => item.koko)

    // Jos jakaumasta löytyy koko 9999, muutetaan se muotoon 'Muu'
    const indexOf9999 = data.findIndex(item => item === 9999)
    if(indexOf9999 > 0) {
      data.splice(indexOf9999, 1, 'Muu')
    }

    // Lasketaan, miten monta kpl kutakin kokoa on jakaumassa
    const groupedBarData = data.reduce((kpl, koko) => {
      kpl[koko] = (kpl[koko] || 0) + 1
      return kpl
    }, {})

    // Jaetaan objektien arvot (kpl) x-akselille ja nimet (koko) y-akselille
    const barXData = Object.values(groupedBarData)
    const barYData = Object.keys(groupedBarData)

    // Datan määritys Chart.js:ää varten
    const barChartData = {
      labels: barYData,
      datasets: [
        {
          label: 'Kpl',
          data: barXData,
          fill: false,
          backgroundColor: cssvar('--vaalea-tehostevari'),
          borderColor: cssvar('--tumma-tehostevari'),
          borderWidth: '1'
        }
      ]
    }
    return barChartData
  }

  // Asetusten määritys Chart.js:ää varten
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      x: {
        type: 'category',
        gridLines: {
          display: false
        }
      },
      y: {
        ticks: {
          stepSize: 1,
          beginAtZero: true
        }
      }
    }
  }

  // +---------------+
  // |  Viivakaavio  |
  // +---------------+

  // Reducer summaa ostohinnat ostovuoden mukaan groupedLineData-taulukkoon
  const lineDataReducer = (groupedLineData, currentItem) => {
    const index = groupedLineData.findIndex(item => item.ostovuosi === currentItem.ostovuosi)
    if(index >= 0) {
      groupedLineData[index].ostohinta = groupedLineData[index].ostohinta + currentItem.ostohinta
    } else {
      groupedLineData.push({ ostovuosi: currentItem.ostovuosi, ostohinta: currentItem.ostohinta })
    }
    return groupedLineData
  }

  let groupedLineData = data.reduce(lineDataReducer, [])
  groupedLineData = groupedLineData.sort((a, b) => {
    const aYear = parseInt(a.ostovuosi)
    const bYear = parseInt(b.ostovuosi)
    return aYear - bYear
  })

  const lineData = groupedLineData.map(item => ({ x: item.ostovuosi, y: item.ostohinta }))

  // Datan määritys Chart.js:ää varten
  const lineChartData = {
    datasets: [
      {
        label: 'kulut (€)',
        data: lineData,
        fill: false,
        backgroundColor: cssvar('--vaalea-tehostevari'),
        borderColor: cssvar('--tumma-tehostevari')
      }
    ]
  }

  // Asetusten määritys Chart.js:ää varten
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend:
    {
      position: 'bottom'
    },
    scales: {
      x: {
        type: 'time',
        time: {
          displayFormats: {
            year: 'YYYY'
          }
        },
        gridLines: {
          display: false
        }
      },
      y: {
        ticks: {
          stepSize: 100,
          beginAtZero: true
        }
      }
    }
  }

  return (
    <Content>
      <div className='stats__header'>
        <h2>Tilastot</h2>
      </div>
      <div className='stats__graphs'>

        <h3>Vaatteiden kokojakauma</h3>
        <div className='stats__graph'>
          <Bar data={createBarChartData(dataClothes)} options={barChartOptions} />
        </div>

        <h3>Kenkien kokojakauma</h3>
        <div className='stats__graph'>
          <Bar data={createBarChartData(dataShoes)} options={barChartOptions} />
        </div>

        <h3>Kulut vuosittain</h3>
        <div className='stats__graph'>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

      </div>
    </Content>
  )
}

Stats.propTypes = {
  data: PropTypes.array
}

export default Stats
