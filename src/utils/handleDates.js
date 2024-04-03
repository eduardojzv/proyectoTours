export function calculateDate(type, months) {
    const currentDate = new Date();
    switch (type) {
        case "current":
            return currentDate.toISOString().split('T')[0];
        case "future":
            currentDate.setMonth(currentDate.getMonth() + months);
            currentDate.setDate(1);
            return currentDate.toISOString().split('T')[0];
        case "past":
            currentDate.setMonth(currentDate.getMonth() - months);
            currentDate.setDate(1);
            return currentDate.toISOString().split('T')[0];
        default:
            return currentDate.toISOString().split('T')[0];
    }
}
export function formatDate(dateString) {
    console.log("dateee",dateString);
    var date = new Date(dateString + "T00:00:00");
    console.log("x",date);
    var daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    //day of month
    var dayOfMonth = date.getDate();
    //day of week
    var dayOfWeek = date.getDay();
    console.log("dayOfWeek",dayOfWeek);
    //month
    var month = date.getMonth();
    //day name
    var dayName = daysOfWeek[dayOfWeek];
    //month name
    var monthName = months[month];
    //year
    var year = date.getFullYear()
    return `${dayName},${dayOfMonth} ${monthName} ${year}`
}

