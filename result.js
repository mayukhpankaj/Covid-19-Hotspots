  function main() {

  var zoneAPI = "https://api.covid19india.org/zones.json";
  var dataAPI = "https://api.covid19india.org/v2/state_district_wise.json";
  

  
            function loadMapScenario() {
                var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {});
                Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
                    var searchManager = new Microsoft.Maps.Search.SearchManager(map);
                    var reverseGeocodeRequestOptions = {
                        location: new Microsoft.Maps.Location(clat, clon),
                        callback: function (answer, userData) {
                            map.setView({ bounds: answer.bestView });
                            map.entities.push(new Microsoft.Maps.Pushpin(reverseGeocodeRequestOptions.location));
                            document.getElementById('printoutPanel').innerHTML =
                                answer.address.formattedAddress;
								console.log(answer);
								console.log(answer.address.adminDistrict);
								var state = answer.address.adminDistrict;
                                var district = answer.address.district;
                                    district = district.toLowerCase();
                                    
                                    document.getElementById('loadtext').innerHTML ="Reverse geocoding";
                                    
                                                $.getJSON(zoneAPI, function(data) {
   
  console.log(data);
  

for(i=0;i<data.zones.length;i++)
{
  var dist = data.zones[i].district;
  	  dist = dist.toLowerCase();
      
      if((data.zones[i].statecode==state)&&(dist==district))
   {
     
      dist = dist.charAt(0).toUpperCase() + dist.slice(1);
      
      var zcolor = data.zones[i].zone;
          zcolor = zcolor.toLowerCase();
          
           console.log(zcolor);
           document.getElementById("guidezone").innerHTML="Important guidelines for "+zcolor+" zone";
           
           
      if(zcolor=='red')
      {
      
       document.getElementById("msg1").style.color = "#ff1a1a";
       document.getElementById("msg1").innerHTML= dist+" is "+zcolor+" zone !";
       document.getElementById("guide").innerHTML= "<ul><li>four wheelers to have maximum two passengers including driver</li><br><li>pillion rider not allowed for two-wheelers.</li><br><li>All shops selling essential goods to remain open in red zones, except in malls.</li></ul>";
      
      }
      else if(zcolor=='orange')
      {
       document.getElementById("msg1").style.color = "#ffa31a";
       document.getElementById("msg1").innerHTML= dist+" is "+zcolor+" zone !";
       document.getElementById("guide").innerHTML= "<center>All activities are permitted except the following:</center><br><ul><li>Inter-District and Intra-District plying of buses.</li><br><li>Taxis and 4 wheeler  permitted with one driver and 2 passengers.</li><br><li>pillion allowed with rider.</li></ul>";
      
      }
      else if(zcolor=='green')
      {
       document.getElementById("msg1").style.color = "#99ff33";
       document.getElementById("msg1").innerHTML= dist+" is "+zcolor+" zone !";
       document.getElementById("guide").innerHTML=" all activities are permitted except the limited number of activities which are prohibited throughout the country, irrespective of the zone.";
      
      }
     
   break;
  }
   else
      {
       document.getElementById("msg1").innerHTML="sorry "+district+" was not found in our database!";
      
      }

 }
 
 var rlist='<ul>';
var olist='<ul>';
var glist='<ul>';

var rctr=0,octr=0,gctr=0;



for(i=0;i<data.zones.length;i++)
{
  var dist = data.zones[i].district;
  	  dist = dist.toLowerCase();
      
      if((data.zones[i].statecode==state))
   {
     
      dist = dist.charAt(0).toUpperCase() + dist.slice(1);
      
      var zcolor = data.zones[i].zone;
          zcolor = zcolor.toLowerCase();
          
     
           
           
      if(zcolor=='red')
      {
        rctr++;
        
        rlist+=" • "+data.zones[i].district;
        
        if(rctr%4==0)
        {
          rlist+="<br>";  
        }
        
      
      }
      else if(zcolor=='orange')
      {
        octr++;
          
        
        olist+=" • "+data.zones[i].district;
        
         if(octr%4==0)
        {
          olist+="<br>";  
        }
        
    
      }
      else if(zcolor=='green')
      {
       
        gctr++;
       
        
        glist+=" • "+data.zones[i].district;
        
         if(gctr%4==0)
        {
          glist+="<br>";  
        }
         
      }
     
   
    }
   
   }
   
    
     
     document.getElementById("rl").innerHTML=rlist;
     document.getElementById("ol").innerHTML=olist;
     document.getElementById("gl").innerHTML=glist;
     
     document.getElementById("zonenos").innerHTML="There are "+rctr+" Red zones, "+octr+" Orange zones, "+gctr+" Green zones.";
 
 
 
});

$.getJSON(dataAPI, function(stat) {
   
  console.log(stat);
  
  for(i=0;i<stat.length;i++)
 {

   if(stat[i].statecode==state)
   {
   
  
    
    for(j=0;j<stat[i].districtData.length;j++)
    {
       var dist = stat[i].districtData[j].district;
           dist = dist.toLowerCase();
      
      if(dist==district)
      {
    	       
        
        
        document.getElementById("distdata").innerHTML=district+"'s data";
        document.getElementById("cd").innerHTML=stat[i].districtData[j].confirmed;
        document.getElementById("ad").innerHTML=stat[i].districtData[j].active;
        document.getElementById("rd").innerHTML=stat[i].districtData[j].recovered;
        document.getElementById("dd").innerHTML=stat[i].districtData[j].deceased;
        
        i=stat.length+1;
        break;
        
    
      }
    }
    
   }
 }
 
 document.getElementById('loadtext').innerHTML ="Preparing data.";
 
 //now we produce state table.
 
 for(i=0;i<stat.length;i++)
 {

   if(stat[i].statecode==state)
   {
   
 
   
   	console.log(stat[i].districtData.length);
    
    var tabled = '';
    
    for(j=0;j<stat[i].districtData.length;j++)
    {
        tabled += '<tr>';
       
        tabled +='<td>'+stat[i].districtData[j].district+'</td>';
       
        tabled +='<td>'+stat[i].districtData[j].confirmed;
        tabled +='<td>'+stat[i].districtData[j].active;
        tabled +='<td>'+stat[i].districtData[j].recovered;
        tabled +='<td>'+stat[i].districtData[j].deceased; 
        
        tabled +='</tr>';
      
     }
     
     $('#table').append(tabled);
    
   }
 }
  
  

});



                                 
                        }
                    };
                    searchManager.reverseGeocode(reverseGeocodeRequestOptions);
                });
            }
            
           
            
            
            $(window).on("load",function(){
     
                 console.log("Page loaded");
                 $(".loader-wrapper").fadeOut("slow");
          
            }); 
            
    //eof        
}            