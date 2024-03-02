import iceskate from '../../images/ice-skate.png'
import jacket from '../../images/jacket.png'
import pants from '../../images/pants.png'
import rain from '../../images/rain.png'
import shoes from '../../images/sneakers.png'
import snowflake from '../../images/snowflake.png'
import snowsuit from '../../images/snowsuit.png'
import sun from '../../images/sun.png'
import hat from '../../images/winter-hat.png'
import remove from '../../images/wrong.png'

// Aputiedosto. Tästä tiedostosta mäpätään ja etsitään tietoja ItemForm-, ItemCard-, ItemFilter- ja Items-komponentteihin

// Vaate/välinekategoriat: nimet, ikonien tiedostopolut ja käytettävä url (/list/-sivulla)
const categories = [
  {
    category: 'Haalarit',
    imgsrc: snowsuit,
    url: 'haalarit'
  },
  {
    category: 'Housut',
    imgsrc: pants,
    url: 'housut'
  },
  {
    category: 'Takit',
    imgsrc: jacket,
    url: 'takit'
  },
  {
    category: 'Kengät',
    imgsrc: shoes,
    url: 'kengat'
  },
  {
    category: 'Asusteet',
    imgsrc: hat,
    url: 'asusteet'
  },
  {
    category: 'Kausivälineet',
    imgsrc: iceskate,
    url: 'kausivalineet'
  }
]

// Jos käytetään sovelluksen headerissä olevaa linkkiä, saadaan näkyviin koko Komero ja url on /list/koko_komero
const topCategory = [
  {
    category: 'Koko Komero',
    url: 'koko_komero'
  }
]

// Valittavien kausien nimet, kuvien tiedostopolut ja title-tiedot ja
// CSS-luokkien tiedot (mäpätään ItemFilter-komponentissa)
const seasons = [
  {
    season: 'Kesä',
    imgsrc: sun,
    title: 'Kesä',
    divClassName: 'items__filter-input-wrapper',
    imgDivClassName: 'items__filter-img-wrapper--round',
    imgClassName: 'items__filter-img items__filter-img--black-when-selected'
  },
  {
    season: 'Välikausi',
    imgsrc: rain,
    title: 'Välikausi',
    divClassName: 'items__filter-input-wrapper',
    imgDivClassName: 'items__filter-img-wrapper--round',
    imgClassName: 'items__filter-img items__filter-img--black-when-selected'
  },
  {
    season: 'Talvi',
    imgsrc: snowflake,
    title: 'Talvi',
    divClassName: 'items__filter-input-wrapper',
    imgDivClassName: 'items__filter-img-wrapper--round',
    imgClassName: 'items__filter-img items__filter-img--black-when-selected'
  },
  {
    season: '',
    imgsrc: remove,
    title: 'Poista suodatin',
    divClassName: 'items__filter-input-wrapper',
    imgDivClassName: 'items__filter-img-wrapper--no-background',
    imgClassName: 'items__filter-img'
  }
]

// Kolme kokotaulukkoa. Jokaisella koolla tulee olla uniikki optionValue, jotta filtteröinti ja näyttönimen tuominen
// toimii itemFilter-komponentissa (poikkeuksena arvo 9999 'Muu', joka on kaikille kategorioille yhteinen).

const clothingSizes = [
  {
    optionLabel: '50',
    optionValue: 50
  }, {
    optionLabel: '56',
    optionValue: 56
  }, {
    optionLabel: '62',
    optionValue: 62
  }, {
    optionLabel: '68',
    optionValue: 68
  }, {
    optionLabel: '74',
    optionValue: 74
  }, {
    optionLabel: '80',
    optionValue: 80
  }, {
    optionLabel: '86',
    optionValue: 86
  }, {
    optionLabel: '92',
    optionValue: 92
  }, {
    optionLabel: '98',
    optionValue: 98
  }, {
    optionLabel: '104',
    optionValue: 104
  }, {
    optionLabel: '110',
    optionValue: 110
  }, {
    optionLabel: '116',
    optionValue: 116
  }, {
    optionLabel: '122',
    optionValue: 122
  }, {
    optionLabel: '128',
    optionValue: 128
  }, {
    optionLabel: '134',
    optionValue: 134
  }, {
    optionLabel: '140',
    optionValue: 140
  }, {
    optionLabel: '146',
    optionValue: 146
  }, {
    optionLabel: '152',
    optionValue: 152
  }, {
    optionLabel: '158',
    optionValue: 158
  }, {
    optionLabel: '164',
    optionValue: 164
  }, {
    optionLabel: '170',
    optionValue: 170
  }, {
    optionLabel: 'Muu',
    optionValue: 9999
  }
]

const shoeSizes = [
  {
    optionLabel: '19',
    optionValue: 19
  },
  {
    optionLabel: '20',
    optionValue: 20
  },
  {
    optionLabel: '21',
    optionValue: 21
  },
  {
    optionLabel: '22',
    optionValue: 22
  },
  {
    optionLabel: '23',
    optionValue: 23
  },
  {
    optionLabel: '24',
    optionValue: 24
  },
  {
    optionLabel: '25',
    optionValue: 25
  },
  {
    optionLabel: '26',
    optionValue: 26
  },
  {
    optionLabel: '27',
    optionValue: 27
  },
  {
    optionLabel: '28',
    optionValue: 28
  },
  {
    optionLabel: '29',
    optionValue: 29
  },
  {
    optionLabel: '30',
    optionValue: 30
  },
  {
    optionLabel: '31',
    optionValue: 31
  },
  {
    optionLabel: '32',
    optionValue: 32
  },
  {
    optionLabel: '33',
    optionValue: 33
  },
  {
    optionLabel: '34',
    optionValue: 34
  },
  {
    optionLabel: '35',
    optionValue: 35
  },
  {
    optionLabel: '36',
    optionValue: 36
  },
  {
    optionLabel: '37',
    optionValue: 37
  },
  {
    optionLabel: '38',
    optionValue: 38
  },
  {
    optionLabel: '39',
    optionValue: 39
  },
  {
    optionLabel: '40',
    optionValue: 40
  },
  {
    optionLabel: 'Muu',
    optionValue: 9999
  }
]

const accessoriesSizes = [
  {
    optionLabel: '46-48',
    optionValue: 4648
  },
  {
    optionLabel: '48-50',
    optionValue: 4850
  },
  {
    optionLabel: '50-52',
    optionValue: 5052
  },
  {
    optionLabel: '52-54',
    optionValue: 5254
  },
  {
    optionLabel: '54-56',
    optionValue: 5456
  },
  {
    optionLabel: '56-58',
    optionValue: 5658
  },
  {
    optionLabel: '0-6kk',
    optionValue: 0.1
  },
  {
    optionLabel: '6-12kk',
    optionValue: 0.5
  },
  {
    optionLabel: '1-2v',
    optionValue: 1
  },
  {
    optionLabel: '2-3v',
    optionValue: 2
  },
  {
    optionLabel: '3-4v',
    optionValue: 3
  },
  {
    optionLabel: '4-5v',
    optionValue: 4
  },
  {
    optionLabel: '5-6v',
    optionValue: 5
  },
  {
    optionLabel: '6-8v',
    optionValue: 6
  },
  {
    optionLabel: '8-10v',
    optionValue: 8
  },
  {
    optionLabel: '10-12v',
    optionValue: 10
  },
  {
    optionLabel: '12-14v',
    optionValue: 12
  },
  {
    optionLabel: 'Muu',
    optionValue: 9999
  }
]

export { accessoriesSizes, categories, clothingSizes, categories as default, seasons, shoeSizes, topCategory }
