// 禁用f12
export function forbidDebugger() {
  document.oncontextmenu = function (event) {
    event.returnValue = false;
  };
  //禁用开发者工具F12
  document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
    let e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 123) {
      e.returnValue = false;
      return false;
    }
  };
  let userAgent = navigator.userAgent;
  if (userAgent.indexOf("Firefox") > -1) {
    let checkStatus;
    let devtools = /./;
    devtools.toString = function () {
      checkStatus = "on";
    };
    setInterval(function () {
      checkStatus = "off";
      console.log(devtools);
      console.log(checkStatus);
      console.clear();
      if (checkStatus === "on") {
        let target = "";
        console.log(target)
        try {
          window.open("about:blank", (target = "_self"));
        } catch (err) {
          let a = document.createElement("button");
          a.onclick = function () {
            window.open("about:blank", (target = "_self"));
          };
          a.click();
        }
      }
    }, 200);
  } else {
    //禁用控制台
    let ConsoleManager = {
      onOpen: function () {
        alert("Console is opened");
      },
      onClose: function () {
        alert("Console is closed");
      },
      init: function () {
        let self = this;
        let x = document.createElement("div");
        let isOpening = false,
          isOpened = false;
        Object.defineProperty(x, "id", {
          get: function () {
            if (!isOpening) {
              self.onOpen();
              isOpening = true;
            }
            isOpened = true;
            return true;
          }
        });
        setInterval(function () {
          isOpened = false;
          console.info(x);
          console.clear();
          if (!isOpened && isOpening) {
            self.onClose();
            isOpening = false;
          }
        }, 200);
      }
    };
    ConsoleManager.onOpen = function () {
      //打开控制台，跳转
      let target = "";
      console.log(target)
      try {
        window.open("about:blank", (target = "_self"));
      } catch (err) {
        let a = document.createElement("button");
        a.onclick = function () {
          window.open("about:blank", (target = "_self"));
        };
        a.click();
      }
    };
    ConsoleManager.onClose = function () {
      alert("Console is closed!!!!!");
    };
    ConsoleManager.init();
  }
}
/**
 * js数学运算,直接运算会存在精度缺失
 * add 加法 MathPlus().add(a, b) = a+b
 * sub 减法 MathPlus().sub(a, b) = a-b
 * mul 乘法 MathPlus().mul(a, b) = a*b
 * div 除法 MathPlus().div(a, b) = a/b
 */
export function MathPlus() {
    return {
      add: function(a, b) {
        var c, d, e
        try {
          c = a.toString().split('.')[1].length
        } catch (f) {
          c = 0
        }
        try {
          d = b.toString().split('.')[1].length
        } catch (f) {
          d = 0
        }
        e = Math.pow(10, Math.max(c, d))
        return (this.mul(a, e) + this.mul(b, e)) / e
      },
      mul: function(a, b) {
        var c = 0
        var d = a.toString()
        var e = b.toString()
        try {
          c += d.split('.')[1].length
          // eslint-disable-next-line no-empty
        } catch (f) { }
        try {
          c += e.split('.')[1].length
          // eslint-disable-next-line no-empty
        } catch (f) { }
        return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c)
      },
      sub: function(a, b) {
        var c, d, e
        try {
          c = a.toString().split('.')[1].length
        } catch (f) {
          c = 0
        }
        try {
          d = b.toString().split('.')[1].length
        } catch (f) {
          d = 0
        }
        e = Math.pow(10, Math.max(c, d))
        return (this.mul(a, e) - this.mul(b, e)) / e
      },
      div: function(a, b) {
        var c
        var d
        var e = 0
        var f = 0
        try {
          e = a.toString().split('.')[1].length
          // eslint-disable-next-line no-empty
        } catch (g) { }
        try {
          f = b.toString().split('.')[1].length
          // eslint-disable-next-line no-empty
        } catch (g) { }
        c = Number(a.toString().replace('.', ''))
        d = Number(b.toString().replace('.', ''))
        return this.mul(c / d, Math.pow(10, f - e))
      }
    }
  }

  /**
   * 将时间字符串格式化为日期对象
   * 符合长度的字符串: 4 | 6 | 8 | 10 | 12 |14
   * 或者yyyyMMdd hhmmss日期字符串格式化为日期对象
   * @param {*} time 日期字符串 格式化为 日期对象
   */
  export function dateStrFormat(time = '') {
    time = time.trim().replace(/-/g, '').replace(/\//g, '').replace(/:/g, '').replace(/\s/g, '')
    const yy = time.substr(0, 4)
    const mm = time.substr(4, 2)
    const dd = time.substr(6, 2) || '1'
    const hh = time.substr(8, 2)
    const mi = time.substr(10, 2)
    const ss = time.substr(12, 2)
    const ms = time.substr(14, 3)
    return new Date(yy, parseInt(mm) - 1, dd, hh, mi, ss, ms)
  }
  /**
   * 左边补0
   * @param {*} target
   * @param {*} width
   * @returns
   */
  export function leftPadZero(target, width) {
    var pad = width - target.length
    if (pad > 0) {
      return (times('0', pad) + target)
    } else {
      return target
    }
  }
  /**
   * 右边补0
   * @param {*} target
   * @param {*} width
   * @returns
   */
  export function rightPadZero(target, width) {
    var pad = width - target.length
    if (pad > 0) {
      return (target + times('0', pad))
    } else {
      return target
    }
  }
  /**
   *配合addComma使用
   * @param {*} target
   * @param {*} count
   * @returns
   */
  export function times(target, count) {
    return count < 1 ? '' : new Array(count + 1).join(target)
  }
  /**
   * 将日期对象或者日期字符串格式化为指定格式的日期字符串
   * eg:  Date Object {}  => 2020-11-11 12:11:22
   *     '20201111121212' => 2020-11-11 12:12:12
   *     '2020/11/11 12:12:12' => 2020-11-11 12:12:12
   *     '2020-11-11 12:12:12' => 2020-11-11 12:12:12
   * @param {*} date  日期对象或者日期字符串
   * @param {*} format  格式化类型  默认 年份-月份-日子
   */
  export function formatDate(date, format) {
    date = date || new Date()
    if (!format) {
      format = 'yyyyMMdd'
    }
    if (typeof date === 'string') {
      date = dateStrFormat(date)
    }
    if (Object.prototype.toString.call(date) !== '[object Date]') return date

    return format.replace(
      new RegExp(/(yyyy|MM|dd|hh|mi|ss|ms)/gi),
      function(str) {
        switch (str.toLowerCase()) {
          case 'yyyy':
            return date.getFullYear()
          case 'mm':
            return leftPadZero((date.getMonth() + 1).toString(), 2)
          case 'dd':
            return leftPadZero((date.getDate()).toString(), 2)
          case 'hh':
            return leftPadZero((date.getHours()).toString(), 2)
          case 'mi':
            return leftPadZero((date.getMinutes()).toString(), 2)
          case 'ss':
            return leftPadZero((date.getSeconds()).toString(), 2)
          case 'ms':
            return leftPadZero((date.getMilliseconds()).toString(), 3)
        }
        // eslint-disable-next-line no-extra-bind
      }.bind(this)
    )
  }
  /**
   * 将带逗号的金额格式化成浮点型金额
   * @param {*} val  带逗号的金额
   */
  export function removeComma(val = '') {
    if (!val) {
      return val
    }
    // eslint-disable-next-line no-useless-escape
    return (val + '').replace(new RegExp('\,', ['g']), '')
  }

  /**
   * 将金额格式化成带逗号金额,如x,xxx,xxx.xx
   * @param {*} str 金额
   * @param {*} type
   */
  export function addComma(str, type) {
    if (!str) return str
    type = type || ''
    const strTemp = removeComma(str)
    if (isNaN(Number(strTemp))) {
      return str
    }
    str = strTemp
    var prefix = str.charAt(0)
    if (prefix === '-' || prefix === '+') {
      return prefix + addComma(str.substr(1))
    }
    let subStr = ''
    const index = str.indexOf('.')
    if (index !== -1) {
      subStr = str.substring(index)
      str = str.substring(0, index)
      subStr = rightPadZero(subStr, 3)
    } else {
      subStr = '.00'
    }
    if (str.length > 3) {
      const mod = str.length % 3
      let output = (mod > 0 ? (str.substring(0, mod)) : '')
      for (let i = 0; i < Math.floor(str.length / 3); i++) {
        if ((mod === 0) && (i === 0)) {
          output += str.substring(mod + 3 * i, mod + 3 * i + 3)
        } else {
          output += ',' + str.substring(mod + 3 * i, mod + 3 * i + 3)
        }
      }
      return (type + output + subStr)
    } else {
      return type + str + subStr
    }
  }
  /**
   * 数字金额转汉字金额
   * val为字符串类型
   */
  export function currencyToChinese(currencyDigits) {
    // Constants:
    var MAXIMUM_NUMBER = 99999999999.99
    // Predefine the radix characters and currency symbols for output:
    var CN_ZERO = '零'
    var CN_ONE = '壹'
    var CN_TWO = '贰'
    var CN_THREE = '叁'
    var CN_FOUR = '肆'
    var CN_FIVE = '伍'
    var CN_SIX = '陆'
    var CN_SEVEN = '柒'
    var CN_EIGHT = '捌'
    var CN_NINE = '玖'
    var CN_TEN = '拾'
    var CN_HUNDRED = '佰'
    var CN_THOUSAND = '仟'
    var CN_TEN_THOUSAND = '万'
    var CN_HUNDRED_MILLION = '亿'
    var CN_SYMBOL = ''
    var CN_DOLLAR = '元'
    var CN_TEN_CENT = '角'
    var CN_CENT = '分'
    var CN_INTEGER = '整'

    // Variables:
    var integral // Represent integral part of digit number.
    var decimal // Represent decimal part of digit number.
    var outputCharacters // The output result.
    var parts
    var digits, radices, bigRadices, decimals
    var zeroCount
    var i, p, d, ds
    var quotient, modulus

    // Validate input string:
    currencyDigits = currencyDigits + ''
    if (currencyDigits === '') {
      return ''
    }
    if (currencyDigits.match(/[^,.\d]/) != null) {
      return ''
    }
    if (
      currencyDigits.match(
        /^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/
      ) == null
    ) {
      return ''
    }

    // Normalize the format of input digits:
    currencyDigits = currencyDigits.replace(/,/g, '') // Remove comma delimiters.
    currencyDigits = currencyDigits.replace(/^0+/, '') // Trim zeros at the beginning.
    // Assert the number is not greater than the maximum number.
    if (Number(currencyDigits) > MAXIMUM_NUMBER) {
      return ''
    }
    currencyDigits = Number(currencyDigits) + ''
    // Process the coversion from currency digits to characters:
    // Separate integral and decimal parts before processing coversion:
    parts = currencyDigits.split('.')
    if (parts.length > 1) {
      integral = parts[0]
      decimal = parts[1]
      // Cut down redundant decimal digits that are after the second.
      decimal = decimal.substr(0, 2)
    } else {
      integral = parts[0]
      decimal = ''
    }
    // Prepare the characters corresponding to the digits:
    // eslint-disable-next-line no-array-constructor
    digits = new Array(
      CN_ZERO,
      CN_ONE,
      CN_TWO,
      CN_THREE,
      CN_FOUR,
      CN_FIVE,
      CN_SIX,
      CN_SEVEN,
      CN_EIGHT,
      CN_NINE
    )
    // eslint-disable-next-line no-array-constructor
    radices = new Array('', CN_TEN, CN_HUNDRED, CN_THOUSAND)
    // eslint-disable-next-line no-array-constructor
    bigRadices = new Array('', CN_TEN_THOUSAND, CN_HUNDRED_MILLION)
    // eslint-disable-next-line no-array-constructor
    decimals = new Array(CN_TEN_CENT, CN_CENT)
    // Start processing:
    outputCharacters = ''
    // Process integral part if it is larger than 0:
    if (Number(integral) > 0) {
      zeroCount = 0
      for (i = 0; i < integral.length; i++) {
        p = integral.length - i - 1
        d = integral.substr(i, 1)
        quotient = p / 4
        modulus = p % 4
        if (d === '0') {
          zeroCount++
        } else {
          if (zeroCount > 0) {
            outputCharacters += digits[0]
          }
          zeroCount = 0
          outputCharacters += digits[Number(d)] + radices[modulus]
        }
        if (modulus === 0 && zeroCount < 4) {
          outputCharacters += bigRadices[quotient]
        }
      }
      outputCharacters += CN_DOLLAR
    }
    // Process decimal part if there is:
    if (decimal !== '') {
      for (i = 0; i < decimal.length; i++) {
        d = decimal.substr(i, 1)
        ds = decimal.substr(-1, 1)
        if (d === 0) {
          if (ds === 0) {
            outputCharacters += ''
          } else {
            outputCharacters += digits[Number(d)]
          }
        } else {
          outputCharacters += digits[Number(d)] + decimals[i]
        }
      }
    }
    // Confirm and return the final output string:
    if (outputCharacters === '') {
      outputCharacters = CN_ZERO + CN_DOLLAR
    }
    if (decimal === '') {
      outputCharacters += CN_INTEGER
    }
    outputCharacters = CN_SYMBOL + outputCharacters
    return outputCharacters
  }