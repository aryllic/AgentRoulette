let players = [];

const profiles = [
  {
    name: "markus",
    agents: ["raze", "reyna", "brimstone"]
  },
  {
    name: "qtynz",
    agents: ["reyna", "neon", "jett"]
  }
];

const strats = [
  {
    aufgabe: "eine aufgabe",
    requiredAgent: ""
  },
  {
    aufgabe: "eine aufgabe, die raze benötigt",
    requiredAgent: "raze"
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

function chooseStrat() {
  let index = round(Math.random() * strats.length);

  if (index >= strats.length) {
    index--;
  };

  const chosenStrat = strats[index];

  return chosenStrat;
};

function roulette(profile, strat, repeatedTimes) {
  if (repeatedTimes < 5000) {
    if (strat.requiredAgent != "") {
      try {
        profile.agents.forEach(agent => {
          if (agent == strat.requiredAgent) {
            throw strat;
          };
        });
      } catch (strat) {
        return strat
      };

      return roulette(profile, strat, repeatedTimes + 1);
    } else {
      return strat;
    };
  } else {
    return {
      aufgabe: "Konnte keine Aufgabe finden!",
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
      const profile = chooseProfile();
      const strat = chooseStrat();
      const aufgabe = roulette(profile, strat, 0).aufgabe;

      rouletteOutput.innerText = profile.name + ": " + aufgabe;
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
    
    if (rouletteForm.players.value != "") {
      players = rouletteForm.players.value.split(", ");
      rouletteForm.players.value = "";
    } else {
      players = [];
    };
  });
};