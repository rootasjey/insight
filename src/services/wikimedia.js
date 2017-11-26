const Wikimedia = {
  search: function (keywords) {
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${keywords}&origin=*`)
    .then(function (result) {
      result.json().then(function (data) {
        console.log(data)
      })
    })
    .catch(function (reason) {
      console.log(reason)
    })
  }
}

export default Wikimedia
