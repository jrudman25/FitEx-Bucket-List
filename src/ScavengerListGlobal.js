import sunset from './img/sunset.jfif'
import pond from './img/pond.jfif'
import beamer from './img/beamer.jfif'
import pylons from './img/pylons.jfif'
import bird from './img/bird.jfif'
import market from './img/market.jfif'
import torg from './img/torg.jfif'
import burruss from './img/burruss.jfif'
import garden from './img/garden.jfif'
import caldwell from './img/caldwell.jfif'
import def from './img/default.jpg'

type ScavengerListItem = {
    name: string,
    objective: string,
    points: number,
    image: string,
    lat: number,
    lng: number
}

const scavengerList: ScavengerListItem[] = [
    {
        name: "Test",
        objective: "To test",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.24164121519086,
        lng: -80.42195130400466,
        found: false
    },
    {
        name: "Sunset Picture",
        objective: "Take a picture of the drillfield at sunset.",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.22758,
        lng: -80.42197,
        found: false
    },
    {
        name: "Duck Pond Picture",
        objective: "Take a picture of yourself with ducks at the Duck Pond",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.22582,
        lng: -80.42819,
        found: false
    },
    {
        name: "Beamer Statue Picture",
        objective: "Take a picture of yourself at the Frank Beamer Statue",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.21914,
        lng: -80.41897,
        found: false
    },
    {
        name: "Pylons Picture",
        objective: "Take a picture of yourself sitting on the edge at the Pylons",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.22878,
        lng: -80.42057,
        found: false
    },
    {
        name: "Hokie Bird Statue Picture",
        objective: "Take a picture of yourself with the Hokie Bird Statue by D2",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.22436,
        lng: -80.42061,
        found: false
    },
    {
        name: "Market Picture",
        objective: "Take a picture of yourself at the Farmer's Market",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.22927,
        lng: -80.41472,
        found: false
    },
    {
        name: "Torg Brige Picture",
        objective: "Take a picture of yourself at the Torgerson Bridge",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.22945,
        lng: -80.41945,
        found: false
    },
    {
        name: "Burruss Picture",
        objective: "Take a picture of yourself in front of Burruss",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.22844,
        lng: -80.42301,
        found: false
    },
    {
        name: "Garden Picture",
        objective: "Take a picture of yourself inside of Hahn Horticulture Garden",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.21917,
        lng: -80.42418,
        found: false
    },
    {
        name: "Caldwell Statue picture",
        objective: "Take a picture of yourself with the William Addison Caldwell statue",
        points: 2,
        image: "https://firebasestorage.googleapis.com/v0/b/bucketlist-90b4c.appspot.com/o/image.png?alt=media&token=43ddd3db-bd5c-4ca6-ab45-768abc4aa58a",
        lat: 37.23019,
        lng: -80.41902,
        found: false
    }
];

export default scavengerList;
