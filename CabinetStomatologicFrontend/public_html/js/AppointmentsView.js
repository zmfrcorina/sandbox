AppointmentsView = function () {
  this.initComponents();
};
AppointmentsView.prototype = {
  initComponents: function () {
    this.attachListeners();
    this.onAppointmentsPopulate();
  },
  attachListeners: function () {
    $('#submit_appointment_bttn').on('click', $.proxy(this.onSubmitButton, this));
    //UPDATE FOR APPOINTMENTS TO REMOVE CANCELLATION
    $('table').on('click', 'tr', $.proxy(this.getIdBooking, this));
    $('#yes_bttn').on('click', $.proxy(this.deleteBooking, this));

  },
  onAppointmentsPopulate: function () {

    // Define array of time slots
    const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

    // Get the time dropdown element
    const timeDropdown = document.getElementById("time");

    // Populate the time dropdown with options from the timeSlots array
    for (let i = 0; i < timeSlots.length; i++) {
      const option = document.createElement("option");
      option.textContent = timeSlots[i];
      timeDropdown.appendChild(option);
    }

    var userName = window.localStorage.getItem('username');
    if (userName == null) {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    }
    else
      $.ajax({
        type: "GET",
        url: "http://localhost:57312/api/users/" + userName,
        dataType: "json",
        success: function (data) {
          $.each(data, function () {
            $('#name').val(this.FirstName + " " + this.LastName);
            $('#email').val(this.Email);
            $('#phone').val(this.PhoneNumber);
          });
        }
      });
  },
  onSubmitButton: function () {
    var userName = window.localStorage.getItem('username');
    var userId;
    if (userName == null) { }
    else {
      $.ajax({
        type: "GET",
        url: "http://localhost:57312/api/users/" + userName,
        dataType: "json",
        async: false,
        success: function (data) {
            userId = data[0].UserId;
        }
      });
    }
    var date = $('#date').val();
    var time = $('#time').val();
    var message = $('#message').val();

    var obj = {
      'AppointmentId': 1,
      'UserId': userId,
      'Date': date,
      'Time': time,
      'Message': message
    };
    if (userId != "undefined") {
      $.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'

        },
        type: 'POST',
        url: "http://localhost:57312/api/appointments/",
        data: JSON.stringify(obj),
        success: function () {
          console.log('appointment updated successfully');
        },
        error: function () {
          console.log('error updating appointment');
        }
      });
      localStorage.removeItem('username');
      window.localStorage.setItem('username', userName);
      this.onAppointmentsPopulate();
    }
  },
};