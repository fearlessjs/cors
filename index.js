const ALLOW_HEADERS = [
  'Accept',
  'Access-Control-Allow-Origin',
  'Authorization',
  'Content-Type',
  'X-HTTP-Method-Override',
  'X-Requested-With'
]

const ALLOW_METHODS = ['DELETE', 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT']

const MAX_AGE_SECONDS = 60 * 60 * 24

module.exports = (configs = {}) => options => {
  const {
    origin = '*',
    maxAge = MAX_AGE_SECONDS,
    allowMethods = ALLOW_METHODS,
    allowHeaders = ALLOW_HEADERS,
    allowCredentials = true,
    exposeHeaders = []
  } = configs

  const cors = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', origin)
    if (allowCredentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true')
    }
    if (exposeHeaders.length) {
      res.setHeader('Access-Control-Expose-Headers', exposeHeaders.join(','))
    }

    const preFlight = req.method === 'OPTIONS'
    if (preFlight) {
      res.setHeader('Access-Control-Allow-Methods', allowMethods.join(','))
      res.setHeader('Access-Control-Allow-Headers', allowHeaders.join(','))
      res.setHeader('Access-Control-Max-Age', String(maxAge))
    }
  }

  return Array.isArray(options)
    ? {
      handlers: options,
      middlewares: [cors]
    }
    : {
      ...options,
      middlewares: [...options.middleware, cors]
    }
}
