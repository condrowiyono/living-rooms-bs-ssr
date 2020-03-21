const fontResizer = (mobileOrTablet, size = '1rem') => {
  if (!mobileOrTablet) {
    return
  }
  return `font-size: ${size}`
}

export default ({ app }, inject) => {
  inject('fontResizer', fontResizer)
}
