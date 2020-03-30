export default {
  update: function(el, binding) {
    const { value } = binding
    const input = el.getElementsByTagName('input')[0]
    input.onkeyup = input.onblur = () => {}
    if (value === 0) {
      const val = input.value.toString()
      var pointIndex = val.indexOf('.')
      if (pointIndex > -1) {
        input.value = val.substr(0, pointIndex)
      }
      input.onkeyup = input.onblur = function() {
        intFilter(input)
      }
    } else {
      el.addEventListener('keypress', function(e) {
        e = e || window.event
        const charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
        const re = /\d/
        if (charcode === 46) {
          if (input.value.includes('.')) {
            e.preventDefault()
          }
          return
        } else if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
          if (e.preventDefault) {
            e.preventDefault()
          } else {
            e.returnValue = false
          }
        } else if (input.value) {
          const newVal = input.value.toString()
          var pointIndex = newVal.indexOf('.')
          if (pointIndex > 0 && (newVal.length - pointIndex) > binding.value) {
            if (e.preventDefault) {
              e.preventDefault()
            } else {
              e.returnValue = false
            }
          }
        }
      })
    }
  }
}

const intFilter = (input) => {
  if (input.value.length === 1) {
    input.value = input.value.replace(/[^1-9]/g, '')
  } else {
    input.value = input.value.replace(/[^\d]/g, '')
  }
  const e = document.createEvent('HTMLEvents')
  e.initEvent('input', true, true)
  input.dispatchEvent(e)
}
