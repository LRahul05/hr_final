
// Get elements

//Todo: Hide Button and Display Table
const newPayrollBtn = document.getElementById("NewPayroll");
newPayrollBtn.addEventListener("click", () => {
  const payrollTable = document.getElementById("PayrollTable");
  // console.log(payrollTable);

  payrollTable.style.display = "table";
  newPayrollBtn.style.display = "none";
});

//Todo: Get Data from JSON file
//* Employee First & Last Name
//* Hourly Wage
let personalList = [];

const loadEmployees = async () => {
  try {
    sessionStorage.removeItem("hours");
    const res = await fetch("employees.json");
    personalList = await res.json();

    // console.log(personalList);

    displayEmployees(personalList);
  } catch (err) {
    console.error(err);
  }
};

// todo:
const displayEmployees = (employee) => {
  const employeesTable = employee
    .map((employee) => {
      return `
<tr>

<th scope="row" >${employee.id}</th>
<td>${employee.firstName}</td>
<td>${employee.lastName}</td>
<td>$${employee.hw}</td>
<td><input type="number" class="hours-worked" style="width:60px"  min="0"/> h</td>
<td class='monthly-pay fw-bold' > </td>

</tr>
        

      `;
    })
    .join("");

  document.getElementById("Employees-table").innerHTML = employeesTable;

  //! -----------------------------------------------------

  monthlyPay();

  // console.log(employee);

  //todo: 5+6 Outputs Max, Min & Avg
  //* Get Hourly Wage
  const getEmployeesHW = employee.map((employee) => employee.hw);

  // console.log(getEmployeesHW);

  //* Maximum Wage
  let maxHW = calcMaxWage(getEmployeesHW);
  document.getElementById("Max-wage").innerText = "$" + maxHW;

  //* Minimum Wage
  let minHW = calcMinWage(getEmployeesHW);
  document.getElementById("Min-wage").innerText = "$" + minHW;

  //* Average Wage
  // get total amount of hourly wages
  const getTotalHW = (total, hw) => total + hw;

  const getAvgHW = (arr) => arr.reduce(getTotalHW, 0) / arr.length;

  // console.log(getAvgHW(getEmployeesHW));

  let avgHW = getAvgHW(getEmployeesHW).toFixed(2);
  document.getElementById("Avg-wage").innerText = "$" + avgHW;
};

loadEmployees();

// ... (existing code)

function monthlyPay() {
    const hoursWorked = document.querySelectorAll(".hours-worked");
  
    hoursWorked.forEach((workHour) => {
      workHour.addEventListener("keyup", (e) => {
        if (e.target.value === "" || e.target.value <= 0) {
          return;
        } else {
          if (e.key === "Enter") {
            // Log tax percentage here to check if it's being captured correctly
            const taxPercentage = parseFloat(document.getElementById("taxPercentage").value) || 0;
            console.log(taxPercentage);
  
            const hour = e.target.value;
            const hourlyWage = Number(
              e.target.parentElement.parentElement.children[3].innerText.substring(1)
            );
  
            let monthlyPayElement = e.target.parentElement.parentElement.children[5];
  
            const calcMonthlyPay = (hour * hourlyWage).toFixed(2);
  
            // Calculate tax deducted
            const taxDeducted = (calcMonthlyPay * (taxPercentage / 100)).toFixed(2);
  
            // Calculate monthly pay after tax
            const monthlyPayAfterTax = (calcMonthlyPay - taxDeducted).toFixed(2);
  
            // Display the monthly pay after tax and tax deducted
            monthlyPayElement.innerText = `$${monthlyPayAfterTax} (Tax Deducted: $${taxDeducted}, Tax Percentage: ${taxPercentage}%)`;
  
            // Save data to Local / Session storage
            saveData(hour, monthlyPayAfterTax);
  
            // Get Total Payouts
            getTotalPayouts();
          }
        }
      });
    });
  }
  

// ... (existing code)



// Todo: Input
//* Hours Worked

//todo: Output
//* Monthly Pay = Hourly Wage * Hours Worked

//* Maximum Wage
function calcMaxWage(arr) {
  return Math.max(...arr);
}
//* Minimum Wage

function calcMinWage(arr) {
  return Math.min(...arr);
}

//* Total

//todo: Set to Local / Session  storage

function saveData(hour) {
    let hours;
  
    if (sessionStorage.getItem("hours") === null) {
      hours = [];
    } else {
      hours = JSON.parse(sessionStorage.getItem("hours"));
    }
  
    hours.push(hour);
  
    sessionStorage.setItem("hours", JSON.stringify(hours));
  
    // Update the display of total hours here
    updateTotalHours();
  
    const newHours = hours.map((hour) => parseInt(hour));
    console.log(newHours);
  
    let totalHours = newHours.reduce(calcTotal, 0);
  
    console.log(totalHours);
    document.getElementById("Total-WH").innerText = totalHours + " h";
  }
  
  // ? uFunc for updating the display of total hours
  function updateTotalHours() {
    let hours;
  
    if (sessionStorage.getItem("hours") === null) {
      hours = [];
    } else {
      hours = JSON.parse(sessionStorage.getItem("hours"));
    }
  
    const newHours = hours.map((hour) => parseInt(hour));
    let totalHours = newHours.reduce(calcTotal, 0);
  
    console.log(totalHours);
    document.getElementById("Total-WH").innerText = totalHours + " h";
  }
  
  // ? uFunc for calculating  total amount!
  
  const calcTotal = (total, num) => {
    return total + num;
  };


function getTotalPayouts() {
  const allMonthlyPays = document.querySelectorAll(".monthly-pay");

  let arrayOfPayouts = Array.from(allMonthlyPays);
  // console.log(arrayOfPayouts);

  let newPayout = arrayOfPayouts.map((payout) =>
    parseFloat(payout.innerHTML.substring(1))
  );

  // console.log(newPayout);

  // * Return array elements with values
  newPayout = newPayout.filter((payout) => payout);

  // console.log(newPayout);

  let calculateTotalPay = newPayout.reduce(calcTotal, 0);

  document.getElementById("Total-pay").innerText =
    "$" + calculateTotalPay.toFixed(2);
}
