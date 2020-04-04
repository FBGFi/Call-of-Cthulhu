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

const keys = require('./scripts/valueKeys');
countTriplesforMainSkills(keys.required.numbervalues.characteristics);
countTriplesforMainSkills(keys.required.numbervalues.investigatorskills);
getInvestigatorSkills(keys.optional.investigatorskills);


async function countTriplesforMainSkills(keyArr){
    let field;
    for (let i = 0; i < keyArr.length; i++) {
        field = document.getElementById(keyArr[i]);        
        field.value = 6;
        //console.log(field.nextElementSibling.firstChild);
        
        field.nextElementSibling.children[0].value = Math.floor(6/2);
        field.nextElementSibling.children[1].value = Math.floor(6/5);
               
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

async function getInvestigatorSkills(keyArr){
    let field;
    let testJSON = {
        "accounting" : [
            "checked",
            "10"
        ],
        "artcraft" : [
            "checked",
            "20",
            "Painting"
        ],
        "custom1" : [
            "checked",
            "30",
            "Master baiter"
        ]

    };
    
    for (let i = 0; i < keyArr.length; i++) {
        if(Object.keys(testJSON).includes(keyArr[i])){
            if(testJSON[keyArr[i]][0] == "checked"){
                field = document.getElementById(keyArr[i]); 
                field.checked = true;
                if(testJSON[keyArr[i]].length == 3 && !field.id.includes("custom")){
                    field.nextElementSibling.lastChild.value = testJSON[keyArr[i]][2];
                    countTriplesforInvestigatorSkills(keyArr[i], testJSON[keyArr[i]]);
                }
                else if(field.id.includes("custom")){
                    field.nextElementSibling.value = testJSON[keyArr[i]][2];
                    countTriplesforInvestigatorSkills(keyArr[i], testJSON[keyArr[i]]);
                }
                else{
                    countTriplesforInvestigatorSkills(keyArr[i], testJSON[keyArr[i]]);
                }
            }
        }
        
    }
}

