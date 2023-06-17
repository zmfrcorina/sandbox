var formattedDate;
AppointmentsView = function () {
  this.initComponents();
};
AppointmentsView.prototype = {
  initComponents: function () {
    var today = new Date();
    formattedDate = today.getFullYear() + '-' +
      ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
      ('0' + today.getDate()).slice(-2);

    this.attachListeners();
    this.onAppointmentsInit();
  },
  populateAppointments: function(){
    var timeDropdown = document.getElementById("time");

    // Clear children
    while (timeDropdown.firstChild) {
      timeDropdown.removeChild(timeDropdown.firstChild);
    }

    $.ajax({
      type: "GET",
      url: "http://localhost:57312/api/freeAppointments/" + formattedDate,
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
  onDateChanged: function (event) {

    document.getElementById("status-header").innerHTML = "";

    var selectedDate = event.date;
    formattedDate = selectedDate.getFullYear() + '-' +
      ('0' + (selectedDate.getMonth() + 1)).slice(-2) + '-' +
      ('0' + selectedDate.getDate()).slice(-2);

    console.log('Date changed:', formattedDate);
    this.populateAppointments();
  },

  attachListeners: function () {
    var self = this;
    $('#submit_appointment_bttn').on('click', $.proxy(this.onSubmitButton, this));

    $('#time').on('change', function () {
      self.onTimeChanged(); 
    });

    $(document).ready(function () {
      var datePickerContainer = $('#datePickerContainer');

      datePickerContainer.datepicker({
        format: 'yyyy-mm-dd',
        startDate: 'today',
        autoclose: true,
        todayHighlight: true
      }).on('changeDate', (event) => { 
        self.onDateChanged(event); 
      });
    });
  },

  onTimeChanged: function () {
    document.getElementById("status-header").innerHTML = "";
  },

  onAppointmentsInit: function () {
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

      var timeDropdown = document.getElementById("time");
      // Clear children.
      while (timeDropdown.firstChild) {
        timeDropdown.removeChild(timeDropdown.firstChild);
      }
    }
    this.populateAppointments();
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
    var time = $('#time').val();
    var message = $('#message').val();

    var obj = {
      'AppointmentId': 1,
      'UserId': userId,
      'Date': formattedDate,
      'Time': time,
      'Message': message
    };
    if (userId != "undefined") {
      var self = this;
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
          self.onAppointmentsInit();
          self.populateAppointments();
        },
        error: function () {
          console.log('error updating appointment');
          document.getElementById("status-header").innerHTML = "Programarea a eșuat!";
        }
      });
      localStorage.removeItem('username');
      window.localStorage.setItem('username', userName);
    }
  }
};
