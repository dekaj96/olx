export const GetData = (endpoint) => {
    return new Promise ((resolve, reject) => {
        fetch(`/api/${endpoint}`)
        .then(response => response.json())
        .then(responseJson => resolve(responseJson))
        .catch(error => reject(error));
    });
}