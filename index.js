const form = document.getElementById('registrationForm');
const tableBody = document.querySelector('#entriesTable tbody');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    if (!isValidDOB(dob)) {
        alert('Age must be between 18 and 55.');
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        terms
    };

    saveEntry(entry);
    displayEntries();
    form.reset();
});

function isValidDOB(dob) {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();

    // Adjust if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
}

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    tableBody.innerHTML = '';

    entries.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.terms ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Display stored entries on page load
document.addEventListener('DOMContentLoaded', displayEntries);
localStorage.clear();
