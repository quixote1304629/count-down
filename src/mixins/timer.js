export default {
  data() {
    return {
      timer: null
    }
  },
  methods: {
    setTimer(method, intervals = 1000) {
      if (this.timer == null) {
        this.timer = setInterval(method, intervals)
      }
    },
    // 清除所有定时器
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  created: function() {
    // 每次进入界面时，先清除之前的所有定时器
    this.clearTimer()
  },
  destroyed: function() {
    // 每次离开当前界面时，清除定时器
    this.clearTimer()
  }
}
