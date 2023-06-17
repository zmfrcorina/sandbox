$(document).ready(function () {
    // Retrieve the user ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    // Create an instance of the AppointmentsView and pass the user ID
    const appointments = new AppointmentsView(userId);
    appointments.onAppointmentsPopulate();
});
