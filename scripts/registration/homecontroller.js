app.controller("HomeController", function ($scope) {
    console.log("HomeController");
    $scope.Account = { AccountType: '', ApplicationCountry: 'ca' };
    //$scope.PersonalAccount = {};
    //$scope.BusinessAccount = {};
    //$scope.PersonalAccount.ApplicationCountry = "ca";
    //$scope.BusinessAccount.ApplicationCountry = "ca";
    $scope.showloader = function () {
        $('.overlay').show();
    }
    $scope.hideloader = function () {
        $('.overlay').hide();
    }
    $scope.Country = [
        { Text: 'Canada', Value: 'ca' },
        { Text: 'United States', Value: 'us' }
    ];
    $scope.Loading = function () {
        $(".se-pre-con").fadeIn("slow");
        $(".se-pre-con").fadeOut("slow");
        $scope.hideloader();
    };
    $scope.OpenCountryModal = function (type) {
        $scope.Account.Account_Type = type;
        if ($scope.Account.Account_Type == "personal") {
            window.location.href = "/Register/PersonalAccount";
        } else {
            window.location.href = "/Register/BusinessAccount";
        }
    };
    $scope.btnRedirect = function () {
        $(".se-pre-con").fadeIn("slow");
        var AccountCountry = $scope.Account.ApplicationCountry;
        //if (AccountType === "personal") {
        //    AccountCountry = $scope.PersonalAccount.ApplicationCountry;
        //}
        //else {
        //    AccountCountry = $scope.BusinessAccount.ApplicationCountry;
        //}
        var AccountType = $scope.Account.Account_Type;
        var queryString = "?ApplicationCountry=" + AccountCountry + "&AccountType=" + AccountType;
        var url = "";
        if (AccountType === 'personal') {
            url = location.origin + "/SignUp/SelectAccount" + queryString;
            window.location.replace(url);
        }
        else {
            url = location.origin + "/SignUp/SelectAccount" + queryString;
            window.location.replace(url);
        }
        $(".se-pre-con").fadeOut("slow");
    };
    $scope.Loading();

});