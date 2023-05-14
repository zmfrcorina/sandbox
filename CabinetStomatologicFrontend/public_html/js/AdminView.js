AdminView = function () {
    this.initComponents();
};
AdminView.prototype = {
    initComponents: function () {
        this.attachListeners();
        this.onAdminPopulate();
    },
    attachListeners: function () {
        //   $('#submit_appointment_bttn').on('click', $.proxy(this.onSubmitButton, this));
        //   $('#date').on('change', $.proxy(this.onDateChanged, this));
    },
    onAdminPopulate: function () {

    }
}