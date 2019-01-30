export const PatchData = (endpoint, data) => {
    return new Promise ((resolve, reject) => {
        fetch(`http://localhost:4000/api/${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseJson => resolve(responseJson))
        .catch(error => reject(error));
    });
}