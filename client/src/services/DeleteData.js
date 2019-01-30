export const DeleteData = (endpoint) => {
    return new Promise ((resolve, reject) => {
        fetch(`http://localhost:4000/api/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(responseJson => resolve(responseJson))
        .catch(error => reject(error));
    });
}