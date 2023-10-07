document.addEventListener("DOMContentLoaded", function () {
    const numGuestsInput = document.getElementById("num-guests");
    const guestDetails = document.getElementById("guest-details");
    const issueTicketBtn = document.getElementById("issue-ticket");
    const issueTicketDetails = document.getElementById("issue-ticket-details");

    const ticketIdInput = document.getElementById("ticket-id");
    const validateForm = document.getElementById("validate-form");
    const validateTicketBtn = document.getElementById("validate-ticket");
    const ticketDetails = document.getElementById("ticket-details");

    numGuestsInput.addEventListener("input", function () {
        guestDetails.innerHTML = "";
        const numGuests = parseInt(numGuestsInput.value);

        for (let i = 1; i <= numGuests; i++) {
            const guestNameInput = document.createElement("input");
            guestNameInput.type = "text";
            guestNameInput.placeholder = `Guest ${i} Name`;
            guestNameInput.required = true;

            const guestAgeInput = document.createElement("input");
            guestAgeInput.type = "number";
            guestAgeInput.placeholder = `Guest ${i} Age`;
            guestAgeInput.min = 1;
            guestAgeInput.required = true;

            guestDetails.appendChild(guestNameInput);
            guestDetails.appendChild(guestAgeInput);
        }
    });

    let issuedTickets = []; // Store issued tickets

    issueTicketBtn.addEventListener("click", function () {
        const numGuests = parseInt(numGuestsInput.value);
        const guests = [];
        let totalPrice = 0;

        for (let i = 1; i <= numGuests; i++) {
            const guestNameInput = document.querySelector(`#guest-details input:nth-child(${2 * i - 1})`);
            const guestAgeInput = document.querySelector(`#guest-details input:nth-child(${2 * i})`);

            const name = guestNameInput.value;
            const age = parseInt(guestAgeInput.value);

            let price;
            if (age <= 2) {
                price = 0;
            } else if (age < 18) {
                price = 100;
            } else if (age < 60) {
                price = 500;
            } else {
                price = 300;
            }

            guests.push({ name, age });
            totalPrice += price;
        }

        const ticketId = generateTicketId();
        const ticket = new ZooTicket(ticketId, guests);

        issuedTickets.push(ticket); // Store issued ticket

        issueTicketDetails.innerHTML = `Ticket Issued Successfully.<br>Ticket ID: ${ticketId}<br>Total Charges: INR ${totalPrice}`;

        numGuestsInput.value = "";
        guestDetails.innerHTML = "";
    });

    validateTicketBtn.addEventListener("click", function () {
        const ticketId = ticketIdInput.value;

        for (let i = 0; i < issuedTickets.length; i++) {
            if (issuedTickets[i].ticketId === ticketId) {
                ticketDetails.innerHTML = "Ticket Validated Successfully.";
                for (let j = 0; j < issuedTickets[i].guests.length; j++) {
                    const guest = issuedTickets[i].guests[j];
                    ticketDetails.innerHTML += `<br>Guest ${j + 1} - Name: ${guest.name}, Age: ${guest.age}`;
                }
                return;
            }
        }

        ticketDetails.innerHTML = "Ticket not found!";
    });

    function generateTicketId() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }

    class ZooTicket {
        constructor(ticketId, guests) {
            this.ticketId = ticketId;
            this.guests = guests;
        }
    }

    // Handle Logout button click
    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", function () {
        // Display a confirmation dialog
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            // If user confirms, redirect to index.html for logout
            window.location.href = "index.html";
        }
        // If user cancels, stay on the current page
    });
});
