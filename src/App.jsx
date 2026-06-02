import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/hooks'
import './App.css'


function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedamount, setConvertedamount] = useState(0)

  const currencyinfo = useCurrencyInfo(from)

  const options = Object.keys(currencyinfo)

  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setAmount(convertedamount);
    setConvertedamount(amount);
  };

  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    swap();
    setTimeout(() => setIsSwapping(false), 450);
  };


  const convert = () => {
    setConvertedamount(amount * currencyinfo[to])

  }
  return (
    <div className="app-root w-full min-h-screen flex items-center justify-center">
      <div className="w-full px-6">
        <div className="glass-card w-full max-w-md mx-auto p-6 sm:p-8">
          <div className="card-header text-center mb-4">
            <h1 className="app-title">Currency Converter</h1>
            <p className="app-subtitle">Fast, simple, and elegant conversions</p>
          </div>
          <div className="rate-row text-center mb-4">
            {currencyinfo && currencyinfo[to] && (
              <div className="rate-text">1 {from.toUpperCase()} = {Number(currencyinfo[to]).toLocaleString(undefined, {maximumFractionDigits: 6})} {to.toUpperCase()}</div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />

            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                aria-label="Swap currencies"
                className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 swap-btn ${isSwapping ? 'swapping' : ''}`}
                onClick={handleSwap}
              >
                ⇄
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox

                label="To"
                amount={convertedamount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type="submit" className="w-full convert-btn">
              Convert {from.toUpperCase()} → {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App
