MainView = function () {
    this.initComponent();

};
MainView.prototype = {

    initComponent: function () {

        this.attachListeners();
        this.verifyUserType();

    },
    attachListeners: function () {
        $('nav').off();
        $('nav').on('click', 'li', $.proxy(this.onNavItem, this));
        $('#id_for_main').load('home.html', function () {
            var home = new HomeView();
            home.onHomePopulate();
        });
    },

    verifyUserType: function () {
        var user = window.localStorage.getItem('userType');
        if (user == 'user' || user == '')
            $('#users').addClass('.display_class');
        if (user == 'admin')
            $('#users').removeClass('.display_class');

    },
    onNavItem: function (event) {
        var itemId = $(event.currentTarget).attr('id');
        switch (itemId) {
            case 'home':
                $('#id_for_main').load('home.html', function () {
                    var home = new HomeView();
                    home.onHomePopulate();
                });
                break;
            case 'aboutUs':
                $('#id_for_main').load('aboutUs.html');
                break;
            case 'dentalServices':
                $('#id_for_main').load('dentalServices.html');
                break;
            case 'contact':
                $('#id_for_main').load('contact.html');
                break;
            case 'appointments':
                var user = window.localStorage.getItem('userType');
                if (user == 'admin') {
                    $('#id_for_main').load('adminView.html', function () {
                        var adminV = new AdminView();
                        adminV.onAdminPopulate();
                    });
                }
                else {
                    $('#id_for_main').load('appointments.html', function () {
                        var appointments = new AppointmentsView();
                        appointments.onAppointmentsPopulate();
                    });
                }
                break;
            case 'users':
                {
                    var user = window.localStorage.getItem('userType');
                    if (user == 'admin')
                        $('#id_for_main').load('users.html', function () {
                            var users = new UsersView();
                            users.onAllUsersPopulate();
                        });
                    break;
                }
            case 'bttn1':
                {
                    var user = window.localStorage.getItem('userType');
                    $('#id_for_main').load('myProfile.html', function () {
                        var myProfile = new MyProfile();
                    });
                    break;
                }
            case 'bttn2':
                var logOut = new Logout();
                window.location.href = "login.html";
                break;

            case 'bttn3':
                window.location.href = "login.html";
                break;
            case 'bttn4':
                window.location.href = "login.html";
                break;

        }
    }
};
$(document).ready(function () {
    var mainApp = new MainView();
});
