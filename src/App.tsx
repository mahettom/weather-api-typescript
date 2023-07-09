import Forecast from "./components/Forecast"
import useForecast from "./hooks/useForecast"
import Search from "./components/Search"


const App = (): JSX.Element => {

  const {
    term,
    options,
    forecast,
    onSubmit,
    onInputChange,
    onOptionSelect
  } = useForecast()

  return (

    <main className='flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full'>

      {forecast ? (

        <Forecast data={forecast} />

      ) : (

        <Search
          term={term}
          options={options}
          onSubmit={onSubmit}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
        />

      )}


    </main>
  )
}

export default App
