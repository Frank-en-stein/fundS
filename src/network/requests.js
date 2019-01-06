import * as dummyResponse from './resources/dummyResponse.json';
import * as urlConstants from './resources/urlConstants.json';
import networkUtils from './networkUtils';
import generator from './../utility/generator';

const axios = require('axios');

const isDummy = true;

function getBusinessTypes(callback) {
    if (isDummy) {
        callback(true, dummyResponse.businessTypes);
        return;
    }

    axios.get(networkUtils.makeUrl(urlConstants.paths.get.businessTypes))
        .then((response) => {
            var responseobj = JSON.parse(response);
            callback(true, responseobj);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

function getLoanFrequencyLabels(callback) {
    if (isDummy) {
        callback(true, dummyResponse.loanFrequencyLabels);
        return;
    }

    axios.get(networkUtils.makeUrl(urlConstants.paths.get.loanFrequencyLabels))
        .then((response) => {
            var responseobj = JSON.parse(response);
            callback(true, responseobj);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

function getLoanRates(callback) {
    if (isDummy) {
        callback(true, dummyResponse.loanRates);
        return;
    }

    axios.get(networkUtils.makeUrl(urlConstants.paths.get.loanRates))
        .then((response) => {
            var responseobj = JSON.parse(response);
            callback(true, responseobj);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

function getMaxNumInstalments(callback) {
    if (isDummy) {
        callback(true, dummyResponse.maxInstalments);
        return;
    }

    axios.get(networkUtils.makeUrl(urlConstants.paths.get.maxInstalments))
        .then((response) => {
            var responseobj = JSON.parse(response);
            callback(true, responseobj);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

function getMaxAmounts(callback) {
    if (isDummy) {
        callback(true, dummyResponse.maxAmounts);
        return;
    }

    axios.get(networkUtils.makeUrl(urlConstants.paths.get.maxAmounts))
        .then((response) => {
            var responseobj = JSON.parse(response);
            callback(true, responseobj);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

function getLoanApplicationDraftForm(callback) {
    if(isDummy) {
        var responseobj = localStorage.getItem("loanApplicationDraft");
        callback(true, JSON.parse(responseobj));
        return;
    }

    axios.get(networkUtils.makeUrl(urlConstants.paths.get.loanApplicationDraft))
        .then((response) => {
            var responseobj = JSON.parse(response);
            callback(true, responseobj);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

function getMyApplications(callback) {
    if(isDummy) {
        var loanApplications = JSON.parse(localStorage.getItem("loanApplications"));
        callback(true, loanApplications);
        return;
    }

    axios.get(networkUtils.makeUrl(urlConstants.paths.get.loanApplications))
        .then((response) => {
            var responseobj = JSON.parse(response);
            callback(true, responseobj);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

function getMyLoans(callback) {
    if(isDummy) {
        var loans = JSON.parse(localStorage.getItem("loans"));
        if (loans===null) {
            loans = [];
            for(var i=0; i<5; i++) {
                var loan = {
                    id: generator.makeRandomId(5),
                    businessTypes: dummyResponse.businessTypes[generator.makeRandomInt(dummyResponse.businessTypes.length)],
                    amount: generator.makeRandomInt(5)*1000+500,
                    lastInstalmentDate: generator.makeRandomDate(new Date(2018, 0, 1), new Date()).toISOString().substring(0, 10),
                    loanFrequency: dummyResponse.loanFrequencyLabels[generator.makeRandomInt(dummyResponse.loanFrequencyLabels.length)],
                    instalments: {total: null, paid: null}
                };
                loan["instalments"]["total"] = 1 + generator.makeRandomInt(dummyResponse.maxInstalments[loan.loanFrequency]);
                loan["instalments"]["paid"] = generator.makeRandomInt(loan["instalments"]["total"]);
                loans.push(loan);
            }
            localStorage.setItem("loans", JSON.stringify(loans));
        }
        callback(true, loans);
        return;
    }

    axios.get(networkUtils.makeUrl(urlConstants.paths.get.loans))
        .then((response) => {
            var responseobj = JSON.parse(response);
            callback(true, responseobj);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

function postLoanApplicationDraftForm(data, callback) {
    if (isDummy) {
        localStorage.setItem("loanApplicationDraft", JSON.stringify(data));
        callback(true);
        return;
    }

    var user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
        console.log("User not logged in");
        return;
    }

    let payload = {"user": user, "data": data};
    axios.post(networkUtils.makeUrl(urlConstants.paths.post.loanApplicationDraft), payload)
        .then((response) => {
            callback(true);
        })
        .catch((error) => {
            console.log(error);
            callback(false);
        });
}

function postNewLoanApplication(data, callback) {
    if (isDummy) {
        var loanApplications = JSON.parse(localStorage.getItem("loanApplications"));
        if (loanApplications === null) loanApplications = [];
        var dummyApplication = data;
        dummyApplication['id'] = generator.makeRandomId(5);
        dummyApplication['status'] = dummyResponse.applicationStatuses[generator.makeRandomInt(4)];
        console.log(dummyApplication);
        loanApplications.push(dummyApplication);
        localStorage.setItem("loanApplications", JSON.stringify(loanApplications));
        callback(true, dummyApplication);
        return;
    }

    var user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
        console.log("User not logged in");
        callback(false, null);
        return;
    }

    let payload = {"user": user, "data": data};
    axios.post(networkUtils.makeUrl(urlConstants.paths.post.loanApplicationNew), payload)
        .then((response) => {
            callback(true);
        })
        .catch((error) => {
            console.log(error);
            callback(false);
        });
}

function postApplicationCancel(application, callback) {
    if (isDummy) {
        var loanApplications = JSON.parse(localStorage.getItem("loanApplications"));
        if (loanApplications === null) loanApplications = [];
        var idx = loanApplications.findIndex((item) => item.id === application.id);
        if (idx!==null) callback(false, null);
        if (loanApplications[idx].status === "Pending") {
            loanApplications[idx].status = "Cancelled";
            callback(true, loanApplications[idx]);
        } else {
            loanApplications.splice(idx, 1);
            callback(true, null);
        }
        localStorage.setItem("loanApplications", JSON.stringify(loanApplications));
        return;
    }

    var user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
        console.log("User not logged in");
        callback(false, null);
        return;
    }

    let payload = {"user": user, "data": application};
    axios.post(networkUtils.makeUrl(urlConstants.paths.post.loanApplicationCancel), payload)
        .then((response) => {
            callback(true, response);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

function postLoanInstalment(loan, txId, callback) {
    if (isDummy) {
        if (loan!==null) if (loan.instalments.paid < loan.instalments.total) if (generator.makeRandomInt(2)%2==0) {
            var loans = JSON.parse(localStorage.getItem("loans"));
            var index = loans.findIndex((item)=>item.id===loan.id);
            if (index!==null) {
                callback(false, null);
                return;
            }
            loans[index].lastInstalmentDate = new Date().toISOString().substring(0, 10);
            loans[index].instalments.paid++;
            localStorage.setItem("loans", JSON.stringify(loans));
            callback(true, loans[index]);
            return;
        } else {
            callback(true, null);
        }
        callback(false, null);
        return;
    }

    var user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
        console.log("User not logged in");
        callback(false, null);
        return;
    }

    let payload = {"user": user, "data": loan, "txId": txId};
    axios.post(networkUtils.makeUrl(urlConstants.paths.post.loanInstalment), payload)
        .then((response) => {
            callback(true, response);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

export default { getBusinessTypes, getLoanFrequencyLabels, getLoanRates, getMaxNumInstalments,
    getMaxAmounts, getLoanApplicationDraftForm, getMyApplications, getMyLoans, postLoanApplicationDraftForm,
    postNewLoanApplication, postApplicationCancel, postLoanInstalment };
