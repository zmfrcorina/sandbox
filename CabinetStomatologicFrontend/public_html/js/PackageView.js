
PackageView = function () {
    this.initComponent();
};
PackageView.prototype = {
    initComponent: function () {
        this.attachListeners();
        //this.bookPackage();
        this.onHideButtonAddTrip();
    },
    attachListeners: function () {
        $('#submit_bttn').on('click', $.proxy(this.onSubmitTrip, this));
        $('#book_bttn').on('click', $.proxy(this.bookPackage, this));
        $('table').on('click', 'tr', $.proxy(this.onTableSelect, this));

    },

    onTableSelect: function (e) {
        var tripId = $(e.currentTarget).attr('id');
        window.localStorage.setItem('idTrip', tripId);
        $(tripId).addClass('class_for_table');
        // return tripId;
    },
    verifyUserType: function () {
        var user = window.localStorage.getItem('userType');
        return user;
    },
    onHideButtonAddTrip: function () {
        var userType = this.verifyUserType();

        if (userType == 'admin') {
            //$('#div_for_add_offer_bttn').val('<button type="button" id="button_add_offer" class="btn btn-info btn-lg " data-toggle="modal" data-target="#myModal">Add Offer</button>');
            var bttn = document.createElement('button');
            bttn.id = 'button_add_package';
            bttn.className = 'btn btn-info btn-lg';
            bttn.setAttribute('data-toggle', 'modal');
            bttn.setAttribute('data-target', "#myModal");
            var text = document.createTextNode('Add trip itinerarium');
            bttn.appendChild(text);
            var e = document.getElementById('div_for_add_trip_bttn');
            e.appendChild(bttn);
        }

    },
    findPackageId: function (dest) {
        var id;
        $.ajax({
            type: 'GET',
            url: "http://localhost:57312/api/packages/" + dest,
            dataType: 'json',
            async: false,
            success: function (data) {

                id = data[0].PackageId;

            },
            fail: function () {
                console.log('failed  to find package by dest');
            }
        });
        return id;
    },
    onSubmitTrip: function () {


        var dest = $('#package_id').val();

        var packageId = this.findPackageId(dest);

        var plane = $('#plane_trip_add').val();
        var departureDate = $('#departure_date').val();
        var returnDate = $('#return_date').val();
        var price = $('#price_add_trip').val();

        var obj = {"PackageId": packageId, "Plane": plane, "Start": departureDate, "Finish": returnDate, "Price": price};

        if (plane == "" || departureDate == "" || returnDate == '' || packageId == '' || price == '') {
            console.log("fill all the fields for trip to be added");
            //alert("Please Fill All Fields");
        } else {
// AJAX code to submit form.
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                url: "http://localhost:57312/api/tripItinerariums",
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
        $('#package_id').val('');
        $('#plane_trip_add').val('');
        $('#departure_date').val('');
        $('#return_date').val('');
        $('#price_add_trip').val('');

        return false;
    },
    bookPackage: function () {
        //window.localStorage.setItem('userId', this.UserId);
        var userId = window.localStorage.getItem('userId');//get from token
        // var tripItinerariumId = this.onTableSelect();//get from dropdown
        var tripId = window.localStorage.getItem('idTrip');
        var obj = {"UserId": userId, "TripItinerariumId": 1};//update with tripId CEZARA

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:57312/api/books",
            data: JSON.stringify(obj),
            dataType: 'json',
            crossDomain: true,
            success: function () {
                $('#notif').append("<div id='notif_book_success' class='alert alert-success'><strong>Success!</strong> Package booked successfully</div>");

                console.log('book made  succesfully');
            },
            fail: function () {
                $('#notif').append("<div id='notif_book_error' class='alert alert-warning'><strong>Warning!</strong> Package not booked.</div>");
                console.log('failed to book the package');
            }

        });

    },
    onDropDownPackagePagePopulate: function (itemId) {
        $.ajax({
            type: "GET",
            url: "http://localhost:57312/api/tripitinerariums/package/" + itemId,
            dataType: "json",
            crossDomain: true,
            success: function (data) {

                $.each((data), function () {
                    //$('#dropDownHome').append($("<li></li>").val(this['Destination']).html(this['Destination']));
                    // if (itemId == this.PackageId) {
                    console.log("trip it id for package" + itemId);
//                        var elem1 = document.createElement("li");
//                        elem1.className = 'li_dropdown_home';
//                        elem1.id = this.PackageId;
//
//                        var textElem2 = document.createTextNode(this.Plane + " - " + this.Start + " to " + this.Finish + " - " + this.Price);
//                        elem1.appendChild(textElem2);
//
//                        var element = document.getElementById("drop_down_trip");
//                        element.appendChild(elem1);
//                        
//                        
//                            
                    var tr = document.createElement("tr");
                    tr.id = this.TripItinerariumId;
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");
                    var plane = document.createTextNode(this.Plane);
                    var start = document.createTextNode(this.Start);
                    var finish = document.createTextNode(this.Finish);
                    var price = document.createTextNode(this.Price);
                    td1.appendChild(plane);
                    td2.appendChild(start);
                    td3.appendChild(finish);
                    td4.appendChild(price);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    var element = document.getElementById("table_package_info_page");
                    element.appendChild(tr);
                    //li_dropdown_home
                    // }
                });
            },
            failure: function (response) {
                alert(response.d);
            }

        });

    },
    onPackagePagePopulate: function (itemId) {
        $.ajax({
            type: "GET",
            url: "http://localhost:57312/api/packages", //CEZARA
            dataType: "json",
            success: function (data) {
                // var tempId = this.OfferId;
                //var items = [];
                $.each(data, function () {

                    console.log("try to add img package page");
                    console.log("package id  :: " + this.PackageId);
                    console.log("item id (package)::  " + itemId);
                    if (this.PackageId == itemId) {
                        var li1 = document.getElementById('1img');
                        li1.src = this.Image1;
                        var li2 = document.getElementById('2img');
                        li2.src = this.Image2;
                        var elem = document.getElementById('info_package');

                        var pH = document.createElement('span');
                        pH.id = 'id_span'

                        var textElem2 = document.createTextNode("You will be staying at ");

                        var hotelText = document.createTextNode(this.Hotel);
                        pH.appendChild(hotelText);

                        var textSpanAfter = document.createTextNode(", meals included: " + this.Food + ". This package is for " + this.NoPassengers + " passengers");


                        elem.appendChild(textElem2);
                        elem.appendChild(pH);
                        elem.appendChild(textSpanAfter);



                        var p1 = document.getElementById('location');
                        var textp1 = document.createTextNode(this.Location);
                        p1.appendChild(textp1);
                        var p2 = document.getElementById('facilityHotel');

                        var textp2 = document.createTextNode(this.HotelFacility);
                        p2.appendChild(textp2);
                        var p3 = document.getElementById('facilityRoom');
                        var textp3 = document.createTextNode(this.RoomFacility);
                        p3.appendChild(textp3);
                    }
                });
            },
            failure: function (response) {
                alert(response.d);
            }
        });


    }

};



//
//
//
//    $("#enable").click(function () {
//        datetimepicker.enable();
//    });
//
//    $("#disable").click(function () {
//        datetimepicker.enable(false);
//    });
//
//    $("#readonly").click(function () {
//        datetimepicker.readonly();
//    });
//
//    $("#openDateView").click(function () {
//        datetimepicker.open("date");
//    });
//
//    $("#openTimeView").click(function () {
//        datetimepicker.open("time");
//    });
//
//    $("#closeDateView").click(function () {
//        datetimepicker.close("date");
//    });
//
//    $("#closeTimeView").click(function () {
//        datetimepicker.close("time");
//    });
//
//    $("#value").kendoDateTimePicker({
//        change: setValue
//    });
//
//    $("#set").click(setValue);
//
//    $("#get").click(function () {
//        alert(datetimepicker.value());
//    });
