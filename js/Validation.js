
$(function () {
    ///--- Start--validation---
    // Preloader
    //$(window).on('load', function () {
    //    $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
    //    $('#preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
    //    $('body').delay(333);
    //});

    $(document).on('keyup', '.vdint', function () {

        //This will take only the digits 0-9. ^ sign within the square brackets means the string
        //will contain those characters mentioned like we have done it & mentioning the sign outside the
        //square brackets will not allow the mentioned characters to be in the string.
        //Like ^[0-9] so this will not allow the digits in the string.

        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $(document).on('keyup', '.vddouble', function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $(document).on('blur', '.onlyonedot', function () {
        var floatValue = parseFloat(this.value);
        if (!isNaN(floatValue)) { // make sure that entry is a number
            this.value = floatValue.toFixed(2);
        }
    });

    $(document).on('change', '.vdgstin', function () {

        var pattern = new RegExp("^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$");

        if (pattern.test($(this).val()) || ($(this).val().toLowerCase() == 'urp')) {
            return true;
        }
        else {
            $(this).val('');
            $(this).focus();
            return false;
        }

    });

    $(document).on('keyup', 'toupper', function () {

        this.value = this.value.toUpperCase();
    });

    $(document).on('change', '.vddist', function () {

        if ($(this).val() > 0) {
            return true;
        }
        else {
            $(this).val('');
            $(this).focus();
            alert('distance must be greater than 0');
        }
    });

    $(document).on('change', '.err', function () {
        $(this).removeClass('err');
    });

});

var validation = {};
validation.Validate = function (ctrl) {
    var isValid = true;
    //validate input and select field

    ctrl.find('input[type="text"],textarea').each(function () {
        $(this).val($.trim($(this).val()));
    });
    ctrl.find('input,select,textarea').each(function () {
        if (isValid) {
            if ($(this).is('.req')) {
                if (this.nodeName.toLowerCase() == 'input') {
                    if ($(this).attr('type') == 'text') {
                        if ($.trim($(this).val()) == '') {
                            alert('Please enter ' + $(this).attr('title'));
                            $(this).focus();
                            $(this).addClass('err');
                            isValid = false;
                            return;
                        }
                    }
                }
                if (this.nodeName.toLowerCase() == 'textarea') {
                    if ($.trim($(this).val()) == '') {
                        alert('Please enter ' + $(this).attr('title'));
                        $(this).focus();
                        isValid = false;
                        return;
                    }
                }
                if (this.nodeName.toLowerCase() == 'select') {
                    if ($(this).find('option:selected') == undefined || $(this).find('option:selected').val() == "") {
                        if ($(this).hasClass("itmUnit") == false) {
                            alert('Please select ' + $(this).attr('title'));
                            $(this).focus();
                            $(this).addClass('err');
                            isValid = false;
                            return;
                        }
                    }
                }
            }
            if ($(this).is('.email')) {
                if ($(this).val() != '') {
                    if (validation.isValidEmailAddress($(this).val()) == false) {
                        alert('Please enter a valid email');
                        $(this).focus();
                        $(this).addClass('err');
                        isValid = false;
                        return;
                    }
                }
            }
            if ($(this).is('.panNo')) {
                if ($(this).val() != '') {
                    if (validation.isValidPanNo($(this).val()) == false) {
                        alert('Please enter a valid pan number.');
                        $(this).addClass('err');
                        $(this).focus();
                        isValid = false;
                        return;
                    }
                }
            }
            /*
            if ($(this).is('.vdgstin')) {
                if ($(this).val() != '') {
                    if (validation.isValidGSTIN($(this).val()) == false) {
                        alert($(this).attr('title') + ' is invalid');
                        $(this).focus();
                        $(this).addClass('err');
                        isValid = false;
                        return;
                    }
                }
            }
          */

        }
    });

    //validate address field
    ctrl.find('td,th,div').each(function () {
        var addrCtrl = $(this);
        if (isValid) {
            if ($(this).is('.req')) {
                $(this).find('.address').each(function () {
                    if (isValid) {
                        var region = $(this).find('.ddlRegion option:selected').val();
                        var country = $(this).find('.ddlCountry option:selected').val();
                        var city = $(this).find('.ddlCity option:selected').val();

                        if ($.trim($(this).find('.txtAddress').val()) == '') {
                            alert('Please enter Address on ' + addrCtrl.attr('title'));
                            $(this).find('.txtAddress').focus();
                            isValid = false;
                            return;
                        }

                        if (region == undefined || region == "0") {
                            alert('Please Select Region on ' + addrCtrl.attr('title'));
                            $(this).find('.ddlRegion').focus();
                            isValid = false;
                            return;
                        }

                        if (country == undefined || country == "0") {
                            alert('Please Select Country on ' + addrCtrl.attr('title'));
                            $(this).find('.ddlCountry').focus();
                            isValid = false;
                            return;
                        }

                        if (city == undefined || city == "0") {
                            alert('Please Select City on ' + addrCtrl.attr('title'));
                            $(this).find('.ddlCity').focus();
                            isValid = false;
                            return;
                        }
                    }
                });
            }
        }
    });

    ctrl.find('input[type="text"],textarea').each(function () {
        $(this).val($(this).val().replace(/\'/g, "’"));
    })
    return isValid;
}

validation.Validate1 = function (ctrl) {
    var isValid = true;
    //validate input and select field

    ctrl.find('input[type="text"],textarea').each(function () {
        $(this).val($.trim($(this).val()));
    });
    ctrl.find('input,select,textarea').each(function () {
        if (isValid) {
            if ($(this).is('.req')) {
                if (this.nodeName.toLowerCase() == 'input') {
                    if ($(this).attr('type') == 'text') {
                        if ($.trim($(this).val()) == '') {
                            //alert('Please enter ' + $(this).attr('title'));
                            $(this).focus();
                            $(this).addClass('err');
                            isValid = false;
                            return;
                        }
                    }
                }
                if (this.nodeName.toLowerCase() == 'textarea') {
                    if ($.trim($(this).val()) == '') {
                        //alert('Please enter ' + $(this).attr('title'));
                        $(this).focus();
                        isValid = false;
                        return;
                    }
                }
                if (this.nodeName.toLowerCase() == 'select') {
                    if ($(this).find('option:selected') == undefined || $(this).find('option:selected').val() == "") {
                        if ($(this).hasClass("itmUnit") == false) {
                            //alert('Please select ' + $(this).attr('title'));
                            $(this).focus();
                            $(this).addClass('err');
                            isValid = false;
                            return;
                        }
                    }
                }
            }
            if ($(this).is('.email')) {
                if ($(this).val() != '') {
                    if (validation.isValidEmailAddress($(this).val()) == false) {
                        //alert('Please enter a valid email');
                        $(this).focus();
                        $(this).addClass('err');
                        isValid = false;
                        return;
                    }
                }
            }
            if ($(this).is('.panNo')) {
                if ($(this).val() != '') {
                    if (validation.isValidPanNo($(this).val()) == false) {
                        //alert('Please enter a valid pan number.');
                        $(this).addClass('err');
                        $(this).focus();
                        isValid = false;
                        return;
                    }
                }
            }
            /*
            if ($(this).is('.vdgstin')) {
                if ($(this).val() != '') {
                    if (validation.isValidGSTIN($(this).val()) == false) {
                        alert($(this).attr('title') + ' is invalid');
                        $(this).focus();
                        $(this).addClass('err');
                        isValid = false;
                        return;
                    }
                }
            }
          */

        }
    });

    //validate address field
    ctrl.find('td,th,div').each(function () {
        var addrCtrl = $(this);
        if (isValid) {
            if ($(this).is('.req')) {
                $(this).find('.address').each(function () {
                    if (isValid) {
                        var region = $(this).find('.ddlRegion option:selected').val();
                        var country = $(this).find('.ddlCountry option:selected').val();
                        var city = $(this).find('.ddlCity option:selected').val();

                        if ($.trim($(this).find('.txtAddress').val()) == '') {
                            alert('Please enter Address on ' + addrCtrl.attr('title'));
                            $(this).find('.txtAddress').focus();
                            isValid = false;
                            return;
                        }

                        if (region == undefined || region == "0") {
                            alert('Please Select Region on ' + addrCtrl.attr('title'));
                            $(this).find('.ddlRegion').focus();
                            isValid = false;
                            return;
                        }

                        if (country == undefined || country == "0") {
                            alert('Please Select Country on ' + addrCtrl.attr('title'));
                            $(this).find('.ddlCountry').focus();
                            isValid = false;
                            return;
                        }

                        if (city == undefined || city == "0") {
                            alert('Please Select City on ' + addrCtrl.attr('title'));
                            $(this).find('.ddlCity').focus();
                            isValid = false;
                            return;
                        }
                    }
                });
            }
        }
    });

    ctrl.find('input[type="text"],textarea').each(function () {
        $(this).val($(this).val().replace(/\'/g, "’"));
    })
    return isValid;
}

validation.isValidPanNo = function (PanNo) {
    var pattern = new RegExp('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$');
    if (pattern.test(PanNo)) {
        return true;
    }
    else {
        return false;
    }
}
validation.isValidEmailAddress = function (emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);

}

validation.isValidMobile = function (MobileNumber) {
    var regex = /^[6-9]\d{9}$/;
    if (regex.test(MobileNumber) && MobileNumber.length == 10) {
        return true;
    }
    else {
        return false;
    }
}


validation.isValidVehicleNumber = function (VehicleNo) {
    var pattern = new RegExp('^[A-Z|a-z]{2}\s?[0-9]{1,2}\s?[A-Z|a-z]{0,3}\s?[0-9]{4}$');
    if (pattern.test(VehicleNo)) {
        return true;
    }
    else {
        return false;
    }
}

validation.LoadFormValues = function (ctrl) {
    ctrl.find('select').each(function () {
        if ($(this).attr('tag') != undefined) {
            $(this).val($(this).attr('tag'));
        }
    });

    ctrl.find('input[type="checkbox"]').each(function () {
        if ($(this).attr('tag') != undefined) {
            if ($(this).attr('tag') == 'True' || $(this).attr('tag') == 'true') {
                $(this).attr('checked', 'checked');
            }
        }
    });

    ctrl.find('.date').each(function () {

        if (this.nodeName.toLowerCase() == 'input') {
            if ($(this).val().indexOf('01-Jan-0001') > -1) {
                $(this).val('');
            }
            $(this).attr('readonly', 'true');
            $(this).datepicker({
                dateFormat: 'dd-M-yy',
                changeMonth: true,
                changeYear: true,
                open: function () {
                    diag.find('input[type="text"]').blur();
                }
            });
        }
        else {
            if ($(this).text().indexOf('01-Jan-0001') > -1) {
                $(this).text('');
            }
        }
    });
    ctrl.find(".btnSave").button({
        icons: {
            primary: "ui-icon-disk"
        }
    });

    ctrl.find('textarea[maxlength]').bind("keyup change", function () {
        //get the limit from maxlength attribute 
        var limit = parseInt($(this).attr('maxlength'));
        //get the current text inside the textarea  
        var text = $(this).val();
        //count the number of characters in the text  
        var chars = text.length;
        $(this).parent().find('.textlimit').html((limit - chars) + ' of ' + limit + ' left.');
        //check if there are more characters then allowed  
        if (chars > limit) {
            //and if there are use substr to get the text before the limit  
            var new_text = text.substr(0, limit);

            //and change the current text with the new text  
            $(this).val(new_text);


        }
    });
}

validation.isValidGSTIN = function (gstin) {
    var pattern = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
    if (pattern.test(gstin) || ($(this).val().toLowerCase() == 'urp')) {
        return true;
    }
    else {
        return false;
    }
}
validation.AutoComplete = function (ctrl, autocompleteUrl) {
    $('.itmUnit').autocomplete({
        source: function (request, response) {

            $.ajax({
                url: autocompleteUrl,
                type: 'GET',
                cache: false,
                dataType: 'json',
                success: function (json) {
                    response($.map(json, function (data, id) {
                        return {
                            label: data.value,
                            value: data.id
                        };
                    }));
                },
                error: function (jqXhr, textStatus) {
                    console.log(textStatus + " : " + jqXhr.responseJSON.MessageDetail);
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {
            $(this).val(ui.item.value);
            return false;
        }
    });
}


validation.Load = function (ctrl) {

    ctrl.find('.savebutton').button({
        icons: {
            primary: "ui-icon-disk"
        }
    });

    ctrl.find('.copyButton').button({
        icons: {
            primary: "ui-icon-disk"
        }
    });

    ctrl.find('.editbutton').button({
        icons: {
            primary: "ui-icon-pencil"
        }
    });
    ctrl.find('.delbutton').button({
        icons: {
            primary: "ui-icon-trash"
        }
    });
    ctrl.find('.prevbutton').button({
        icons: {
            primary: "ui-icon-circle-arrow-w"
        }
    });
    ctrl.find('.nextbutton').button({
        icons: {
            primary: "ui-icon-circle-arrow-e"
        }
    });
    ctrl.find('.addbutton').button({
        icons: {
            primary: "ui-icon-circle-plus"
        }
    });
    ctrl.find('.req').each(function () {
        if ($(this).attr('title') == undefined) {
            $(this).attr('title', $.trim($(this).closest('td').prev().text()));
        }
    });

    ctrl.find('.date').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy'
    });

    ctrl.find('textarea[maxlength]').bind("keyup change", function () {
        //get the limit from maxlength attribute 
        var limit = parseInt($(this).attr('maxlength'));
        //get the current text inside the textarea  
        var text = $(this).val();
        //count the number of characters in the text  
        var chars = text.length;
        $(this).parent().find('.textlimit').html((limit - chars) + ' of ' + limit + ' left.');
        //check if there are more characters then allowed  
        if (chars > limit) {
            //and if there are use substr to get the text before the limit  
            var new_text = text.substr(0, limit);

            //and change the current text with the new text  
            $(this).val(new_text);
        }
    });
    validation.loadDrop(ctrl);
}
validation.loadDrop = function (ctrl) {
    //This is used to just bind a dropdown list or to bind a dropdown list with the selected value when values are from database
    ctrl.find('.dtoList').each(function () {

        if ($(this).attr('field') == 'GSTIN') {
            validation.LoadDropdown($(this), 'proc_gettaxpayergstin');
        }

    });
}
validation.LoadDropdown = function (ddl, proc, selectedOptionValue) {
    //alert(ddl.val());
    //alert(proc);
    //alert(selectedOptionValue);

    if (ddl.val() == 0 || ddl.val() == undefined || ddl.val() == null) {
        var listId = ddl.attr('tag');
        if (listId == undefined) {
            listId = 0;
        }
        var param = ddl.attr('param');
        var sdata;
        var url = document.getElementsByName("hdnurl")[0].value + "api/Binding/GetStringList";
        sdata = "{";
        sdata += "procName:'" + proc + "',";
        sdata += "listId:'" + listId + "'";
        sdata += ",param:'" + param + "'";
        sdata += "}"

        $.ajax({
            url: url,
            type: "POST",
            dataType: 'json',
            cache: false,
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: sdata,
            success: function (result) {
                ddl.html(result);
            }
        });
    }
}

validation.LoadFormValues = function (ctrl) {

    //This is used to select the specified value in tag attribute of a dropdown. 
    ctrl.find('select').each(function () {
        if ($(this).attr('tag') != undefined) {
            $(this).val($(this).attr('tag'));
        }
    });

    ctrl.find('input[type="checkbox"]').each(function () {
        if ($(this).attr('tag') != undefined) {
            if ($(this).attr('tag') == 'True' || $(this).attr('tag') == 'true') {
                $(this).attr('checked', 'checked');
            }
        }
    });

    ctrl.find('.date').each(function () {

        if (this.nodeName.toLowerCase() == 'input') {
            if ($(this).val().indexOf('01-Jan-0001') > -1) {
                $(this).val('');
            }
            $(this).attr('readonly', 'true');
            $(this).datepicker({
                dateFormat: 'dd-M-yy',
                changeMonth: true,
                changeYear: true,
                open: function () {
                    diag.find('input[type="text"]').blur();
                }
            });
        }
        else {
            if ($(this).text().indexOf('01-Jan-0001') > -1) {
                $(this).text('');
            }
        }
    });
    ctrl.find('.time').each(function () {

        if (this.nodeName.toLowerCase() == 'input') {

            $(this).attr('readonly', 'true');
            $(this).timepicker({});
            if ($(this).val() == '' || $(this).val() == undefined) {
                $(this).val('00:00');
            }
        }
        else {
            if ($(this).text().indexOf('01-Jan-0001') > -1) {
                $(this).text('00:00');
            }
        }
    });
}

validation.DisableEditForm = function (form) {
    form.find('select,.btnState,.btnCity,input[type="checkbox"],input[type="radio"]').attr('disabled', 'disabled');
    form.find('input[type="text"],textarea').attr('readonly', 'readonly');
    form.find('.deleteItem').hide();

    form.find('#map_canvas').prepend('<div class="outer-editor-layer"><div class="inner-editor-layer"></div></div>');
    form.find('#map_canvas .inner-editor-layer').height(form.find('#map_canvas').height());
    form.find('#map_canvas .inner-editor-layer').width(form.find('#map_canvas').width());

    form.find('.cleditorMain').prepend('<div class="outer-editor-layer"><div class="inner-editor-layer"></div></div>');
    form.find('.cleditorMain .inner-editor-layer').height(form.find('.cleditorMain').height());
    form.find('.cleditorMain .inner-editor-layer').width(form.find('.cleditorMain').width());
}

validation.EnableEditForm = function (form) {
    form.find('select,.btnState,.btnCity,input[type="checkbox"],input[type="radio"]').removeAttr('disabled');
    form.find('input[type="text"],textarea').removeAttr('readonly');
    form.find('.deleteItem').show();
    form.find('.cleditorMain').find('.outer-editor-layer').remove();
    form.find('#map_canvas').find('.outer-editor-layer').remove();
}

validation.alert = function (el, message) {
    el.parent().prepend($('<div class="validation-alert-msg"><div class="icon"></div><div class="message ui-state-error"><span class="ui-icon ui-icon-alert" style="float:left;margin-right:5px"></span> ' + message + '</div></div>'));
    el.css('background-color', '#FFF8CC');
}

validation.checkcount = function (Panel) {
    Panel.find('textarea[maxlength]').each(function () {
        var limit = parseInt($(this).attr('maxlength'));
        var text = $(this).val();
        var chars = text.length;
        $(this).parent().append('<span class="textlimit">' + (limit - chars) + ' of ' + limit + ' left.</span>');
    });
}

validation.CheckAnyChange = function (form) {
    form.find('input,select,textarea').each(function () {
        if (this.nodeName.toLowerCase() == 'input' || this.nodeName.toLowerCase() == 'select') {
            $(this).change(function () {
                $(this).closest('.checkAnyChange').attr('changed', 'true');
            });
        }
        if (this.nodeName.toLowerCase() == 'textarea') {
            $(this).bind("keyup change", function () {
                $(this).closest('.checkAnyChange').attr('changed', 'true');
            });
        }
    });
}

validation.CheckExistingData = function (ctrl, xml, proc) {
    var isValid = true;
    $.ajax({
        url: 'api/Binding/CheckExistingData',
        type: "POST",
        dataType: 'json',
        async: false,
        cache: false,
        global: false,
        contentType: 'application/json; charset=utf-8',
        data: "{xml:'" + xml + "', proc: '" + proc + "'}",
        success: function (result) {
            if (result.d == 'yes') {
                validation.alert(ctrl, ctrl.attr('title') + ' Already Exists');
                ctrl.focus();
                isValid = false;
                return;
            }
        },
        error: function (result) {
            message.error('Server Error.');
        }
    });
    return isValid;
}



//To validate a strong password you can use following regular expression that allows:
// Must be at least 8 characters
//At least 1 number, 1 lowercase, 1 uppercase letter
//At least 1 special character from @#$%&
validation.Password = function (password) {
    var pattern = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
    if (pattern.test(password)) {
        return true;
    } else {
        return false;
    }
}