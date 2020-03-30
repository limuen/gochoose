export default {
  inserted: function(el, binding) {
    const { value } = binding
    const input = el.getElementsByTagName('input')[0]
    //  正整数
    if (value === 0) {
      input.onkeyup = input.onblur = function() {
        intFilter(input)
      }
    }
    //  正整数包含0
    if (value === 2) {
      input.onkeyup = input.onblur = function() {
        intFilter2(input)
      }
    }
    //  小数>=0
    if (value === 3) {
      input.onkeyup = input.onblur = function() {
        intFilter3(input)
      }
    }
    if (value === 1) {
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
          if (pointIndex > 0 && (newVal.length - pointIndex) > value) {
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

const intFilter2 = (input) => {
  input.value = input.value.replace(/[^\d]/g, '')
  const e = document.createEvent('HTMLEvents')
  e.initEvent('input', true, true)
  input.dispatchEvent(e)
}

const intFilter3 = (input) => {
  if (input.value.length === 1) {
    input.value = input.value.replace(/[^0-9]/g, '')
  } else {
    input.value = input.value.replace(/[^\d\.]/g, '')
  }
  const e = document.createEvent('HTMLEvents')
  e.initEvent('input', true, true)
  input.dispatchEvent(e)
}
