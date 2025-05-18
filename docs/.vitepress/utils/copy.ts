export default function copy(content: string): void {
  const element = document.createElement('textarea')
  const curEle = document.activeElement || document.body

  element.value = content

  // Prevent keyboard from showing on mobile
  element.setAttribute('readonly', '')

  element.style.contain = 'strict'
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.fontSize = '12pt' // Prevent zooming on iOS

  const selection = document.getSelection()
  const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null

  curEle.appendChild(element)
  element.select()

  // Explicit selection workaround for iOS
  element.selectionStart = 0
  element.selectionEnd = content.length

  document.execCommand('copy')
  curEle.removeChild(element)

  if (originalRange) {
    selection.removeAllRanges() // originalRange can't be truthy when selection is falsy
    selection.addRange(originalRange)
  }
}
