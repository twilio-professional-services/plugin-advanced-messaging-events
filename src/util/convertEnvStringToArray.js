// takes a string from an environment variable (string or a JSON encoded object)
// and returns an array of strings
function convertEnvStringToArray(str) {
    if (!str) {
        return undefined;
    }

    try {

        // Attempt to JSON parse the string
        let parsedObject = JSON.parse(str);

        // If the parsed string is an array, return it
        if (Array.isArray(parsedObject)) {
            return parsedObject;
        }

        // If it's an object, add the keys of the object to an array
        else if (typeof parsedObject === 'object') {
            let arr = [];
            for (let [key] of Object.entries(parsedObject)) {
                arr.push(key)
            }

            return arr;
        }
    }

    // If JSON parsing fails, return the string as an array entry
    catch(e) {
        return [str]
    }
}

export default convertEnvStringToArray