import timer from './timer.js'

// 倒计时状态 0: 未开始;1: 进行中;2: 已结束
export const COUNT_DOWN_STATUS = {
  NOT_START: 0,
  PROCESSING: 1,
  OVER: 2
}

export default {
  mixins: [timer],
  props: {
    /** 组件标记，可在列表中灵活传递*/
    sign: {type: [Number, String, Object], require: false, default: -1},
    /** 当前时间*/
    now: {type: Number, require: false, default: null},
    /** 开始时间*/
    start: {type: Number, require: true, default: 0},
    /** 结束时间*/
    end: {type: Number, require: true, default: 0},
    /** 提醒节点(在开始前)[ms], 数值>=1000*/
    remindBeforeStart: {type: Array, require: false, default: () => []},
    /** 提醒节点(进行中)[ms], 数值>=1000*/
    remindProcessing: {type: Array, require: false, default: () => []}
  },
  data() {
    return {
      // 当前倒计时状态.
      countDownStatus: COUNT_DOWN_STATUS.NOT_START,
      theTime: {
        now: this.now || new Date().getTime(),
        start: this.start,
        end: this.end
      },
      // 倒计时数据(页面展示使用)
      theCountDown: {
        day: 0,
        hours: 0,
        minute: 0,
        second: 0
      }
    }
  },
  computed: {},
  methods: {
    /** 初始化 */
    initCountDown() {
      let checkRes = this.checkTime()
      if (!checkRes) {
        return
      }
      this.calcCountDown()
      if (this.now < this.end) {
        this.setTimer(this.timedTask(), 1000)
      }
    },
    /** 校验时间 */
    checkTime() {
      if (this.start >= this.end) {
        console.error('Start time cannot be less than end time')
        return false
      }
      return true
    },
    /** 计算出倒计时间 */
    calcCountDown() {
      this.countDownStatus =
        this.theTime.now < this.theTime.start
          ? COUNT_DOWN_STATUS.NOT_START
          : this.theTime.now >= this.theTime.start &&
            this.theTime.now < this.theTime.end
            ? COUNT_DOWN_STATUS.PROCESSING
            : COUNT_DOWN_STATUS.OVER
      // 开始时通知, 为避免重复,判断时加 star+1000 >= now > start
      if (
        this.countDownStatus == COUNT_DOWN_STATUS.PROCESSING &&
        this.theTime.now < this.theTime.start + 1000
      ) {
        /** 开始时通知*/
        this.$emit('start', this.sign)
      }
      // 结束时通知
      if (this.countDownStatus == COUNT_DOWN_STATUS.OVER) {
        this.clearTimer()
        /** 结束时通知*/
        this.$emit('end', this.sign)
        return
      }
      let endTime =
        this.countDownStatus == COUNT_DOWN_STATUS.NOT_START
          ? this.theTime.start
          : this.countDownStatus == COUNT_DOWN_STATUS.PROCESSING
            ? this.theTime.end
            : null
      let diffTime = endTime - this.theTime.now
      this.theCountDown.day = Math.floor(diffTime / 86400000)
      this.theCountDown.hours = Math.floor((diffTime % 86400000) / 3600000)
      this.theCountDown.minute = Math.floor((diffTime % 3600000) / 60000)
      this.theCountDown.second = Math.floor((diffTime % 60000) / 1000)

      // 判断提醒时间点
      this.judgeRemind(this.countDownStatus, diffTime)
    },
    /** 判断是否到达提醒时间点:
     *  status: 倒计时状态;
     *  diffTime: 剩余时间;
     * */
    judgeRemind(status, diffTime) {
      if (status == COUNT_DOWN_STATUS.NOT_START) {
        this.remindBeforeStart.forEach((rt, i) => {
          if (diffTime <= rt && diffTime > rt - 1000) {
            /** 开始前提醒通知-参数1为提醒节点的索引*/
            this.$emit('remindBeforeStart', i)
          }
        })
      }
      if (status == COUNT_DOWN_STATUS.PROCESSING) {
        this.remindProcessing.forEach((rt, i) => {
          if (diffTime <= rt && diffTime > rt - 1000) {
            /** 进行中提醒通知-参数1为提醒节点的索引*/
            this.$emit('remindProcessing', i)
          }
        })
      }
    },
    /** 定时任务 */
    timedTask() {
      return () => {
        this.theTime.now += 1000
        this.calcCountDown()
      }
    }
  },
  created() {
    this.initCountDown()
  },
  destroyed() {}
}
