import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import axios from "axios";

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
      );
      const rates = response.data.rates;
      const rate = rates[targetCurrency];
      setExchangeRate(rate);
    } catch (error) {
      console.log("Error fetching exchange rate:", error);
    }
  };

  const convertCurrency = () => {
    const convertRupeeToDollar = (rupeeAmount) => {
      const dollarAmount = rupeeAmount / exchangeRate;
      return dollarAmount;
    };

    const rupees = 100;
    const dollars = convertRupeeToDollar(rupees);
    setConvertedAmount(dollars);
  };

  return (
    <View>
      <Text>Base Currency:</Text>
      <TextInput
        value={baseCurrency}
        onChangeText={setBaseCurrency}
        placeholder="Base Currency"
      />

      <Text>Target Currency:</Text>
      <TextInput
        value={targetCurrency}
        onChangeText={setTargetCurrency}
        placeholder="Target Currency"
      />

      <Text>Exchange Rate: {exchangeRate}</Text>

      <Button title="Convert" onPress={convertCurrency} />

      <Text>Converted Amount: {convertedAmount}</Text>
    </View>
  );
};

export default CurrencyConverter;
