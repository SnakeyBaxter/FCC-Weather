$(document).ready(function(){
	getLocation();
	var locate = document.getElementById("location");
	var weather = document.getElementById("weather");
	var temperature = document.getElementById("temp");
	var lat = 0;
	var lon = 0;
	var temp = 0;
	var degrees = "C";

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else { 
			locate.innerHTML = "Geolocation is not supported by this browser.";
		}
		
	}

    //use HTML5 geolocation data to retrieve weather data from openweathermap
	function showPosition(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			locate.innerHTML = "Your location is: <br>" + lat.toFixed(2) + " latitude <br>" + lon.toFixed(2) + " longitude";
			
	        var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
				var json = xmlhttp.responseText;
				var data = JSON.parse(json);  
				var temp = Math.round(data.main.temp - 273.15);
				var html  = '<h3>Weather for: <br>' + data.name + '</h3><img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" /><h3>' + data.weather[0].main + "</h3>";
				weather.innerHTML = html;
				var tempdisp = "<h3>Temp: "+ temp + "&deg;" + degrees + "</h3>"; 
				temperature.innerHTML = tempdisp;
				
				//change background depending on weather
				var view = data.weather[0].main;
				console.log(view);
				switch (view){
					case "Clear":
					$("body").css({"background-image": "url(http://i88.photobucket.com/albums/k199/flanners_bucket/Codepen/clear_sky.jpg)"});
					break;
					case "Clouds":
					$("body").css({"background-image": "url(http://i88.photobucket.com/albums/k199/flanners_bucket/Codepen/clouds.jpg)"});
					break;
					case "Mist":
					$("body").css({"background-image": "url(http://i88.photobucket.com/albums/k199/flanners_bucket/Codepen/mist.jpg)"});
					break;
					case "Snow":
					$("body").css({"background-image": "url(http://i88.photobucket.com/albums/k199/flanners_bucket/Codepen/snow.jpg)"});
					break;
					case "Rain":
					$("body").css({"background-image": "url(http://i88.photobucket.com/albums/k199/flanners_bucket/Codepen/rain.jpg)"});
					break;
					case "Sunny":
					$("body").css({"background-image": "url(http://i88.photobucket.com/albums/k199/flanners_bucket/Codepen/sunshine.jpg)"});
					break;
				}
				
				//show/hide buttons
				$('#ctof').show();
				$('#showloc').show();
					//function to change between C and F
					$('#ctof').click(function(){
						if (degrees === "C"){
						temp = temp *(9 / 5) + 32;
						degrees = "F";
						} else {
						temp = (temp - 32) * (5 / 9);
						degrees = "C";
						}
						var tempData = "<h3>Temp: "+ temp.toFixed(0) + "&deg;" + degrees + "</h3>";
				        $('#temp').html(tempData);
					
					}); //end converter
					
				//show/hide location coordinates
				$('#showloc').click(function(){	
					$('#location').toggle();
				});
			}
			
	   };
		
        xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=d08c637590fa6f95705c7cc18742b785", true);
		xmlhttp.send(); 
		
	}
	
});