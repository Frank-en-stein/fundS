import * as dummyResponse from './resources/dummyResponse.json';
import * as urlConstants from './resources/urlConstants.json';
import networkUtils from './networkUtils.js';

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

function postLoanApplicationDraftForm(data, callback) {
    if(isDummy) {
        localStorage.setItem("loanApplicationDraft", JSON.stringify(data));
        callback(true);
        return;
    }

    axios.post(networkUtils.makeUrl(urlConstants.paths.get.loanApplicationDraft), data)
        .then((response) => {
            callback(true);
        })
        .catch((error) => {
            console.log(error);
            callback(false);
        });
}

export default { getBusinessTypes, getLoanFrequencyLabels, getLoanRates, getMaxNumInstalments, getMaxAmounts, getLoanApplicationDraftForm, postLoanApplicationDraftForm };