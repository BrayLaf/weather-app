$(function(){
    fetch('http://api.weatherapi.com/v1/current.json?key=9c057068be3f4c99bea04437251204&q=Calgary&aqi=no')
    .then(response =>{
        if(response.status == 200)
            return response.json();
        else
            throw new Error("Unable to retrieve weather data")
    }).then(data => {
        console.log(data.current);
        $(".secondaryTitle").text(data.current.temp_c + "°C");
        $(".fillerText").text(`It is currently ${data.current.condition.text}. Due to a windchill it currently feels more like ${data.current.windchill_c}°C`);
        $(".weatherImg").attr('src', data.current.condition.icon);
    })
});