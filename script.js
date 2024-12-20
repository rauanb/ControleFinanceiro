// Declaração os itens de entrada
const incomeForm = document.getElementById('income-form');
const incomeDescription = document.getElementById('income-description');
const incomeAmount = document.getElementById('income-amount');

// Declaração dos items de saída
const expenseForm = document.getElementById('expense-form');
const expenseDescription = document.getElementById('expense-description');
const expenseCatetory = document.getElementById('expense-category');
const expenseAmount = document.getElementById('expense-amount');

// Declaração do hitórico
const history = document.getElementById('history');

// Declaração do resumo
const summary = document.getElementById('summary');
const summaryIncomes = document.getElementById('total-incomes');
const summaryExpenses = document.getElementById('total-expenses');
const summaryBalance = document.getElementById('balance');

incomeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = incomeDescription.value;
    const amount = parseFloat(incomeAmount.value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Preencha os campos corretamente!');
        return;
    };

    addIncome(description, amount);
    clearIncomeInputs();
    updateSummary();
});

function addIncome(description, amount) {
    const incomeRow = document.createElement('tr');

    incomeRow.innerHTML = `
        <td>${description}</td>
        <td></td>
        <td>${amount.toFixed(2)}</td>
        <td>Entrada</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    history.appendChild(incomeRow);

    incomeRow.querySelector('.delete-btn').addEventListener('click', function() {
        incomeRow.remove();
    });
};

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = expenseDescription.value;
    const category = expenseCatetory.value;
    const amount = parseFloat(expenseAmount.value);

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Preencha corretamente os campos!');
        return;
    };

    addExpense(description, category, amount);
    clearExpenseInputs();
    updateSummary();
});

function addExpense(description, category, amount) {
    const expenseRow = document.createElement('tr');

    expenseRow.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount.toFixed(2)}</td>
        <td>Saída</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    history.appendChild(expenseRow);

    expenseRow.querySelector('.delete-btn').addEventListener('click', function() {
        expenseRow.remove();
    });
};

function updateSummary() {
    let totalIncomes = 0;
    let totalExpenses = 0;

    const transactions = history.querySelectorAll('tr');

    transactions.forEach(function(transaction) {
        const amount = parseFloat(transaction.children[2].textContent);
        const type = transaction.children[3].textContent;

        if (type === 'Entrada') {
            totalIncomes += amount;
        } else {
            totalExpenses += amount;
        }
    });

    summaryExpenses.textContent = totalExpenses.toFixed(2);
    summaryIncomes.textContent = totalIncomes.toFixed(2);
    summaryBalance.textContent = (totalIncomes - totalExpenses).toFixed(2);
};

function clearIncomeInputs() {
    incomeDescription.value = '';
    incomeAmount.value = '';
};

function clearExpenseInputs() {
    expenseDescription.value = '';
    expenseAmount.value = '';
}