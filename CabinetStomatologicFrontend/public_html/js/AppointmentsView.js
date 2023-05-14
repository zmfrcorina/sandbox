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
    $('#date').on('change', $.proxy(this.onDateChanged, this));
    //UPDATE FOR APPOINTMENTS TO REMOVE CANCELLATION
    $('table').on('click', 'tr', $.proxy(this.getIdBooking, this));
    $('#yes_bttn').on('click', $.proxy(this.deleteBooking, this));

  },
  onAppointmentsPopulate: function () {
    var userName = window.localStorage.getItem('username');
    if (userName == null) {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    }
    else {
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

      $('#date').val("");

      var timeDropdown = document.getElementById("time");
      //clear children
      while (timeDropdown.firstChild) {
        timeDropdown.removeChild(timeDropdown.firstChild);
      }
    }
  },
  onDateChanged: function () {
    var timeDropdown = document.getElementById("time");

    //clear children
    while (timeDropdown.firstChild) {
      timeDropdown.removeChild(timeDropdown.firstChild);
    }

    $.ajax({
      type: "GET",
      url: "http://localhost:57312/api/freeAppointments/" + $('#date').val(),
      dataType: "json",
      async: false,
      success: function (data) {
        $.each(data, function () {
          const option = document.createElement("option");
          option.textContent = this;
          timeDropdown.appendChild(option);
        });
      }
    });
  },
  onSubmitButton: function () {
    var userName = window.localStorage.getItem('username');
    var userId;
    if (userName == null) {

    }
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
          document.getElementById("status-header").innerHTML = "Programare facută cu succes!";
          this.onAppointmentsPopulate();
        },
        error: function () {
          console.log('error updating appointment');
          document.getElementById("status-header").innerHTML = "Programarea a eșuat!";
        }
      });
      localStorage.removeItem('username');
      window.localStorage.setItem('username', userName);
      this.onAppointmentsPopulate();
    }
  }
};