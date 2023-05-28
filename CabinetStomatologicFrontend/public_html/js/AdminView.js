AdminView = function () {
    this.initComponents();
};
AdminView.prototype = {
    initComponents: function () {
        this.attachListeners();
        this.onAdminPopulate();
    },
    attachListeners: function () {
        $('#submit_date').on('click', $.proxy(this.onSubmitButton, this));
    },
    onAdminPopulate: function () {
        const dateInput = document.getElementById('date');

        // Get today's date.
        const today = new Date();

        // Format the date as YYYY-MM-DD.
        const formattedDate = today.toISOString().split('T')[0];

        // Set the default value of the date input.
        dateInput.value = formattedDate;
    },
    onSubmitButton: function () {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: "http://localhost:57312/api/appointments/" + $('#date').val(),
            async: false,
            dataType: 'json',
            success: function (data) {
                // Clear the table body.
                const tableBody = document.querySelector('tbody');
                tableBody.innerHTML = '';

                // Iterate over the data and populate the table rows.
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

                    tableBody.appendChild(appointmentRow);
                });
            },
            error: function () {
                console.log('Error retrieving appointments data.');
            }
        });
    }
}
