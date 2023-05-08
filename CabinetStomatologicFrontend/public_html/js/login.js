function Login() {
    this.init();
}

Login.prototype = {
    init: function () {

        this.attachListeners();
        // this.initKendoComponents();
    },
    attachListeners: function () {
        $('#username').on('keyup', $.proxy(this.onInputBlur, this));
        $('#password').on('keyup', $.proxy(this.onInputBlur, this));
        $('#login_button').on('click', $.proxy(this.onLogin, this));
        $('#password').on("keyup", function (e) {
            if (e.which === 13) {
                $('#login_button').trigger('click');
            }
        });
        $('#go_back').on('click', function () {
            window.location.href = "index.html";
        });
        
    },

    onInputBlur: function (event) {
        if ($("#username").val().length === 0)
        {
            $("#username").next().removeClass("hide");
        } else
        {
            $("#username").next().addClass("hide");
        }
        if ($("#password").val().length === 0)
        {
            $("#password").next().removeClass("hide");
        } else
        {
            $("#password").next().addClass("hide");
        }
    },
    onLogin: function () {
        this.onInputBlur();
        $('#notification_li').empty();

        var username = $("#username").val();
        var password = $("#password").val();
        if ($("#alert_icon_username").hasClass('hide') && $("#alert_icon_password").hasClass('hide'))

        {
            var user = {'username': username, 'password': password};

            $.ajax({
                type: "GET",
                url: "http://localhost:57312/api/users/" + username,
                dataType: "json",
                crossDomain: true,
                success: function (data) {
                    console.log(this.password);
                    $.each((data), function () {
                        if (password == this.password) {
                            var currentUser = data[0];
                            console.log("found" + username + " " + password);
                            console.log(this.user);
                            window.location.href = "index.html";
                            window.localStorage.setItem('sessionToken', currentUser._sessionToken);
                            window.localStorage.setItem('username', this.UserNane);
                            window.localStorage.setItem('userType', this.userType);
                            window.localStorage.setItem('userId', this.UserId);

                            //window.localStorage.setItem('sessionToken', currentUser);
                            //window.localStorage.setItem('username', username);
                            //var here = window.localStorage.getItem('username');
                        }
                    });
                },
                failure: function (response) {
                    alert(response.d);
                }
            });

        } else
        {
            $('#notification_li').append("<div class='alert alert-danger'><strong>Error!</strong> Enter username and password.</div>");
        }
    }

    
};

$(document).ready(function () {
    var login = new Login();

});