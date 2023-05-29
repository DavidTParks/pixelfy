import { de } from "date-fns/locale"

export type TScenarioModels =
    | "fantasyRpg"
    | "landscapePortrait"
    | "animeStyle"
    | "pixelPortrait"
    | "skillArt"
    | "yoHokki"
    | "assetDiffusion"
    | "pixelBackground"
    | "32x32armor"
    | "32x32helmet"
// | "spriteGenerator"

type TArtistInfo = {
    instagram: string
    twitter: string
    name: string
    bio: string
}

export type TScenarioModelData = {
    id: string
    name: string
    description: string
    supplementalPrompt: string
    sizeLocked: boolean
    sizeLockedValue?: number
    slug: string
    examples?: string[]
    disabledSizes?: string[]
    featuredArtist?: boolean
    artistInfo?: TArtistInfo
    placeholderInputText?: string
}

export type TScenarioModelIdsToData = {
    [key in TScenarioModels]: TScenarioModelData
}

export type TScenarioModelsToIds = {
    [key in TScenarioModels]: string
}

export const scenarioModelData: TScenarioModelIdsToData = {
    pixelBackground: {
        id: "HTee5KEsSaSQt1JXmqctcQ",
        slug: "pixel-background",
        name: "Pixel Background",
        description: "Pixel Background",
        supplementalPrompt: "",
        sizeLocked: false,
        disabledSizes: ["32"],
        placeholderInputText: "Ex. Enter a background you would like to see",
        examples: [
            "cli5j5qqd003eugozm4r14mhz",
            "cli5j405z0034ugozug1mzeme",
            "cli5ixgj70013ugoze81arczd",
            "cli5iw8mr000gugoza3ij1bvl",
            "cli5iwi5e000mugozozw3ki8y",
            "cli5j5qqd003fugoz3mcfa6ot",
            "cli5jhfli005rugoz8fy13624",
            "cli5jhrly0068ugoz1068pzu1",
        ],
    },
    "32x32armor": {
        id: "FFzmMGlqQM6pKmmHavVhvg",
        slug: "32x32armor",
        name: "32x32 Armor",
        description: "32x32 Armor",
        supplementalPrompt: "",
        sizeLocked: true,
        sizeLockedValue: 32,
        disabledSizes: ["32"],
        placeholderInputText:
            "Ex. Enter a prompt for armor you would like to see",
        examples: [
            "cli9a4lpr0014ugnuong6ayhz",
            "cli9a4szp001lugnubxn6fot2",
            "cli9a4sm2001fugnug4sfmlxw",
            "cli9acnr9003eugnuax8nagd0",
            "cli9a7csh002hugnuejzq3444",
            "cli9as8yo0002ugu4030y9ckv",
            "cli9a4lpr0017ugnuaqe045z0",
            "cli9ai8u00046ugnu1lp8e074",
            "cli9b4a3v000ougu4ef4z7jc0",
            "cli9b6fke0018ugu4uttn4eff",
        ],
    },
    "32x32helmet": {
        id: "K5cr3iuHT1-pG3yAdNSkWA",
        slug: "32x32helmets",
        name: "32x32 Helmets",
        description: "32x32 Helmets",
        supplementalPrompt: "",
        sizeLocked: true,
        sizeLockedValue: 32,
        disabledSizes: ["32"],
        placeholderInputText:
            "Ex. Enter a prompt for helmets you would like to see",
        examples: [
            "cli9bf9qz0008ugnvzbttuo60",
            "cli9bf9r0000augnvw1xvmqh7",
            "cli9bf9r00009ugnvomj4irkj",
            "cli9bfiwy000gugnvl3hjii3i",
            "cli9bfiwy000hugnvk2k5urhh",
            "cli9bhyxx0017ugnvi5o62wwu",
            "cli9biaot001fugnvaif3y0rf",
            "cli9biddm001ougnv3ck0sq6i",
            "cli9bk5fy001yugnvmd0e7s6w",
            "cli9bnzqt0040ugnv0xjwehjb",
            "cli9blovl002gugnvssl6y17e",
            "cli9bnzj5003fugnvylwwtazv",
            "cli9bnzj6003nugnvbeoi7dwt",
        ],
    },
    assetDiffusion: {
        slug: "asset-diffusion",
        id: "VklJ8PLtTpC_8z2p6fk2lg",
        name: "Asset Diffusion",
        description: "Asset diffusion",
        supplementalPrompt: "",
        sizeLocked: false,
        disabledSizes: ["32"],
        placeholderInputText:
            "Ex. Enter a prompt you'd like to see comma separated, or use our prompt builder below",
        examples: [
            "clhsmbnvt0010uggptyqug23n",
            "clhsma0yi000muggpedssr74d",
            "clhsmg4y7002fuggpchkxo48b",
            "clhsmiemu002quggpz2yysihg",
            "clhsmiemu002ouggpyjcj99oi",
            "clhsmiemu002puggp13yevni3",
            "clhsmt2mj004luggpmcyj9hsg",
            "clhsmvr7h0053uggpwv6lv07i",
        ],
    },
    // spriteGenerator: {
    //     slug: "sprite-generator",
    //     id: "bBo4wjNsRPiBvVT1LR5cjQ",
    //     name: "32x32 Sprite Generator",
    //     description: "32x32 Sprites for RPG games",
    //     supplementalPrompt: " , fantasy RPG style, concept art",
    //     sizeLocked: true,
    //     placeholderInputText: "Ex. Skeleton sprite, gray colors",
    // },
    fantasyRpg: {
        slug: "fantasy-rpg",
        id: "DkCC2BfCQ8mhxnyFW1tXcw",
        name: "Fantasy RPG",
        description: "Fantasy RPG style, concept art",
        supplementalPrompt: " , fantasy RPG style, concept art",
        sizeLocked: false,
        disabledSizes: ["32"],
        placeholderInputText:
            "Ex. Space warrior, nighttime, galaxy in the sky, neon colors",
        examples: [
            "clhfjtqv0002dugah4hstbwxk",
            "clh4bqrly0002mj0833sjle3k",
            "clh4bqrly0005mj08mowp8ucp",
            "clhe3o47b002nug7jui4y3ycz",
            "clhe3k5as0020ug7jnlk4dc98",
            "clh75lsko0003l3085itnesv9",
            "clh75lskp000al308u4tptx1t",
            "clhk2czm9003lugnv07duvx0l",
        ],
    },
    landscapePortrait: {
        slug: "landscape-portrait",
        id: "BnhDXzIrQxWk1c0bWe73_w",
        name: "Landscape Portrait",
        description: "Landscape Portrait Art for games",
        supplementalPrompt: " , landscape portrait, ",
        sizeLocked: false,
        disabledSizes: ["32"],
        placeholderInputText:
            "Ex. A majestic castle, towering mountains, and a mythical creature, rendered in a dark gothic style",
        examples: [
            "clh9qmtv80007mk08yj87qvyl",
            "clh9qmtv80009mk08f9kfbq8w",
            "clh9gwly4001uuglbw8024mrf",
            "clh7axjc50005mn08h16fursq",
            "clh5siqro0004mf084e6k1rqc",
            "clh3vjvg10011m8087a2p3vuo",
            "clh3yav9n0003mi0809524scl",
            "clh3yav9n0004mi08ewt2adhs",
            "clhk2g8ub0044ugnvbrv3yedq",
        ],
    },
    animeStyle: {
        slug: "anime-style",
        id: "PNqixjKURbiouk49_gYWCw",
        name: "Anime Style",
        description: "Anime style portrait art",
        supplementalPrompt: " , anime style",
        sizeLocked: false,
        disabledSizes: ["32"],
        placeholderInputText: "Ex. Cyberpunk hacker, anime style",
        examples: [
            "clh2oa3tv0005ju08x1v40dbv",
            "clh2oa3tv0003ju08hqc6pgct",
            "clh3x7xkp000ykz084k8jihvd",
            "clh3x7xkp000wkz08mz1a0jwz",
            "clhe3tbtw003eug7jey6n44l7",
            "clh3v4qnt000em80868f8s85c",
            "clh3xcv7o0017kz08ss3kamhx",
            "clh3xcv7o0016kz083npuy0br",
            "clhk2982m0030ugnv9lkvwc8v",
            "clhk1iniz002jugnvibraib2i",
            "clh3wxek50005kz08ks6s47uu",
        ],
    },
    pixelPortrait: {
        slug: "pixel-portrait",
        id: "Zk4dmsnVQJ6x02F9IZfXhA",
        name: "16x16 Pixel Portrait",
        description:
            "16x16 pixel art portraits for pixel art games or profile pictures",
        supplementalPrompt:
            " , game icon, 16x16, pixel art, close up, portrait",
        sizeLocked: true,
        placeholderInputText:
            "Ex. Purple-robed warlock with a menacing void helmet, rendered in a 16x16 pixel portrait style",
        examples: [
            "clhfsgbkw0011ugzvwt3kw67u",
            "clhfso3ui0004k008u9zx40c8",
            "clh9lyoil0003ju08fegnd1w8",
            "clh9lyoil0002ju083rd7z32r",
            "clhawqj880005l808ajamyq08",
            "clhft1zvo0001l708apq99s8l",
            "clhft1zvo0002l7086vdaew02",
            "clhb7rt3r0000l608ftdvgpio",
            "clhbn63ec0004jw08y8p3a4pt",
            "clh9lv0ue0005l708tcmytduw",
        ],
    },
    skillArt: {
        slug: "skill-art-32x32",
        id: "VB8yd1LaRsinkQMZuFoupg",
        name: "32x32 Skill Art",
        description: "32x32 Skill Art for pixel art games",
        supplementalPrompt:
            " , game icon, 32x32 pixel art, sRGB, skill art, close up, portrait",
        sizeLocked: true,
        placeholderInputText:
            "Ex. Death game icon, skull and crossbones, evil vibe",
        examples: [
            "clhcinhwo0023ugvb79g649zs",
            "clhcinhwo0020ugvbaj072m6v",
            "clhcinhwo0023ugvb79g649zs",
            "clhe2dz19000fug7j8s1i41gc",
            "clhcim1d0001qugvbih92tady",
            "clhe3d8kz001iug7jvz1mit3c",
            "clhcj35z00003l30874uao0jh",
            "clhe4l8o7004aug7j8mbeu13m",
            "clhe4l8o70048ug7j29jo5odf",
            "clhe28tw50011ugor5iq1ylcl",
            "clhcjnou1000bl0088txiz3n8",
            "clhcii3i5000wugvb2soqinm3",
            "clhk2elpa003uugnvwsh0hw1g",
            "clhk2llfq000el808z66346jt",
            "clhk2llfq000dl80867p565pj",
            "clhk2llfq000cl808pxniz1qv",
        ],
    },
    yoHokki: {
        slug: "yo-hokki-style-pixel-art",
        id: "Q36HbYy1T2WdsjkfQp3MoA",
        name: "Yo-Hokki Style",
        description:
            "Game icon, 32x32 pixel art, sRGB, skill art, close up, portrait",
        supplementalPrompt:
            " , anime style, character portrait, close up, pixel art",
        sizeLocked: false,
        featuredArtist: true,
        disabledSizes: ["32"],
        artistInfo: {
            twitter: "https://twitter.com/YoHokki",
            instagram: "https://www.instagram.com/yo_hokki",
            name: "Yo-Hokki",
            bio: "Yo-Hokki is an artist who specializes in pixel art and anime style portraits.",
        },
        placeholderInputText:
            "Ex. Demon slayer with fiery red hair and piercing green eyes stares fiercely at the viewer in a close-up character portrait, rendered in a vibrant anime style with intricate pixel art details.",
        examples: [
            "clhh0m05j000fugee9xb6poxl",
            "clhh0pohf000zugee9by2nm3y",
            "clhh0pohf000yugeegt66zcjp",
            "clhh0t8g60019ugee5frf9uok",
            "clhh0t8g6001bugee40q5lz9q",
            "clhh0t8g6001augeeob9wa02s",
            "clhflnu120071ugahc56xj3b5",
            "clhflnu12006zugahbilbc0t1",
            "clhfl4nln002wugah3d8vjo5h",
            "clhgznu8b0004ugeue9lxke49",
            "clhh0inwc0007ugee9bpjolt7",
            "clhh0inwc0005ugee5apecca2",
            "clhh2oioy0001i808fjqd62nc",
            "clhh2oioy000bi808yw2e8610",
            "clhh2oioy0008i808znlp7ayq",
            "clhk2aige003augnv665qilw3",
            "clhh2oioy0005i808mqxql266",
        ],
    },
}

export const findMatchingStyleFromModelId = (
    modelId: string
): TScenarioModelData | undefined => {
    const matchingStyle = Object.values(scenarioModelData).find(
        (scenario) => scenario.id === modelId
    )
    return matchingStyle
}

export const scenarioGenerators: TScenarioModelsToIds = {
    fantasyRpg: "DkCC2BfCQ8mhxnyFW1tXcw",
    landscapePortrait: "BnhDXzIrQxWk1c0bWe73_w",
    animeStyle: "PNqixjKURbiouk49_gYWCw",
    pixelPortrait: "Zk4dmsnVQJ6x02F9IZfXhA",
    skillArt: "VB8yd1LaRsinkQMZuFoupg",
    yoHokki: "Q36HbYy1T2WdsjkfQp3MoA",
    assetDiffusion: "VklJ8PLtTpC_8z2p6fk2lg",
    pixelBackground: "HTee5KEsSaSQt1JXmqctcQ",
    "32x32armor": "FFzmMGlqQM6pKmmHavVhvg",
    "32x32helmet": "K5cr3iuHT1-pG3yAdNSkWA",
    // spriteGenerator: "bBo4wjNsRPiBvVT1LR5cjQ",
}

type TNormalizedGeneratorNameMap = {
    [key in TScenarioModels]: string
}

export const normalizedGeneratorMap = {
    DkCC2BfCQ8mhxnyFW1tXcw: "Fantasy RPG",
    BnhDXzIrQxWk1c0bWe73_w: "Landscape Portrait",
    PNqixjKURbiouk49_gYWCw: "Anime Style",
    Zk4dmsnVQJ6x02F9IZfXhA: "16x16 Pixel Portrait",
    VB8yd1LaRsinkQMZuFoupg: "32x32 Skill Art",
    Q36HbYy1T2WdsjkfQp3MoA: "Yo-Hokki Style",
    bBo4wjNsRPiBvVT1LR5cjQ: "32x32 Sprites",
    VklJ8PLtTpC_8z2p6fk2lg: "Asset Diffusion",
    HTee5KEsSaSQt1JXmqctcQ: "Pixel Background",
    FFzmMGlqQM6pKmmHavVhvg: "32x32 armor",
    "K5cr3iuHT1-pG3yAdNSkWA": "32x32 Helmets",
}

export const supplementalPromptMap = {
    DkCC2BfCQ8mhxnyFW1tXcw: ", fantasy RPG",
    BnhDXzIrQxWk1c0bWe73_w: " , landscape portrait",
    PNqixjKURbiouk49_gYWCw: " , anime style",
    Zk4dmsnVQJ6x02F9IZfXhA:
        " , game icon, 16x16, pixel art, close up, portrait",
    VB8yd1LaRsinkQMZuFoupg:
        " , game icon, 32x32 pixel art, sRGB, skill art, close up, portrait",
    Q36HbYy1T2WdsjkfQp3MoA:
        ", character portrait, close up, anime style, pixel art",
    bBo4wjNsRPiBvVT1LR5cjQ:
        " , 32x32 pixel art, sRGB, close up, full body, game asset, centered in frame",
    VklJ8PLtTpC_8z2p6fk2lg: ", pixel art",
    HTee5KEsSaSQt1JXmqctcQ: ", sRGB, pixel art, background, landscape",
    FFzmMGlqQM6pKmmHavVhvg: ", 32x32 pixel art, game asset, armor",
    "K5cr3iuHT1-pG3yAdNSkWA": ", 32x32 pixel art, game asset, helmet",
}

export const sizeLockedGenerators = [
    // scenarioGenerators["16x16Icons"],
    // scenarioGenerators.shields,
    scenarioGenerators.pixelPortrait,
    scenarioGenerators.skillArt,
    scenarioGenerators["32x32armor"],
    scenarioGenerators["32x32helmet"],
    // scenarioGenerators.spriteGenerator,
]

export const sizeLockedGeneratorsSizeValue = {
    [scenarioGenerators.pixelPortrait]: 32,
    [scenarioGenerators.skillArt]: 16,
    [scenarioGenerators["32x32armor"]]: 16,
    [scenarioGenerators["32x32helmet"]]: 16,
    // [scenarioGenerators.spriteGenerator]: 16,
    // [scenarioGenerators["16x16Icons"]]: 32,
    // [scenarioGenerators.shields]: 16,
}

export const sizeDisabledGenerators = [
    scenarioGenerators.assetDiffusion,
    scenarioGenerators.fantasyRpg,
    scenarioGenerators.animeStyle,
    scenarioGenerators.yoHokki,
    scenarioGenerators.landscapePortrait,
    scenarioGenerators.pixelBackground,
]
