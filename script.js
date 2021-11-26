updateTotal();
displaySolutions();
addPoints();

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("scoretable");
    switching = true;

    dir = "desc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
      }
    }
}

function updateTotal() {
    table = document.getElementById("scoretable");
    rows = table.rows;
    for (i = 1; i < rows.length; i++) {
        total = 0;
        for (j = 1; j < rows[i].cells.length-2; j++) {
            total = total + Number(rows[i].cells[j].innerHTML);
        }
        rows[i].cells[5].innerHTML = total;
    }
}

function displaySolutions() {
    round = document.getElementById("round");
    var element = document.getElementById("round1solutions");
    element.classList.add("hidden");
    var element = document.getElementById("round2solutions");
    element.classList.add("hidden");
    var element = document.getElementById("round3solutions");
    element.classList.add("hidden");
    var element = document.getElementById("round4solutions");
    element.classList.add("hidden");
    if(round.value == 1) {
        var element = document.getElementById("round1solutions");
        element.classList.remove("hidden");
    }
    if(round.value == 2) {
        var element = document.getElementById("round2solutions");
        element.classList.remove("hidden");
    }
    if(round.value == 3) {
        var element = document.getElementById("round3solutions");
        element.classList.remove("hidden");
    }
    if(round.value == 4) {
        var element = document.getElementById("round4solutions");
        element.classList.remove("hidden");
    }
}

function addPoints() {
    checkboxes = document.getElementById("checkboxes").childNodes;
    joker = document.getElementById("joker");
    count = 0;
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type === "checkbox" && checkboxes[i].checked === true){
            count++;
        }
    }
    if (joker.checked === true) {
        count = count * 2;
    }
}

function submitPoints() {
    round = document.getElementById("round");
    team = document.getElementById("team");
    table = document.getElementById("scoretable");
    rows = table.rows;
    rows[Number(team.value)].cells[Number(round.value)].innerHTML = count;
    updateTotal();

    checkboxes = document.getElementById("checkboxes").childNodes;
    for (i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }

    joker = document.getElementById("joker");
    if (joker.checked === true) {
      rows[Number(team.value)].cells[6].childNodes[0].checked = true;
    }
}