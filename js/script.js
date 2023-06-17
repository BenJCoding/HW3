/*   File: script.js
     GUI Assignment: Creating an Interactive Dynamic Table
     Author: Benjamin Jancsy
     Created: June 16, 2023
     Dynamically creates a custom multiplication table, validating user input and handling errors. Displays
     helpful error messages. Includes useful UI features such as reset input and clear table buttons.
     Copyright (c)  2023 by Ben.
     References: w3schools.com */
function validateForm() { // Reads and validates the input. Calls the table creating function.
    var ranges = document.getElementsByClassName("ranges"); // the values
    var invalidInputs = [];
    var places = ["first", "second", "third", "fourth"]; // For GORGEOUS error display
    for (var i = 0; i < ranges.length; i++) {
        var inNum = ranges[i].value;
        if (isNaN(inNum.trim()) || inNum === null || inNum.trim() === '') { // Handles all the errors
            invalidInputs.push(places[i]); //Which inputs are the issue
        }
    }
    var a = Number(ranges[0].value.trim());
    var b = Number(ranges[1].value.trim());
    var c = Number(ranges[2].value.trim());
    var d = Number(ranges[3].value.trim());
    if (invalidInputs.length === 1) { // For correct error message grammar!
        document.getElementById("errordiv").textContent = "The " + invalidInputs.join(", ") + " input is invalid!";
        return;
    } else if (invalidInputs.length > 1) { // For correct error message grammar!
        document.getElementById("errordiv").textContent = "The " + invalidInputs.join(", ") + " inputs are invalid!";
        return;
    }
    if (b < a) { // Inputs should be in order
        document.getElementById("errordiv").textContent = "Input 2 must be greater than or equal to input 1";
        return;
    }
    if (d < c) { // Inputs should be in order
        document.getElementById("errordiv").textContent = "Input 4 must be greater than or equal to input 3";
        return;
    }
    if ((b - a) * (d - c) > 20000) { // Limits the table size to 20k cells.
        document.getElementById("errordiv").textContent = "Table is way too big! (max 20,000 cells).";
        return;
    }
    document.getElementById("errordiv").textContent = ""; // Clear errors
    makeTable(a, b, c, d);
}

function makeTable(a, b, c, d) { // Where the table is made
    var data = [];
    var row = [];
    var rowhead = [];
    var colhead = [];
    rowhead.push('X'); // top left element
    for (var i = a; i <= b; i++) { // horizontal table head
        rowhead.push(i);
    }
    for (var i = c; i <= d; i++) { // vertical table head
        colhead.push(i);
    }
    for (var x = c; x <= d; x++) { // the 2d array of the entire table
        for (var y = a; y <= b; y++) {
            row.push(x * y);
        }
        data.push(row);
        row = [];
    }
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    rowhead.forEach((head) => { // pushes the header row onto the table
        let th = document.createElement('th');
        th.textContent = head; // make it a th element not just text
        thead.appendChild(th); // put the data onto the head row
    });
    table.appendChild(thead); // attaches it
    data.forEach((row_data) => { // for every row of data array (not header)
        let row = document.createElement('tr');
        let chead = document.createElement('th'); // the header of each row
        chead.textContent = colhead.shift(); //pop the front element for the vertical head
        row.appendChild(chead); //attaches
        row_data.forEach((cell_data) => { //for each cell of the row...
            let cell = document.createElement('td'); // element is a td
            cell.textContent = cell_data; //data
            row.appendChild(cell); // attach to the row
        });
        table.appendChild(row);//attach to table
    });
    let tablediv = document.getElementById('tablediv');
    tablediv.innerHTML = "";//clears an old table before showing a new one
    document.getElementById('tablediv').appendChild(table); //show the table
}

document.getElementById("submit").addEventListener("click", validateForm); // allows Enter key to be used as well

document.getElementById("reset").addEventListener("click", () => { // Reset the unwanted input
    document.getElementById("errordiv").textContent = "";
});

document.getElementById("clear").addEventListener("click", () => { // Clear the table
    let tablediv = document.getElementById('tablediv');
    tablediv.innerHTML = "";
});
