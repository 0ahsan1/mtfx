app.controller("BusinessController", function ($scope, baseSvc, $http, $location, $q, toaster) {
    console.log("in business controller");
    $scope.BackBtn = false;
    $scope.IsMailsent = 0;
    $scope.isedit = false;
    $scope.Banks = [];
    $scope.AnalysisTypeError = false;
    var currentdate = new Date();
    $scope.maxDateMoment = moment().add(0, 'day');
    $scope.CurrentYear = currentdate.getFullYear();
    $scope.phonenumberlength = 10;
    $scope.emailFormat = "^[a-zA-Z0-9.#$%&,'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    var MobileInput = [];
    $scope.Countries = [];
    $scope.FinalBeneficiaryPercentage = 100;
    $scope.BeneficiaryPercentageFinished = false;
    $scope.IdTypeNumberFormate = /^[a-zA-Z0-9 ]+$/;
    $scope.validsignature = false;
    $scope.maxDateMoment = moment().add(0, 'day');
    $scope.IsArticalFile = false;
    $scope.AuthorisedIDfile = false;
    $scope.showloader = function () {
        $('.overlay').show();
    }
    $scope.hideloader = function () {
        $('.overlay').hide();
    }
    $scope.OccupationList = [
        {Text: 'Legislative and senior management occupations', Value: 'Legislative and senior management occupations' },
        {Text: 'Business, finance and administration occupations', Value: 'Business, finance and administration occupations' },
        {Text: 'Natural and applied sciences and related occupations', Value: 'Natural and applied sciences and related occupations' },
        {Text: 'Health occupations', Value: 'Health occupations' },
        {Text: 'Occupations in education, law and social, community and government services', Value: 'Occupations in education, law and social, community and government services' },
        {Text: 'Occupations in art, culture, recreation and sport', Value: 'Occupations in art, culture, recreation and sport' },
        {Text: 'Sales and service occupations', Value: 'Sales and service occupations' },
        {Text: 'Trades, transport and equipment operators and related occupations', Value: 'Trades, transport and equipment operators and related occupations' },
        {Text: 'Natural resources, agriculture and related production occupations', Value: 'Natural resources, agriculture and related production occupations' },
        {Text: 'Occupations in manufacturing and utilities', Value: 'Occupations in manufacturing and utilities' },
        {Text: 'Retired', Value: 'Retired' },
        {Text: 'Unemployed', Value: 'Unemployed' },
        ];
    //$scope.OccupationList = [
    //    { Text: 'Attorney', Value: 'Attorney' },
    //    { Text: 'Business Owner', Value: 'Business Owner' },
    //    { Text: 'Customer Service', Value: 'Customer Service' },
    //    { Text: 'Education', Value: 'Education' },
   //     { Text: 'Engineer', Value: 'Engineer' },
   //     { Text: 'Financial Services', Value: 'Financial Services' },
   //     { Text: 'Government Official', Value: 'Government Official' },
   //     { Text: 'Homemaker', Value: 'Homemaker' },
   //     { Text: 'Hospitality', Value: 'Hospitality' },
   //     { Text: 'Medical or Health', Value: 'Medical or Health' },
   //     { Text: 'Military', Value: 'Military' },
   //     { Text: 'Public Services', Value: 'Public Services' },
   //     { Text: 'Real Estate', Value: 'Real Estate' },
   //     { Text: 'Retired', Value: 'Retired' },
   //     { Text: 'Sales or Marketing', Value: 'Sales or Marketing' },
   //     { Text: 'Student', Value: 'Student' },
   //     { Text: 'Technology', Value: 'Technology' },
   //     { Text: 'Unemployed', Value: 'Unemployed' },
   //     { Text: 'Volunteer Worker', Value: 'Volunteer Worker' },
   // ];
    $scope.Person = {
        id: 1,
        Title: '',
        FirstName: '',
        LastName: '',
        MiddleName: '',
        MobileCountryCode: '',
        MobileNumber: '',
        IsValideMobile: false,
        Dob: '',
        DobDay: '',
        DobMonth: '',
        DobYear: '',
        Nationality: '',
        Occupation: '',
        Country: '',
        PostalCode: '',
        AddressLine1: null,
        City: '',
        StateProv: '',
        SSN: '',
        IdType: '',
        IdTypeNumber: '',
        ExpirationDate: '',
        IdActualFileName: '',
        IdRenamedFileName: '',
        PoaType: '',
        PoaActualFileName: '',
        PoaRenamedFileName: '',
        FileUploadPathID: '',
        FileUploadPathPOA: '',
        IsIdFile: false,
        IsPOAFile: false,
        IsAdded: true,
        AnotherPerson: 'No',
        NocOccupation: '',
        EmployersName:'',
    };
    $scope.BusinessAccount = {
        Id: '', AccountType: 'Business', ApplicationCountry: 'ca', Email: '', Password: '',
        CompanyType: '', CompanyName: '', NatureOfBusiness: '', CorporateIdType: '',
        CorporateIDNumber: '',
        Country: '',
        PostalCode: '',
        AddressLine1: null,
        City: '',
        StateProv: '',
        CountryOptional: '',
        Title: '',
        FirstName: '',
        LastName: '',
        MiddleName: '',
        MobileCountryCode: '',
        MobileNumber: '',
        IsValideMobile: false,
        CommunicationPreference: '',
        Inform: 'daily',
        ArticleOfIncorporationFile: '',
        ArticleOfIncorpRenamedFile: '',
        PurposeofBusinessRel: '',
        NatureofBusinessRel: '',
        Reference: '',
        SrOfficerFname: '',
        SrOfficerLname: '',
        Agree: '',
        IsRepresentative: false,
        IsArticalFile: false,
        FileUploadPathArtical: '',
        Currency: []
    };
    $scope.BusinessAccount.Currency = [{ CurrencyId: '', buying: '', selling: '', AmountRange: '', amount: '', C_when: '', frequency: '' }];
    $scope.BusinessAccount.Email = "";
    $scope.Country = [
        { Text: 'Canada', Value: 'ca' },
        { Text: 'United States', Value: 'us' }
    ];

    $scope.BusinessAccount.Person = [
        {
            Title: '',
            FirstName: '',
            LastName: '',
            MiddleName: '',
            MobileCountryCode: '',
            MobileNumber: '',
            IsValideMobile: false,
            Dob: '',
            DobDay: '',
            DobMonth: '',
            DobYear: '',
            Nationality: '',
            Occupation: '',
            Country: '',
            PostalCode: '',
            AddressLine1: null,
            City: '',
            StateProv: '',
            SSN: '',
            IdType: '',
            IdTypeNumber: '',
            ExpirationDate: '',
            IdActualFileName: '',
            IdRenamedFileName: '',
            PoaType: '',
            PoaActualFileName: '',
            PoaRenamedFileName: '',
            FileUploadPathID: '',
            FileUploadPathPOA: '',
            IsIdFile: false,
            IsPOAFile: false,
            IsAdded: true,
            AnotherPerson: 'No',
            NocOccupation: '',
            EmployersName:'',
        }
    ];
    $scope.GotoDetailTab = function () {
        if ($scope.BusinessFrm1.$invalid) {
            if ($scope.BusinessFrm1.businessemail.$viewValue != "") {
                $scope.BusinessFrm1.businessemail.$error.pattern = true;
                $scope.BusinessFrm1.businessemail.$touched = true;
                return;
            }
            else {
                $scope.BusinessFrm1.businessemail.$touched = true;
                return;
            }
        }

        if ($scope.BusinessAccount.Person.length > 1) {
            $scope.BusinessAccount.Person[1].Country = $scope.BusinessAccount.ApplicationCountry.toUpperCase();
        }
        $scope.PhoneInput(0);
        var countryname = '';
        if ($scope.BusinessAccount.Person[0].Country == 'CA') {
            countryname = "CA";
            $scope.autocompleteOptions = {
                componentRestrictions: { country: ['ca'] },
                types: ['geocode']
            };
        }
        else {
            countryname = "US";
            $scope.autocompleteOptions = {
                componentRestrictions: { country: ['us'] },
                types: ['geocode']
            };
        }
        $scope.ManagePhonenumer();
        $scope.acSelectedCountry = countryname;
        $scope.AddupdateBusiness(false, "Second").then(function () {
            $scope.sendRegistrationEmailData().then(function () {
                $scope.ManageTab("Second");
            });

        });
    };
    $scope.ManageTab = function (tabname) {
        $scope.InitText();
        if (tabname === 'Second') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').removeClass('active');
            $('#LiFourth').removeClass('active');
            $('#LiFifth').removeClass('active');
            $("#dvFirst").css("display", "none");
            $("#dvThird").css("display", "none");
            $("#dvFourth").css("display", "none");
            $("#dvFifth").css("display", "none");
            $("#dvSecond").css("display", "block");
        }
        else if (tabname === 'Third') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').addClass('active');
            $('#LiFourth').removeClass('active');
            $('#LiFifth').removeClass('active');
            $("#dvFirst").css("display", "none");
            $("#dvSecond").css("display", "none");
            $("#dvFourth").css("display", "none");
            $("#dvFifth").css("display", "none");
            $("#dvThird").css("display", "block");
        }
        else if (tabname === 'Fourth') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').addClass('active');
            $('#LiFourth').addClass('active');
            $('#LiFifth').removeClass('active');
            $("#dvFirst").css("display", "none");
            $("#dvSecond").css("display", "none");
            $("#dvThird").css("display", "none");
            $("#dvFifth").css("display", "none");
            $("#dvFourth").css("display", "block");
        }
        else if (tabname === 'Fifth') {
            console.log($scope.BusinessAccount);
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').addClass('active');
            $('#LiFourth').addClass('active');
            $('#LiFifth').addClass('active');
            $("#dvFirst").css("display", "none");
            $("#dvSecond").css("display", "none");
            $("#dvThird").css("display", "none");
            $("#dvFourth").css("display", "none");
            $("#dvFifth").css("display", "block");
        }
        else if (tabname === 'Sixth') {
            /*console.log($scope.BusinessAccount);
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiFourth').addClass('active');
            $('#LiFifth').addClass('');
            $("#dvFirst").css("display", "none");
            $("#dvSecond").css("display", "none");
            $("#dvThird").css("display", "none");
            $("#dvFourth").css("display", "none");
            $("#dvFifth").css("display", "none");
            $("#Thankyou").css("display", "block");*/
            window.location.href = "/Thankyou"
        }
    };
    $scope.ManageTabPrevious = function (tabname) {
        if (tabname === 'First') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').removeClass('active');
            $('#LiThird').removeClass('active');
            $('#LiFourth').removeClass('active');
            $('#LiFifth').removeClass('active');
            $("#dvSecond").css("display", "none");
            $("#dvThird").css("display", "none");
            $("#dvFourth").css("display", "none");
            $("#dvFifth").css("display", "none");
            $("#dvFirst").css("display", "block");
        }
        if (tabname === 'Second') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').removeClass('active');
            $('#LiFourth').removeClass('active');
            $('#LiFifth').removeClass('active');
            $("#dvFirst").css("display", "none");
            $("#dvThird").css("display", "none");
            $("#dvFourth").css("display", "none");
            $("#dvFifth").css("display", "none");
            $("#dvSecond").css("display", "block");
        }
        else if (tabname === 'Third') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').addClass('active');
            $('#LiFourth').removeClass('active');
            $('#LiFifth').removeClass('active');
            $("#dvFirst").css("display", "none");
            $("#dvSecond").css("display", "none");
            $("#dvFourth").css("display", "none");
            $("#dvFifth").css("display", "none");
            $("#dvThird").css("display", "block");
        }
        else if (tabname === 'Fourth') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').addClass('active');
            $('#LiFourth').addClass('active');
            $('#LiFifth').removeClass('active');
            $("#dvFirst").css("display", "none");
            $("#dvSecond").css("display", "none");
            $("#dvThird").css("display", "none");
            $("#dvFifth").css("display", "none");
            $("#dvFourth").css("display", "block");
        }
    };
    $scope.PhoneInput = function (Index) {
        setTimeout(function () {
            if ($scope.BusinessAccount.ApplicationCountry !== "") {
                var PhoneId = "#Phone-" + Index;
                var InputPhone = document.querySelector(PhoneId);
                MobileInput[Index] = window.intlTelInput(InputPhone, { utilsScript: "/scripts/registration/utils.js" });
                MobileInput[Index].setCountry($scope.BusinessAccount.ApplicationCountry);//17-07-2019 Ajay with jinesh - Init country flag issue         
                $scope.isflagSetted = 1;
            }
        }, 100);
    };
    $scope.AddupdateBusiness = function (IsfileUpload, Tabname) {
        //$scope.ManageTab(Tabname);
        //return;
        var deferred = $q.defer();
        var errror = 0;
        if (Tabname === 'Third') {
            angular.forEach($scope.BusinessFrm2.$error.required, function (field) {
                field.$setDirty();
                field.$setTouched();
                errror++;
            });
            if ($('#dvSecond .errorinput').length) {
                errror++;
            }
        }
        if (Tabname === 'Fourth') {
            angular.forEach($scope.BusinessFrm3.$error.required, function (field) {
                field.$setDirty();
                field.$setTouched();
                errror++;
            });
            if ($('#dvThird .errorinput').length) {
                errror++;
            }
        }
        //$scope.ManageTab(Tabname);
        if (errror === 0) {
            $scope.BusinessAccount.CorporateIdType = "Corporate Number";
            for (var i = 0; i < $scope.BusinessAccount.Person.length; i++) {
                
                $scope.BusinessAccount.Person[i].EmployersName = $scope.BusinessAccount.CompanyName;
            }
            if (IsfileUpload == true) {
                $scope.SubmitFinalStep().then(function () {
                    $scope.SetDob().then(function(response){
                    $scope.BusinessAccount.FileUploadPathArtical = null;
                    var result = $scope.PostAjax("/Umbraco/Api/Home/AddUpdateBusiness",$scope.BusinessAccount);
                    //var result = baseSvc.postRequest("/Umbraco/Api/Home/AddUpdateBusiness", { 'businessAccount': $scope.BusinessAccount });
                    result.then(function (response) {
                        response = JSON.parse(response)
                        $scope.BusinessAccount.FileUploadPathArtical=$("#ArticalIncorp")[0].files[0];
                        deferred.resolve(response);
                        if (response.Status === 200) {
                            $scope.ManageTab(Tabname);
                            $scope.BusinessAccount.Id = response.Data.Id;
                            $scope.BusinessAccount.Guid = response.Data.Guid;
                            if (response.Data.Contact_ID != null && response.Data.Contact_ID != undefined && response.Data.Contact_ID != "") {
                                var i = 0;
                                if (response.Data.Contact_ID.length > 0) {
                                    angular.forEach(response.Data.Contact_ID, function (value, key) {
                                        $scope.BusinessAccount.Person[i].Contact_ID = value;
                                        i = i + 1;
                                    });
                                }
                            }

                        }
                    });
                    });
                })
            } else {
                $scope.SetDob().then(function(response){
                    $scope.BusinessAccount.FileUploadPathArtical = null;
                var result = $scope.PostAjax("/Umbraco/Api/Home/AddUpdateBusiness",$scope.BusinessAccount);
                //var result = baseSvc.postRequest("/Umbraco/Api/Home/AddUpdateBusiness", { 'businessAccount': $scope.BusinessAccount });
                result.then(function (response) {
                    $scope.BusinessAccount.FileUploadPathArtical=$("#ArticalIncorp")[0].files[0];
                    response = JSON.parse(response)
                    deferred.resolve(response);
                    if (response.Status === 200) {
                        $scope.ManageTab(Tabname);
                        $scope.BusinessAccount.Id = response.Data.Id;
                        $scope.BusinessAccount.Guid = response.Data.Guid;
                        if (response.Data.Contact_ID != null && response.Data.Contact_ID != undefined && response.Data.Contact_ID != "") {
                            var i = 0;
                            if (response.Data.Contact_ID.length > 0) {
                                angular.forEach(response.Data.Contact_ID, function (value, key) {
                                    $scope.BusinessAccount.Person[i].Contact_ID = value;
                                    i = i + 1;
                                });
                            }
                        }
                    }
                });
                });
            }
        }
        else {
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: ($('.errorinput').first().offset().top - 150)
                }, 800);
            }, 100);
        }
        return deferred.promise;
    };
    $scope.getUrlVars = function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    };
    $scope.GetBankData = function () {
        $scope.Banks = [];
        var deferred = $q.defer();
        var result = baseSvc.getRequest("/Umbraco/Api/Home/GetBanks").then(function (response) {
            response = JSON.parse(response);
            if (response.Message == "OK") {
                $scope.Banks = response.Data;
            }
            else
                $scope.Banks = [];
            deferred.resolve($scope.Banks);
        }, function (error, result) {
            console.log(error);
            deferred.reject(result);
        });
        return deferred.promise;
    };
    $scope.ManagePhonenumer = function () {
        setTimeout(function () {
            $scope.$apply(function () {
                $('#Phone-0').val($scope.BusinessAccount.Person[0].MobileNumber)
            })
        }, 300);
    }
    $scope.managebaneficiarypercentage = function () {
        var RemainingPercentage = 100;
        for (var i = 0; i < $scope.BusinessAccount.Person.length; i++) {
            if ($scope.BusinessAccount.Person[i].Ownership <= RemainingPercentage) {
                RemainingPercentage = RemainingPercentage - parseFloat($scope.BusinessAccount.Person[i].Ownership);
            }
        }
        $scope.FinalBeneficiaryPercentage = RemainingPercentage;
    };
    $scope.initBinding = function () {
        var guid = $scope.getUrlVars()["id"];
        if (guid != undefined && guid != "") {
            $scope.GetBusinessAccountData(guid).then(function (response) {
                $scope.isedit = true;
                response= JSON.parse(response);
                if (response.Data != null) {
                $scope.BusinessAccount = response.Data;
                $scope.BindSignature(response.Data.BusinessSignature);
                $scope.managebaneficiarypercentage();
                $scope.GetCountryDatafordropdown();
                if (response.Data.ArticleOfIncorporationFile != undefined && response.Data.ArticleOfIncorporationFile != "" && response.Data.ArticleOfIncorporationFile != null) {
                    $("#uploadarticle").addClass("d-none");
                    $scope.BusinessAccount.IsArticalFile = true;
                    $('.image-upload-wrap4').hide();
                    $('.file-upload-image4').hide();
                    $('.file-upload-content4').show();
                    $('.image-title4').html(response.Data.ArticleOfIncorporationFile);
                }
                $scope.ManagePhonenumer();
                }
                $scope.hideloader();
            });
        }
        else {
            $scope.FinalBeneficiaryPercentage = 100;
            $scope.isedit = false;
            $scope.GetCountryDatafordropdown();
            $scope.ManagePhonenumer();
            $scope.hideloader();
        }
        $scope.GetBankData();
    };
    $scope.GetCountryDatafordropdown = function () {
        $scope.Countries = [];
        var deferred = $q.defer();
            var result = baseSvc.getRequest("/Umbraco/Api/Home/GetCountries").then(function (response) {
            response = JSON.parse(response);
            if (response.Message == "OK") {
                for (var i = 0; i < response.Data.length; i++) {
                    $scope.Countries.push({ "Text": response.Data[i].CountryName, "value": response.Data[i].CountryISO });
                }
            }
            else
                $scope.Countries = [];
            deferred.resolve($scope.Countries);
        }, function (error, result) {
            console.log(error);
            deferred.reject(result);
        });
        return deferred.promise;
    };
    $scope.PersonCount = 0;
    $scope.BusinessAccount.AddressLine1 = null;
    $scope.RendarAddress = function (GoogleObj, ContactType, Index) {
        var nostreet = 0;
        var address = "";
        if (ContactType === 'Primary') {
            $scope.BusinessAccount.City = "";
            $scope.BusinessAccount.StateProv = "";
            $scope.BusinessAccount.PostalCode = "";
            if (GoogleObj != undefined) {
                if (GoogleObj.adr_address !== undefined && GoogleObj.adr_address !== null && GoogleObj.adr_address !== "") {
                    var AddressArray = GoogleObj.adr_address.replace('<span>', '').split('</span>');
                    angular.forEach(AddressArray, function (value, key) {
                        var Name = value.substring(value.lastIndexOf('>') + 1);
                        if (value.includes("street-address")) {
                            $scope.BusinessAccount.AddressLine1 = Name;
                            if (address == "") {
                                address += Name
                            }
                            else {
                                address += "," + Name
                            }
                            nostreet = 1;
                        }
                        else if (value.includes("locality")) {
                            $scope.BusinessAccount.City = Name;
                            if (address == "") {
                                address += Name
                            }
                            else {
                                address += "," + Name
                            }
                        }
                        else if (value.includes("region")) {
                            // $scope.BusinessAccount.StateProv = Name;
                            if (Name != "" && Name != null && Name != undefined) {
                                if (address == "") {
                                    address += Name
                                }
                                else {
                                    address += "," + Name
                                }
                                $scope.GetProvinceData(Name, $scope.BusinessAccount.Country).then(function (response) {
                                    if (response.Data) {
                                        $scope.BusinessAccount.StateProv = response.Data.ProvinceFullName;
                                    } else {
                                        $scope.BusinessAccount.StateProv = Name;
                                    }
                                });
                            }
                        }
                        else if (value.includes("postal-code")) {
                            $scope.BusinessAccount.PostalCode = Name;
                            if (address == "") {
                                address += Name
                            }
                            else {
                                address += "," + Name
                            }
                        }
                        else if (value.includes("country-name")) {
                            if (address == "") {
                                address += Name
                            }
                            else {
                                address += "," + Name
                            }
                        }
                    });
                    if (nostreet == 0) {
                        $scope.BusinessAccount.AddressLine1 = address;
                    }
                    $scope.addClasstoInput1(Index);
                }
            }
        }
        else {
            $scope.BusinessAccount.Person[Index].City = "";
            $scope.BusinessAccount.Person[Index].StateProv = "";
            $scope.BusinessAccount.Person[Index].PostalCode = "";
            if (GoogleObj.adr_address !== undefined && GoogleObj.adr_address !== null && GoogleObj.adr_address !== "") {
                var ContactAddressArray = GoogleObj.adr_address.replace('<span>', '').split('</span>');
                angular.forEach(ContactAddressArray, function (value, key) {
                    var Name = value.substring(value.lastIndexOf('>') + 1);
                    if (value.includes("street-address")) {
                        $scope.BusinessAccount.Person[Index].AddressLine1 = Name;
                        if (address == "") {
                            address += Name
                        }
                        else {
                            address += "," + Name
                        }
                        nostreet = 1;
                    }
                    else if (value.includes("locality")) {
                        $scope.BusinessAccount.Person[Index].City = Name;
                        if (address == "") {
                            address += Name
                        }
                        else {
                            address += "," + Name
                        }
                        nostreet = 1;
                    }
                    else if (value.includes("region")) {
                        if (Name != "" && Name != null && Name != undefined) {
                            $scope.GetProvinceData(Name, $scope.BusinessAccount.Person[Index].Country).then(function (response) {
                                if (response.Data) {
                                    $scope.BusinessAccount.Person[Index].StateProv = response.Data.ProvinceFullName;
                                } else {
                                    $scope.BusinessAccount.Person[Index].StateProv = Name;
                                }
                            });
                            if (address == "") {
                                address += Name
                            }
                            else {
                                address += "," + Name
                            }
                            nostreet = 1;
                        }
                    }
                    else if (value.includes("postal-code")) {
                        $scope.BusinessAccount.Person[Index].PostalCode = Name;
                        if (address == "") {
                            address += Name
                        }
                        else {
                            address += "," + Name
                        }
                        nostreet = 1;
                    }
                    else if (value.includes("country-name")) {
                        if (address == "") {
                            address += Name
                        }
                        else {
                            address += "," + Name
                        }
                    }
                });
                if (nostreet == 0) {
                    $scope.BusinessAccount.Person[Index].AddressLine1 = address;
                }
                $scope.addClasstoInput(Index);
            }
        }
    };
    $scope.RendarAddress1 = function (GoogleObj) {
        var nostreet = 0;
        var address = "";
        $scope.BusinessAccount.Person.City = "";
        $scope.BusinessAccount.Person.StateProv = "";
        $scope.BusinessAccount.Person.PostalCode = "";
        if (GoogleObj != undefined) {
            if (GoogleObj.adr_address !== undefined && GoogleObj.adr_address !== null && GoogleObj.adr_address !== "") {
                var AddressArray = GoogleObj.adr_address.replace('<span>', '').split('</span>');
                angular.forEach(AddressArray, function (value, key) {
                    var Name = value.substring(value.lastIndexOf('>') + 1);
                    if (value.includes("street-address")) {
                        $scope.Person.AddressLine1 = Name;
                        if (address == "") {
                            address += Name
                        }
                        else {
                            address += "," + Name
                        }
                        nostreet = 1;
                    }
                    else if (value.includes("locality")) {
                        $scope.Person.City = Name;
                        if (address == "") {
                            address += Name
                        }
                        else {
                            address += "," + Name
                        }
                    }
                    else if (value.includes("region")) {
                        // $scope.BusinessAccount.StateProv = Name;
                        if (Name != "" && Name != null && Name != undefined) {
                            $scope.GetProvinceData(Name, $scope.BusinessAccount.Country).then(function (response) {
                                if (response.Data) {
                                    $scope.Person.StateProv = response.Data.ProvinceFullName;
                                } else {
                                    $scope.Person.StateProv = Name;
                                }
                            });
                            if (address == "") {
                                address += Name
                            }
                            else {
                                address += "," + Name
                            }
                        }
                    }
                    else if (value.includes("postal-code")) {
                        $scope.Person.PostalCode = Name;
                        if (address == "") {
                            address += Name
                        }
                        else {
                            address += "," + Name
                        }
                    }
                    else if (value.includes("country-name")) {
                        if (address == "") {
                            address += Name
                        }
                        else {
                            address += "," + Name
                        }
                    }
                });
                if (nostreet == 0) {
                    $scope.Person.AddressLine1 = address;
                }
            }
        }
    };
    $scope.addClasstoInput1 = function () {
        if (!$("#PostalCodeCompany").hasClass("ffl-floated")) {
            $("#PostalCodeCompany").addClass("ffl-floated");
        }
        if (!$("#StateProvCompany").hasClass("ffl-floated")) {
            $("#StateProvCompany").addClass("ffl-floated");
        }
        if (!$("#TownCityCompany").hasClass("ffl-floated")) {
            $("#TownCityCompany").addClass("ffl-floated");
        }
        if (!$("#AddressCompany").hasClass("ffl-floated")) {
            $("#AddressCompany").addClass("ffl-floated");
        }
    };
    $scope.getcountryaddress = function () {
        countryname = $scope.BusinessAccount.Country;
        $scope.autocompleteOptions = {
            componentRestrictions: { country: [countryname] },
            types: ['geocode']
        };
    };
    $scope.getcountryaddressrep = function (country) {
        $scope.autocompleteOptions = {
            componentRestrictions: { country: [country] },
            types: ['geocode']
        };
    };
    $scope.GetProvinceData = function (ProvinceName, countryname) {
        var deferred = $q.defer();
        if (countryname == "CA" || countryname == "US") {
            baseSvc.getRequest("/Umbraco/Api/Home/GetProvinceMaster?StateProv=" + ProvinceName)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
        }
        else {
            deferred.resolve(false);
        }
        return deferred.promise;
    };
    $scope.SelectFile = function (FileType, Index) {
        Index = 0;
        var idname = null;
        if (FileType === 'IDFile') {
            idname = "#IDFile";
        }
        else if (FileType === 'PoaFile') {
            idname = "#PoaFile";
        }
        else if (FileType === 'ArticalIncorp') {
            idname = "#ArticalIncorp";
        }
        var fileInfo = $(idname)[0].files[0];
        if (fileInfo) {
            if (fileInfo.type === "image/jpeg" || fileInfo.type === "image/png" || fileInfo.type === "application/pdf") {
                var fileSize = fileInfo.size / 1048576;
                if (fileSize < 5) {
                    if (FileType === 'IDFile') {
                        $("#uploadarticle3").addClass("d-none");
                        //setTimeout(function () {
                        //    $scope.$apply(function () {
                        //        $scope.AuthorisedIDfile = false;
                        //    });
                        //}, 100);
                        $scope.Person.IdActualFileName = fileInfo.name;
                        $scope.Person.FileUploadPathID = fileInfo;
                        $scope.Person.IsIdFile = true;
                        $('.image-upload-wrap3').hide();
                        const reader = new FileReader();
                        reader.readAsDataURL($(idname)[0].files[0]);
                        reader.onload = () => {
                            if (fileInfo.type !== "application/pdf") {
                                $('.file-upload-image3').show();
                                $('.file-upload-image3').attr('src', reader.result);
                            }
                            else {
                                $('.file-upload-image3').hide();
                            }
                        };
                        $('.file-upload-content3').show();
                        $('.image-title3').html(fileInfo.name);
                    }
                    else if (FileType === 'PoaFile') {
                        $scope.Person.PoaActualFileName = fileInfo.name;
                        $scope.Person.FileUploadPathPOA = fileInfo;
                        $scope.Person.IsPOAFile = true;
                    }
                    else if (FileType === 'ArticalIncorp') {
                        $("#uploadarticle").addClass("d-none");
                        $scope.BusinessAccount.ArticleOfIncorporationFile = fileInfo.name;
                        //setTimeout(function () {
                        //    $scope.$apply(function () {
                        //        $scope.ArticalIncorp = false;
                        //    });
                        //}, 100);
                        $scope.BusinessAccount.FileUploadPathArtical = fileInfo;
                        $scope.BusinessAccount.IsArticalFile = true;
                        $('.image-upload-wrap4').hide();
                        const reader = new FileReader();
                        reader.readAsDataURL($(idname)[0].files[0]);
                        reader.onload = () => {
                            if (fileInfo.type !== "application/pdf") {
                                $('.file-upload-image4').show();
                                $('.file-upload-image4').attr('src', reader.result);
                            }
                            else {
                                $('.file-upload-image4').hide();
                            }
                        };
                        $('.file-upload-content4').show();
                        $('.image-title4').html(fileInfo.name);
                    }
                }
                else {
                    toaster.pop('warning', "warning", "The file size exceeds the 5 MB limit");
                    alert("The file size exceeds the 5 MB limit");
                }
            }
            else {
                toaster.pop('warning', "warning", "Please ensure a valid document is uploaded.");
                alert("Please ensure a valid document is uploaded.");
            }
        }
        else {
            toaster.pop('warning', "warning", "Please choose file!!");
            alert("Please choose file!!");
        }
    };

    $scope.UdloadFileArtical = function (item) {
        var deferred = $q.defer();
        if (item.FileUploadPathArtical !== undefined && item.FileUploadPathArtical !== null && item.FileUploadPathArtical !== '') {
            baseSvc.uploadFileToServer("/umbraco/api/Home/UploadFileToServer",item.FileUploadPathArtical).then(function (response) {
            //baseSvc.SaveFile('/Home/Upload', item.FileUploadPathArtical).then(function (response) {
                if (response !== null || response !== undefined) {
                    item.ArticleOfIncorpRenamedFile = response;
                }
                deferred.resolve(true);
            }, function (error) {
                deferred.reject(error.result);
            });
        }
        else {
            deferred.resolve(true);
        }
        return deferred.promise;
    };
    $scope.SubmitFinalStep = function () {

        var deferred = $q.defer();
        var promise = $q.all({});
        promise = promise.then(function () {
            return $scope.ParrelUploadCall2($scope.BusinessAccount);
        });
        promise.then(function () {
            deferred.resolve(true);
        });
        return deferred.promise;


    };

    $scope.ParrelUploadCall2 = function (item) {
        var deferred = $q.defer();
        $q.all([$scope.UdloadFileArtical(item)]).then(function (results) {
            deferred.resolve(true);
        });
        return deferred.promise;
    };
    $scope.uploadFile = function (file) {
        var promise = baseSvc.SaveFile('/SignUp/UploadBusiness', file);
        return promise;
    };
    $scope.AuthorizedRepresentativesModal = function (modal) {
        $("#AuthorizedRepresentatives").modal('toggle');
        $scope.BusinessAccount = modal;
        $scope.Person = {};
        $scope.Person.Country = $scope.BusinessAccount.ApplicationCountry.toUpperCase();
        $scope.BusinessFrm4.$setPristine();
        $scope.BusinessFrm4.$setUntouched();
        $scope.removeauth();
        setTimeout(function () {
            $(".overflow-hidden").scrollTop(0);
        }, 200);
        setTimeout(function () {
            $scope.PhoneInputforpop();
        }, 200);
        $scope.managebaneficiarypercentage();
        $scope.BeneficiaryPercentageFinished = false;
    };
    $scope.PhoneInputforpop = function () {
        setTimeout(function () {
            if ($scope.BusinessAccount.ApplicationCountry !== "") {
                var PhoneId = "#PersonPhone";
                var InputPhone = document.querySelector(PhoneId);
                MobileInput[0] = window.intlTelInput(InputPhone, { utilsScript: "/scripts/registration/utils.js" });
                MobileInput[0].setCountry($scope.BusinessAccount.ApplicationCountry);//17-07-2019 Ajay with jinesh - Init country flag issue         
                $scope.isflagSetted = 1;
            }
        }, 100);
    };
    $scope.InitText = function () {
        setTimeout(function () {
            $(".AlphabetsOnly").keypress(function (event) {
                var inputValue = event.which;
                if (!(inputValue >= 65 && inputValue <= 90 || inputValue >= 97 && inputValue <= 122) && (inputValue !== 32 && inputValue !== 0)) {
                    event.preventDefault();
                }
            });
            $('.Alphanumeric').bind('keypress', function (event) {
                var regex = new RegExp("^[a-zA-Z0-9 ]*$");
                var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
                if (!regex.test(key)) {
                    event.preventDefault();
                    return false;
                }
            });
            $('#PersonDob').attr('tabindex', 7);
        }, 1000);
        $scope.BusinessAccount.Country = angular.copy($scope.BusinessAccount.ApplicationCountry.toUpperCase());
        $scope.Person.Country = angular.copy($scope.BusinessAccount.ApplicationCountry.toUpperCase());
        $scope.getcountryaddress();
    };
    $scope.CheckOwnerShip = function (Index, Ownership) {
        if (parseFloat(Ownership) > 100) {
            $scope.Person.Ownership = 100;
        }
        else {
            if (Ownership != undefined && Ownership.replace(/[^.]/g, "").length > 1) {
                var str = Ownership;
                var s = str.split(".", 1).join(" ")
                $scope.Person.Ownership = s;
            } else {
                $scope.Person.Ownership = Ownership;
            }
        }
    };

    //$scope.filterValue = function ($event) {
    //    if ($event.target.value.replace(/[^.]/g, "").length > 1) {
    //        var str = $event.target.value;
    //        var s = str.split(".", 1).join(" ")
    //        $("#percentage").val(s);
    //        return;
    //    } else {
    //        if (isNaN(String.fromCharCode($event.keyCode))) {

    //            if ($event.keyCode != 46) {
    //                $event.preventDefault();
    //            }
    //        }
    //    }
    //};
    $scope.beneficiaryblur = function () {
        if ($('#beneficiarypercent').val() != "") {
            $('#beneficiarypercent').val($('#beneficiarypercent').val().replace(/[^0-9\.]/g, '') + '%');
        }
    }
    $(".percent").on("blur", function (event) {
        //if ($(this).val() != "") {
        //    $(this).val($(this).val().replace(/[^0-9\.]/g, '') + '%');
        //}

        //if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        //    event.preventDefault();
        //}
        ////var totalpercentage = parseInt($(this).val());
        ////$scope.BeneficiaryPercentage =  totalpercentage;
        //if (parseInt($(this).val()) > 100)
        //    $(this).val("100%");
        //if (totalpercentage > $scope.BeneficiaryPercentage) {
        //    $(this).val($scope.BeneficiaryPercentage + "%");
        //    $scope.BeneficiaryPercentage = 0;
        //    $scope.BeneficiaryPercentageFinished = true;
        //}
        //if ($scope.BeneficiaryPercentage > 0) {
        //    $scope.BeneficiaryPercentage = $scope.BeneficiaryPercentage - totalpercentage;
        //}
    });
    $scope.UdloadFileID = function (item) {
        var deferred = $q.defer();
        if (item.FileUploadPathID !== undefined && item.FileUploadPathID !== null && item.FileUploadPathID !== '') {
            baseSvc.uploadFileToServer("/umbraco/api/Home/UploadFileToServer",item.FileUploadPathID).then(function (response) {
            //baseSvc.SaveFile('/Home/Upload', item.FileUploadPathID).then(function (response) {
                if (response !== null || response !== undefined) {
                    item.IdRenamedFileName = response;
                }
                deferred.resolve(true);
            }, function (error) {
                deferred.reject(error.result);
            });
        }
        else {
            deferred.resolve(true);
        }

        return deferred.promise;
    };
    $scope.UdloadFilePOA = function (item) {
        var deferred = $q.defer();
        if (item.FileUploadPathPOA !== null && item.FileUploadPathPOA !== undefined && item.FileUploadPathPOA !== '') {
            baseSvc.uploadFileToServer("/umbraco/api/Home/UploadFileToServer",item.FileUploadPathPOA).then(function (response) {
            //baseSvc.SaveFile('/Home/Upload', item.FileUploadPathPOA).then(function (response) {
                if (response !== null || response !== undefined) {
                    item.PoaRenamedFileName = response;
                }
                deferred.resolve(true);
            }, function (error) {
                deferred.reject(error.result);
            });
        }
        else {
            deferred.resolve(true);
        }
        return deferred.promise;

    };
    $scope.ParrelUploadCall = function (item) {
        var deferred = $q.defer();
        $q.all([$scope.UdloadFileID(item), $scope.UdloadFilePOA(item)]).then(function (results) {
            deferred.resolve(true);
        });
        return deferred.promise;
    };
    $scope.SubmitRepresentative = function () {

        var deferred = $q.defer();
        var promise = $q.all({});
        angular.forEach($scope.BusinessAccount.Person, function (item, key) {
            promise = promise.then(function () {
                return $scope.ParrelUploadCall(item);
            });
        });
        promise.then(function () {
            deferred.resolve(true);
        });
        return deferred.promise;


    };
    $scope.SaveAuthorizedRepresentativesModal = function () {
        var errror = 0;
        //if ($scope.Person.IdActualFileName == "") {
        //    $scope.AuthorisedIDfile = true;
        //    errror++;
        //}
        angular.forEach($scope.BusinessFrm4.$error.required, function (field) {
            field.$setDirty();
            field.$setTouched();
            errror++;
        });
        if (errror === 0) {
            $scope.UdloadPersonIdFile($scope.Person).then(function () {
                var i = 0;
                if ($scope.Person.FirstName != "") {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            if (parseFloat($scope.Person.Ownership) <= parseFloat($scope.FinalBeneficiaryPercentage)) {
                                $scope.BeneficiaryPercentageFinished = false;
                                if ($scope.Person.id != undefined) {
                                    $scope.FinalBeneficiaryPercentage = parseFloat($scope.FinalBeneficiaryPercentage) - parseFloat($scope.Person.Ownership);
                                    $scope.BusinessAccount.Person[$scope.Person.id] = $scope.Person;
                                }
                                else {
                                    $scope.FinalBeneficiaryPercentage = parseFloat($scope.FinalBeneficiaryPercentage) - parseFloat($scope.Person.Ownership);
                                    $scope.Person.id = $scope.BusinessAccount.Person.length;
                                    $scope.BusinessAccount.Person.push($scope.Person);
                                }
                            }
                            else {
                                if ($scope.Person.Ownership != undefined && $scope.Person.Ownership != null && $scope.Person.Ownership != "") {

                                    $scope.BeneficiaryPercentageFinished = true;
                                    setTimeout(function () {
                                        $('.overflow-hidden').animate({
                                            scrollTop: ($('.errorMessage').first().offset().top - 150)
                                        }, 800);
                                    }, 100);
                                    $scope.Person.Ownership = $scope.FinalBeneficiaryPercentage;
                                    if ($scope.Person.id != undefined) {
                                        $scope.BusinessAccount.Person[$scope.Person.id] = $scope.Person;
                                    }
                                    else {
                                        $scope.Person.id = $scope.BusinessAccount.Person.length;
                                        $scope.BusinessAccount.Person.push($scope.Person);
                                    }
                                    return;
                                }
                                else {
                                    if ($scope.Person.id != undefined) {
                                        $scope.BusinessAccount.Person[$scope.Person.id] = $scope.Person;
                                    }
                                    else {
                                        $scope.Person.id = $scope.BusinessAccount.Person.length;
                                        $scope.BusinessAccount.Person.push($scope.Person);
                                    }
                                }
                            }
                            $("#AuthorizedRepresentatives").modal('toggle');
                        });
                    });
                }
            });
        }
        else {
            setTimeout(function () {
                $('.overflow-hidden').animate({
                    scrollTop: ($('.errorinput').first().offset().top - 150)
                }, 800);
            }, 100);
            return;
        }

    };
    $scope.UdloadPersonIdFile = function (item) {
        var deferred = $q.defer();
        //$scope.Person.IdActualFileName = fileInfo.name;
        //$scope.Person.FileUploadPathID = fileInfo;
        //$scope.Person.IsIdFile = true;
        if (item.FileUploadPathID !== undefined && item.FileUploadPathID !== null && item.FileUploadPathID !== '' && (item.IdRenamedFileName == "" || item.IdRenamedFileName == undefined)) {
            baseSvc.uploadFileToServer("/umbraco/api/Home/UploadFileToServer",item.FileUploadPathID).then(function (response) {
                if (response !== null || response !== undefined) {
                    item.IdRenamedFileName = response;
                }
                deferred.resolve(true);
            }, function (error) {
                deferred.reject(error.result);
            });
        }
        else {
            deferred.resolve(true);
        }
        return deferred.promise;
    };
    $scope.DeleteAuthorizedRepresentatives = function (id) {
        if (confirm("Do you want to delete this authorized representative?")) {
            $scope.FinalBeneficiaryPercentage = parseFloat($scope.FinalBeneficiaryPercentage) + parseFloat($scope.BusinessAccount.Person[id].Ownership);
            $scope.BusinessAccount.Person.splice(id, 1);
        }
        return false;
    };
    $scope.EditAuthorizedRepresentatives = function (modal, index) {
        modal.id = index;
        if (modal.Ownership != undefined) {
            $scope.FinalBeneficiaryPercentage = parseFloat($scope.FinalBeneficiaryPercentage) + parseFloat(modal.Ownership);
        }
        $scope.BeneficiaryPercentageFinished = false;
        $scope.Person = angular.copy(modal);
        if (modal.Ownership != undefined) {
            $scope.Person.Ownership = angular.copy(parseFloat($scope.Person.Ownership).toString() + "%");
        }
        if ($scope.Person.Country == "") {
            $scope.Person.Country = $scope.BusinessAccount.ApplicationCountry.toUpperCase();
        }
        $scope.Person.Dob = moment(modal.Dob);
        setTimeout(function () {
            $scope.PhoneInputforpop();
            if (modal.IdActualFileName != null && modal.IdActualFileName != undefined && modal.IdActualFileName != '') {
                $('.file-upload-image3').hide();
                $('.file-upload-content3').show();
                $('.image-upload-wrap3').hide();
                $("#uploadarticle3").addClass("d-none");
                $('.image-title3').html(modal.IdActualFileName);
            }

        }, 200);
        $scope.BusinessFrm4.$setPristine();
        $scope.BusinessFrm4.$setUntouched();

        $("#AuthorizedRepresentatives").modal('toggle');
        setTimeout(function () {
            $(".overflow-hidden").scrollTop(0);
        }, 200);
    };
    $scope.SubmitbuttonDisabled = true;
    $scope.CheckTermsAndConditions = function () {
        if ($("#CheckTermsAndConditions").is(':checked')) {
            $scope.SubmitbuttonDisabled = false;
        } else {
            $scope.SubmitbuttonDisabled = true;
        }
    };
    $scope.SavefinalBusinessAccount = function () {
        //$scope.ManageTab('Sixth');
        //return;
        var errror = 0;
         $scope.BusinessAccount.IsFinalStep =true;
        $scope.Termsandconditions = false;
        if ($scope.BusinessAccount.AgreeTerms != true) {
            $scope.Termsandconditions = true;
            errror = 1;
        }
        else {
            $scope.Termsandconditions = false;
        }
        
        $scope.AnalysisTypeError = false;
        if (!$scope.BusinessAccount.Monthly && !$scope.BusinessAccount.Weekly && !$scope.BusinessAccount.Daily){
             $scope.AnalysisTypeError = true;
              errror = 1;
         }
        
        
        
        $scope.validsignature = false;
        if ($scope.isCanvasBlank(document.getElementById('signature'))) {
            $scope.validsignature = true;
            errror = 1;
        }
        if (errror == 0) {
            if (!$scope.isCanvasBlank(document.getElementById('signature'))) {
                $scope.BusinessAccount.BusinessSignature = document.getElementById('signature').toDataURL();
            }
            else {
                $scope.BusinessAccount.BusinessSignature = null;
            }
            $scope.SetDob().then(function(response){
                    $scope.BusinessAccount.FileUploadPathArtical = null;
            var result = $scope.PostAjax("/Umbraco/Api/Home/AddUpdateBusiness",$scope.BusinessAccount);
            //var result = baseSvc.postRequest("/Umbraco/Api/Home/AddUpdateBusiness", { 'businessAccount': $scope.BusinessAccount });
            result.then(function (response) {
                response = JSON.parse(response)
                if (response.Status === 200) {
                    $scope.ManageTab('Sixth');
                    $scope.sendEmailData();
                    $scope.BusinessAccount.Id = response.Data.Id;
                    $scope.BusinessAccount.Guid = response.Data.Guid;
                    if (response.Data.Contact_ID != null && response.Data.Contact_ID != undefined && response.Data.Contact_ID != "") {
                        var i = 0;
                        if (response.Data.Contact_ID.length > 0) {
                            angular.forEach(response.Data.Contact_ID, function (value, key) {
                                $scope.BusinessAccount.Person[i].Contact_ID = value;
                                i = i + 1;
                            });
                        }
                    }

                }
            });
            });
        }

    };
    $scope.removeauth = function () {
        $('.file-upload-input3').replaceWith($('.file-upload-input3').clone());
        $('.file-upload-content3').hide();
        $('.image-upload-wrap3').show();
        $scope.Person.IdActualFileName = "";
        $("#uploadarticle3").removeClass("d-none");
        $scope.Person.FileUploadPathID = undefined;
        $('#IDFile').val('');
    };
    $scope.removeauth4 = function () {
        $('.file-upload-input4').replaceWith($('.file-upload-input4').clone());
        $('.file-upload-content4').hide();
        $('.image-upload-wrap4').show();
        $("#uploadarticle").removeClass("d-none");
        $scope.BusinessAccount.ArticleOfIncorporationFile = "";
        $scope.Person.FileUploadPathID = undefined;
        $('#ArticalIncorp').val('');
    };

    $scope.createpdf = function () {
        $SSscope.CreateBusinessPDF('DACB230B-D444-4FF2-8D46-7AE3BD7EBB8D');
        setTimeout(function () {
            window.location.href = window.location.origin;
        }, 3000);
    };
    $scope.CreateBusinessPDF = function (guid) {
        //var deferred = $q.defer();
        window.location.href = "/Home/ExportBusinessPDF?guid=" + guid;
        //baseSvc.getRequest("/Home/ExportBusinessPDF?guid=DACB230B-D444-4FF2-8D46-7AE3BD7EBB8D").then(function () {
        //    deferred.resolve(true);
        //})
        //return deferred.promise;
    };
    $scope.GetBusinessAccountData = function (guid) {
        var deferred = $q.defer();
        baseSvc.getRequest("/Umbraco/Api/Home/GetBusinessAccountDetails?guid=" + guid)
            .then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                console.log(error);
                deferred.reject(result);
            });
        return deferred.promise;
    }
    $scope.initBinding();
    $scope.InitText();
    $scope.Selectcountry = function () {
        $scope.InitText();
    };
    $scope.GetCountryData = function (index) {
        if (index == undefined) {
            index = 0
        }
        var countryData = MobileInput[index].getSelectedCountryData();
        if (countryData.iso2 == "us" || countryData.iso2 == "ca") {
            $scope.phonenumberlength = 10;
            $scope.BusinessAccount.Person[index].MobileCountryCode = countryData.dialCode;
            $scope.BusinessAccount.Person[index].IsValideMobile = MobileInput[index].isValidNumber();
        }
        else {
            $scope.phonenumberlength = 100;
            $scope.BusinessAccount.Person[index].IsValideMobile = true;
        }

    };
    $scope.GetCountryData1 = function (index) {
        if (index == undefined) {
            index = 0
        }
        var countryData = MobileInput[index].getSelectedCountryData();
        if (countryData.iso2 == "us" || countryData.iso2 == "ca") {
            $scope.phonenumberlength = 10;
            $scope.Person.MobileCountryCode = countryData.dialCode;
            $scope.Person.IsValideMobile = MobileInput[index].isValidNumber();
        }
        else {
            $scope.phonenumberlength = 100;
            $scope.Person.IsValideMobile = true;
        }
    };

    $scope.isCanvasBlank = function (canvas) {
        const context = canvas.getContext('2d');

        const pixelBuffer = new Uint32Array(
            context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
        );
        return !pixelBuffer.some(color => color !== 0);
    }
    $scope.BindSignature = function (strDataURI) {
        if (strDataURI !== "" && strDataURI !== null) {

            var myCanvas = document.getElementById('signature');
            var ctx = myCanvas.getContext('2d');
            var img = new Image;
            img.onload = function () {
                var MAX_WIDTH = 800;
                var MAX_HEIGHT = 80;
                var width = img.width;
                var height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                ctx.drawImage(img, 0, 0, width, height); // Or at whatever offset you like
            };
            img.src = strDataURI;
        }
    };
    $scope.sendEmailData = function () {
        var deferred = $q.defer();
        var result = baseSvc.postRequest("/Home/SendBusinessEmail", { 'model': $scope.BusinessAccount }).then(function (response) {
            if (response.Status == 200) {
                $scope.successMsg = "Mail has been send Successfully";
            }
            else {
                $scope.errorMsg = "Mail has not been send Successfully";
            }
            deferred.resolve(response);
        }, function (error, result) {
            console.log(error);
            deferred.reject(result);
        });
        return deferred.promise;
    };
    $scope.sendRegistrationEmailData = function () {
        var deferred = $q.defer();
        var result = $scope.PostAjax("/Umbraco/Api/Home/SendRegistrationEmail",$scope.BusinessAccount).then(function (response) {
            if (response.Status == 200) {
                $scope.successMsg = "Mail has been send Successfully";
            }
            else {
                $scope.errorMsg = "Mail has not been send Successfully";
            }
            deferred.resolve(response);
        }, function (error, result) {
            console.log(error);
            deferred.reject(result);
        });
        return deferred.promise;
    };
    $scope.SetDob=function()
    {
        var deferred = $q.defer();
        for (var i = 0; i < $scope.BusinessAccount.Person.length; i++) {
                $scope.BusinessAccount.Person[i].Dob=moment($scope.BusinessAccount.Person[i].Dob).format('YYYY-MM-DD HH:mm:ss');
                $scope.BusinessAccount.Person[i].FileUploadPathID=null;
            }
        deferred.resolve($scope.BusinessAccount.Person);
        return deferred.promise;
    }
    $scope.PostAjax = function(url,objdata){
        var deferred = $q.defer();
    $.ajax({
    'async': false, 
    'global': false, 
    'url': url,
    'dataType': "json",
    'data': objdata,
    'type': "POST",
    'success': function (data) {
        deferred.resolve(data);
        json = data; },
    'error': function (xhr) {
        console.log(xhr);
        deferred.reject(xhr);
         }
    }); 
    return deferred.promise;
}
});