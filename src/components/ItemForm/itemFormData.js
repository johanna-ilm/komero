import jacket from '../../images/jacket.png';
import pants from '../../images/pants.png';
import snowsuit from '../../images/snowsuit.png';
import shoes from '../../images/sneakers.png';
import hat from '../../images/winter-hat.png';
import iceskate from '../../images/ice-skate.png';
import door from '../../images/opened-door-aperture.png';

import sun from '../../images/sun.png';
import rain from '../../images/rain.png';
import snowflake from '../../images/snowflake.png';
import remove from '../../images/wrong.png';


const categories = [
    {
        category: "Haalarit",
        imgsrc: snowsuit,
        url: "haalarit"
    },
    {
        category: "Housut",
        imgsrc: pants,
        url: "housut"
    },
    {
        category: "Takit",
        imgsrc: jacket,
        url: "takit"
    },
    {
        category: "Kengät",
        imgsrc: shoes,
        url: "kengat"
    },
    {
        category: "Asusteet",
        imgsrc: hat,
        url: "asusteet"
    },
    {
        category: "Kausivälineet",
        imgsrc: iceskate,
        url: "kausivalineet"
    },

];

const topCategory = [
    {
        category: "Koko Komero",
        imgsrc: door,
        url: "koko_komero"
    }
];

const seasons = [
    {
        season: "Kesä",
        imgsrc: sun,
        title: "Kesä",
        divClassName: "items__filter-img-wrapper items__filter-img-wrapper--round",
        imgClassName: "items__filter-img items__filter-img--black-when-selected"
    },
    {
        season: "Välikausi",
        imgsrc: rain,
        title: "Välikausi",
        divClassName: "items__filter-img-wrapper items__filter-img-wrapper--round",
        imgClassName: "items__filter-img items__filter-img--black-when-selected"
    },
    {
        season: "Talvi",
        imgsrc: snowflake,
        title: "Talvi",
        divClassName: "items__filter-img-wrapper items__filter-img-wrapper--round",
        imgClassName: "items__filter-img items__filter-img--black-when-selected"
    },
    {
        season: "",
        imgsrc: remove,
        title: "Poista suodatin",
        divClassName: "items__filter-img-wrapper items__filter-img-wrapper--no-background",
        imgClassName: "items__filter-img items__filter-img--no-change-when-selected"
    }
];

const clothingSizes = [50, 56, 62, 68, 74, 80, 86, 92, 98, 104, 110, 116, 122, 128, 134, 140, 146, 152, 158, 164, 170, "Muu"];

const shoeSizes = ["19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "Muu"];

export { categories as default, categories, topCategory, seasons, clothingSizes, shoeSizes }