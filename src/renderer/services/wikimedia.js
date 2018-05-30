const Wikimedia = {
  search: function (keywords) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&titles=${keywords}&prop=pageimages|images|pageterms&piprop=thumbnail|original&pithumbsize=1000&pilimit=10&wbptterms=description&redirects&origin=*`)
      .then((results) => { return results.json() })
      .catch((reason) => console.log)
  },

  approximativeMatches: function (keywords) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&generator=prefixsearch&gpssearch=${keywords}&gpslimit=10&prop=pageimages|imageinfo|pageterms&piprop=thumbnail&pithumbsize=500&pilimit=10&wbptterms=description&origin=*`)
      .then((results) => { return results.json() })
      .catch((reason) => console.log)
  },

  queryImages: function (keywords) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&titles=${keywords}&prop=imageinfo&iiprop=url&origin=*`)
      .then((results) => { return results.json() })
      .catch((reason) => console.log)
  }
}

export default Wikimedia
