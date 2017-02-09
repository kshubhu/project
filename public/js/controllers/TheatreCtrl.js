sampleApp.controller('TheatreController', function($scope, $http,$log) {

    $scope.tagline = 'Select your theatre here!';
    $scope.booking = 'booking';

    var loadCities = function() {
        $http.get('/city/getCity').success(function(response){
            console.log('Read Is Successful');
            $scope.cityList = response;
            $scope.city = "";
        });
    
};
loadCities();
var loadMovies= function() {
        $http.get('/movie/getMovie').success(function(response){
            console.log('Read Is Successful');
            $scope.moviList = response;
            $scope.movi = "";
        });
    

};
loadMovies();
    var refresh = function() {
        $http.get('/theatre/getTheatre').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.theatreList = response;
            $scope.threatre = "";
        });
    };

    refresh();

    $scope.addTheatre = function(theatre) {
       

           $http({
                    method: 'POST',
                    url: '/theatre/addTheatre',
                     headers: {'Content-Type': 'application/json'},    
                    data: theatre
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                     $log.info(response);
                   refresh();
               });


        
    console.log($scope.contact);

    };

    $scope.removeTheatre = function(theatre) {
        
        $http.delete('/theatre/deleteTheatre/' + theatre._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editTheatre = function(theatre) {
        $http.get('/theatre/getTheatre/' + theatre._id).success(function(response) {
            $scope.theatre = response[0];
        });
    };

    $scope.updateTheatre = function(theatre) {
        console.log("REACHED UPDATE");
        console.log($scope.theatre._id);
        $http.put('/theatre/updateTheatre/' + $scope.theatre._id, $scope.theatre).success(function(response) {
            console.log(response);
            refresh();
        });
    };

});