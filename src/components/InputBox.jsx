import React, {useId} from 'react'


function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
   const amountInputId = useId();

   const currencyFlag = (code) => {
       const map = {
           usd: '🇺🇸',
           inr: '🇮🇳',
           eur: '🇪🇺',
           gbp: '🇬🇧',
           jpy: '🇯🇵',
           cad: '🇨🇦',
           aud: '🇦🇺',
           sgd: '🇸🇬',
           chf: '🇨🇭',
           cny: '🇨🇳'
       };
       return map[code.toLowerCase()] || code.toUpperCase();
   };

    return (
        <div className={`input-box flex gap-3 items-start ${className}`}>
            <div className="flex-1">
                <label htmlFor={amountInputId} className="block text-sm text-gray-300 mb-1">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="amount-input w-full bg-transparent outline-none text-lg font-medium"
                    type="number"
                    inputMode="decimal"
                    placeholder="0.00"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                    aria-label={`${label} amount`}
                />
            </div>
            <div className="w-36 flex-shrink-0">
                <p className="text-sm text-gray-300 mb-1">Currency</p>
                <div className="relative">
                    <select
                        className="currency-select w-full appearance-none px-3 py-2 bg-white/6 backdrop-blur-sm rounded-lg outline-none"
                        value={selectCurrency}
                        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                        disabled={currencyDisable}
                        aria-label={`${label} currency`}
                    >
                        {currencyOptions.map((currency) => (
                                <option key={currency} value={currency}>
                                    {currencyFlag(currency)} {currency.toUpperCase()}
                                </option>
                            ))}
                    </select>
                    <span className="select-arrow" aria-hidden>▾</span>
                </div>
            </div>
        </div>
    );
}

export default InputBox;