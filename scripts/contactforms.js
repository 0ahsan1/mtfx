
var IpApiUrl ="https://ipapi.co/json/?key=O1I7K1HbehPl4rtQC9DCILaCQuMvJPgqVvNQq6fA27DQrD98ZK";
var GoogleClientKey = "6Le-GYYaAAAAAEGbuvD0CMFwsWbOYfIHuEd3O4hl";

function SubmitConnectUSForm() {

    $.getJSON(IpApiUrl, function(data) {

        $('#ConnectUSCountryName').val(data == null ? "" : data.country_name);
        $('#ConnectUSRegion').val(data == null ? "" : data.region);

    }).then(function() {

        grecaptcha.ready(function() {
            grecaptcha.execute(GoogleClientKey, {
                action: 'SubmitData'
            }).then(function(token) {
                $("#RecaptchaKey").val(token);
                $("#connectform").submit();
            });
        });
    })
}


function SubmitNewsletterForm() {


      $('#newsletterformtools-result').html('');
      if(!$('#want1').is(':checked') && !$('#want2').is(':checked') && !$('#want3').is(':checked')){
     
      $('#newsletterformtools-result').html(`<div class="alert alert-danger text-center" role="alert">
            <p>Please select a Newsletter Type.`);
    
     return false;
     }


    $.getJSON(IpApiUrl, function(data) {

        $('#NewsLtrCountryName').val(data == null ? "" : data.country_name);
        $('#NewsLtrRegion').val(data == null ? "" : data.region);

    }).then(function() {

        grecaptcha.ready(function() {
            grecaptcha.execute(GoogleClientKey, {
                action: 'SubmitData'
            }).then(function(token) {
                $(".NewsletterFormRecaptchaKey").val(token);
                $("#newsletterformtools").submit();
            });
        });


    })
}


function SubmitNewsletterFormTool() {

   $('#newsletterformtools-result').html('');
   if(!$('#want1').is(':checked') && !$('#want2').is(':checked') && !$('#want3').is(':checked')){
    
     $('#newsletterformtools-result').html(`<div class="alert alert-danger text-center" role="alert">
            <p>Please select a Newsletter Type.`);
    
     return false;
   }

    $.getJSON(IpApiUrl, function(data) {

        $('#newsLtrAlertsCountryName').val(data == null ? "" : data.country_name);
        $('#newsLtrAlertsRegion').val(data == null ? "" : data.region);

    }).then(function() {

        grecaptcha.ready(function() {
            grecaptcha.execute(GoogleClientKey, {
                action: 'SubmitData'
            }).then(function(token) {
                $(".SubmitNewsletterFormRecaptchaKey").val(token);
                $("#newsletterformtools").submit();
            });
        });

    })
}


function SubmitAlertsForm() {

    $.getJSON(IpApiUrl, function(data) {

        $('#RateAlertsCountryName').val(data == null ? "" : data.country_name);
        $('#RateAlertsRegion').val(data == null ? "" : data.region);

    }).then(function() {
        grecaptcha.ready(function() {
            grecaptcha.execute(GoogleClientKey, {
                action: 'SubmitData'
            }).then(function(token) {
                $("#RecaptchaKey").val(token);
                $("#alert-form").submit();
            });
        });

    })
}


function SubmitAlertsFormTool() {
    
      $('#newsletterformtools-result').html('');
      if($('#BuyCurr').val()  == $('#SellCurr').val()){
        
        $('#newsletterformtools-result').html(`<div class="alert alert-danger text-center" role="alert">
            <p>Please select different From or To currency.`);
    
     return false;
   
       }

    $.getJSON(IpApiUrl, function(data) {

        $('#alertRateCountryName').val(data == null ? "" : data.country_name);
        $('#alertRateRegion').val(data == null ? "" : data.region);

    }).then(function() {

        grecaptcha.ready(function() {
            grecaptcha.execute(GoogleClientKey, {
                action: 'SubmitData'
            }).then(function(token) {
                $(".alertRateFormRecaptchaKey").val(token);
                $("#alertformtools").submit();
            });
        });

    })
}