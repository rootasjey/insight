// ~~~~~~~~~~~~~~~~~~~~~
// wikimedia service API
// ~~~~~~~~~~~~~~~~~~~~~

const baseUrl = 'https://en.wikipedia.org/w/api.php'

const usualProps = {
  action: 'query',
  formatversion: 2,
  format: 'json',
  origin: '*'
}

const wikimediaRequest = (additionalProps) => {
  const finalProps = Object.assign({}, {...usualProps}, {...additionalProps})
  const url = `${baseUrl}?${Object.keys(finalProps).map(key => `${key}=${finalProps[key]}`).join('&')}`
  return fetch(url)
    .then(results => results.json())
    .catch(reason => console.Log(reason))
}

export default {

  search (keywords) {
    const specProps = {
      titles: `${keywords}`,
      prop: 'pageimages|images|pageterms|extracts',
      exintro: 'true',
      piprop: 'thumbnail|original',
      pithumbsize: '1000',
      pilimit: '10',
      wbptterms: 'description',
      redirects: 'true'
    }
    return wikimediaRequest(specProps)
  },

  details (pageids) {
    const specProps = {
      pageids: `${pageids}`,
      prop: 'extracts'
    }
    return wikimediaRequest(specProps)
  },

  approximativeMatches (keywords) {
    const specProps = {
      generator: 'prefixsearch',
      gpssearch: `${keywords}`,
      gpslimit: '10',
      prop: 'pageimages|imageinfo|pageterms|extracts',
      exintro: 'true',
      piprop: 'thumbnail',
      pithumbsize: '500',
      pilimit: '10',
      wbptterms: 'description'
    }
    return wikimediaRequest(specProps)
  },

  queryImages (keywords) {
    const specProps = {
      titles: `${keywords}`,
      prop: 'imageinfo',
      iiprop: 'url'
    }
    return wikimediaRequest(specProps)
  }
}
