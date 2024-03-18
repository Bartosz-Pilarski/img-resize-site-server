const toPixelCount = (number) => {
  const num = number*1
  if(num < 1) return null
  if(num === NaN) return null
  
  return num.toFixed(0)*1
}

const supportedExtensions = ["jpg", "png", "webp", "gif", "avif", "tiff"]

const isExtensionSupported = (extension) => {
  if(supportedExtensions.includes(extension)) return extension
  return null
}

module.exports = {
  toPixelCount,
  isExtensionSupported
}