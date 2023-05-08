/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function MainApp() {

    if (typeof MainApp.instance === 'object') {
        return MainApp.instance;
    }
    var baseURL = "localhost";
    var doAsyncGet = function (partialUrl) {
        var authorityToken = $.cookie("main_token");
        var fullUrl = baseURL + partialUrl;
        return $.ajax({
            url: fullUrl,
            headers: {
                "Authority": authorityToken
            },
            dataType: "json"
        });
    };
    var doAsyncPost = function (partialURL, jsonDataToPost) {
        var authorityToken = $.cookie("main_token");
        var fullUrl = baseURL + partialURL;
        return $.ajax({
            url: fullUrl,
            type: "POST",
            headers: {
                "Authority": authorityToken,
                "Content-Type": "application/json"

            },
            data: JSON.stringify(jsonDataToPost),
            dataType: "json"
        });
    };
    var doAsyncDelete = function (partialURL)
    {
        var authorityToken = $.cookie("main_token");
        var fullUrl = baseURL + partialURL;
        return $.ajax({
            url: fullUrl,
            type: "DELETE",
            headers: {
                "Authority": authorityToken
            },
            dataType: "json"
        });
    };

    var doAsyncPut = function (partialURL, jsonDataToPut) {
        var authorityToken = $.cookie("main_token");
        var fullUrl = baseURL + partialURL;
        return $.ajax({
            url: fullUrl,
            type: "PUT",
            headers: {
                "Authority": authorityToken,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(jsonDataToPut),
            dataType: "json"
        });
    };
    this.setBaseURL = function (strBaseURL) {
        baseURL = strBaseURL;
    };

    this.getAllDestinations = function () {
        var allDestReq = "/api/offers";
        return doAsyncGet(allDestReq);
    };


    this.getOffersInDest = function (destId) {
        var apiURL = "/api/offers/" + destId + "/packages";
        return doAsyncGet(apiURL);
    };

    this.getPriceForPackage = function (packageId) {
        var apiURL = "/api/packages/" + packageId;
        return doAsyncGet(apiURL);
    };

    this.addNewOffer = function (dest) {
        var postURL = "/api/offers";
        return doAsyncPost(postURL, dest);
    };
    this.deleteOffer = function (offerId)
    {
        var postURL = "/api/offers/" + offerId;
        return doAsyncDelete(postURL);
    };

    this.updateOffer = function (offerData)
    {
        var putUrl = "/api/offers/" + offerData.id;
        return doAsyncPut(putUrl, offerData);
    },

    this.getAllDestinations = function () {
        var allDestReq = "/api/offers";
        return (allDestReq);
    };
    MainApp.instance = this;
}