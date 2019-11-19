import {
    HTTP
} from "../utils/http.js"
class Today extends HTTP {
    getTodayWeather(city) {
        let params = {
            url: 'current_weather/'+city,
            // data: {
            //     cityName: city
            // }
        }
        return this.request(params)
    }
}

export {
    Today
}