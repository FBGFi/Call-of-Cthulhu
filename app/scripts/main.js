const keys = require('./scripts/valueKeys');
const electron = require('electron');
let savingData = false;
let playerName = localStorage.getItem("PLAYER_NAME");
let userData;

loadPage();
async function loadPage(){
    if(playerName != null && playerName.length > 0){ 
        try {
            userData = require('./saves/' + playerName + '.json');
            document.getElementById("fileName").value = playerName;
        } catch(e) {
            //alert("Player data not found!");
            electron.remote.dialog.showErrorBox('No data found', 'Player data has not been saved yet!');
            document.getElementById("fileName").value = "";
        }   
    }

    let tripleValues = document.getElementsByClassName("values");
    for (let i = 0; i < tripleValues.length; i++) {
        tripleValues[i].children[0].addEventListener(("change"), (e) => {
            let value = e.target.value;              
            let field = e.target;
            field.nextElementSibling.children[0].value = Math.floor(value/2);
            field.nextElementSibling.children[1].value = Math.floor(value/5); 
        });
    }

    document.getElementById("save").addEventListener(("click"), (e) => {
        saveData();
    });

    document.getElementById("load").addEventListener(("click"), (e) => {
        let filename = document.getElementById("fileName").value;
        let checkFile;
        try {
            checkFile = require('./saves/' + filename + '.json');
            if(filename != ""){
                localStorage.setItem("PLAYER_NAME", filename);
                location.reload();           
            }        
        } catch {
            electron.remote.dialog.showErrorBox('No data found', 'Player data has not been saved yet!');
        }      
    });

    addClickableEvents();
    if(userData != null){      
        countTriplesforMainSkills(keys.required.numbervalues.characteristics, userData.required.numbervalues.characteristics);
        countTriplesforMainSkills(keys.required.numbervalues.investigatorskills, userData.required.numbervalues.investigatorskills);
        getInvestigatorSkills(keys.optional.investigatorskills, userData.optional.investigatorskills);
        getPlayerInfo(keys.required.textvalues.playerInfo, userData.required.textvalues.playerInfo);
        getCashAndAssets(keys.required.textvalues.cash, userData.required.textvalues.cash);
        getGearAndPossessions(userData.optional.textvalues.gear);
        getFellowInvestigators(userData.optional.textvalues.fellowinvestigators);
        getPlayerInfo(keys.optional.textvalues.backstory, userData.optional.textvalues.backstory);
        getWeapons(keys.optional.textvalues.weapons, userData.optional.textvalues.weapons);
        getClickables(userData.required.selectables.hitpoints, "hitpoints");
        getClickables(userData.required.selectables.magicpoints, "magicpoints");
        getClickables(userData.required.selectables.luck, "luck");
        getClickables(userData.required.selectables.sanity, "sanity");
        getCheckBoxes(keys.optional.checkboxes, userData.optional.checkboxes);
        getInitNumbers(userData.required.numbervalues.maxhp, userData.required.numbervalues.maxsanity, userData.required.numbervalues.startsanity, userData.required.numbervalues.maxmp);
        getPlayerInfo(keys.required.numbervalues.combat, userData.required.numbervalues.combat);
        if(userData.optional.picture != ""){           
            document.getElementById("picture").style.backgroundImage = 'url("./styles/' + userData.optional.picture + '")';
        }
    }
    removeLoadingScreen();
}
async function saveData(){
    if(!savingData){
        savingData = true;
        console.log("saving");
        savingData = false;      
    }
}
async function removeLoadingScreen(){
    let loadingscreen = document.getElementById("loadingscreen");
    let loadHeader = document.createElement('h1');
    loadHeader.innerHTML = "Loading";
    await sleep(10);
    loadingscreen.appendChild(loadHeader);
    await sleep(500);   
    for (let i = 0; i < 5; i++) {
        loadingscreen.firstChild.innerHTML += '.';  
        await sleep(500);   
    }
    loadingscreen.remove();
}
async function addClickableEvents(){
    let clickableNumbers = document.getElementsByClassName('clickablenumbers');
    let cells;
    let cellDiv;
    for (let i = 0; i < clickableNumbers.length; i++) {
        cells = clickableNumbers[i].cells;
        for (let j = 0; j < cells.length; j++) {
            cellDiv = cells[j].firstChild;
            if(cellDiv != null && cellDiv.tagName == "DIV"){        
                cellDiv.addEventListener("click", (e) => {
                    let valueClass = e.toElement.parentNode.parentNode.parentNode;
                    if(valueClass.id != ""){
                        valueClass = valueClass.id;
                    }
                    else{
                        valueClass = "sanityValue";
                    }
                    e.toElement.classList.toggle("clicked"); 
                    e.toElement.classList.toggle(valueClass); 
                                
                });        
            }   
        }
        
    }
}
async function getInitNumbers(maxhp, maxsanity, startsanity, maxmp){    
    document.getElementById("maxhp").value = maxhp;
    document.getElementById("maxsanity").value = maxsanity;
    document.getElementById("startsanity").value = startsanity;
    document.getElementById("maxmp").value = maxmp;
}
async function getCheckBoxes(keyArr, data){
    let field;
    let value;
    
    for (let i = 0; i < keyArr.length; i++) {
        field = document.getElementById(keyArr[i]);  
        value = checkBool(data[keyArr[i]]);
        field.checked = value;                  
    }
}
async function getClickables(currentValue, id){   
    let row;
    let table;
    if(id != "sanity"){       
        table = document.getElementById(id); 
        for (let i = 0; i < table.children.length; i++) {
            row = table.children[i];                  
            for (let j = 0; j < row.children.length; j++) {
                if(row.children[j].children[0].innerHTML == currentValue){
                    row.children[j].children[0].classList.add("clicked");
                    row.children[j].children[0].classList.add(id);
                    return;
                }          
            }
            
        }
    }
    table = document.getElementsByClassName("sanity");  
    let rows;  
    for (let i = 0; i < table.length; i++) {  
        rows = table[i];         
        for (let j = 0; j < rows.children.length; j++) {           
            row = rows.children[j];           
            for (let k = 0; k < row.children.length; k++) {                
                if(row.children[k].children[0].innerHTML == currentValue){                   
                    row.children[k].children[0].classList.add("clicked");
                    row.children[k].children[0].classList.add(id);
                    return;
                } 
            }          
        }        
    }
}
async function getWeapons(keyArr, data){  
    let field;
    let value;   
    
    for (let i = 0; i < data.weapon.length; i++) {
        for (let j = 0; j < keyArr.length; j++) {
            field = document.getElementById(keyArr[j] + (i + 1));            
            value = data[keyArr[j]][i];
            field.value = value;  
        }                      
    }
    field = document.getElementById("uareg");            
    value = data.unarmed.regular;
    field.value = value;  
    field = document.getElementById("uahard");            
    value = data.unarmed.hard;
    field.value = value;  
    field = document.getElementById("uaext");            
    value = data.unarmed.extreme;
    field.value = value;  
}
async function getFellowInvestigators(data){
    let field;
    let value;
    
    for (let i = 0; i < data.length; i++) {
        field = document.getElementById("fellowchar" + (i + 1));  
        value = data[i][0];
        field.value = value;                  
        field = document.getElementById("fellowplayer" + (i + 1));  
        value = data[i][1];
        field.value = value;                  
    }
}
async function getGearAndPossessions(data){
    let field;
    let value;
    
    for (let i = 0; i < data.length; i++) {
        field = document.getElementById("gear" + (i + 1));  
        value = data[i];
        field.value = value;                  
    }
}
async function getCashAndAssets(keyArr, data){  
    let field;
    let value;
    
    for (let i = 0; i < keyArr.length-1; i++) {
        field = document.getElementById(keyArr[i]);  
        value = data[keyArr[i]];
        field.value = value;                  
    }
    for (let i = 0; i < data.assets.length; i++) {
        field = document.getElementById(keyArr[2] + (i + 1));  
        value = data.assets[i];
        field.value = value; 
    }
}
async function getPlayerInfo(keyArr, data){   
    let field;
    let value;
    
    for (let i = 0; i < keyArr.length; i++) {
        field = document.getElementById(keyArr[i]); 
        value = data[keyArr[i]];
        field.value = value; 
        if(keyArr[i] == "dodgeval"){
            countTriplesforMainSkills([keyArr[i]], {[keyArr[i]]:data[keyArr[i]]});
        }                 
    }
}
async function countTriplesforMainSkills(keyArr, data){
    let field;
    let value;
    for (let i = 0; i < keyArr.length; i++) {
        field = document.getElementById(keyArr[i]);  
        value = data[keyArr[i]];
        field.value = value;       
        field.nextElementSibling.children[0].value = Math.floor(value/2);
        field.nextElementSibling.children[1].value = Math.floor(value/5);              
    }
}
async function countTriplesforInvestigatorSkills(id, data){    
    let field = document.getElementById(id);
    let value = data[1];
    
    if(data.length == 3){
        field = field.nextElementSibling.nextElementSibling.children[0];              
        field.value = value; 
        field = field.nextElementSibling;
        field.children[0].value = Math.floor(value / 2);
        field.children[1].value = Math.floor(value / 5);
    } else {
        field = field.nextElementSibling.nextElementSibling.children[0];    
        field.value = value; 
        field.nextElementSibling.children[0].value = Math.floor(value / 2);
        field.nextElementSibling.children[1].value = Math.floor(value / 5);
    }      
}

async function getInvestigatorSkills(keyArr, json){
    let field;
    
    for (let i = 0; i < keyArr.length; i++) {
        if(Object.keys(json).includes(keyArr[i])){
            if(json[keyArr[i]][0] == "checked"){
                field = document.getElementById(keyArr[i]); 
                field.checked = true;
                if(json[keyArr[i]].length == 3 && !field.id.includes("custom")){
                    field.nextElementSibling.lastChild.value = json[keyArr[i]][2];
                    countTriplesforInvestigatorSkills(keyArr[i], json[keyArr[i]]);
                }
                else if(field.id.includes("custom")){
                    field.nextElementSibling.value = json[keyArr[i]][2];
                    countTriplesforInvestigatorSkills(keyArr[i], json[keyArr[i]]);
                }
                else{
                    countTriplesforInvestigatorSkills(keyArr[i], json[keyArr[i]]);
                }
            }
        }
        
    }
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
function checkBool(val){ 
    return val == "true" ? true : false;
}
