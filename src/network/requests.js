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
            var types = responseobj === null ? null : responseobj.businessTypes;
            callback(true, types);
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
            var types = responseobj === null ? null : responseobj.loanFrequencyLabels;
            callback(true, types);
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
            var types = responseobj === null ? null : responseobj.loanRates;
            callback(true, types);
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
            var maxInstalments = responseobj === null ? null : responseobj.maxInstalments;
            callback(true, maxInstalments);
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
            var maxAmounts = responseobj === null ? null : responseobj.maxAmounts;
            callback(true, maxAmounts);
        })
        .catch((error) => {
            console.log(error);
            callback(false, null);
        });
}

export default { getBusinessTypes, getLoanFrequencyLabels, getLoanRates, getMaxNumInstalments, getMaxAmounts };