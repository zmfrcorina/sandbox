AdminView = function () {
    this.initComponents();
};

AdminView.prototype = {
    currentPage: 1,
    totalPages: 0,

    initComponents: function () {
        this.attachListeners();
        this.onAdminPopulate();
        this.setupPagination();
    },
    attachListeners: function () {
        $('#submit_date').on('click', $.proxy(this.onSubmitButton, this));
        $('#prev-page').on('click', $.proxy(this.prevPage, this));
        $('#next-page').on('click', $.proxy(this.nextPage, this));
    },
    onAdminPopulate: function () {
        const dateInput = document.getElementById('date');
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        dateInput.value = formattedDate;

        this.onSubmitButton();
    },
    setupPagination: function () {
        $('#current-page').text(this.currentPage);
        $('#prev-page').prop('disabled', true);
        $('#next-page').prop('disabled', true);
    },
    onSubmitButton: function () {
        this.currentPage = 1;
        this.populateAppointmentsByPage();
    },
    populateAppointmentsByPage: function()
    {
        const appointmentType = $('#appointmentType').val();
        
        const url = `http://localhost:57312/api/appointments/${$('#date').val()}?appointmentType=${appointmentType}&page=${this.currentPage}`;

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: url,
            async: false,
            dataType: 'json',
            success: function (response) {
                // Clear the table body.
                const tableBody = document.querySelector('tbody');
                tableBody.innerHTML = '';

                const data = response.appointments;

                data.forEach(function (appointment) {
                    const appointmentRow = document.createElement('tr');

                    const appointmentTimeCell = document.createElement('td');
                    appointmentTimeCell.textContent = appointment.Date.split('T')[0] + " " + appointment.Time;
                    appointmentRow.appendChild(appointmentTimeCell);

                    const patientNameCell = document.createElement('td');
                    patientNameCell.textContent = appointment.User.FirstName + " " + appointment.User.LastName;
                    appointmentRow.appendChild(patientNameCell);

                    const patientEmailCell = document.createElement('td');
                    patientEmailCell.textContent = appointment.User.Email;
                    appointmentRow.appendChild(patientEmailCell);

                    const patientPhoneCell = document.createElement('td');
                    patientPhoneCell.textContent = appointment.User.PhoneNumber;
                    appointmentRow.appendChild(patientPhoneCell);

                    const messageCell = document.createElement('td');
                    messageCell.textContent = appointment.Message;
                    appointmentRow.appendChild(messageCell);

                    const appointmentTypeCell = document.createElement('td');
                    appointmentTypeCell.textContent = appointment.AppointmentType;
                    appointmentRow.appendChild(appointmentTypeCell);

                    tableBody.appendChild(appointmentRow);
                });

                // Update pagination controls
                this.totalPages = response.totalPages;  // Assuming your API response provides totalPages.
                this.updatePaginationControls();
            }.bind(this),
            error: function () {
                console.log('Error retrieving appointments data.');
            }
        });
    },
    updatePaginationControls: function () {
        $('#current-page').text(this.currentPage);
        $('#total-pages').text(this.totalPages);
        $('#prev-page').prop('disabled', this.currentPage === 1);
        $('#next-page').prop('disabled', this.currentPage >= this.totalPages);
    },
    prevPage: function () {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.populateAppointmentsByPage(); // Reload data for the previous page.
        }
    },
    nextPage: function () {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.populateAppointmentsByPage(); // Reload data for the next page.
        }
    }
}
