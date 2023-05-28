MyProfile = function () {
    this.initComponents();
    var arrayTripId = [];
};
MyProfile.prototype = {
    initComponents: function () {
        this.onFormPopulate();
        this.attachListeners();
        this.populate();
    },

    attachListeners: function () {
        $('#save_changes_my_profile_bttn').on('click', $.proxy(this.onSaveButton, this));
        $('table').on('click', 'tr', $.proxy(this.getIdBooking, this));
        $('#yes_bttn').on('click', $.proxy(this.deleteBooking, this));

    },
    getIdBooking: function (e) {
        if (typeof e !== 'undefined') {
            var id = $(e.currentTarget).attr('id');
            window.localStorage.setItem('idForCancelBooking', id);
        }
        return id;
    },
    populate: function () {
        var userId = window.localStorage.getItem('userId');
        $.ajax({
            type: 'GET',
            url: "http://localhost:57312/api/appointments/user/" + userId,
            dataType: "json",
            async: false,
            success: function (data) {
                $.each(data, function () {
                    console.log(data);
                    var trU = document.createElement("tr");
                    trU.id = this.AppointmentId;
                    var td01 = document.createElement("td");
                    var td02 = document.createElement("td");
                    var td03 = document.createElement("td");

                    var date = document.createTextNode(this.Date.split("T")[0]);
                    var time = document.createTextNode(this.Time);
                    var message = document.createTextNode(this.Message);


                    td01.appendChild(date);
                    td02.appendChild(time);
                    td03.appendChild(message);

                    trU.appendChild(td01);
                    trU.appendChild(td02);
                    trU.appendChild(td03);

                    var elementU = document.getElementById("table_package_info_books");
                    elementU.appendChild(trU);
                });
            },
            failure: function (response) {
                alert(response.d);
            }
        });

    },
    refreshTable: function () {
        var table = document.getElementById("table_package_info_books");
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        this.populate(); // Call the populate function to add the elements again
    },
    deleteBooking: function () {
        var id = window.localStorage.getItem('idForCancelBooking');
        console.log(id);
        var self = this;
        $.ajax({
            type: "DELETE",
            url: "http://localhost:57312/api/appointments/deleteAppointment/" + id,

            success: function () {
                console.log('success');
                self.refreshTable();
            },
            error: function () {
                console.log('error');
            }
        });
        window.localStorage.removeItem('idForCancelBooking');
    },
    onFormPopulate: function () {
        var userName = window.localStorage.getItem('username');
        $.ajax({
            type: "GET",
            url: "http://localhost:57312/api/users/" + userName,
            dataType: "json",
            success: function (data) {
                $.each(data, function () {
                    $('#userId').val(this.UserId);
                    $('#usersType').val(this.userType);
                    $('#firstName').val(this.FirstName);
                    $('#lastName').val(this.LastName);
                    $('#userName').val(this.UserNane);
                    $('#email').val(this.Email);
                    $('#phone_num').val(this.PhoneNumber);
                    $('#pass').val(this.password);
                });
            }
        });
    },
    onSaveButton: function () {
        var userId = $('#userId').val();
        var userType = $('#usersType').val();
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var userName = $('#userName').val();
        var email = $('#email').val();
        var phone = $('#phone_num').val();
        var password = $('#pass').val();
        var obj = {
            'UserId': userId,
            'UserNane': userName,
            'FirstName': firstName,
            'userType': userType,
            'LastName': lastName,
            'Email': email,
            'PhoneNumber': phone,
            'password': password
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            type: 'PUT',
            url: "http://localhost:57312/api/users/put/" + userId,
            data: JSON.stringify(obj),
            success: function () {
                console.log('user updated successfully');
            },
            error: function () {
                console.log('error updating user');
            }
        });
        localStorage.removeItem('username');
        window.localStorage.setItem('username', userName);
        this.onFormPopulate();
    }
};
