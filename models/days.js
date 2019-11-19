import {
    HTTP
} from "../utils/http.js"
class Days extends HTTP {
    getDaysWeather(city) {
        let params = {
            url: 'days_weather/' + city,
            // data: {
            //     city: city
            // }
        }
        return this.request(params)
    }
}

export {
    Days
}