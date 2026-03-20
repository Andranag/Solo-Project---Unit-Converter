const conversions = [
    {
        metric: "meters",
        imperial: "feet", 
        metricToImperial: 3.281,
        imperialToMetric: 0.3048
    },
    {
        metric: "liters",
        imperial: "gallons",
        metricToImperial: 0.264,
        imperialToMetric: 3.785
    },
    {
        metric: "kilograms",
        imperial: "pounds",
        metricToImperial: 2.204,
        imperialToMetric: 0.453
    }
];


const numberInput = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setDefaults() {
    const conversionElements = document.getElementsByClassName('conversion');
    const defaults = [
        "1 meter = 3.281 feet | 1 foot = 0.305 meters",
        "1 liter = 0.264 gallons | 1 gallon = 3.785 liters", 
        "1 kilogram = 2.204 pounds | 1 pound = 0.453 kilograms"
    ];
    for (let i = 0; i < conversionElements.length; i++) {
        conversionElements[i].textContent = defaults[i];
    }
}

convertBtn.addEventListener('click', () => {
    
const number = parseFloat(numberInput.value);
if (!numberInput.value || isNaN(number)) {
    setDefaults();
    return;
}
    for (let i = 0; i < conversions.length; i++) {
        const metricToImperial = (number * conversions[i].metricToImperial).toFixed(3);
        const imperialToMetric = (number * conversions[i].imperialToMetric).toFixed(3);
        const resultString = `${number} ${conversions[i].metric} = ${metricToImperial} ${conversions[i].imperial} | ${number} ${conversions[i].imperial} = ${imperialToMetric} ${conversions[i].metric}`;
        const conversionElements = document.getElementsByClassName('conversion');
        conversionElements[i].innerText = resultString;
    }
});

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Set defaults when page loads
document.addEventListener('DOMContentLoaded', setDefaults);