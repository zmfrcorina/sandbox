HomeView = function () {
    this.initComponent();
};
HomeView.prototype = {
    initComponent: function () {

        this.attachListeners();
        this.onHomePopulate();
        this.verifyUserType();
        this.onChangeButtons();
    },
    attachListeners: function () {
        $('nav').on('click', '#home', $.proxy(this.onHomePopulate, this));
        $('#appointments_button').on('click', $.proxy(this.onAppointmentsButton, this));
    },
    onHomePopulate: function () { },
    verifyUserType: function () {
        var user = window.localStorage.getItem('userType');
        return user;
    },
    onChangeButtons: function () {
        var user = window.localStorage.getItem('userType');
        if (user == 'admin' || user == 'user') {
            $('#bttn1').removeClass('display_class');
            $('#bttn2').removeClass('display_class');

        }
        if (user == undefined) {
            $('#bttn3').removeClass('display_class');
            $('#bttn4').removeClass('display_class');
            $('#bttn1').addClass('display_class');
            $('#bttn2').addClass('class');
        }
        if (user === 'admin') {
            document.getElementById("appointments_button").innerHTML = "Vizualizare programari";
            
            const appointmentsMenuItem = document.getElementById('appointments');
            appointmentsMenuItem.querySelector('a').textContent = 'Vizualizare programari';
        }
    },
    onAppointmentsButton: function () {
        var user = window.localStorage.getItem('userType');
        if (user === 'admin') {
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
        
    }
};

