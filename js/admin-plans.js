// =============================================
//  ADMIN PLANS — JavaScript
//  Features:
//    - 3 default plans pre-seeded in localStorage
//    - Show plans in table
//    - Add new plan via form
//    - Edit existing plan (fills form)
//    - Delete plan with confirmation
//    - Validation same style as other pages
// =============================================


// ── Grab elements from the page ───────────────

let tbody     = document.getElementById('plans-tbody');
let noPlans   = document.getElementById('no-plans');
let formTitle = document.getElementById('form-title');


// ══════════════════════════════════════════════
//  STEP 1: Seed default plans
//  If localStorage has no plans yet, add 3 defaults
// ══════════════════════════════════════════════

function seedPlans() {

    if (localStorage.getItem('plans') === null) {

        let defaultPlans = [
            { name: 'Bronze',  price: '10',  duration: 'Monthly',   description: 'Basic gym access, locker rooms & showers' },
            { name: 'Silver',  price: '30',  duration: 'Quarterly', description: 'Everything in Bronze + VIP room & juice bar' },
            { name: 'Gold',    price: '100', duration: 'Yearly',    description: 'Full access, free trainer & 24/7 gym entry'  }
        ];

        localStorage.setItem('plans', JSON.stringify(defaultPlans));
    }
}


// ── Helper: load plans from localStorage ──────

function getPlans() {
    return JSON.parse(localStorage.getItem('plans'));
}

// ── Helper: save plans array to localStorage ──

function savePlans(plans) {
    localStorage.setItem('plans', JSON.stringify(plans));
}


// ══════════════════════════════════════════════
//  STEP 2: Render the plans table
//  Reads from localStorage and draws all rows
// ══════════════════════════════════════════════

function renderTable() {

    let plans = getPlans();

    // Clear old rows
    tbody.innerHTML = '';

    // If no plans, show the empty message
    if (plans.length === 0) {
        noPlans.style.display = 'block';
        return;
    }

    noPlans.style.display = 'none';

    // Draw one row per plan
    for (let i = 0; i < plans.length; i++) {

        let p = plans[i]; // shortcut for current plan

        let row = document.createElement('tr');
        row.innerHTML =
            '<td>' + p.name + '</td>' +
            '<td>$' + p.price + '</td>' +
            '<td>' + p.duration + '</td>' +
            '<td>' + p.description + '</td>' +
            '<td>' +
                '<button class="btn-edit" onclick="editPlan(' + i + ')">Edit</button>' +
                '<button class="btn-delete" onclick="deletePlan(' + i + ')">Delete</button>' +
            '</td>';

        tbody.appendChild(row);
    }
}


// ══════════════════════════════════════════════
//  STEP 3: Validate the form fields
//  Same red/green border style as your other pages
//  Returns true if all valid, false if not
// ══════════════════════════════════════════════

function validateForm() {

    let name        = document.getElementById('plan-name').value.trim();
    let price       = document.getElementById('price').value.trim();
    let duration    = document.getElementById('duration').value.trim();
    let description = document.getElementById('description').value.trim();

    // Clear old errors first
    clearErrors();

    let valid = true;

    if (name.length === 0) {
        document.getElementById('err-name').textContent = 'Plan name is required';
        document.getElementById('plan-name').style.border = '1.5px solid red';
        valid = false;
    } else {
        document.getElementById('plan-name').style.border = '1.5px solid green';
    }

    if (price.length === 0) {
        document.getElementById('err-price').textContent = 'Price is required';
        document.getElementById('price').style.border = '1.5px solid red';
        valid = false;
    } else if (price <= 0) {
        document.getElementById('err-price').textContent = 'Price must be greater than 0';
        document.getElementById('price').style.border = '1.5px solid red';
        valid = false;
    } else {
        document.getElementById('price').style.border = '1.5px solid green';
    }

    if (duration.length === 0) {
        document.getElementById('err-duration').textContent = 'Duration is required';
        document.getElementById('duration').style.border = '1.5px solid red';
        valid = false;
    } else {
        document.getElementById('duration').style.border = '1.5px solid green';
    }

    if (description.length === 0) {
        document.getElementById('err-desc').textContent = 'Description is required';
        document.getElementById('description').style.border = '1.5px solid red';
        valid = false;
    } else {
        document.getElementById('description').style.border = '1.5px solid green';
    }

    return valid;
}


// ══════════════════════════════════════════════
//  STEP 4: Save plan (Add or Edit)
//  Called by onclick="savePlan()" on Save button
// ══════════════════════════════════════════════

function savePlan() {

    // Stop if validation fails
    if (!validateForm()) return;

    // Read values from the form
    let name        = document.getElementById('plan-name').value.trim();
    let price       = document.getElementById('price').value.trim();
    let duration    = document.getElementById('duration').value.trim();
    let description = document.getElementById('description').value.trim();

    let newPlan = { name: name, price: price, duration: duration, description: description };

    let plans     = getPlans();
    let editIndex = parseInt(document.getElementById('edit-index').value);

    if (editIndex === -1) {
        // Adding new plan — push to array
        plans.push(newPlan);
    } else {
        // Editing existing — replace at that index
        plans[editIndex] = newPlan;
    }

    savePlans(plans);

    // Reset form and re-render table
    resetForm();
    renderTable();
}


// ══════════════════════════════════════════════
//  STEP 5: Edit a plan
//  Fills the form with that plan's data
// ══════════════════════════════════════════════

function editPlan(index) {

    let plans = getPlans();
    let p     = plans[index];

    // Fill form fields with existing data
    document.getElementById('edit-index').value  = index;
    document.getElementById('plan-name').value   = p.name;
    document.getElementById('price').value       = p.price;
    document.getElementById('duration').value    = p.duration;
    document.getElementById('description').value = p.description;

    // Clear old errors
    clearErrors();

    // Change title to Edit
    formTitle.textContent = 'Edit Plan';

    // Scroll to form
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}


// ══════════════════════════════════════════════
//  STEP 6: Delete a plan
//  Asks for confirmation first
// ══════════════════════════════════════════════

function deletePlan(index) {

    let confirmed = confirm('Are you sure you want to delete this plan?');
    if (!confirmed) return;

    let plans = getPlans();

    // Remove 1 item at that index
    plans.splice(index, 1);

    savePlans(plans);
    renderTable();
}


// ══════════════════════════════════════════════
//  STEP 7: Reset / Cancel the form
//  Clears all fields and goes back to "Add" mode
// ══════════════════════════════════════════════

function resetForm() {

    // Reset hidden index to -1 (means new plan)
    document.getElementById('edit-index').value  = '-1';

    // Clear all fields
    document.getElementById('plan-name').value   = '';
    document.getElementById('price').value       = '';
    document.getElementById('duration').value    = '';
    document.getElementById('description').value = '';

    // Clear errors
    clearErrors();

    // Change title back to Add
    formTitle.textContent = 'Add New Plan';
}


// ── Helper: clear all error messages and borders ──

function clearErrors() {

    let errorIds = ['err-name', 'err-price', 'err-duration', 'err-desc'];
    let inputIds = ['plan-name', 'price', 'duration', 'description'];

    for (let i = 0; i < errorIds.length; i++) {
        document.getElementById(errorIds[i]).textContent = '';
    }
    for (let i = 0; i < inputIds.length; i++) {
        document.getElementById(inputIds[i]).style.border = '1.5px solid #1e3060';
    }
}


// ══════════════════════════════════════════════
//  START — Run when the page loads
// ══════════════════════════════════════════════

seedPlans();   // add default plans if none exist
renderTable(); // draw the table
