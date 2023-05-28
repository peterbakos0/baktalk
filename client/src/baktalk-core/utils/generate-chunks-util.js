var generateChunksUtil = (array, chunkSize) => {
    array = array.slice();

    var result = [];
    while(array.length > 0) { result.push(array.splice(0, chunkSize)); }

    return result;
};

export default generateChunksUtil;
