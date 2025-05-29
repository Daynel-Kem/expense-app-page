let expenses = [];
let totalAmount = 0;

// Expenses List
const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input")
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expense-table-body");
const totalAmountCell = document.getElementById("total-amount");

// Expense Chart
const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const ctx = document.getElementById("chart");

config = {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Expenses',
        data: [],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Expenses ($)'
          }
        },
        x: {
            title: {
                display: true,
                text: 'Dates',
            }
        }
      }
    }
  };

expenseChart = new Chart(ctx, config)

addBtn.addEventListener("click", function() {
    // Obtain Values from 
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validation Check
    if (category === '') {
        alert('Please select a category')
        return
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid number")
        return
    }
    if (date === '') {
        alert('Please select a date')
        return
    }

    expenses.push({category, amount, date})

    // Update the total amount
    totalAmount += amount;
    totalAmountCell.textContent = '$' + totalAmount;

    // Update the Table to include the new row
    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenseChartIndex = expenseChart.data.labels.indexOf(expense.date)
        expenseChart.data.datasets[0].data[expenseChartIndex] -= expense.amount;
        if (expenseChart.data.datasets[0].data[expenseChartIndex] === 0) {
            expenseChart.data.labels.splice(expenseChartIndex, 1)
            expenseChart.data.datasets[0].data.splice(expenseChartIndex, 1)
        }
        expenseChart.update()

        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = '$' + totalAmount;

        expensesTableBody.removeChild(newRow);
    });

    const expense = expenses[expenses.length - 1]
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn)

    index = expenseChart.data.labels.findIndex(checkDate);
    function checkDate(test_date) {
        return test_date === date;
    }

    if (index >= 0) {
        expenseChart.data.datasets[0].data[index] += amount;
        expenseChart.update()
    } else {
        let found = false
        for (let i = 0; i < expenseChart.data.labels.length; ++i) {
            if (date <= expenseChart.data.labels[i]) {
                expenseChart.data.labels.splice(i, 0, date)
                expenseChart.data.datasets[0].data.splice(i, 0, amount);
                found = true
                break
            }
        }
        if (!found) {
            expenseChart.data.labels.push(date)
            expenseChart.data.datasets[0].data.push(amount)
        } 
        
        expenseChart.update()
    }
    

});

for (const expense of expenses) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = '$' + totalAmount;

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenseChartIndex = expenseChart.data.labels.indexOf(expense.date)
        expenseChart.data.datasets[0].data[expenseChartIndex] -= expense.amount;
        if (expenseChart.data.datasets[0].data[expenseChartIndex] === 0) {
            expenseChart.data.labels.splice(expenseChartIndex, 1)
            expenseChart.data.datasets[0].data.splice(expenseChartIndex, 1)
        }
        expenseChart.update()

        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = '$' + totalAmount;

        expensesTableBody.removeChild(newRow);
    });
    const expense = expenses(expenses.length - 1)
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn)

    index = expenseChart.data.labels.findIndex(checkDate);
    function checkDate(test_date) {
        return test_date === date;
    }

    if (index >= 0) {
        expenseChart.data.datasets[0].data[index] += amount;
        expenseChart.update()
    } else {
        for (let i = 0; i < expenseChart.data.labels.length; ++i) {
            if (date <= expenseChart.data.labels[i]) {
                expenseChart.data.labels.splice(i, 0, date)
                expenseChart.data.datasets[0].data.splice(i, 0, amount);
                break
            }
        }
        if (!found) {
            expenseChart.data.labels.push(date)
            expenseChart.data.datasets[0].data.push(amount)
        } 
        expenseChart.update()
    }
}