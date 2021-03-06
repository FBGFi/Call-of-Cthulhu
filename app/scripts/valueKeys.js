const valueKeys = {
    required: {
        valuescalculated: "valuescalculated",
        textvalues:{
            playerInfo: [
                "name",
                "player",
                "occupatice",
                "age",
                "sex",
                "residence",
                "birthplace"
            ],
            cash: [
                "spending",
                "cash",
                "assets"
            ]
        },
        numbervalues: {         
            characteristics: [
                "str",
                "dex",
                "pow",
                "con",
                "app",
                "edu",
                "siz",
                "int",
                "move"
            ],
            investigatorskills: [
                "credit",
                "mythos"
            ],        
            maxhp: "maxhp",
            maxsanity: "maxsanity",
            startsanity: "startsanity",
            maxmp: "maxmp",
            combat: [
                "dmgbonus",
                "build",
                "dodgeval"
            ]
        },
        selectables: [
            "hitpoints",
            "sanity",
            "magicpoints",
            "luck"
        ],
    },
    optional:{
        picture: "picture",
        checkboxes: [
            "majorwound",
            "dying",
            "unconscious",
            "tempinsane",
            "indefinsane"
        ],
        textvalues: {
            gear: "gear",
            fellowinvestigators: "fellowinvestigators",
            backstory: [
                "description",
                "traits",
                "ideology",
                "injuries",
                "people",
                "phobias",
                "locations",
                "spells",
                "possessions",
                "encounters"
            ],
            weapons: [
                "weapon",
                "regular",
                "hard",
                "extreme",
                "damage",
                "range",
                "attacks",
                "ammo",
                "malf"
            ] 
        },
        investigatorskills: [
            "accounting",
            "fasttalk",
            "law",
            "science",
            "anthropology",
            "brawl",
            "library",
            "custom1",
            "appraise",
            "custom2",
            "listen",
            "custom3",
            "archaeology",
            "custom4",
            "locksmith",
            "sleight",
            "artcraft",
            "handgun",
            "mechrep",
            "spothidden",
            "custom5",
            "shotgun",
            "medicine",
            "stealth",
            "custom6",
            "custom7",
            "natural",
            "survival",
            "charm",
            "firstaid",
            "navigate",
            "swim",
            "climb",
            "history",
            "occult",
            "throw",
            "intimidate",
            "opheavy",
            "track",
            "jump",
            "persuade",
            "custom8",
            "disguise",
            "languageother",
            "pilot",
            "custom9",
            "dodge",
            "custom10",
            "psychology",
            "custom11",
            "drive",
            "custom12",
            "psychoanalysis",
            "custom13",
            "elecrep",
            "languageown",
            "ride",
            "custom14"
        ]
    }

};

try {
    module.exports = valueKeys;   
} catch {
    //export default valueKeys;
}