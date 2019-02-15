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
                    paras: 0,
                    parasAirborne: 0,
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

            r.ticketsRequired = (i.battleType == "0") ? 18 : 12;

            r.ticketsInfantry = Math.floor(i.infantry / 12);

            r.ticketsParas = Math.floor(i.paras / 12);
            r.ticketsParasAirborne = Math.min(
                Math.floor(i.parasAirborne / 12),
                Math.floor(i.transportPlanes / 4));

            r.ticketsRecons = Math.floor(i.recons / 10);

            var ticketsTankCrew = Math.floor(i.tankCrewmen / 10);
            var ticketsTanks = 
                Math.floor(i.tanksLight / 10)
                + Math.floor(i.tanksMedium / 10)
                + Math.floor(i.tanksHeavy / 10)
                + Math.floor(i.tanksTD / 10)
                + Math.floor(i.tanksHTD / 10);
            r.ticketsTanks = Math.min(ticketsTankCrew, ticketsTanks);

            var ticketsPilots = Math.floor(i.pilots / 10);
            var ticketsPlanes =
                Math.floor(i.planesLight / 10)
                + Math.floor(i.planesMedium / 10)
                + Math.floor(i.planesHeavy / 10);
            r.ticketsPlanes = Math.min(ticketsPilots, ticketsPlanes);

            if (i.battleType == "1") {
                r.ticketsTotal = r.ticketsInfantry;
            }
            else {
                r.ticketsTotal = r.ticketsInfantry
                    + r.ticketsParas
                    + r.ticketsParasAirborne
                    + r.ticketsRecons
                    + r.ticketsTanks
                    + r.ticketsPlanes;
            }

            r.enoughTickets = (r.ticketsTotal >= r.ticketsRequired);

            r.enoughInfPara = ( (r.ticketsInfantry + r.ticketsParas + r.ticketsParasAirborne) >= r.ticketsRequired / 2 );

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