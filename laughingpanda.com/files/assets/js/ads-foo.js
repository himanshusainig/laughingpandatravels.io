$(document).ready(function() {
    $(document).on('click', '.enquiry-btn', function() {
        var element = $(this);
        var data_package = element.attr('my-package');
        $(".package").val(data_package);

    });

    $("#name-eq, #phone-eq, #email-eq, #package-eq, #message-eq").focusin(function() {

        $('.auto-show').removeClass("md-show")
    });

    $("#name-eq, #phone-eq, #email-eq, #package-eq, #message-eq").focusout(function() {
        $('.auto-show').removeClass("md-show");

        setInterval(function() {
            $('.auto-show').addClass("md-show");
        }, 300000);

    });

    if ($('.auto-show').removeClass("md-show")) {
        setInterval(function() {
            $('.auto-show').addClass("md-show");
        }, 20000);
    }




    // enquiry from modal


    $(document).on('click', '.enquiry-pop', function() {
        var url = window.location.href;
        var myParam = url.substring(url.lastIndexOf('/') + 1)
        var name = $("#name-pop").val();
        var email = $("#email-pop").val();
        var phone = $("#phone-pop").val();
        var package = $("#package-pop").val();
        var message = $("#message-pop").val();
        var location = $("#user_location").val();
        var page = myParam;
        if (name == '') {
            $("#name-pop").focus();
            $("#name-pop").addClass('border-danger');
        } else {
            if (phone.length <= 9) {
                $("#name-pop").removeClass('border-danger');

                $("#phone-pop").focus();
                $("#phone-pop").addClass('border-danger');
            } else {

                var email = $('#email-pop').val();
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

                if (email != '' && !emailReg.test(email)) {
                    //  email veryfy  
                    $("#email-pop").focus();
                    $("#email-pop").addClass('border-danger');
                    $("#phone-pop").removeClass('border-danger');

                } else {
                    if (package == '') {
                        $("#phone-pop").removeClass('border-danger');
                        $("#email-pop").removeClass('border-danger');
                        $("#package-pop").focus();
                        $("#package-pop").addClass('border-danger');
                    } else {
                        if (phone != '' && name != '' && package != '') {
                            $("#package-pop").removeClass('border-danger');

                            $(".loading").show();

                            $.ajax({
                                type: "POST",
                                url: "files/form/send-ads-enquiry.php",
                                data: {
                                    name: name,
                                    email: email,
                                    phone: phone,
                                    package: package,
                                    location: location,
                                    message: message,
                                    page: page
                                },
                                success: function(data) {
                                    $(".loading").hide();
                                    $('#alt-pop').fadeIn().html('</span>' + data +
                                        '</span>');

                                    $("#name-pop,#email-pop,#phone-pop,#package-pop,#message-pop").val("");
                                    setInterval(function() {
                                        $('#alt-pop').hide();
                                    }, 5000);
                                }
                            });
                        }

                    }
                }
            }
        }
    });

    // enquiry from 
    // $(document).on('click', '.send-eq', function() {
    //     var url = window.location.href;
    //     var myParam = url.substring(url.lastIndexOf('/') + 1)
    //     var name = $("#name-eq").val();
    //     var email = $("#email-eq").val();
    //     var phone = $("#phone-eq").val();
    //     var package = $("#package-eq").val();
    //     var message = $("#message-eq").val();
    //     var location = $("#user_location").val();
    //     var page = myParam;

    //     if (name == '') {
    //         $("#name-eq").focus();
    //         $("#name-eq").addClass('border-danger');
    //     } else {
    //         if (phone == '') {
    //             $("#name-eq").removeClass('border-danger');

    //             $("#phone-eq").focus();
    //             $("#phone-eq").addClass('border-danger');
    //         } else {
    //             if (package == '') {
    //                 $("#phone-eq").removeClass('border-danger');
    //                 $("#package-eq").focus();
    //                 $("#package-eq").addClass('border-danger');
    //             } else {
    //                 if (phone != '' && name != '' && package != '') {
    //                     $("#package-eq").removeClass('border-danger');

    //                     $(".loading-t").show();


    //                     $.ajax({
    //                         type: "POST",
    //                         url: "files/form/send-ads-enquiry.php",
    //                         data: {
    //                             name: name,
    //                             email: email,
    //                             phone: phone,
    //                             package: package,
    //                             location: location,
    //                             message: message,
    //                             page: page
    //                         },
    //                         success: function(data) {
    //                             $(".loading-t").hide();
    //                             $('#alt-eq').fadeIn().html('</span>' + data +
    //                                 '</span>');

    //                             $("#name-eq,#email-eq,#phone-eq,#package-eq,#message-eq").val('');
    //                         }

    //                     });
    //                 }
    //             }
    //         }
    //     }
    // });
$(document).on("click", ".send-eq", function () {
  var url = window.location.href;
  var myParam = url.substring(url.lastIndexOf("/") + 1);
  var name = $("#name-eq").val();
  var email = $("#email-eq").val();
  var phone = $("#phone-eq").val().trim();
  var package = $("#package-eq").val();
  var message = $("#message-eq").val();
  var location = $("#user_location").val();
  var page = myParam;

  // Clear any previous red borders
  $("#name-eq, #phone-eq, #package-eq").removeClass("border-danger");

  if (name == "") {
    $("#name-eq").focus().addClass("border-danger");
  } else if (phone == "") {
    $("#phone-eq").focus().addClass("border-danger");
  } else if (!/^\d{10,15}$/.test(phone)) {
    alert("Please enter a valid mobile number.");
    $("#phone-eq").focus().addClass("border-danger");
  } else if (package == "") {
    $("#package-eq").focus().addClass("border-danger");
  } else {
    $(".loading-t").show();

    $.ajax({
      type: "POST",
      url: "files/form/send-ads-enquiry.php",
      data: {
        name: name,
        email: email,
        phone: phone,
        package: package,
        location: location,
        message: message,
        page: page,
      },
      success: function (data) {
        $(".loading-t").hide();
        $("#alt-eq")
          .fadeIn()
          .html("</span>" + data + "</span>");
        $("#name-eq,#email-eq,#phone-eq,#package-eq,#message-eq").val("");
      },
    });
  }
});



});


// tool trip 
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function() {
    $('[data-toggle="popover"]').popover({
        html: true,
        content: function() {
            return $('#primary-popover-content').phpl();
        }
    });
});