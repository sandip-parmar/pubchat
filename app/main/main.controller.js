angular.module('main')
  .controller('MainController', ["$scope", "Pubnub", '$pubnubChannel', function($scope, Pubnub, $pubnubChannel){

    $scope.username = "sandip";
    $scope.channelGroup = "myChannelGroup";
    $scope.createChannel = false;
    $scope.createButtonText = "Create new...";
    $scope.channelName = "";
    $scope.channel = "";
    $scope.message = "";
    $scope.channels = "";
    $scope.users = "";

    $scope.toggleChannel = function(){
      if ($scope.createChannel) {
        $scope.createChannel = false;
        $scope.createButtonText = "Create new...";
      }else{
        $scope.createChannel = true;
        $scope.createButtonText = "Cancel";
      }

    };

    Pubnub.init({
      publishKey: 'pub-c-9463733c-a0a1-4aa6-8974-c95643ad4182',
      subscribeKey: 'sub-c-894269cc-65b9-11e7-a3eb-0619f8945a4f',
      uuid: 'sandip'
    });


    // subscribe to channel
    $scope.subscribeChannel = function(name){

        $scope.channel = $pubnubChannel(name, {autoload: 20});
        $scope.users = Pubnub.hereNow({ channels: [name]});
    }

    // add new messsage
    $scope.addMessage = function(){
      var message = $scope.message;
      $scope.message = "";
      $scope.channel.$publish({body: message});
    }

    // add new channel to group
    $scope.addChannel = function(){
      if($scope.channelName){
        Pubnub.channelGroups.addChannels(
          {
            channels: [$scope.channelName],
            channelGroup: $scope.channelGroup
          },
          function(status){
            if (status.error) {
              console.log(status.error);
              console.log("Cant add new channel.");
            }else{
              $scope.channel = $pubnubChannel($scope.channelName, {autoload: 20});
              $scope.channel.$publish({body: "My name is sandip."});
              console.log("new channel added");
            }
          }
        );
      }
    };

    Pubnub.channelGroups.listChannels(
      { channelGroup: $scope.channelGroup },
      function(status, response){
        if(status.error){
          console.log("Getting list of channels failed.");
          return;
        }
        $scope.channels = response.channels;
        console.log($scope.channels);
        console.log("Hurray. We got channels list.");
      }
    );
  }]);
