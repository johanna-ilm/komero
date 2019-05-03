import jacket from '../../images/jacket.png';
import pants from '../../images/pants.png';
import snowsuit from '../../images/snowsuit.png';
import shoes from '../../images/sneakers.png';
import hat from '../../images/winter-hat.png';
import iceskate from '../../images/ice-skate.png';

const categories = [
    {
        category: "Takit",
        imgsrc: jacket
    },
    {
        category: "Housut",
        imgsrc: pants
    },
    {
        category: "Haalarit",
        imgsrc: snowsuit
    },
    {
        category: "Kengät",
        imgsrc: shoes
    },
    {
        category: "Asusteet",
        imgsrc: hat
    },
    {
        category: "Kausivälineet",
        imgsrc: iceskate
    }
];

const clothingSizes = ["50", "56", "62", "68", "74", "80", "86", "92", "98", "104", "110", "116", "122", "128", "134", "140", "146", "152", "158", "164", "170"];

const shoeSizes = ["19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40"];

export { categories as default, categories, clothingSizes, shoeSizes }