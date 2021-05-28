function getLocation() 
{
   //request geolocation if allowed redirects to result else show error.

  console.log('clicked');
  
  var userPositionPromise = new Promise(function(resolve, reject) {
  
  if (navigator.geolocation) {
  
    navigator.geolocation.getCurrentPosition(function(data) {
      resolve(data);
      console.log('got permission');
     
    }, function(error) {
      reject(error);
    });
    
  } else {
    reject({
      error: 'browser doesn\'t support geolocation'
    });
  };

});


userPositionPromise
  .then(function(data) {
    console.log('storing coords');
    
     console.log(data.coords.latitude);
     console.log(data.coords.longitude);

    if (typeof(Storage) !== "undefined") {
    
      sessionStorage.setItem("lat",data.coords.latitude);
      sessionStorage.setItem("lon",data.coords.longitude);

    }
    else
      alert('Local storage is not supported on your device');


    console.log(sessionStorage.getItem("lat"));
    console.log(sessionStorage.getItem("lon"));
    
    console.log('redirecting');
    window.location = "./result.html";
    
    
  })
  .catch(function(error) {
    console.log('Error', error);
    
    alert('Please enable location');
    
  });
  
  
}
