
let trainersData = [
    {
        name: "Ahmed Mansour",
        specialty: "Strength & Conditioning",
        experience: "8 yrs",
        email: "ahmed.mansour@xgym.com",
        phone: "0789 78 97 89",
        photo: "ahmed-mansour.jpg",
        bio: "Ahmed is a former national powerlifting champion who specializes in strength training and competition prep. He's helped over 100 clients break personal records and build sustainable strength.",
        schedule: "Mon / Wed / Fri — 08:00 to 11:00"
    },
    {
        name: "Layla Hassan",
        specialty: "Yoga & Pilates",
        experience: "6 yrs",
        email: "layla.hassan@xgym.com",
        phone: "0551 23 45 67",
        photo: "layla-hassan.jpg",
        bio: "Layla is a certified yoga instructor with a focus on mobility, injury recovery, and mindfulness. Her classes are known for being calming yet challenging, suitable for all levels.",
        schedule: "Tue / Thu — 09:00 to 12:00"
    },
    {
        name: "Karim Boudiaf",
        specialty: "MMA & Boxing",
        experience: "10 yrs",
        email: "karim.boudiaf@xgym.com",
        phone: "0552 34 56 78",
        photo: "karim-boudiaf.jpg",
        bio: "Karim is a former national boxing champion with a decade of coaching experience. He specializes in technique, conditioning, and self-defense, pushing clients to be their best.",
        schedule: "Mon / Tue / Thu / Sat — 14:00 to 17:00"
    }
];




let searchInput = document.getElementById('searchInput');
let noResult    = document.getElementById('noResult');
let trainerCards = document.querySelectorAll('.trainer-card');




function SearchTriners() {

    
    let searchText = searchInput.value.toLowerCase();

    let visibleCount = 0; 

    
    for (let i = 0; i < trainerCards.length; i++) {

       
        let trainerName = trainerCards[i].getAttribute('data-name').toLowerCase();

        
        if (trainerName.includes(searchText)) {
            trainerCards[i].style.display = 'flex'; 
            visibleCount++;
        } else {
            trainerCards[i].style.display = 'none'; 
        }
    }

    
    if (visibleCount === 0) {
        noResult.style.display = 'block';
    } else {
        noResult.style.display = 'none';
    }
}




let modal = document.createElement('div');
modal.id = 'trainerModal';


modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: rgba(8, 14, 28, 0.85);
    z-index: 1000;
    justify-content: center;
    align-items: center;
`;


modal.innerHTML = `
    <div id="modalBox" style="
        background-color: #152038;
        border: 1px solid #1e3060;
        border-top: 3px solid #fbbf24;
        border-radius: 14px;
        padding: 36px;
        max-width: 540px;
        width: 90%;
        position: relative;
        font-family: 'DM Sans', sans-serif;
        color: #f1f5ff;
    ">
        <!-- Close button (×) -->
        <button id="modalClose" style="
            position: absolute;
            top: 14px; right: 18px;
            background: none;
            border: none;
            color: #8898b8;
            font-size: 26px;
            cursor: pointer;
            line-height: 1;
        ">×</button>

        <!-- Modal content goes here (filled by openModal) -->
        <div id="modalContent"></div>
    </div>
`;


document.body.appendChild(modal);




function openModal(trainerName) {

    // Find the trainer in our data array by name
    let trainer = null;

    for (let i = 0; i < trainersData.length; i++) {
        if (trainersData[i].name === trainerName) {
            trainer = trainersData[i];
        }
    }

    // If not found, do nothing
    if (trainer === null) return;

    // Fill the modal with this trainer's details
    document.getElementById('modalContent').innerHTML = `
        <div style="text-align:center; margin-bottom: 20px;">
            <img src="${trainer.photo}" alt="${trainer.name}" style="
                width: 110px; height: 110px;
                border-radius: 50%;
                border: 3px solid #fbbf24;
                object-fit: cover;
                margin-bottom: 12px;
            ">
            <h2 style="font-family:'Bebas Neue',sans-serif; font-size:28px; letter-spacing:0.06em;">
                ${trainer.name}
            </h2>
            <p style="color:#fbbf24; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.12em;">
                ${trainer.specialty} — ${trainer.experience}
            </p>
        </div>

        <p style="color:#8898b8; font-size:14px; margin-bottom:18px;">
            ${trainer.bio}
        </p>

        <div style="background:#1a2845; border-radius:8px; padding:14px 18px; margin-bottom:14px;">
            <p style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.12em; color:#8898b8; margin-bottom:6px;">
                Class Schedule
            </p>
            <p style="color:#f1f5ff; font-size:14px;">📅 ${trainer.schedule}</p>
        </div>

        <div style="background:#1a2845; border-radius:8px; padding:14px 18px;">
            <p style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.12em; color:#8898b8; margin-bottom:6px;">
                Contact
            </p>
            <p style="color:#f1f5ff; font-size:14px;">📧 ${trainer.email}</p>
            <p style="color:#f1f5ff; font-size:14px;">📞 ${trainer.phone}</p>
        </div>
    `;

    // Show the modal (flex so it centers)
    modal.style.display = 'flex';
}


// Step 3: Function to close the modal

function closeModal() {
    modal.style.display = 'none';
}


// Step 4: Close when the × button is clicked

document.getElementById('modalClose').onclick = function() {
    closeModal();
};


// Step 5: Close when user clicks OUTSIDE the modal box

modal.onclick = function(event) {
    // If the click was on the dark overlay (not the box inside)
    if (event.target === modal) {
        closeModal();
    }
};


// Step 6: Close when user presses the Escape key

document.onkeydown = function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
};


// ── Connect cards to the modal ────────────────
// Add a click listener to each trainer card
// When clicked → open the modal with that trainer's name

for (let i = 0; i < trainerCards.length; i++) {

    // Make the card look clickable
    trainerCards[i].style.cursor = 'pointer';

    trainerCards[i].onclick = function() {
        // Get the trainer name from the data-name attribute
        let name = this.getAttribute('data-name').trim();
        openModal(name);
    };
}
