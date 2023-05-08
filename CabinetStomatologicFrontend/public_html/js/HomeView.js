HomeView = function () {
    this.initComponent();
};
HomeView.prototype = {
    initComponent: function () {

        this.attachListeners();

        this.onDropDownPopulate();
        this.onHomePopulate();
        this.verifyUserType();
        this.onChangeButtons();
        this.onHideDropDown();
    },
    attachListeners: function () {
        $('#smth').on('click', 'button', $.proxy(this.onDropDownPopulate, this));
        $('nav').on('click', '#home', $.proxy(this.onHomePopulate, this));
        $('#ul_offer_page').on('click', 'li', $.proxy(this.onOfferLoad, this));
        $('#submit_bttn_home').on('click', $.proxy(this.onSubmitOffer, this));
        $('#smth').on('click', 'li', $.proxy(this.onOfferLoad, this));
    },

    verifyUserType: function () {
        var user = window.localStorage.getItem('userType');
        return user;
    },
    onHideDropDown: function () {
        var userType = this.verifyUserType();

        if (userType == 'admin') {
            //$('#div_for_add_offer_bttn').val('<button type="button" id="button_add_offer" class="btn btn-info btn-lg " data-toggle="modal" data-target="#myModal">Add Offer</button>');
            var bttn = document.createElement('button');
            bttn.id = 'button_add_offer';
            bttn.className = 'btn btn-info btn-lg';
            bttn.setAttribute('data-toggle', 'modal');
            bttn.setAttribute('data-target', "#myModal");
            var text = document.createTextNode('Add offer');
            bttn.appendChild(text);
            var e = document.getElementById('div_for_add_offer_bttn');
            e.appendChild(bttn);
        }

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




// /                       
    },
    onSubmitOffer: function () {


        var destination = $('#imputDestOffer').val();
        var image = $('#imputImageOffer').val();

        var obj = {"Destination": destination, "Image": image};
        if (destination == "" || image == "") {
            console.log("fill all the fields for offer to be added");
            //alert("Please Fill All Fields");
        } else {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://localhost:57312/api/offers",
                data: JSON.stringify(obj),
                crossOrigin: true,
                dataType: 'json',
                crossDomain: true,
                success: function () {
                    console.log('offer added succesfully');
                },
                fail: function () {
                    console.log('failed to add offer');
                }

            });
        }
        $('#message_to_be_shown').append("<p>Offer added succesfully</p>");
        $('#imputDestOffer').val('');
        $('#imputImageOffer').val('');

        return false;
    },
    onHomePopulate: function (e) {

        // $.ajax({
        //     type: "GET",
        //     url: "http://localhost:57312/api/offers",
        //     dataType: "json",

        //     success: function (data) {
        //         $('#ul_offer_page').empty();

        //         $.each(data, function () {

        //             var elem1 = document.createElement("li");
        //             elem1.className = 'li_offer_ul';
        //             elem1.id = this.OfferId;
        //             var elem2 = document.createElement("div");
        //             elem2.className = "div_img_offer";
        //             elem2.className = "floating-box";

        //             elem2.style["margin-top"] = "10%";
        //             var elem3 = document.createElement("img");
        //             elem3.setAttribute('src', this.Image);
        //             elem3.setAttribute('width', '275');
        //             elem3.setAttribute('height', '175');
        //             elem3.className = "img_class";
        //             var elem4 = document.createElement("a");
        //             elem4.className = "container";

        //             var textElem4 = document.createTextNode(this.Destination);
        //             elem4.appendChild(textElem4);
        //             elem2.appendChild(elem3);
        //             elem1.appendChild(elem2);
        //             elem2.appendChild(elem4);
                    
        //             var element = document.getElementById("ul_offer_page");
        //             element.appendChild(elem1);

        //         });
        //     },
        //     failure: function (response) {
        //         alert(response.d);
        //     }
        // });

    },
    onOfferLoad: function (event) {
        var itemId = $(event.currentTarget).attr('id');
        console.log("id from home ul " + itemId);
        $("#id_for_main").load('offers.html', function () {
            var offer = new OffersView();
            offer.onPackagesPopulate(itemId);
        });
    },

    onDropDownPopulate: function () {
        // $.ajax({
        //     type: "GET",
        //     url: "http://localhost:57312/api/offers",
        //     dataType: "json",
        //     crossDomain: true,
        //     success: function (data) {

        //         $.each((data), function () {
        //             //$('#dropDownHome').append($("<li></li>").val(this['Destination']).html(this['Destination']));

        //             var elem1 = document.createElement("li");
        //             elem1.className = 'li_dropdown_home';
        //             elem1.id = this.OfferId;

        //             var textElem2 = document.createTextNode(this.Destination);
        //             elem1.appendChild(textElem2);

        //             var element = document.getElementById("dropDownHome");
        //             element.appendChild(elem1);
        //         });
        //     },
        //     failure: function (response) {
        //         alert(response.d);
        //     }

        // });
        // $('#dropDownHome').empty();
    }

};

