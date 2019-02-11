const bindSelectors = (slicer, selectors) => {
  const keys = Object.keys(selectors)
  const boundMethods = {}

  keys.forEach(k => {
    boundMethods[k] = (fullState, ...args) =>
      selectors[k](slicer(fullState), ...args)
  })

  return boundMethods
}

export default bindSelectors
