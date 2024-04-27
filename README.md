# AriQrb
JS class for calculating distances in km betweem 2 WW Locator codes

Example of use:

var locator1 = 'JN33WU';
var locator2 = 'JN44LJ';
var qrb = new AriQrb(locator1, locator2);
var distance = qrb.calculate();
console.log(distance);

//this outputs 105,38
