function getTotalPayable(loanAmount, rate) {
    // TODO: Make monetary calculations secure
    return parseFloat(loanAmount*(1+rate/100.00)).toFixed(2);
}

function getPerInstalment(loanAmount, rate, numberOfinstalments) {
    // TODO: Make monetary calculations secure
    return parseFloat((parseFloat(loanAmount)/parseInt(numberOfinstalments))*(1+rate/100.00)).toFixed(2);
}

export default { getTotalPayable, getPerInstalment };