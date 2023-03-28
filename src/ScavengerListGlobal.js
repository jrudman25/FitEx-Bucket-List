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
        objective: "To test the file system out",
        points: 2,
        image: sunset,
        lat: 37.24164962845268,
        lng: -80.4220291988603,
    },
    {
        name: "Sunset Picture",
        objective: "Take a picture of the drillfield at sunset.",
        points: 2,
        image: sunset,
        lat: 37.22758,
        lng: -80.42197
    },
    {
        name: "Duck Pond Picture",
        objective: "Take a picture of yourself with ducks at the Duck Pond",
        points: 2,
        image: pond,
        lat: 37.22582,
        lng: -80.42819
    },
    {
        name: "Beamer Statue Picture",
        objective: "Take a picture of yourself at the Frank Beamer Statue",
        points: 2,
        image: beamer,
        lat: 37.21914,
        lng: -80.41897
    },
    {
        name: "Pylons Picture",
        objective: "Take a picture of yourself sitting on the edge at the Pylons",
        points: 2,
        image: pylons,
        lat: 37.22878,
        lng: -80.42057
    },
    {
        name: "Hokie Bird Statue Picture",
        objective: "Take a picture of yourself with the Hokie Bird Statue by D2",
        points: 2,
        image: bird,
        lat: 37.22436,
        lng: -80.42061
    },
    {
        name: "Market Picture",
        objective: "Take a picture of yourself at the Farmer's Market",
        points: 2,
        image: market,
        lat: 37.22927,
        lng: -80.41472
    },
    {
        name: "Torg Brige Picture",
        objective: "Take a picture of yourself at the Torgerson Bridge",
        points: 2,
        image: torg,
        lat: 37.22945,
        lng: -80.41945
    },
    {
        name: "Burruss Picture",
        objective: "Take a picture of yourself in front of Burruss",
        points: 2,
        image: burruss,
        lat: 37.22844,
        lng: -80.42301
    },
    {
        name: "Garden Picture",
        objective: "Take a picture of yourself inside of Hahn Horticulture Garden",
        points: 2,
        image: garden,
        lat: 37.21917,
        lng: -80.42418
    },
    {
        name: "Caldwell Statue picture",
        objective: "Take a picture of yourself with the William Addison Caldwell statue",
        points: 2,
        image: caldwell,
        lat: 37.23019,
        lng: -80.41902
    }

];

export default scavengerList;