export const retry = (promiseFn, options = {}) => {
  const { retryCount = 5, interval = 1000 } = options

  return new Promise((resolve, reject) => {
    promiseFn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retryCount === 1 || error.skipRetrying === true) {
            return reject(error)
          }

          retry(promiseFn, {
            ...options,
            retryCount: retryCount - 1
          })
            .then(resolve, reject)
        }, interval)
      })
  })
}
