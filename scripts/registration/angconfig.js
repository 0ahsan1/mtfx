"use strict";
//var app = angular.module("MtfxApp", ['ngRoute', 'ac-address-complete', 'toaster', 'ngAnimate', '720kb.datepicker', 'moment-picker']);
var app = angular.module("MtfxApp", ['ngRoute', 'ac-address-complete', 'toaster', 'ngAnimate', 'moment-picker']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/Setting", {
            templateUrl: "Views/Setting.html",
            controller: "SettingController"
        });
}]);

/*app.constant("MTFxConstants",
    { "AddressKey": '@System.Configuration.ConfigurationManager.AppSettings["AddressKey"].ToString()' }
);
*/