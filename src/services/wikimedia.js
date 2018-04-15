const Wikimedia = {
  search: function (keywords) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&titles=${keywords}&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=800&pilimit=10&wbptterms=description&redirects&origin=*`)
    .then((results) => { return results.json() })
    .catch(function (reason) {
      console.log(reason)
    })
  },

  approximativeMatches: function (keywords) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&generator=prefixsearch&gpssearch=${keywords}&gpslimit=10&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&pilimit=10&wbptterms=description&origin=*`)
      .then((results) => { return results.json() })
      .catch(function (reason) {
        console.log(reason)
      })
  }
}

export default Wikimedia
