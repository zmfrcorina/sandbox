

function Logout() {
    this.init();
}

Logout.prototype = {
    init: function () {
        this.attachListeners();
    },
    attachListeners: function () {
        $('#bttn2').on('click', $.proxy(this.onLogOut, this));
    },
    onLogOut: function (event) {
        event.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('userType');
        localStorage.clear();
        window.location.href = "../index.html";
    }
};

$(document).ready(function () {
    var logout = new Logout();

});
