DentalServicesView = function () {
  this.initComponents();
};
DentalServicesView.prototype = {
  initComponents: function () {
    this.attachListeners();
  },
  onLoadDetails: function (picture) {
    const serviceName = picture.querySelector('img').id;

    $.ajax({
      type: "GET",
      url: "http://localhost:57312/api/services/" + serviceName,
      dataType: "json",
      success: function (data) {
        $('#serviceDetails').empty();
        $.each(data, function () {
          var description = data.Description;

          var boldText = "<strong>" + description + "</strong>";
          $('#serviceDetails').html(boldText);
          $('#serviceDetails').removeClass('hidden');
        });
      }
    });
  },
  attachListeners: function () {
    const smallPictures = document.querySelectorAll('.small-picture');
    smallPictures.forEach(picture => {
      picture.addEventListener('click', function () {
        this.onLoadDetails(picture);
      }.bind(this));
    });
  }
};

