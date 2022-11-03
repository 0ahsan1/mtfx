var lazyModules = ['google.places'];
angular.forEach(lazyModules, function (dependency) {
    app.requires.push(dependency);
});
app.directive("compareTo", function () {
    return {
        require: "ngModel",
        scope:
        {
            repeatPassword: "=compareTo"
        },
        link: function (scope, element, attributes, paramval) {
            paramval.$validators.compareTo = function (val) {
                return val === scope.repeatPassword;
            };
            scope.$watch("repeatPassword", function () {
                paramval.$validate();
            });
        }
    };
});

//app.controller("PersonalController", function ($scope, baseSvc, $http, $location, $q) {
app.controller("PersonalController", function ($scope, baseSvc, $http, $location, $q, toaster) {
    console.log("personal");
    $scope.BackBtn = false;
    $scope.isedit = false;
    $scope.Banks = [];
    $scope.AnalysisTypeError =false;
    $scope.IsMailsent = 0;
    var currentdate = new Date();
    $scope.phonenumberlength = 10;
    $scope.ctrl = {
        minDate: moment(),
        maxDate: moment()
    };
    $scope.maxDateMoment = moment().add(0, 'day');
    $scope.CurrentYear = currentdate.getFullYear();
    $scope.PersonalAccount = { Id: '', AccountType: 'Personal', ApplicationCountry: 'ca', Email: '', Password: '', Reference: '', Amount: '', Buy: '', Sell: '', Guid: '', AmountRange: '' };
    $scope.PersonalAccount.Email = "";
    $scope.validsignature = false;
    $scope.emailFormat = "^[a-zA-Z0-9.#$%&,'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
    $scope.showloader = function () {
        $('.overlay').show();
    }
    $scope.hideloader = function () {
        $('.overlay').hide();
    }
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
            $('#DOB-0').attr('tabindex', 5);
        }, 1000);

    };
    var MobileInput = [];
    $scope.Country = [
        { Text: 'Canada', Value: 'ca' },
        { Text: 'United States', Value: 'us' }
    ];
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
    $scope.Date = [];
    $scope.Month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    $scope.Year = [];
    $scope.PersonalAccount.Person = [
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
            EmployersName:''
        }
    ];

    //Convert Email Address Uppercase to Lowercase
    $scope.lowerCase = function () {
        if ($scope.PersonalAccount.Email != undefined && $scope.PersonalAccount.Email != null && $scope.PersonalAccount.Email != "")
            $scope.PersonalAccount.Email = $scope.PersonalAccount.Email.toLowerCase();
    };
    $scope.GotoDetailTab = function () {
        $scope.showloader();
        $scope.GetCountryDatafordropdown();
        if ($scope.GetStartTab.$invalid) {
            if ($scope.GetStartTab.email.$viewValue != "") {
                $scope.GetStartTab.email.$error.pattern = true;
                $scope.GetStartTab.email.$touched = true;
                return;
            }
            else {
                $scope.GetStartTab.email.$touched = true;
                $scope.hideloader();
                return;
            }
        }
        $scope.ManageTab("Second");
        $scope.SavePersonalAccount(false, "Second").then(function () {
            if ($scope.IsMailsent == 0) {
                $scope.IsMailsent = 1;
                $scope.sendRegistrationEmailData().then(function () {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.PersonalAccount.Person[0].Country = $scope.PersonalAccount.ApplicationCountry.toUpperCase().trim();
                            if ($scope.PersonalAccount.Person.length > 1) {
                                $scope.PersonalAccount.Person[1].Country = $scope.PersonalAccount.ApplicationCountry.toUpperCase().trim();
                            }
                            $scope.PhoneInput(0);
                            var countryname = '';
                            if ($scope.PersonalAccount.Person[0].Country == 'CA') {
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
                            $scope.acSelectedCountry = countryname;
                        });
                    }, 100);
                    $scope.ManagePhonenumer();

                })
            }
            else {
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.PersonalAccount.Person[0].Country = $scope.PersonalAccount.ApplicationCountry.toUpperCase().trim();
                        if ($scope.PersonalAccount.Person.length > 1) {
                            $scope.PersonalAccount.Person[1].Country = $scope.PersonalAccount.ApplicationCountry.toUpperCase().trim();
                        }
                        $scope.PhoneInput(0);
                        var countryname = '';
                        if ($scope.PersonalAccount.Person[0].Country == 'CA') {
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
                        $scope.acSelectedCountry = countryname;
                    });
                }, 100);
                $scope.ManagePhonenumer();

            }
        });
    };

    $scope.autocompleteOptions = {
        componentRestrictions: { country: ['ca', 'us'] },
        types: ['geocode']
    };

    $scope.ManagePhonenumer = function () {
        setTimeout(function () {
            $scope.$apply(function () {
                $('#Phone-0').val($scope.PersonalAccount.Person[0].MobileNumber)
            })
        }, 300);
    }
    $scope.initBinding = function (isAnotherContact) {
        var guid = $scope.getUrlVars()["id"];
        if (guid != undefined && guid != "") {
            $scope.GetPersonalAccountData(guid).then(function (response) {
                console.log(response);
                response = JSON.parse(response);
                $scope.isedit = true;
                if (response.Status == 200 && response.Data != null) {
                    $scope.PersonalAccount = response.Data;
                    $scope.PersonalAccount.Person[0] = response.Data.Person[0];
                    $scope.PersonalAccount.Person[0].IsAdded = true;
                    $scope.PersonalAccount.Person[0].Dob = moment($scope.PersonalAccount.Person[0].Dob);
                    $scope.BindSignature(response.Data.PersonalSignature);
                    if ($scope.PersonalAccount.Person[0].IdActualFileName != undefined && $scope.PersonalAccount.Person[0].IdActualFileName != "" && $scope.PersonalAccount.Person[0].IdActualFileName != "") {
                        $("#uploadid").addClass("d-none");
                        $('.file-upload-image').hide();
                        $('.image-upload-wrap').hide();
                        $('.file-upload-content').show();
                        $('.image-title').html($scope.PersonalAccount.Person[0].IdActualFileName);

                    }
                    if ($scope.PersonalAccount.Person[0].PoaActualFileName != undefined && $scope.PersonalAccount.Person[0].PoaActualFileName != "" && $scope.PersonalAccount.Person[0].PoaActualFileName != "") {
                        $("#uploadpoa").addClass("d-none");
                        $('.file-upload-image1').hide();
                        $('.image-upload-wrap1').hide();
                        $('.file-upload-content1').show();
                        $('.image-title1').html($scope.PersonalAccount.Person[0].PoaActualFileName);
                    }
                }
                $scope.GetCountryDatafordropdown();
                $scope.GetBankData();
                if (isAnotherContact == undefined || isAnotherContact)//17-07-2019 Ajay with jinesh - Multiple Flag issue on Mobile number field 
                    $scope.PhoneInput(0);
                $scope.PersonalAccount.Person[0].Country = $scope.PersonalAccount.ApplicationCountry.toUpperCase();
                if ($scope.PersonalAccount.Person.length > 1) {
                    $scope.PersonalAccount.Person[1].Country = $scope.PersonalAccount.ApplicationCountry.toUpperCase();
                }
                var countryname = '';
                if ($scope.PersonalAccount.Person[0].Country == 'CA') {
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
                $scope.BindIdentification();
                $scope.acSelectedCountry = countryname;
                $scope.ManagePhonenumer();
                $scope.hideloader();

            });
        }
        else {
            $scope.isedit = false;
            $scope.GetCountryDatafordropdown();
            $scope.GetBankData();
            if (isAnotherContact == undefined || isAnotherContact)//17-07-2019 Ajay with jinesh - Multiple Flag issue on Mobile number field 
                $scope.PhoneInput(0);
            $scope.PersonalAccount.Person[0].Country = $scope.PersonalAccount.ApplicationCountry.toUpperCase();
            if ($scope.PersonalAccount.Person.length > 1) {
                $scope.PersonalAccount.Person[1].Country = $scope.PersonalAccount.ApplicationCountry.toUpperCase();
            }
            var countryname = '';
            if ($scope.PersonalAccount.Person[0].Country == 'CA') {
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
            $scope.BindIdentification();
            $scope.acSelectedCountry = countryname;
            $scope.ManagePhonenumer();
            $scope.hideloader();

        }
    };

    $scope.PhoneInput = function (Index) {
        setTimeout(function () {
            if ($scope.PersonalAccount.ApplicationCountry !== "") {
                var PhoneId = "#Phone-" + Index;
                var InputPhone = document.querySelector(PhoneId);
                MobileInput[Index] = window.intlTelInput(InputPhone, { utilsScript: "../../scripts/registration/utils.js" });
                MobileInput[Index].setCountry($scope.PersonalAccount.ApplicationCountry);//17-07-2019 Ajay with jinesh - Init country flag issue         
                $scope.isflagSetted = 1;
            }
        }, 100);
    };

    $scope.GetCountryData = function (index) {
        index = 0;
        var countryData = MobileInput[index].getSelectedCountryData();
        if (countryData.iso2 == "us" || countryData.iso2 == "ca") {
            $scope.phonenumberlength = 10;
            $scope.PersonalAccount.Person[index].MobileCountryCode = countryData.dialCode;
            $scope.PersonalAccount.Person[index].IsValideMobile = MobileInput[index].isValidNumber();

        }
        else {
            $scope.phonenumberlength = 100;
            $scope.PersonalAccount.Person[index].IsValideMobile = true;
        }
    };
    $scope.RendarAddress = function (GoogleObj) {
        $scope.PersonalAccount.Person[0].City = "";
        $scope.PersonalAccount.Person[0].StateProv = "";
        $scope.PersonalAccount.Person[0].PostalCode = "";
        var nostreet = 0;
        var address = "";
        if (GoogleObj != undefined) {
            if (GoogleObj.adr_address !== undefined && GoogleObj.adr_address !== null && GoogleObj.adr_address !== "") {
                var AddressArray = GoogleObj.adr_address.replace('<span>', '').split('</span>');
                angular.forEach(AddressArray, function (value, key) {
                    var Name = value.substring(value.lastIndexOf('>') + 1);
                    if (value.includes("street-address")) {
                        $scope.PersonalAccount.Person[0].AddressLine1 = Name;
                        if (address == "") {
                            address += Name
                        }
                        else {
                            address += "," + Name
                        }
                        nostreet = 1;
                    }
                    else if (value.includes("locality")) {
                        $scope.PersonalAccount.Person[0].City = Name;
                        if (address == "") {
                            address += Name
                        }
                        else {
                            address += "," + Name
                        }
                    }
                    else if (value.includes("region")) {
                        //$scope.PersonalAccount.Person[0].StateProv = Name;
                        if (Name != "" && Name != null && Name != undefined) {
                            if (address == "") {
                                address += Name
                            }
                            else {
                                address += "," + Name
                            }
                            $scope.GetProvinceData(Name, $scope.PersonalAccount.Person[0].Country).then(function (response) {
                                response = JSON.parse(response);
                                if (response.Message == "OK") {
                                    $scope.PersonalAccount.Person[0].StateProv = response.Data.ProvinceFullName;
                                } else {
                                    $scope.PersonalAccount.Person[0].StateProv = Name;
                                }
                            });
                        }
                    }
                    else if (value.includes("postal-code")) {
                        $scope.PersonalAccount.Person[0].PostalCode = Name;
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
                    $scope.PersonalAccount.Person[0].AddressLine1 = address;
                }
                $scope.addClasstoInput(0);
            }
        }
    };
    $scope.acModels = [
        { model: "person.AddressLine1", acField: "Line1" },
        { model: "person.City", acField: "City" },
        { model: "person.StateProv", acField: "ProvinceName" },
        { model: "person.PostalCode", acField: "PostalCode" }
    ];
    $scope.acOptions = {
        key: "MX54-KC69-WJ39-CN55",
        //key: "WC12-TG76-TB75-UB17",
        bar: { "showCountry": false, "showLogo": false },
        suppressAutocomplete: true
    };
    $scope.addressPopulated = function (address, Index) {
        var Postalcode = null;
        if (address.CountryName === 'United States') {
            Postalcode = address.PostalCode.split('-')[0];
        }
        else {
            Postalcode = address.PostalCode;
        }
        var setPostalcode = "#Postalcode" + Index;
        $(setPostalcode).val(Postalcode);

        $scope.PersonalAccount.Person[Index].City = address.City;
        $scope.PersonalAccount.Person[Index].PostalCode = Postalcode;
        $scope.PersonalAccount.Person[Index].StateProv = address.ProvinceName;
        $scope.PersonalAccount.Person[Index].AddressLine1 = address.Line1;
        $scope.addClasstoInput(Index);
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
    $scope.addClasstoInput = function (index) {
        var postal_code = "#Postal-DivUS" + index;
        var countrycity = "#TownCityDiv" + index;
        var State = "#StateProvDiv" + index;
        var Address = "#Address-Div" + index;

        if (!$(postal_code).hasClass("ffl-floated")) {
            $(postal_code).addClass("ffl-floated");
        }
        if (!$(countrycity).hasClass("ffl-floated")) {
            $(countrycity).addClass("ffl-floated");
        }
        if (!$(State).hasClass("ffl-floated")) {
            $(State).addClass("ffl-floated");
        }
        if (!$(Address).hasClass("ffl-floated")) {
            $(Address).addClass("ffl-floated");
        }
    };
    $scope.getcountryaddress = function () {

        countryname = $scope.PersonalAccount.Person[0].Country;
        $scope.autocompleteOptions = {
            componentRestrictions: { country: [$scope.PersonalAccount.Person[0].Country] },
            types: ['geocode']
        };
        console.log($scope.autocompleteOptions);
    };
    $scope.GetProvinceData = function (ProvinceName, countryname) {
        var deferred = $q.defer();
        if (countryname == "CA" || countryname == "US") {
            baseSvc.getRequest("/Umbraco/Api/Home/GetProvinceMaster?StateProv=" + ProvinceName)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    console.log(error);
                    deferred.reject(result);
                });
        }
        else {
            deferred.resolve(false);
        }
        return deferred.promise;
    }

    $scope.UdloadFileID = function (item) {
        var deferred = $q.defer();
        if (item.FileUploadPathID !== null && item.FileUploadPathID !== undefined && item.FileUploadPathID !== '') {
            baseSvc.uploadFileToServer("/umbraco/api/Home/UploadFileToServer",item.FileUploadPathID).then(function (response) {
                //request.then(function (response) {
                var filetype = [{ "ActualFileName": "", "RenameFileName": "", "FileType": "" }];
                if (response !== null || response !== undefined) {
                    filetype[0]["RenameFileName"] = response;
                    filetype[0]["ActualFileName"] = item.IdActualFileName;
                    filetype[0]["FileType"] = "ID";
                    item.IdRenamedFileName = response;
                }
                deferred.resolve(filetype);
            }, function (error) {
                deferred.reject(error.result);
            });
        }
        else {
            deferred.resolve(false);
        }
        return deferred.promise;
    };

    $scope.UdloadFilePOA = function (item) {
        var deferred = $q.defer();
        if (item.FileUploadPathPOA !== null && item.FileUploadPathPOA !== undefined && item.FileUploadPathPOA !== '') {
            baseSvc.uploadFileToServer("/umbraco/api/Home/UploadFileToServer",item.FileUploadPathPOA).then(function (response) {
                var filetype = [{ "ActualFileName": "", "RenameFileName": "", "FileType": "" }];
                if (response !== null || response !== undefined) {
                    filetype[0]["RenameFileName"] = response;
                    filetype[0]["ActualFileName"] = item.PoaActualFileName;
                    filetype[0]["FileType"] = "POA";
                    item.PoaRenamedFileName = response;
                }
                deferred.resolve(filetype);
            }, function (error) {
                deferred.reject(error.result);
            });
        }
        else {
            deferred.resolve(false);
        }
        return deferred.promise;

    };

    $scope.ParrelUploadCall = function (item) {
        var deferred = $q.defer();
        var allresponse=[];
        $scope.UdloadFileID(item).then(function(response){
            if (response != undefined && response.length >0) {
                for (var i = 0; i < response.length; i++) {
                    allresponse.push(response[i])
                }
            }
            $scope.UdloadFilePOA(item).then(function(response){
                if (response != undefined && response.length >0) {
                for (var i = 0; i < response.length; i++) {
                    allresponse.push(response[i])
                }
                    
                }
                                deferred.resolve(allresponse);
            });
        });
        //$q.all([$scope.UdloadFileID(item), $scope.UdloadFilePOA(item)]).then(function (results) {
          //  deferred.resolve(results);
        //});
        return deferred.promise;
    };

    $scope.SubmitRegistration = function () {

        var deferred = $q.defer();
        var promise = $q.all({});
        angular.forEach($scope.PersonalAccount.Person, function (item, key) {
            promise = promise.then(function () {
                return $scope.ParrelUploadCall(item);
            });
        });
        promise.then(function (responce) {
            deferred.resolve(responce);
        });
        return deferred.promise;
    };

    $scope.SavePersonalAccount = function (IsfileUpload, tab) {
        var deferred = $q.defer();

        //$scope.ManageTab(tab);
        //return;
        $scope.showloader();
        var errror = 0;
        if (tab == "Third") {
            
            //reload Dropdown
            $scope.BindIdentification();
            
            angular.forEach($scope.GetDetailsTab.$error.required, function (field) {
                field.$setDirty();
                field.$setTouched();
                errror++;
            });
            if ($('#GetDetailsTab .errorinput').length) {
                errror++;
            }
        }
        if (tab == "Fourth") {
            angular.forEach($scope.IdentityVerificationTab.$error.required, function (field) {
                field.$setDirty();
                field.$setTouched();
                errror++;
            });
            if ($('#IdentityVerificationTab .errorinput').length) {
                errror++;
            }
        }
        $scope.validsignature = false;
        $scope.Termsandconditions = false;
        if (tab === "Fifth" && $scope.PersonalAccount.AcceptTerms != true) {
            $scope.Termsandconditions = true;
            $scope.hideloader();
            errror = 1;
        }
        else {
            $scope.Termsandconditions = false;
        }
        if (tab === "Fifth" && $scope.isCanvasBlank(document.getElementById('signature'))) {
            $scope.validsignature = true;
            errror = 1;
        }
        
         $scope.AnalysisTypeError = false;
        if (tab === "Fifth" && (!$scope.PersonalAccount.Monthly && !$scope.PersonalAccount.Weekly && !$scope.PersonalAccount.Daily))
        {
            $scope.AnalysisTypeError = true; 
            errror = 1; 
            
        }
        
        
        
        if (errror === 0) {
             if (tab === "Fifth"){
             $scope.PersonalAccount.IsFinalStep =true;
            }
            
            
            if (!$scope.isCanvasBlank(document.getElementById('signature'))) {
                $scope.PersonalAccount.PersonalSignature = document.getElementById('signature').toDataURL();
            }
            else {
                $scope.PersonalAccount.PersonalSignature = null;
            }
            if (IsfileUpload == true) {
                $scope.SubmitRegistration().then(function (response) {
                    if (response != null) {
                        angular.forEach(response, function ($index, val) {
                            if ($index != false && $index.FileType === "ID") {
                                $scope.PersonalAccount.Person[0].IdActualFileName = $index.ActualFileName;
                                $scope.PersonalAccount.Person[0].IdRenamedFileName = $index.RenameFileName;
                            }
                            else if ($index != false && $index.FileType === "POA") {
                                $scope.PersonalAccount.Person[0].PoaActualFileName = $index.ActualFileName;
                                $scope.PersonalAccount.Person[0].PoaRenamedFileName = $index.RenameFileName;
                            }
                        });
                    }
                    $scope.IsShow = false;
                    $scope.errorMsg = "";
                    $scope.PersonalAccount.Person[0].Dob = moment($scope.PersonalAccount.Person[0].Dob).format('YYYY-MM-DD HH:mm:ss');
                    $scope.PersonalAccount.Person[0].FileUploadPathID = null;
                    $scope.PersonalAccount.Person[0].FileUploadPathPOA = null;
                    var result = $scope.PostAjax("/Umbraco/Api/Home/AddupdatePersonal",$scope.PersonalAccount);
                    //var result = baseSvc.postRequest("/Umbraco/Api/Home/AddUpdatePersonal", { 'personalAccount': $scope.PersonalAccount });
                    result.then(function (response) {
                        response = JSON.parse(response);
                        $scope.PersonalAccount.Person[0].Dob = moment($scope.PersonalAccount.Person[0].Dob);
                        var idfileInfo = $('#IDFile0')[0].files[0];
                        $scope.PersonalAccount.Person[0].FileUploadPathID = idfileInfo;
                        var poafileInfo = $('#PoaFile0')[0].files[0];
                        $scope.PersonalAccount.Person[0].FileUploadPathPOA = poafileInfo;
                        deferred.resolve(response);
                        if (response.Status === 200) {
                            //if (tab === "Fifth") {
                            //    alert("Personal account created successfully.");
                            //    $scope.CreatePersonalPDF($scope.PersonalAccount.Guid);
                            //    setTimeout(function () {
                            //        window.location.href = window.location.origin;
                            //   }, 3000);
                            //}
                            console.log(response);
                            $scope.ManageTab(tab);
                            $scope.PersonalAccount.Id = response.Data.Id;
                            $scope.PersonalAccount.Guid = response.Data.Guid;
                            if (response.Data.Contact_ID != null && response.Data.Contact_ID != undefined && response.Data.Contact_ID != "") {
                                var i = 0;
                                if (response.Data.Contact_ID.length > 0) {
                                    angular.forEach(response.Data.Contact_ID, function (value, key) {
                                        $scope.PersonalAccount.Person[i].Contact_ID = value;
                                        i = i + 1;
                                    });
                                }
                            }
                            angular.forEach($scope.PersonalAccount.Person, function (item, key) {
                                item.IsPOAFile = false;
                                item.IsIdFile = false;
                                item.FileUploadPathID = null;
                                item.FileUploadPathPOA = null;
                            });
                            if (tab == 'Fifth' && $scope.IsMailsent == 1) {
                                $scope.IsMailsent = 2;
                                $scope.sendEmailData();
                            }
                        }
                        else {
                            alert("Please create an account!!!");
                        }
                    });
                    $scope.hideloader();
                });
            } else {
                $scope.PersonalAccount.Person[0].Dob = moment($scope.PersonalAccount.Person[0].Dob).format('YYYY-MM-DD HH:mm:ss');
                //var result = baseSvc.postRequest("/Umbraco/Api/Home/AddupdatePersonal", { 'personalAccount': $scope.PersonalAccount });
                var result = $scope.PostAjax("/Umbraco/Api/Home/AddupdatePersonal",$scope.PersonalAccount);
                result.then(function (response) {
                    response = JSON.parse(response);
                    $scope.PersonalAccount.Person[0].Dob = moment($scope.PersonalAccount.Person[0].Dob);
                    deferred.resolve(response);
                    if (response.Status === 200) {
                        //if (tab === "Fifth") {
                        //    alert("Personal account created successfully.");
                        //    $scope.CreatePersonalPDF($scope.PersonalAccount.Guid);
                        //    setTimeout(function () {
                        //        window.location.href = window.location.origin;
                        //    }, 3000);
                        //}
                        $scope.ManageTab(tab);
                        $scope.PersonalAccount.Id = response.Data.Id;
                        $scope.PersonalAccount.Guid = response.Data.Guid;
                        if (response.Data.Contact_ID != null && response.Data.Contact_ID != undefined && response.Data.Contact_ID != "") {
                            var i = 0;
                            if (response.Data.Contact_ID.length > 0) {
                                angular.forEach(response.Data.Contact_ID, function (value, key) {
                                    $scope.PersonalAccount.Person[i].Contact_ID = value;
                                    i = i + 1;
                                });
                            }
                        }
                        if (tab == 'Fifth') {
                            $scope.sendEmailData();
                        }
                    }
                    $scope.hideloader();
                });

            }
        }
        else {
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: ($('.errorinput').first().offset().top - 150)
                }, 800);
            }, 100);
            $scope.hideloader();
        }
        $scope.hideloader();
        return deferred.promise;
    };
    $scope.SelectFile = function (FileType, Index) {
        var idname = null;
        if (FileType === 'IDFile') {
            idname = "#IDFile" + Index;
        }
        else if (FileType === 'PoaFile') {
            idname = "#PoaFile" + Index;
        }
        var fileInfo = $(idname)[0].files[0];
        if (fileInfo) {
            if (fileInfo.type === "image/jpeg" || fileInfo.type === "image/png" || fileInfo.type === "application/pdf") {
                var fileSize = fileInfo.size / 1048576;
                if (fileSize < 5) {

                    if (FileType === 'IDFile') {
                        $("#uploadid").addClass("d-none");
                        $scope.PersonalAccount.Person[Index].IdActualFileName = fileInfo.name;
                        $scope.PersonalAccount.Person[Index].FileUploadPathID = fileInfo;
                        $scope.PersonalAccount.Person[Index].IsIdFile = true;
                        var idfileName = "#IDFile" + Index;
                        $('.image-upload-wrap').hide();
                        const reader = new FileReader();
                        reader.readAsDataURL($(idname)[0].files[0]);
                        reader.onload = () => {
                            if (fileInfo.type !== "application/pdf") {
                                $('.file-upload-image').show();
                                $('.file-upload-image').attr('src', reader.result);
                            }
                            else {
                                $('.file-upload-image').hide();
                            }

                        };
                        $('.file-upload-content').show();
                        $('.image-title').html(fileInfo.name);
                    }
                    else if (FileType === 'PoaFile') {
                        $("#uploadpoa").addClass("d-none");
                        $scope.PersonalAccount.Person[Index].PoaActualFileName = fileInfo.name;
                        $scope.PersonalAccount.Person[Index].FileUploadPathPOA = fileInfo;
                        $scope.PersonalAccount.Person[Index].IsPOAFile = true;
                        idfileName = "#POAfileName" + Index;
                        $('.image-upload-wrap1').hide();
                        const reader = new FileReader();
                        reader.readAsDataURL($(idname)[0].files[0]);
                        reader.onload = () => {
                            console.log(reader.result);
                            if (fileInfo.type !== "application/pdf") {
                                $('.file-upload-image1').show();
                                $('.file-upload-image1').attr('src', reader.result);
                            }
                            else {
                                $('.file-upload-image1').hide();
                            }
                        };
                        $('.file-upload-content1').show();
                        $('.image-title1').html(fileInfo.name);
                    }
                }
                else {
                    alert("The file size exceeds the 5 MB limit");
                }
            }
            else {
                alert("Please ensure a valid document is uploaded");
            }
        }
        else {
            alert("Please choose file!!");
        }
    };
    $scope.ManageTab = function (tabname) {
        if (tabname === 'Second') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').removeClass('active');
            $('#LiFourth').removeClass('active');
            $("#IdentityVerificationTab").css("display", "none");
            $("#AccountCreatedTab").css("display", "none");
            $("#GetStartTab").css("display", "none");
            $("#GetDetailsTab").css("display", "block");
        }
        else if (tabname === 'Third') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').addClass('active');
            $('#LiFourth').removeClass('active');
            $("#GetDetailsTab").css("display", "none");
            $("#AccountCreatedTab").css("display", "none");
            $("#GetStartTab").css("display", "none");
            $("#IdentityVerificationTab").css("display", "block");
        }
        else if (tabname === 'Fourth') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').addClass('active');
            $('#LiFourth').addClass('active');
            $("#GetDetailsTab").css("display", "none");
            $("#IdentityVerificationTab").css("display", "none");
            $("#GetStartTab").css("display", "none");
            $("#AccountCreatedTab").css("display", "block");
        }
        else if (tabname === 'Fifth') {
            /*$('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').addClass('active');
            $('#LiFourth').addClass('active');
            $("#GetDetailsTab").css("display", "none");
            $("#IdentityVerificationTab").css("display", "none");
            $("#GetStartTab").css("display", "none");
            $("#AccountCreatedTab").css("display", "none");
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
            $("#IdentityVerificationTab").css("display", "none");
            $("#AccountCreatedTab").css("display", "none");
            $("#GetStartTab").css("display", "none");
            $("#GetDetailsTab").css("display", "none");
            $("#GetStartTab").css("display", "block");
        }
        if (tabname === 'Second') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').removeClass('active');
            $('#LiFourth').removeClass('active');
            $("#IdentityVerificationTab").css("display", "none");
            $("#AccountCreatedTab").css("display", "none");
            $("#GetStartTab").css("display", "none");
            $("#GetDetailsTab").css("display", "block");
        }
        else if (tabname === 'Third') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').addClass('active');
            $('#LiFourth').removeClass('active');
            $("#GetDetailsTab").css("display", "none");
            $("#AccountCreatedTab").css("display", "none");
            $("#GetStartTab").css("display", "none");
            $("#IdentityVerificationTab").css("display", "block");
        }
        else if (tabname === 'Fourth') {
            $('#LiFirst').addClass('active');
            $('#LiSecond').addClass('active');
            $('#LiThird').addClass('active');
            $('#LiFourth').addClass('active');
            $("#GetDetailsTab").css("display", "none");
            $("#IdentityVerificationTab").css("display", "none");
            $("#GetStartTab").css("display", "none");
            $("#AccountCreatedTab").css("display", "block");
        }
    };
    $scope.isCanvasBlank = function (canvas) {
        const context = canvas.getContext('2d');

        const pixelBuffer = new Uint32Array(
            context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
        );
        return !pixelBuffer.some(color => color !== 0);
    }
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
    $scope.GetPersonalAccountData = function (guid) {
        var deferred = $q.defer();
        baseSvc.getRequest("/Umbraco/Api/Home/GetPersonalAccountDetails?guid=" + guid)
            .then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                console.log(error);
                deferred.reject(result);
            });
        return deferred.promise;
    }
    $scope.BindIdentification = function () {
        
        $scope.ProofAddressType = [];
        if ($scope.PersonalAccount.ApplicationCountry === 'us') {
            $scope.ProofAddressType = [
                { value: "Utility Bill", Text: "Utility Bill (Gas, Heat, Hydro, Water)" },
                { value: "Property Tax Assesment", Text: "Property Tax Assessment" },
                { value: "Other", Text: "Other" }
            ];
        }
        else {
            $scope.ProofAddressType = [
                { value: "Utility Bill", Text: "Utility Bill (Gas, Heat, Hydro, Water)" },
                { value: "Property Tax Assesment", Text: "Property Tax Assessment" },
                { value: "Canada Pension Plan Statement", Text: "Canada Pension Plan (CPP) Statement" },
                { value: "T4 Statement", Text: "T4 Statement" },
                { value: "Other", Text: "Other" }
            ];
        }
    };

    $scope.initBinding();
    $scope.InitText();
    $scope.Selectcountry = function () {
        $scope.InitText();
    };
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
        var result = baseSvc.postRequest("/Umbraco/Api/Home/SendPersonalEmail", { 'model': $scope.PersonalAccount }).then(function (response) {
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
        $scope.PersonalAccount.Person[0].Dob = moment($scope.PersonalAccount.Person[0].Dob).format('YYYY-MM-DD HH:mm:ss');
        var result = $scope.PostAjax("/Umbraco/Api/Home/SendRegistrationEmail",$scope.PersonalAccount);
        result.then(function (response) {
            //response = JSON.parse(response);
            $scope.PersonalAccount.Person[0].Dob = moment($scope.PersonalAccount.Person[0].Dob);
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
$scope.PostFileAjax = function(url,objdata){
        var deferred = $q.defer();
    $.ajax({
    url: url,
    dataType: "json",
    data: objdata,
    type: "POST",
    contentType:false,
    success: function (data) {
        deferred.resolve(data);
        json = data; },
    error: function (xhr,status,error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
        deferred.reject(xhr);
         }
    }); 
    return deferred.promise;
}
});
