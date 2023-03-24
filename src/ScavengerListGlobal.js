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
    image: string
}

const scavengerList: ScavengerListItem[] = [
    {
        name: "Sunset Picture",
        objective: "Take a picture of the drillfield at sunset.",
        points: 2,
        image: sunset
    },
    {
        name: "Duck Pond Picture",
        objective: "Take a picture of yourself with ducks at the Duck Pond",
        points: 2,
        image: pond
    },
    {
        name: "Beamer Statue Picture",
        objective: "Take a picture of yourself at the Frank Beamer Statue",
        points: 2,
        image: beamer
    },
    {
        name: "Pylons Picture",
        objective: "Take a picture of yourself sitting on the edge at the Pylons",
        points: 2,
        image: pylons
    },
    {
        name: "Hokie Bird Statue Picture",
        objective: "Take a picture of yourself with the Hokie Bird Statue by D2",
        points: 2,
        image: bird
    },
    {
        name: "Market Picture",
        objective: "Take a picture of yourself at the Farmer's Market",
        points: 2,
        image: market
    },
    {
        name: "Torg Brige Picture",
        objective: "Take a picture of yourself at the Torgerson Bridge",
        points: 2,
        image: torg
    },
    {
        name: "Burruss Picture",
        objective: "Take a picture of yourself in front of Burruss",
        points: 2,
        image: burruss
    },
    {
        name: "Garden Picture",
        objective: "Take a picture of yourself inside of Hahn Horticulture Garden",
        points: 2,
        image: garden
    },
    {
        name: "Caldwell Statue picture",
        objective: "Take a picture of yourself with the William Addison Caldwell statue",
        points: 2,
        image: caldwell
    }

];

export default scavengerList;