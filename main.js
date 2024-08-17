const dayInput = document.getElementById("day");
const monthInput = document.getElementById("mounth"); // "mounth" corrected to "month"
const yearInput = document.getElementById("year");
const subButton = document.getElementsByClassName("sub")[0]; // Accessing first element with class "sub"

const labelDay = document.getElementById("labelDay");
const labelMonth = document.getElementById("labelmonth");
const labelYear = document.getElementById("labelyear");

const CalDayElem = document.getElementById("ValeurNum3");
const CalMonthElem = document.getElementById("ValeurNum2");
const CalYearElem = document.getElementById("ValeurNum1");

const today = new Date();
const dayTODAY = today.getDate();
const monthTODAY = today.getMonth() + 1; // Months are zero-indexed
const yearTODAY = today.getFullYear();

const ErrorDay = document.getElementsByClassName("ErrorDay")[0];
const ErrorMonth = document.getElementsByClassName("ErrorMonth")[0];
const ErrorYear = document.getElementsByClassName("ErrorYear")[0];

// Function to check for input errors
function checkErrors() {
    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);

    // Reset error messages and styles
    ErrorDay.style.display = "none";
    ErrorMonth.style.display = "none";
    ErrorYear.style.display = "none";
    dayInput.style.borderColor = '';
    monthInput.style.borderColor = '';
    yearInput.style.borderColor = '';
    labelDay.style.color = '';
    labelMonth.style.color = '';
    labelYear.style.color = '';

    let hasError = false;

    // Error handling
    if (year > yearTODAY || year < 0) {
        ErrorYear.style.display = "block";
        labelYear.style.color = '#D67372';
        yearInput.style.borderColor = '#D67372';
        hasError = true;
    }
    if (month > 12 || month < 1) {
        ErrorMonth.style.display = "block";
        labelMonth.style.color = '#D67372';
        monthInput.style.borderColor = '#D67372';
        hasError = true;
    }
    if (day < 1 || day > 31) {
        ErrorDay.style.display = "block";
        labelDay.style.color = '#D67372';
        dayInput.style.borderColor = '#D67372';
        hasError = true;
    }
    if (year<(yearTODAY-120)){
        ErrorYear.style.display = "block";
        ErrorYear.textContent = `You just cant be that old`;
        labelDay.style.color = '#D67372';
        dayInput.style.borderColor = '#D67372';
        hasError = true;
    }
    // Check if day is valid for the given month
    if (month >= 1 && month <= 12) {
        const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the month
        if (day > daysInMonth) {
            ErrorDay.style.display = "block";
            ErrorDay.textContent = `In month ${month}, there are only ${daysInMonth} days.`;
            labelDay.style.color = '#D67372';
            dayInput.style.borderColor = '#D67372';
            hasError = true;
        }
    }

    return !hasError;
}

// Function to calculate the year difference
function calculateYear() {
    const year = parseInt(yearInput.value, 10);
    let CalYear = yearTODAY - year;

    // Adjust the year if the month calculation shows negative value
    if (monthTODAY < parseInt(monthInput.value, 10)) {
        CalYear -= 1;
    }

    CalYearElem.textContent = CalYear;
    return CalYear;
}

// Function to calculate the month difference
function calculateMonth() {
    const month = parseInt(monthInput.value, 10);
    let CalMonth = monthTODAY - month;

    // If month difference is negative, adjust it and reduce the year
    if (CalMonth < 0) {
        CalMonth += 12;
    }

    CalMonthElem.textContent = CalMonth;
    return CalMonth;
}

// Function to calculate the day difference
function calculateDay() {
    const day = parseInt(dayInput.value, 10);
    let CalDay = dayTODAY - day;

    // If day difference is negative, adjust it and reduce the month
    if (CalDay < 0) {
        const daysInPrevMonth = new Date(yearTODAY, monthTODAY - 1, 0).getDate(); // Days in the previous month
        CalDay += daysInPrevMonth;
    }

    CalDayElem.textContent = CalDay;
    return CalDay;
}

// Event listener for the button click to trigger the calculations
subButton.addEventListener("click", function() {
    const isValid = checkErrors(); // Check for errors before calculations

    if (isValid) {
        const CalYear = calculateYear();
        const CalMonth = calculateMonth();
        const CalDay = calculateDay();

        // Re-adjust year if needed based on month calculation
        if (CalMonth < 0) {
            console.log("Month difference is negative, adjusting year...");
            CalYearElem.textContent = CalYear + 1;
        }
    }
});
