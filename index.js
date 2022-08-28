/* Your Code Here */
function createEmployeeRecord(employeeRec){
    // console.log('First', employeeRec[3])

    return {
        firstName: employeeRec[0],
        familyName: employeeRec[1],
        title: employeeRec[2],
        payPerHour: employeeRec[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRec){
    return employeeRec.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(dateStamp){
    // console.log('DATE:', dateStamp)
    // console.log('This:', this)

    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })

    return this

}

function createTimeOutEvent(dateStamp) {
    // console.log('THIS:', this)

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })

    return this
}

function hoursWorkedOnDate(dateForm){
    let dateHoursIn = this.timeInEvents.find(function (e) {
        return e.date === dateForm
    })
    // console.log('HourIn:', dateHoursIn) // [ 900 ]

    let dateHoursOut = this.timeOutEvents.find(function (e) {
        return e.date === dateForm
    })
    // console.log('HourOut:', dateHoursOut) // [ 1100 ]

    return (dateHoursOut.hour - dateHoursIn.hour) / 100
}

function wagesEarnedOnDate(dateForm){
    return (hoursWorkedOnDate.call(this, dateForm) * this.payPerHour) // 2 * 27 = 54
    // console.log('WORKED:', hoursWorkedOnDate.call(this, dateForm) * this.payPerHour)
    // console.log('Function:', hoursWorkedOnDate.call(this, dateForm))
    // console.log('PayRate:', this.payPerHour)
}

function findEmployeeByFirstName(srcArray, firstName){
    //`srcArray`: Array of employee records
    //`firstName`: String representing a first name held in an employee record
    // console.log("SRC:", srcArray)
    console.log('FirstName:', srcArray[0].firstName)

    // return srcArray[0].firstName === firstName
    return srcArray.find(function (e){
        return e.firstName === firstName
    })
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employeeRec){
    // console.log("RECORDS:", employeeRec)

    return employeeRec.reduce((previousValue, currentValue) => previousValue + allWagesFor.call(currentValue),0)
}
//* **Returns**
// * Sum of pay owed for **all** employees for all dates, as a number
// * **Behavior**
//   * Using `allWagesFor` for each of the employees, accumulate the value of
//     all dates worked by the employee in the record used as context. Amount
//     should be returned as a number.