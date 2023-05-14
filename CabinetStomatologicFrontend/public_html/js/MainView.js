MainView = function () {
    this.initComponent();

};
MainView.prototype = {

    initComponent: function () {

        this.attachListeners();
        // this.onMainMenuItem();
        // this.onNavItem();
        //var verify = new Verify();
        this.verifyUserType();

    },
    attachListeners: function () {
        $('nav').off();
        //$('li').on('click', 'a', $.proxy(this.onMainMenuItem, this));
        $('nav').on('click', 'li', $.proxy(this.onNavItem, this));
        $('#id_for_main').load('home.html', function () {
            var home = new HomeView();
            home.onHomePopulate();
        });

        //  $('#smth').on('click', 'button', $.proxy(this.onDropDownPopulate, this));
        //$('#dorpDownHome').on('click', 'li', $.proxy(this.onOfferPage, this));
        //  $('nav').on('click', '#home', $.proxy(this.onOfferPopulate, this));
        //$('nav').find('#home').trigger('click');
        //$('#ul_offer_page').on('click', 'li', $.proxy(this.onOfferLoad, this));
    },

    verifyUserType: function () {
        var user = window.localStorage.getItem('userType');
        if (user == 'user' || user == '')
            $('#users').addClass('.display_class');
        if (user == 'admin')
            $('#users').removeClass('.display_class');

    },
    onNavItem: function (event) {
        /*var itemId = 'home';
         if (event)
         {
         itemId = $(event.currentTarget).attr('id');
         }*/
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
                    //    window.location.href = "login.html";
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



/* getDestAPI: function () {
 var retApi = new MainApp();
 var hostName = 'http://localhost:57312'; //window.location.protocol + "//" + window.location.host;
 retApi.setBaseURL(hostName);
 return retApi;
 },
 loadData: function (filter)
 {
 var deferred = $.Deferred();
 var destApi = this.getDestAPI();
 destApi.getAllDestinations().done(
 function (response)
 {
 deferred.resolve(response);
 });
 return deferred.promise();
 },
 insertItem: function (insertingItem) {
 var destApi = this.getDestAPI();
 return destApi.addNewOffer(insertingItem);
 },
 updateItem: function (updatingItem) {
 var destApi = this.getDestAPI();
 return destApi.updateOffer(updatingItem);
 },
 deleteItem: function (deletingItem) {
 var destApi = this.getDestAPI();
 return destApi.deleteOffer(deletingItem);
 },*/

//    onMainMenuItem: function (event) {
//        //event.preventDefault();
//        var itemId = $(event.currentTarget).attr('id');
//        switch (itemId) {
//            case 'first-offer':
//                $('main').load('html/offers.html', function () {
//                    var offers = new OffersView();
//                });
//                break;
//            case 'second-offer':
//                $('#id_for_main').load('html/offers.html', function () {
//                    var offers = new OffersView();
//                });
//                break;
//            case 'third-offer':
//                $('#id_for_main').load('html/offers.html', function () {
//                    var offers = new OffersView();
//                });
//                break;
//            case 'fourth-offer':
//                $('#id_for_main').load('html/offers.html', function () {
//                    var offers = new OffersView();
//                });
//                break;
//            case 'fifth-offer':
//                $('#id_for_main').load('html/offers.html', function () {
//                    var offers = new OffersView();
//                });
//                break;
//            case 'sixth-offer':
//                $('#id_for_main').load('html/offers.html', function () {
//                    var offers = new OffersView();
//                });
//                break;
//        }
//
//    },