// The express package contains Express, and its own required dependencies. It needs to be
// installed using npm.
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

console.log("=".repeat(80))
console.log("Pokemon Data Viewer API Server")
console.log("=".repeat(80))

// Setup static routing. Any file located in the "public" folder
// will be able to be accessed by clients directly.
const publicFolderFilePath = path.join(process.cwd(), "public");
console.log('Public folder for static files: ' + publicFolderFilePath);
app.use(express.static(publicFolderFilePath));


// Create your route handlers here:

app.get("/getPokemonByName", function(req, res) {
    const pokemonName = req.query.pokemonName;
    const pokemon = getPokemonByName(pokemonName);
    res.json(pokemon);
})

app.get("/getAllPokemonNames", function(req,res) {
    const pokemonName = req.query.pokemonName;
    const pokemon = getAllPokemonNames(pokemonName);
    res.json(pokemon);
})

app.get("/getTypeByName", function(req,res) {
    const typeName = req.query.typeName;
    const typeDataItem = getTypeDataByName(typeName);

    if (typeDataItem) {
        res.json(typeDataItem);
    } else {
        res.status(404).json({error: "Type not found"});
    }
})

app.get("/getRandomPokemon", function (req, res) {
    const randomPokemon = getRandomPokemon();
    res.json(randomPokemon);
});

// For example: 

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
app.listen(port, function() {
    console.log(`Server is listening on port ${port}!`);
});


// BELOW THIS POINT ARE ALL OF THE PRE-WRITTEN FUNCTIONS 
// AND OBJECTS THAT WILL ALLOW YOU TO GET THE DATA TO SEND BACK TO THE CLIENT/WEB-BROWSER

// You may modify these functions if you want to but they do work and will allow you to implement your route handlers


// Returns an string array of all Pokemon names
function getAllPokemonNames(){
    const pokemonNames = [];
    pokemonData.forEach(function(pokemon){
        pokemonNames.push(pokemon.name);
    });
    return pokemonNames;
}

// Takes a Pokemon name as a parameter and returns an object with all details of that pokemon
function getPokemonByName(pokemonName){
    for (let i = 0; i < pokemonData.length; i++) {
        if (pokemonData[i].name === pokemonName){
            return pokemonData[i];
        }
    }
    return null;
}

// Takes a type as a parameter and returns an object with the data relating to that type 
function getTypeDataByName(type){
    for (let i = 0; i < typeData.length; i++) {
        if (typeData[i].name === type){
            return typeData[i];
        }        
    }
    return null;
}

// Returns a random Pokemon from the pokemonData array
function getRandomPokemon(){
    const randomPokemon = pokemonData[Math.floor(Math.random()*pokemonData.length)];
    return randomPokemon;
}

// BELOW HERE ARE BOTH OF THE ARRAYS OF JAVASCRIPT OBJECTS THAT IS THE SOURCE DATA FOR YOUR PAGE
// THE FUNCTIONS ABOVE ACCESS THIS DATA AND RETURN IT SO YOU CAN USE IT IN YOUR ROUTE HANDLERS
// It is recommended that you do not modify `pokemonData` and `typeData`.
// However you are welcome to research JS modules and move `pokemonData`, `typeData` to a separate file (module).

const pokemonData = [
    {
        id: 3,
        name: "Venusaur",
        imageUrl: "Venusaur.png",
        types: [
            "Grass",
            "Poison"
        ],
        description: "Venusaur, the Seed Pokémon. When Venusaur sprouts out its large flower petals and absorbs the rays of the sun, it becomes energized."
    },
    {
        id: 6,
        name: "Charizard",
        imageUrl: "Charizard.png",
        types: [
            "Fire",
            "Flying"
        ],
        description: "Charizard, the Flame Pokémon. Charizard is a Flying and Fire type. When competing in intense battles, Charizard's flame becomes more intense as well."
    },
    {
        id: 9,
        name: "Blastoise",
        imageUrl: "Blastoise.png",
        types: [
            "Water"
        ],
        description: "Blastoise, the Shellfish Pokémon. Blastoise's heavy body weight can make opponents unable to battle. It retreats into its shell when necessary."
    },
    {
        id: 25,
        name: "Pikachu",
        imageUrl: "Pikachu.png",
        types: [
            "Electric"
        ],
        description: "Pikachu, the Mouse Pokémon. An Electric type. It raises its tail to sense its surroundings. If you pull on its tail, it will bite."
    },
    {
        id: 36,
        name: "Clefable",
        imageUrl: "Clefable.png",
        types: [
            "Fairy"
        ],
        description: "Clefable moves by skipping lightly as if it were flying using its wings. Its bouncy step even lets it walk on water. It is known to take strolls on lakes on quiet, moonlit nights."
    },
    {
        id: 39,
        name: "Jigglypuff",
        imageUrl: "Jigglypuff.png",
        types: [
            "Normal",
            "Fairy"
        ],
        description: "Jigglypuff, the Balloon Pokémon. When Jigglypuff's big eyes begin to quiver, everyone becomes sleepy as it sings a lullaby."
    },
    {
        id: 131,
        name: "Lapras",
        imageUrl: "Lapras.png",
        types: [
            "Water",
            "Ice"
        ],
        description: "Lapras. This intellectually advanced Pokémon is able to understand human speech. With its mild temperament, Lapras prefers to carry humans on its back, rather than engage in Pokémon battles."
    },
    {
        id: 143,
        name: "Snorlax",
        imageUrl: "Snorlax.png",
        types: [
            "Normal"
        ],
        description: "Snorlax, the Sleeping Pokémon. Snorlax becomes much too lazy to lift even a finger when it has a full belly, which then makes it safe to bounce upon."
    },
    {
        id: 149,
        name: "Dragonite",
        imageUrl: "Dragonite.png",
        types: [
            "Dragon",
            "Flying",
            "Fire"
        ],
        description: "Dragonite, the Dragon Pokémon. This extremely rare and highly intelligent type is able to fly faster than any known Pokémon."
    },
    {
        id: 150,
        name: "Mewtwo",
        imageUrl: "Mewtwo.png",
        types: [
            "Psychic"
        ],
        description: "It was created by a scientist after years of horrific gene-splicing and DNA-engineering experiments."
    }
];

const typeData = [
    {
        name: "Fire",
        data: [
            {against:"fire", effectiveness:"not very effective"},
            {against:"water", effectiveness:"not very effective"},
            {against:"grass", effectiveness:"very effective"},
            {against:"electric", effectiveness:"not at all effective"},
            {against:"ice", effectiveness:"very effective"}
        ]
    },
    {
        name: "Water",
        data: [
            {against:"fire", effectiveness:"very effective"},
            {against:"water", effectiveness:"not very effective"},
            {against:"grass", effectiveness:"not very effective"},
            {against:"electric", effectiveness:"not at all effective"},
            {against:"ice", effectiveness:"not at all effective"}
        ]
    },
    {
        name: "Grass",
        data: [
            {against:"fire", effectiveness:"not very effective"},
            {against:"water", effectiveness:"very effective"},
            {against:"grass", effectiveness:"not very effective"},
            {against:"electric", effectiveness:"not at all effective"},
            {against:"ice", effectiveness:"not at all effective"}
        ]
    },
    {
        name: "Electric",
        data: [
            {against:"fire", effectiveness:"not at all effective"},
            {against:"water", effectiveness:"very effective"},
            {against:"grass", effectiveness:"not very effective"},
            {against:"electric", effectiveness:"not very effective"},
            {against:"ice", effectiveness:"not at all effective"}
        ]                                                                                                                                                       
    },
    {
        name: "Flying",
        data: [
            {against:"fire", effectiveness:"not at all effective"},
            {against:"water", effectiveness:"very effective"},
            {against:"grass", effectiveness:"not very effective"},
            {against:"electric", effectiveness:"not very effective"},
            {against:"ice", effectiveness:"not at all effective"}
        ]                                                                                                                                                       
    },
    {
        name: "Normal",
        data: [
            {against:"fire", effectiveness:"not at all effective"},
            {against:"water", effectiveness:"very effective"},
            {against:"grass", effectiveness:"not very effective"},
            {against:"electric", effectiveness:"not very effective"},
            {against:"ice", effectiveness:"not at all effective"}
        ]                                                                                                                                                       
    },
    {
        name: "Dragon",
        data: [
            {against:"fire", effectiveness:"not at all effective"},
            {against:"water", effectiveness:"very effective"},
            {against:"grass", effectiveness:"not very effective"},
            {against:"electric", effectiveness:"not very effective"},
            {against:"ice", effectiveness:"not at all effective"}
        ]                                                                                                                                                       
    },
    {
        name: "Fairy",
        data: [
            {against:"fire", effectiveness:"not at all effective"},
            {against:"water", effectiveness:"very effective"},
            {against:"grass", effectiveness:"not very effective"},
            {against:"electric", effectiveness:"not very effective"},
            {against:"ice", effectiveness:"not at all effective"}
        ]                                                                                                                                                       
    },
    {
        name: "Poison",
        data: [
            {against:"fire", effectiveness:"not at all effective"},
            {against:"water", effectiveness:"very effective"},
            {against:"grass", effectiveness:"not very effective"},
            {against:"electric", effectiveness:"not very effective"},
            {against:"ice", effectiveness:"not at all effective"}
        ]                                                                                                                                                       
    },
    {
        name: "Psychic",
        data: [
            {against:"fire", effectiveness:"not at all effective"},
            {against:"water", effectiveness:"very effective"},
            {against:"grass", effectiveness:"not very effective"},
            {against:"electric", effectiveness:"not very effective"},
            {against:"ice", effectiveness:"not at all effective"}
        ]                                                                                                                                                       
    },
    {
        name: "Ice",
        data: [
            {against:"fire", effectiveness:"not at all effective"},
            {against:"water", effectiveness:"very effective"},
            {against:"grass", effectiveness:"not very effective"},
            {against:"electric", effectiveness:"not very effective"},
            {against:"ice", effectiveness:"not at all effective"}
        ]                                                                                                                                                       
    }
];
