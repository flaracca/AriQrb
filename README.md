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
  var distance = qrb.calculate();
}
catch(ex)
{
  console.log(ex);
}
//->this outputs 105,38 Km

// ************************************************************
// returning miles
// ************************************************************
var locator1 = 'JN33WU';
var locator2 = 'JN44LJ';
try
{
  var qrb = new AriQrb(locator1, locator2, true);
  var distance = qrb.calculate();
  console.log(distance);
}
catch(ex)
{
  console.log(ex);
}

//->this outputs 65,49 miles
