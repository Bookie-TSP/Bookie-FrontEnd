angular.module('todo', [])
	.controller('profile', ['$scope',
function ($s) {
	$s.data = [
        {
            id: 1,
            email: 'win3455@hotmail.com',
            firstName: 'Varis',
            lastName: 'Kritpolchai',
            defaultAddressID: '42/39',
            phoneNumber: '0909839367',
            identificationNumber: '1101700175626',
            gender: 'M',
            birthDate: '15/07/95'
        },
        {
            id: 2,
            email: 'so_sad_5@hotmail.com',
            firstName: 'Virus',
            lastName: 'Computer',
            defaultAddressID: '12/345',
            phoneNumber: '0987654321',
            identificationNumber: '1234567890555',
            gender: 'F',
            birthDate: '01/01/99'
        }
    ];
    $s.testing = "TEST";
    $s.test = function() {
    	console.log("test");
    }
}]);