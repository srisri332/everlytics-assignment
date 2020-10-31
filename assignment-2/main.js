const objects = [
  [
    "machine_name",
    "machine_id",
    "current",
    "voltage",
    "power_factor",
    "active_power",
    "apparent_power",
    "reactive_power",
    "energy_daily",
    "energy_monthly",
    "energy_yearly",
    "idle_daily",
    "idle_monthly",
    "idle_yearly",
  ],

  ["Boiler Machine", "machine004", 0, 0, 0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0, 0],
  ["some Machine", "machine005", 0, 0, 0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0, 0],
  ["auto Machine", "machine001", 0, 0, 0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0, 0],
];

let rowCount = 1;
const table = document.getElementById("table");

//This array is used to display statitics on time basis. Used for iterating.
const stats = ["Daily", "Monthly", "Yearly"];

//Iterating over the whole object array
objects.map((row) => {
  //if the row count is 1, then we dynamically add the table header. That is the only purpose of this 'if' check
  if (rowCount === 1) {
    const header = table.createTHead();
    const headings = header.insertRow();
    const subHeadings = header.insertRow();

    //This obj object is used to keep track of the elemtns that are in the form of daily,monthly,yearly basics.
    //At the end of the iteration this object will be populated with suffixes whos prefix is either dail,monthly or yearly
    //in this example case energy_monthly, energy_daily,energy_yearly and idle_monthly,idle_daily,idle_yearly have such prefixes
    //So obj = { energy : "energy" , idle : "idle"} is how the end result is
    let obj = {};

    row.map((eachHeading) => {
      let temp = eachHeading.split("_");
      //checking for prefix values and if they need stats of daily,monthly and yearly then we add them to obj
      if (temp[1] == "yearly" || temp[1] == "monthly" || temp[1] == "daily") {
        if (Object.values(obj).indexOf(temp[0]) > -1) {
          //removing out all the instances and only keeping once instace of energy_daily,energy_monthly,energy_yearly
          //so only energy_daily will be left in the data row
          const newHeadings = row.filter((each) => {
            return each != eachHeading;
          });
          row = newHeadings;
        } else {
          obj[temp[0]] = temp[0];
        }
      }
    });

    //only instance out of three stats are left in the row. it still has the suffix _daily, _yearly or _monthly.
    //we are removing the suffix so that only energy is left in the row instead of energy_monthly, energy_daily,energy_yearly
    row.map((toReplace) => {
      if (Object.values(obj).indexOf(toReplace.split("_")[0]) > -1) {
        row[row.indexOf(toReplace)] = toReplace.split("_")[0];
      }
    });

    row.map((cell) => {
      const cells = headings.insertCell();
      cells.innerHTML = cell.toUpperCase();
      if (Object.values(obj).indexOf(cell) > -1) {
        //If the row element that we are ireating happen to be in obj then we know that it needs yearly,monthly and daily stats
        //therfore we add colspan of 3 since there are 3 elements and map over the stats to display the headings
        cells.setAttribute("colspan", 3);
        stats.map((timeSpan) => {
          const subCell = subHeadings.insertCell();
          subCell.innerHTML = timeSpan;
        });
      } else {
        cells.setAttribute("rowspan", 2);
      }
    });

    rowCount = rowCount + 1;
  } else {
    //If row count is greater than or equal to 2 then we dynamically add the table body instead of header.
    let tbody = document
      .getElementById("table")
      .getElementsByTagName("tbody")[0];
    //this is directly creating rows and inserting data into them
    const newRow = tbody.insertRow();
    row.map((cell) => {
      const cells = newRow.insertCell();
      cells.innerHTML = cell;
    });
  }
});
