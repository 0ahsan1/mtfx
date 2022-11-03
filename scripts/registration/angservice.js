"use strict";
app.factory("baseSvc", ["$http", "$q", function ($http, $q) {
    var AngserviceClass = {};

    AngserviceClass.postRequest = function (query, data) {
        var deferred = $q.defer();
        $http({
            url:  query,
            method: "POST",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-Type": "application/json;odata=verbose"
            },
            data: JSON.stringify(data)
        }).then(function (result) {
            deferred.resolve(result.data);
        }, function (result) {
            deferred.reject(result);
        });
        return deferred.promise;
    };

    AngserviceClass.getRequest = function (query) {
        var deferred = $q.defer();
        $http({
            url: query,
            method: "GET",
            async: false,
            crossDomain: true,
            cors: true,
            headers: {
                "accept": "application/json;odata=verbose",
                "content-Type": "application/json;odata=verbose",
                "Authorization": "bearer " + sessionStorage.getItem("Access_Token")
            }
        })
            .then(function (result) {
                deferred.resolve(result.data);
            }, function (result, status) {
                deferred.reject(result);
                authData.authenticationData.IsAuthenticated = false;
                authData.authenticationData.userName = "";
            });
        return deferred.promise;
    };

    AngserviceClass.updateRequest = function (query, data) {
        var deferred = $q.defer();
        $http({
            url:  query,
            method: "POST",
            async: false,
            headers: {
                "accept": "application/json;odata=verbose",
                "content-Type": "application/json;odata=verbose",
                "X-Http-Method": "PATCH",
                "If-Match": "*",
            },
            data: JSON.stringify(data)
        })
            .then(function (result) {
                deferred.resolve(result.data);
            }, function (result, status) {
                deferred.reject(result);
            });
        return deferred.promise;
    };

    AngserviceClass.deleteRequest = function (query) {
        var deferred = $q.defer();
        $http({
            url: query,
            method: "DELETE",
            crossDomain: true,
            cors: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "accept": "application/json;odata=verbose",
                "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
                "IF-MATCH": "*"
            }
        })
            .then(function (result) {
                deferred.resolve(result.data);
            }, function (result, status) {
                deferred.reject(result);
            });
        return deferred.promise;
    };

    AngserviceClass.SaveFile = function (query, file) {
        
        var fileFormData = new FormData();
        fileFormData.append('file', file);

        console.log(fileFormData);
        var deferred = $q.defer();
        $http({
            url: query,
            method: "POST",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-Type": false
            },
            data: fileFormData
        }).then(function (result) {
            deferred.resolve(result.data);
        }, function (result) {
            deferred.reject(result);
        });
        return deferred.promise;
    };
AngserviceClass.uploadFileToServer = function (url,file) {
            var request = {
                file: file
            };
            return $http({
                method: 'POST',
                url: url,
                // If using Angular version <1.3, use Content-Type: false.
                // Otherwise, use Content-Type: undefined
                headers: { 'Content-Type': undefined },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("file", data.file);
                    return formData;
                },
                data: request
            }).then(function (response) {
                if (response) {
                    var fileName = response.data;
                    return fileName;
                } else {
                    return false;
                }
            });
        };
    return AngserviceClass;
}]);