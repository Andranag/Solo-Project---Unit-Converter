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
const clearBtn = document.getElementById('clear-btn');
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

function performConversion() {
    const number = parseFloat(numberInput.value);
    if (!numberInput.value || isNaN(number)) {
        setDefaults();
        return;
    }
    
    // Format number with commas for better readability
    const formattedNumber = formatNumber(number);
    
    for (let i = 0; i < conversions.length; i++) {
        const metricToImperial = (number * conversions[i].metricToImperial).toFixed(3);
        const imperialToMetric = (number * conversions[i].imperialToMetric).toFixed(3);
        
        // Format the results with commas
        const formattedMetricToImperial = formatNumber(parseFloat(metricToImperial));
        const formattedImperialToMetric = formatNumber(parseFloat(imperialToMetric));
        
        const resultString = `${formattedNumber} ${conversions[i].metric} = ${formattedMetricToImperial} ${conversions[i].imperial} | ${formattedNumber} ${conversions[i].imperial} = ${formattedImperialToMetric} ${conversions[i].metric}`;
        const conversionElements = document.getElementsByClassName('conversion');
        conversionElements[i].innerText = resultString;
    }
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function validateInput(value) {
    // Remove any non-numeric characters except decimal point and minus
    const cleanValue = value.replace(/[^0-9.-]/g, '');
    
    // Ensure only one decimal point
    const parts = cleanValue.split('.');
    if (parts.length > 2) {
        return parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Ensure only one minus sign at the beginning
    if (cleanValue.indexOf('-') > 0) {
        return cleanValue.replace(/-/g, '');
    }
    
    return cleanValue;
}

// Real-time conversion as user types
let debounceTimer;
numberInput.addEventListener('input', (e) => {
    // Validate and clean input
    const validatedValue = validateInput(e.target.value);
    if (validatedValue !== e.target.value) {
        e.target.value = validatedValue;
    }
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performConversion, 300); // 300ms delay
});

// Clear button functionality
clearBtn.addEventListener('click', () => {
    numberInput.value = '';
    setDefaults();
    numberInput.focus(); // Return focus to input for convenience
});

// Allow Enter key to convert
numberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performConversion();
    }
});

// Allow Escape key to clear
numberInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        numberInput.value = '';
        setDefaults();
    }
});

// Copy to clipboard functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-btn')) {
        const card = e.target.closest('.card');
        const conversionText = card.querySelector('.conversion').textContent;
        
        navigator.clipboard.writeText(conversionText).then(() => {
            const originalText = e.target.textContent;
            e.target.textContent = '✓ Copied!';
            e.target.classList.add('copied');
            
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.classList.remove('copied');
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = conversionText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = e.target.textContent;
            e.target.textContent = '✓ Copied!';
            e.target.classList.add('copied');
            
            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.classList.remove('copied');
            }, 2000);
        });
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