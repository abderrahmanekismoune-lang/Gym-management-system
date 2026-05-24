

let tbody        = document.getElementById('members-tbody');
let searchInput  = document.getElementById('searchInput');
let planFilter   = document.getElementById('planFilter');
let memberCount  = document.getElementById('member-count');
let formSection  = document.getElementById('member-form-section');
let formTitle    = document.getElementById('form-title');




function seedMembers() {

    if (localStorage.getItem('members') === null) {

        let defaultMembers = [
            { name: "Karim Benali",   email: "karim@gmail.com",   phone: "0789123456", plan: "Gold",   date: "2025-03-14" },
            { name: "Samira Hadj",    email: "samira@gmail.com",  phone: "0551234567", plan: "Bronze", date: "2025-03-13" },
            { name: "Youssef Larbi",  email: "youssef@gmail.com", phone: "0552345678", plan: "Silver", date: "2025-03-12" },
            { name: "Nour Amrani",    email: "nour@gmail.com",    phone: "0553456789", plan: "Gold",   date: "2025-03-11" },
            { name: "Omar Zidane",    email: "omar@gmail.com",    phone: "0554567890", plan: "Bronze", date: "2025-03-10" }
        ];

        localStorage.setItem('members', JSON.stringify(defaultMembers));
    }
}



function getMembers() {
    return JSON.parse(localStorage.getItem('members'));
}


function saveMembers(members) {
    localStorage.setItem('members', JSON.stringify(members));
}




function updateStats() {

    let members = getMembers();

    document.getElementById('stat-total-members').textContent = members.length;

    let activeSubs = 0;
    for (let i = 0; i < members.length; i++) {
        if (members[i].plan === 'Gold' || members[i].plan === 'Silver') {
            activeSubs++;
        }
    }
    document.getElementById('stat-active-subs').textContent = activeSubs;

    let revenue = 0;
    for (let i = 0; i < members.length; i++) {
        if (members[i].plan === 'Bronze') revenue += 1000;
        if (members[i].plan === 'Silver') revenue += 3000;
        if (members[i].plan === 'Gold')   revenue += 10000;
    }
    document.getElementById('stat-revenue').textContent = revenue.toLocaleString() + ' DZD';
}



function renderTable() {

    let members    = getMembers();
    let searchText = searchInput.value.toLowerCase();
    let planValue  = planFilter.value;

    let filtered = [];

    for (let i = 0; i < members.length; i++) {
        let m = members[i];

        let nameMatch  = m.name.toLowerCase().includes(searchText);
        let emailMatch = m.email.toLowerCase().includes(searchText);
        let searchOk   = nameMatch || emailMatch;

        let planOk = (planValue === 'all' || m.plan === planValue);

        if (searchOk && planOk) {
            filtered.push({ member: m, index: i }); 
             }
    }

    memberCount.textContent = 'Showing ' + filtered.length + ' of ' + members.length + ' members';

    tbody.innerHTML = '';

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:24px; color:#8898b8;">No members found.</td></tr>';
        return;
    }

    for (let i = 0; i < filtered.length; i++) {
        let m     = filtered[i].member;
        let index = filtered[i].index; 

        let row = document.createElement('tr');
        row.innerHTML =
            '<td>' + m.name + '</td>' +
            '<td>' + m.email + '</td>' +
            '<td>' + m.phone + '</td>' +
            '<td>' + m.plan + '</td>' +
            '<td>' + m.date + '</td>' +
            '<td>' +
                '<button class="btn-edit" onclick="editMember(' + index + ')">Edit</button>' +
                '<button class="btn-delete" onclick="deleteMember(' + index + ')">Delete</button>' +
            '</td>';

        tbody.appendChild(row);
    }

    updateStats();
}



function searchMembers() {
    renderTable();
}


function openForm() {

    document.getElementById('edit-index').value = '-1'; // -1 means adding new
    document.getElementById('f-name').value  = '';
    document.getElementById('f-email').value = '';
    document.getElementById('f-phone').value = '';
    document.getElementById('f-plan').value  = '';
    document.getElementById('f-date').value  = '';

    clearErrors();

    formTitle.textContent = 'Add New Member';

    formSection.style.display = 'block';

    formSection.scrollIntoView({ behavior: 'smooth' });
}



function editMember(index) {

    let members = getMembers();
    let m       = members[index];  

    document.getElementById('edit-index').value = index;
    document.getElementById('f-name').value  = m.name;
    document.getElementById('f-email').value = m.email;
    document.getElementById('f-phone').value = m.phone;
    document.getElementById('f-plan').value  = m.plan;
    document.getElementById('f-date').value  = m.date;

    clearErrors();

    formTitle.textContent = 'Edit Member';

    formSection.style.display = 'block';
    formSection.scrollIntoView({ behavior: 'smooth' });
}



function closeForm() {
    formSection.style.display = 'none';
}


function saveMember() {

    let name  = document.getElementById('f-name').value.trim();
    let email = document.getElementById('f-email').value.trim();
    let phone = document.getElementById('f-phone').value.trim();
    let plan  = document.getElementById('f-plan').value;
    let date  = document.getElementById('f-date').value;

    clearErrors();

    let valid = true;

    if (name.length === 0) {
        document.getElementById('err-name').textContent = 'Name is required';
        document.getElementById('f-name').style.border = '1.5px solid red';
        valid = false;
    } else if (!name.match(/^[A-Za-z]+ [A-Za-z]+$/)) {
        document.getElementById('err-name').textContent = 'Write full name';
        document.getElementById('f-name').style.border = '1.5px solid red';
        valid = false;
    } else {
        document.getElementById('f-name').style.border = '1.5px solid green';
    }

    if (email.length === 0) {
        document.getElementById('err-email').textContent = 'Email is required';
        document.getElementById('f-email').style.border = '1.5px solid red';
        valid = false;
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        document.getElementById('err-email').textContent = 'Invalid email format';
        document.getElementById('f-email').style.border = '1.5px solid red';
        valid = false;
    } else {
        document.getElementById('f-email').style.border = '1.5px solid green';
    }

    if (phone.length === 0) {
        document.getElementById('err-phone').textContent = 'Phone is required';
        document.getElementById('f-phone').style.border = '1.5px solid red';
        valid = false;
    } else if (!phone.match(/^0[567][0-9]{8}$/)) {
        document.getElementById('err-phone').textContent = 'Invalid phone number';
        document.getElementById('f-phone').style.border = '1.5px solid red';
        valid = false;
    } else {
        document.getElementById('f-phone').style.border = '1.5px solid green';
    }

    if (plan === '') {
        document.getElementById('err-plan').textContent = 'Please select a plan';
        document.getElementById('f-plan').style.border = '1.5px solid red';
        valid = false;
    } else {
        document.getElementById('f-plan').style.border = '1.5px solid green';
    }

    if (date === '') {
        document.getElementById('err-date').textContent = 'Date is required';
        document.getElementById('f-date').style.border = '1.5px solid red';
        valid = false;
    } else {
        document.getElementById('f-date').style.border = '1.5px solid green';
    }

    if (!valid) return;

    let newMember = { name: name, email: email, phone: phone, plan: plan, date: date };

    let members   = getMembers();
    let editIndex = parseInt(document.getElementById('edit-index').value);

    if (editIndex === -1) {
        members.push(newMember);
    } else {
        members[editIndex] = newMember;
    }

    saveMembers(members);

    closeForm();
    renderTable();
}



function deleteMember(index) {

    let confirmed = confirm('Are you sure you want to delete this member?');

    if (!confirmed) return; // user clicked Cancel

    let members = getMembers();

    members.splice(index, 1);

    saveMembers(members);
    renderTable();
}



function clearErrors() {

    let errorIds = ['err-name', 'err-email', 'err-phone', 'err-plan', 'err-date'];
    let inputIds = ['f-name', 'f-email', 'f-phone', 'f-plan', 'f-date'];

    for (let i = 0; i < errorIds.length; i++) {
        document.getElementById(errorIds[i]).textContent = '';
    }
    for (let i = 0; i < inputIds.length; i++) {
        document.getElementById(inputIds[i]).style.border = '1.5px solid #1e3060';
    }
}


seedMembers();  
renderTable();  