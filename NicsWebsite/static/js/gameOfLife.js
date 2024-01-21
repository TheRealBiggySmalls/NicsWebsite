var rows = 100;
var cols = 100;
var active = false;

var thisGrid = new Array(rows);
var nextGrid = new Array(rows);

//JUST want a random grid and to have it auto play initially

//init grid - NOTE: need to manually call later
function initGrid(grid) {
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(cols);
    }
}

//randomises a grid with values
function randomGrid(grid){
    for (var i=0;i<rows;i++){ //can do rows.length here, but its a useless computation
        for (var j=0;j<cols;j++){

            //get cell
            var cell = document.getElementById(i + "_" + j);

            life = Math.round(Math.random());
            if(life == 1){
                cell.setAttribute("class", "live");
            }else{
                cell.setAttribute("class", "dead");
            }
            grid[i][j] = life; //store actual numerical value
        }
    }
}

function resetGrid(grid){
    for(var i =0;i<rows;i++){
        for(var j=0;j<cols;j++){
            grid[i][j] = 0;
        }
    }
}

// Table/cell generation code copied from: https://codepen.io/RBSpatz/pen/rLyNLb
// cell clicker commented out
function createTable() {
    var gridContainer = document.getElementById('gameContainer');
    if (!gridContainer) {
        console.error("Problem: No div for the drid table!");
    }
    var table = document.createElement("table");
    
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {//
            var cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead"); //initially sets all table cells to dead on instantiation
            //cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }

    gridContainer.appendChild(table);
}

function updateView() {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = document.getElementById(i + "_" + j);
            if (thisGrid[i][j] == 0) {
                cell.setAttribute("class", "dead");
            } else {
                cell.setAttribute("class", "live");
            }
        }
    }
}

function play() {
    computeNextGen();
    
    if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() { //figures out the next generation by applying neighbour logic
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            applyRules(i, j);  //computes num neighbours and applies rules to nextGrid
        }
    }
    
    //copies new config, and resets 'temporary' new grid
    thisGrid = nextGrid;
    resetGrid(nextGrid);

    updateView();
}

function applyRules(row, col){
    //implicitly change nextGrid values here, or change to applyRules(row, col, grid)

    var numNeighbors = countNeighbors(row, col);

    //GAME OF LIFE RULES:
    //A living cell dies if it has fewer than two living neighboring cells.
    //A living cell with two or three living neighbors lives on.
    //A living cell with more than three living neighboring cells dies in the next time step.
    //A dead cell is revived if it has exactly three living neighboring cells.

    //directly change nextGrid values here
    if(thisGrid[row][col]==1){//it's alive
        if(numNeighbours==2 || numNeighbours==3){ //only need one alive condition check. Anything else is dead
            nextGrid[row][col] = 1;
        }else{
            nextGrid[row][col] = 0;
        }
    }else{ //we already dead
        if(numNeighbours==3){
            nextGrid[row][col] = 1;
        }
    }
    
}

function countNeighbors(row, col) { //TRY TO IMPLEMENT YOURSELF

    var count = 0;

    //out of bounds checkers for column values so we only do one computation for each
    var rowAheadOOB = false;
    var rowBehindOOB = false;
    var colAheadOOB = false;
    var colBehindOOB = false;

    if(col+1>cols){//cols-1??? 
        colAheadOOB = true;
    }
    if(col-1<0){
        colBehindOOB = true;
    }
    if(row+1>rows){
        rowAheadOOB = true;
    }
    if(row-1<0){
        rowBehindOOB = true;
    }


    if(!rowBehindOOB){ //3 rows 'behind' this square. Implicitly add for 'this' square too when doing col checks
        if(thisGrid[row-1][col]==1){
            count++;
        }
        if(!colBehindOOB){
            if(thisGrid[row-1][col-1]==1){
                count++;
            }
            if(thisGrid[row][col-1]==1){
                count++;
            }
        }
        if(!colAheadOOB){
            if(thisGrid[row-1][col+1]==1){
                count++;
            }
            if(thisGrid[row][col+1]==1){
                count++;
            }
        }
    }

    //now for square 'ahead' of this one
    if(!rowAheadOOB){
        if(thisGrid[row+1][col]==1){
            count++;
        }
        if(!colBehindOOB){
            if(thisGrid[row+1][col-1]==1){
                count++;
            }
        }
        if(!colAheadOOB){
            if(thisGrid[row+1][col+1]==1){
                count++;
            }
        }
    }

    return count;
}

// Start everything
window.onload = initialize; //TODO: INIT HERE ETC


//TODO: DONT FORGET TO INIT NEXTGRID