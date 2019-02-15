var hngfbcApp = angular.module('hngfbcApp', []);

hngfbcApp.controller('FbcController', function FbcController($scope) {
    angular.extend($scope, {
        inputs: {
            battleType: "0",
            infantry: 0,
            recons: 0,
            paratroopers: 0,
            paratroopersAirborne: 0,
            transportPlanes: 0,
            tankCrewmen: 0,
            tanksLight: 0,
            tanksMedium: 0,
            tanksHeavy: 0,
            tanksTD: 0,
            tanksHTD: 0,
            pilots: 0,
            planesLight: 0,
            planesMedium: 0,
            planesHeavy: 0
        },

        results: {
            playerTicketsInfantry: 0,
            playerTicketsParatroopers: 0,
            playerTicketsTanks: 0,
            playerTicketsPlanes: 0,
            playerTicketsOther: 0,
            playerTicketsTotal: 0,

            enoughInfPara: false,
            enoughTransPlanes: false,
            isFunBattle: false
        }
    });

    $scope.$watchCollection('inputs',
        function(newValue) {
            var inputs = $scope.inputs;
            var results = $scope.results;

            results.playerTicketsInfantry = Math.floor(inputs.infantry / 12);

            results.playerTicketsParatroopers = Math.floor(inputs.paratroopers / 12);

            results.playerTicketsTanks = Math.min(
                Math.floor(inputs.tankCrewmen / 10),
                Math.floor(inputs.tanksLight / 10)
            );

            results.playerTicketsOther = Math.floor(inputs.recons / 10)
                + Math.floor(inputs.tankCrewmen / 10)
                + Math.floor(inputs.pilots / 10);

            results.playerTicketsTotal = results.playerTicketsInfantry
                + results.playerTicketsParatroopers
                + results.playerTicketsOther;

            var requiredTickets = (inputs.battleType == "0") ? 18 : 12;
            results.enoughInfPara = ( (results.playerTicketsInfantry + results.playerTicketsParatroopers) >= requiredTickets / 2 );

            var transportPlaneTickets = Math.floor(inputs.transportPlanes / 4);

            var neededParaTickets = (requiredTickets / 2 - results.playerTicketsInfantry > 0);
            if (true) {

            }
            var requiredTransportPlanes = 0;
            results.enoughTransPlanes = (inputs.transportPlanes >= requiredTransportPlanes);

            results.isFunBattle = results.enoughInfPara && (results.playerTicketsTotal >= requiredTickets);
        }
    );
});
