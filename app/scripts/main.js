const keys = require('./scripts/valueKeys');
const ageMods = require('./scripts/ageMods');
const electron = require('electron');
const fs = require('fs');

let savingData = false;
let playerName = localStorage.getItem("PLAYER_NAME");
let userData;

loadPage();
async function loadPage(){
    if (electron == undefined) {
        await sleep(1000);
    }
    if(playerName != null && playerName.length > 0){ 
        try {
            userData = require('./saves/' + playerName + '.json');
            document.getElementById("fileName").value = playerName;
        } catch(e) {
            userData = require('./scripts/defaultData.json');
            showAlert('No data found', 'Player data has not been saved yet!', "error");
            document.getElementById("fileName").value = "";
        }   
    }
    else{
        userData = require('./scripts/defaultData.json');
    }

    addEventListeners();
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
        checkPicture(userData.optional.picture);
    }
    removeLoadingScreen();
}
async function addEventListeners(){  
    document.getElementById("confirm").addEventListener("click", (e) => {
        document.getElementById("infocontainer").remove();
    });

    if(checkBool(userData.required.valuescalculated)){
        document.getElementById("maincalcs").remove();
        document.getElementById("infocontainer").remove();
    } else {       
        document.getElementById("maincalcs").addEventListener("click", async (e) => {
            userData.required.numbervalues.characteristics = await calculateMainValues(userData.required.numbervalues.characteristics);
            document.getElementById("maincalcs").remove();
            let age = document.getElementById("age").value;           
            let infoText;
            for (let i = 0; i < ageMods.length; i++) {
                if(age < 15){
                    document.getElementById("infocontainer").remove();
                    return;
                } else if(age <= ageMods[i][0]){
                    infoText = ageMods[i][1];
                    break;
                }              
            }           
            document.getElementById("infotext").innerHTML = infoText;
            document.getElementById("infocontainer").style.visibility = "visible";
        });
    }
    
    addClickableEvents();
    addDiceListeners();
    let tripleValues = document.getElementsByClassName("values");
    for (let i = 0; i < tripleValues.length; i++) {
        tripleValues[i].children[0].addEventListener(("change"), (e) => {
            tripleValueEvent(e);
        });
    }
    
    document.getElementById("calculate").addEventListener(("click"), async (e) => {
        if(!checkBool(userData.required.valuescalculated)){
            calculateValues();
        }
        else{
            let promise = await showAlert("Already calculated!", "Confirm to do recalculations", "warning", "Confirm");
            if(promise.checkboxChecked){
                calculateValues();      
            }
            
        }
    });
    document.getElementById("pictureInput").addEventListener(("change"), (e) => {
        let type = e.target.files[0].type;
        if(type == "image/png" || type == "image/jpeg" || type == "image/jpg" || type == "image/svg+xml"){
            let path = e.target.files[0].path;                    
            path = path.replace(/\\/g, '/');                
            document.getElementById("picture").style.backgroundImage = 'url("' + path + '")';
            userData.optional.picture = path;
        }
        else{
            showAlert("Wrong filetype", "Only .jpg .jpeg .png and .svg files are accepted!");
            document.getElementById("picture").attributes.removeNamedItem("style");
        }
               
    });

    document.getElementById("new").addEventListener(("click"), (e) => {
        localStorage.removeItem("PLAYER_NAME");
        location.reload();
    });

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
            showAlert('No data found', 'Player data has not been saved yet!', "error");
        }      
    });
}
async function addDiceListeners(){
    document.getElementById("d4").addEventListener("click", (e) => {
        let rollcount = document.getElementById("rollcount").value;
        let value = rollDfour(rollcount);
        e.target.nextElementSibling.value = value;        
    });
    document.getElementById("d6").addEventListener("click", (e) => {
        let rollcount = document.getElementById("rollcount").value;
        let value = rollDsix(rollcount);
        e.target.nextElementSibling.value = value;        
    });
    document.getElementById("d8").addEventListener("click", (e) => {
        let rollcount = document.getElementById("rollcount").value;
        let value = rollDeight(rollcount);
        e.target.nextElementSibling.value = value;        
    });
    document.getElementById("d10").addEventListener("click", (e) => {
        let rollcount = document.getElementById("rollcount").value;
        let value = rollDten(rollcount);
        e.target.nextElementSibling.value = value;        
    });
    document.getElementById("d12").addEventListener("click", (e) => {
        let rollcount = document.getElementById("rollcount").value;
        let value = rollDtwelve(rollcount);
        e.target.nextElementSibling.value = value;        
    });
    document.getElementById("d20").addEventListener("click", (e) => {
        let rollcount = document.getElementById("rollcount").value;
        let value = rollDtwenty(rollcount);
        e.target.nextElementSibling.value = value;        
    });
    document.getElementById("d100").addEventListener("click", (e) => {
        let rollcount = document.getElementById("rollcount").value;
        let value = rollDhundred(rollcount);
        e.target.nextElementSibling.value = value;        
    });
    document.getElementById("hidedice").addEventListener("click", async (e) => {
        let footer = document.getElementById("footer");
        let arrows = document.getElementById("arrows");
        footer.classList.toggle("hidden");  
             
        if(footer.classList.value == "hidden"){           
            arrows.innerHTML = "&gt;&gt;";
        } else {
            arrows.innerHTML = "&lt;&lt;";
        }
    });
}
function tripleValueEvent(e){  
    let value = e.target.value;              
    let field = e.target;
    field.nextElementSibling.children[0].value = Math.floor(value/2);
    field.nextElementSibling.children[1].value = Math.floor(value/5); 
}
async function saveData(){
    if(!savingData){
        savingData = true;
        playerName = document.getElementById("fileName").value;
        if(playerName == null || playerName == ""){
            showAlert("No name!", "Enter name for your character in the header!");
            savingData = false;
            return;
        }
        localStorage.setItem("PLAYER_NAME", playerName);
        let data = JSON.stringify(userData);
        fs.writeFile('./app/saves/' + playerName + '.json', data, (err) => {
            if(err) throw err;
            showAlert("Saved!", "Character saved for: " + playerName, "info");
        });
        savingData = false;      
    }
}

async function removeLoadingScreen(){
    let loadingscreen = document.getElementById("loadingscreen");
    let loadHeader = document.createElement('h1');
    loadHeader.innerHTML = "Loading...";
    await sleep(10);
    loadingscreen.style.backgroundImage = 'url("./styles/paper_dark.jpeg")';
    await sleep(10);
    loadingscreen.appendChild(loadHeader);
    await sleep(5000); 
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
                    let oldValue;
                    
                    if(valueClass.id != ""){
                        valueClass = valueClass.id;
                    }
                    else{
                        valueClass = "sanityValue"; 
                    }
                    
                    oldValue = document.getElementsByClassName("clicked " + valueClass);                                    
                    if(oldValue.length > 0){
                        oldValue[0].classList.value = "";
                    }    

                    e.toElement.classList.toggle("clicked"); 
                    e.toElement.classList.toggle(valueClass); 
                                
                });        
            }   
        }
        
    }
}
async function checkPicture(path){   
    if(path != ""){   
        if(ImageExist(userData.optional.picture)){
            document.getElementById("picture").style.backgroundImage = 'url("' + path + '")'; 
        }  
        else{
            document.getElementById("picture").style.backgroundImage = "./saves/profile.jpg";
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
                    row.children[k].children[0].classList.add(id + "Value");
                    return;
                } 
            }          
        }        
    }
}
function calculateMainValues(data){
    let value = 0;
    let target = "";
    let e = {target: target};

    value = rollDsix(3) * 5;
    data.str = value;
    target = document.getElementById("str");
    target.value = value;
    e.target = target;
    tripleValueEvent(e);

    value = rollDsix(3) * 5;
    data.con = value;
    target = document.getElementById("con");
    target.value = value;
    e.target = target;
    tripleValueEvent(e);

    value = (rollDsix(2) + 6) * 5;
    data.int = value;
    target = document.getElementById("int");
    target.value = value;
    e.target = target;
    tripleValueEvent(e);

    value = rollDsix(3) * 5;
    data.pow = value;
    target = document.getElementById("pow");
    target.value = value;
    e.target = target;
    tripleValueEvent(e);

    value = rollDsix(3) * 5;
    data.app = value;
    target = document.getElementById("app");
    target.value = value;
    e.target = target;
    tripleValueEvent(e);

    value = rollDsix(3) * 5;
    data.dex = value;
    target = document.getElementById("dex");
    target.value = value;
    e.target = target;
    tripleValueEvent(e);

    value = (rollDsix(2) + 6) * 5;
    data.siz = value;
    target = document.getElementById("siz");
    target.value = value;
    e.target = target;
    tripleValueEvent(e);

    value = (rollDsix(2) + 6) * 5;
    data.edu = value;
    target = document.getElementById("edu");
    target.value = value;
    e.target = target;
    tripleValueEvent(e);



    return data;
}
function calculateDBandBuild(val){
    val = parseInt(val);   
    const valueTable = [
        [64,-2,-2],
        [84,-1,-1],
        [124,0,0],
        [164,"+1d4",1],
        [204,"+1d6",2],
        [284,"+2d6",3],
        [364,"+3d6",4],
        [444,"+4d6",5],
        [524,"+5d6",6],
    ];
    for (let i = 0; i < valueTable.length; i++) {
        if(val <= valueTable[i][0]){           
            return valueTable[i];
        }       
    }
    let returnValue = valueTable[8];   
    val -= returnValue[0];
    val = Math.floor(val/80);
    returnValue[1] = "+" + (5+val) + "d6";
    returnValue[2] += val;
    return returnValue;
}
function getMoveRate(dex,str,siz){   
    let age = parseInt(document.getElementById("age").value);
    let deduct = [
        [49,1],
        [59,2],
        [69,3],
        [79,4]
    ]
    if(age < 40){
        age = 0;
    }
    else if(age >= 80){
        age = 5;
    }
    else{
        for (let i = 0; i < deduct.length; i++) {
            if(age < deduct[i][0]){
                age = deduct[i][1];
            }         
        }
    }
    if(dex < siz && str < siz){
        return 7 - age;
    } 
    else if(str > siz && dex > siz){
        return 9 - age;
    }
    else{
        return 8 - age;
    }

}
async function calculateValues(){  
    let oldClickeds = await document.getElementsByClassName("clicked");
    let count = oldClickeds.length;
    for (let i = 0; i < count; i++) {      
        oldClickeds[0].classList.value = "";               
    }
    
    let dex = document.getElementById("dex").value;;
    let str = document.getElementById("str").value;;
    let siz = document.getElementById("siz").value;
    let pow = document.getElementById("pow").value;
    let con = document.getElementById("con").value;
    let value = pow;
    getClickables(Math.floor(value/5), "magicpoints");
    getClickables(value, "sanity");
    document.getElementById("startsanity").value = value;
    document.getElementById("maxsanity").value = value;
    document.getElementById("maxmp").value = Math.floor(value/5);
    userData.required.selectables.magicpoints = Math.floor(value/5);
    userData.required.selectables.sanity = value;
    
    value = parseInt(siz) + parseInt(con);
    value = Math.floor(value / 10);
    getClickables(value, "hitpoints");
    document.getElementById("maxhp").value = value;
    userData.required.selectables.hitpoints = value;
    
    value = rollDsix(3);
    value = value * 5;  
    getClickables(value, "luck");
    userData.required.selectables.luck = value;
  
    let target = "";
    let e = {target: target};
    value = Math.floor(dex / 2);
    userData.required.numbervalues.combat.dodgeval = value;
    userData.optional.investigatorskills.dodge[1] = value;
    target = document.getElementById("dodgeval");
    target.value = value;
    e.target = target;
    tripleValueEvent(e);
    target = document.getElementById("dodge").nextElementSibling.nextElementSibling.children[0];
    target.value = value;
    e.target = target;
    tripleValueEvent(e);

    value = parseInt(siz) + parseInt(str);
    value = calculateDBandBuild(value);
    userData.required.numbervalues.combat.dmgbonus = value[1];
    userData.required.numbervalues.combat.build = value[2];
    document.getElementById("dmgbonus").value = value[1];
    document.getElementById("build").value = value[2];

    value = getMoveRate(parseInt(dex),parseInt(str),parseInt(siz));
    userData.required.numbervalues.characteristics.move = value;
    target = document.getElementById("move");
    target.value = value;
    e.target = target;
    tripleValueEvent(e);
    
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
async function showAlert(title, message, type = "warning", checkBoxLabel) { 
    if(electron != undefined){       
        let promise = await electron.remote.dialog.showMessageBox({
            type: type,
            title: title,
            message: message,
            checkboxLabel: checkBoxLabel
        });
        return promise;
    } 
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
function checkBool(val){ 
    return val == "true" ? true : false;
}
async function ImageExist(url) 
{  
    var img = new Image();
    img.src = url;
    await sleep(100);  
    return img.height != 0;
}

function rollDsix(times = 1){
    let returnValue = 0;
    for (let i = 0; i < times; i++) {       
        returnValue += Math.floor(Math.random() * 6) + 1;;      
    }
    return returnValue;
}
function rollDfour(times = 1){
    let returnValue = 0;
    for (let i = 0; i < times; i++) {       
        returnValue += Math.floor(Math.random() * 4) + 1;;      
    }
    return returnValue;
}
function rollDtwenty(times = 1){
    let returnValue = 0;
    for (let i = 0; i < times; i++) {       
        returnValue += Math.floor(Math.random() * 20) + 1;;      
    }
    return returnValue;
}
function rollDhundred(times = 1){
    let returnValue = 0;
    for (let i = 0; i < times; i++) {       
        returnValue += Math.floor(Math.random() * 100) + 1;;      
    }
    return returnValue;
}
function rollDeight(times = 1){
    let returnValue = 0;
    for (let i = 0; i < times; i++) {       
        returnValue += Math.floor(Math.random() * 6) + 1;;      
    }
    return returnValue;
}
function rollDten(times = 1){
    let returnValue = 0;
    for (let i = 0; i < times; i++) {       
        returnValue += Math.floor(Math.random() * 10) + 1;;      
    }
    return returnValue;
}
function rollDtwelve(times = 1){
    let returnValue = 0;
    for (let i = 0; i < times; i++) {       
        returnValue += Math.floor(Math.random() * 12) + 1;;      
    }
    return returnValue;
}
