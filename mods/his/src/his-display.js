
  displayFactionSheet(faction) {

    this.overlay.showOverlay(this.app, this, this.factions[faction].returnFactionSheet(faction));
    let controlled_keys = 0;
    
    for (let key in this.spaces) {
      if (this.spaces[key].type === "key") {
        if (this.spaces[key].political === this.factions[faction].key || (this.spaces[key].political === "" && this.spaces[key].home === this.factions[faction].key)) {
          controlled_keys++;
	}
      }
    }
    let keyboxen = '';
 
    // ENGLAND
    if (this.factions[faction].key === "england") {
      let total_keys = 9;
      let remaining_keys = total_keys - controlled_keys;
      for (let i = this.factions[faction].marital_status; i < 7; i++) {
          keyboxen += `<div class="faction_sheet_keytile england_marital_status${i+1}" id="england_marital_status_keytile${i+1}"></div>`;
      }
      for (let i = 1; i <= 9; i++) {
        if (i > (9-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    // FRANCE
    if (this.factions[faction].key === "france") {
      let total_keys = 11;
      let remaining_keys = total_keys - controlled_keys;
      for (let i = 0; i < 7; i++) {
          keyboxen += `<div class="faction_sheet_keytile france_chateaux_status${i+1}" id="france_chateaux_status_keytile${i+1}"></div>`;
      }
      for (let i = 1; i <= 11; i++) {
        if (i > (11-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    // OTTOMAN
    if (this.factions[faction].key === "ottoman") {
      let total_keys = 11;
      let remaining_keys = total_keys - controlled_keys;
      for (let i = 0; i <= 10; i++) {
          keyboxen += `<div class="faction_sheet_keytile ottoman_piracy_status${i}" id="ottoman_piracy_status_keytile${i}"></div>`;
      }
      for (let i = 1; i <= 11; i++) {
        if (i > (11-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    // PAPACY
    if (this.factions[faction].key === "papacy") {
      let total_keys = 7;
      let remaining_keys = total_keys - controlled_keys;
      for (let i = 0; i < 12; i++) {
          keyboxen += `<div class="faction_sheet_keytile papacy_construction_status${i+1}" id="papacy_construction_status_keytile${i+1}"></div>`;
      }
      for (let i = 1; i <= 7; i++) {
        if (i >= (7-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    // PROTESTANTS
    if (this.factions[faction].key === "protestant") {
      let total_keys = 11;
      let remaining_keys = total_keys - controlled_keys;
      for (let i = 0; i <= 6; i++) {
          keyboxen += `<div class="faction_sheet_keytile protestant_translation_status${i}" id="protestant_translation_status_keytile${i}"></div>`;
      }
      for (let i = 1; i <= 11; i++) {
        if (i > (11-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    // HAPSBURG
    if (this.factions[faction].key === "hapsburg") {
      let total_keys = 14;
      let remaining_keys = total_keys - controlled_keys;
console.log("remaining keys for hapsburgs: " +remaining_keys + " ------ " + controlled_keys);
      for (let i = 1; i <= 14; i++) {
        if (i > (14-remaining_keys)) {
          keyboxen += `<div class="faction_sheet_keytile faction_sheet_${this.factions[faction].key}_keytile${i}" id="faction_sheet_keytile${i}"></div>`;
        }
      }
    }
    document.getElementById("faction_sheet").innerHTML = keyboxen;
  }

  returnFactionSheetKeys() {
    
  }

  displayBoard() {
    try {
      this.displayColony();
      this.displayConquest();
      this.displayElectorateDisplay();
      this.displayNewWorld();
      this.displaySpaces();
      this.displayVictoryTrack();
    } catch (err) {
      console.log("error displaying board... " + err);
    }
  }

  displayColony() {
  }

  displayConquest() {
  }

  displayNewWorld() {
  }

  displaySpaceDetailedView(name) {
    let html = this.spaces[name].returnView();    
    this.overlay.show(this.app, this, html);
  }

  displayElectorateDisplay() {
    let elecs = this.returnElectorateDisplay();
    for (let key in elecs) {
      let obj = document.getElementById(`ed_${key}`);
      let tile = this.returnSpaceTile(this.spaces[key]);
      obj.innerHTML = ` <img class="hextile" src="${tile}" />`;      
    }
  }

  returnSpaceTile(space) {

    let owner = space.political;
    if (owner == "") { owner = space.home; }
    let tile = "";
    let stype = "hex";

    if (space.type == "town") { stype = "hex"; }
    if (space.type == "key") { stype = "key"; }

    if (owner != "") {
      if (owner === "hapsburg") {
        tile = "/his/img/tiles/hapsburg/";	  
        if (space.religion === "protestant") {
          tile += `Hapsburg_${stype}_back.svg`;
        } else {
          tile += `Hapsburg_${stype}.svg`;
        }
      }
      if (owner === "england") {
        tile = "/his/img/tiles/england/";	  
        if (space.religion === "protestant") {
          tile += `England_${stype}_back.svg`;
        } else {
          tile += `England_${stype}.svg`;
        }
      }
      if (owner === "france") {
        tile = "/his/img/tiles/france/";	  
        if (space.religion === "protestant") {
          tile += `France_${stype}_back.svg`;
        } else {
          tile += `France_${stype}.svg`;
        }
      }
      if (owner === "papacy") {
        tile = "/his/img/tiles/papacy/";	  
        if (space.religion === "protestant") {
          tile += `Papacy_${stype}_back.svg`;
	} else {
	  tile += `Papacy_${stype}.svg`;
	}
      }
      if (owner === "protestant") {
        tile = "/his/img/tiles/protestant/";	  
        if (space.religion === "protestant") {
          tile += `Protestant_${stype}_back.svg`;
        } else {
          tile += `Protestant_${stype}.svg`;
        }
      }
      if (owner === "ottoman") {
        tile = "/his/img/tiles/ottoman/";	  
        if (space.religion === "protestant") {
          tile += `Ottoman_${stype}_back.svg`;
        } else {
          tile += `Ottoman_${stype}.svg`;
        }
      }
    }

    return tile;

  }

  returnArmies(space) {

    let html = '<div class="space_army" id="">';
    let owner = space.political;
    if (owner == "") { owner = space.home; }
    let tile = "";


    for (let z = 0; z < this.game.players.length; z++) {

      let army = 0;
      for (let zz = 0; zz < space.units[z].length; zz++) {
	if (space.units[z][zz].type === "regular") {
	  army++;
	}
      }

      while (army >= 1) {
        if (owner != "") {
          if (owner === "hapsburg") {
            tile = "/his/img/tiles/hapsburg/";	  
	    if (army >= 4) {
              tile += `HapsburgReg-4.svg`;
	      army -= 4;
	    }
	    if (army >= 2) {
              tile += `HapsburgReg-2.svg`;
	      army -= 2;
	    }
	    if (army >= 1) {
              tile += `HapsburgReg-1.svg`;
	      army -= 1;
	    }
          }
          if (owner === "england") {
            tile = "/his/img/tiles/england/";	  
	    if (army >= 4) {
              tile += `EnglandReg-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `EnglandReg-2.svg`;
	      army -= 4;
            }
	    if (army >= 1) {
              tile += `EnglandReg-1.svg`;
	      army -= 1;
            }
          }
          if (owner === "france") {
            tile = "/his/img/tiles/france/";	  
	    if (army >= 4) {
              tile += `FrenchReg-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `FrenchReg-2.svg`;
	      army -= 2;
            }
	    if (army >= 1) {
              tile += `FrenchReg-1.svg`;
	      army -= 1;
            }
          }
          if (owner === "papacy") {
            tile = "/his/img/tiles/papacy/";	  
	    if (army >= 4) {
              tile += `PapacyReg-4.svg`;
	      army -= 4;
	    }
	    if (army >= 2) {
              tile += `PapacyReg-2.svg`;
	      army -= 2;
	    }
	    if (army >= 1) {
              tile += `PapacyReg-1.svg`;
	      army -= 1;
	    }
          }
          if (owner === "protestant") {
            tile = "/his/img/tiles/protestant/";	  
	    if (army >= 4) {
              tile += `ProtestantReg-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `ProtestantReg-2.svg`;
	      army -= 2;
            }
	    if (army >= 1) {
              tile += `ProtestantReg-1.svg`;
	      army -= 1;
            }
          }
          if (owner === "ottoman") {
            tile = "/his/img/tiles/ottoman/";	  
	    if (army >= 4) {
              tile += `OttomanReg-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `OttomanReg-2.svg`;
	      army -= 2;
            }
	    if (army >= 1) {
              tile += `OttomanReg-1.svg`;
	      army -= 1;
            }
          }
        }
        html += `<img class="army_tile" src="${tile}" />`;
      }
    }

    html += '</div>';

    if (tile === "") { return tile; }

    return html;

  }

  returnMercenaries(space) {

    let html = '<div class="space_mercenaries" id="">';
    let owner = space.political;
    if (owner == "") { owner = space.home; }
    let tile = "";

    for (let z = 0; z < this.game.players.length; z++) {

      let army = 0;
      for (let zz = 0; zz < space.units[z].length; zz++) {
        if (space.units[z][zz].type === "mercenary") {
          army++;
        }
      }

      for (let i = 0; i < army; i+= 2) {
        if (owner != "") {
          if (owner === "hapsburg") {
            tile = "/his/img/tiles/hapsburg/";	  
	    if (army >= 4) {
              tile += `HapsburgMerc-4.svg`;
	      army -= 4;
	    }
	    if (army >= 2) {
              tile += `HapsburgMerc-2.svg`;
	      army -= 2;
	    }
	    if (army >= 1) {
              tile += `HapsburgMerc-1.svg`;
	      army -= 1;
	    }
          }
          if (owner === "england") {
            tile = "/his/img/tiles/england/";	  
	    if (army >= 4) {
              tile += `EnglandMerc-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `EnglandMerc-2.svg`;
	      army -= 4;
            }
	    if (army >= 1) {
              tile += `EnglandMerc-1.svg`;
	      army -= 1;
            }
          }
          if (owner === "france") {
            tile = "/his/img/tiles/france/";	  
	    if (army >= 4) {
              tile += `FrenchMerc-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `FrenchMerc-2.svg`;
	      army -= 2;
            }
	    if (army >= 1) {
              tile += `FrenchMerc-1.svg`;
	      army -= 1;
            }
          }
          if (owner === "papacy") {
            tile = "/his/img/tiles/papacy/";	  
	    if (army >= 4) {
              tile += `PapacyMerc-4.svg`;
	      army -= 4;
	    }
	    if (army >= 2) {
              tile += `PapacyMerc-2.svg`;
	      army -= 2;
	    }
	    if (army >= 1) {
              tile += `PapacyMerc-1.svg`;
	      army -= 1;
	    }
          }
          if (owner === "protestant") {
            tile = "/his/img/tiles/protestant/";	  
	    if (army >= 4) {
              tile += `ProtestantMerc-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `ProtestantMerc-2.svg`;
	      army -= 2;
            }
	    if (army >= 1) {
              tile += `ProtestantMerc-1.svg`;
	      army -= 1;
            }
          }
          if (owner === "ottoman") {
            tile = "/his/img/tiles/ottoman/";	  
	    if (army >= 4) {
              tile += `OttomanMerc-4.svg`;
	      army -= 4;
            }
	    if (army >= 2) {
              tile += `OttomanMerc-2.svg`;
	      army -= 2;
            }
	    if (army >= 1) {
              tile += `OttomanMerc-1.svg`;
	      army -= 1;
            }
          }
        }
        html += `<img class="mercenary_tile" src="${tile}" />`;
      }
    }

    html += '</div>';

    if (tile === "") { return tile; }

    return html;

  }

  returnDebaters(space) {

    let html = '<div class="debater_tile" id="">';
    let owner = space.political;
    if (owner == "") { owner = space.home; }
    let tile = "";

    for (let z = 0; z < this.game.players.length; z++) {
      for (let zz = 0; zz < space.units[z].length; zz++) {
	if (space.units[z][zz].type === "debater") {
          html += '<img src="/his/img/tiles/debaters/AleanderDebater_back.svg" />';
	  tile = html;
	}
      }
    }

    html += '</div>';

    if (tile === "") { return tile; }

    return html;

  }

  displaySpace(key) {

    let obj = document.getElementById(key);
    let space = this.spaces[key];
    let tile = this.returnSpaceTile(space);
    let stype = "hex";

    if (space.type == "town") { stype = "hex"; }
    if (space.type == "key") { stype = "key"; }

    //
    // should we show the tile?
    //
    let show_tile = 1;

    //
    // do not show under some conditions
    //
    if (space.political == space.home) { show_tile = 0; }
    if (space.political === "") { show_tile = 0; }

    //
    // and force for keys
    //
    if (space.home === "" && space.political !== "") { show_tile = 1; }
    if (space.type === "key") { show_tile = 1; }

    //
    // sanity check
    //
    if (tile === "") { show_tile = 0; }

    if (show_tile === 1) {
      obj.innerHTML = `<img class="${stype}tile" src="${tile}" />`;
      obj.innerHTML += this.returnArmies(space);
      obj.innerHTML += this.returnMercenaries(space);
      obj.innerHTML += this.returnDebaters(space);
    }

  }


  displaySpaces() {

    //
    // add tiles
    //
    for (let key in this.spaces) {
      if (this.spaces.hasOwnProperty(key)) {
	this.displaySpace(key);
      }
    }

    //
    // add click event
    //
    for (let key in this.spaces) {
      if (this.spaces.hasOwnProperty(key)) {
        document.getElementById(key).onclick = (e) => {
	  this.displaySpaceDetailedView(key);
        }
      }
    }

  }

  displayVictoryTrack() {
  }



