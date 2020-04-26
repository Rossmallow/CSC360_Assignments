export default (URL) => {
    return fetch(URL)
        .then((response) => {
            // console.dir(response);
            return response.json();
        })
}