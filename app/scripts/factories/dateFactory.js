app.factory('dateFactory', function () {
    var initDates = new Array(31);
    for( var i = 1; i <=31 ; i++ ){
        initDates[i-1] = i;
    }

     var initMonths = ['January', 'February', 'March', 'April', 'May',
                        'June', 'July', 'August', 'September', 'October',
                        'November', 'December'];

    var d = new Date();
    var n = d.getFullYear();
    var initYears = new Array(100);
    for( i = 0; i < 100; i++ ){
        initYears[i] = n-i;
    }

	return {
		days: initDates,
        months: initMonths,
        years: initYears
	};
});
