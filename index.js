const App = {

    $ : {
        card : document.querySelector('.container'),
        button : document.querySelector('button'),
        year : document.querySelector('.y-outs'),
        month : document.querySelector('.m-outs'),
        date : document.querySelector('.d-outs'),
        input : document.querySelectorAll('input')
    },
    init() {
        App.registerEventListeners();
    },

    registerEventListeners() {
        App.$.button.addEventListener('click', function(){
            let indate = App.$.input[0].value;
            let inmonth = App.$.input[1].value;
            let inyear = App.$.input[2].value;
            // App.calculateAge(indate, inmonth, inyear);
            const [years, months, days] = App.calculateAge(indate, inmonth, inyear);
            App.$.year.innerHTML = years;
            App.$.month.innerHTML = months;
            App.$.date.innerHTML = days;
        })
    },

    //static functions
    calculateAge(day, month, year){
        let birthdate = new Date(year, month-1, day);
        let now = new Date();
        let msperyear = 31536000000;
        let mspermonth = 2592000000;
        let msperday = 86400000;
        let msdiff = now - birthdate;
        let days = Math.floor(msdiff/msperday);
        // console.log(days, msdiff, birthdate, now);
        days -= this.calculateNoOfLeapDays(birthdate, now);
        let years = (days-(days % 365))/365;
        days %= 365;
        let months = 0;
        [months, days] = this.calculateNoMonthDays(birthdate, now, days);
        // console.log(years, months, days);
        return [years, months, days];
    },
    calculateNoOfLeapDays(birthdate, current){
        let birthYr = birthdate.getFullYear();
        let currentYr = current.getFullYear();
        let birthMonth = birthdate.getMonth();
        let currentMonth = current.getMonth();
        let days = 0;  
        if (birthYr < 2000){
            days -= 1;
        } 
        if (birthYr%4 == 0 && birthMonth < 2){
            days += 1;
        }
        if (currentYr%4 == 0 && currentMonth >= 2){
            days += 1;
        }
        if (birthYr%4 == 0 && currentYr%4 == 0){
            // console.log((currentYr-birthYr)/4-1);
            days += (currentYr-birthYr)/4-1;
        }else{
            // console.log(Math.floor((currentYr-birthYr)/4));
            days += Math.floor((currentYr-birthYr)/4);
        }
        return days;
    },
    calculateNoMonthDays(birthdate, current, days){
        let months = [31,28,31,30,31,30,31,31,30,31,30,31];
        let birthMonth = birthdate.getMonth();
        let currentMonth = current.getMonth();
        // console.log(currentMonth, birthMonth)
        if (currentMonth > birthMonth){
            totalDays = months.slice(birthMonth, currentMonth).reduce((a,b)=>a+b, 0);
            monthsCount = months.slice(birthMonth, currentMonth).length; 
        }else{
            monthsInPreviousYr = months.slice(birthMonth, 12)
            monthsInCurrentYr = months.slice(0,currentMonth)
            totalDays = monthsInPreviousYr.concat(monthsInCurrentYr).reduce((a,b)=>a+b, 0);
            monthsCount = monthsInPreviousYr.concat(monthsInCurrentYr).length;
        }
        let daysRem = days - totalDays;
        if (daysRem < 0){
            monthsCount -= 1;
            daysRem += months[currentMonth];
        }
        return [monthsCount, daysRem];
    }
}

window.addEventListener('load', App.init);