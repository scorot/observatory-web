document$.subscribe(function getWeatherStatus() {
//fetch("http://scorot.free.fr/observatory/weather.txt")
//fetch("http://raspberrypi/observatory/weather.txt")
fetch("weather.txt")
      .then((res) => res.text())
      .then((text) => {
        // do something with "text"
        //document.write(text);

        const rows = text.split("\n");
        rows.shift();
        // date format
        const format = 'HH:mm:ss';

        let precip, temperature, wind, pressure, dewpoint, clouds, humidity, timestamp, forecast;

        rows.forEach(data => {
            const rowData = data.split('=');
            const name = rowData[0];
            const value = rowData[1];

            switch (name) {
                case 'precip':
                    precip = value;
                    break;
                case 'temperature':
                    temperature = value;
                    break;
                case 'wind':
                    wind = value;
                    break;
                case 'pressure':
                    pressure = value;
                    break;
                case 'dewpoint':
                    dewpoint = value;
                    break;
                case 'clouds':
                    clouds = value;
                    break;
                case 'humidity':
                    humidity = value;
                    break;
                case 'date':
                    timestamp = value;
                    break;
                case 'forecast':
                    forecast = value;
                    break;
            }
        });

        const green = '#40FF00';
        const yellow = '#FFFF00';
        const red = '#FE2E2E';

        let statusMsg = "<p style='text-align:left'>";

        let windStatus;
        if (wind <= 5) {
            windStatus = `<font color=${green}>OK</font>`;
        } else if (wind <= 10) {
            windStatus = `<font color=${yellow}>Warning</font>`;
        } else {
            windStatus = `<font color=${red}>Danger</font>`;
        }
        statusMsg += `Wind speed is ${wind}m/s ${windStatus}&emsp;<br />`;

        let temperatureStatus;
        if (temperature <= -5) {
            temperatureStatus = `<font color=${red}>Danger</font>`;
        } else if (temperature <= 0) {
            temperatureStatus = `<font color=${yellow}>Warning</font>`;
        } else if (temperature > 30) {
            temperatureStatus = `<font color=${yellow}>Warning</font>`;
        } else {
            temperatureStatus = `<font color=${green}>OK</font>`;
        }
        statusMsg += `temperature is ${temperature}°C ${temperatureStatus}&emsp;<br />`;

        const dewpointDiff = temperature - dewpoint;
        let dewpointStatus;
        if (dewpointDiff <= 1) {
            dewpointStatus = `<font color=${red}>Danger</font>`;
        } else if (dewpointDiff <= 3) {
            dewpointStatus = `<font color=${yellow}>Warning</font>`;
        } else {
            dewpointStatus = `<font color=${green}>OK</font>`;
        }
        statusMsg += `Dewpoint is ${dewpoint}°C ${dewpointStatus}&emsp;<br />`;

        let humidityStatus;
        if (humidity <= 80) {
            humidityStatus = `<font color=${green}>OK</font>`;
        } else if (humidity <= 90) {
            humidityStatus = `<font color=${yellow}>Warning</font>`;
        } else {
            humidityStatus = `<font color=${red}>Danger</font>`;
        }
        statusMsg += `Relative humidity is ${humidity}% ${humidityStatus}&emsp;<br />`;

        let cloudsStatus;
        if (clouds <= -5) {
            cloudsStatus = `<font color=${green}>OK</font>`;
        } else if (clouds <= -6) {
            cloudsStatus = `<font color=${yellow}>Warning</font>`;
        } else {
            cloudsStatus = `<font color=${red}>Danger</font>`;
        }
        statusMsg += `Cloud cover is ${cloudsStatus}&emsp;<br />`;

        let forecastStatus;
        if (forecast > 805) {
            forecastStatus = `<font color=${red}>Danger</font>`;
        } else if (forecast > 800) {
            forecastStatus = `<font color=${yellow}>Warning</font>`;
        } else {
            forecastStatus = `<font color=${green}>OK</font>`;
        }
        statusMsg += `Weather forecast is ${forecastStatus}<br /></p>`;

        console.log(`<h2>Weather Status at ${new Date(timestamp * 1000).toLocaleTimeString('en-US', { hour12: false })} </h2>`);
        console.log(statusMsg);
        console.log('<br />');
        //document.write(statusMsg);
        //document.innerHTML("current-status")

        var content = document.getElementById('weather-status').innerHTML;
        content += statusMsg
        document.getElementById('weather-status').innerHTML = content;
       })
      .catch((e) => console.error(e));
})
