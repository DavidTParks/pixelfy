export type TScenarioModels =
    | "fantasyRpg"
    | "landscapePortrait"
    | "animeStyle"
    // | "shields"
    // | "16x16Icons"
    | "pixelPortrait"
    | "skillArt"

type TScenarioModelsToIds = {
    [key in TScenarioModels]: string
}

export const scenarioGenerators: TScenarioModelsToIds = {
    fantasyRpg: "DkCC2BfCQ8mhxnyFW1tXcw",
    landscapePortrait: "BnhDXzIrQxWk1c0bWe73_w",
    animeStyle: "PNqixjKURbiouk49_gYWCw",
    // shields: "TtjEG2UmQQSxwIvlMh6p5A",
    // "16x16Icons": "aoEUJBxQQOejv_DA7rq-2g",
    pixelPortrait: "Zk4dmsnVQJ6x02F9IZfXhA",
    skillArt: "VB8yd1LaRsinkQMZuFoupg",
}

type TNormalizedGeneratorNameMap = {
    [key in TScenarioModels]: string
}

export const normalizedGeneratorMap = {
    DkCC2BfCQ8mhxnyFW1tXcw: "Fantasy RPG",
    BnhDXzIrQxWk1c0bWe73_w: "Landscape Portrait",
    PNqixjKURbiouk49_gYWCw: "Anime Style",
    TtjEG2UmQQSxwIvlMh6p5A: "32x32 Shields",
    "aoEUJBxQQOejv_DA7rq-2g": "16x16 Icons",
    Zk4dmsnVQJ6x02F9IZfXhA: "16x16 Pixel Portrait",
    VB8yd1LaRsinkQMZuFoupg: "32x32 Skill Art",
}

export const supplementalPromptMap = {
    DkCC2BfCQ8mhxnyFW1tXcw: "",
    BnhDXzIrQxWk1c0bWe73_w: "landscape portrait, ",
    PNqixjKURbiouk49_gYWCw: "anime style, ",
    TtjEG2UmQQSxwIvlMh6p5A: "game icon, shield, 32x32, ",
    "aoEUJBxQQOejv_DA7rq-2g": "game icon, ",
    Zk4dmsnVQJ6x02F9IZfXhA: "game icon, 16x16, pixel art, close up, portrait, ",
    VB8yd1LaRsinkQMZuFoupg: "game icon, ",
}

export const sizeLockedGenerators = [
    // scenarioGenerators["16x16Icons"],
    // scenarioGenerators.shields,
    scenarioGenerators.pixelPortrait,
    scenarioGenerators.skillArt,
]

export const sizeLockedGeneratorsSizeValue = {
    [scenarioGenerators.pixelPortrait]: 32,
    [scenarioGenerators.skillArt]: 16,
    // [scenarioGenerators["16x16Icons"]]: 32,
    // [scenarioGenerators.shields]: 16,
}
