document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        applyTranslations(lang); // Assumes applyTranslations is defined in translations.js
    });

    // Custom cursor and snowflake trail
    const cursor = document.querySelector('.custom-cursor');
    const snowflakeTrail = document.querySelector('.snowflake-trail');

    if (!snowflakeTrail) {
        console.error('Snowflake trail container not found. Ensure <div class="snowflake-trail"></div> is in the HTML.');
        return;
    }

    let lastSnowflakeTime = 0;
    const snowflakeInterval = 100; // Create a snowflake every 100ms

    document.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }

        const currentTime = Date.now();
        if (currentTime - lastSnowflakeTime < snowflakeInterval) return;

        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = e.clientX + 'px';
        snowflake.style.top = e.clientY + 'px';
        snowflakeTrail.appendChild(snowflake);
        lastSnowflakeTime = currentTime;

        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
        });
    });

    // Calculator functionality
    const calcDisplay = document.getElementById('calc-display');
    const calcButtons = document.querySelectorAll('.calc-btn');
    let calcInput = '';

    if (calcDisplay && calcButtons) {
        calcButtons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.textContent;
                if (value === '=') {
                    try {
                        let expression = calcInput.replace('×', '*').replace('÷', '/');
                        if (['sin', 'cos', 'tan', 'log', '√'].some(op => expression.includes(op))) {
                            expression = expression.replace('sin', 'Math.sin')
                                                 .replace('cos', 'Math.cos')
                                                 .replace('tan', 'Math.tan')
                                                 .replace('log', 'Math.log10')
                                                 .replace('√', 'Math.sqrt')
                                                 .replace('^', '**');
                        }
                        calcInput = eval(expression);
                        calcDisplay.value = calcInput;
                    } catch {
                        calcDisplay.value = 'Error';
                        calcInput = '';
                    }
                } else if (value === 'C') {
                    calcInput = '';
                    calcDisplay.value = '';
                } else {
                    calcInput += value;
                    calcDisplay.value = calcInput;
                }
            });
        });
    }

    // Weather App (Mock data for now)
    const fetchWeatherBtn = document.getElementById('fetch-weather');
    const weatherCity = document.getElementById('weather-city');
    const weatherDisplay = document.getElementById('weather-display');

    if (fetchWeatherBtn && weatherCity && weatherDisplay) {
        fetchWeatherBtn.addEventListener('click', () => {
            const city = weatherCity.value.trim();
            if (city) {
                weatherDisplay.innerHTML = `Weather in ${city}: 25°C, Sunny`;
            } else {
                weatherDisplay.innerHTML = 'Please enter a city.';
            }
        });
    }

    // To-Do List
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    if (todoInput && addTodoBtn && todoList) {
        addTodoBtn.addEventListener('click', () => {
            const task = todoInput.value.trim();
            if (task) {
                const li = document.createElement('li');
                li.textContent = task;
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => li.remove());
                li.appendChild(deleteBtn);
                todoList.appendChild(li);
                todoInput.value = '';
            }
        });
    }

    // Currency Converter
    const currencyAmount = document.getElementById('currency-amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const convertCurrencyBtn = document.getElementById('convert-currency');
    const currencyResult = document.getElementById('currency-result');

    if (currencyAmount && fromCurrency && toCurrency && convertCurrencyBtn && currencyResult) {
        convertCurrencyBtn.addEventListener('click', () => {
            const amount = parseFloat(currencyAmount.value);
            if (isNaN(amount) || amount <= 0) {
                currencyResult.innerHTML = 'Please enter a valid amount.';
                return;
            }
            const rates = { USD: 1, EUR: 0.85, KES: 110, GBP: 0.75 };
            const converted = (amount * rates[toCurrency.value]) / rates[fromCurrency.value];
            currencyResult.innerHTML = `${amount} ${fromCurrency.value} = ${converted.toFixed(2)} ${toCurrency.value}`;
        });
    }

    // Timer/Stopwatch
    const timerDisplay = document.getElementById('timer-display');
    const startStopwatchBtn = document.getElementById('start-stopwatch');
    const stopStopwatchBtn = document.getElementById('stop-stopwatch');
    const resetStopwatchBtn = document.getElementById('reset-stopwatch');
    const countdownInput = document.getElementById('countdown-input');
    const startCountdownBtn = document.getElementById('start-countdown');

    if (timerDisplay && startStopwatchBtn && stopStopwatchBtn && resetStopwatchBtn && countdownInput && startCountdownBtn) {
        let stopwatchInterval;
        let stopwatchTime = 0;
        let countdownInterval;

        const updateStopwatch = () => {
            stopwatchTime++;
            const hours = Math.floor(stopwatchTime / 3600);
            const minutes = Math.floor((stopwatchTime % 3600) / 60);
            const seconds = stopwatchTime % 60;
            timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        };

        startStopwatchBtn.addEventListener('click', () => {
            clearInterval(stopwatchInterval);
            clearInterval(countdownInterval);
            stopwatchInterval = setInterval(updateStopwatch, 1000);
            timerDisplay.classList.add('active');
        });

        stopStopwatchBtn.addEventListener('click', () => {
            clearInterval(stopwatchInterval);
            timerDisplay.classList.remove('active');
        });

        resetStopwatchBtn.addEventListener('click', () => {
            clearInterval(stopwatchInterval);
            clearInterval(countdownInterval);
            stopwatchTime = 0;
            timerDisplay.textContent = '00:00:00';
            timerDisplay.classList.remove('active');
        });

        startCountdownBtn.addEventListener('click', () => {
            clearInterval(stopwatchInterval);
            clearInterval(countdownInterval);
            let countdownTime = parseInt(countdownInput.value);
            if (isNaN(countdownTime) || countdownTime <= 0) {
                timerDisplay.textContent = 'Enter valid time';
                return;
            }

            countdownInterval = setInterval(() => {
                if (countdownTime <= 0) {
                    clearInterval(countdownInterval);
                    timerDisplay.textContent = '00:00:00';
                    timerDisplay.classList.remove('active');
                    return;
                }
                countdownTime--;
                const hours = Math.floor(countdownTime / 3600);
                const minutes = Math.floor((countdownTime % 3600) / 60);
                const seconds = countdownTime % 60;
                timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                timerDisplay.classList.add('active');
            }, 1000);
        });
    }

    // Unit Converter
    const unitAmount = document.getElementById('unit-amount');
    const unitType = document.getElementById('unit-type');
    const fromUnit = document.getElementById('from-unit');
    const toUnit = document.getElementById('to-unit');
    const convertUnitBtn = document.getElementById('convert-unit');
    const unitResult = document.getElementById('unit-result');

    if (unitAmount && unitType && fromUnit && toUnit && convertUnitBtn && unitResult) {
        const units = {
            length: {
                meters: 1,
                kilometers: 0.001,
                miles: 0.000621371,
                feet: 3.28084
            },
            weight: {
                kilograms: 1,
                pounds: 2.20462,
                ounces: 35.274
            },
            temperature: {
                celsius: { toCelsius: (val) => val, fromCelsius: (val) => val },
                fahrenheit: { toCelsius: (val) => (val - 32) * 5/9, fromCelsius: (val) => (val * 9/5) + 32 },
                kelvin: { toCelsius: (val) => val - 273.15, fromCelsius: (val) => val + 273.15 }
            }
        };

        const updateUnits = () => {
            const type = unitType.value;
            fromUnit.innerHTML = '';
            toUnit.innerHTML = '';
            Object.keys(units[type]).forEach(unit => {
                const option1 = document.createElement('option');
                option1.value = unit;
                option1.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
                const option2 = option1.cloneNode(true);
                fromUnit.appendChild(option1);
                toUnit.appendChild(option2);
            });
        };

        unitType.addEventListener('change', updateUnits);
        updateUnits(); // Initial population

        convertUnitBtn.addEventListener('click', () => {
            const amount = parseFloat(unitAmount.value);
            if (isNaN(amount)) {
                unitResult.innerHTML = 'Please enter a valid amount.';
                return;
            }

            const type = unitType.value;
            if (type === 'temperature') {
                const toCelsius = units[type][fromUnit.value].toCelsius(amount);
                const converted = units[type][toUnit.value].fromCelsius(toCelsius);
                unitResult.innerHTML = `${amount} ${fromUnit.value} = ${converted.toFixed(2)} ${toUnit.value}`;
            } else {
                const converted = (amount * units[type][toUnit.value]) / units[type][fromUnit.value];
                unitResult.innerHTML = `${amount} ${fromUnit.value} = ${converted.toFixed(2)} ${toUnit.value}`;
            }
        });
    }

    // Random Number Generator
    const minRange = document.getElementById('min-range');
    const maxRange = document.getElementById('max-range');
    const generateNumberBtn = document.getElementById('generate-number');
    const numberResult = document.getElementById('number-result');

    if (minRange && maxRange && generateNumberBtn && numberResult) {
        generateNumberBtn.addEventListener('click', () => {
            const min = parseInt(minRange.value);
            const max = parseInt(maxRange.value);
            if (isNaN(min) || isNaN(max) || min >= max) {
                numberResult.innerHTML = 'Please enter a valid range (min < max).';
                return;
            }
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            numberResult.innerHTML = `Random Number: ${randomNum}`;
        });
    }

    // Color Picker
    const colorInput = document.getElementById('color-input');
    const colorDisplay = document.getElementById('color-display');
    const colorValues = document.getElementById('color-values');

    if (colorInput && colorDisplay && colorValues) {
        colorInput.addEventListener('input', () => {
            const color = colorInput.value;
            colorDisplay.style.backgroundColor = color;

            // Convert hex to RGB
            const hex = color.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            colorValues.innerHTML = `HEX: ${color}<br>RGB: (${r}, ${g}, ${b})`;
            colorDisplay.classList.add('active');
        });
    }

    // BMI Calculator
    const weightInput = document.getElementById('weight-input');
    const heightInput = document.getElementById('height-input');
    const calculateBmiBtn = document.getElementById('calculate-bmi');
    const bmiResult = document.getElementById('bmi-result');

    if (weightInput && heightInput && calculateBmiBtn && bmiResult) {
        calculateBmiBtn.addEventListener('click', () => {
            const weight = parseFloat(weightInput.value);
            const height = parseFloat(heightInput.value) / 100; // Convert cm to meters
            if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
                bmiResult.innerHTML = 'Please enter valid weight and height.';
                return;
            }
            const bmi = (weight / (height * height)).toFixed(2);
            let category = '';
            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obese';
            bmiResult.innerHTML = `BMI: ${bmi} (${category})`;
        });
    }
});