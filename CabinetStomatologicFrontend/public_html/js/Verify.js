/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
function Verify() {
    if (window.localStorage.getItem("sessionToken")) {
        console.log(window.localStorage.getItem("username"));
//query from db
        query.equalTo("username", window.localStorage.getItem("username"));
        query.find({
            success: $.proxy(function (results) {
                window.localStorage.setItem('userId', results[0].id);
                //if(!window.localStorage.getItem('userPhoto'))
               // if (results[0].get('image'))
               // {
               //     window.localStorage.setItem('userPhoto', results[0].get('image').url());
                //}
               // else {
                //    window.localStorage.setItem('userPhoto', 'images/no-profile-photo.jpg');
               // }
            }, this),
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }
    else
    {
        //window.location.href = "../login.html";
    }

}*/