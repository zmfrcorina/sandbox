// JavaScript code for index.html

$(document).ready(function() {
    $('#datepicker').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true
    }).on('show', function() {
      $('.datepicker').css('z-index', 999999999);
    });
  });
  