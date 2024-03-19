window.addEventListener("load", function () {
  // Your client-side JavaScript here

  // Remember that your client-side JavaScript cannot directly access any data in your server-side script
  // All data from the server must be accessed via AJAX fetch requests and the route handlers you write inside 'web-assignment-pokemon.js'

  //Set global variables
  let parseFavourite = [];

  //query selectors
  const ul = document.querySelector("ul");
  const description = document.getElementById("description");
  const typeContainer = document.getElementById("type-container");
  const favouriteButton = document.getElementById("favourite-button");
  const favouriteList = document.getElementById("favourite-list");
  const removeButton = document.getElementById("remove-favourite");
  const clearButton = document.getElementById("clear-favourite");
  const extraDetails = document.getElementById("extra-details");

  //All async functions -------------------------------------------------------
  async function fetchAllPokemonName() {
    try {
      const response = await fetch("/getAllPokemonNames");

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const pokemonNames = await response.json();
      return pokemonNames;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchRandomPokemon() {
    try {
      const response = await fetch("/getRandomPokemon");

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const pokemon = await response.json();
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPokemonByName(pokemonName) {
    try {
      const response = await fetch(
        `/getPokemonByName?pokemonName=${pokemonName}`
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const pokemon = await response.json();
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTypeDataByName(typeName) {
    try {
      const response = await fetch(`/getTypeByName?typeName=${typeName}`);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const typeDataInfo = await response.json();
      return typeDataInfo;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPokemonDetails(pokemonName) { //for task 6
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const pokemonDetail = await response.json();
      return pokemonDetail;
    } catch (error) {
      console.log(error);
    }
  }

  //------------------------------------------------------------------------------------------
  initilisePokemon();
  retrieveFavoriteNames();

  //async load first page
  async function initilisePokemon() {
    try {
      const pokemonNames = await fetchAllPokemonName();
      console.log(pokemonNames);
      displayLeftSidebar(pokemonNames);

      const randomPokemon = await fetchRandomPokemon();
      console.log(randomPokemon); //debug
      loadPokemon(randomPokemon.name);

      addFavorites(parseFavourite); //task 5

    } catch (error) {
      console.log(error);
    }
  }

  //async function load Pokemon
  async function loadPokemon(pokemonName) {
    const currentPokemon = await fetchPokemonByName(pokemonName);
    const pokemonDetails = await fetchPokemonDetails(pokemonName);

    // Update the Pokemon name in the headings of main column
    const pokemonNameSpan = document.getElementById("pokemonName");
    pokemonNameSpan.textContent = currentPokemon.name;

    //Update the Pokemon name in the heading of right sdiebar
    const pokemonTypeSpan = document.getElementById("typePokemonName");
    pokemonTypeSpan.textContent = currentPokemon.name;

    //Adding extra details
    extraDetails.innerHTML = ""; //clear existing details

    extraDetails.innerHTML += `
   <strong>Abilities:</strong> <br><p>${pokemonDetails.abilities
      .map((ability) => ability.ability.name)
      .join(", ")} </p><br>
    <strong>Held items:</strong> <br><p>${pokemonDetails.held_items
      .map((item) => item.item.name)
      .join(", ")}</p> <br>
    <strong>Moves:</strong> <br> <p>${pokemonDetails.moves
      .slice(0, 5)
      .map((move) => move.move.name)
      .join(", ")} </p>
    `;

    //call functions to display main columns and table
    displayMainContain(currentPokemon);
    displayTypeTable(currentPokemon);
  }

  //function display all names on left sidebar --------------------------------------------------------------------------
  function displayLeftSidebar(pokemonNames) {
    pokemonNames.forEach((pokemonName) => {
      const list = document.createElement("li");
      const a = document.createElement("a");
      a.setAttribute("href", `#${pokemonName}`);
      a.innerHTML = `${pokemonName}`;

      // Add a click event listener to each link
      a.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default link behavior
        loadPokemon(pokemonName); // Load the selected Pokémon
      });

      list.appendChild(a);
      ul.appendChild(list);
    });
  }

  //function display main column -----------------------------------------------------------
  function displayMainContain(pokemon) {
    const image = document.getElementById("image"); //display image
    image.src = `../images/${pokemon.name}.png`;

    const ul = document.getElementById("type"); //display types
    ul.innerHTML = ""; //clear existing type
    pokemon.types.forEach((type) => {
      const li = document.createElement("li");
      li.innerHTML += `${type}`;
      ul.appendChild(li);

      // //add favourite pokemon when click
      // favouriteButton.addEventListener("click", () => {
      //   const currentPokemonName =
      //     document.getElementById("pokemonName").textContent;
      //   //const pokemon = { name: currentPokemonName };
      // });
    });

    description.innerHTML = ""; //clear existing description
    description.innerHTML = `${pokemon.description}`; //display description
  }

  //function generate type table -----------------------------------------------------------
  async function generateTypeTable(typeName) {
    //Create type table container
    const typeTableContainer = document.createElement("div");

    //Create heading type name
    const typeNameHeader = document.createElement("h3");
    typeNameHeader.textContent = typeName;
    typeContainer.appendChild(typeNameHeader);

    //create table
    const typeTable = document.createElement("table");

    //Fetch type data by name
    try {
      const typeData = await fetchTypeDataByName(typeName);

      //Create table header
      typeTable.innerHTML += `<tr>
        <th>Type</th>
        <th>Effectiveness</th>
      </tr>`;

      //Create rows for type data'
      typeData.data.forEach((dataItem) => {
        typeTable.innerHTML += `<tr>
          <td>${dataItem.against}</td>
          <td>${dataItem.effectiveness}</td>
        </tr>`;
      });
    } catch (error) {
      console.log(error);
    }

    typeTableContainer.appendChild(typeTable);
    return typeTableContainer;
  }

  //function display type table
  async function displayTypeTable(pokemon) {
    typeContainer.innerHTML = ""; // clear existing type data

    for (const type of pokemon.types) { //loop through each type of 1 pokemon
      const typeTable = await generateTypeTable(type);

      typeContainer.appendChild(typeTable);
    }

    console.log(typeContainer);
  }

  //localStorage task --------------------------------------------------------
  function addFavorites(pokemonName) {

    //Convert pokemonName to string if not
    if (typeof pokemonName !== "string") {
      //fix error when pokemonName.trim() is not a function
      pokemonName = String(pokemonName);
    }

    if (!isNamePresent(pokemonName) && pokemonName.trim() !== "") { //remove duplicate and remove dot with empty names
      const listItem = document.createElement("li");
      const a = document.createElement("a");
      a.setAttribute("href", `#${pokemonName.toLowerCase()}`);
      a.innerHTML = `${pokemonName}`;
      listItem.appendChild(a);
      favouriteList.appendChild(listItem);

      // Add a click event listener to each link
      a.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default link behavior
        loadPokemon(pokemonName); // Load the selected Pokémon
      });

      // Update localStorage with the updated list of favorite Pokémon names
      updateLocalStorage();
    }
  }

   //condition to check duplicate name
   function isNamePresent(pokemonName) {
    const favoriteNames = Array.from(favouriteList.children).map(
      (li) => li.textContent
    );
    return favoriteNames.includes(pokemonName);
  }

   //remove favourite pokemon and update local storage
  function removeFavourite(pokemonName) {
    const favoriteNames = Array.from(favouriteList.children).map(
      (li) => li.textContent
    );
    const index = favoriteNames.indexOf(pokemonName);

    if (index !== -1) { //name is present in the list
      favouriteList.removeChild(favouriteList.children[index]);

      updateLocalStorage();
    }
  }

  //clear all favourite name
  function clearFavourite() {
    const favoriteNames = Array.from(favouriteList.children).map(
      (li) => li.textContent
    );
    favouriteList.innerHTML = "";
    favoriteNames.length = 0;

    localStorage.removeItem("favoritePokemonNames");
  }


   //update local storage
  function updateLocalStorage() {
    const favoriteNames = Array.from(favouriteList.children).map(
      (li) => li.textContent
    );
    favoriteNames.length = 0; // Clear the array to rebuild it
    const listItems = favouriteList.children;
    for (let i = 0; i < listItems.length; i++) {
      const li = listItems[i];
      favoriteNames.push(li.textContent);
    }

    localStorage.setItem("favoritePokemonNames", JSON.stringify(favoriteNames)); // Store names in local storage
    console.log(localStorage);
  }

  // Function to retrieve favorite Pokémon names from localStorage
  function retrieveFavoriteNames() {
    const storedFavoriteNames = JSON.parse(
      localStorage.getItem("favoritePokemonNames")
    );
    if (storedFavoriteNames) {
      storedFavoriteNames.forEach((name) => {
        addFavorites(name);
      });

    }
  }

  //Event: add pokemon when click button
  favouriteButton.addEventListener("click", async () => {
    const currentPokemonName =
      document.getElementById("pokemonName").textContent;
    addFavorites(currentPokemonName);
  });

  //Event: remove pokemon when click button
  removeButton.addEventListener("click", async () => {
    const currentPokemonName =
      document.getElementById("pokemonName").textContent;
    removeFavourite(currentPokemonName);
  });

  //Event: clear all favourite pokemon when click button
  clearButton.addEventListener("click", () => {
    clearFavourite();
  });

});