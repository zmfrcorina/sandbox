
function Register() {
    this.init();
}

Register.prototype = {
    init: function () {
        this.attachListeners();
    },
    attachListeners: function () {
        $('#submit_bttn').on('click', $.proxy(this.addTo, this));
        // $('body').on('click', '.save_info', $.proxy(this.addTo, this));

    },
    addTo: function (event) {
        event.preventDefault();
        $('#submit_bttn').attr('data-dismiss', '');
        var valid = true;
        var username = $('#userName').val();
        var firstname = $('#firstName').val();
        var lastname = $('#lastName').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var password = $('#passwordForm').val();
        if (email === '') {
            $('#not4').append("<div class='alert alert-danger'><strong>Error!</strong> Email is not filled.</div>");
            valid= false;
        }
        if (phone === '') {
            $('#not5').append("<div class='alert alert-danger'><strong>Error!</strong> Phone is not filled.</div>");
            valid= false;
        }
        if (username === '') {
            $('#not1').append("<div class='alert alert-danger'><strong>Error!</strong> User name is not filled.</div>");
            valid= false;
        }
        if (firstname === '') {
            $('#not2').append("<div class='alert alert-danger'><strong>Error!</strong> First name is not filled.</div>");
            valid= false;
        }
        if (lastname === '') {
            $('#not3').append("<div class='alert alert-danger'><strong>Error!</strong> Last name is not filled.</div>");
            valid= false;
        }
        if($('#passwordForm').val() === '' || $('#confirmPassword').val() == ''){
            $('#not6').append("<div class='alert alert-danger'><strong>Error!</strong> Passwords field is not filled.</div>");
        }
        if ($('#passwordForm').val() !== $("#confirmPassword").val()) {
            $('#not6').append("<div class='alert alert-danger'><strong>Error!</strong> Passwords do not match.</div>");
            $('#passwordForm, #confirmPassword').addClass('invalid');
            valid= false;
        }
        if (!valid) {
            console.log('smth wrong');
        } else {
            $('#submit_bttn').attr('data-dismiss', 'modal');
            var obj = {
                'userType': 'user',
                'FirstName': firstname,
                'LastName': lastname,
                'UserNane': username,
                'PhoneNumber': phone,
                'Email': email,
                'password': password
            };
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                },
                crossOrigin: true,
                type: 'POST',
                url: 'http://localhost:57312/api/users',
                data: JSON.stringify(obj),

                dataType: 'json',
                crossDomain: true,
                success: function () {
                    console.log('User register successfully');
                    $('#userName').val('');
                    $('#firstName').val('');
                    $('#lastName').val('');
                    $('#email').val('');
                    $('#phone').val('');
                    $('#passwordForm').val('');
                    $('#confirmPassword').val('');
                    $('#not1').empty();
                    $('#not2').empty();
                    $('#not3').empty();
                    $('#not4').empty();
                    $('#not5').empty();
                    $('#not6').empty();
                },
                error: function () {
                    console.log('user not registered successfully');
                }
            });
        }




    }
};

$(document).ready(function () {
    var register = new Register();
});