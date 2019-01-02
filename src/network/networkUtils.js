import * as urlConstants from './resources/urlConstants.json';

function makeUrl(path) {
    return urlConstants.domain + path;
}

export default { makeUrl };