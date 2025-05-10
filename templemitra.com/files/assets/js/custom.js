$(document).ready(function() {
    $("#user_name").keyup(function() {
        var user = $("#user_name").val();
        $.ajax({
            url: "/files/form/check_user.php",
            method: "POST",
            data: {
                user: user
            },
            success: function(data) {
                $(".user_check").html(data);

            }

        })
    });

    $("#s-email").keyup(function() {
        var email = $("#s-email").val();
        $.ajax({
            url: "/files/form/check_email.php",
            method: "POST",
            data: {
                email: email
            },
            success: function(data) {
                $(".user_email").html(data);

            }

        })
    });
    $("#s-password, #repeat-password").keyup(function() {
        var password = $("#s-password").val();
        var re_password = $("#repeat-password").val();
        if (password.length < 8) {
            $(".log-alt").html('<small class="text-danger">password must at least 8 characters</small>');
        }
        if (password.length) {
            if (password.length >= 8) {
                $(".c-password").html('<i class="icofont icofont-ui-check"></i>');
                $(".log-alt").html('');

            }
        }
        if (re_password.length) {
            if (re_password.length < 8) {
                $(".log-alt").html('<small class="text-danger">password must at least 8 characters</small>');
            }
            if (re_password.length >= 8) {
                $(".r-c-password").html('<i class="icofont icofont-ui-check"></i>');
                $(".log-alt").html('');
            }
        }
        //if password empty
        if (password != '' && password.length >= 8 && re_password != '' && re_password.length >= 8) {

            if (password == re_password) {
                $(".c-password").html('<i class="icofont icofont-ui-check text-success"></i>');
                $(".r-c-password").html('<i class="icofont icofont-ui-check text-success"></i>');
                $(".log-alt").html('<i class="text-success">Password  matched.</i>');
            } else if (password != re_password) {
                $(".c-password").html('<i class="icofont icofont-error text-danger"></i>');
                $(".r-c-password").html('<i class="icofont icofont-error text-danger"></i>');
                $(".log-alt").html('<i class="text-danger">Password not maching</i>');

            }
        }
    });

    // signup 
    $(document).on('click', '#signUp', function() {
        var user_name = $("#user_name").val();
        var email = $("#s-email").val();
        var phone = $("#s-phone").val();
        var password = $("#s-password").val();
        var repassword = $("#repeat-password").val();
        if (user_name != '' && email != '' && phone != '' && password == repassword) {
            if (password.length >= 8 && repassword.length >= 8) {

                $.ajax({
                    url: "/files/form/sinup.php",
                    method: "POST",
                    data: {
                        user_name: user_name,
                        email: email,
                        phone: phone,
                        password: password
                    },
                    success: function(data) {
                        $("#sign-alert").html('<h5 class="text-center text-success">' + data + '</h5>');
                        $(":input").val('');
                        $("#user-sign").hide();
                        setInterval(function() {
                            $('.user_check').html('');
                            $('#sign-alert').html('');
                            $(".log-alt").html('')
                            $(".c-password").html('')
                            $(".r-c-password").html('')
                            $("#user-sign").show();
                        }, 30000);
                    }
                });
            } else {
                $(".log-alt").html('<span class="text-center text-danger">password must be at least 8 characters</span>');
            }
        } else {
            $(".log-alt").html('<span class="text-center text-danger">The input is given incorrectly.</span>');
        }

    });







    // $("#proceed").hide();
    $(document).on('click', '#log', function() {
        //  $("#proceed").show();
        var email = $("#l-email").val();
        var password = $("#l-password").val();
        var set = $("#set").prop('checked');
        //if user name and pasword empty
        if (email == '' && password == '') {
            $("#l-alert").html('<span class="text-danger form-alt">Please Enter Username and  Password </span>');

            $("#l-email").addClass('border border-danger');
            $("#l-password").addClass('border border-danger');
        }
        //if password id empty
        else if (email != '' && password == '') {
            $("#l-alert").html('<span class="text-danger form-alt">Please Enter Password</span>');
            $("#l-password").addClass('border border-danger');
            $("#l-email").removeClass('border border-danger');
        }
        //if email id empty
        else if (email == '' && password != '') {
            $("#l-alert").html('<span class="text-danger form-alt">Please Enter Username</span>');
            $("#l-email").addClass('border border-danger');
            $("#l-password").removeClass('border border-danger');
        }
        //if boath are not empty
        else {
            if (email != '' && password != '') {
                $.ajax({
                    url: "/files/form/login.php",
                    method: "POST",
                    data: {
                        email: email,
                        password: password,
                        set: set
                    },
                    success: function(data) {
                        $("#l-alert").html(data);
                    }
                });
                $("#l-email").removeClass('border border-danger');
                $("#l-password").removeClass('border border-danger');

            } else {
                $("#l-alert").html('<span class="text-center text-danger form-alt">Please Enter Valid Input</span>');
                $("#proceed").fadeOut();
            }
        }
    });




    // forget-pass 

    $(".loading").hide();
    $(document).on('click', '.forget-pass', function() {
        $(".loading").show();
        var email_address = $("#email-address").val();
        if (email_address != '') {
            $.ajax({
                url: "/files/form/forget.php",
                method: "POST",
                data: {
                    email_address: email_address,
                },
                success: function(data) {
                    $("#get-password").html(data);
                    $(".loading").hide();
                }
            });
        } else {
            $("#get-password").html('<h5 class="text-center text-danger">Input Wrong</h5>');
        }
    });

});

//nav tab show on hover 
$('.auto-tab > li > a').hover(function() {
    $(this).tab('show');
});

$(document).on('click', '.signup', function() {

    $(".reg").addClass("active");
    $(".forg").removeClass("active");
    $(".log").removeClass("active");
    $("#signup").tab('show');
    $("#signup").show();
    $("#signIn").hide();
    $("#forget").hide();
});

$(document).on('click', '.signIn', function() {

    $(".log").addClass("active");
    $(".forg").removeClass("active");
    $(".reg").removeClass("active");
    $("#signIn").tab('show');
    $("#signIn").show();
    $("#signup").hide();
    $("#forget").hide();
});


$(document).on('click', '.forg', function() {

    $(".forg").addClass("active");
    $(".log").removeClass("active");
    $(".reg").removeClass("active");
    $("#forget").tab('show');
    $("#forget").show();
    $("#signup").hide();
    $("#signIn").hide();
});


$(document).on('click', '.reg', function() {
    $("#signup").show();
    $("#signIn").hide();
    $("#forget").hide();
});



$(document).on('click', '.log', function() {
    $("#signIn").show();
    $("#signup").hide();
    $("#forget").hide();
});



// form history 
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}