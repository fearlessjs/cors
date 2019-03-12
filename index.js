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

module.exports = (
  options = {
    allowCredentials: true,
    allowHeaders: ALLOW_HEADERS,
    allowMethods: ALLOW_METHODS,
    exposeHeaders: [''],
    maxAge: MAX_AGE_SECONDS,
    origin: '*'
  }
) => handlers =>
  Array.isArray(handlers)
    ? {
      cors: options,
      handlers
    }
    : { cors: options, ...handlers }
