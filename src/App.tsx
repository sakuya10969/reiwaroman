import Header from '@/components/Header'
import Main from '@/components/Main'

const LogoComponent = () => (
  <img
    src="/assets/logo-reiwaroman.svg"
    alt="REIWAROMAN"
    className="w-9 h-9"
  />
)

function App() {
  return (
    <div className="w-full">
      <Header Logo={LogoComponent} />
      <Main />
    </div>
  )
}

export default App
