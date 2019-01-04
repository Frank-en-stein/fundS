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
        var dummApplication = data;
        dummApplication['id'] = generator.makeRandomId(5);
        dummApplication['status'] = dummyResponse.applicationStatuses[generator.makeRandomInt(4)];
        console.log(dummApplication);
        loanApplications.push(dummApplication);
        localStorage.setItem("loanApplications", JSON.stringify(loanApplications));
        callback(true);
        return;
    }

    var user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
        console.log("User not logged in");
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
        var dummApplication = application;
        dummApplication['status'] = 'Cancelled';
        if (idx!==null) loanApplications[idx] = dummApplication;
        localStorage.setItem("loanApplications", JSON.stringify(loanApplications));
        callback(true);
        return;
    }

    var user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
        console.log("User not logged in");
        return;
    }

    let payload = {"user": user, "data": application};
    axios.post(networkUtils.makeUrl(urlConstants.paths.post.loanApplicationCancel), payload)
        .then((response) => {
            callback(true);
        })
        .catch((error) => {
            console.log(error);
            callback(false);
        });
}

export default { getBusinessTypes, getLoanFrequencyLabels, getLoanRates, getMaxNumInstalments,
    getMaxAmounts, getLoanApplicationDraftForm, getMyApplications, postLoanApplicationDraftForm, postNewLoanApplication, postApplicationCancel };
