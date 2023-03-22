type BucketListItem = {
    name: string,
    difficulty: string,
    points: number,
    length_distance: number,
    length_time: number,
    elevation_gain: number,
    distance_from_campus: number,
    bonus_quests: string[],
    image: string
}


const bucketList2: BucketListItem[] = [
    {
        name: "Sample",
        difficulty: "HARD",
        points: 100,
        length_distance: 12.2,
        length_time: 65,
        elevation_gain: 104,
        distance_from_campus: 15.4,
        bonus_quests: ["selfie at summit", "pick up trash"],
        image: "bucketListIcon.png"
    },
    {
        name: "Heritage Community Park Loop",
        difficulty: "EASY",
        points: 4.75,
        length_distance: 1.9,
        length_time: 44,
        elevation_gain: 167,
        distance_from_campus: 2.6,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Deerfield Trail",
        difficulty: "EASY",
        points: 3.75,
        length_distance: 1.5,
        length_time: 30,
        elevation_gain: 75,
        distance_from_campus: 2.4,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Turkey Trot Trail Loop",
        difficulty: "MODERATE",
        points: 5.6,
        length_distance: 2.3,
        length_time: 69,
        elevation_gain: 479,
        distance_from_campus: 3.4,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Brush Mountain Loop",
        difficulty: "MODERATE",
        points: 9.4,
        length_distance: 4.1,
        length_time: 124,
        elevation_gain: 853,
        distance_from_campus: 3.4,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Gateway Trail",
        difficulty: "MODERATE",
        points: 8,
        length_distance: 3.5,
        length_time: 116,
        elevation_gain: 879,
        distance_from_campus: 3,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Gateway, Jacob's Ladder, and Snakeroot Loop",
        difficulty: "HARD",
        points: 12.9,
        length_distance: 7.4,
        length_time: 232,
        elevation_gain: 1666,
        distance_from_campus: 3,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Lady Slipper Loop",
        difficulty: "MODERATE",
        points: 6.8,
        length_distance: 2.9,
        length_time: 76,
        elevation_gain: 413,
        distance_from_campus: 6.7,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Horsenettle, Snakeroot, Poverty Creek, Skullcap, and Prickly Pear Loop",
        difficulty: "HARD",
        points: 15,
        length_distance: 10.7,
        length_time: 287,
        elevation_gain: 1650,
        distance_from_campus: 6.7,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Poverty Creek Trail",
        difficulty: "HARD",
        points: 15,
        length_distance: 14.1,
        length_time: 344,
        elevation_gain: 1627,
        distance_from_campus: 6.7,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Pine Forest Trail",
        difficulty: "EASY",
        points: 1.25,
        length_distance: 0.5,
        length_time: 15,
        elevation_gain: 23,
        distance_from_campus: 3.4,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Huckleberry Trail",
        difficulty: "HARD",
        points: 15,
        length_distance: 12.8,
        length_time: 258,
        elevation_gain: 603,
        distance_from_campus: 7,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Coal Mining Heritage Park Loop Trail",
        difficulty: "EASY",
        points: 3.75,
        length_distance: 1.5,
        length_time: 33,
        elevation_gain: 108,
        distance_from_campus: 4.9,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Nature Trail",
        difficulty: "EASY",
        points: 4.25,
        length_distance: 1.7,
        length_time: 43,
        elevation_gain: 100,
        distance_from_campus: 5.8,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "H.L. Price Trail",
        difficulty: "EASY",
        points: 4,
        length_distance: 1.6,
        length_time: 38,
        elevation_gain: 164,
        distance_from_campus: 5.8,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Cascades Falls Trail",
        difficulty: "MODERATE",
        points: 8.6,
        length_distance: 3.8,
        length_time: 110,
        elevation_gain: 711,
        distance_from_campus: 20.5,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Dragon's Tooth Trail",
        difficulty: "HARD",
        points: 13,
        length_distance: 4.5,
        length_time: 180,
        elevation_gain: 1256,
        distance_from_campus: 21.5,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "McAfee's Knob Trail",
        difficulty: "HARD",
        points: 13.36,
        length_distance: 7.8,
        length_time: 248,
        elevation_gain: 1811,
        distance_from_campus: 24.4,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Bald Knob Trail",
        difficulty: "EASY",
        points: 2,
        length_distance: 0.8,
        length_time: 39,
        elevation_gain: 410,
        distance_from_campus: 16.6,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "Kelly's Knob Trail",
        difficulty: "MODERATE",
        points: 10,
        length_distance: 4.8,
        length_time: 141,
        elevation_gain: 944,
        distance_from_campus: 15.9,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "John's Creek Mountain Trail",
        difficulty: "HARD",
        points: 12.16,
        length_distance: 6.5,
        length_time: 215,
        elevation_gain: 1650,
        distance_from_campus: 15.9,
        bonus_quests: [],
        image: "bucketListIcon.png"
    },
    {
        name: "War Spur Trail",
        difficulty: "MODERATE",
        points: 6.2,
        length_distance: 2.6,
        length_time: 76,
        elevation_gain: 498,
        distance_from_campus: 19.7,
        bonus_quests: [],
        image: "bucketListIcon.png"
    }
];
export default bucketList2;
