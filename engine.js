let players = [];

const profiles = [
  {
    name: "julixq",
    agents: ["brimstone", "phoenix", "sage", "sova", "viper", "cypher", "reyna", "killjoy", "breach", "omen", "jett", "raze", "skye", "yoru", "astra", "kay/o", "chamber", "neon"]
  },
  {
    name: "franzi",
    agents: ["brimstone", "phoenix", "sage", "sova", "viper", "cypher", "reyna", "killjoy", "breach", "omen", "jett", "raze", "skye", "yoru", "astra", "kay/o", "chamber", "neon"]
  },
  {
    name: "mullug",
    agents: ["brimstone", "phoenix", "sage", "sova", "jett", "raze"]
  },
  {
    name: "domidick",
    agents: ["brimstone", "phoenix", "sage", "sova", "viper", "cypher", "reyna", "killjoy", "breach", "omen", "jett", "raze", "skye", "yoru", "astra", "kay/o", "chamber", "neon"]
  },
  {
    name: "qtynz",
    agents: ["brimstone", "phoenix", "sage", "sova", "viper", "reyna", "omen", "jett", "raze", "skye", "yoru", "kay/o", "chamber", "neon"]
  },
  {
    name: "mapri",
    agents: ["brimstone", "phoenix", "sage", "sova", "cypher", "reyna", "omen", "jett", "raze", "skye", "yoru", "astra", "neon"]
  },
  {
    name: "mxty",
    agents: ["brimstone", "phoenix", "sage", "sova", "viper", "cypher", "reyna", "killjoy", "breach", "omen", "jett", "raze", "skye", "yoru", "astra", "kay/o", "chamber", "neon"]
  },
  {
    name: "arakatze",
    agents: ["brimstone", "phoenix", "sage", "sova", "omen", "jett", "raze", "yoru", "neon"]
  },
  {
    name: "ela",
    agents: ["brimstone", "phoenix", "sage", "sova", "viper", "cypher", "reyna", "killjoy", "breach", "omen", "jett", "raze", "skye", "yoru", "astra", "kay/o", "chamber", "neon"]
  },
  {
    name: "happy",
    agents: ["brimstone", "phoenix", "sage", "sova", "viper", "cypher", "reyna", "killjoy", "omen", "jett", "skye", "yoru", "astra", "kay/o", "chamber"]
  },
  {
    name: "ola",
    agents: ["brimstone", "phoenix", "sage", "sova", "viper", "cypher", "reyna", "killjoy", "breach", "omen", "jett", "raze", "skye", "yoru", "astra", "kay/o", "chamber", "neon"]
  },
  {
    name: "aryllic",
    agents: ["brimstone", "phoenix", "sage", "sova", "viper", "cypher", "jett"]
  }
];

const agents = [
  {
    agent: "Brimstone",
    requiredAgent: "brimstone"
  },
  {
    agent: "Phoenix",
    requiredAgent: "phoenix"
  },
  {
    agent: "Sage",
    requiredAgent: "sage"
  },
  {
    agent: "Sova",
    requiredAgent: "sova"
  },
  {
    agent: "Viper",
    requiredAgent: "viper"
  },
  {
    agent: "Cypher",
    requiredAgent: "cypher"
  },
  {
    agent: "Reyna",
    requiredAgent: "reyna"
  },
  {
    agent: "Killjoy",
    requiredAgent: "killjoy"
  },
  {
    agent: "Breach",
    requiredAgent: "breach"
  },
  {
    agent: "Omen",
    requiredAgent: "omen"
  },
  {
    agent: "Jett",
    requiredAgent: "jett"
  },
  {
    agent: "Raze",
    requiredAgent: "raze"
  },
  {
    agent: "Skye",
    requiredAgent: "skye"
  },
  {
    agent: "Yoru",
    requiredAgent: "yoru"
  },
  {
    agent: "Astra",
    requiredAgent: "astra"
  },
  {
    agent: "Kay/O",
    requiredAgent: "kay/o"
  },
  {
    agent: "Chamber",
    requiredAgent: "chamber"
  },
  {
    agent: "Neon",
    requiredAgent: "neon"
  }
];

function round(int) {
  const split = int.toString().split(".");
  const decimal = parseFloat(split[1].split("")[0]);

  if (decimal >= 5) {
    return Math.ceil(int);
  } else {
    return Math.floor(int);
  };
};

function chooseProfile() {
  let index = round(Math.random() * players.length);

  if (index >= players.length) {
    index--;
  };

  let chosenProfile = players[index];

  profiles.forEach(profile => {
    if (profile.name == chosenProfile) {
      chosenProfile = profile;
    };
  });

  return chosenProfile;
};

function chooseAgent() {
  let index = round(Math.random() * agents.length);

  if (index >= agents.length) {
    index--;
  };

  const chosenAgent = agents[index];

  return chosenAgent;
};

function roulette(chosenProfile, chosenAgent, triedAgents, repeatedTimes) {
  if (repeatedTimes < 5000) {
    try {
      chosenProfile.agents.forEach(agent => {
        if (agent == chosenAgent.requiredAgent) {
          throw chosenAgent;
        };
      });
    } catch (chosenAgent) {
      return chosenAgent
    };

    return roulette(chosenProfile, chooseAgent(), triedAgents, repeatedTimes + 1);
  } else {
    return {
      agent: "Konnte keinen Agenten finden!",
      requiredAgent: ""
    };
  };
};

function loaded() {
  const header = document.getElementById("header");
  const infoimgs = document.getElementsByClassName("info-img");
  const infoimgarray = Array.from(infoimgs);
  const scrollButton = document.getElementById("scroll-button");
  const rouletteForm = document.getElementById("players-form");
  const rouletteButton = document.getElementById("roulette-button");
  const rouletteOutput = document.getElementById("roulette-output");
  const possiblePlayers = document.getElementById("possible-players");
  const playersDisplay = document.getElementById("players-display");

  let possiblePlayersString = "";

  profiles.forEach(profile => {
    possiblePlayersString += profile.name + "; ";
  });

  possiblePlayers.innerText = possiblePlayersString;

  function hideScrollButton(bool) {
      scrollButton.hidden = bool;
  };

  function checkScreenSize() {
      let width = document.body.clientWidth;

      if (width < 885) {
          infoimgarray.forEach(img => {
              if (img.hidden == false) {
                  img.hidden = true;
              };

              img.parentElement.style.flex = "0";
              //img.parentElement.parentElement.parentElement.style.textAlign = "center"
          });
      } else {
          infoimgarray.forEach(img => {
              if (img.hidden == true) {
                  img.hidden = false;
              };

              img.parentElement.style.flex = "1";
              //img.parentElement.parentElement.parentElement.style.textAlign = img.parentElement.parentElement.parentElement.className.replace("content-", "")
          });
      };
  };

  function checkScroll() {
      let scrollY = window.scrollY;

      if (scrollY > 750) {
          header.style.position = "sticky";
          header.style.backgroundColor = "#ffffff";
          header.style.top = Number(-header.clientHeight) + "px";

          if (scrollButton.hidden == true) {
              hideScrollButton(false);
              scrollButton.style.opacity = 1
          };
      } else if (scrollY > 0) {
          header.style.position = "sticky";
          header.style.backgroundColor = "#ffffff";
          header.style.top = "0px";

          if (scrollButton.hidden == true) {
              hideScrollButton(false);
              scrollButton.style.opacity = 1
          };
      } else {
          header.style.position = "sticky";
          header.style.backgroundColor = "#ffffff22";
          header.style.top = "0px";

          if (scrollButton.hidden == false) {
              scrollButton.style.opacity = 0;
              
              setTimeout(function() {
                  hideScrollButton(true);
              }, 500);
          };
      };
  };
  
  function scrollUp() {
      window.scrollTo(0, 0);
  };

  function startRoulette() {
    if (players.length > 0) {
      const chosenProfile = chooseProfile();
      const chosenAgent = chooseAgent();
      const agentString = roulette(chosenProfile, chosenAgent, [], 0).agent;

      rouletteOutput.innerText = chosenProfile.name + ": " + agentString;
    };
  };

  checkScreenSize();
  checkScroll();
  document.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", checkScreenSize);
  scrollButton.addEventListener("click", scrollUp);
  rouletteButton.addEventListener("click", startRoulette);

  rouletteForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    if (rouletteForm.players.value.split(", ").length > 0 && rouletteForm.players.value != "") {
      rouletteForm.players.value.split(", ").forEach(player => {
        profiles.forEach(profile => {
          if (profile.name == player) {
            if (players.length > 0) {
              let foundPlayer = false;
    
              players.forEach(arrayPlayer => {
                if (arrayPlayer == player) {
                  foundPlayer = true;
                };
              });
    
              if (!foundPlayer) {
                players.push(player);
              };

              playersDisplay.innerText = "Players playing: " + players.join(", ");
            } else {
              players.push(player);

              playersDisplay.innerText = "Players playing: " + players.join(", ");
            };
          };
        });
      });

      rouletteForm.players.value = "";
    } else {
      players = [];
      playersDisplay.innerText = "Players playing: No players!";
    };
  });
};