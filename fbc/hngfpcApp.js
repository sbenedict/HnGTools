var hngfbcApp = angular.module('hngfbcApp', []);

hngfbcApp.controller('FbcController', function FbcController($scope) {
    angular.extend($scope, {
        inputs: {},
        results: {},
        clear: function () {
            angular.extend($scope.inputs,
                {
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
                });
        }
    });

    $scope.clear();

    $scope.$watchCollection('inputs',
        function(newValue) {
            var i = $scope.inputs;
            var r = $scope.results;

            r.playerTicketsRequired = (i.battleType == "0") ? 18 : 12;

            r.playerTicketsInfantry = Math.floor(i.infantry / 12);

            r.playerTicketsParatroopers = Math.floor(i.paratroopers / 12);

            r.playerTicketsRecons = Math.floor(i.recons / 10);

            var playerTicketsTankCrew = Math.floor(i.tankCrewmen / 10);
            var playerTicketsTanks = 
                Math.floor(i.tanksLight / 10)
                + Math.floor(i.tanksMedium / 10)
                + Math.floor(i.tanksHeavy / 10)
                + Math.floor(i.tanksTD / 10)
                + Math.floor(i.tanksHTD / 10);
            r.playerTicketsTanks = Math.min(playerTicketsTankCrew, playerTicketsTanks);

            var playerTicketsPilots = Math.floor(i.pilots / 10);
            var playerTicketsPlanes =
                Math.floor(i.planesLight / 10)
                + Math.floor(i.planesMedium / 10)
                + Math.floor(i.planesHeavy / 10);
            r.playerTicketsPlanes = Math.min(playerTicketsPilots, playerTicketsPlanes);

            r.playerTicketsTotal = r.playerTicketsInfantry
                + r.playerTicketsParatroopers
                + r.playerTicketsRecons
                + r.playerTicketsTanks
                + r.playerTicketsPlanes;

            r.enoughTickets = (r.playerTicketsTotal >= r.playerTicketsRequired);

            r.enoughInfPara = ( (r.playerTicketsInfantry + r.playerTicketsParatroopers) >= r.playerTicketsRequired / 2 );

            var transportPlaneTickets = Math.floor(i.transportPlanes / 4);

            var neededParaTickets = (r.playerTicketsRequired / 2 - r.playerTicketsInfantry > 0);
            if (true) {

            }
            var requiredTransportPlanes = 0;
            r.enoughTransPlanes = (i.transportPlanes >= requiredTransportPlanes);

            r.isFunBattle = r.enoughInfPara && r.enoughTickets;
        }
    );
});

// heaven please forgive me for this kludgy code below

$(function() {
    $('input[type=number]').parent('label').on("mousewheel", function(event) {
        event.preventDefault();

        let $this = $(this);
        if ($this.is('input') == false) $this = $this.find('input[type=number]');

        let inc = parseFloat($this.attr('step'));
        let max = parseFloat($this.attr('max'));
        let min = parseFloat($this.attr('min'));
        let currVal = parseFloat($this.val());

        if (isNaN(currVal))  currVal = 0.0;
        if (isNaN(inc)) inc = 1;
        if (event.shiftKey) inc *= 10;

        // Increment or decrement numeric based on scroll distance
        if (event.deltaFactor * event.deltaY > 0) {
            if (isNaN(max) || currVal + inc <= max) {
                $this.val(currVal + inc).trigger("change");
            }
        } else {
            if (isNaN(min) || currVal - inc >= min) {
                $this.val(currVal - inc).trigger("change");
            }
        }
    });
});