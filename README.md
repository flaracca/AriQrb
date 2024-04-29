# AriQrb
JS class for calculating distances in km betweem 2 WW Locator codes

Example of use:

// ************************************************************
// returning KM
// ************************************************************
var locator1 = 'JN33WU';
var locator2 = 'JN44LJ';
try
{
  var qrb = new AriQrb(locator1, locator2);
  var distance = qrb.calculateDistance();
}
catch(ex)
{
  console.log(ex);
}
//->this outputs: 105.96 Km

// ************************************************************
// returning miles
// ************************************************************
var locator1 = 'JN33WU';
var locator2 = 'JN44LJ';
try
{
  var qrb = new AriQrb(locator1, locator2);
  var distance = qrb.calculateDistance(true);
  console.log(distance);
}
catch(ex)
{
  console.log(ex);
}

//->this outputs: 65.85 miles

// ************************************************************
// returning Coordinates
// ************************************************************
var locator1 = 'JN33WU';
var locator2 = 'JN44LJ';
try
{
  var qrb = new AriQrb(locator1, locator2);
  var coordinates = qrb.getCoordinates();
	console.log(coordinates);
}
catch(ex)
{
  console.log(ex);
}
//->this outputs: array of objects

// ************************************************************
// returning Decimal Coordinates
// ************************************************************
var locator1 = 'JN33WU';
var locator2 = 'JN44LJ';
try
{
  var qrb = new AriQrb(locator1, locator2);
  var decimalCoordinates = qrb.getDecimalCoordinates();
	console.log(decimalCoordinates);
}
catch(ex)
{
  console.log(ex);
}
//->this outputs: array of objects
