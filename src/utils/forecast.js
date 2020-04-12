const request = require('request')

// const url = 'http://api.openweathermap.org/data/2.5/weather?lat=34&lon=32&APPID=4dd48160fa4d9cf4550d71770e12870e&units=metric'

// request({ url: url , json:true}, (error, response)=>{
//     if (error){
//         console.log('Unable to connect to weather service!')
//     }else if(response.body.message){
//         console.log(response.body.message)
//     }else{
//         console.log('it is currently '+response.body.main.temp+' degrees'+' and it feels like '+response.body.main.feels_like)
//     }
// })

const forecast = (longitude, latitude, callback) => { 
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&APPID=4dd48160fa4d9cf4550d71770e12870e&units=metric'

    request({url, json: true}, (error, response)=>{

        const {body} = response
        
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.message) {
            callback(body.message, undefined)       
        } else {
            callback(undefined, {
                temperature: body.main.temp,
                feels_like: body.main.feels_like
            })
        }
    })
}


module.exports = forecast