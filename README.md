# Quantum Motion — Gym Management System

A fully functional gym management web application built with HTML, CSS, and JavaScript.

## Project Structure

```
GymManagementSystem/
│
├── index.html              ← Homepage (start here)
│
├── pages/
│   ├── classes.html        ← Class schedule with filters & sorting
│   ├── contact.html        ← Contact form with validation
│   ├── memberships.html    ← Membership plans & signup form
│   ├── trainers.html       ← Trainer profiles with modal
│   ├── admin-login.html    ← Admin login (user: Alaa / pass: Alaa123)
│   ├── admin-dashboard.html← Member management dashboard
│   └── admin-plans.html    ← Subscription plans management
│
├── css/
│   ├── Styleindex.css      ← Homepage styles
│   ├── style.css           ← Classes page styles
│   ├── contact.css         ← Contact page styles
│   ├── memberships.css     ← Memberships page styles
│   ├── trainers.css        ← Trainers page styles
│   ├── admin-dashboard.css ← Admin dashboard styles
│   ├── admin-login.css     ← Admin login styles
│   └── admin-plans.css     ← Admin plans styles
│
├── js/
│   ├── classes.js          ← Class filtering & sorting logic
│   ├── contact.js          ← Contact form validation
│   ├── memberships.js      ← Membership form validation
│   ├── trainers.js         ← Trainer search & modal
│   ├── admin-dashboard.js  ← Member CRUD with localStorage
│   ├── admin-login.js      ← Admin authentication
│   └── admin-plans.js      ← Plans CRUD with localStorage
│
└── assets/
    └── images/             ← All image files go here
```

## How To Run

1. Copy your images into `assets/images/`
2. Open `index.html` in your browser
3. Navigate using the menu

## Admin Access

- URL: `pages/admin-login.html`
- Username: `Alaa`
- Password: `Alaa123`

## Features

- Responsive design (mobile + desktop)
- Class schedule with filtering by trainer, day, difficulty
- Membership signup form with full validation
- Trainer profiles with modal popup
- Admin dashboard with member CRUD
- Admin plans management
- localStorage data persistence
- Toast notifications
- Form validation with real-time feedback

## Technologies

- HTML5
- CSS3 (Flexbox, Grid, CSS Variables)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Bebas Neue, DM Sans, Barlow Condensed)
- Font Awesome icons
- localStorage for data persistence

## Built By

UC2 Constantine — Génie Logiciel / SCI Project
