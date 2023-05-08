OffersView = function () {
    this.initComponent();

};
OffersView.prototype = {

    initComponent: function () {
        this.attachListeners();
        this.onModalWinGetPackage();

        this.onHideButtonAddPackage();

    },
    attachListeners: function () {
        console.log("i got here");
        $('#submit_bttn').on('click', $.proxy(this.onModalWinGetPackage, this));
        $('#ul_offers_by_id').on('click', 'li', $.proxy(this.onPackageLoad, this));

    },
    verifyUserType: function () {
        var user = window.localStorage.getItem('userType');
        return user;
    },
    onHideButtonAddPackage: function () {
        var userType = this.verifyUserType();

        if (userType == 'admin') {
            //$('#div_for_add_offer_bttn').val('<button type="button" id="button_add_offer" class="btn btn-info btn-lg " data-toggle="modal" data-target="#myModal">Add Offer</button>');
            var bttn = document.createElement('button');
            bttn.id = 'button_add_package';
            bttn.className = 'btn btn-info btn-lg';
            bttn.setAttribute('data-toggle', 'modal');
            bttn.setAttribute('data-target', "#myModal");
            var text = document.createTextNode('Add package');
            bttn.appendChild(text);
            var e = document.getElementById('div_for_add_package_bttn');
            e.appendChild(bttn);
        }

    },
    onPackageLoad: function (event) {
        var itemId = $(event.currentTarget).attr('id');
        console.log("here is wrong " + itemId);
        $("#id_for_main").load('package.html', function () {
            var package = new PackageView();
            package.onPackagePagePopulate(itemId);
            package.onDropDownPackagePagePopulate(itemId);
        });
    },
    getOfferID: function (dest) {
        var id;
        $.ajax({
            type: "GET",
            url: "http://localhost:57312/api/offers/" + dest,
            dataType: 'json',
            async: false,
            cache: false,
            success: function (data) {

                id = data[0].OfferId;

            },
            fail: function () {
                console.log('failed');
            }

        });

         return id;
    },
    onModalWinGetPackage: function () {

        var dest = $("#dest_country").val();

        var offer = this.getOfferID(dest);

        var hotel = $("#hotel").val();
        var food = $("#food").val();
        var no_pass = $("#no_pass").val();
        var price = $("#price").val();
        var dest_city = $("#dest_city").val();
        var img1 = $("#img1").val();
        var img2 = $("#img2").val();
        var loc = $('#location_id').val();
        var hf = $('#hotel_facilities').val();
        var rf = $('#room_facilities').val();
        var obj = {
            "OfferId": offer,
            "DestinationCity": dest_city,
            "Image1": img1,
            "Image2": img2,
            "Hotel": hotel,
            "Food": food,
            "NoPassengers": no_pass,
            "Location": loc,
            "HotelFacility": hf,
            "RoomFacility": rf
        };

        if (hotel == '' || food == '' || no_pass == '' || price == ''
                || dest == '' || dest_city == '' || img1 == '' || img2 == '') {
            console.log("fill all the fields");
        } else {
            this.onAjaxCallPostPackage(obj, offer);
        }
        
    },
    onAjaxCallPostPackage: function (obj, offer) {
        obj.OfferId = offer;
        if (typeof offer !== 'undefined') {
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'

                },
                crossOrigin: true,
                type: "POST",
                url: "http://localhost:57312/api/packages",
                data: JSON.stringify(obj),

                dataType: 'json',
                crossDomain: true,
                timeout: 30000,

                success: function () {
                    console.log('added succesfully');
                    $('main').location.reload(true);
                },
                fail: function () {
                    console.log('failed');
                }

            });
        }
    },
    onPackagesPopulate: function (itemId) {
        $.ajax({
            type: "GET",
            url: "http://localhost:57312/api/packages",
            dataType: "json",
            success: function (data) {
                // var tempId = this.OfferId;
                //var items = [];
                console.log("try1");
                $.each(data, function () {
                    console.log("offer id  :: " + this.OfferId);
                    console.log("item id ::  " + itemId);
                    if (this.OfferId == itemId) {

                        var elem1 = document.createElement("li");
                        elem1.className = 'li_offer_ul';
                        elem1.id = this.PackageId;
                        var elem2 = document.createElement("div");
                        elem2.className = "div_img_offer";
                        elem2.className = "floating-box";
                        elem2.style["margin-top"] = "10%";
                        var elem3 = document.createElement("img");
                        elem3.setAttribute('src', this.Image1);
                        elem3.setAttribute('width', '275');
                        elem3.setAttribute('height', '175');
                        elem3.className = "img_class";
                        var elem4 = document.createElement("a");
                        elem4.className = "container    ";
                        var textElem4 = document.createTextNode(this.DestinationCity + " - " + this.Hotel);
                        //var textElem5 = document.createTextNode();
                        elem4.appendChild(textElem4);
                        // elem4.appendChild(textElem5);
                        // var imgElem3 = document.createTextNode(this.Image);
                        elem2.appendChild(elem3);
                        elem2.appendChild(elem4);
                        elem1.appendChild(elem2);

                        var element = document.getElementById("ul_offers_by_id");
                        element.appendChild(elem1);
                    }
                });

            },
            failure: function (response) {
                alert(response.d);
            }
        });
    },
    onAllPackagesPopulate: function () {
        $.ajax({
            type: "GET",
            url: "http://localhost:57312/api/packages",
            dataType: "json",
            success: function (data) {
                // var tempId = this.OfferId;
                //var items = [];
                console.log("try2 function onAllPackagesPopulate");
                $.each(data, function () {

                    var elem1 = document.createElement("li");
                    elem1.className = 'li_offer_ul';
                    elem1.id = this.PackageId;
                    var elem2 = document.createElement("div");
                    elem2.className = "div_img_offer";
                    elem2.className = "floating-box";
                    elem2.style["margin-top"] = "10%";
                    var elem3 = document.createElement("img");
                    elem3.setAttribute('src', this.Image1);
                    elem3.setAttribute('width', '275');
                    elem3.setAttribute('height', '175');
                    elem3.className = "img_class";
                    var elem4 = document.createElement("a");
                    elem4.className = "container";
                    var textElem4 = document.createTextNode(this.DestinationCity + " - " + this.Hotel);
                    elem4.appendChild(textElem4);
                    // var imgElem3 = document.createTextNode(this.Image);
                    elem2.appendChild(elem3);
                    elem2.appendChild(elem4);
                    elem1.appendChild(elem2);

                    var element = document.getElementById("ul_offers_by_id");
                    element.appendChild(elem1);

                });

            },
            failure: function (response) {
                alert(response.d);
            }
        });
    }

//    onMainMenuItemOffer: function (event) {
//        //event.preventDefault();
//        console.log("i got here");
//        var itemId = $(event.currentTarget).attr('id');
//        switch (itemId) {
//            case 'first':
//                $('#id_for_main').load('package.html');
//                break;
//            case 'second':
//                $('#id_for_main').load('package.html', function () {
//                    var package = new PackageView();
//                });
//                break;
//            case 'third':
//                $('#id_for_main').load('package.html', function () {
//                    var package = new PackageView();
//                });
//                break;
//            case 'fourth':
//                $('#id_for_main').load('package.html', function () {
//                    var package = new PackageView();
//                });
//                break;
//            case 'fifth':
//                $('#id_for_main').load('package.html', function () {
//                    var package = new PackageView();
//                });
//                break;
//            case 'sixth':
//                $('#id_for_main').load('package.html', function () {
//                    var package = new PackageView();
//                });
//                break;
//
//
//        }
//
//    }
};

