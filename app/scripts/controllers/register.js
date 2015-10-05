/**
 * Created by nathakorn on 10/5/15 AD.
 */
/**
 * Created by nathakorn on 9/28/15 AD.
 */
angular.module('register', [])
    .controller('page', ['$scope', 'todoApi',
        function ($s, $factory) {
            $s.korn = "test";
        }])

    .factory('todoApi', [function () {

        return {

        };
    }]);
