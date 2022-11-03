

mtfxApp.factory("ToolsFactory", ["baseSvc", "$q", function (baseSvc, $q) {
    var obj = {};
    obj.GetCurrencies = function () {
        var query = "/Umbraco/Api/LiveRates/GetMTFXCurrencies";
        return baseSvc.getRequest(query);
    }
    obj.GetMTFXRate = function (ratePair) {
        var query = "/Umbraco/Api/LiveRates/GetMTFXRate?ratePair=" + ratePair;
        return baseSvc.getRequest(query);
    }
    obj.GetMTFXExchangeRates = function (ratePairs) {
        var query = "/Umbraco/Api/LiveRates/GetMTFXAllRates?ratePairs=" + ratePairs;
        return baseSvc.getRequest(query);
    }
    obj.GetMTFXLiveExchangeRates = function (ratePairs) {
        var query = "/Umbraco/Api/LiveRates/GetLiveExchangeRates?ratePairs=" + ratePairs;
        return baseSvc.getRequest(query);
    }
    obj.GetMTFXHistoricalRate = function (ratePair, durationOption) {
        var query = "/Umbraco/Api/LiveRates/GetMTFXHistoricalRate?ratePair=" + ratePair; // +"&durationOption="+ durationOption;
        return baseSvc.getRequest(query);
    }
    obj.GetMTFXHistoricalFrequencyRates = function (ratePair, frequency, count, fromDate, toDate) {
        var query = "/Umbraco/Api/LiveRates/GetMTFXHistoricalFrequencyRates?ratePair=" + ratePair +"&frequency="+ frequency +"&count="+ count +"&fromDate="+ fromDate +"&toDate="+ toDate;
        return baseSvc.getRequest(query);
    }
    obj.GetMTFXHistoricalTableData = function (currencyCode, selectedDate) {
        var query = "/Umbraco/Api/LiveRates/GetMTFXHistoricalTableData?currencyCode=" + currencyCode + "&selectedDate=" + selectedDate;
        return baseSvc.getRequest(query);
    }
    obj.PostHubSpotForm = function (formId, data) {
        return baseSvc.PostHubSpotRequest(formId, data);
    }
    obj.GetMTFXLiveExchangeRates24h = function (currencies, source) {
        var query = "/Umbraco/Api/LiveRates/GetMTFXLiveExchangeRates?currencies=" + currencies + "&source=" + source;
        return baseSvc.getRequest(query);
    }
    obj.GetMTFXLiveExchangeChartData24h = function (currencies, source) {
        var query = "/Umbraco/Api/LiveRates/GetMTFXLiveExchangeChartData?currencies=" + currencies + "&source=" + source;
        return baseSvc.getRequest(query);
    }
    obj.GetEconomicCalendar = function (start, end) {
        var query = "/Umbraco/Api/LiveRates/GetEconomicCalendar?start=" + start + "&end=" + end;
        return baseSvc.getRequest(query);
    }
    
    return obj;
}]);




mtfxApp.controller('ToolsController', ["$scope", "$q","$compile", "ToolsFactory", function ($scope, $q,$compile, ToolsFactory) {
    $scope.isedit = false;
    $scope.CountryList = [];
    $scope.LiveExchangeRatesDefaults = [];
    $scope.AllCurrencyChartData = [];
    $scope.DailyCurrencyChartData = [];
    $scope.WeeklyCurrencyChartData = [];
    $scope.DailyCurrencyChartDataCopyArray = [];
    $scope.supportedCurrenciesWithNames = JSON.parse($('#SupportedCurrenciesWithNames').val());
    $scope.inverseCurrencyList = JSON.parse($('#inverseCurrencyList').val());
    $scope.currenciesWithNames = JSON.parse($('#CurrenciesWithNames').val());
    // $scope.start
    $scope.tabCurrencies = [];
    $scope.bankList = [];
    $scope.DisplayIndex=10;
    $scope.ShowMoreData=false;
    $scope.chartOnlyYearButton = false;
    $("#AddCurrency2").show().css('visibility', 'visible');
    $("#AddCurrency1").hide().css('visibility', 'hidden');
    $scope.countSelect=0;
  
    moment.tz.add("America/New_York|LMT EST EDT EWT EPT|4U.2 50 40 40 40|012121212121212121212121212121212121212121212121213412121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-3tFH0 1nEe0 1nX0 11B0 1nX0 11B0 1qL0 1a10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x40 iv0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|21e6");
    //moment.tz.add("America/Chicago|LMT CST CDT EST CWT CPT|5O.A 60 50 50 50 50|012121212121212121212121212121212121213121212121214512121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-3tFG0 1nEe0 1nX0 11B0 1nX0 1wp0 TX0 WN0 1qL0 1cN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 11B0 1Hz0 14p0 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 RB0 8x30 iw0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1o10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1cN0 1cL0 1cN0 1cL0 s10 1Vz0 LB0 1BX0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 1cN0 1fz0 1a10 1fz0 1cN0 1cL0 1cN0 1cL0 1cN0 1cL0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Rd0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0 Op0 1zb0|92e5");
     
    $scope.getName = function () {
                $scope.name = $scope.name;
                $scope.email = $scope.email;
            };
  
        
        $scope.countryCurrencyArray = [
            {id:1,countrycode:'AU',currency:'AUD',countryName:'Australia',Selected: false},
            {id:2,countrycode:'CA',currency:'CAD',countryName:'Canada',Selected: true},
            {id:3,countrycode:'CN',currency:'CNY',countryName:'China',Selected: false},
            {id:4,countrycode:'EU',currency:'EUR',countryName:'Europe',Selected: true},
            {id:5,countrycode:'JP',currency:'JPY',countryName:'Japan',Selected: false},
            {id:6,countrycode:'NZ',currency:'NZD',countryName:'New Zealand',Selected: false},
            {id:7,countrycode:'CH',currency:'CHF',countryName:'Switzerland',Selected: false},
            {id:8,countrycode:'GB',currency:'GBP',countryName:'United Kingdom',Selected: true},
            {id:9,countrycode:'US',currency:'USD',countryName:'United States of America',Selected: true},
        // ]
        // $scope.countryCurrencyArray2 = [
            {id:10,countrycode:'AT',currency:'EUR',countryName:'Austria',Selected: false},
            {id:11,countrycode:'BE',currency:'EUR',countryName:'Belgium',Selected: false},
            {id:12,countrycode:'FI',currency:'EUR',countryName:'Finland',Selected: false},
            {id:13,countrycode:'FR',currency:'EUR',countryName:'France',Selected: false},
            {id:14,countrycode:'DE',currency:'EUR',countryName:'Germany',Selected: false},
            {id:15,countrycode:'GR',currency:'EUR',countryName:'Greece',Selected: false},
            {id:16,countrycode:'IE',currency:'EUR',countryName:'Ireland',Selected: false},
            {id:17,countrycode:'IT',currency:'EUR',countryName:'Italy',Selected: false},
            {id:18,countrycode:'NL',currency:'EUR',countryName:'Netherlands',Selected: false},
            {id:19,countrycode:'PT',currency:'EUR',countryName:'Portugal',Selected: false},
            {id:20,countrycode:'ES',currency:'EUR',countryName:'Spain',Selected: false},
        ]
        $scope.countryCurrencyArray.sort();
        
      $scope.impactArray = [
            {impactName:'None',Selected: false},
            {impactName:'Low',Selected: false},
            {impactName:'Medium',Selected: true},
            {impactName:'High',Selected: true},
        ]
      
      
      $scope.defaultarr = $scope.countryCurrencyArray.filter(item => item.Selected==false);
      $scope.defaultarrImpact = $scope.impactArray.filter(item => item.Selected==false);
   
   
    
   
    //Chart
    $scope.currentChart = null;
    $scope.currentChartID = 1; 
    
    $scope.initBinding = function (pagename) {
        
        $scope.BuyPrice=10000;
        var today = new Date();
        today.setDate(today.getDate() - 1);
        $('#txt_historicaldate').datepicker({
            autoclose: true,
            endDate: today
        });
        
        $scope.mtfxExchangeRateBuffer = $('#mtfxExchangeRateBuffer').val();
        $scope.tickInterval = parseInt($('#tickInterval').val());
        $scope.mobileTickInterval = parseInt($('#mobileTickInterval').val());
        $scope.minimum = parseInt($('#minimum').val());
        $scope.bankList = JSON.parse($('#Banks').val());
        $(".chartcurrentDateTime").text(moment().format("LLL"));
        $(".conversionDateTime").text(moment().format("LLL"));
        $scope.isLoaded = false;
        $scope.currencyChangeCount = 0;
        $scope.currencyCodeChangeCount = 0;
        $scope.CurrencyConverterValue = 1;
        $scope.SendingAmount = "10000";
        $scope.currenciesWithNames = JSON.parse($('#CurrenciesWithNames').val());
        $scope.supportedCurrenciesWithNames = JSON.parse($('#SupportedCurrenciesWithNames').val());
        $scope.FromCurrencyCode = $('#FromCurrencyCode').val();
        $scope.ToCurrencyCode = $('#ToCurrencyCode').val();
        
        
       
       // EconomicCalendar code start
        $scope.EconomicCurrency = {
            code: $scope.ToCurrencyCode,
            name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.ToCurrencyCode }).name
        };
        // EconomicCalendar code end
       
        //Currency Converter
        $scope.CurrencyConverterFrom = {
            code: $scope.FromCurrencyCode,
            name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.FromCurrencyCode }).name
        };
        $scope.CurrencyConverterTo = {
            code: $scope.ToCurrencyCode,
            name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.ToCurrencyCode }).name
        };
        
        //Chart Converter
        $scope.ChartCurrencyConverterFrom = {
            code: $scope.FromCurrencyCode,
            name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.FromCurrencyCode }).name
        };
        $scope.ChartCurrencyConverterTo = {
            code: $scope.ToCurrencyCode,
            name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.ToCurrencyCode }).name
        };
        
        //Historical
        $scope.HistoricalCurrency = {
            code: $scope.ToCurrencyCode,
            name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.ToCurrencyCode }).name
        };
        
        //Historical Rates
        $scope.SelectedFrequency = 'days';
        $scope.SelectedFromDate;
        $scope.SelectedToDate;
        
        //LiveExchangeRate
        $scope.LiveExchangeRateCurrency;
        $scope.LiveExchangeRateRegion;
        
        //Alert chart
        $scope.CRABuyCurrencyIso = {
            code: $scope.FromCurrencyCode,
            name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.FromCurrencyCode }).name
        };
        $scope.CRASellCurrencyIso = {
            code: $scope.ToCurrencyCode,
            name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.ToCurrencyCode }).name
        };
        $("#BuyCurrencyIsoValue").val($scope.CRABuyCurrencyIso.code);
        $("#SellCurrencyIsoValue").val($scope.CRASellCurrencyIso.code);
        $scope.ContactUSCountry = {
            code: $scope.FromCurrencyCode
        };
        $("#ContactUSCountry").val($scope.FromCurrencyCode);
        $scope.LiveExchangeRateCurrency = {
            code: $scope.FromCurrencyCode
        };
        $scope.RateWatchFrom = {
            code: $scope.FromCurrencyCode
        };
        $scope.RateWatchTo = {
            code: $scope.ToCurrencyCode
        };
        $("#RateWatchFromValue").val($scope.RateWatchFrom.code);
        $("#RateWatchToValue").val($scope.RateWatchTo.code);
        //Currency Chart
        $scope.CurrencyChartFrom = {
            code: $scope.FromCurrencyCode,
            name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.FromCurrencyCode }).name
        };
        $scope.CurrencyChartTo = {
            code: $scope.ToCurrencyCode,
            name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.ToCurrencyCode }).name
        }
        $scope.defaultChartPair1 = $('#defaultChartPair1').val();
        $scope.defaultChartPair2 = $('#defaultChartPair2').val();
        $scope.defaultChartPair3 = $('#defaultChartPair3').val();
        $scope.defaultChartPair4 = $('#defaultChartPair4').val();
        $scope.CountryList = JSON.parse($('#CountryList').val());
        $scope.LiveExchangeRatesDefaults = JSON.parse($('#LiveExchangeRatesDefaults').val());
        $scope.ConnectCountry = JSON.parse($('#CountryList').val())[0];
        $scope.CurrencyChartFrom = {
                    code: $scope.defaultChartPair1.split('-')[0].toUpperCase(),
                    name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.defaultChartPair1.split('-')[0].toUpperCase() }).name
                };
        $scope.CurrencyChartTo = {
            code: $scope.defaultChartPair1.split('-')[1].toUpperCase(),
                    name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.defaultChartPair1.split('-')[1].toUpperCase() }).name
        };
        $scope.CurrencyChartRate = 0;
        $scope.CurrencyChartFrom2 = {
            code: $scope.defaultChartPair2.split('-')[0]
        };
        $scope.CurrencyChartTo2 = {
            code: $scope.defaultChartPair2.split('-')[1]
        };
        $scope.CurrencyChartFrom3 = {
            code: $scope.defaultChartPair3.split('-')[0]
        };
        $scope.CurrencyChartTo3 = {
            code: $scope.defaultChartPair3.split('-')[1]
        };
        $scope.CurrencyChartFrom4 = {
            code: $scope.defaultChartPair4.split('-')[0]
        };
        $scope.CurrencyChartTo4 = {
            code: $scope.defaultChartPair4.split('-')[1]
        };
     
        $("#economic-date-range-picker").on("change",function(start, end){
        var selected = $(this).val();
        var fromdate="";
        var todate="";
        if (selected.replace(' ','').split('-').length>0) 
        {
            fromdate=selected.replace(' ','').split('-')[0].replace(' ','')
            todate=selected.replace(' ','').split('-')[1].replace(' ','');
            
            fromdate = moment(fromdate).format('YYYY-MM-DD');
            todate = moment(todate).add(1,"days").format('YYYY-MM-DD');
        }
            $scope.GetMTFXEconomicCalendar(fromdate, todate);
        });
        
        $(".NumberField").keypress(function (e) {
            //if the letter is not digit then display error and don't type anything
            if (e.which != 46 && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                //display error message
                return false;
            }
        });

        switch (pagename) {
            case "Home-Page-Tools":
                $scope.PrepairCompareChart();
                break;
            case "Landing-page-Tools":
                $scope.ConvertCurrency(null);
                setTimeout(function () {
                    $scope.RenderCurrencyChart();
                }, 100);
                break;
            case "mtfx-economic-calendar":
                if ($('#economic-date-range-picker').val().length){
                    $('input[name="daterange"]').daterangepicker({
                      opens: 'right',
                      ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                      },
                      locale: {
                        cancelLabel: 'Close'
                      }
                    });
                  }
                break;
            case "currency-chart":
                setTimeout(function () {
                    $scope.RenderCurrencyChart();
                }, 100);
                break;
            case "mtfx-rate-calculator":
                $scope.ConvertCurrency(null);
                $scope.CreateRateCalulatorChart();
                break;
                
            case "live-exchange-rates":
                setTimeout(function () {
                    $scope.CreateLiveExchangeTool(false);
                }, 100);
                break;
            case "historical-data":
                setTimeout(function () {
                    $scope.BuildHistorical($scope.DisplayIndex);
                }, 100);
                break;
            case "historical-rates-data":
                 
                // setTimeout(function () {
                //     $scope.BuildHistoricalRates();
                //     $('input[name="daterange"]').daterangepicker({
                //       maxDate: moment().subtract(1, 'days'),
                //       //startDate: moment().subtract(1, 'days'),
                //       //autoUpdateInput: false,
                       
                //       locale: {
                //         cancelLabel: 'Close'
                //       },
                     
                //     }, function(fromDate, toDate, label) {
                      
                //     });
                //     $('input[name="daterange"]').val($('input[name="daterange"]').attr("placeholder"));
                //     // custom date range picker code start
                //     $("#custom-range-picker").on('apply.daterangepicker',function(fromDate, toDate){
                        
                //         if($('input[name="daterange"]').val() != $('#daterange').attr("placeholder"))
                //         {
                //             $scope.SelectedFrequency = 'custom-range';
                //             var selected = $(this).val();
                //             var fromDate="";
                //             var toDate="";
                //             if (selected.replace(' ','').split('-').length>0) {
                //                         fromDate=selected.replace(' ','').split('-')[0].replace(' ','')
                //                 toDate=selected.replace(' ','').split('-')[1].replace(' ','');
                                
                //                 fromDate = moment(fromDate).format('YYYY-MM-DD');
                //                 toDate = moment(toDate).format('YYYY-MM-DD');
                //             }
                //                 $scope.SelectedFromDate = fromDate;
                //                 $scope.SelectedToDate = toDate;
                //                 $scope.BuildHistoricalRates();
                //                 $(".btn-primary").removeClass("active");
                //         }
                //     });
                //     $('input[name="daterange"]').on('cancel.daterangepicker', function(ev, picker) {
                //       $(this).val('');
                //   });
                //     // custom date range picker code end 
                // }, 100);
                
                
                
                setTimeout(function () {
                    $scope.BuildHistoricalRates();
                    
                    $('input[name="daterange"]').daterangepicker({
                      autoUpdateInput: false,
                      maxDate: moment().subtract(1, 'days'),
                      locale: {
                          cancelLabel: 'Close'
                      }
                  });
                
                  $('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
                      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
                      if($('input[name="daterange"]').val() != $('#daterange').attr("placeholder"))
                        {
                            $scope.SelectedFrequency = 'custom-range';
                            var selected = $(this).val();
                            var fromDate="";
                            var toDate="";
                            if (selected.replace(' ','').split('-').length>0) {
                                        fromDate=selected.replace(' ','').split('-')[0].replace(' ','')
                                toDate=selected.replace(' ','').split('-')[1].replace(' ','');
                                
                                fromDate = moment(fromDate).format('YYYY-MM-DD');
                                toDate = moment(toDate).format('YYYY-MM-DD');
                            }
                                $scope.SelectedFromDate = fromDate;
                                $scope.SelectedToDate = toDate;
                                $scope.BuildHistoricalRates();
                                $(".btn-primary").removeClass("active");
                        }
                  });
                
                  $('input[name="daterange"]').on('cancel.daterangepicker', function(ev, picker) {
                      $(this).val('');
                  });
                    // custom date range picker code end 
                }, 100);
                
                
                
                
                
                
                
                
                break;
            case "currency-rate-alerts":
                $scope.ConvertCurrencyForAlert();
                break;
            case "Currency-Compare":
                $scope.PrepairCompareChart();
                break;
            case "currency-chart-tools":
                $scope.GetCurrencyParameters();
                break;
            case "currency-chart-new-tools":
                $scope.getQueryString();
                break;
            case "default":
                console.log("default log...");
                break;
        }
        
        $scope.HiddenMetaTitle = $scope.HiddenMetaTitle != null ? $scope.HiddenMetaTitle : window.document.title;
        $scope.isLoaded = true;
        $scope.objRateWatch = {
            'RateWatchFrom': {
                code: $scope.FromCurrencyCode
            },
            'RateWatchTo': {
                code: $scope.ToCurrencyCode
            },
            'targetRate': '',
            'exchangeAmount': '',
            'alertvia': 'email',
            'Email': '',
            'Name': '',
            'PhoneNumber': ''
        };
        $scope.objRateEmail = {
            'FirstName': '',
            'LastName': '',
            'PhoneNumber': '',
            'Email': '',
            'Subject': '',
            'Message': '',
            'alertvia': 'email',
            'IsAgreeToCommunicate': 'Yes',
        };
        $scope.objCommentary = {
            'Name': '',
            'Email': '',
            'Informed': 'Daily'
        };
        $scope.arrayLiveExchange = [];
        $scope.matrixArr1 = [];
        $scope.matrixArr2 = [];
        if ($('#LiveExchangeRates').val() != undefined) {
            $scope.LiveExchangeRates = JSON.parse($('#LiveExchangeRates').val());
            angular.forEach($scope.LiveExchangeRates, function (value, key) {
                var objFlagWithCode = {};
                objFlagWithCode.flag = value.trim().slice(0, 2).toLowerCase();
                objFlagWithCode.code = value.trim();
                $scope.matrixArr1.push(objFlagWithCode);
                $scope.matrixArr2.push(objFlagWithCode);
            });
        }
        
        
        $scope.HistoricalViewYearChart = function (){
            if ($("#HistoricalCurrencyChartContainer").val() != null) {
                var fromcurrency = $scope.CurrencyConverterFrom.code;
                var tocurrency = $scope.CurrencyConverterTo.code;
            $scope.isedit = false;
            $scope.message = " ";
            $scope.showmessage = false;
            if($scope.CurrencyConverterFrom.code==$scope.CurrencyConverterTo.code)
            {
                $scope.showmessage = true;
                
               
                setTimeout(function() {
                $scope.$apply(function () {

                const dfrom = localStorage.getItem('savedfromcurrency');
                $scope.CurrencyConverterFrom = JSON.parse(dfrom);
                
                const dto = localStorage.getItem('savedtocurrency');
                $scope.CurrencyConverterTo= JSON.parse(dto);

                 $scope.changeThisForMe = true;

});
 }, 500);
               
            }
            else
            {
                $scope.showmessage = false;
                $("#HistoricalCurrencyChartContainer").empty();
                $("#HistoricalCurrencyChartContainer").append("<div class='loading-div-wrapper'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
                $scope.GetChartData(fromcurrency, tocurrency)
                .then(function (response) {
                    $("#HistoricalCurrencyChartContainer").empty();
                    $scope.prepareHistoricalYearChart();
                });
                localStorage.setItem("savedfromcurrency", JSON.stringify($scope.CurrencyConverterFrom));
                localStorage.setItem("savedtocurrency", JSON.stringify($scope.CurrencyConverterTo));
                }
            }
        }
        
        var NewURL = "";
        var myStrAMT = $scope.SendingAmount;
        myStrAMT = myStrAMT.replace(/,/g, "");
        $scope.BuyPrice = $scope.BuyPrice != null ? $scope.BuyPrice : window.document.title;
        NewURL ="/tools/currency-rate-alerts/?from="+$scope.CurrencyConverterFrom.code+"&to="+$scope.CurrencyConverterTo.code+"&amount="+myStrAMT+""; //$scope.updateQueryStringParameters('from', $scope.CurrencyConverterFrom.code);
        $('#getAlertRates').attr('href', NewURL);
        
        $scope.RenderCurrencyChart = function () {
            if ($('#ChartsTab').length > 0) {
                $scope.GetChartRate($scope.CurrencyChartFrom.code, $scope.CurrencyChartTo.code)
                .then(function (response) {
                    $scope.CurrencyChartRate = response;
                    return $scope.GetChartRate($scope.CurrencyChartFrom2.code, $scope.CurrencyChartTo2.code)
                    .then(function (response) {
                        $scope.CurrencyChartRate2 = response;
                        return $scope.GetChartRate($scope.CurrencyChartFrom3.code, $scope.CurrencyChartTo3.code)
                        .then(function (response) {
                            $scope.CurrencyChartRate3 = response;
                            return $scope.GetChartRate($scope.CurrencyChartFrom4.code, $scope.CurrencyChartTo4.code)
                            .then(function (response) {
                                $scope.CurrencyChartRate4 = response;
                                var hash = window.location.hash;
                                var chartid = parseInt(hash.replace(/[^0-9]/gi, ''));
                                if (hash != "" && hash != undefined && !isNaN(chartid)) {
                                    $scope.CreateChart(chartid);
                                } else {
                                    $scope.CreateChart(1);
                                }
                            });
                        });
                    });
                });
            }
        }
        
        $scope.InverseBtn = false;
        $scope.DefaultAmount = '1.00000';
        $scope.today = '';
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        var month = date.toLocaleString('default', { month: 'long' })
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        $scope.today = month + ' ' + date.getDate() + ', ' + date.getFullYear()+' ' + hours + ':' + minutes + ' ' + ampm;
        $scope.CurrencyCompareAmount = $scope.compareChartDefaultValue;
        $scope.addCommasintextbox($scope.CurrencyCompareAmount, "CurrencyCompareAmount");
        //$scope.PrepairCompareChart();//js
        $scope.newCurrency = [];
        $scope.data = [];
        
        $scope.LiveExchangeRateCurrencys = { code: "CAD", flag: "ca" };
        $scope.currencyName = "Canadian Dollar";
		$scope.currencies = "";
		
        if ($('#IsToolsLiveExchangeRates').val() != undefined) {
            if (localStorage.getItem("newToolsConvertCurrency") === null || localStorage.getItem("newToolsConvertCurrency") === "") {
                $scope.LiveExchangeRateCurrencys = { code: "CAD", flag: "ca" };
                localStorage.setItem("newToolsConvertCurrency", $scope.LiveExchangeRateCurrencys.code);
                $scope.currencyName = "Canadian Dollar"
            }
            else {
                $scope.LiveExchangeRateCurrencys.code = localStorage.getItem("newToolsConvertCurrency");
                $scope.LiveExchangeRateCurrencys.flag = $scope.getFlagCode($scope.LiveExchangeRateCurrencys.code).toLowerCase();
                for (var i = 0; i < $scope.currenciesWithNames.length; i++) {
                    if ($scope.LiveExchangeRateCurrencys.code == $scope.currenciesWithNames[i].code){
                        $scope.currencyName = $scope.currenciesWithNames[i].name;
                    }
               }
            }
            
            if (localStorage.getItem("newToolsCurrency") === null || localStorage.getItem("newToolsCurrency") === "" || localStorage.getItem("newToolsCurrency") === "[]" || localStorage.getItem("newToolsCurrency") ==="null") {
                $scope.currencies = $scope.LiveExchangeRatesDefaults.join(',');//"USD,EUR,GBP,JPY,CHF,AUD,NZD,INR,MXN";
            } else {
                $scope.newCurrency = JSON.parse(localStorage.getItem("newToolsCurrency"));
                
                for (var i = 0; i < $scope.newCurrency.length; i++) {
                    $scope.currencies += $scope.newCurrency[i].code;
                    if (i != $scope.newCurrency.length - 1) $scope.currencies += ',';
                }
    		}
        }else{
            if (localStorage.getItem("newConvertCurrency") === null || localStorage.getItem("newConvertCurrency") === "") {
                $scope.LiveExchangeRateCurrencys = { code: "CAD", flag: "ca" };
                localStorage.setItem("newConvertCurrency", $scope.LiveExchangeRateCurrencys.code);
                $scope.currencyName = "Canadian Dollar"
            }
            else {
                $scope.LiveExchangeRateCurrencys.code = localStorage.getItem("newConvertCurrency");
                $scope.LiveExchangeRateCurrencys.flag = $scope.getFlagCode($scope.LiveExchangeRateCurrencys.code).toLowerCase();
                for (var i = 0; i < $scope.currenciesWithNames.length; i++) {
                    if ($scope.LiveExchangeRateCurrencys.code == $scope.currenciesWithNames[i].code){
                        $scope.currencyName = $scope.currenciesWithNames[i].name;
                    }
               }
            }
            
            if (localStorage.getItem("newCurrency") === null || localStorage.getItem("newCurrency") === "" || localStorage.getItem("newCurrency") === "[]" || localStorage.getItem("newCurrency") ==="null") {
                $scope.currencies = "USD,EUR,GBP";
            } else {
                $scope.newCurrency = JSON.parse(localStorage.getItem("newCurrency"));
                
                for (var i = 0; i < $scope.newCurrency.length; i++) {
                    $scope.currencies += $scope.newCurrency[i].code;
                    if (i != $scope.newCurrency.length - 1) $scope.currencies += ',';
                }
    		}
        }
        $scope.resetExchangeRateCurrencies();
		let table = document.querySelector('table');
        if(table != null){
            $scope.GetMTFXExchangeRates24h($scope.currencies, $scope.LiveExchangeRateCurrencys.code).then(function (canadarate) {
                $scope.newCurrency = [];
                $scope.LiveExchangeRates24h = JSON.parse($scope.LiveExchangeRates24h);
                for (var i = 0; i<$scope.LiveExchangeRates24h.length; i++) {
                    var newCurrencyObj = {};
                    if($scope.inverseCurrencyList.some(el => el.code === $scope.LiveExchangeRates24h[i].RatePair.slice(-3))){
                        newCurrencyObj.amount = $scope.LiveExchangeRates24h[i].Amount; 
                        newCurrencyObj.ratepair = $scope.LiveExchangeRates24h[i].RatePair;
                        newCurrencyObj.changecolour = $scope.GetExchangeRatesChangeColor($scope.LiveExchangeRateCurrencys.code,$scope.LiveExchangeRates24h[i].RatePair.slice(-3),$scope.LiveExchangeRates24h[i].ChangePercent);
                        //newCurrencyObj.changeper = $scope.LiveExchangeRates24h[i].ChangePercent.toFixed(2) + "%";
                        newCurrencyObj.changeper = $scope.GetExchangeRatesChangePer($scope.LiveExchangeRates24h[i].ChangePercent.toFixed(2) + "%",newCurrencyObj.changecolour);
                        newCurrencyObj.data = $scope.LiveExchangeRates24h[i].ChartData;
                        newCurrencyObj.code = $scope.LiveExchangeRates24h[i].RatePair.slice(-3);
                        newCurrencyObj.flag = $scope.getFlagCode($scope.LiveExchangeRates24h[i].RatePair.slice(-3)).toLowerCase();
                    } else {
                        newCurrencyObj.amount = parseFloat((1 / $scope.LiveExchangeRates24h[i].Amount).toFixed(5));
                        newCurrencyObj.ratepair = $scope.LiveExchangeRates24h[i].RatePair;
                        newCurrencyObj.changecolour = $scope.GetExchangeRatesChangeColor($scope.LiveExchangeRateCurrencys.code,$scope.LiveExchangeRates24h[i].RatePair.slice(-3),$scope.LiveExchangeRates24h[i].ChangePercent,true);
                        //newCurrencyObj.changeper =  -($scope.LiveExchangeRates24h[i].ChangePercent.toFixed(2)) + "%";
                        newCurrencyObj.changeper = $scope.GetExchangeRatesChangePer(($scope.LiveExchangeRates24h[i].ChangePercent.toFixed(2)) + "%",newCurrencyObj.changecolour,true);
                        newCurrencyObj.data = $scope.LiveExchangeRates24h[i].ChartData;
                        newCurrencyObj.code = $scope.LiveExchangeRates24h[i].RatePair.slice(-3);
                        newCurrencyObj.flag = $scope.getFlagCode($scope.LiveExchangeRates24h[i].RatePair.slice(-3)).toLowerCase();
                    }
                    $scope.newCurrency.push(newCurrencyObj);
                }
               if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                    localStorage.setItem("newToolsCurrency", JSON.stringify($scope.newCurrency));
                }else{
                    localStorage.setItem("newCurrency", JSON.stringify($scope.newCurrency));
                }
                $scope.resetExchangeRateCurrencies();
                for (var i = 0; i < $scope.newCurrency.length; i++) {
                    if(i != 0){
                        $("#add" + $scope.newCurrency[i - 1].ratepair).remove();
                    }
                    $scope.AddDynamicRow($scope.newCurrency[i].ratepair, $scope.newCurrency[i].flag, $scope.newCurrency[i].code, $scope.newCurrency[i].amount, $scope.newCurrency[i].changecolour, $scope.newCurrency[i].changeper, $scope.LiveExchangeRateCurrencys.code,$scope.InverseBtn);
                }
                /*$("#fixbase").hide().css("display","none");
                $("#basedropdown").show().css("display","block");*/
                if($scope.newCurrency.length <= 1){
                    $("#delete" + $scope.newCurrency[0].ratepair).remove();
                    /*$("#fixbase").show().css("display","block");
                    $("#basedropdown").hide().css("display","none");*/
                }
                $scope.isLoaded = true;
                var currencies = $scope.currencies.split(',');
                for (var i = 0; i < currencies.length; i++) {
                    $("#currencyExchangeratesChart" + $scope.LiveExchangeRateCurrencys.code + currencies[i]).empty();
                    $("#currencyExchangeratesChart" + $scope.LiveExchangeRateCurrencys.code + currencies[i]).append("<div class='loading-div-wrapper' style='min-height: 50px;'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
                }
                $scope.GetMTFXExchangeChartData($scope.currencies, $scope.LiveExchangeRateCurrencys.code).then(function (canadarate) {
                    $scope.LiveExchangeChartData24h = JSON.parse($scope.LiveExchangeChartData24h);
                    $scope.chartarray = [];
                    for (var i = 0; i < $scope.LiveExchangeChartData24h.length; i++) {
                        var newChartObj = {};
                        $scope.data = $scope.LiveExchangeChartData24h[i].ChartData;
                        if(!($scope.inverseCurrencyList.some(el => el.code === $scope.LiveExchangeRates24h[i].RatePair.slice(-3)))){
                            for (var j = 0; j < $scope.data.length; j++) {
                                $scope.data[j] = ($scope.data[j] < 0) ? Math.abs($scope.data[j]) : -$scope.data[j];
                            }
                        }
                        var ratepair = $scope.LiveExchangeChartData24h[i].RatePair;
                        $scope[ratepair] = $scope.data;
                        newChartObj.data = $scope.data;
                        newChartObj.ratepair = ratepair;
                        $scope.chartarray.push(newChartObj);
                        localStorage.setItem("ChartData", JSON.stringify($scope.chartarray));
                        $("#currencyExchangeratesChart" + $scope.LiveExchangeChartData24h[i].RatePair).empty();
                        $scope.BindChart($scope.LiveExchangeChartData24h[i].RatePair);
                    }
                }).catch(function (error) {
                    //console.error("Data is not available for this Pair!")
                    //console.error(error);
                });
            }).catch(function (error) {
                console.error("Data is not available for this Pair!")
                console.error(error);
            });
        }
    }
   
   
    //economic calendar tool start
    //economic calendar data start
    $scope.GetMTFXEconomicCalendar = function (start, end) {
        var deferred = $q.defer();
        ToolsFactory.GetEconomicCalendar(start, end)
        .then(function (response) {
            if (response != null) {
                $scope.EconomicCalendar = response;
                $scope.EconomicCalendarTable(response);
            } else {
                console.error("Data is not available!");
            }
            deferred.resolve(true);
        }).catch(function (response) {
            deferred.resolve(false);
        });
        return deferred.promise;
    };
   
    //economic calendar data end	
   
    // get the data table value economic calendar start
    $scope.EconomicCalendarTable = function (Data) {
        $scope.economicData = JSON.parse(JSON.stringify(Data));
        $('#economic-div').html('');
        economicTable = $('<table id="EconomicTable"></table>').attr({
            class: ["table", "table-hover", "cmn-table", "dataTable", "no-footer"].join(' ')
        }, {
            'style': 'width: 100%'
        });
        
        tableHeader = $('<thead></thead>');
        var row = $('<tr></tr>').appendTo(tableHeader);
        $('<th class="th-time"></th>').text("Time").appendTo(row);
        $('<th class="th-event"></th>').text("Event").appendTo(row);
        $('<th class="th-actual"></th>').text("Actual").appendTo(row);
        $('<th class="th-previous"></th>').text("Previous").appendTo(row);
        $('<th class="th-consensus"></th>').text("Consensus").appendTo(row);
        $('<th class="th-impact"></th>').text("Impact").appendTo(row);
        $('<th class="th-action"></th>').appendTo(row);
        tableHeader.appendTo(economicTable);
        
        
        var selectedCountries = $scope.countryCurrencyArray.filter((country)=> country.Selected == true).map((c)=>{ return c.countrycode;});
        //storing array in localStorage selectedCountries value
        localStorage.setItem("selectedCountriesLocal", JSON.stringify(selectedCountries)); //store selectedCountries
        var storedSelectedCountriesLocal = JSON.parse(localStorage.getItem("selectedCountriesLocal")); //get them back
        
        selectedImpact=Array();                                     
        $("input:checkbox[name=checkboxImpact]:checked").each(function(){selectedImpact.push($(this).val());});  
        //storing array in localStorage selectedImpact value
        localStorage.setItem("selectedImpactLocal", JSON.stringify(selectedImpact)); //store selectedImpact
        $scope.storedselectedImpactLocal = JSON.parse(localStorage.getItem("selectedImpactLocal")); //get them back
        
        // add this line for Filter on event
        $scope.economicData = $scope.economicData.filter((fmData)=> selectedCountries.includes(fmData.country) && (selectedImpact.length == 0 || selectedImpact.includes(fmData.impact)) && ($scope.searchText == undefined ||$scope.searchText == '' || fmData.event.includes($scope.searchText)));
        
        $scope.economicData.forEach((item)=>{ item.date = moment(item.date).utc(item.date).tz('America/New_York').format('YYYY-MM-DD HH:mm:ss'); });
        //$scope.economicData.forEach((item)=>{ item.date = moment(item.date).utc(item.date).tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss'); });
        
        const groups = $scope.economicData.reduce((groups, uniqueData) => {
        const date = uniqueData.date.split(' ')[0];
        if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(uniqueData);
          return groups;
        }, {});
        
        const groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            uniqueData: groups[date],
          };
        });
        
        if(groupArrays.length==0)
        {
            $scope.disabledFlag = true;
        }
        groupArrays.sort().reverse(); // Print the array data in reverse
        tableBody = $('<tbody></tbody>');
        
        var selected = $("#economic-date-range-picker").val();
        var prevdate="";
        var nextdate="";
        if (selected.replace(' ','').split('-').length>0) 
        {
            prevdate=selected.replace(' ','').split('-')[0].replace(' ','')
            nextdate=selected.replace(' ','').split('-')[1].replace(' ','');
            prevdate = moment(prevdate).add(-1,"days").format('YYYY-MM-DD');
            nextdate = moment(nextdate).add(1,"days").format('YYYY-MM-DD');
        }
            
        for(var i=0; i<groupArrays.length; i++)
        {
            $scope.disabledFlag = false;
            $scope.arraydate = moment(groupArrays[i].date).format('YYYY-MM-DD');
            if(prevdate != $scope.arraydate && nextdate != $scope.arraydate)
            {   
                var row = $('<tr></tr>').appendTo(tableBody);
                
                $('<td class="td-date" colspan="7"></td>').text(moment(groupArrays[i].date).format('dddd, MMMM DD')).appendTo(row);
                 
                groupArrays[i].uniqueData.reverse()
                for(j=0; j<groupArrays[i].uniqueData.length; j++)
                {   
                    var rowId = "hidden_row"+i+"_"+j;
                    var row = $('<tr onclick="showHideEconomicRow(\''+rowId+'\');"></tr>').appendTo(tableBody); //
                    
                    $('<td class="td-time"></td>').text(moment(groupArrays[i].uniqueData[j].date).format('HH:mm')).appendTo(row);
                    
                    var currencyCode = $('<td class="td-currency-code"></td>').appendTo(row);
                    flagContent = $('<div class="comman-flag-content-cell"></div>').appendTo(currencyCode);
                    
                    var contryLower = groupArrays[i].uniqueData[j].country.toLowerCase()
                    var countryName = groupArrays[i].uniqueData[j].country
                    
                        $('<span class="flag-icon flag-icon-'+contryLower+' flag-icon-squared"></span>').appendTo(flagContent);
                        var selectedCountry = groupArrays[i].uniqueData[j].country;
                        var selectedCurrenciess = $scope.countryCurrencyArray.filter(v => v.countrycode === selectedCountry);
                        var selectedCurrencies = selectedCurrenciess[0].currency;
                        $('<strong></strong>').text(selectedCurrencies).appendTo(flagContent);
                        $('<h4></h4>').text(groupArrays[i].uniqueData[j].event).appendTo(flagContent);
                        
                        $('<td class="td-actual"></td>').text(groupArrays[i].uniqueData[j].actual).appendTo(row);
                        $('<td class="td-previous"></td>').text(groupArrays[i].uniqueData[j].previous).appendTo(row);
                        $('<td class="td-consensus"></td>').text(groupArrays[i].uniqueData[j].change).appendTo(row);
                        
                        var impact = groupArrays[i].uniqueData[j].impact.toLowerCase()
                        if(impact == "high"){
                            $('<td class="td-impact"><div class="progress"><div class="progress-bar high-status" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div></div></td>').appendTo(row);
                        }
                        else if(impact == "medium"){
                            $('<td class="td-impact"><div class="progress"><div class="progress-bar medium-status" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div></div></td>').appendTo(row);
                        }
                        else{
                            $('<td class="td-impact"><div class="progress"><div class="progress-bar low-status" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div></div></td>').appendTo(row);
                        }
                        $('<td class="td-action"><div class="action-button"><a href="javascript:;" class="cmn-action-btn"><i class="fa fa-chevron-down" aria-hidden="true"></i></a></div></td>').appendTo(row);
                        
                        $('<div ng-repeat="eventObj in card"><addtocalendar start-date="{{eventObj.StartDate}}" end-date="{{eventObj.EndDate}}" title="{{eventObj.Name}}" location="{{eventObj.Venue}}" class-name="btn btn-sm btn-default dropdown-toggle" description="{{eventObj.Description}}"></addtocalendar></div>');
                        
                        var hiddenRow = $('<tr id="'+rowId+'" style="display: none;" class="hidden_row row-expand-main" > </tr>').appendTo(tableBody);
                        if(selectedCurrencies == "CAD")
                        {
                            selectedCurrencies = "USD";
                        }
                        var apiHiddenRow = $('<td colspan=7><ul class="row-expand-list"><li><a href="/currency-updates/"><img src="/media/4zibhhlb/details-icon.svg"/><span>Details</span></a></li><li><a href="/tools/currency-charts/?from=CAD&to='+selectedCurrencies+'"><img src="/media/whihdrhv/charts-icon.svg"/><span>Charts</span></a></li><li><a href="javascript:void()" onclick="createIcsFile(\''+groupArrays[i].uniqueData[j].date+'\',\''+selectedCurrencies+'\',\''+groupArrays[i].uniqueData[j].event+'\')"><img src="/media/rpuloepi/add-event-icon.svg"/><span>Add Event</span></a></li><li><a href="/tools/currency-rate-alerts/?from=CAD&to='+selectedCurrencies+'"><img src="/media/ha4d0hae/money-transfer-icon.svg"/><span>Money Transfer</span></a></li><li><a href="#"><img src="/media/kokglbtx/share-icon.svg"/><span>Share</span></a></li></ul></td>').appendTo(hiddenRow);
                    }
                    tableBody.appendTo(economicTable);
                }
        }
         // economicTable.appendTo("#economic-div");
        //----- DataTable -----
        $("#EconomicTable").DataTable({
                "paging": false,
                "ordering": true,
                 "destroy": true,
                 "searching":false,
                "bInfo" : false,
                responsive: true,
                language: {
                    "emptyTable": "No data available"
                }
        });
        economicTable.appendTo("#economic-div");
    }
    
	// get the data table value economic calendar end
	
	$scope.applyCountryFilter = function(Data)
    {
        $('#chkMyFilter').prop('checked', false); // Unchecks it
        $scope.EconomicCalendarTable($scope.EconomicCalendar);
    }  
    $scope.searchText = "";
    
    // capital the first character of word in csv
// 	$scope.capitalizeWords = function (arr) {
//           return arr.map(element => {
//             return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
//           });
//         }
    
    function capitalizeWords(arr) {
  return arr.map(element => {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  });
}
    
    // $scope.tableToCSV = function ()
    // {
    //     $scope.economicData.reverse()
    //     var csv_data = [];
        
    //     delete $scope.economicData[0].changePercentage;
    //     delete $scope.economicData[0].estimate;
        
    //     csv_data.push(capitalizeWords(Object.keys($scope.economicData[0])));
    //     csv_data[0][5]='Consensus';
    //     csv_data[0][1]='Date,Time'
        
        
    //     var selected = $("#economic-date-range-picker").val();
    //     var prevdate="";
    //     var nextdate="";
    //     if (selected.replace(' ','').split('-').length>0) 
    //     {
    //         prevdate=selected.replace(' ','').split('-')[0].replace(' ','')
    //         nextdate=selected.replace(' ','').split('-')[1].replace(' ','');
    //         prevdate = moment(prevdate).add(-1,"days").format('YYYY-MM-DD');
    //         nextdate = moment(nextdate).add(1,"days").format('YYYY-MM-DD');
    //     }
        
    //     // $scope.economicData.reverse();
    //     $scope.economicData.forEach((item)=>{ 
    //             delete item.changePercentage;
    //             delete item.estimate;
    //             var arraydate = moment(item.date).format('YYYY-MM-DD');
    //             if(item.date != null && prevdate != arraydate  && nextdate != arraydate )
    //             {
    //                 $scope.newDate=item.date.split(' ');
    //                 item.date=$scope.newDate;
    //             }
    //             csv_data.push(Object.keys(item).map(function(k){return item[k]}).join(","));
    //     });
    //     csv_data = csv_data.join('\n');
 
    //     $scope.downloadCSVFile(csv_data);
    // }
	
	
	$scope.tableToCSV = function ()
    {
        $scope.economicData.reverse()
        var csv_data = [];
        
        delete $scope.economicData[0].changePercentage;
        delete $scope.economicData[0].estimate;
        
        csv_data.push(capitalizeWords(Object.keys($scope.economicData[0])));
        csv_data[0][5]='Consensus';
        csv_data[0][1]='Date,Time'
        
        
        var selected = $("#economic-date-range-picker").val();
        var prevdate="";
        var nextdate="";
        if (selected.replace(' ','').split('-').length>0) 
        {
            prevdate=selected.replace(' ','').split('-')[0].replace(' ','')
            nextdate=selected.replace(' ','').split('-')[1].replace(' ','');
            prevdate = moment(prevdate).format('YYYY-MM-DD');
            nextdate = moment(nextdate).format('YYYY-MM-DD');
        }
        
        // $scope.economicData.reverse();
        $scope.economicData.forEach((item)=>{ 
            if (moment(item.date).format('YYYY-MM-DD') >= prevdate && moment(item.date).format('YYYY-MM-DD') <= nextdate) {
            
                delete item.changePercentage;
                delete item.estimate;
                var arraydate = moment(item.date).format('YYYY-MM-DD');
                if(item.date != null && prevdate != arraydate  && nextdate != arraydate )
                {
                    $scope.newDate=item.date.split(' ');
                    item.date=$scope.newDate;
                }
                csv_data.push(Object.keys(item).map(function(k){return item[k]}).join(","));
            }
                
        });
        csv_data = csv_data.join('\n');
 
        $scope.downloadCSVFile(csv_data);
    }
	
	
	
	
	
	//get the selected country checkboxes value
	$scope.getVal = function(selection) {
                $scope.selection = selection;
                $('#chkMyFilter').prop('checked', false); // Unchecks it
                    if($scope.selection == "Default")
                    {
                        $scope.i = 0;
                        angular.forEach($scope.defaultarr, function(country){
                            if(country.Selected == true)
                            {
                                country.Selected = false;
                            }
                        });
                    }
                    if($scope.selection == "filter")
                    {
                        $scope.i=0;
                        // Get the value from the local storage
                        $scope.countryNameArray = localStorage.getItem('storedArray');
                        $scope.countryNameArray = JSON.parse($scope.countryNameArray);
                        angular.forEach($scope.countryCurrencyArray, function(country){
                            if(country['countrycode'] == $scope.countryNameArray[$scope.i])
                            {
                                country.Selected = true;
                                $scope.i = $scope.i + 1;
                            }
                        });
                       
                    }
            };
	
	
	// Default selection of impact values
            $scope.getValImpact = function(selection) {
                $scope.selection = selection;
                    if($scope.selection == "Default")
                    {
                        $scope.i = 0;
                        angular.forEach($scope.defaultarrImpact, function(impact){
                            if(impact.Selected == true)
                            {
                                impact.Selected = false;
                            }
                        });
                    }
                    if($scope.selection == "filter")
                    {
                        $scope.i=0;
                        // Get the value from the local storage
                        $scope.impactNameArray = localStorage.getItem('impactstoredArray');
                        $scope.impactNameArray = JSON.parse($scope.impactNameArray);
                        angular.forEach($scope.impactArray, function(impact){
                            if(impact['impactName'] == $scope.impactNameArray[$scope.i])
                            {
                                impact.Selected = true;
                                $scope.i = $scope.i + 1;
                            }
                        });
                       
                    }
            };
	
	//selected checkboxes value in filter popup
    $scope.save = function(){
        $scope.countryNameArray = [];
        angular.forEach($scope.countryCurrencyArray, function(country){
             if (country.Selected) $scope.countryNameArray.push(country.countrycode);
             // Store the value in local storage
             localStorage.setItem("storedArray", JSON.stringify($scope.countryNameArray));
        });
    }
    
    //selected checkboxes value in filter popup
    $scope.saveImpact = function(){
        $scope.impactNameArray = [];
        angular.forEach($scope.impactArray, function(impact){
             if (impact.Selected) $scope.impactNameArray.push(impact.impactName);
             // Store the value in local storage
             localStorage.setItem("impactstoredArray", JSON.stringify($scope.impactNameArray));
        });
    }
    $scope.clearAllCheckboxes = function() {
        var toggleStatus = false;
        angular.forEach($scope.countryCurrencyArray, function(itm){ itm.Selected = toggleStatus; });
    }
    $scope.checkAllCheckboxes = function() {
        var toggleStatus = true;
        angular.forEach($scope.countryCurrencyArray, function(itm){ itm.Selected = toggleStatus; });
    }
    
    // Search Functionality in filter popup
    $scope.onlyMatch = function (input, output) {
        var Str = (input + "").toLowerCase();
        return Str.indexOf(output.toLowerCase()) === 0;
    }
    
    
   
    // $(document).ready(function () {
    //     var table = $('#EconomicTable').DataTable({
    //     ajax: '../ajax/data/objects.txt',
    //     columns: [
    //     {
    //         className: 'dt-control',
    //         orderable: false,
    //         data: null,
    //         defaultContent: '',
    //     },
    //     ],
    //     order: [[1, 'asc']],
    // });
    
    // $('#EconomicTable tbody').on('click', 'td.dt-control', function () {
    //     var tr = $(this).closest('tr');
    //     var row = table.row(tr);
            
    //     if (row.child.isShown()) {
    //         // This row is already open - close it
    //         row.child.hide();
    //         tr.removeClass('shown');
    //     } else {
    //             // Open this row
    //             row.child(format(row.data())).show();
    //             tr.addClass('shown');
    //         }
    //     });
    // });
    
    
    
    $scope.cDate = moment().format('L');
        $scope.cTime = moment().format('LTS'); 
        $scope.downloadCSVFile = function (csv_data)
        {
            CSVFile = new Blob([csv_data], {
                type: "text/csv"
            });
            var temp_link = document.createElement('a');
            
            temp_link.download = "Economiccalendar_['"+$scope.cDate +"' '"+$scope.cTime+"']";
            var url = window.URL.createObjectURL(CSVFile);
            temp_link.href = url;
            
            temp_link.style.display = "none";
            document.body.appendChild(temp_link);
 
            temp_link.click();
            document.body.removeChild(temp_link);
        }
    
    //economic calendar tool end
   
    
    
    $scope.GetExchangeRatesChangeColor = function (baseCurrency,currentCurrency,changePercent,isInverse, changeColour) {
        if(baseCurrency == currentCurrency){
            return 'grey';
        }else if(isInverse)
        {
            if(changeColour != undefined)
            {
                return (changeColour == 'red') ? 'green' : 'red';
            }else{
                return (changePercent > 0) ? 'red' : 'green';
            }
        }
        else{
            return (changePercent > 0) ? 'green' : 'red';
        }
    }
    
    $scope.GetMTFXExchangeRates24h = function (currencies, source) {
        var deferred = $q.defer();
        ToolsFactory.GetMTFXLiveExchangeRates24h(currencies, source)
        .then(function (response) {
            if (response != null) {
                $scope.LiveExchangeRates24h = response;
            } else {
                console.error("Data is not available!");
            }
            deferred.resolve(true);
        }).catch(function (response) {
            console.error("Data is not available!");
            console.error(error);
            deferred.resolve(false);
        });
        return deferred.promise;
    };
    
    $scope.GetMTFXExchangeChartData = function (currencies, source) {
        var deferred = $q.defer();
        ToolsFactory.GetMTFXLiveExchangeChartData24h(currencies, source)
        .then(function (response) {
            if (response != null) {
                $scope.LiveExchangeChartData24h = response;
            } else {
                console.error("Data is not available!");
            }
            deferred.resolve(true);
        }).catch(function (response) {
            console.error("Data is not available!");
            console.error(error);
            deferred.resolve(false);
        });
        return deferred.promise;
    };
    
    $scope.resetExchangeRateCurrencies = function () {
        /*var exchangeCurrencies = [];
        var exchangeRateCurrencycodes = [];
        var newCurrencies = [];
        var baseCurrencyCode = 'CAD';
        if ($('#IsToolsLiveExchangeRates').val() != undefined) {
            baseCurrencyCode = localStorage.getItem("newToolsConvertCurrency");
            exchangeRateCurrencycodes.push(baseCurrencyCode);
            newCurrencies = JSON.parse(localStorage.getItem("newToolsCurrency"));
        } else {
            baseCurrencyCode = localStorage.getItem("newConvertCurrency");
            exchangeRateCurrencycodes.push(baseCurrencyCode);
            newCurrencies = JSON.parse(localStorage.getItem("newCurrency"));
        }
        
        if(newCurrencies != null)
        {
            for (var i = 0; i < newCurrencies.length; i++) {
                    exchangeRateCurrencycodes.push(newCurrencies[i].code);
                }
                
            for(var i=0; i < $scope.supportedCurrenciesWithNames.length; i++){
                if($.inArray($scope.supportedCurrenciesWithNames[i]['code'], exchangeRateCurrencycodes) == -1){
                   exchangeCurrencies.push($scope.supportedCurrenciesWithNames[i]);
                }
              }
              
            $scope.exchangeRateCurrencies = exchangeCurrencies;
            $scope.baseExchangeRateCurrencies = angular.copy(exchangeCurrencies);
            var baseCurrency =$scope.supportedCurrenciesWithNames.find((o) => { return o['code'] === baseCurrencyCode });
            $scope.baseExchangeRateCurrencies.push(baseCurrency);
       }*/
    }
    
    $scope.submitMarketCommentary = function () {
        if ($scope.objCommentary.RecaptchaResponse != undefined) {
            //console.log($scope.objCommentary);
        } else {
            alert("Google captcha is required");
        }
    }
    
    $scope.setCRABuyHiddenValue = function () {
        $("#BuyCurrencyIsoValue").val($scope.CRABuyCurrencyIso.code);
    }
    
    $scope.setContactCOuntryHiddenValue = function () {
        $("#ContactUSCountry").val($scope.ConnectCountry);
    }

    $scope.setCRASellHiddenValue = function () {
        $("#SellCurrencyIsoValue").val($scope.CRASellCurrencyIso.code);
    }

    $scope.setRateWatchFromHiddenValue = function () {
        $("#RateWatchFromValue").val($scope.RateWatchFrom.code);
    }
    
    $scope.setRateWatchToHiddenValue = function () {
        $("#RateWatchToValue").val($scope.RateWatchTo.code);
    }
    
    $scope.codeMapper = function (code) {
        return {
            code: code
        };
    };

    $scope.codeExtractor = function (currency) {
        return currency.code;
    };

    $scope.changedHandler = function () {
        $scope.currencyChangeCount += 1;
    };

    $scope.changedCodeHandler = function () {
        $scope.currencyCodeChangeCount += 1;
    };

    $scope.otherClicked = function () {
        window.alert("Other clicked");
    };

    var getParameterByName = function (name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
 
    $scope.updateQueryStringParameters = function (key, value) {
        var uri = window.location.href
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    }

    $scope.CurrencyChartQueryString = function (key, value) {
        var UpdatedURL = "";
        $scope.HiddenMetaTitle = $scope.HiddenMetaTitle != null ? $scope.HiddenMetaTitle : window.document.title;
        UpdatedURL = $scope.updateQueryStringParameters('to', $scope.CurrencyChartTo.code);
        history.pushState({}, null, UpdatedURL);
        UpdatedURL = $scope.updateQueryStringParameters('from', $scope.CurrencyChartFrom.code);
        history.pushState({}, null, UpdatedURL);
       
        //Title Chnages 
        window.document.title = $scope.CurrencyConverterFrom.code + ' to ' + $scope.CurrencyConverterTo.code + ' | ' + $scope.HiddenMetaTitle;
        //Chanage Meta  
        $("meta[property='og:title']").attr("content", window.document.title);
    }
   
   
   
    $scope.updateQueryString = function (key, value) {
        
        if ($scope.SendingAmount==undefined) {
            $scope.errorAmountRequired=true;
            return;
        }
        else
        {
        
        $scope.errorAmountRequired=false;
        
        var UpdatedURL = "";
        $scope.HiddenMetaTitle = $scope.HiddenMetaTitle != null ? $scope.HiddenMetaTitle : window.document.title;
        UpdatedURL = $scope.updateQueryStringParameters('from', $scope.CurrencyConverterFrom.code);
        history.pushState({}, null, UpdatedURL);
        UpdatedURL = $scope.updateQueryStringParameters('to', $scope.CurrencyConverterTo.code);
        history.pushState({}, null, UpdatedURL);
        var myStrAMT = $scope.SendingAmount;
        myStrAMT = myStrAMT.replace(/,/g, "");
       // UpdatedURL = $scope.updateQueryStringParameters('amount', parseFloat(myStrAMT));
       // history.pushState({}, null, UpdatedURL);
        
        //Title Chnages 
        window.document.title = parseFloat(myStrAMT) + ' ' + $scope.CurrencyConverterFrom.code + ' to ' + $scope.CurrencyConverterTo.code + ' | ' + $scope.HiddenMetaTitle;
        //Chanage Meta  
        $("meta[property='og:title']").attr("content", window.document.title);
        
        var NewURL = "";
        var myStrAMT = $scope.SendingAmount;
        myStrAMT = myStrAMT.replace(/,/g, "");
        $scope.BuyPrice = $scope.BuyPrice != null ? $scope.BuyPrice : window.document.title;
       // NewURL ="/tools/currency-rate-alerts/?from="+$scope.CurrencyConverterFrom.code+"&to="+$scope.CurrencyConverterTo.code+"&amount="+myStrAMT+""; //$scope.updateQueryStringParameters('from', $scope.CurrencyConverterFrom.code);
        NewURL ="/tools/currency-rate-alerts/?from="+$scope.CurrencyConverterFrom.code+"&to="+$scope.CurrencyConverterTo.code+""; 
        $('#getAlertRates').attr('href', NewURL);
        }
    }
    
    $scope.updateQueryStringCurrencyRateAlerts = function (key, value) {
        var UpdatedURL = "";
        $scope.BuyPrice = $scope.BuyPrice != null ? $scope.BuyPrice : window.document.title;
        UpdatedURL = $scope.updateQueryStringParameters('from', $scope.CRABuyCurrencyIso.code);
        history.pushState({}, null, UpdatedURL);
        UpdatedURL = $scope.updateQueryStringParameters('to', $scope.CRASellCurrencyIso.code);
        history.pushState({}, null, UpdatedURL);
        var myStrAMT = $scope.BuyPrice;
        //myStrAMT = myStrAMT.replace(/,/g, "");
      //  UpdatedURL = $scope.updateQueryStringParameters('amount', parseFloat(myStrAMT));
      
      //  history.pushState({}, null, UpdatedURL);
        //Title Chnages 
        window.document.title = parseFloat(myStrAMT) + ' ' + $scope.CurrencyConverterFrom.code + ' to ' + $scope.CurrencyConverterTo.code + ' | ' + $scope.HiddenMetaTitle;
        //Chanage Meta  
        $("meta[property='og:title']").attr("content", window.document.title);
    }

    /*--- Currency converter ----*/
    
    $scope.SwipeCurrency = function () {
        var DummyVariable = $scope.CurrencyConverterFrom;
        $scope.CurrencyConverterFrom = $scope.CurrencyConverterTo;
        $scope.CurrencyConverterTo = DummyVariable;
        $scope.ConvertCurrency(null, true);
        $scope.CreateRateCalulatorChart();
    };
    
    $scope.SwipeHistoricalRateCurrency = function () {
        var DummyVariable = $scope.CurrencyConverterFrom;
        $scope.CurrencyConverterFrom = $scope.CurrencyConverterTo;
        $scope.CurrencyConverterTo = DummyVariable;
        $scope.BuildHistoricalRates();
    };
    
    /*For Mobile View Start*/
    $scope.SwipeHistoricalRateCurrencyMobile = function () {
        var DummyVariable = $scope.CurrencyConverterFrom;
        $scope.CurrencyConverterFrom = $scope.CurrencyConverterTo;
        $scope.CurrencyConverterTo = DummyVariable;
        //$scope.BuildHistoricalRates();
    };
     /*For Mobile View End*/
    
    $scope.SwipechartCurrency = function () {
        var DummyVariable = $scope.ChartCurrencyConverterFrom;
        $scope.ChartCurrencyConverterFrom = $scope.ChartCurrencyConverterTo;
        $scope.ChartCurrencyConverterTo = DummyVariable;
        $scope.PrepairCompareChart();
    };
    
    $scope.SwipeCurrencyTools = function () {
        var DummyVariable = $scope.CRABuyCurrencyIso;
        $scope.CRABuyCurrencyIso = $scope.CRASellCurrencyIso;
        $scope.CRASellCurrencyIso = DummyVariable;
    };

    $scope.SwipeCurrencyToolsForAlert = function () {
        var DummyVariable = $scope.CRABuyCurrencyIso;
        $scope.CRABuyCurrencyIso = $scope.CRASellCurrencyIso;
        $scope.CRASellCurrencyIso = DummyVariable;
        $scope.updateQueryStringCurrencyRateAlerts();
        // $scope.ConvertCurrencyForAlert();
    };

    $scope.AlertBuyOnchange = function () {
        $scope.prepareCurrencyAlertChart();
    };

    $scope.AlertSellOnchange = function() {
    	$scope.BuyPricePrevVal = 10000;
    	$scope.SellPricePrevVal = $scope.SellPrice;
    	targetRate = $scope.SellPrice;
    	setTimeout(function() {
    		if($scope.currentChart.rangeSelector.selected == 0) {
    			var numbs = $scope.DailyCurrencyChartData.map(function(x) {
    				return x[1] || 0
    			});
    			minYaxis = Math.min.apply(Math, numbs);
    			maxYaxis = Math.max.apply(Math, numbs);
    			if(targetRate < minYaxis) {
    				minYaxis = targetRate;
    			}
    			if(targetRate > maxYaxis) {
    				maxYaxis = targetRate;
    			}
    			$scope.currentChart.yAxis[0].update({
    				min: minYaxis,
    				max: maxYaxis
    			});
    		}
    		if($scope.currentChart.rangeSelector.selected == 1) {
    			var numbs = $scope.WeeklyCurrencyChartData.map(function(x) {
    				return x[1] || 0
    			});
    			minYaxis = Math.min.apply(Math, numbs);
    			maxYaxis = Math.max.apply(Math, numbs);
    			if(targetRate < minYaxis) {
    				minYaxis = targetRate;
    			}
    			if(targetRate > maxYaxis) {
    				maxYaxis = targetRate;
    			}
    			$scope.currentChart.yAxis[0].update({
    				min: minYaxis,
    				max: maxYaxis
    			});
    		}
    		if($scope.currentChart.rangeSelector.selected == 2) {
    			var rangeTo = parseInt(moment().format("x"));
    			var rangeFrom = parseInt(moment().add(-1, 'month').format("x"));
    			var numbs = $scope.AllCurrencyChartData.filter(function(y) {
    				if(y[0] <= rangeTo && y[0] >= rangeFrom) {
    					return true;
    				}
    				return false;
    			}).map(function(x) {
    				return x[1] || 0
    			});
    			minYaxis = Math.min.apply(Math, numbs);
    			maxYaxis = Math.max.apply(Math, numbs);
    			if(targetRate < minYaxis) {
    				minYaxis = targetRate;
    			}
    			if(targetRate > maxYaxis) {
    				maxYaxis = targetRate;
    			}
    			$scope.currentChart.yAxis[0].update({
    				min: minYaxis,
    				max: maxYaxis
    			});
    		}
    		if($scope.currentChart.rangeSelector.selected == 3) {
    			var rangeTo = parseInt(moment().format("x"));
    			var rangeFrom = parseInt(moment().add(-1, 'year').format("x"));
    			var numbs = $scope.AllCurrencyChartData.filter(function(y) {
    				if(y[0] <= rangeTo && y[0] >= rangeFrom) {
    					return true;
    				}
    				return false;
    			}).map(function(x) {
    				return x[1] || 0
    			});
    			minYaxis = Math.min.apply(Math, numbs);
    			maxYaxis = Math.max.apply(Math, numbs);
    			if(targetRate < minYaxis) {
    				minYaxis = targetRate;
    			}
    			if(targetRate > maxYaxis) {
    				maxYaxis = targetRate;
    			}
    			$scope.currentChart.yAxis[0].update({
    				min: minYaxis,
    				max: maxYaxis
    			});
    		}
    		if($scope.currentChart.rangeSelector.selected == 4) {
    			var numbs = $scope.AllCurrencyChartData.map(function(x) {
    				return x[1] || 0
    			});
    			minYaxis = $scope.AllCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
    			maxYaxis = Math.max.apply(Math, numbs);
    			if(targetRate < minYaxis) {
    				minYaxis = targetRate;
    			}
    			if(targetRate > maxYaxis) {
    				maxYaxis = targetRate;
    			}
    			$scope.currentChart.yAxis[0].update({
    				min: minYaxis,
    				max: maxYaxis
    			});
    		}
    		if($scope.currentChart.rangeSelector.selected == 5) {
    			var numbs = $scope.AllCurrencyChartData.map(function(x) {
    				return x[1] || 0
    			});
    			minYaxis = $scope.AllCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
    			maxYaxis = Math.max.apply(Math, numbs);
    			if(targetRate < minYaxis) {
    				minYaxis = targetRate;
    			}
    			if(targetRate > maxYaxis) {
    				maxYaxis = targetRate;
    			}
    			$scope.currentChart.yAxis[0].update({
    				min: minYaxis,
    				max: maxYaxis
    			});
    		}
    		$scope.currentChart.yAxis[0].update({
    			plotLines: [{
    				value: $scope.SellPrice,
    				color: '#70AD47',
    				dashStyle: 'dash',
    				width: 2,
    				zIndex: 4,
    				label: {
    					useHTML: true,
    					text: 'Target Rate:' + ' ' + $scope.SellPrice,
    					align: 'right',
    					style: {
    						color: '#70AD47',
    						fontWeight: 'bold',
    						textAlign: 'right',
    						paddingRight: "10px",
    					}
    				}
    			}, {
    				value: $scope.DailyCurrencyChartData[$scope.DailyCurrencyChartData.length - 1][1],
    				color: '#393939',
    				dashStyle: 'dash',
    				width: 2,
    				zIndex: 4,
    				label: {
    					useHTML: true,
    					text: 'Current Rate:' + ' ' + $scope.CurrencyConvertRate,
    					align: 'right',
    					style: {
    						color: '#393939',
    						fontWeight: 'bold',
    						textAlign: 'left',
    						paddingLeft: "85px",
    					}
    				}
    			}]
    		});
    	}, 100);
    };

    $scope.ConvertCurrency = function (isreverse, Event) {
    
        if ($scope.SendingAmount==undefined) {
            $scope.errorAmountRequired=true;
            $scope.ConvertbtnDisable=true;
             $scope.errorAmount=false;
            return;
        }
        else if ($scope.SendingAmount!=undefined) {
           var test_val = $scope.SendingAmount;
          //  const test_regex = new RegExp(/'[+-]?([0-9]*[.])?[0-9]+'/);
           // if(!test_regex.test(test_val)){
           //     alert("This is not a valid entry");
           //  }
           var data=Array.from(test_val);
           var result=data.filter(x=>x=='.');
           if (result.length>1) {
                $scope.errorAmount=true;
                $scope.ConvertbtnDisable=true;
                $scope.errorAmountRequired=false;
                return;
           }
           else
           {
                $scope.errorAmountRequired=false;
                $scope.errorAmount=false;
                $scope.ConvertbtnDisable=false;
           }
        }
       // else
      //  {
        $scope.ConvertbtnDisable=false;
        $scope.errorAmountRequired=false;
        $scope.errorAmount=false;
        
        var Send = getParameterByName("from")
        var Receive = getParameterByName("to")
        var Amount = getParameterByName("amount")
        if (Event == null) {
            if (Send != null && Send != "") {
                $scope.CurrencyConverterFrom = {
                    code: Send.toUpperCase(),
                    name: $scope.currenciesWithNames.find((o) => { return o['code'] === Send.toUpperCase() }).name
                };
                $scope.updateQueryString();
            }
            if (Receive != null && Receive != "") {
                $scope.CurrencyConverterTo= {
                    code: Receive.toUpperCase(),
                    name: $scope.currenciesWithNames.find((o) => { return o['code'] === Receive.toUpperCase() }).name
                }; 
                $scope.updateQueryString();
            }
            if (Amount != null && Amount != "") {
                var myStrAMT = Amount;
                myStrAMT = myStrAMT.replace(/,/g, "");
                $scope.SendingAmount = $.isNumeric(myStrAMT) == true ? Amount : '10000';
                $scope.updateQueryString();
            }
        }
        $scope.isLoaded = false;
        $scope.CurrencyConvertRate = "0";
        $scope.ConvertedResult = "0";
        var currencyfrom = $scope.CurrencyConverterFrom.code;
        var currencyto = $scope.CurrencyConverterTo.code;
        /*if (isreverse) {
            var DummyVariable = $scope.CurrencyConverterFrom.code;
            currencyfrom = $scope.CurrencyConverterTo.code;
            currencyto = DummyVariable;
        }*/
        ToolsFactory.GetMTFXRate(currencyfrom + currencyto)
        .then(function (response) {
            if (response != null && response != "") {
                $(".conversionDateTime").text(moment().format("LLL"));
                var value = jQuery.parseJSON(response);
                var actualamount = 0;
                if (isNaN($scope.SendingAmount)) {
                    actualamount = $scope.SendingAmount.replace(/,/g, "");
                } else {
                    actualamount = $scope.SendingAmount;
                }
                $scope.CurrencyConverterValue = actualamount;
                $scope.CurrencyConvertRate = Number(value.d).toFixed(5);
                $scope.CurrencyInverseRate = (1 / Number(value.d)).toFixed(5);
                $scope.ConvertedResult = ($scope.CurrencyConvertRate * $scope.CurrencyConverterValue).toFixed(2);
                $('#receivingamount').val($scope.ConvertedResult);
                $scope.CurrencyConvertRate = parseFloat(Number(value.d).toFixed(5));
                $('#resultConvert').html('<div class="currency-value"><p class="doller-paragraph">' + addCommas($scope.CurrencyConverterValue) + ' ' + $scope.CurrencyConverterFrom.name + '</p><h3 class="orange-title">' + addCommas($scope.ConvertedResult) + ' ' + $scope.CurrencyConverterTo.name + '</h3></div><div class="currency-content"><p class="currency-paragraph">1 ' + $scope.CurrencyConverterTo.code + ' = ' + $scope.CurrencyInverseRate + ' ' + $scope.CurrencyConverterFrom.code + '</p><p class="currency-paragraph">1 ' + $scope.CurrencyConverterFrom.code + ' = ' + $scope.CurrencyConvertRate + ' ' + $scope.CurrencyConverterTo.code + '</p></div>');
            } else {
                console.error("Data is not available for this Pair!")
            }
            $scope.isLoaded = true;
        }).catch(function (error) {
            console.error("Data is not available for this Pair!")
            console.error(error);
        });
      //  }
    };

    $("#dis").hide().css("visibility", "hidden");
    $scope.ShowDropdown = function(){
        $("#dis").show().css('visibility', 'visible');
        $("#AddCurrency1").hide().css("visibility", "hidden");
        $("#AddCurrency2").hide().css("visibility", "hidden");
        $("#dis .dropdown-menu").addClass("show");
        $('#dis .btn').remove();
        $('#dis .form-control').focus();
    }
    
    $scope.HideDropdown = function(){
        $("#dis .dropdown-menu").removeClass("show");
        $("#dis").hide().css('visibility', 'hidden');
        $("#AddCurrency2").show().css("visibility", "visible");
    }
    
    $scope.ConvertCurrencyForAlert = function (isChartRefresh,Event) {
        
        var Send = getParameterByName("from")
        var Receive = getParameterByName("to")
        var Amount = getParameterByName("amount")
        if (Event==null) {
            if (Send != null && Send != "") {
                $scope.CRABuyCurrencyIso = {
                    code: Send.toUpperCase(),
                    name: $scope.currenciesWithNames.find((o) => { return o['code'] === Send.toUpperCase() }).name
                };
                $scope.updateQueryStringCurrencyRateAlerts();
            }
            if (Receive != null && Receive != "") {
                $scope.CRASellCurrencyIso= {
                    code: Receive.toUpperCase(),
                    name: $scope.currenciesWithNames.find((o) => { return o['code'] === Receive.toUpperCase() }).name
                }; 
                $scope.updateQueryStringCurrencyRateAlerts();
            }
            if (Amount != null && Amount != "") {
                var myStrAMT = Amount;
                myStrAMT = myStrAMT.replace(/,/g, "");
                $scope.BuyPrice = $.isNumeric(myStrAMT) == true ? Amount : '10,000';
                $scope.updateQueryStringCurrencyRateAlerts();
            }
        
        }
        
        if(isChartRefresh != 1) {
            $scope.CreateAlertChart();
        }
        
        $scope.isLoaded = false;
        $scope.CurrencyConvertRate = "0";
        $scope.ConvertedResult = "0";
        var currencyfrom = $scope.CRABuyCurrencyIso.code;
        var currencyto = $scope.CRASellCurrencyIso.code;
        /*if (isreverse) {
            currencyfrom = $scope.CRASellCurrencyIso.code;
            currencyto = $scope.CRABuyCurrencyIso.code;
        }*/
        
        ToolsFactory.GetMTFXRate(currencyfrom + currencyto)
        .then(function (response) {
            if (response != null && response != "") {
                $(".conversionDateTime").text(moment().format("LLL"));
                var value = jQuery.parseJSON(response);
                var actualamount = 0;
                if (isNaN($scope.BuyPrice)) {
                    actualamount = $scope.BuyPrice.replace(/,/g, "");
                } else {
                    actualamount = $scope.BuyPrice;
                }
                $scope.CurrencyConverterValue = actualamount;
                $scope.CurrencyConvertRate = Number(value.d).toFixed(5);
                $scope.CurrencyInverseRate = (1 / Number(value.d)).toFixed(5);
                $scope.ConvertedResult = ($scope.CurrencyConvertRate * $scope.CurrencyConverterValue).toFixed(2);
                $('#receivingamount').val($scope.ConvertedResult);
                $scope.CurrencyConvertRate = parseFloat(Number(value.d).toFixed(5));
                
                $('#resultConvertAlert').html('<div class="row align-items-center"><div class="col-xl-6 col-lg-6 col-md-6 col-sm-6"><div class="currency-value"><p class="doller-paragraph">' + addCommas($scope.CurrencyConverterValue) + ' ' + $scope.CRABuyCurrencyIso.name + '</p><h3 class="orange-title">' + addCommas($scope.ConvertedResult) + ' ' + $scope.CRASellCurrencyIso.name + '</h3></div></div><div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 convert-alert-column mobile-compact-mt-10"><div class="currency-content"><p class="currency-paragraph">1 ' + $scope.CRASellCurrencyIso.code + ' = ' + $scope.CurrencyInverseRate + ' ' + $scope.CRABuyCurrencyIso.code + '</p><p class="currency-paragraph">1 ' + $scope.CRABuyCurrencyIso.code + ' = ' + $scope.CurrencyConvertRate + ' ' + $scope.CRASellCurrencyIso.code + '</p></div></div></div>');
            } else {
                console.error("Data is not available for this Pair!")
            }
            $scope.isLoaded = true;
        }).catch(function (error) {
            console.error("Data is not available for this Pair!")
            console.error(error);
        });
    };

    /*---- Historical Rate ----*/
    
    function SortByCurrencyCode(a, b){
      var aName = a.currency_code.toLowerCase();
      var bName = b.currency_code.toLowerCase(); 
      return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    }

    $scope.BuildHistorical = function (index) {
        if (index==10) {
            $scope.ShowMoreData=false;
            $scope.OldHistoricalCurrencyCode=$scope.HistoricalCurrency.code;
            $scope.OldHistoricaldate=$('#txt_historicaldate').val();
        }
        
        //console.log("main page");
        if ($("#HistoricalExchangeRateDiv").length > 0) {
            $("#HistoricalExchangeRateDiv").empty();
            $("#HistoricalExchangeRateDiv").append("<div class='loading-div-wrapper'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
            if ($scope.OldHistoricaldate != undefined) {
                ToolsFactory.GetMTFXHistoricalTableData($scope.OldHistoricalCurrencyCode, $scope.OldHistoricaldate)
                .then(function (response) {
                    if (response!="[]") {
                          if (response != null && response != "") {
                        historicaltable = $('<table id="HistoricalExchangeRateTable"></table>').attr({
                            class: ["table", "cmn-table", "exchange-rates"].join(' ')
                        }, {
                            'style': 'width: 100%'
                        });
                        tableHeader = $('<thead></thead>');
                        var row = $('<tr></tr>').appendTo(tableHeader);
                        $('<th scope="col"></th>').text("Currency Code").appendTo(row);
                        $('<th scope="col" class="th-currency-name"></th>').text("Currency Name").appendTo(row);
                        $('<th scope="col"></th>').text($scope.OldHistoricalCurrencyCode + " per Unit").appendTo(row);
                        $('<th scope="col"></th>').text("Units per " + $scope.OldHistoricalCurrencyCode).appendTo(row);
                        tableHeader.appendTo(historicaltable);

                        tableBody = $('<tbody></tbody>');
                        var responseData = JSON.parse(response);
                        responseData.sort(SortByCurrencyCode);
                        var showMoreGetRecords=responseData.slice(0,index);
                        angular.forEach(showMoreGetRecords, function (value, key) {
                            var row = $('<tr></tr>').appendTo(tableBody);
                            var column = $('<td scope="col"></td>').appendTo(row);
                            var flagCode = $scope.getFlagCode(value.currency_code).toLowerCase();
                            var flagDropdown = $('<div class="cmn-flag-content"></div>').appendTo(column);
                            $('<span class="flag-icon flag-icon-'+ flagCode +' flag-icon-squared"></span>').appendTo(flagDropdown);
                            $('<span class="country-name"></span>').text(value.currency_code).appendTo(flagDropdown);
                            $('<td scope="col" class="td-currency-name"></td>').text(value.currency_name).appendTo(row);
                            $('<td scope="col"></td>').text(Number(value.inverse_rate).toFixed(5)).appendTo(row);
                            $('<td scope="col"></td>').text(Number(value.rate).toFixed(5)).appendTo(row);
                        });
                        tableBody.appendTo(historicaltable);
                        $("#HistoricalExchangeRateDiv").empty();
                        historicaltable.appendTo("#HistoricalExchangeRateDiv");
                    } else {
                        $scope.ShowMoreData=true;
                        historicaltable = $('<table id="HistoricalExchangeRateTable"></table>').attr({
                            class: ["table", "cmn-table", "exchange-rates"].join(' ')
                        }, {
                            'style': 'width: 100%'
                        });
                        tableHeader = $('<thead></thead>');
                        var row = $('<tr></tr>').appendTo(tableHeader);
                        $('<th scope="col"></th>').text("Currency Code").appendTo(row);
                        $('<th scope="col" class="th-currency-name"></th>').text("Currency Name").appendTo(row);
                         $('<th scope="col"></th>').text($scope.OldHistoricalCurrencyCode + " per Unit").appendTo(row);
                        $('<th scope="col"></th>').text("Units per " + $scope.OldHistoricalCurrencyCode).appendTo(row);
                        tableHeader.appendTo(historicaltable);
                        $("#HistoricalExchangeRateDiv").empty();
                        historicaltable.appendTo("#HistoricalExchangeRateDiv");
                    }
                    /*----- DataTable -----*/
                    $("#HistoricalExchangeRateTable").DataTable({
                        "paging": false,
                        "searching": false,
                        "bInfo" : false,
                        responsive: true,
                        language: {
                            "emptyTable": "No data available"
                        }
                    });
                    }
                    else
                    {
                          historicaltable = $('<table id="HistoricalExchangeRateTable"></table>').attr({
                            class: ["table", "cmn-table", "exchange-rates"].join(' ')
                        }, {
                            'style': 'width: 100%'
                        });
                        tableHeader = $('<thead></thead>');
                        var row = $('<tr></tr>').appendTo(tableHeader);
                        $('<th scope="col"></th>').text("Currency Code").appendTo(row);
                        $('<th scope="col" class="th-currency-name"></th>').text("Currency Name").appendTo(row);
                        $('<th scope="col"></th>').text($scope.OldHistoricalCurrencyCode + " per Unit").appendTo(row);
                        $('<th scope="col"></th>').text("Units per " + $scope.OldHistoricalCurrencyCode).appendTo(row);
                        tableHeader.appendTo(historicaltable);

                        tableBody = $('<tbody></tbody>');
                        var responseData = JSON.parse(response);
                        responseData.sort(SortByCurrencyCode);
                        var showMoreGetRecords=responseData.slice(0,index);
                        angular.forEach(showMoreGetRecords, function (value, key) {
                            var row = $('<tr></tr>').appendTo(tableBody);
                            var column = $('<td scope="col"></td>').appendTo(row);
                            var flagCode = $scope.getFlagCode(value.currency_code).toLowerCase();
                            var flagDropdown = $('<div class="cmn-flag-content"></div>').appendTo(column);
                            $('<span class="flag-icon flag-icon-'+ flagCode +' flag-icon-squared"></span>').appendTo(flagDropdown);
                            $('<span class="country-name"></span>').text(value.currency_code).appendTo(flagDropdown);
                            $('<td scope="col" class="td-currency-name"></td>').text(value.currency_name).appendTo(row);
                            $('<td scope="col"></td>').text(Number(value.inverse_rate).toFixed(5)).appendTo(row);
                            $('<td scope="col"></td>').text(Number(value.rate).toFixed(5)).appendTo(row);
                        });
                        tableBody.appendTo(historicaltable);
                        $("#HistoricalExchangeRateDiv").empty();
                        historicaltable.appendTo("#HistoricalExchangeRateDiv");
                        $("#HistoricalExchangeRateTable").DataTable({
                        "paging": false,
                        "searching": false,
                        "bInfo" : false,
                        responsive: true,
                        language: {
                            "emptyTable": "No data available"
                        }
                    });
                        $scope.ShowMoreData=true;
                    }
                });
            }
        }
    };
    
    
    /* Formatting function for row details - modify as you need */
            function format(d) {
                // `d` is the original data object for the row
                return (
                    '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
                    '<tr>' +
                    '<td>Full name:</td>' +
                    '<td>' +
                   
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Extension number:</td>' +
                    '<td>' +
                    
                    '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td>Extra info:</td>' +
                    '<td>And any further details here (images etc)...</td>' +
                    '</tr>' +
                    '</table>'
                );
            }
             
    $scope.BuildHistoricalRatesMobile = function () {
    
        if ($scope.SelectedFrequency != "custom-range") {
        $scope.BuildHistoricalRates();
        }
    }
    
    $scope.BuildHistoricalRates = function () {
        
        // Historical Rates Table Body
        
        
         localStorage.setItem("savedfromcurrencytable", JSON.stringify($scope.CurrencyConverterFrom));
        localStorage.setItem("savedtocurrencytable", JSON.stringify($scope.CurrencyConverterTo));
        tableBody = $('<tbody></tbody>');
        var historicalDataCount = $('#historicalDataCount').val();
        ToolsFactory.GetMTFXHistoricalFrequencyRates($scope.CurrencyConverterFrom.code + $scope.CurrencyConverterTo.code,$scope.SelectedFrequency.charAt(0),historicalDataCount,$scope.SelectedFromDate,$scope.SelectedToDate)
            .then(function (response) {
                if (response != null && response.length > 0) {
                    if($scope.SelectedFrequency.charAt(0) == 'w'){
                        var i = 0;
                          while (i < response.length) {
                              var dayOfWeek = moment(response[i].LastUpdate).day();
                            if (dayOfWeek != 6) {
                              response.splice(i, 1);
                            } else {
                              ++i;
                            }
                          }
                    }
                    if($scope.SelectedFrequency.charAt(0) == 'c')
                    {
                        historicalRatesGridData = response;
                    }
                    else
                    {
                        historicalRatesGridData = response.slice(0,historicalDataCount);
                    }
                    const average = historicalRatesGridData.reduce((total, next) => total + next.RatePairValue, 0) / historicalRatesGridData.length;
                    const inverseAverage = historicalRatesGridData.reduce((total, next) => total + (1/next.RatePairValue), 0) / historicalRatesGridData.length;
                    
                }
               
        
        if ( $.fn.DataTable.isDataTable('#HistoricalRatesTable') ) {
            
            $('#HistoricalRatesTable').DataTable().destroy();
        }
        $scope.HistoricalChangeRatesChartDataArray = [];
          
        for(var i=0; i<historicalRatesGridData.length; i++) // for(var i=0; i<historicalRatesGridData.length; i++)
        {
            $scope.d = moment(historicalRatesGridData[i].LastUpdate).format('M/D/YYYY H:mm'); // 8/13/2022 0:00
            $scope.LastUpdate = moment($scope.d).valueOf(); // 1660329000000 
            $scope.RatePairValue = historicalRatesGridData[i].RatePairValue;
            
            $scope.HistoricalChartDataObj = [
                $scope.LastUpdate,
                $scope.RatePairValue
            ]
            
            $scope.HistoricalChangeRatesChartDataArray.push($scope.HistoricalChartDataObj);
            
        }
        const dfrom = localStorage.getItem('savedfromcurrency');
                $scope.CurrencyConverterFrom = JSON.parse(dfrom);
                
                const dto = localStorage.getItem('savedtocurrency');
                $scope.CurrencyConverterTo= JSON.parse(dto);
           $('#HistoricalRatesTable').DataTable({
                "data": historicalRatesGridData,
                "searching": false,
                "paging": false,
                "info": false,
                "scrollY": 412,
                "scroller": true,
                order: [[0, 'desc']],
                "columnDefs": [
                    {
                        "type": "date",
                        "render": function (data, type, row, meta) {
                          var DateCreated = moment(data, 'DD.MM.YYYY HH:mm').format('YYYY-MM-DD');
                          return DateCreated;
                        },
                        "targets": 0
                    },
                     
                    { "title": "Date", "targets": 0,width: '40%',type: 'extract-date',},
                    { "title": "1 "+$scope.CurrencyConverterFrom.code+"=", "targets": 1 ,width: '30%'},
                    { "title": "1 "+$scope.CurrencyConverterTo.code+"=", "targets": 2,width: '30%' },
                ],
              
                "columns": [
                    { "data": "LastUpdate",
                    "render":function(data){
                        return moment(data).format('MMM DD, YYYY');
                    }
                    },
                    { 
                        "data": "RatePairValue",
                         "render": function (data) {
                           return Number(data).toFixed(5);
                        }
                    },
                    { "data": "RatePairValue",
                        "render": function (data) {
                           return Number(1/data).toFixed(5);
                        }
                    },
                ],
            });
            });
             
         $scope.HistoricalViewYearChart();
        
    }
    $scope.showMoreLoadData = function(){
        $scope.DisplayIndex = $scope.DisplayIndex + 10;
        $scope.BuildHistorical($scope.DisplayIndex);
        $scope.ShowMoreData=true;
    }
    
    $scope.EditSwipe = function(){
        var DummyVariable = $scope.editCurrencyChartFrom;
        $scope.editCurrencyChartFrom = $scope.editCurrencyChartTo;
        $scope.editCurrencyChartTo = DummyVariable;
        /*$scope.GetChartRate($scope.editCurrencyChartFrom.code, $scope.editCurrencyChartTo.code)
        .then(function (response) {
            $scope.CurrencyChartRate = response;
        });*/
        $scope.CurrencyCompareAmount = $scope.compareChartDefaultValue;
        $scope.PrepairCompareChart();
    }
    
    /*




    /*---- Currency Chart ----*/
    
    $scope.SwipeChartCurrency = function (id) {
        if (id == 1) {
            var DummyVariable = $scope.CurrencyChartFrom;
            $scope.CurrencyChartFrom = $scope.CurrencyChartTo;
            $scope.CurrencyChartTo = DummyVariable;
        } else if (id == 2) {
            var DummyVariable = $scope.CurrencyChartFrom2;
            $scope.CurrencyChartFrom2 = $scope.CurrencyChartTo2;
            $scope.CurrencyChartTo2 = DummyVariable;
        } else if (id == 3) {
            var DummyVariable = $scope.CurrencyChartFrom3;
            $scope.CurrencyChartFrom3 = $scope.CurrencyChartTo3;
            $scope.CurrencyChartTo3 = DummyVariable;
        } else if (id == 4) {
            var DummyVariable = $scope.CurrencyChartFrom4;
            $scope.CurrencyChartFrom4 = $scope.CurrencyChartTo4;
            $scope.CurrencyChartTo4 = DummyVariable;
        }
        $scope.GetChartRate($scope.CurrencyChartFrom.code, $scope.CurrencyChartTo.code)
        .then(function (response) {
            $scope.CurrencyChartRate = response;
            return $scope.GetChartRate($scope.CurrencyChartFrom2.code, $scope.CurrencyChartTo2.code)
            .then(function (response) {
                $scope.CurrencyChartRate2 = response;
                return $scope.GetChartRate($scope.CurrencyChartFrom3.code, $scope.CurrencyChartTo3.code)
                .then(function (response) {
                    $scope.CurrencyChartRate3 = response;
                    return $scope.GetChartRate($scope.CurrencyChartFrom4.code, $scope.CurrencyChartTo4.code)
                    .then(function (response) {
                        $scope.CurrencyChartRate4 = response;
                    });
                });
            });
        });
        $scope.CurrencyCompareAmount = $scope.compareChartDefaultValue;
        $scope.PrepairCompareChart();
    };

    $scope.prepareCurrencyChart = function (id) {
        $scope.modeedit = false;
        var rangeSelected = ((new Date().getDay() == 6 || new Date().getDay() == 0) ? 2 : 0);
        var chartid = "CurrencyChartContainer";
        if (id == 4) $scope.SubTitle = $scope.CurrencyChartRate4;
        if (id == 3) $scope.SubTitle = $scope.CurrencyChartRate3;
        if (id == 2) $scope.SubTitle = $scope.CurrencyChartRate2;
        if (id == 1) $scope.SubTitle = $scope.CurrencyChartRate;
        if (id == 5) $scope.SubTitle = $scope.CurrencyChartRate;
        if($scope.SubTitle.changepercent.charAt(0) == '-' ) {
            $scope.class = "minus";
        } else {
            $scope.class = "plus";
        }
        var fromcode;
        var tocode;
        if(id == 5){
            fromcode = $scope.editCurrencyChartFrom.code;
            tocode = $scope.editCurrencyChartTo.code;
        } else {
            var fromcode = $scope.CurrencyChartFrom.code;
            var tocode = $scope.CurrencyChartTo.code;
        }
        if (id != undefined && id == 1) {
            chartid = "CurrencyChartContainer";
        } else if (id != undefined && id == 2) {
            chartid = "CurrencyChartContainer" + id;
            fromcode = $scope.CurrencyChartFrom2.code;
            tocode = $scope.CurrencyChartTo2.code;
        } else if (id != undefined && id == 3) {
            chartid = "CurrencyChartContainer" + id;
            fromcode = $scope.CurrencyChartFrom3.code;
            tocode = $scope.CurrencyChartTo3.code;
        } else if (id != undefined && id == 4) {
            chartid = "CurrencyChartContainer" + id;
            fromcode = $scope.CurrencyChartFrom4.code;
            tocode = $scope.CurrencyChartTo4.code;
        }else if(id != undefined && id == 5) {
            chartid = "CurrencyChartContainer";
        }
        if ($('#' + chartid).length > 0) {
            $scope.min = 2;
            var numbs = $scope.DailyCurrencyChartData.map(function (x) { return x[1] || 0 });
            $scope.min = $scope.DailyCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
             if($scope.currentChart != null)
            {
                rangeSelected = $scope.currentChart.rangeSelector.selected;
            }
            
            $scope.currentChart = Highcharts.stockChart(chartid, {
                chart: {
                    backgroundColor: "rgba(0,0,0,0)",
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                rangeSelector: {
                    enabled: true
                },
                scrollbar: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                plotOptions: {
                    line: {
                        lineWidth: 4
                    }
                },
                title: {
                    style: {
                        color: '#393939',
                        fontWeight: 'bold'
                    }
                },
                subtitle: {
                    useHTML:true,
                    text: fromcode + ' / ' + tocode +' ' + $scope.SubTitle.rate + '<span class=' + $scope.class + '>' + $scope.SubTitle.changepercent + '</span>',
                    align: 'left',
                    x: -10
                },
                rangeSelector: {
                    enabled: true
                },
                xAxis: {
                    minRange: 864e5,
                    events: {
                        setExtremes: function (e) {
                         //    $scope.PreviousSelectedValue=e.rangeSelectorButton.text;
                         //   if($scope.countSelect>0)
                         //   {
                          //  e.rangeSelectorButton.text=$scope.PreviousSelectedValue;
                          //  $scope.countSelect++;
                          //  }
                            
                            if ($scope.DailyCurrencyChartData.length != $scope.DailyCurrencyChartDataCopyArray.length)
                                $scope.DailyCurrencyChartData = angular.copy($scope.DailyCurrencyChartDataCopyArray);
                            if (e.trigger == "rangeSelectorButton") {
                                if (e.rangeSelectorButton.text == "24H") {
                                    setTimeout(function () {
                                        var TempData = angular.copy($scope.DailyCurrencyChartData);
                                        var lastdata = TempData[TempData.length - 1][0];
                                        $scope.currentChart.series[0].setData(TempData);
                                        $scope.min = 2;
                                        var numbs = $scope.DailyCurrencyChartData.map(function (x) { return x[1] || 0 });
                                        $scope.min = $scope.DailyCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
                                        $scope.currentChart.yAxis[0].update({
                                            min: $scope.min,
                                        });
                                        $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "days").valueOf(), lastdata)
                                    }, 100);
                                }
                                if (e.rangeSelectorButton.text == "1W") {
                                    setTimeout(function () {
                                        var TempData = angular.copy($scope.WeeklyCurrencyChartData);
                                        var lastdata = TempData[TempData.length - 1][0];
                                        $scope.currentChart.series[0].setData(TempData);
                                        $scope.min = 2;
                                        var numbs = $scope.WeeklyCurrencyChartData.map(function (x) { return x[1] || 0 });
                                        $scope.min = $scope.WeeklyCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
                                        $scope.currentChart.yAxis[0].update({
                                            min: $scope.min,
                                        });
                                        $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "weeks").valueOf(), lastdata)
                                    }, 100);
                                }
                                if (e.rangeSelectorButton.text == "1M") {
                                    setTimeout(function () {
                                        var TempData = angular.copy($scope.AllCurrencyChartData);
                                        var lastdata = TempData[TempData.length - 1][0];
                                        $scope.currentChart.series[0].setData(TempData);
                                        var rangeTo = parseInt(moment().format("x"));
                                        var rangeFrom = parseInt(moment().add(-1, 'month').format("x"));
                                        var numbs = $scope.AllCurrencyChartData.filter(function (y) {
                                            if (y[0] <= rangeTo && y[0] >= rangeFrom) {
                                                return true;
                                            }
                                            return false;
                                        }).map(function (x) { return x[1] || 0 });
                                        $scope.min = Math.min.apply(Math, numbs);
                                        $scope.currentChart.yAxis[0].update({
                                            min: $scope.min,
                                        });
                                        $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "months").valueOf(), moment.utc(lastdata).valueOf())
                                    }, 100);
                                }
                                if (e.rangeSelectorButton.text == "1Y") {
                                    setTimeout(function () {
                                        var TempData = angular.copy($scope.AllCurrencyChartData);
                                        var lastdata = TempData[TempData.length - 1][0];
                                        $scope.currentChart.series[0].setData(TempData);
                                        var rangeTo = parseInt(moment().format("x"));
                                        var rangeFrom = parseInt(moment().add(-1, 'year').format("x"));
                                        var numbs = $scope.AllCurrencyChartData.filter(function (y) {
                                            if (y[0] <= rangeTo && y[0] >= rangeFrom) {
                                                return true;
                                            }
                                            return false;
                                        }).map(function (x) { return x[1] || 0 });
                                        $scope.min = Math.min.apply(Math, numbs);
                                        $scope.currentChart.yAxis[0].update({
                                            min: $scope.min,
                                        });
                                        //hChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "years").valueOf(), lastdata)
                                        $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "years").valueOf(), moment.utc(lastdata).valueOf())
                                    }, 100);
                                }
                                if (e.rangeSelectorButton.text == "5Y") {
                                    setTimeout(function () {
                                        var TempData = angular.copy($scope.AllCurrencyChartData);
                                        var lastdata = TempData[TempData.length - 1][0];
                                        $scope.currentChart.series[0].setData(TempData);
                                        $scope.min = 2;
                                      var numbs = $scope.AllCurrencyChartData.map(function (x) { return x[1] || 0 });
                                        $scope.min = $scope.AllCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
                                        $scope.currentChart.yAxis[0].update({
                                            min: $scope.min,
                                        });
                                        //hChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "years").valueOf(), lastdata)
                                        $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(5, "years").valueOf(), moment.utc(lastdata).valueOf())
                                    }, 100);
                                }
                                if (e.rangeSelectorButton.text == "All") {
                                    setTimeout(function () {
                                        var TempData = angular.copy($scope.AllCurrencyChartData);
                                        var lastdata = TempData[TempData.length - 1][0];
                                        $scope.currentChart.series[0].setData(TempData);
                                        $scope.min = 2;
                                        var numbs = $scope.AllCurrencyChartData.map(function (x) { return x[1] || 0 });
                                        $scope.min = $scope.AllCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
                                        $scope.currentChart.yAxis[0].update({
                                                min: $scope.min,
                                        });
                                        //hChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "years").valueOf(), lastdata)
                                        $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(15, "years").valueOf(), moment.utc(lastdata).valueOf())
                                    }, 100);
                                }
                            }
                        }
                    }
                },
                yAxis: {
                    //  tickInterval: 0.00025,
                    min: $scope.min,
                    opposite: true,
                    labels: {
                        format: '{value:.4f}',
                        align: "left",
                        useHTML: true,
                        style: {
                            color: "#464547",
                            fontWeight: "bold",
                            "line-height": "16px",
                            "min-width": "60px",
                            padding: "0 2px",
                            "z-index": "-1"
                        }
                    },
                    offset: "-16"
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        borderRadiusTopLeft: '8px',
                        borderRadiusTopRight: '8px',
                        dataLabels: {
                            enabled: false,
                            format: '{point.y:.1f}'
                        }
                    }
                },
                rangeSelector: {
                    allButtonsEnabled: true,
                    labelStyle: {
                        display: 'none'
                    },
                    buttons: [{
                        type: 'hour',
                        count: 24,
                        text: '24H',
                        id: 'btn24',
                    },
                    {
                        type: 'week',
                        count: 1,
                        text: '1W'
                    },
                    {
                        type: 'month',
                        count: 1,
                        text: '1M'
                    }, {
                        type: 'year',
                        count: 1,
                        text: '1Y'
                    }, {
                        type: 'year',
                        count: 5,
                        text: '5Y'
                    }, {
                        type: 'year',
                        count: 15,
                        text: 'All'
                    }],
                    selected: 0,
                    buttonPosition: {
                        align: 'center',
                        x: 0,
                        y: 0
                    },
                    buttonTheme: {
                        fill: 'transparent',
                        stroke: '#ffffff',
                        padding: 1.5,
                        'stroke-width': 0,
                        r: 0,
                        style: {
                            color: '#393939',
                            fill: 'transparent'
                        },
                        states: {
                            hover: {
                                fill: 'transparent',
                                style: {
                                    color: '#F89522'
                                }
                            },
                            select: {
                                fill: 'transparent',
                                style: {
                                    color: '#F89522'
                                }
                            }
                        }
                    },
                    inputEnabled: false,
                    dropdown: 'never'
                },
                tooltip: {
                    backgroundColor: "rgba(0,0,0,0.7)",
                    borderWidth: 0,
                    borderRadius: 0,
                    shadow: !1,
                    style: {
                        color: "#efefef"
                    },
                    formatter: function () {
                        var points = this.points;
                        let tooltips = points.map(v => {
                        return `
                            <span style="color: ${v.color}">●</span> 1 ${v.series.name.split('/')[0]} = <b>${v.y}</b> ${v.series.name.split('/')[1]} <br>${moment(points[0].x, "x").utc().format("MMM, DD YYYY hh:mm A")} UTC
                            `
                        });
                        tooltips.unshift(false);
                        return tooltips;
                    }
                },
                series: [{
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, 'rgba(248,149,34,5)'],
                            [1, 'rgba(255,255,255,0)']
                        ]
                    },
                    color: "#f79e37",
                    type: "area",
                    name: fromcode + '/' + tocode,
                    data: $scope.DailyCurrencyChartData,
                    tooltip: {
                        valueDecimals: 4
                    }
                }]
            });
            if(rangeSelected != 0){
                $scope.currentChart.rangeSelector.clickButton(rangeSelected, true);
            }
        }
        $scope.modeedit = true;
    }
    
    $scope.prepareHistoricalYearChart = function () {
        var chartid = "HistoricalCurrencyChartContainer";
        var fromcode = $scope.CurrencyConverterFrom.code;
        var tocode = $scope.CurrencyConverterTo.code;

            $scope.min = 2;
            var numbs = $scope.HistoricalChangeRatesChartDataArray.map(function (x) { return x[1] || 0 });
            $scope.min = $scope.HistoricalChangeRatesChartDataArray[numbs.indexOf(Math.min.apply(Math, numbs))][1];
            hChart = Highcharts.stockChart(chartid, {
                chart: {
                    backgroundColor: "rgba(0,0,0,0)",
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                rangeSelector: {
                    enabled: true
                },
                scrollbar: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                plotOptions: {
                    line: {
                        lineWidth: 4
                    }
                },
                title: {
                    style: {
                        color: '#393939',
                        fontWeight: 'bold'
                    }
                },
                xAxis: {
                    minRange: 864e5,
                },
                yAxis: {
                    min: $scope.min,
                    opposite: false,
                labels: {
                    align: "right",
                    useHTML: true,
                    style: {
                        backgroundColor: "rgba(216,216,216,0.8)",
                        color: "#464547",
                        fontWeight: "bold",
                        "line-height": "16px",
                        "min-width": "40px",
                        padding: "0 2px",
                        "z-index": "-1"
                    }
                },
                offset: "-16",
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        borderRadiusTopLeft: '8px',
                        borderRadiusTopRight: '8px',
                        dataLabels: {
                            enabled: false,
                            format: '{point.y:.1f}'
                        }
                    }
                },
                rangeSelector: {
                    enabled: false,
                    allButtonsEnabled: true,
                    labelStyle: {
                        display: 'none'
                    },
                    buttons: [{
                        type: 'hour',
                        count: 24,
                        text: '24H',
                        id: 'btn24',
                    },
                    {
                        type: 'week',
                        count: 1,
                        text: '1W'
                    },
                    {
                        type: 'month',
                        count: 1,
                        text: '1M'
                    }, {
                        type: 'year',
                        count: 1,
                        text: '1Y'
                    }, {
                        type: 'year',
                        count: 5,
                        text: '5Y'
                    }, {
                        type: 'year',
                        count: 15,
                        text: 'All'
                    }],
                    selected: 0,
                    buttonPosition: {
                        align: 'center',
                        x: 0,
                        y: 0
                    },
                    buttonTheme: {
                        fill: 'transparent',
                        stroke: '#ffffff',
                        padding: 1.5,
                        'stroke-width': 0,
                        r: 0,
                        style: {
                            color: '#393939',
                            fill: 'transparent'
                        },
                        states: {
                            hover: {
                                fill: 'transparent',
                                style: {
                                    color: '#F89522'
                                }
                            },
                            select: {
                                fill: 'transparent',
                                style: {
                                    color: '#F89522'
                                }
                            }
                        }
                    },
                    inputEnabled: false,
                    dropdown: 'never'
                },
                tooltip: {
                    backgroundColor: "rgba(0,0,0,0.7)",
                    outside: true,
                    borderWidth: 0,
                    borderRadius: 0,
                    shadow: !1,
                    style: {
                        color: "#efefef"
                    },
                    formatter: function () {
                        var points = this.points;
                        let tooltips = points.map(v => {
                        return `
                            <span style="color: ${v.color}">●</span> 1 ${v.series.name.split('/')[0]} = <b>${v.y}</b> ${v.series.name.split('/')[1]} <br>${moment(points[0].x, "x").format("MMM, DD YYYY hh:mm A")} UTC
                            `
                        });
                        tooltips.unshift(false);
                        return tooltips;
                    }
                },
                series: [{
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, 'rgba(248,149,34,5)'],
                            [1, 'rgba(255,255,255,0)']
                        ]
                    },
                    color: "#f79e37",
                    type: "area",
                    name: fromcode + '/' + tocode,
                    data: $scope.HistoricalChangeRatesChartDataArray,
                    tooltip: {
                        valueDecimals: 4
                    }
                }]
            });
            
        // if ($scope.SelectedFrequency == "days") {
        //     setTimeout(function() {
        //         var TempData = angular.copy($scope.HistoricalChangeRatesChartDataArray);
        //         var lastdata = TempData[TempData.length - 1][0];
        //         hChart.series[0].setData(TempData);
        //         $scope.min = 2;
        //         var numbs = $scope.HistoricalChangeRatesChartDataArray.map(function(x) {
        //             return x[1] || 0
        //         });
        //         $scope.min = $scope.HistoricalChangeRatesChartDataArray[numbs.indexOf(Math.min.apply(Math, numbs))][1];
        //         hChart.yAxis[0].update({
        //             min: $scope.min,
        //         });
        //         // hChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "days").valueOf(), lastdata);
        //      }, 100);
        // }
        // if ($scope.SelectedFrequency == "weeks") {
        //     setTimeout(function() {
        //         var TempData = angular.copy($scope.HistoricalChangeRatesChartDataArray);
        //         var lastdata = TempData[TempData.length - 1][0];
        //         hChart.series[0].setData(TempData);
        //         $scope.min = 2;
        //         var numbs = $scope.HistoricalChangeRatesChartDataArray.map(function(x) {
        //             return x[1] || 0
        //         });
        //         $scope.min = $scope.HistoricalChangeRatesChartDataArray[numbs.indexOf(Math.min.apply(Math, numbs))][1];
        //         $scope.currentChart.yAxis[0].update({
        //             min: $scope.min,
        //         });
        //         $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "weeks").valueOf(), lastdata);
        //     }, 100);
        // }
        // if ($scope.SelectedFrequency == "months") {
        //     setTimeout(function() {
        //         var TempData = angular.copy($scope.HistoricalChangeRatesChartDataArray);
        //         var lastdata = TempData[TempData.length - 1][0];
        //         hChart.series[0].setData(TempData);
        //         var rangeTo = parseInt(moment().format("x"));
        //         var rangeFrom = parseInt(moment().add(-1, 'month').format("x"));
        //         var numbs = $scope.HistoricalChangeRatesChartDataArray.filter(function(y) {
        //             if (y[0] <= rangeTo && y[0] >= rangeFrom) {
        //                 return true;
        //             }
        //             return false;
        //         }).map(function(x) {
        //             return x[1] || 0
        //         });
        //         $scope.min = Math.min.apply(Math, numbs);
        //         hChart.yAxis[0].update({
        //             min: $scope.min,
        //         });
        //         //hChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "months").valueOf(), moment.utc(lastdata).valueOf());
        //     }, 100);
        // }
        // if ($scope.SelectedFrequency == "years") {
        //     setTimeout(function() {
        //         var TempData = angular.copy($scope.HistoricalChangeRatesChartDataArray);
        //         var lastdata = TempData[TempData.length - 1][0];
        //         hChart.series[0].setData(TempData);
        //         var rangeTo = parseInt(moment().format("x"));
        //         var rangeFrom = parseInt(moment().add(-1, 'year').format("x"));
        //         var numbs = $scope.HistoricalChangeRatesChartDataArray.filter(function(y) {
        //             if (y[0] <= rangeTo && y[0] >= rangeFrom) {
        //                 return true;
        //             }
        //             return false;
        //         }).map(function(x) {
        //             return x[1] || 0
        //         });
        //         $scope.min = Math.min.apply(Math, numbs);
        //         hChart.yAxis[0].update({
        //             min: $scope.min,
        //         });
        //       // hChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "years").valueOf(), moment.utc(lastdata).valueOf());
        //     }, 100);
        // }
        // if ($scope.SelectedFrequency == "custom-range") {
        //     setTimeout(function() {
        //         var TempData = angular.copy($scope.HistoricalChangeRatesChartDataArray);
        //         var lastdata = TempData[TempData.length - 1][0];
        //         hChart.series[0].setData(TempData);
        //         var rangeTo = parseInt(moment($scope.SelectedToDate).format("x"));
        //         var rangeFrom = parseInt(moment($scope.SelectedFromDate).format("x"));
        //         var numbs = $scope.HistoricalChangeRatesChartDataArray.filter(function(y) {
        //             if (y[0] <= rangeTo && y[0] >= rangeFrom) {
        //                 return true;
        //             }
        //             return false;
        //         }).map(function(x) {
        //             return x[1] || 0
        //         });
        //         $scope.min = Math.min.apply(Math, numbs);
        //         hChart.yAxis[0].update({
        //             min: $scope.min,
        //         });
        //         hChart.xAxis[0].setExtremes(moment.utc(rangeFrom).valueOf(), moment.utc(rangeTo).valueOf());
        //     }, 100);
        // }    
    }
   
    $scope.prepareCurrencyAlertChart = function () {
        var rateFor24h = $('#rateFor24h').val();
        var rateFor1w = $('#rateFor1w').val();
        var rateFor1m = $('#rateFor1m').val();
        var rateFor1y = $('#rateFor1y').val();
        var rateFor5y = $('#rateFor5y').val();
        var rateForAll = $('#rateForAll').val();
        var chartid = "AlertCurrencyChartContainer";
        var fromcode = $scope.CRABuyCurrencyIso.code;
        var tocode = $scope.CRASellCurrencyIso.code;
        var targetRate = $scope.SellPricePrevVal;
        var minYaxis = 1;
        var maxYaxis = 1;
            
        
        var rangeSelected = 1;
        if($scope.currentChart != null)
        {
            rangeSelected = $scope.currentChart.rangeSelector.selected;
        }
        
        $scope.currentChart = Highcharts.stockChart(chartid, {
            chart: {
                backgroundColor: "rgba(0,0,0,0)",
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            rangeSelector: {
                enabled: true
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            plotOptions: {
                line: {
                    lineWidth: 4
                }
            },
            subtitle: {
                text: ''
            },
            rangeSelector: {
                enabled: true
            },
            xAxis: {
                minRange: 864e5,
                events: {
                    setExtremes: function (e) {

                        if ($scope.DailyCurrencyChartData.length != $scope.DailyCurrencyChartDataCopyArray.length)
                            $scope.DailyCurrencyChartData = angular.copy($scope.DailyCurrencyChartDataCopyArray);

                        if (e.trigger == "rangeSelectorButton") {
                            if (e.rangeSelectorButton.text == "24H") {
                                setTimeout(function () {
                                    var result = (rateFor24h / 100) * $scope.CurrencyConvertRate;
                                    targetRate= Number($scope.CurrencyConvertRate-result).toFixed(5);
                                    
                                    var TempData = angular.copy($scope.DailyCurrencyChartData);
                                    var lastdata = TempData[TempData.length - 1][0];
                                    $scope.currentChart.series[0].setData(TempData);
                                    var numbs = $scope.DailyCurrencyChartData.map(function (x) { return x[1] || 0 });
                                    minYaxis = Math.min.apply(Math, numbs);
                                    maxYaxis = Math.max.apply(Math, numbs);
                                    if(targetRate < minYaxis)
                                    {
                                        minYaxis = targetRate;
                                    }
                                    if(targetRate > maxYaxis)
                                    {
                                        maxYaxis = targetRate;
                                    }
                                    $scope.currentChart.yAxis[0].update({
                                        min: minYaxis,
                                        max: maxYaxis
                                    });
                                    $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "days").valueOf(), lastdata);
                                }, 100);
                            }
                            if (e.rangeSelectorButton.text == "1W") {
                                    setTimeout(function () {
                                        var result = (rateFor1w / 100) * $scope.CurrencyConvertRate;
                                        targetRate = Number($scope.CurrencyConvertRate-result).toFixed(5);
                                     
                                        var TempData = angular.copy($scope.WeeklyCurrencyChartData);
                                        var lastdata = TempData[TempData.length - 1][0];
                                        $scope.currentChart.series[0].setData(TempData);
                                        var numbs = $scope.WeeklyCurrencyChartData.map(function (x) { return x[1] || 0 });
                                        minYaxis = Math.min.apply(Math, numbs);
                                        maxYaxis = Math.max.apply(Math, numbs);
                                        if(targetRate < minYaxis)
                                        {
                                            minYaxis = targetRate;
                                        }
                                        if(targetRate > maxYaxis)
                                        {
                                            maxYaxis = targetRate;
                                        }
                                        $scope.currentChart.yAxis[0].update({
                                            min: minYaxis,
                                            max: maxYaxis
                                        });
                                        $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "weeks").valueOf(), lastdata);
                                    }, 100);
                                }
                            if (e.rangeSelectorButton.text == "1M") {
                                setTimeout(function () {
                                    var result = (rateFor1m / 100) * $scope.CurrencyConvertRate;
                                    targetRate = Number($scope.CurrencyConvertRate-result).toFixed(5);
                                    
                                    var TempData = angular.copy($scope.AllCurrencyChartData);
                                    var lastdata = TempData[TempData.length - 1][0];
                                    $scope.currentChart.series[0].setData(TempData);
                                    var rangeTo = parseInt(moment().format("x"));
                                    var rangeFrom = parseInt(moment().add(-1, 'month').format("x"));
                                    var numbs = $scope.AllCurrencyChartData.filter(function (y) {
                                        if (y[0] <= rangeTo && y[0] >= rangeFrom) {
                                            return true;
                                        }
                                        return false;
                                    }).map(function (x) { return x[1] || 0 });
                                    minYaxis = Math.min.apply(Math, numbs);
                                    maxYaxis = Math.max.apply(Math, numbs);
                                    if(targetRate < minYaxis)
                                    {
                                        minYaxis = targetRate;
                                    }
                                    if(targetRate > maxYaxis)
                                    {
                                        maxYaxis = targetRate;
                                    }
                                    $scope.currentChart.yAxis[0].update({
                                        min: minYaxis,
                                        max: maxYaxis
                                    });
                                    $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "months").valueOf(), moment.utc(lastdata).valueOf());
                                }, 100);
                                $scope.countSelect++;
                            }
                            if (e.rangeSelectorButton.text == "1Y") {
                                setTimeout(function () {
                                    var result = (rateFor1y / 100) * $scope.CurrencyConvertRate;
                                    targetRate = Number($scope.CurrencyConvertRate-result).toFixed(5);
                                    
                                    var TempData = angular.copy($scope.AllCurrencyChartData);
                                    var lastdata = TempData[TempData.length - 1][0];
                                    $scope.currentChart.series[0].setData(TempData);
                                    var rangeTo = parseInt(moment().format("x"));
                                    var rangeFrom = parseInt(moment().add(-1, 'year').format("x"));
                                    var numbs = $scope.AllCurrencyChartData.filter(function (y) {
                                        if (y[0] <= rangeTo && y[0] >= rangeFrom) {
                                            return true;
                                        }
                                        return false;
                                    }).map(function (x) { return x[1] || 0 });
                                    minYaxis = Math.min.apply(Math, numbs);
                                    maxYaxis = Math.max.apply(Math, numbs);
                                    if(targetRate < minYaxis)
                                    {
                                        minYaxis = targetRate;
                                    }
                                    if(targetRate > maxYaxis)
                                    {
                                        maxYaxis = targetRate;
                                    }
                                    $scope.currentChart.yAxis[0].update({
                                        min: minYaxis,
                                        max: maxYaxis
                                    });
                                    $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "years").valueOf(), moment.utc(lastdata).valueOf());
                                }, 100);
                            }
                            if (e.rangeSelectorButton.text == "5Y") {
                                setTimeout(function () {
                                    var result = (rateFor5y / 100) * $scope.CurrencyConvertRate;
                                    targetRate = Number($scope.CurrencyConvertRate-result).toFixed(5);
                                    
                                    var TempData = angular.copy($scope.AllCurrencyChartData);
                                    var lastdata = TempData[TempData.length - 1][0];
                                    $scope.currentChart.series[0].setData(TempData);
                                    var numbs = $scope.AllCurrencyChartData.map(function (x) { return x[1] || 0 });
                                    minYaxis = $scope.AllCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
                                    maxYaxis = Math.max.apply(Math, numbs);
                                    if(targetRate < minYaxis)
                                    {
                                        minYaxis = targetRate;
                                    }
                                    if(targetRate > maxYaxis)
                                    {
                                        maxYaxis = targetRate;
                                    }
                                    $scope.currentChart.yAxis[0].update({
                                        min: minYaxis,
                                        max: maxYaxis
                                    });
                                    $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(5, "years").valueOf(), moment.utc(lastdata).valueOf());
                                }, 100);
                            }
                            if (e.rangeSelectorButton.text == "All") {
                                setTimeout(function () {
                                    var result = (rateForAll / 100) * $scope.CurrencyConvertRate;
                                    targetRate = Number($scope.CurrencyConvertRate-result).toFixed(5);
                                    
                                    var TempData = angular.copy($scope.AllCurrencyChartData);
                                    var lastdata = TempData[TempData.length - 1][0];
                                    $scope.currentChart.series[0].setData(TempData);
                                    var numbs = $scope.AllCurrencyChartData.map(function (x) { return x[1] || 0 });
                                    minYaxis = $scope.AllCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
                                    maxYaxis = Math.max.apply(Math, numbs);
                                    if(targetRate < minYaxis)
                                    {
                                        minYaxis = targetRate;
                                    }
                                    if(targetRate > maxYaxis)
                                    {
                                        maxYaxis = targetRate;
                                    }
                                    $scope.currentChart.yAxis[0].update({
                                        min: minYaxis,
                                        max: maxYaxis
                                    });
                                    $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(15, "years").valueOf(), moment.utc(lastdata).valueOf());
                                }, 100);
                            }
                            setTimeout(function () {
                                    $scope.$apply(() => {
                                        // To update name on rootScope 
                                        // forcefully, use $apply function
                                        $scope.SellPrice = targetRate;
                                        $scope.SellPricePrevVal = $scope.SellPrice;
                                    });
                                    $scope.currentChart.yAxis[0].update({
                                          plotLines: [{
                                            value: targetRate,
                                            color: '#70AD47',
                                            dashStyle: 'dash',
                                            width: 2,
                                            zIndex: 4,
                                            label: {
                                                useHTML: true,
                                                text: 'Target Rate:' + ' ' + targetRate,
                                                align: 'right',
                                                style: {
                                                    color: '#70AD47',
                                                    fontWeight: 'bold',
                                                    textAlign: 'right',
                                                    paddingRight: "10px",
                                                }
                                            }
                                        },
                                        {
                                            value: $scope.DailyCurrencyChartData[$scope.DailyCurrencyChartData.length - 1][1],
                                            color: '#393939',
                                            dashStyle: 'dash',
                                            width: 2,
                                            zIndex: 4,
                                            label: {
                                                useHTML: true,
                                                text: 'Current Rate:' + ' ' + $scope.CurrencyConvertRate,
                                                align: 'right',
                                                style: {
                                                    color: '#393939',
                                                    fontWeight: 'bold',
                                                    textAlign: 'left',
                                                    paddingLeft: "85px",
                                                }
                        
                                            }
                                        }]
                                        });
                                }, 100);
                        }
                    }
                }
            },
            yAxis: {
                softMax: targetRate,
                softMin: targetRate,
                opposite: false,
                labels: {
                    align: "right",
                    useHTML: true,
                    style: {
                        backgroundColor: "rgba(216,216,216,0.8)",
                        color: "#464547",
                        fontWeight: "bold",
                        "line-height": "16px",
                        "min-width": "60px",
                        padding: "0 2px",
                        "z-index": "-1"
                    }
                },
                offset: "-16",
                plotLines: [
                {
                    value: targetRate,
                    color: '#70AD47',
                    dashStyle: 'dash',
                    width: 2,
                    zIndex: 4,
                    label: {
                        useHTML: true,
                        text: 'Target Rate:' + ' ' + targetRate,
                        align: 'right',
                        style: {
                            color: '#70AD47',
                            fontWeight: 'bold',
                            textAlign: 'right',
                            paddingRight: "10px",
                        }
                    }
                },
                {
                    value: $scope.DailyCurrencyChartData[$scope.DailyCurrencyChartData.length - 1][1],
                    color: '#393939',
                    dashStyle: 'dash',
                    width: 2,
                    zIndex: 4,
                    label: {
                        useHTML: true,
                        text: 'Current Rate:' + ' ' + $scope.CurrencyConvertRate,
                        align: 'right',
                        style: {
                            color: '#393939',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            paddingLeft: "85px",
                        }

                    }
                }]
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    borderRadiusTopLeft: '8px',
                    borderRadiusTopRight: '8px',
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.1f}'
                    }
                }
            },
            rangeSelector: {
                enabled: true,
                allButtonsEnabled: true,
                labelStyle: {
                    display: 'none'
                },
                buttons: [{
                    type: 'hour',
                    count: 24,
                    text: '24H',
                    id: 'btn24',
                }, 
                {
                    type: 'week',
                    count: 1,
                    text: '1W'
                },
                {
                    type: 'month',
                    count: 1,
                    text: '1M'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1Y'
                }, {
                    type: 'year',
                    count: 5,
                    text: '5Y'
                }, {
                    type: 'year',
                    count: 15,
                    text: 'All'
                }],
                selected: rangeSelected,
                buttonPosition: {
                    align: 'center',
                    x: 0,
                    y: 0
                },
                buttonTheme: {
                    fill: 'transparent',
                    stroke: '#ffffff',
                    padding: 1.5,
                    'stroke-width': 0,
                    r: 0,
                    style: {
                        color: '#393939',
                        fill: 'transparent'
                    },
                    states: {
                        hover: {
                            fill: 'transparent',
                            style: {
                                color: '#F89522'
                            }
                        },
                        select: {
                            fill: 'transparent',
                            style: {
                                color: '#F89522'
                            }
                        }
                    }
                },
                inputEnabled: false,
                dropdown: 'never'
            },
            tooltip: {
                backgroundColor: "rgba(0,0,0,0.7)",
                borderWidth: 0,
                borderRadius: 0,
                shadow: !1,
                style: {
                    color: "#efefef"
                },
                formatter: function () {
                    var points = this.points;
                    let tooltips = points.map(v => {
                        return `
                            <span style="color: ${v.color}">●</span> 1 ${v.series.name.split('/')[0]} = <b>${v.y}</b> ${v.series.name.split('/')[1]} <br>${moment(points[0].x, "x").utc().format("MMM, DD YYYY hh:mm A")} UTC
                            `
                    });
                    tooltips.unshift(false);
                    return tooltips;
                }
            },
            series: [{
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'rgba(248,149,34,5)'],
                        [1, 'rgba(255,255,255,0)']
                    ]
                },
                color: "#f79e37",
                type: "area",
                data: $scope.DailyCurrencyChartData,
                name: fromcode + '/' + tocode,
                tooltip: {
                    valueDecimals: 4
                }
            }]
        });
        
        $scope.currentChart.rangeSelector.clickButton(rangeSelected, true);
    }

    $scope.prepareRateCalulatorChart = function () {
        var chartid = "RateCalulatorChartContainer";
        var Equel = $scope.SellPricePrevVal;
        var minYaxis = 1;
        var fromcode = $scope.CurrencyConverterFrom.code;
        var tocode = $scope.CurrencyConverterTo.code;

        $("#RateCalculatorTitle").empty();
        $("#RateCalculatorTitle").append($scope.CurrencyConverterFrom.code + "&nbsp;to&nbsp;" + $scope.CurrencyConverterTo.code + "&nbsp;Conversion");

        var rangeSelected = 1;
        if($scope.currentChart != null)
        {
            rangeSelected = $scope.currentChart.rangeSelector.selected;
        }
        
        $scope.currentChart = Highcharts.stockChart(chartid, {
            chart: {
                backgroundColor: "rgba(0,0,0,0)",
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            rangeSelector: {
                enabled: true
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            plotOptions: {
                line: {
                    lineWidth: 4
                }
            },
            subtitle: {
                text: ''
            },
            rangeSelector: {
                enabled: true
            },
             xAxis: {
                minRange: 864e5,
                events: {
                    setExtremes: function (e) {

                        if ($scope.DailyCurrencyChartData.length != $scope.DailyCurrencyChartDataCopyArray.length)
                            $scope.DailyCurrencyChartData = angular.copy($scope.DailyCurrencyChartDataCopyArray);

                        if (e.trigger == "rangeSelectorButton") {
                            if (e.rangeSelectorButton.text == "24H") {
                                setTimeout(function () {
                                    var TempData = angular.copy($scope.DailyCurrencyChartData);
                                    var lastdata = TempData[TempData.length - 1][0];
                                    $scope.currentChart.series[0].setData(TempData);
                                    var numbs = $scope.DailyCurrencyChartData.map(function (x) { return x[1] || 0 });
                                    minYaxis = $scope.DailyCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
                                    $scope.currentChart.yAxis[0].update({
                                        min: minYaxis,
                                    });
                                    $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "days").valueOf(), lastdata)
                                }, 100);
                            }
                            if (e.rangeSelectorButton.text == "1W") {
                                    setTimeout(function () {
                                        var TempData = angular.copy($scope.WeeklyCurrencyChartData);
                                        var lastdata = TempData[TempData.length - 1][0];
                                        $scope.currentChart.series[0].setData(TempData);
                                        $scope.min = 2;
                                        var numbs = $scope.WeeklyCurrencyChartData.map(function (x) { return x[1] || 0 });
                                        $scope.min = $scope.WeeklyCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
                                        $scope.currentChart.yAxis[0].update({
                                            min: $scope.min,
                                        });
                                        $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "weeks").valueOf(), lastdata)
                                    }, 100);
                                }
                            if (e.rangeSelectorButton.text == "1M") {
                                setTimeout(function () {
                                    var TempData = angular.copy($scope.AllCurrencyChartData);
                                    var lastdata = TempData[TempData.length - 1][0];
                                    $scope.currentChart.series[0].setData(TempData);
                                    var rangeTo = parseInt(moment().format("x"));
                                    var rangeFrom = parseInt(moment().add(-1, 'month').format("x"));
                                    var numbs = $scope.AllCurrencyChartData.filter(function (y) {
                                        if (y[0] <= rangeTo && y[0] >= rangeFrom) {
                                            return true;
                                        }
                                        return false;
                                    }).map(function (x) { return x[1] || 0 });
                                    minYaxis = Math.min.apply(Math, numbs);
                                    $scope.currentChart.yAxis[0].update({
                                        min: minYaxis,
                                    });
                                    $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "months").valueOf(), moment.utc(lastdata).valueOf())
                                }, 100);
                                $scope.countSelect++;
                            }
                            if (e.rangeSelectorButton.text == "1Y") {
                                setTimeout(function () {
                                    var TempData = angular.copy($scope.AllCurrencyChartData);
                                    var lastdata = TempData[TempData.length - 1][0];
                                    $scope.currentChart.series[0].setData(TempData);
                                    var rangeTo = parseInt(moment().format("x"));
                                    var rangeFrom = parseInt(moment().add(-1, 'year').format("x"));
                                    var numbs = $scope.AllCurrencyChartData.filter(function (y) {
                                        if (y[0] <= rangeTo && y[0] >= rangeFrom) {
                                            return true;
                                        }
                                        return false;
                                    }).map(function (x) { return x[1] || 0 });
                                    minYaxis = Math.min.apply(Math, numbs);
                                    $scope.currentChart.yAxis[0].update({
                                        min: minYaxis,
                                    });
                                    $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(1, "years").valueOf(), moment.utc(lastdata).valueOf())
                                }, 100);
                            }
                            if (e.rangeSelectorButton.text == "5Y") {
                                setTimeout(function () {
                                    var TempData = angular.copy($scope.AllCurrencyChartData);
                                    var lastdata = TempData[TempData.length - 1][0];
                                    $scope.currentChart.series[0].setData(TempData);
                                    var numbs = $scope.AllCurrencyChartData.map(function (x) { return x[1] || 0 });
                                    minYaxis = $scope.AllCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
                                    $scope.currentChart.yAxis[0].update({
                                        min: minYaxis,
                                    });
                                    $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(5, "years").valueOf(), moment.utc(lastdata).valueOf())
                                }, 100);
                            }
                            if (e.rangeSelectorButton.text == "All") {
                                setTimeout(function () {
                                    var TempData = angular.copy($scope.AllCurrencyChartData);
                                    var lastdata = TempData[TempData.length - 1][0];
                                    $scope.currentChart.series[0].setData(TempData);
                                    var numbs = $scope.AllCurrencyChartData.map(function (x) { return x[1] || 0 });
                                    minYaxis = $scope.AllCurrencyChartData[numbs.indexOf(Math.min.apply(Math, numbs))][1];
                                    $scope.currentChart.yAxis[0].update({
                                        min: minYaxis,
                                    });
                                    $scope.currentChart.xAxis[0].setExtremes(moment.utc(lastdata).subtract(15, "years").valueOf(), moment.utc(lastdata).valueOf())
                                }, 100);
                            }
                        }
                    }
                }
            },
            yAxis: {
                softMax: Equel,
                softMin: Equel,
                opposite: false,
                labels: {
                    align: "right",
                    useHTML: true,
                    style: {
                        backgroundColor: "rgba(216,216,216,0.8)",
                        color: "#464547",
                        fontWeight: "bold",
                        "line-height": "16px",
                        "min-width": "60px",
                        padding: "0 2px",
                        "z-index": "-1"
                    }
                },
                offset: "-16",
                plotLines: [{
                    value: $scope.DailyCurrencyChartData[$scope.DailyCurrencyChartData.length - 1][1],
                    color: '#393939',
                    dashStyle: 'dash',
                    width: 2,
                    zIndex: 4,
                    label: {
                        useHTML: true,
                        text: 'Current Rate:' + ' ' + $scope.CurrencyConvertRate,
                        align: 'right',
                        max: 200,
                        style: {
                            color: '#393939',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            paddingLeft: "85px",
                        }
                        // text: '<div class="plot-line-label-main"><span class="plot-line-label-left label-green">' + $scope.DailyCurrencyChartData[$scope.DailyCurrencyChartData.length - 1][1] + '</span> </div>',
                        // text: $scope.DailyCurrencyChartData[$scope.DailyCurrencyChartData.length - 1][1]
                    }
                }]
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    borderRadiusTopLeft: '8px',
                    borderRadiusTopRight: '8px',
                    dataLabels: {
                        enabled: false,
                        format: '{point.y:.1f}'
                    }
                }
            },
            rangeSelector: {
                enabled: true,
                allButtonsEnabled: true,
                labelStyle: {
                    display: 'none'
                },
                buttons: [{
                    type: 'hour',
                    count: 24,
                    text: '24H',
                    id: 'btn24',
                }, 
                {
                    type: 'week',
                    count: 1,
                    text: '1W'
                },
                {
                    type: 'month',
                    count: 1,
                    text: '1M'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1Y'
                }, {
                    type: 'year',
                    count: 5,
                    text: '5Y'
                }, {
                    type: 'year',
                    count: 15,
                    text: 'All'
                }],
                selected: 0,
                buttonPosition: {
                    align: 'center',
                    x: 0,
                    y: 0
                },
                buttonTheme: {
                    fill: 'transparent',
                    stroke: '#ffffff',
                    padding: 1.5,
                    'stroke-width': 0,
                    r: 0,
                    style: {
                        color: '#393939',
                        fill: 'transparent'
                    },
                    states: {
                        hover: {
                            fill: 'transparent',
                            style: {
                                color: '#F89522'
                            }
                        },
                        select: {
                            fill: 'transparent',
                            style: {
                                color: '#F89522'
                            }
                        }
                    }
                },
                inputEnabled: false,
                dropdown: 'never'
            },
            tooltip: {
                backgroundColor: "rgba(0,0,0,0.7)",
                borderWidth: 0,
                borderRadius: 0,
                shadow: !1,
                style: {
                    color: "#efefef"
                },
                formatter: function () {
                    var points = this.points;
                    let tooltips = points.map(v => {
                        return `
                            <span style="color: ${v.color}">●</span> 1 ${v.series.name.split('/')[0]} = <b>${v.y}</b> ${v.series.name.split('/')[1]} <br>${moment(points[0].x, "x").utc().format("MMM, DD YYYY hh:mm A")} UTC
                            `
                    });
                    tooltips.unshift(false);
                    return tooltips;
                }
            },
            series: [{
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'rgba(248,149,34,5)'],
                        [1, 'rgba(255,255,255,0)']
                    ]
                },
                color: "#f79e37",
                type: "area",
                name: fromcode + '/' + tocode,
                data: $scope.DailyCurrencyChartData,
                tooltip: {
                    valueDecimals: 4
                }
            }]
        });

        $scope.currentChart.rangeSelector.clickButton(rangeSelected, true);
    }
    
    $scope.GetChartData = function (fromcurrency, tocurrency) {
        var deferred = $q.defer();
        if (fromcurrency != "" && fromcurrency != undefined) {
            ToolsFactory.GetMTFXHistoricalRate(fromcurrency + tocurrency)
            .then(function (response) {
                if (response != null) {
                    if (response.length > 0) {
                         $(".chartcurrentDateTime").text(moment().format("LLL"));
                        $scope.AllCurrencyChartData = angular.copy(response[0]["AllData"]);
                        $scope.DailyCurrencyChartData = angular.copy(response[0]["DailyData"]);
                        $scope.DailyCurrencyChartDataCopyArray = angular.copy(response[0]["DailyData"]);
                        $scope.WeeklyCurrencyChartData = angular.copy(response[0]["WeeklyData"]);
                        
                        /* Add Daily last data into All Data */
                        $scope.AllCurrencyChartData.push($scope.DailyCurrencyChartData[$scope.DailyCurrencyChartData.length - 1]);
                        /*if($scope.AllCurrencyChartData.length > 0 & $scope.DailyCurrencyChartData.length > 0 )
                        {
                             if(moment(moment($scope.AllCurrencyChartData[$scope.AllCurrencyChartData.length - 1][0]).format("L")).isSame(moment($scope.DailyCurrencyChartData[$scope.DailyCurrencyChartData.length - 1][0]).format("L")))
                            {
                                $scope.AllCurrencyChartData[$scope.AllCurrencyChartData.length - 1][1] = $scope.DailyCurrencyChartData[$scope.DailyCurrencyChartData.length - 1][1];
                            }
                            else{
                                var element = [];
                                element.push(moment($scope.AllCurrencyChartData[$scope.AllCurrencyChartData.length - 1][0]).add(1, 'd').unix());
                                element.push($scope.DailyCurrencyChartData[$scope.DailyCurrencyChartData.length - 1][1]);
                                $scope.AllCurrencyChartData.push(element);
                            }
                        } */
                        
                    }
                    deferred.resolve(true);
                }
            }).catch(function (response) {
                deferred.resolve(false);
            });
        }
        return deferred.promise;
    };
    
    $scope.GetCurrencyParameters = function () {
        var Send = getParameterByName("from");
        var Receive = getParameterByName("to");
        if (Send != "" && Send != null) {
            $scope.CurrencyChartFrom = {
                code: Send.toUpperCase(),
                name: $scope.currenciesWithNames.find((o) => { return o['code'] === Send.toUpperCase() }).name
            };
       
        }
        if (Receive != "" && Receive != null) {
             $scope.CurrencyChartTo = {
                code: Receive.toUpperCase(),
                name: $scope.currenciesWithNames.find((o) => { return o['code'] === Receive.toUpperCase() }).name
            };
        }
        $scope.GetChartRate($scope.CurrencyChartFrom.code, $scope.CurrencyChartTo.code)
        .then(function (response) {
            $scope.CurrencyChartRate = response;

            $scope.CreateChart(1);
        });
    }
    
    $scope.getQueryString = function () {
        $scope.tabCurrencies = JSON.parse(localStorage.getItem("tabCurrencies"));
        if($scope.tabCurrencies == null) {
           $scope.tabCurrencies = [];
        }
        var Send = getParameterByName("from");
        var Receive = getParameterByName("to");
        if(Send != "" && Receive != "" && Send != null && Receive != null) {
            $scope.tabCurrencies = [];
            localStorage.setItem("tabCurrencies", null);
            $scope.CurrencyChartFrom = {
                code: Send.toUpperCase(),
                name: $scope.currenciesWithNames.find((o) => { return o['code'] === Send.toUpperCase() }).name
            };
            $scope.CurrencyChartTo = {
                code: Receive.toUpperCase(),
                name: $scope.currenciesWithNames.find((o) => { return o['code'] === Receive.toUpperCase() }).name
            };
            for(var k = 0; k< $scope.tabCurrencies.length; k++) {
                if($scope.tabCurrencies[k].CurrencyChartFrom == $scope.CurrencyChartFrom.code && $scope.tabCurrencies[k].CurrencyChartTo == $scope.CurrencyChartTo.code) {
                    $scope.index = k; 
                    $scope.present = true;
                    $scope.GetChartRate($scope.CurrencyChartFrom.code, $scope.CurrencyChartTo.code)
                    .then(function (response) {
                        $scope.CurrencyChartRate = response;
                        $scope.tabCurrencies[$scope.index].rate = $scope.CurrencyChartRate.rate;
                    });
                    $scope.CreateChart(1);
                    $scope.tabCurrencies[$scope.index].tabclass ="nav-link active";
                    for(var i = 0;i<$scope.tabCurrencies.length;i++) {
                        if(i != $scope.index) {
                            $scope.tabCurrencies[i].tabclass ="nav-link";
                        }
                    }
                    $("#0").removeClass("nav-link active");
                    $("#1").removeClass("nav-link active");
                    $("#2").removeClass("nav-link active");
                    $("#0").addClass("nav-link");
                    $("#1").addClass("nav-link");
                    $("#2").addClass("nav-link");
                    $("#" + $scope.index).addClass("nav-link active");
                    var url = window.location.href;
                    //window.location.href.replace(window.location.search,url.split('?')[0]);
                    window.history.replaceState({}, document.title,url.split('?')[1]);
                }
            }
            if(!$scope.present) {
                $scope.GetChartRate($scope.CurrencyChartFrom.code, $scope.CurrencyChartTo.code)
                .then(function (response) {
                    $scope.CurrencyChartRate = response;
                    var obj = { rate: $scope.CurrencyChartRate.rate, CurrencyChartFrom: $scope.CurrencyChartFrom.code, CurrencyChartTo: $scope.CurrencyChartTo.code, tabclass: "nav-link active"}
                    $scope.tabCurrencies.splice(0, 0, obj);
                    $scope.CreateChart(1);
                    if($scope.tabCurrencies.length >= 4) {
                        $scope.tabCurrencies.splice($scope.tabCurrencies.length - 1,1);
                        // $scope.tabCurrencies.splice(0,1);
                    }
                    localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
                    //$scope.index = $scope.tabCurrencies.length - 1;
                    $scope.index = 0;
                    for(var i = 0;i<$scope.tabCurrencies.length;i++) {
                        if(i != $scope.index) {
                            $scope.tabCurrencies[i].tabclass ="nav-link";
                        }
                    }
                    $("#0").removeClass("nav-link active");
                    $("#1").removeClass("nav-link active");
                    $("#2").removeClass("nav-link active");
                    $("#0").addClass("nav-link");
                    $("#1").addClass("nav-link");
                    $("#2").addClass("nav-link");
                    $("#" + $scope.index).addClass("nav-link active");
                    var url = window.location.href;
                    //window.location.href.replace(window.location.search,url.split('?')[0]);
                    window.history.replaceState({}, document.title,url.split('?')[0]);
                });
            }
        }
        else {
            if($scope.tabCurrencies.length == 0) {
                $scope.GetChartRate($scope.CurrencyChartFrom.code, $scope.CurrencyChartTo.code)
                .then(function (response) {
                    $scope.CurrencyChartRate = response;
                    var obj = { rate: $scope.CurrencyChartRate.rate, CurrencyChartFrom: $scope.CurrencyChartFrom.code, CurrencyChartTo: $scope.CurrencyChartTo.code , tabclass:"nav-link active"}
                    //$scope.tabCurrencies.push(obj);
                    $scope.tabCurrencies.splice(0, 0, obj);
                    $scope.CreateChart(1);
                    if($scope.tabCurrencies.length >= 4) {
                        //$scope.tabCurrencies.splice(0,1);
                        $scope.tabCurrencies.splice($scope.tabCurrencies.length - 1,1);
                    }
                    localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
                    //$scope.index = $scope.tabCurrencies.length - 1;
                    $scope.index = 0;
                    for(var i = 0;i<$scope.tabCurrencies.length;i++) {
                        if(i != $scope.index) {
                            $scope.tabCurrencies[i].tabclass ="nav-link";
                        }
                    }
                });
            } else {
                 $scope.CurrencyChartFrom = {
                    code: $scope.tabCurrencies[0].CurrencyChartFrom.toUpperCase(),
                    name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.tabCurrencies[0].CurrencyChartFrom.toUpperCase() }).name
                };
                $scope.CurrencyChartTo = {
                    code: $scope.tabCurrencies[0].CurrencyChartTo.toUpperCase(),
                    name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.tabCurrencies[0].CurrencyChartTo.toUpperCase() }).name
                };
                $scope.GetChartRate($scope.CurrencyChartFrom.code, $scope.CurrencyChartTo.code)
                .then(function (response) {
                    $scope.CurrencyChartRate = response;
                    $scope.tabCurrencies[0].rate = $scope.CurrencyChartRate.rate;
                    $scope.CreateChart(1);
                    if($scope.tabCurrencies.length >= 4) {
                        $scope.tabCurrencies.splice($scope.tabCurrencies.length - 1,1);
                    }
                    localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
                    $scope.index = 0;
                    $scope.tabCurrencies[$scope.index].tabclass ="nav-link active";
                    for(var i = 0;i<$scope.tabCurrencies.length;i++) {
                        if(i != $scope.index) {
                            $scope.tabCurrencies[i].tabclass ="nav-link";
                        }
                    }
                    $("#0").removeClass("nav-link active");
                    $("#1").removeClass("nav-link active");
                    $("#2").removeClass("nav-link active");
                    $("#0").addClass("nav-link");
                    $("#1").addClass("nav-link");
                    $("#2").addClass("nav-link");
                    $("#" + $scope.index).addClass("nav-link active");
                    if($scope.tabCurrencies.length > 1){
                        $scope.GetChartRate($scope.tabCurrencies[1].CurrencyChartFrom, $scope.tabCurrencies[1].CurrencyChartTo)
                        .then(function (response) {
                            $scope.tabCurrencies[1].rate = response.rate;
                        })
                    }
                    if($scope.tabCurrencies.length > 2){
                        $scope.GetChartRate($scope.tabCurrencies[2].CurrencyChartFrom, $scope.tabCurrencies[2].CurrencyChartTo)
                        .then(function (response) {
                            $scope.tabCurrencies[2].rate = response.rate;
                        })
                    }
                    localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies)); 
                });
            }
        }
    }
    
    $scope.PopupAddPair = function (){
        $scope.ispresent = false;
        for(var i =0;i<$scope.tabCurrencies.length;i++) {
            if($scope.tabCurrencies[i].CurrencyChartFrom + $scope.tabCurrencies[i].CurrencyChartTo == $scope.CurrencyChartFrom.code + $scope.CurrencyChartTo.code) {
                $scope.ispresent = true;
            }
        }
        if($scope.CurrencyChartFrom.code == $scope.CurrencyChartTo.code){
            $scope.message = "Please select different currency in From and To. "
            $scope.showmessage = true;
        }else{
        if(!$scope.ispresent) {
            $scope.GetChartRate($scope.CurrencyChartFrom.code, $scope.CurrencyChartTo.code)
            .then(function (response) {
                $scope.CurrencyChartRate = response;
                var obj = { rate: $scope.CurrencyChartRate.rate ,CurrencyChartFrom: $scope.CurrencyChartFrom.code, CurrencyChartTo:$scope.CurrencyChartTo.code,tabclass:"nav-link active"}
                $scope.tabCurrencies.splice(0, 0, obj);
                var length = $scope.tabCurrencies.length;
                if ($scope.tabCurrencies.length >= 4) {
                    $scope.addvisible = false;
                    $scope.tabCurrencies.splice($scope.tabCurrencies.length - 1,1);
                    length = 3;
                }
                $scope.index = 0;
                $scope.CreateChart(1);
                for(var i = 0;i<$scope.tabCurrencies.length;i++) {
                    if(i != $scope.index) {
                        $scope.tabCurrencies[i].tabclass ="nav-link";
                    }
                }
                $("#0").removeClass("nav-link active");
                $("#1").removeClass("nav-link active");
                $("#2").removeClass("nav-link active");
                $("#0").addClass("nav-link");
                $("#1").addClass("nav-link");
                $("#2").addClass("nav-link");
                $("#" + $scope.index).addClass("nav-link active");
                localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
                $('.chartadd-modal').modal('hide');
            });
        } else {
            $scope.showmessage = true;
            $scope.message = "This Pair already exists!"
        } 
        }
    }
    
    $scope.RemoveValidation = function(){
        $scope.message = " ";
        $scope.showmessage = false;
    }
    
    $scope.ViewCurrencyChart = function () {
        var ispresent = false;
        var id = $scope.currentChartID;
        if ($scope.CurrencyChartFrom.code + $scope.CurrencyChartTo.code === $scope.editCurrencyChartFrom.code + $scope.editCurrencyChartTo.code) {
                ispresent = true;
            } else if ($scope.CurrencyChartFrom2.code + $scope.CurrencyChartTo2.code === $scope.editCurrencyChartFrom.code + $scope.editCurrencyChartTo.code) {
                 ispresent = true;
            } else if ($scope.CurrencyChartFrom3.code + $scope.CurrencyChartTo3.code === $scope.editCurrencyChartFrom.code + $scope.editCurrencyChartTo.code) {
                 ispresent = true;
            } else if ($scope.CurrencyChartFrom4.code + $scope.CurrencyChartTo4.code === $scope.editCurrencyChartFrom.code + $scope.editCurrencyChartTo.code) {
                 ispresent = true;
            }
        if(!ispresent) {
            if (id != undefined && id == 1) {
                $scope.CurrencyChartFrom = $scope.editCurrencyChartFrom;
                $scope.CurrencyChartTo = $scope.editCurrencyChartTo;
            } else if (id != undefined && id == 2) {
                 $scope.CurrencyChartFrom2 = $scope.editCurrencyChartFrom;
                $scope.CurrencyChartTo2 = $scope.editCurrencyChartTo;
            } else if (id != undefined && id == 3) {
                 $scope.CurrencyChartFrom3 = $scope.editCurrencyChartFrom;
                $scope.CurrencyChartTo3 = $scope.editCurrencyChartTo;
            } else if (id != undefined && id == 4) {
                 $scope.CurrencyChartFrom4 = $scope.editCurrencyChartFrom;
                $scope.CurrencyChartTo4 = $scope.editCurrencyChartTo;
            }
            
            $scope.GetChartRate($scope.editCurrencyChartFrom.code, $scope.editCurrencyChartTo.code)
            .then(function (response) {
                if (id != undefined && id == 1) {
                    $scope.CurrencyChartRate = response;
                } else if (id != undefined && id == 2) {
                     $scope.CurrencyChartRate2 = response;
                } else if (id != undefined && id == 3) {
                     $scope.CurrencyChartRate3 = response;
                } else if (id != undefined && id == 4) {
                     $scope.CurrencyChartRate4 = response;
                }
                
                $scope.CreateChart(id);
                $('.chartedit-modal').modal('hide');
            });
            
            $scope.message = " ";
            $scope.showmessage = false;
        } else {
            $scope.message = "This Pair already exists!"
            $scope.showmessage = true;
        }
    }
    
    //   $scope.ShowPopupChart = function () {
    //     $scope.ispresent = false;
    //     if($scope.editCurrencyChartFrom.code == $scope.editCurrencyChartTo.code)
    //     {
    //         $scope.message = "Please select different currency in From and To. "
    //         $scope.showmessage = true;
    //     }else{
    //     if(!$scope.ispresent) {
    //         if ($scope.index == null || $scope.index == undefined || $scope.index == "") {
    //             $scope.index = 0;
    //         }
    //         $scope.tabCurrencies[$scope.index].CurrencyChartFrom = $scope.editCurrencyChartFrom.code;
    //         $scope.tabCurrencies[$scope.index].CurrencyChartTo = $scope.editCurrencyChartTo.code;
           
            
    //         if ($scope.tabCurrencies.length < 4) $scope.addvisible = true;
    //         $scope.GetChartRate($scope.editCurrencyChartFrom.code, $scope.editCurrencyChartTo.code)
    //         .then(function (response) {
    //             $scope.CurrencyChartRate = response;
    //             $scope.tabCurrencies[$scope.index].rate = $scope.CurrencyChartRate.rate;
    //             $scope.CreateChart(5);
    //             $('.chartedit-modal').modal('hide');
    //         });
    //         localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
    //         $scope.message = " ";
    //         $scope.showmessage = false;
    //         $('#currencyaddpair').removeClass('addpair-disable'); 
    //         $scope.currencyadddisable = false;
    //     } else {
    //         $scope.message = "This Pair already exists!"
    //         $scope.showmessage = true;
    //     }
    //     }
    // } 
   
    $scope.ShowPopupChart = function () {
        $scope.ispresent = false;
        for(var i =0;i<$scope.tabCurrencies.length;i++) {
            if($scope.tabCurrencies[i].CurrencyChartFrom + $scope.tabCurrencies[i].CurrencyChartTo == $scope.editCurrencyChartFrom.code + $scope.editCurrencyChartTo.code) {
                $scope.ispresent = true;
            }
        }
        if($scope.editCurrencyChartFrom.code == $scope.editCurrencyChartTo.code)
        {
            $scope.message = "Please select different currency in From and To. "
            $scope.showmessage = true;
        }else{
        
        if(!$scope.ispresent) {
            if ($scope.index == null || $scope.index == undefined || $scope.index == "") {
                $scope.index = 0;
            }
            $scope.tabCurrencies[$scope.index].CurrencyChartFrom = $scope.editCurrencyChartFrom.code;
            $scope.tabCurrencies[$scope.index].CurrencyChartTo = $scope.editCurrencyChartTo.code;
           
            
            if ($scope.tabCurrencies.length < 4) $scope.addvisible = true;
            $scope.GetChartRate($scope.editCurrencyChartFrom.code, $scope.editCurrencyChartTo.code)
            .then(function (response) {
                $scope.CurrencyChartRate = response;
                $scope.tabCurrencies[$scope.index].rate = $scope.CurrencyChartRate.rate;
                $scope.CreateChart(5);
                $('.chartedit-modal').modal('hide');
            });
            localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
            $scope.message = " ";
            $scope.showmessage = false;
            $('#currencyaddpair').removeClass('addpair-disable'); 
            $scope.currencyadddisable = false;
        } 
              
        
        else {
            $scope.message = "This Pair already exists!"
            $scope.showmessage = true;
        }
        }
        
        
        
    }
    
      
    
    
    
    $scope.ShowChart = function () {
        $scope.tabCurrencies = JSON.parse(localStorage.getItem("tabCurrencies"));
        $scope.ispresent = false;
        for(var i =0;i<$scope.tabCurrencies.length;i++) {
            if($scope.tabCurrencies[i].CurrencyChartFrom + $scope.tabCurrencies[i].CurrencyChartTo == $scope.CurrencyChartFrom.code + $scope.CurrencyChartTo.code && i!=$scope.index) {
                $scope.ispresent = true;
            }
        }
        if(!$scope.ispresent) {
            if ($scope.index == null || $scope.index == undefined || $scope.index == "") {
                $scope.index = 0;
            }
            $scope.tabCurrencies[$scope.index].CurrencyChartFrom = $scope.CurrencyChartFrom.code;
            $scope.tabCurrencies[$scope.index].CurrencyChartTo = $scope.CurrencyChartTo.code;
            if ($scope.tabCurrencies.length < 4) $scope.addvisible = true;
            $scope.GetChartRate($scope.CurrencyChartFrom.code, $scope.CurrencyChartTo.code)
            .then(function (response) {
                $scope.CurrencyChartRate = response;
                $scope.tabCurrencies[$scope.index].rate = $scope.CurrencyChartRate.rate;
                $scope.CreateChart(1);
            });
            localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
            $scope.message = " ";
            $scope.showmessage = false;
            $('#currencyaddpair').removeClass('addpair-disable'); 
            $scope.currencyadddisable = false;
        } else {
            $scope.message = "This Pair already exists!"
            $scope.showmessage = true;
        }
    }
    
    $scope.RemovePair = function () {
        $('#currencyaddpair').removeClass('addpair-disable'); 
        $scope.currencyadddisable = false;  
        $scope.tabCurrencies = JSON.parse(localStorage.getItem("tabCurrencies"));
        $scope.tabCurrencies.splice($scope.index,1);
        $scope.index = 0;
        if($scope.tabCurrencies.length > 0) {
            $scope.CurrencyChartFrom = {
                code: $scope.tabCurrencies[0].CurrencyChartFrom,
                name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.tabCurrencies[0].CurrencyChartFrom }).name
            };
            $scope.CurrencyChartTo = {
                code: $scope.tabCurrencies[0].CurrencyChartTo,
                name: $scope.currenciesWithNames.find((o) => { return o['code'] === $scope.tabCurrencies[0].CurrencyChartTo }).name
            }
            $scope.GetChartRate($scope.tabCurrencies[0].CurrencyChartFrom, $scope.tabCurrencies[0].CurrencyChartTo)
            .then(function (response) {
                $scope.CurrencyChartRate = response;
                $scope.tabCurrencies[0].rate = $scope.CurrencyChartRate.rate;
                $scope.CreateChart(1);
                $scope.tabCurrencies[0].tabclass ="nav-link active";
                for(var i = 0;i<$scope.tabCurrencies.length;i++) {
                    if(i != $scope.index) {
                        $scope.tabCurrencies[i].tabclass ="nav-link";
                    }
                }
                $("#0").removeClass("nav-link active");
                $("#1").removeClass("nav-link active");
                $("#2").removeClass("nav-link active");
                $("#0").addClass("nav-link");
                $("#1").addClass("nav-link");
                $("#2").addClass("nav-link");
                $("#" + $scope.index).addClass("nav-link active");
                localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
                $('.chartedit-modal').modal('hide');
            });
        } else{
             $('.chartedit-modal').modal('hide');
             $('#CurrencyChartContainer').empty();
        }
    }
    
    $scope.addvisible = true;
    /*$scope.AddCurrencyTab = function () {
        $('#currencyaddpair').addClass('addpair-disable'); 
        $scope.currencyadddisable = true;
        $scope.GetChartRate($scope.CurrencyChartFrom.code, $scope.CurrencyChartTo.code)
        .then(function (response) {
            $scope.CurrencyChartRate = response;
            var obj = { rate: $scope.CurrencyChartRate.rate ,CurrencyChartFrom: "CAD", CurrencyChartTo:"USD",tabclass:"nav-link active"}
            //$scope.tabCurrencies.push(obj);
            $scope.tabCurrencies.splice(0, 0, obj);
            var length = $scope.tabCurrencies.length;
            if ($scope.tabCurrencies.length >= 4){
                $scope.addvisible = false;
                // $scope.tabCurrencies.splice(0, 1);
                $scope.tabCurrencies.splice($scope.tabCurrencies.length - 1,1);
                length = 3;
            } 
            //$scope.index = length - 1;
            $scope.index = 0;
            $scope.ShowFilterHeader(1);
            for(var i = 0;i<$scope.tabCurrencies.length;i++){
                if(i != $scope.index){
                    $scope.tabCurrencies[i].tabclass ="nav-link";
                }
            }
            localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
        });
    }*/
    
    $scope.modeedit = true;
    $scope.generateChart = function (index, from, to) {
        $scope.modeedit = false;
        $("#0").removeClass("nav-link active");
        $("#1").removeClass("nav-link active");
        $("#2").removeClass("nav-link active");
        // $("#3").removeClass("nav-link active");
        $("#0").addClass("nav-link");
        $("#1").addClass("nav-link");
        $("#2").addClass("nav-link");
        // $("#3").addClass("nav-link");
        $scope.index = index;
        $scope.tabCurrencies[$scope.index].tabclass = "nav-link active";
        for(var i = 0;i<$scope.tabCurrencies.length;i++){
            if(i != $scope.index){
                $scope.tabCurrencies[i].tabclass ="nav-link";
            }
        }
        $("#" + $scope.index).addClass("nav-link active");
        $scope.isedit = false;
        var fromcurrency = "";
        var tocurrency = "";
        var currentIndex = index;
        fromcurrency = $scope.tabCurrencies[$scope.index].CurrencyChartFrom;
        tocurrency = $scope.tabCurrencies[$scope.index].CurrencyChartTo;
        $scope.CurrencyChartFrom = {
                code: fromcurrency,
                name: $scope.currenciesWithNames.find((o) => { return o['code'] === fromcurrency }).name
            };
        $scope.CurrencyChartTo = {
                code: tocurrency,
                name: $scope.currenciesWithNames.find((o) => { return o['code'] === tocurrency }).name
            }
        $("#CurrencyChartContainer").empty();
        $("#CurrencyChartContainer").append("<div class='loading-div-wrapper'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
        $scope.GetChartData(fromcurrency, tocurrency)
        .then(function (response) {
            $scope.GetChartRate(fromcurrency, tocurrency)
            .then(function (response) {
                $scope.CurrencyChartRate = response;
                $scope.tabCurrencies[currentIndex].rate = $scope.CurrencyChartRate.rate;
                $scope.prepareCurrencyChart(1);
            });
            $scope.modeedit = true;
            $("#CurrencyChartContainer").empty();
        });
    }
    
    $scope.CreateChart = function (chartid) {
        $scope.isedit = false;
        var fromcurrency = "";
        var tocurrency = "";
        if (chartid != undefined && chartid == 1) {
            fromcurrency = $scope.CurrencyChartFrom.code;
            tocurrency = $scope.CurrencyChartTo.code;
            $("#CurrencyChartContainer").empty();
            $("#CurrencyChartContainer").append("<div class='loading-div-wrapper'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
        } else if (chartid != undefined && chartid == 2) {
            fromcurrency = $scope.CurrencyChartFrom2.code;
            tocurrency = $scope.CurrencyChartTo2.code;
            $("#CurrencyChartContainer" + chartid).empty();
            $("#CurrencyChartContainer" + chartid).append("<div class='loading-div-wrapper'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
        } else if (chartid != undefined && chartid == 3) {
            fromcurrency = $scope.CurrencyChartFrom3.code;
            tocurrency = $scope.CurrencyChartTo3.code;
            $("#CurrencyChartContainer" + chartid).empty();
            $("#CurrencyChartContainer" + chartid).append("<div class='loading-div-wrapper'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
        } else if (chartid != undefined && chartid == 4) {
            fromcurrency = $scope.CurrencyChartFrom4.code;
            tocurrency = $scope.CurrencyChartTo4.code;
            $("#CurrencyChartContainer" + chartid).empty();
            $("#CurrencyChartContainer" + chartid).append("<div class='loading-div-wrapper'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
        }
         else if (chartid != undefined && chartid == 5) {
            fromcurrency = $scope.editCurrencyChartFrom.code;
            tocurrency = $scope.editCurrencyChartTo.code;
            $("#CurrencyChartContainer").empty();
            $("#CurrencyChartContainer").append("<div class='loading-div-wrapper'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
             $scope.CurrencyChartFrom = {
                code: fromcurrency,
                name: $scope.currenciesWithNames.find((o) => { return o['code'] === fromcurrency }).name
            };
            $scope.CurrencyChartTo = {
                code: tocurrency,
                name: $scope.currenciesWithNames.find((o) => { return o['code'] === tocurrency }).name
            }
        }
        $scope.GetChartData(fromcurrency, tocurrency)
        .then(function (response) {
            if (chartid == 1 || chartid == 5) {
                $("#CurrencyChartContainer").empty();
            } else {
                $("#CurrencyChartContainer" + chartid).empty();
            }
            $scope.prepareCurrencyChart(chartid);
        });
    };

    $scope.CreateAlertChart = function () {
        if ($("#AlertCurrencyChartContainer").val() != null) {
            $scope.isedit = false;
            var fromcurrency = $scope.CRABuyCurrencyIso.code;
            var tocurrency = $scope.CRASellCurrencyIso.code;
            $("#AlertCurrencyChartContainer").empty();
            $("#AlertCurrencyChartContainer").append("<div class='loading-div-wrapper'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
            $scope.GetChartData(fromcurrency, tocurrency)
            .then(function (response) {
                $("#AlertCurrencyChartContainer").empty();
                $scope.prepareCurrencyAlertChart();
            });
        }
    }
    
    $scope.CreateRateCalulatorChart = function () {
        if ($("#RateCalulatorChartContainer").val() != null) {
            var fromcurrency = $scope.CurrencyConverterFrom.code;
            var tocurrency = $scope.CurrencyConverterTo.code;
            $("#RateCalulatorChartContainer").empty();
            $("#RateCalulatorChartContainer").append("<div class='loading-div-wrapper'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
            $scope.GetChartData(fromcurrency, tocurrency)
            .then(function (response) {
                $("#RateCalulatorChartContainer").empty();
                $scope.prepareRateCalulatorChart();
            });
        }
    }
    $scope.flagcodeobj = [];
    $scope.getFlagCode = function (currencyCode) {
        $scope.flagcodeobj = {
            AFN: 'AF',
            ALL: 'AL',
            DZD: 'DZ',
            EUR: 'EU',
            AOA: 'AO',
            ARS: 'AR',
            AMD: 'AM',
            AWG: 'AW',
            AUD: 'AU',
            AZN: 'AZ',
            BSD: 'BS',
            BHD: 'BH',
            BDT: 'BD',
            BBD: 'BB',
            BYN: 'BY',
            BZD: 'BZ',
            XOF: 'BJ',
            BMD: 'BM',
            BOB: 'BO',
            BAM: 'BA',
            BWP: 'BW',
            BRL: 'BR',
            BND: 'BN',
            BGN: 'BG',
            BIF: 'BI',
            CVE: 'CV',
            KHR: 'KH',
            CAD: 'CA',
            KYD: 'KY',
            XAF: 'CF',
            CLP: 'CL',
            CNY: 'CN',
            HKD: 'HK',
            MOP: 'MO',
            COP: 'CO',
            KMF: 'KM',
            CRC: 'CR',
            HRK: 'HR',
            CUP: 'CU',
            CZK: 'CZ',
            KPW: 'KP',
            CDF: 'CD',
            DKK: 'DK',
            DJF: 'DJ',
            DOP: 'DO',
            EGP: 'EG',
            ERN: 'ER',
            ETB: 'ET',
            FJD: 'FJ',
            XPF: 'PF',
            GMD: 'GM',
            GEL: 'GE',
            GHS: 'GH',
            GIP: 'GI',
            XCD: 'GD',
            GTQ: 'GT',
            GNF: 'GN',
            GYD: 'GY',
            HNL: 'HN',
            HUF: 'HU',
            ISK: 'IS',
            INR: 'IN',
            IDR: 'ID',
            IRR: 'IR',
            IQD: 'IQ',
            ILS: 'IL',
            JMD: 'JM',
            JPY: 'JP',
            JOD: 'JO',
            KZT: 'KZ',
            KES: 'KE',
            KWD: 'KW',
            KGS: 'KG',
            LAK: 'LA',
            LBP: 'LB',
            LRD: 'LR',
            LYD: 'LY',
            MGA: 'MG',
            MWK: 'MW',
            MYR: 'MY',
            MVR: 'MV',
            MRO: 'MR',
            MUR: 'MU',
            MXN: 'MX',
            MNT: 'MN',
            MAD: 'MA',
            MZN: 'MZ',
            MMK: 'MM',
            NAD: 'NA',
            NPR: 'NP',
            NZD: 'NZ',
            NIO: 'NI',
            NGN: 'NG',
            NOK: 'NO',
            OMR: 'OM',
            PKR: 'PK',
            PGK: 'PG',
            PYG: 'PY',
            PEN: 'PE',
            PHP: 'PH',
            PLN: 'PL',
            QAR: 'QA',
            KRW: 'KR',
            MDL: 'MD',
            RON: 'RO',
            RUB: 'RU',
            RWF: 'RW',
            SHP: 'SH',
            WST: 'WS',
            STD: 'ST',
            SAR: 'SA',
            RSD: 'RS',
            SCR: 'SC',
            SLL: 'SL',
            SGD: 'SG',
            SBD: 'SB',
            SOS: 'SO',
            ZAR: 'ZA',
            SSP: 'SS',
            LKR: 'LK',
            SDG: 'SD',
            SRD: 'SR',
            SZL: 'SZ',
            SEK: 'SE',
            CHF: 'CH',
            SYP: 'SY',
            TJS: 'TJ',
            THB: 'TH',
            MKD: 'MK',
            TOP: 'TO',
            TTD: 'TT',
            TND: 'TN',
            TRY: 'TR',
            TMT: 'TM',
            UGX: 'UG',
            UAH: 'UA',
            AED: 'AE',
            GBP: 'GB',
            TZS: 'TZ',
            USD: 'US',
            UYU: 'UY',
            UZS: 'UZ',
            VUV: 'VU',
            VEF: 'VE',
            VND: 'VN',
            YER: 'YE',
            ZMW: 'ZM',
            ZWL: 'ZW',
            LTL: 'LT'
        };
        return $scope.flagcodeobj[currencyCode];
    }
        
    $scope.AddDynamicRow = function (ratepair, flag, code, amount, changecolour, changeper, sourcecode,isInverse) {
        if(!($scope.inverseCurrencyList.some(el => el.code === code))){
            var to = sourcecode;
            var from = code
        }else{
            var from = sourcecode;
            var to = code
        }
        $scope.DynamicTR = `<tr id="tr` + ratepair + `" href="/tools/currency-charts/?to=` + to + `&from=` + from +`"  style="text-decoration:none;cursor:pointer">
                    <td onclick="window.open('/tools/currency-charts/?to=`+to+`&amp;from=` + from +`')" style="text-decoration:none;cursor:pointer">
                    
                        <div class="d-flex align-items-center currencyIndicator">
                            <span class="flag-icon flag-icon-`+ flag + ` flag-icon-squared"></span>
                            <h4 class="">`+ code + `</h4>
                        </div>
                        
                    </td>
                    <td onclick="window.open('/tools/currency-charts/?to=`+to+`&amp;from=` + from +`')"  style="text-decoration:none;cursor:pointer;color:black">
                    <a href="/tools/currency-charts/?to=` + to + `&from=` + from +`"  style="text-decoration:none;cursor:pointer;color:black">
                        `+ amount + `
                        </a>
                    </td>
                    
                    <td onclick="window.open('/tools/currency-charts/?to=`+to+`&amp;from=` + from +`')" style="text-decoration:none;cursor:pointer">

                        <span class="changeText text-`+ changecolour + `">` + changeper + `</span>
                    </td>
                    <td id="td` + ratepair + `"href="/tools/currency-charts/?to=` + to + `&from=` + from +`" style="text-decoration:none;cursor:pointer">
                        <div class="homepageExchangeChart">
                               <a href="/tools/currency-charts/?to=`+ to + `&from=` + from +`">
                                <div id="currencyExchangeratesChart`+ ratepair + `" class="cmnExchangeChartHeight"></div>
                            </a>
                        </div>
                    </td>

                    <td id="action` + ratepair +`">
                        <div class="inline-action-view">
                            <div class="ExchangeActionbtn" id="add`+ ratepair + `">
                                <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ ratepair + ` )" class="btn cmn-delete-btn cmn-add-btn">  <i class="fas fa-plus-circle "></i></a>
                            </div>
                              <div class="ExchangeActionbtn" id="delete`+ ratepair + `">
                                <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ ratepair + ` )" class="btn cmn-delete-btn">  <i class="fas fa-trash-alt"></i></a>
                            </div> 
                        </div>
                    </td>
                </tr>`
        $("#DynamicTable").append($scope.DynamicTR);
        //$("#td" + ratepair).click(function (e) {
        //window.location = $(this).attr('href');
        //return false;
        //});
        $("#delete" + ratepair).click(function (e) {
            var index = $(this).parent().parent().index();
            $scope.RemoveExchangeRateCurrency(index);
        });
        $("#add" + ratepair).click(function (e) {
            var index = $(this).parent().parent().index();
            $scope.addInsertRow();
        });
    }
    
    $scope.insertRowVisible = false;
    $scope.addInsertRow = function(){
        $scope.insertRowVisible = true;
        $scope.LiveExchangeRateCurrency = null;
        
        if($scope.newCurrency.length != 0) {
            $("#add" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).remove();
        }
        var html = $compile(`<tr id="InsertRow">
                                <td>
                                    <div class="cmn-forms form-xl editCurrencyDropdown">
                                       <currency-select search-placeholder="Type to search..." none-selected-text="ADD CURRENCY" ng-model="LiveExchangeRateCurrency" ng-change="AddExchangeRateCurrency()" currencies="supportedCurrenciesWithNames"></currency-select>
                                    </div> 
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <div class="ExchangeActionbtn" id="selectrowdelete">
                                    <a href="javascript:;" ng-click="Removeselectrow()" class="btn cmn-delete-btn">  <i class="fas fa-trash-alt"></i></a>
                                    </div>
                                </td>
                            </tr>`)($scope);
        angular.element(document.querySelector('#tablebody')).append(html);
    }
    
    $scope.Removeselectrow = function(){
        $scope.insertRowVisible = false;
        if($scope.newCurrency.length > 1){
        if($scope.newCurrency.length - 1 >= 0){
         $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).empty();
         $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).append(`
                <div class="ExchangeActionbtn" id="add`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + `">
                      <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + ` )" class="btn cmn-delete-btn cmn-add-btn">  <i class="fas fa-plus-circle "></i></a>
                </div>
                <div class="ExchangeActionbtn" id="delete`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + `">
                     <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + ` )" class="btn cmn-delete-btn">  <i class="fas fa-trash-alt"></i></a>
                </div>`);}
        }
                else{
        if($scope.newCurrency.length - 1 >= 0){
         $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).empty();
         $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).append(`
                <div class="ExchangeActionbtn" id="add`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + `">
                      <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + ` )" class="btn cmn-delete-btn cmn-add-btn">  <i class="fas fa-plus-circle "></i></a>
                </div>`);
        }  
                }
        $("#delete" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).click(function (e) {
            var index = $(this).parent().parent().index();
            $scope.RemoveExchangeRateCurrency(index);
        });
        $("#add" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).click(function (e) {
            var index = $(this).parent().parent().index();
            $scope.addInsertRow();
        });
        $("#InsertRow").remove();
    }
    
    $scope.InverseCurrencies = function () {
        if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                $scope.newCurrency = JSON.parse(localStorage.getItem("newToolsCurrency"));
            }else{
                $scope.newCurrency = JSON.parse(localStorage.getItem("newCurrency"));
            }
        $scope.DefaultAmount = ($scope.DefaultAmount == '1.00000') ? 'Inverse' : '1.00000';
        for (var i = 0; i < $scope.newCurrency.length; i++) {
            $scope.newCurrency[i].amount = parseFloat((1 / $scope.newCurrency[i].amount).toFixed(5));
            $scope.newCurrency[i].changeper = ($scope.newCurrency[i].changeper.charAt(0) == '-') ? $scope.newCurrency[i].changeper.slice(1, $scope.newCurrency[i].changeper.length) : '-' + $scope.newCurrency[i].changeper;
            $scope.newCurrency[i].changecolour = ($scope.newCurrency[i].changecolour == 'red') ? 'green' : 'red';
            let table = document.querySelector('table');
            table.deleteRow(1);
            if(i != 0)
            {
                $("#add" + $scope.newCurrency[i - 1].ratepair).remove();
            }
            $scope.AddDynamicRow($scope.newCurrency[i].ratepair, $scope.newCurrency[i].flag, $scope.newCurrency[i].code, $scope.newCurrency[i].amount, $scope.newCurrency[i].changecolour, $scope.newCurrency[i].changeper, $scope.LiveExchangeRateCurrencys.code, false);
            $scope.data = $scope[$scope.newCurrency[i].ratepair];
            for (var j = 0; j < $scope.data.length; j++) {
                $scope.data[j] = ($scope.data[j] < 0) ? Math.abs($scope.data[j]) : -$scope.data[j];
            }
            if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                    localStorage.setItem("newToolsCurrency", JSON.stringify($scope.newCurrency));
                }else{
                    localStorage.setItem("newCurrency", JSON.stringify($scope.newCurrency));
                }
            $scope.resetExchangeRateCurrencies();
            $scope.BindChart($scope.newCurrency[i].ratepair);
        }
        
    }
    
    $scope.newCurrency = [];
    $scope.AddExchangeRateCurrency = function () {
        $("#InsertRow").remove();
        $scope.insertRowVisible = false;
        if($scope.newCurrency.length > 1){
            if($scope.newCurrency.length - 1 >= 0 && $scope.insertRowVisible == false){
                $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).empty();
                $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).append(`
                <div class="ExchangeActionbtn" id="add`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + `">
                      <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + ` )" class="btn cmn-delete-btn cmn-add-btn">  <i class="fas fa-plus-circle "></i></a>
                </div>
                <div class="ExchangeActionbtn" id="delete`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + `">
                     <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + ` )" class="btn cmn-delete-btn">  <i class="fas fa-trash-alt"></i></a>
                </div>`);
            }
           /* $("#fixbase").hide().css("display","none");
            $("#basedropdown").show().css("display","block");*/
        } else{
            if($scope.newCurrency.length - 1 >= 0 && $scope.insertRowVisible == false){
                $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).empty();
                $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).append(`
                <div class="ExchangeActionbtn" id="add`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + `">
                      <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + ` )" class="btn cmn-delete-btn cmn-add-btn">  <i class="fas fa-plus-circle "></i></a>
                </div>`);
            }
            /*$("#fixbase").hide().css("display","none");
            $("#basedropdown").show().css("display","block");*/
        }
        $("#delete" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).click(function (e) {
            var index = $(this).parent().parent().index();
            $scope.RemoveExchangeRateCurrency(index);
        });
        $("#add" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).click(function (e) {
            var index = $(this).parent().parent().index();
            $scope.addInsertRow();
        });
        /*if($scope.LiveExchangeRateCurrencys.code == $scope.LiveExchangeRateCurrency.code && $scope.newCurrency.length <= 1){
                $("#fixbase").show().css("display","block");
                $("#basedropdown").hide().css("display","none");
        }
        for(i = 0;i<$scope.newCurrency.length;i++){
            if($scope.LiveExchangeRateCurrency.code == $scope.newCurrency[i].code){
                $("#fixbase").show().css("display","block");
                $("#basedropdown").hide().css("display","none");
            }
        }*/
        var newCurrencyObj = {};
        var isAdded = 0;
        $scope.GetMTFXExchangeRates24h($scope.LiveExchangeRateCurrency.code, $scope.LiveExchangeRateCurrencys.code).then(function (canadarate) {
            $scope.LiveExchangeRates24h = JSON.parse($scope.LiveExchangeRates24h);
            newCurrencyObj.amount = $scope.LiveExchangeRates24h[0].Amount;
            newCurrencyObj.ratepair = $scope.LiveExchangeRates24h[0].RatePair;
            newCurrencyObj.changecolour = $scope.GetExchangeRatesChangeColor($scope.LiveExchangeRateCurrencys.code,$scope.LiveExchangeRateCurrency.code,$scope.LiveExchangeRates24h[0].ChangePercent);
            newCurrencyObj.changeper = $scope.GetExchangeRatesChangePer($scope.LiveExchangeRates24h[0].ChangePercent.toFixed(2) + "%",newCurrencyObj.changecolour);
           // newCurrencyObj.changeper = $scope.LiveExchangeRates24h[0].ChangePercent.toFixed(2) + "%";
            newCurrencyObj.flag = $scope.getFlagCode($scope.LiveExchangeRateCurrency.code).toLowerCase();
            newCurrencyObj.code = $scope.LiveExchangeRateCurrency.code;
            if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                $scope.newCurrency = JSON.parse(localStorage.getItem("newToolsCurrency"));
            }else{
                $scope.newCurrency = JSON.parse(localStorage.getItem("newCurrency"));
            }
            for (var i = 0; i < $scope.newCurrency.length; i++) {
                if ($scope.newCurrency[i].code == newCurrencyObj.code)
                    isAdded = 1;
            }
            if (isAdded != 1 && $scope.LiveExchangeRateCurrency.code != $scope.LiveExchangeRateCurrencys.code) {
                //   if ($scope.InverseBtn == true) {
                // if(!($scope.inverseCurrencyList.indexOf($scope.LiveExchangeRateCurrency.code)!== -1)){
                if(!($scope.inverseCurrencyList.some(el => el.code === $scope.LiveExchangeRateCurrency.code))){
                    newCurrencyObj.amount = parseFloat((1 / newCurrencyObj.amount).toFixed(5));
                    //newCurrencyObj.changeper = (newCurrencyObj.changeper.charAt(0) == '-') ? newCurrencyObj.changeper.slice(1, newCurrencyObj.changeper.length) : '-' + newCurrencyObj.changeper;
                    newCurrencyObj.changecolour = $scope.GetExchangeRatesChangeColor($scope.LiveExchangeRateCurrencys.code,$scope.LiveExchangeRateCurrency.code,0,true,newCurrencyObj.changecolour);
                    //      $scope.DefaultAmount = 'Inverse';
                    newCurrencyObj.changeper = $scope.GetExchangeRatesChangePer((newCurrencyObj.changeper.charAt(0) == '-') ? newCurrencyObj.changeper.slice(1, newCurrencyObj.changeper.length) : '-' + newCurrencyObj.changeper,newCurrencyObj.changecolour,true);
                    $scope.DefaultAmount = '1.00000';
                    //   }
                }
                $scope.newCurrency.push(newCurrencyObj);
                if($scope.newCurrency.length >= 2){
                    $( "#action" + $scope.newCurrency[0].ratepair).empty();
                    $( "#action" + $scope.newCurrency[0].ratepair).append(`
                    <div class="ExchangeActionbtn" id="delete`+ $scope.newCurrency[0].ratepair + `">
                          <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + ` )" class="btn cmn-delete-btn">  <i class="fas fa-trash-alt"></i></a>
                    </div>`);
                    $("#delete" + $scope.newCurrency[0].ratepair).click(function (e) {
                        var index = $(this).parent().parent().index();
                        $scope.RemoveExchangeRateCurrency(index);
                    });
                    $("#add" + $scope.newCurrency[$scope.newCurrency.length - 2].ratepair).remove();
                }
                $scope.AddDynamicRow(newCurrencyObj.ratepair, newCurrencyObj.flag, newCurrencyObj.code, newCurrencyObj.amount, newCurrencyObj.changecolour, newCurrencyObj.changeper, $scope.LiveExchangeRateCurrencys.code,$scope.InverseBtn);
            }
            $scope.isLoaded = true;
            $scope.currencies = "";
            for (var i = 0; i < $scope.newCurrency.length; i++) {
                $scope.currencies += $scope.newCurrency[i].code;
                if (i != $scope.newCurrency.length - 1) $scope.currencies += ',';
            }
            if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                    localStorage.setItem("newToolsCurrency", JSON.stringify($scope.newCurrency));
                }else{
                    localStorage.setItem("newCurrency", JSON.stringify($scope.newCurrency));
                }
                
            $scope.resetExchangeRateCurrencies();
            $("#currencyExchangeratesChart" + $scope.LiveExchangeRateCurrencys.code + $scope.LiveExchangeRateCurrency.code).empty();
            $("#currencyExchangeratesChart" + $scope.LiveExchangeRateCurrencys.code + $scope.LiveExchangeRateCurrency.code).append("<div class='loading-div-wrapper' style='min-height: 50px;'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
            $scope.GetMTFXExchangeChartData($scope.LiveExchangeRateCurrency.code, $scope.LiveExchangeRateCurrencys.code).then(function (canadarate) {
                $scope.LiveExchangeChartData24h = JSON.parse($scope.LiveExchangeChartData24h);
                $scope.data = $scope.LiveExchangeChartData24h[0].ChartData;
                if(!($scope.inverseCurrencyList.some(el => el.code === $scope.LiveExchangeRateCurrency.code))){
                    for (var j = 0; j < $scope.data.length; j++) {
                        $scope.data[j] = ($scope.data[j] < 0) ? Math.abs($scope.data[j]) : -$scope.data[j];
                    }
                }
                var ratepair = $scope.LiveExchangeChartData24h[0].RatePair;
                $scope[ratepair] = $scope.data;
                $("#currencyExchangeratesChart" + $scope.LiveExchangeRateCurrencys.code + $scope.LiveExchangeRateCurrency.code).empty();
                $scope.BindChart($scope.LiveExchangeChartData24h[0].RatePair);
            }).catch(function (error) {
                console.error("Data is not available for this Pair!")
                console.error(error);
            });
        }).catch(function (error) {
            console.error("Data is not available for this Pair!")
            console.error(error);
        });
        
        $("#dis .dropdown-menu").removeClass("show");
        $("#dis").hide().css('visibility', 'hidden');
        $("#AddCurrency2").show().css("visibility", "visible");
    }
    
    $scope.getcolour = function (ratepair) {
        if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                $scope.newCurrency = JSON.parse(localStorage.getItem("newToolsCurrency"));
            }else{
                $scope.newCurrency = JSON.parse(localStorage.getItem("newCurrency"));
            }
        for (var i = 0; i < $scope.newCurrency.length; i++) {
            if ($scope.newCurrency[i].ratepair == ratepair) {
                $scope.colour = ($scope.newCurrency[i].changecolour == "red") ? "#DB0B0B" : (($scope.newCurrency[i].changecolour == "grey")? "#303030" : "#26AB2C");
            }
        }
    }
    
    $scope.BindChart = function (ratepair) {
        $scope.getcolour(ratepair);
        Highcharts.chart('currencyExchangeratesChart' + ratepair, {
            title: {
                text: ''
            },
            yAxis: {
                visible: false,
                title: {
                    text: ''
                }
            },
            xAxis: {
                visible: false
            },
            tooltip: { enabled: false },
            plotOptions: {
                series: {
                    lineWidth: 1,
                    label: {
                        connectorAllowed: false
                    },
                    color: "#26AB2C",
                    marker: {
                        enabled: false,
                    },
                    states: {
                        hover: {
                            enabled: false,
                        }
                    }
                }
            },
            series: [{
                showInLegend: false,
                name: 'ratesChange',
                color: $scope.colour,
                data: $scope[ratepair]
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }
    
    $scope.RemoveExchangeRateCurrency = function (index) {
        if ($('#IsToolsLiveExchangeRates').val() != undefined) {
            $scope.newCurrency = JSON.parse(localStorage.getItem("newToolsCurrency"));
        }else{
            $scope.newCurrency = JSON.parse(localStorage.getItem("newCurrency"));
        }
        $scope.newCurrency.splice(index, 1)
        if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                    localStorage.setItem("newToolsCurrency", JSON.stringify($scope.newCurrency));
                }else{
                    localStorage.setItem("newCurrency", JSON.stringify($scope.newCurrency));
                }
        
        $scope.resetExchangeRateCurrencies();
                
        if($scope.newCurrency.length > 1){
            if($scope.newCurrency.length - 1 >= 0 && $scope.insertRowVisible == false){
                $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).empty();
                $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).append(`
                        <div class="ExchangeActionbtn" id="add`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + `">
                            <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + ` )" class="btn cmn-delete-btn cmn-add-btn">  <i class="fas fa-plus-circle "></i></a>
                        </div>
                        <div class="ExchangeActionbtn" id="delete`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + `">
                            <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + ` )" class="btn cmn-delete-btn">  <i class="fas fa-trash-alt"></i></a>
                        </div>`);
                $("#delete" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).click(function (e) {
                    var index = $(this).parent().parent().index();
                    $scope.RemoveExchangeRateCurrency(index);
                });
                $("#add" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).click(function (e) {
                    var index = $(this).parent().parent().index();
                    $scope.addInsertRow();
                });
            }
        } else {
            $("#InsertRow").remove();
            if($scope.newCurrency.length - 1 >= 0){
                $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).empty();
                $( "#action" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).append(`
                    <div class="ExchangeActionbtn" id="add`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + `">
                        <a href="javascript:;" ng-click="RemoveExchangeRateCurrency($index,`+ $scope.newCurrency[$scope.newCurrency.length - 1].ratepair + ` )" class="btn cmn-delete-btn cmn-add-btn">  <i class="fas fa-plus-circle "></i></a>
                    </div>`);
                $("#add" + $scope.newCurrency[$scope.newCurrency.length - 1].ratepair).click(function (e) {
                    var index = $(this).parent().parent().index();
                    $scope.addInsertRow();
                });
            }
            /*$("#fixbase").show().css("display","block");
            $("#basedropdown").hide().css("display","none");*/
        }
        let table = document.querySelector('table');
        table.deleteRow(index + 1);
        $("#add"+$scope.newCurrency[$scope.newCurrency.length - 1].ratepair).show().css("visibility","visible");
        $("#AddCurrency2").show().css('visibility', 'visible');
        $("#AddCurrency1").hide().css('visibility', 'hidden');
    }
    
    $scope.SaveCurrency = function () {
        if ($('#IsToolsLiveExchangeRates').val() != undefined) {
            localStorage.setItem("newToolsConvertCurrency", $scope.LiveExchangeRateCurrencys.code);
        }else{
            localStorage.setItem("newConvertCurrency", $scope.LiveExchangeRateCurrencys.code);
        }
        $scope.resetExchangeRateCurrencies();
        $scope.LiveExchangeRateCurrencys.flag = $scope.getFlagCode($scope.LiveExchangeRateCurrencys.code).toLowerCase();
        for (var i = 0; i < $scope.currenciesWithNames.length; i++) {
            if ($scope.LiveExchangeRateCurrencys.code == $scope.currenciesWithNames[i].code)
                $scope.currencyName = $scope.currenciesWithNames[i].name;
        }
    }
    
    $scope.RemoveCurrency = function () {
        
        if($scope.insertRowVisible == true){
            $("#InsertRow").remove();
        }
        if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                $scope.newCurrency = JSON.parse(localStorage.getItem("newToolsCurrency"));
            }else{
                $scope.newCurrency = JSON.parse(localStorage.getItem("newCurrency"));
            }
        /*if($scope.newCurrency.length <= 1){
            $("#fixbase").show().css("display","block");
            $("#basedropdown").hide().css("display","none");
        }*/
        /*    for (var i = 0; i < $scope.newCurrency.length; i++) {
                if ($scope.newCurrency[i].code == $scope.LiveExchangeRateCurrencys.code) {
                    $scope.newCurrency.splice(i, 1);
                    let table = document.querySelector('table');
                    table.deleteRow(i + 1);
                    if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                        localStorage.setItem("newToolsCurrency", JSON.stringify($scope.newCurrency));
                    }else{
                        localStorage.setItem("newCurrency", JSON.stringify($scope.newCurrency));
                    }
                    $scope.resetExchangeRateCurrencies();
                    break;
                }
            }*/
        
        if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                $scope.newCurrency = JSON.parse(localStorage.getItem("newToolsCurrency"));
            }else{
                $scope.newCurrency = JSON.parse(localStorage.getItem("newCurrency"));
            }
        $scope.currencies = "";
        for (var i = 0; i < $scope.newCurrency.length; i++) {
            $scope.currencies += $scope.newCurrency[i].code;
            if (i != $scope.newCurrency.length - 1) $scope.currencies += ',';
        }
        $scope.GetMTFXExchangeRates24h($scope.currencies, $scope.LiveExchangeRateCurrencys.code).then(function (canadarate) {
        $scope.newCurrency = [];
        $scope.LiveExchangeRates24h = JSON.parse($scope.LiveExchangeRates24h);
        for (var i = 0; i < $scope.LiveExchangeRates24h.length; i++) {
            var newCurrencyObj = {};
            newCurrencyObj.amount = $scope.LiveExchangeRates24h[i].Amount;
            newCurrencyObj.ratepair = $scope.LiveExchangeRates24h[i].RatePair;
            newCurrencyObj.changecolour = $scope.GetExchangeRatesChangeColor($scope.LiveExchangeRateCurrencys.code,$scope.LiveExchangeRates24h[i].RatePair.slice(-3),$scope.LiveExchangeRates24h[i].ChangePercent);
           // newCurrencyObj.changeper = $scope.LiveExchangeRates24h[i].ChangePercent.toFixed(2) + "%";
           newCurrencyObj.changeper = $scope.GetExchangeRatesChangePer($scope.LiveExchangeRates24h[i].ChangePercent.toFixed(2) + "%",newCurrencyObj.changecolour);
            newCurrencyObj.data = $scope.LiveExchangeRates24h[i].ChartData;
            newCurrencyObj.code = $scope.LiveExchangeRates24h[i].RatePair.slice(-3);
            newCurrencyObj.flag = $scope.getFlagCode($scope.LiveExchangeRates24h[i].RatePair.slice(-3)).toLowerCase();
            //     if ($scope.InverseBtn == true) {
            //      if(!($scope.inverseCurrencyList.indexOf($scope.LiveExchangeRates24h[i].RatePair.slice(-3))!== -1)){
            if(!($scope.inverseCurrencyList.some(el => el.code === $scope.LiveExchangeRates24h[i].RatePair.slice(-3)))){
                newCurrencyObj.amount = parseFloat((1 / newCurrencyObj.amount).toFixed(5));
                newCurrencyObj.changeper = $scope.GetExchangeRatesChangePer(newCurrencyObj.changeper,newCurrencyObj.changecolour,true);
                 //  newCurrencyObj.changeper = (newCurrencyObj.changeper.charAt(0) == '-') ? newCurrencyObj.changeper.slice(1, newCurrencyObj.changeper.length) : '-' + newCurrencyObj.changeper;
                newCurrencyObj.changecolour = $scope.GetExchangeRatesChangeColor($scope.LiveExchangeRateCurrencys.code,$scope.LiveExchangeRates24h[i].RatePair.slice(-3),0,true,newCurrencyObj.changecolour);
                $scope.DefaultAmount = '1.00000';
                //   }
            }
            $scope.newCurrency.push(newCurrencyObj);
        }
        if ($('#IsToolsLiveExchangeRates').val() != undefined) {
            localStorage.setItem("newToolsCurrency", JSON.stringify($scope.newCurrency));
        }else{
            localStorage.setItem("newCurrency", JSON.stringify($scope.newCurrency));
        }
        $scope.resetExchangeRateCurrencies();
        
        for (var i = 0; i < $scope.newCurrency.length; i++) {
            let table = document.querySelector('table');
            //table.deleteRow(2);
            table.deleteRow(1);
            if(i != 0){
                $("#add" + $scope.newCurrency[i - 1].ratepair).remove();
            }
            $scope.AddDynamicRow($scope.newCurrency[i].ratepair, $scope.newCurrency[i].flag, $scope.newCurrency[i].code, $scope.newCurrency[i].amount, $scope.newCurrency[i].changecolour, $scope.newCurrency[i].changeper, $scope.LiveExchangeRateCurrencys.code,$scope.InverseBtn);
        }
        if($scope.newCurrency.length <= 1){
            $("#delete" + $scope.newCurrency[0].ratepair).remove();
            /*$("#fixbase").show().css("display","block");
            $("#basedropdown").hide().css("display","none");*/
        }
        if($scope.insertRowVisible == true){
            $scope.addInsertRow();
        }
        $scope.isLoaded = true;
        $scope.GetMTFXExchangeChartData($scope.currencies, $scope.LiveExchangeRateCurrencys.code).then(function (canadarate) {
        $scope.LiveExchangeChartData24h = JSON.parse($scope.LiveExchangeChartData24h);
        for (var i = 0; i < $scope.LiveExchangeChartData24h.length; i++) {
            $scope.data = $scope.LiveExchangeChartData24h[i].ChartData;
            //  if ($scope.InverseBtn == true) {
            // if(!($scope.inverseCurrencyList.indexOf($scope.LiveExchangeRates24h[i].RatePair.slice(-3))!== -1)){
            if(!($scope.inverseCurrencyList.some(el => el.code === $scope.LiveExchangeRates24h[i].RatePair.slice(-3)))){
                for (var j = 0; j < $scope.data.length; j++) {
                    $scope.data[j] = ($scope.data[j] < 0) ? Math.abs($scope.data[j]) : -$scope.data[j];
                }
                //  }
            }
            var ratepair = $scope.LiveExchangeChartData24h[i].RatePair;
            $scope[ratepair] = $scope.data;
            $scope.BindChart($scope.LiveExchangeChartData24h[i].RatePair);
        }
        }).catch(function (error) {
            console.error("Data is not available for this Pair!")
            console.error(error);
        });
        }).catch(function (error) {
            console.error("Data is not available for this Pair!")
            console.error(error);
        });
    }
    
    $scope.GetExchangeRatesChangePer=function(changeper,changecolor,isInverse){
         if (changecolor=="grey") {
               return  changeper = (changeper.charAt(0) == '-') ? changeper.slice(1, changeper.length) : changeper;
        }
        else if(isInverse){
               return   changeper = (changeper.charAt(0) == '-') ? changeper.slice(1, changeper.length) : '-' + changeper;
                   }
        else
           {
                return   changeper;
           }
    }
    
    $scope.RefreshRates = function () {
        let table = document.querySelector('table');
        if(table != null){
            $scope.today = '';
            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            var month = date.toLocaleString('default', { month: 'long' })
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            $scope.today = month + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + hours + ':' + minutes + ' ' + ampm;
            
            if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                $scope.newCurrency = JSON.parse(localStorage.getItem("newToolsCurrency"));
            }else{
                $scope.newCurrency = JSON.parse(localStorage.getItem("newCurrency"));
            }
            $scope.currencies = "";
            for (var i = 0; i < $scope.newCurrency.length; i++) {
                $scope.currencies += $scope.newCurrency[i].code;
                if (i != $scope.newCurrency.length - 1) $scope.currencies += ',';
            }
            $scope.GetMTFXExchangeRates24h($scope.currencies, $scope.LiveExchangeRateCurrencys.code).then(function (canadarate) {
                $scope.newCurrency = [];
                $scope.LiveExchangeRates24h = JSON.parse($scope.LiveExchangeRates24h);
                for (var i = 0; i < $scope.LiveExchangeRates24h.length; i++) {
                    var newCurrencyObj = {};
                    newCurrencyObj.amount = $scope.LiveExchangeRates24h[i].Amount;
                    newCurrencyObj.ratepair = $scope.LiveExchangeRates24h[i].RatePair;
                    newCurrencyObj.changecolour = $scope.GetExchangeRatesChangeColor($scope.LiveExchangeRateCurrencys.code,$scope.LiveExchangeRates24h[i].RatePair.slice(-3),$scope.LiveExchangeRates24h[i].ChangePercent);
                    //newCurrencyObj.changeper = $scope.LiveExchangeRates24h[i].ChangePercent.toFixed(2) + "%";
                    newCurrencyObj.changeper=$scope.GetExchangeRatesChangePer($scope.LiveExchangeRates24h[i].ChangePercent.toFixed(2) + "%",newCurrencyObj.changecolour);
                    newCurrencyObj.data = $scope.LiveExchangeRates24h[i].ChartData;
                    newCurrencyObj.code = $scope.LiveExchangeRates24h[i].RatePair.slice(-3);
                    newCurrencyObj.flag = $scope.getFlagCode($scope.LiveExchangeRates24h[i].RatePair.slice(-3)).toLowerCase();
                    if ($scope.InverseBtn == true) {
                        newCurrencyObj.amount = parseFloat((1 / newCurrencyObj.amount).toFixed(5));
                       // newCurrencyObj.changeper = (newCurrencyObj.changeper.charAt(0) == '-') ? newCurrencyObj.changeper.slice(1, newCurrencyObj.changeper.length) : '-' + newCurrencyObj.changeper;
                        newCurrencyObj.changecolour = $scope.GetExchangeRatesChangeColor($scope.LiveExchangeRateCurrencys.code,$scope.LiveExchangeRates24h[i].RatePair.slice(-3),0,true,newCurrencyObj.changecolour);
                        newCurrencyObj.changeper=$scope.GetExchangeRatesChangePer((newCurrencyObj.changeper.charAt(0) == '-') ? newCurrencyObj.changeper.slice(1, newCurrencyObj.changeper.length) : '-' + newCurrencyObj.changeper,newCurrencyObj.changecolour,true);
                        $scope.DefaultAmount = 'Inverse';
                    }
                    $scope.newCurrency.push(newCurrencyObj);
                }
                if ($('#IsToolsLiveExchangeRates').val() != undefined) {
                    localStorage.setItem("newToolsCurrency", JSON.stringify($scope.newCurrency));
                }else{
                    localStorage.setItem("newCurrency", JSON.stringify($scope.newCurrency));
                }
                $scope.resetExchangeRateCurrencies();
    
                for (var i = 0; i < $scope.newCurrency.length; i++) {
                   
                    let table = document.querySelector('table');
                    if(table != null){
                    table.deleteRow(1);
                if(i != 0)
                {
                    $("#add" + $scope.newCurrency[i - 1].ratepair).remove();
                }
                    $scope.AddDynamicRow($scope.newCurrency[i].ratepair, $scope.newCurrency[i].flag, $scope.newCurrency[i].code, $scope.newCurrency[i].amount, $scope.newCurrency[i].changecolour, $scope.newCurrency[i].changeper, $scope.LiveExchangeRateCurrencys.code,$scope.InverseBtn);
                }
                }
                $scope.isLoaded = true;
                var currencies = $scope.currencies.split(',');
                for (var i = 0; i < currencies.length; i++) {
                       
                        $("#currencyExchangeratesChart" + $scope.LiveExchangeRateCurrencys.code + currencies[i]).empty();
                        $("#currencyExchangeratesChart" + $scope.LiveExchangeRateCurrencys.code + currencies[i]).append("<div class='loading-div-wrapper' style='min-height: 50px;'><div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div></div>");
                }
                $scope.GetMTFXExchangeChartData($scope.currencies, $scope.LiveExchangeRateCurrencys.code).then(function (canadarate) {
                    $scope.LiveExchangeChartData24h = JSON.parse($scope.LiveExchangeChartData24h);
                    for (var i = 0; i < $scope.LiveExchangeChartData24h.length; i++) {
                        $scope.data = $scope.LiveExchangeChartData24h[i].ChartData;
                        if ($scope.InverseBtn == true) {
                            for (var j = 0; j < $scope.data.length; j++) {
                                $scope.data[j] = ($scope.data[j] < 0) ? Math.abs($scope.data[j]) : -$scope.data[j];
                            }
                        }
                        var ratepair = $scope.LiveExchangeChartData24h[i].RatePair;
                        $scope[ratepair] = $scope.data;
                        $("#currencyExchangeratesChart" + $scope.LiveExchangeChartData24h[i].RatePair).empty();
                        $scope.BindChart($scope.LiveExchangeChartData24h[i].RatePair);
                    }
                }).catch(function (error) {
                    console.error("Data is not available for this Pair!")
                    console.error(error);
                });
            }).catch(function (error) {
                console.error("Data is not available for this Pair!")
                console.error(error);
            });
        }
    }
    
    /*---- Live Exchange Rates ----*/
    
    $scope.AddCurrencyHandlerOnClickIndex = 1;
    $scope.AddCurrencyHandler = function () {
        var newCurrencyObj = {};
        newCurrencyObj.flag = $scope.getFlagCode($scope.LiveExchangeRateCurrency.code).toLowerCase();
        newCurrencyObj.code = $scope.LiveExchangeRateCurrency.code;

        if (GetIndexInArrayByValueAndPropertyreturnWithINT($scope.matrixArr1, newCurrencyObj.code, "code") == -1) {
            if ($scope.matrixArr1.length >= 6) {
                $scope.matrixArr1.splice(0, 1);
                $scope.matrixArr2.splice(0, 1);
                $scope.matrixArr1.push(newCurrencyObj);
                $scope.matrixArr2.push(newCurrencyObj);
            } else {
                $scope.matrixArr1.splice(0, 1);
                $scope.matrixArr2.splice(0, 1);
                $scope.matrixArr1.push(newCurrencyObj);
                $scope.matrixArr2.push(newCurrencyObj);
            }
            $scope.AddCurrencyHandlerOnClickIndex++;

            if ($scope.AddCurrencyHandlerOnClickIndex >= 6)
                $scope.AddCurrencyHandlerOnClickIndex = 1;

            $scope.CreateLiveExchangeTool(false);
        }
        $scope.LiveExchangeRateCurrency = $scope.LiveExchangeRateCurrency;
    };

    $scope.RemoveCurrencyCode = function (removeCurrencyCode, currencyCodeIndex) {
        $scope.matrixArr1.splice(currencyCodeIndex, 1);
        $scope.CreateLiveExchangeTool(false);
    };

    var GetIndexInArrayByValueAndPropertyreturnWithINT = function (arr, value, property) {
        var l = arr.length;
        var k = 0;
        for (k = 0; k < l; k = k + 1) {
            if (arr[k][property] === value) {
                return k;
            }
        }
        return -1;
    }

    $scope.LiveExchangePairRates = []
    $scope.arrayLiveExchange = [];
    $scope.CreateLiveExchangeTool = function (isRefresh) {
        if (isRefresh) {
            $scope.LiveExchangeRateCurrency = {
                code: $scope.FromCurrencyCode
            };
        }
        $scope.LiveExchangLoaded = false;
        var liveExchngratePairs = [];
        var exchngratePairs = [];
        if ($scope.matrixArr1 != null) {
            for (var i = 0; i < $scope.matrixArr1.length; i++) {
                var pair = $scope.matrixArr1[i].code;
                liveExchngratePairs.push(pair.toString().toUpperCase());
                for (var j = 0; j < $scope.matrixArr2.length; j++) {
                    var pair = $scope.matrixArr1[i].code + $scope.matrixArr2[j].code;
                    exchngratePairs.push(pair.toString().toUpperCase());
                }
            }
        }

        if (liveExchngratePairs != "" && liveExchngratePairs != undefined) {
            $scope.GetLiveExchangeData(liveExchngratePairs)
            .then(function (response) {
                $scope.PrepareLiveExchange();
                $scope.LiveExchangLoaded = true;
            });
        }
    };

    $scope.GetLiveExchangeData = function (liveExchngratePairs) {
        var deferred = $q.defer();
        ToolsFactory.GetMTFXLiveExchangeRates(liveExchngratePairs.join(','))
        .then(function (response) {
            if (response != null) {
                $scope.LiveExchangePairRates = response;
            } else {
                console.error("Data is not available!");
            }
            deferred.resolve(true);
        }).catch(function (response) {
            console.error("Data is not available!");
            console.error(error);
            deferred.resolve(false);
        });
        return deferred.promise;
    };

    $scope.GetLocalExchangeData = function (exchngratePairs) {
        var deferred = $q.defer();
        ToolsFactory.GetMTFXExchangeRates(exchngratePairs.join(','))
        .then(function (response) {
            if (response != null) {
                $scope.LiveExchangePairRates = response;
            } else {
                console.error("Data is not available!");
            }
            deferred.resolve(true);
        }).catch(function (response) {
            deferred.resolve(false);
            console.error("Data is not available!");
            console.error(error);
        });
        return deferred.promise;
    };

    $scope.PrepareLiveExchange = function () {
        $scope.arrayLiveExchange = [];
        for (var i = 0; i < $scope.matrixArr1.length; i++) {
            var objRow = [];
            for (var j = 0; j < $scope.matrixArr2.length; j++) {
                var objColumn = {};
                if ($scope.LERIsBuy) {
                    var d2 = $scope.matrixArr2[j].code + $scope.matrixArr1[i].code;
                    var rowData = $scope.LiveExchangePairRates[j];
                    if (rowData === undefined || rowData == null) {
                        objColumn.value = "0";
                    } else {
                        objColumn.value = Number(rowData[d2]).toFixed(5);
                    }
                } else {
                    var d2 = $scope.matrixArr1[i].code + $scope.matrixArr2[j].code;
                    var rowData = $scope.LiveExchangePairRates[i];
                    if (rowData === undefined && rowData == null) {
                        objColumn.value = "0";
                    } else {
                        objColumn.value = Number(rowData[d2]).toFixed(5);
                    }
                }
                objRow.push(objColumn);
            }
            $scope.arrayLiveExchange.push(objRow);
        }
        $("#currentDateTime").text(moment().format("LLL"));
    };
    
    $scope.ShowFilterHeader = function (id) {
        $scope.currentChartID = id;
        $scope.message = "";
        $scope.showmessage = false;
        var fromCurrency = $scope.CurrencyChartFrom;
        var toCurrency = $scope.CurrencyChartTo;
        
        if (id != undefined && id == 1) {
            fromCurrency = $scope.CurrencyChartFrom;
            toCurrency = $scope.CurrencyChartTo;
        } else if (id != undefined && id == 2) {
            fromCurrency = $scope.CurrencyChartFrom2;
            toCurrency = $scope.CurrencyChartTo2;
        } else if (id != undefined && id == 3) {
            fromCurrency = $scope.CurrencyChartFrom3;
            toCurrency = $scope.CurrencyChartTo3;
        } else if (id != undefined && id == 4) {
            fromCurrency = $scope.CurrencyChartFrom4;
            toCurrency = $scope.CurrencyChartTo4;
        }
        $scope.editCurrencyChartFrom = fromCurrency;
        $scope.editCurrencyChartTo = toCurrency;
        var hash = window.location.href.slice(window.location.href.indexOf('#') + 1)
        if(id != hash.charAt(hash.length - 1))
        {
         $scope.GetChartRate($scope.editCurrencyChartFrom.code, $scope.editCurrencyChartTo.code)
            .then(function (response) {
                
                if (id != undefined && id == 1) {
                    $scope.CurrencyChartRate = response;
                } else if (id != undefined && id == 2) {
                    $scope.CurrencyChartRate2 = response;
                } else if (id != undefined && id == 3) {
                    $scope.CurrencyChartRate3 = response;
                } else if (id != undefined && id == 4) {
                    $scope.CurrencyChartRate4 = response;
                }
                $scope.CreateChart(id);
                $('.chartedit-modal').modal('show');
            });
        }else{
            $('.chartedit-modal').modal('show');
        }
        
    }
    
    $scope.ShowFilter = function (event,id,from,to) {
        event.stopPropagation();
        $scope.message = "";
        $scope.editCurrencyChartFrom = {
            code: from
        };
        $scope.editCurrencyChartTo = {
            code: to
        };
        if($scope.index == id) {
            $scope.index = id;
            $scope.tabCurrencies[id].tabclass = "nav-link active";
            for(var i = 0;i<$scope.tabCurrencies.length;i++) {
                if(i != id) {
                    $scope.tabCurrencies[i].tabclass ="nav-link";
                }
            }
            $('.chartedit-modal').modal('show');
            $scope.showmessage = false;
            localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
        } else {
        $scope.index = id;
        $scope.tabCurrencies[id].tabclass = "nav-link active";
        for(var i = 0;i<$scope.tabCurrencies.length;i++) {
            if(i != id) {
                $scope.tabCurrencies[i].tabclass ="nav-link";
            }
        }
        $scope.GetChartRate($scope.editCurrencyChartFrom.code, $scope.editCurrencyChartTo.code)
            .then(function (response) {
                $scope.CurrencyChartRate = response;
                $scope.tabCurrencies[$scope.index].rate = $scope.CurrencyChartRate.rate;
                $scope.CreateChart(5);
                $('.chartedit-modal').modal('show');
                $scope.showmessage = false;
                localStorage.setItem("tabCurrencies", JSON.stringify($scope.tabCurrencies));
            });
        }
    }
        
    $scope.GetChartRate = function (currencyfrom, currencyto) {
        var deferred = $q.defer();
        //ToolsFactory.GetMTFXRate(currencyfrom + currencyto)
        ToolsFactory.GetMTFXLiveExchangeRates24h(currencyto, currencyfrom)
        .then(function (response) {
            var number = 0;
            if (response != null && response != "") {
                var value = jQuery.parseJSON(response);
                obj = { rate: Number(value[0].Amount).toFixed(5), changepercent: value[0].ChangePercent.toFixed(2) + '%'}
            } else {
                console.error("Data is not available for this Pair!");
            }
            //deferred.resolve(number);
            deferred.resolve(obj);
        }).catch(function (error) { });
        return deferred.promise;
    }
    
    $scope.PrepairCompareChart = function () {
        if ($('#compare-bank-chart').length > 0) {
            Highcharts.setOptions({
                lang: {
                    numericSymbols: null,
                    thousandsSep: ','
                }
            });
            Highcharts.chart('compare-bank-chart', {
                chart: {
                    type: 'column',
                    height: 520,
                    events: {
    		            render() {
    			            const chart = this;
    			            const yAxis = chart.yAxis[0];
    			            const lastTickPosition = yAxis.tickPositions.length - 1;
    			            const lastLabel = chart.yAxis[0].ticks[lastTickPosition].label;
    			            lastLabel.translate(-lastLabel.getBBox().width/ 4, 0)
    		            }
    	            },
                },
                exporting: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    type: 'category',
                    lineColor: '#989898',
                    labels: {
                        style: {
                            color: '#393939',
                            fontSize: '16px',
                            fontFamily: 'CiutadellaRounded-Regular',
                            textOverflow: 'none'
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        style:{
                          overflow: "unset",  
                        },
                        useHTML: true,
                        formatter: function () {
                            return '<span class="yaxis-label">' + Highcharts.numberFormat(this.value, 0, '.', ',') + '</span>';
                        }
                    },
                    gridLineColor: '#989898',
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        borderRadiusTopLeft: '8px',
                        borderRadiusTopRight: '8px',
                        dataLabels: {
                            enabled: false,
                            format: '{point.y:.1f}'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:14px;color:{point.color};">{point.key}</span><br>',
                    pointFormat: '<span style="color:#393939">Amount</span>: <b>{point.y:.2f}</b>'
                },
                series: [{
                    name: "",
                    colorByPoint: true,
                    data: $scope.comparedata
                }],
            });
        }
        // new bank chart
        if ($('#compare-bank-chart-new').length > 0) {
            var data = [];
            for (var i = 0; i<$scope.bankList.length;i++){
                var obj = {};
                var colour = ($scope.bankList[i].isOrange == true) ? '#F89522' : '#393939';
                obj = {name: $scope.bankList[i].bankName , y: parseInt($scope.bankList[i].bankAmount), color: colour};
                data.push(obj);
            }
            Highcharts.setOptions({
                lang: {
                    numericSymbols: null,
                    thousandsSep: ','
                }
            });
            Highcharts.chart('compare-bank-chart-new', {
                chart: {
                    type: 'bar',
                    height: 300,
                },
                exporting: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    type: 'category',
                    lineColor: '#989898',
                    labels: {
                        style: {
                            color: '#393939',
                            fontSize: '16px',
                            fontFamily: 'CiutadellaRounded-Regular',
                            width:'200px'
                        }
                    }
                },
                yAxis: {
                    tickInterval: $scope.tickInterval,
                    min: $scope.minimum,
                    title: {
                        text: ''
                    },
                    labels: {
                        useHTML: true,
                        //format:'${value}',
                        rotation: 0
                        ,style: {
                            width: '40px',
                            'min-width': '40px'
                        },
                        formatter: function () {
                            return '<span class="yaxis-label">' + '$' + Highcharts.numberFormat(this.value, 0, '.', ',') + '</span>';
                        }
                    },
                    gridLineColor: '#989898',
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: false,
                            formatter: function () {
                                return '$' + Highcharts.numberFormat(this.y, 0, '.', ',');
                            }
                        }
                    },
                    bar: {
                        dataLabels: {
                            enabled: true,
                            crop: false,
                            overflow: 'none',
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:14px;color:{point.color};">{point.key}</span><br>',
                    pointFormat: '<span style="color:#393939">Amount</span>: <b>${point.y:,.2f}</b>'
                },
    
                series: [{
                    name: "",
                    colorByPoint: true,
                    data: data,
                    //[{
                     //   name: "MTFX",
                    //    y: $scope.mTFXAmount,
                    //    color: '#F89522',
                    //        dataLabels: {
                    //        style: {
                    //        color: '#F89522'
                    //        }
                    //    }
                   // },
                   // {
                   //     name: "Royal Bank",
                    //    y: $scope.aNZAmount,
                   //     color: '#393939'
                   // },
                    //{
                   //     name: "TD",
                   //     y: $scope.westpacAmount,
                   //     color: '#393939'
                   // },
                  //  {
                   //     name: "CIBC",
                    //    y: $scope.cBAAmount,
                   //     color: '#393939'
                   // },
                   // {
                   //     name: "Scotia",
                   //     y: $scope.nABAmount,
                  //      color: '#393939'
                  //  }
                  //  ],
                    
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            yAxis: {
                                tickInterval: $scope.mobileTickInterval
                            }
                        }
                    }]
                }
            });
        }
    }
    
    $scope.AddDecimalPoint = function () {
        $scope.CurrencyCompareAmount = Number($scope.CurrencyCompareAmount).toFixed(2);
    }
    
    $scope.ConverTodecimal = function (value, modelname) {
        if (value != "" && value != undefined) {
            $scope[modelname] = Number(value).toFixed(2);
        }
    }

    /*-- initial binding --*/

    // $scope.initBinding();

    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    $scope.RatecalculatorDropDownDefaultselect = function (SetValue, DefaultModelValue) {
        if (SetValue == null || SetValue.trim() == "") {
            return DefaultModelValue.code;
        } else {
            return SetValue;
        }
    };
    
    $scope.addCommasintextbox = function (nStr, model) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        var no = x1 + x2;
        $scope[model] = no;
        return no;
    }
    
    $('.removealphabet').keypress(function (e) {
        var regex = new RegExp("^[0-9-.]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        e.preventDefault();
        return false;
    });
    
    $scope.calculatePercent = function (percent, num) {
        return (percent / 100) * num;
    }
    
}]);


$(document).ready(function () {
    $('.slider-container .owl-carousel').owlCarousel({
        loop: false,
        rewind: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            1000: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    })

    $(".testimonial-slider").owlCarousel({
        loop: !0,
        margin: 50,
        nav: !1,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1e3: {
                items: 2
            }
        }
    });
    var a = 60;
    var b = 120;
    /*setInterval(function () {
        return --a <= 0 ? (angular.element("#HomeView").scope().CreateLiveExchangeTool(), void (a = 60)) : void $("#counter-nmbr").text(a);
    }, 1e3);*/
    // home page exchange table js
    $(document).ready(function () {
        $(".homePageLiveExchangerate .theadActions .editBtn").click(function () {
            $(this).parents(".homePageLiveExchangerate").addClass("editMode");
        });
        $(".homePageLiveExchangerate .theadActions .saveBtn").click(function () {
            $(this).parents(".homePageLiveExchangerate").removeClass("editMode");
        });
    })
    //  exchange rates charts
    /*Highcharts.chart('currencyExchangeratesChart1', {
        title: {
            text: ''
        },
        yAxis: {
            visible: false,
            title: {
                text: ''
            }
        },
        xAxis: {
            visible: false
        },
        tooltip: { enabled: false },
        plotOptions: {
            series: {
                lineWidth: 1,
                label: {
                    connectorAllowed: false
                },
                color: "#26AB2C",
                marker: {
                    enabled: false,
                },
                states: {
                    hover: {
                        enabled: false,
                    }
                }
            }
        },
        series: [{
            showInLegend: false,
            name: 'ratesChange',
            data: [5, 10, 25, 10, 15, 35, 45, 18, 12, 18, 22, 35, 20, 5, 65, 85, 95, 45, 21, 10, 15, 12, 14, 15, 16, 12, 10, 15, 14, 15, 12, 10, 18, 100, 80]
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
    Highcharts.chart('currencyExchangeratesChart2', {
        title: {
            text: ''
        },
        yAxis: {
            visible: false,
            title: {
                text: ''
            }
        },
        xAxis: {
            visible: false
        },
        tooltip: { enabled: false },
        plotOptions: {
            series: {
                lineWidth: 1,
                label: {
                    connectorAllowed: false
                },
                color: "#B30021",
                marker: {
                    enabled: false,
                },
                states: {
                    hover: {
                        enabled: false,
                    }
                }
            }
        },
        series: [{
            showInLegend: false,
            name: 'ratesChange',
            data: [5, 100, 50, 70, 15, 45, 45, 18, 12, 18, 80, 35, 20, 50, 65, 85, 5, 15, 21, 100, 95, 52, 14, 66, 16, 12, 10, 15, 44, 15, 12, 10, 18, 40, 10]
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    });*/
    // end
});


mtfxApp.directive('inputFormat', ['$locale', '$filter', function ($locale, $filter) {
    // For input validation
    var isValid = function (val) {
        return angular.isNumber(val) && !isNaN(val);
    };

    // Helper for creating RegExp's
    var toRegExp = function (val) {
        var escaped = val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        return new RegExp(escaped, 'g');
    };

    // Saved to your $scope/model
    var toModel = function (val) {
        // Locale currency support
        var decimal = toRegExp($locale.NUMBER_FORMATS.DECIMAL_SEP);
        var group = toRegExp($locale.NUMBER_FORMATS.GROUP_SEP);
        var currency = toRegExp($locale.NUMBER_FORMATS.CURRENCY_SYM);

        // Strip currency related characters from string
        val = val.replace(decimal, '').replace(group, '').replace(currency, '').trim();

        return parseFloat(val, 10);
    };

    // Displayed in the input to users
    var toView = function (val) {
        return $filter('currency')(val, '', 0);
    };

    // Link to DOM
    var link = function ($scope, $element, $attrs, $ngModel) {
        $ngModel.$formatters.push(toView);
        $ngModel.$parsers.push(toModel);
        $ngModel.$validators.currency = isValid;
        $element.on('keyup', function () {
            $ngModel.$viewValue = toView($ngModel.$modelValue);
            $ngModel.$render();
        });
    };
    // Form Submit add County-State With recaptcha v3 validation
    return {
        'restrict': 'A',
        'require': 'ngModel',
        'link': link
    };
}]);

$(function () {
  $('[data-toggle="popover"]').popover()
})
/*
$(function () {
    let postURL = encodeURI(document.location.href);
   // window.open($(".facebook-btn").attr("href", `https://www.facebook.com/sharer.php?u=${postURL}`), fbShareWindow, "height=200,width=200");
   //  window.open($(".facebook-btn").attr("href", `https://www.facebook.com/sharer.php?u=${postURL}`), 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
    $(".facebook-btn").attr("href", `social-links${postURL}`);
    $(".twitter-btn").attr("href", `https://twitter.com/share?url=${postURL}`);
    $(".linkedin-btn").attr("href", `https://www.linkedin.com/shareArticle?url=${postURL}`);
    $(".email-btn").attr("href", `mailto:?subject=Check out this site&body=MTFX Webpage Link = ${postURL}`);
})*/

$(document).ready(function() {
        $(".time-dropdown-main .dropdown-menu a").click(function(){
          var selText = $(this).text();
          $(this).parents('.time-dropdown-main').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
        });
        $(document).on("click","#HomeView", function () {
   var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
   if ($('.show-ranges').css('display') == 'block') {
       $('.show-ranges').css('display','block')
   }
});
});






