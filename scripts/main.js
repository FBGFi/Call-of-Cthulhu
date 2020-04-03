let clickableNumbers = document.getElementsByClassName('clickablenumbers');
let cells;
let cellDiv;
//console.log(clickableNumbers);
for (let i = 0; i < clickableNumbers.length; i++) {
    cells = clickableNumbers[i].cells;
    for (let j = 0; j < cells.length; j++) {
        cellDiv = cells[j].firstChild;
        //console.log(cells[j].firstChild.tagName);
        if(cellDiv != null && cellDiv.tagName == "DIV"){        
            cellDiv.addEventListener("click", (e) => {
                e.toElement.classList.toggle("clicked");              
            });        
        }   
    }
    
}
