import heritage from './img/heritage.jfif'
import deerfield from './img/deerfield.jfif'
import turkey from './img/turkey.jfif'
import brush from './img/brush.jfif'
import gateway from './img/gateway.jfif'
import snakeroot from './img/snakeroot.jfif'
import slipper from './img/slipper.jfif'
import horsenettle from './img/horsenettle.jfif'
import poverty from './img/poverty.jfif'
import pine from './img/pine.jfif'
import huckleberry from './img/huckleberry.jfif'
import coal from './img/coal.jfif'
import midcounty from './img/midcounty.jpg'
import price from './img/price.jfif'
import cascades from './img/cascades.jfif'
import dragon from './img/dragon.jfif'
import mcafee from './img/mcafee.jfif'
import bald from './img/bald.jfif'
import kelly from './img/kelly.jfif'
import johns from './img/johns.jfif'
import spur from './img/spur.jfif'

type BucketListItem = {
    name: string,
    difficulty: string,
    points: number,
    length_distance: number,
    length_time: number,
    elevation_gain: number,
    distance_from_campus: number,
    lat: number,
    lng: number,
    link: string,
    bonus_quests: string[],
    image: string
}


const bucketList: BucketListItem[] = [
    {
        name: "Heritage Community Park Loop",
        difficulty: "EASY",
        points: 4.75,
        length_distance: 1.9,
        length_time: 44,
        elevation_gain: 167,
        distance_from_campus: 2.6,
        lat: 37.23776,
        lng: -80.46033,
        link: "https://www.google.com/maps/place/Heritage+Trail+Parking/@37.2378712,-80.4603707,18.2z/data=!4m14!1m7!3m6!1s0x884d9511f04b9779:0xcff521bc5162ad6!2sVirginia+Tech!8m2!3d37.2283843!4d-80.4234167!16zL20vMDFqc3dx!3m5!1s0x884deab155120683:0x1b08e18fbbb4128d!8m2!3d37.2377515!4d-80.460571!16s%2Fg%2F11clhqvc8j",
        bonus_quests: [],
        image: heritage
    },
    {
        name: "Deerfield Trail",
        difficulty: "EASY",
        points: 3.75,
        length_distance: 1.5,
        length_time: 30,
        elevation_gain: 75,
        distance_from_campus: 2.4,
        lat: 37.25718,
        lng: -80.44199,
        link: "https://www.google.com/maps/place/Deerfield+Trail/@37.2568217,-80.4414673,17.16z/data=!4m14!1m7!3m6!1s0x884d9511f04b9779:0xcff521bc5162ad6!2sVirginia+Tech!8m2!3d37.2283843!4d-80.4234167!16zL20vMDFqc3dx!3m5!1s0x884dbfadbaf2b0e9:0xfe48f2c15270c660!8m2!3d37.2571096!4d-80.4418922!16s%2Fg%2F11fp5mp49d",
        bonus_quests: [],
        image: deerfield
    },
    {
        name: "Turkey Trot Trail Loop",
        difficulty: "MODERATE",
        points: 5.6,
        length_distance: 2.3,
        length_time: 69,
        elevation_gain: 479,
        distance_from_campus: 3.4,
        lat: 37.23804,
        lng: -80.4742,
        link: "https://www.google.com/maps/place/McDonald+Hollow+Trail+Network/@37.2382942,-80.4742243,19.03z/data=!4m14!1m7!3m6!1s0x884d9511f04b9779:0xcff521bc5162ad6!2sVirginia+Tech!8m2!3d37.2283843!4d-80.4234167!16zL20vMDFqc3dx!3m5!1s0x884deb0cf4525555:0x972ab2456792ae4a!8m2!3d37.2379622!4d-80.4739952!16s%2Fg%2F11r9v45d17",
        bonus_quests: [],
        image: turkey
    },
    {
        name: "Brush Mountain Loop",
        difficulty: "MODERATE",
        points: 9.4,
        length_distance: 4.1,
        length_time: 124,
        elevation_gain: 853,
        distance_from_campus: 3.4,
        lat: 37.23807,
        lng: -80.47419,
        link: "https://www.google.com/maps/place/McDonald+Hollow+Trail+Network/@37.2382942,-80.4742243,19.03z/data=!4m14!1m7!3m6!1s0x884d9511f04b9779:0xcff521bc5162ad6!2sVirginia+Tech!8m2!3d37.2283843!4d-80.4234167!16zL20vMDFqc3dx!3m5!1s0x884deb0cf4525555:0x972ab2456792ae4a!8m2!3d37.2379622!4d-80.4739952!16s%2Fg%2F11r9v45d17",
        bonus_quests: [],
        image: brush
    },
    {
        name: "Gateway Trail",
        difficulty: "MODERATE",
        points: 8,
        length_distance: 3.5,
        length_time: 116,
        elevation_gain: 879,
        distance_from_campus: 3,
        lat: 37.24488,
        lng: -80.45972,
        link: "https://www.google.com/maps/place/Heritage+Park+Gateway+Parking+%26+Trailhead/@37.2441992,-80.4630715,16.9z/data=!4m14!1m7!3m6!1s0x884d9511f04b9779:0xcff521bc5162ad6!2sVirginia+Tech!8m2!3d37.2283843!4d-80.4234167!16zL20vMDFqc3dx!3m5!1s0x884deb55018c45c7:0xdbdb5c883feafa7d!8m2!3d37.2449165!4d-80.4598231!16s%2Fg%2F11h7cptl2m",
        bonus_quests: [],
        image: gateway
    },
    {
        name: "Gateway, Jacob's Ladder, and Snakeroot Loop",
        difficulty: "HARD",
        points: 12.9,
        length_distance: 7.4,
        length_time: 232,
        elevation_gain: 1666,
        distance_from_campus: 3,
        lat: 37.24488,
        lng: -80.45972,
        link: "https://www.google.com/maps/place/Heritage+Park+Gateway+Parking+%26+Trailhead/@37.2441992,-80.4630715,16.9z/data=!4m14!1m7!3m6!1s0x884d9511f04b9779:0xcff521bc5162ad6!2sVirginia+Tech!8m2!3d37.2283843!4d-80.4234167!16zL20vMDFqc3dx!3m5!1s0x884deb55018c45c7:0xdbdb5c883feafa7d!8m2!3d37.2449165!4d-80.4598231!16s%2Fg%2F11h7cptl2m",
        bonus_quests: [],
        image: snakeroot
    },
    {
        name: "Lady Slipper Loop",
        difficulty: "MODERATE",
        points: 6.8,
        length_distance: 2.9,
        length_time: 76,
        elevation_gain: 413,
        distance_from_campus: 6.7,
        lat: 37.28296,
        lng: -80.46956,
        link: "https://www.google.com/maps/place/Parking+lot,+4033+Pandapas+Pond+Rd,+Blacksburg,+VA+24060/@37.2817551,-80.4635357,15.92z/data=!4m6!3m5!1s0x884dc06efb85bd8b:0x3578ae9070528d0!8m2!3d37.2830022!4d-80.4694144!16s%2Fg%2F11c60734gc",
        bonus_quests: [],
        image: slipper
    },
    {
        name: "Horsenettle, Snakeroot, Poverty Creek, Skullcap, and Prickly Pear Loop",
        difficulty: "HARD",
        points: 15,
        length_distance: 10.7,
        length_time: 287,
        elevation_gain: 1650,
        distance_from_campus: 6.7,
        lat: 37.28498,
        lng: -80.46047,
        link: "https://www.google.com/maps/place/Pandapas+Pond+Day+Use+Area/@37.2817551,-80.4635357,15.92z/data=!4m6!3m5!1s0x884dc1e27e40da6d:0xfaf6de646521572d!8m2!3d37.2850407!4d-80.4607798!16s%2Fg%2F11ghfy07tk",
        bonus_quests: [],
        image: horsenettle
    },
    {
        name: "Poverty Creek Trail",
        difficulty: "HARD",
        points: 15,
        length_distance: 14.1,
        length_time: 344,
        elevation_gain: 1627,
        distance_from_campus: 6.7,
        lat: 37.28498,
        lng: -80.46047,
        link: "https://www.google.com/maps/place/Pandapas+Pond+Day+Use+Area/@37.2817551,-80.4635357,15.92z/data=!4m6!3m5!1s0x884dc1e27e40da6d:0xfaf6de646521572d!8m2!3d37.2850407!4d-80.4607798!16s%2Fg%2F11ghfy07tk",
        bonus_quests: [],
        image: poverty
    },
    {
        name: "Pine Forest Trail",
        difficulty: "EASY",
        points: 1.25,
        length_distance: 0.5,
        length_time: 15,
        elevation_gain: 23,
        distance_from_campus: 3.4,
        lat: 37.23804,
        lng: -80.4742,
        link: "https://www.google.com/maps/place/McDonald+Hollow+Trail+Network/@37.2382942,-80.4742243,19.03z/data=!4m14!1m7!3m6!1s0x884d9511f04b9779:0xcff521bc5162ad6!2sVirginia+Tech!8m2!3d37.2283843!4d-80.4234167!16zL20vMDFqc3dx!3m5!1s0x884deb0cf4525555:0x972ab2456792ae4a!8m2!3d37.2379622!4d-80.4739952!16s%2Fg%2F11r9v45d17",
        bonus_quests: [],
        image: pine
    },
    {
        name: "Huckleberry Trail",
        difficulty: "HARD",
        points: 15,
        length_distance: 15.7,
        length_time: 313,
        elevation_gain: 734,
        distance_from_campus: 0.6,
        lat: 37.22661,
        lng: -80.41277,
        link: "https://www.google.com/maps/place/Marcia's+Park/@37.2269867,-80.4153363,18.3z/data=!4m6!3m5!1s0x884d950ae1eff31d:0x240160ec23f83df!8m2!3d37.2268625!4d-80.4131326!16s%2Fg%2F11btvg8y8v",
        bonus_quests: [],
        image: huckleberry
    },
    {
        name: "Coal Mining Heritage Park Loop Trail",
        difficulty: "EASY",
        points: 3.75,
        length_distance: 1.5,
        length_time: 33,
        elevation_gain: 108,
        distance_from_campus: 4.9,
        lat: 37.18941,
        lng: -80.42548,
        link: "https://www.google.com/maps/place/Coal+Mining+Heritage+Park+and+Loop+Trail/@37.1897381,-80.4258731,17.94z/data=!4m6!3m5!1s0x884d9494aa5489af:0x6e03e73040164dd!8m2!3d37.1894528!4d-80.425601!16s%2Fg%2F11btvb8pfg",
        bonus_quests: [],
        image: coal
    },
    {
        name: "Midcounty Nature Trail",
        difficulty: "EASY",
        points: 4.25,
        length_distance: 1.7,
        length_time: 43,
        elevation_gain: 100,
        distance_from_campus: 5.8,
        lat: 37.17158,
        lng: -80.41622,
        link: "https://www.google.com/maps/place/Mid+County+Park+Trail/@37.1722318,-80.4165757,17.31z/data=!4m6!3m5!1s0x884d95ff20a42295:0x31deb174d3b1b3d1!8m2!3d37.1715295!4d-80.4162437!16s%2Fg%2F11lt4f_1tx",
        bonus_quests: [],
        image: midcounty
    },
    {
        name: "H.L. Price Trail",
        difficulty: "EASY",
        points: 4,
        length_distance: 1.6,
        length_time: 38,
        elevation_gain: 164,
        distance_from_campus: 5.8,
        lat: 37.20120,
        lng: -80.48175,
        link: "https://www.google.com/maps/place/Price%E2%80%99s+Park/@37.202962,-80.4901645,15.44z/data=!4m6!3m5!1s0x884deb02f171aa73:0x1cd4e8630675beb2!8m2!3d37.2010666!4d-80.4811876!16s%2Fg%2F11sk1r4jsy",
        bonus_quests: [],
        image: price
    },
    {
        name: "Cascades Falls Trail",
        difficulty: "MODERATE",
        points: 8.6,
        length_distance: 3.8,
        length_time: 110,
        elevation_gain: 711,
        distance_from_campus: 20.5,
        lat: 37.35379,
        lng: -80.59918,
        link: "https://www.google.com/maps/place/Cascade+Falls+Trailhead/@37.3567733,-80.5966486,16.32z/data=!4m6!3m5!1s0x884dc468310c4941:0xb0088032f60a9011!8m2!3d37.3535984!4d-80.5994287!16s%2Fg%2F1ypj4np6g",
        bonus_quests: [],
        image: cascades
    },
    {
        name: "Dragon's Tooth Trail",
        difficulty: "HARD",
        points: 13,
        length_distance: 4.5,
        length_time: 180,
        elevation_gain: 1256,
        distance_from_campus: 21.5,
        lat: 37.37847,
        lng: -80.15609,
        link: "https://www.google.com/maps/place/Dragons+Tooth+Trail+Head/@37.3679707,-80.2056376,13.46z/data=!4m6!3m5!1s0x884da643871f0839:0xc0b1ec524f1e3125!8m2!3d37.3787656!4d-80.156091!16s%2Fg%2F11b_2xsmjw",
        bonus_quests: [],
        image: dragon
    },
    {
        name: "McAfee's Knob Trail",
        difficulty: "HARD",
        points: 13.36,
        length_distance: 7.8,
        length_time: 248,
        elevation_gain: 1811,
        distance_from_campus: 24.4,
        lat: 37.38038,
        lng: -80.08924,
        link: "https://www.google.com/maps/place/Mcafee+Knob+TrailHead/@37.3642687,-80.0627126,13.15z/data=!4m6!3m5!1s0x884da7938bd957ff:0x8739cd57e2407454!8m2!3d37.3800372!4d-80.0896933!16s%2Fg%2F11bwpd4336",
        bonus_quests: [],
        image: mcafee
    },
    {
        name: "Bald Knob Trail",
        difficulty: "EASY",
        points: 2,
        length_distance: 0.8,
        length_time: 39,
        elevation_gain: 410,
        distance_from_campus: 16.6,
        lat: 37.35517,
        lng: -80.53790,
        link: "https://www.google.com/maps/place/Mountain+Lake+Lodge/@37.338526,-80.5674571,13.41z/data=!4m9!3m8!1s0x884dc6a58faa2119:0x17f3cc6a2c82b614!5m2!4m1!1i2!8m2!3d37.3552201!4d-80.5369432!16s%2Fg%2F1vknq21b",
        bonus_quests: [],
        image: bald
    },
    {
        name: "Kelly's Knob Trail",
        difficulty: "MODERATE",
        points: 10,
        length_distance: 4.8,
        length_time: 141,
        elevation_gain: 944,
        distance_from_campus: 15.9,
        lat: 37.37286,
        lng: -80.444641,
        link: "https://www.google.com/maps/place/Kelly%E2%80%99s+Knob+Parking/@37.3733423,-80.4467217,18.35z/data=!4m14!1m7!3m6!1s0x884db8878190a115:0x9b180c1416168147!2sKelly%E2%80%99s+Knob+Parking!8m2!3d37.3727596!4d-80.4462824!16s%2Fg%2F11hd1ldmw7!3m5!1s0x884db8878190a115:0x9b180c1416168147!8m2!3d37.3727596!4d-80.4462824!16s%2Fg%2F11hd1ldmw7",
        bonus_quests: [],
        image: kelly
    },
    {
        name: "John's Creek Mountain Trail",
        difficulty: "HARD",
        points: 12.16,
        length_distance: 6.5,
        length_time: 215,
        elevation_gain: 1650,
        distance_from_campus: 15.9,
        lat: 37.37286,
        lng: -80.444641,
        link: "https://www.google.com/maps/place/Kelly%E2%80%99s+Knob+Parking/@37.3733423,-80.4467217,18.35z/data=!4m14!1m7!3m6!1s0x884db8878190a115:0x9b180c1416168147!2sKelly%E2%80%99s+Knob+Parking!8m2!3d37.3727596!4d-80.4462824!16s%2Fg%2F11hd1ldmw7!3m5!1s0x884db8878190a115:0x9b180c1416168147!8m2!3d37.3727596!4d-80.4462824!16s%2Fg%2F11hd1ldmw7",
        bonus_quests: [],
        image: johns
    },
    {
        name: "War Spur Trail",
        difficulty: "MODERATE",
        points: 6.2,
        length_distance: 2.6,
        length_time: 76,
        elevation_gain: 498,
        distance_from_campus: 19.7,
        lat: 37.39077,
        lng: -80.50803,
        link: "https://www.google.com/maps/dir//Giles+County,+Virginia/@37.3907511,-80.5083456,50m/data=!3m1!1e3!4m9!4m8!1m0!1m5!1m1!1s0x884dddc45bb5b075:0x2db2e5402d7a57f2!2m2!1d-80.6770787!2d37.3132885!3e0",
        bonus_quests: [],
        image: spur
    }
];
export default bucketList;
