import { useState, useEffect, ChangeEvent } from "react"


import { optionType, forecastType } from "../types"


const useForecast = () => {

    const [term, setTerm] = useState<string>('')
    const [options, SetOptions] = useState<[]>([])
    const [city, setCity] = useState<optionType | null>(null)
    const [forecast, setForecast] = useState<forecastType | null>(null)
  

    const getSearchOptions = (value: string) => {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then(res => res.json())
        .then(data => SetOptions(data))
    }
  

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  
      const value = e.target.value.trim()
      setTerm(value)
  
      if (value === '') return
  
      getSearchOptions(value)
    }
  

    const onOptionSelect = (option: optionType) => {
      setCity(option)
  
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${option.lat}&lon=${option.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then(res => res.json())
        .then(data => console.log({ data }))
    }
  

    const onSubmit = () => {
  
      if (!city) return
  
      getForecast(city)
    }


    const getForecast = (city: optionType) => {
  
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then(res => res.json())
        .then(data => {
            
// —————————————————————————————————————————————————————————————— STRUCTURED DATA PROVIDED BY API TO MATCH ~ forecastType
            const forecastData = {
            
                ...data.city,
                list: data.list.slice(0, 16),
            }
// —————————————————————————————————————————————————————————————— THEN SET IT TO forecast 
            setForecast(forecastData)
        })
    }
  
    useEffect(() => {
  
      if (city) {
        setTerm(city.name)
        SetOptions([])
      }
    }, [city])

// ——————————————————————————————————————— RETURN function from hook

return {
    term,
    options,
    forecast,
    onSubmit,
    onInputChange,
    onOptionSelect
}

}

export default useForecast