const Wikimedia = {
  search: function (keywords) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${keywords}&origin=*`)
    .then((results) => { return results.json() })
    .catch(function (reason) {
      console.log(reason)
    })
  }
}

export default Wikimedia
