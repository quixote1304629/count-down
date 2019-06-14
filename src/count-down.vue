<template>
  <div>
    <p class="count-label" :style="labelStyle">{{ countDownLabel }}</p>
    <div v-if="countDownStatus != countDownStatusObj.OVER" class="times">
      <p class="count-time count-hours" :style="timeStyle">
        {{ (theCountDown.day * 24 + theCountDown.hours) | formatTime }}
      </p>
      <span v-if="showColon" class="colon" :style="colonStyle">:</span>
      <span v-if="showTimeName" class="timeName" :style="timeNameStyle"
      >时</span
      >
      <p class="count-time count-minute" :style="timeStyle">
        {{ theCountDown.minute | formatTime }}
      </p>
      <span v-if="showColon" class="colon" :style="colonStyle">:</span>
      <span v-if="showTimeName" class="timeName" :style="timeNameStyle"
      >分</span
      >
      <p class="count-time count-second" :style="timeStyle">
        {{ theCountDown.second | formatTime }}
      </p>
      <span v-if="showTimeName" class="timeName" :style="timeNameStyle"
      >秒</span
      >
    </div>
  </div>
</template>
<script>
import CountDown from './mixins/count-down.js'
import {COUNT_DOWN_STATUS} from './mixins/count-down.js'
export default {
  name: 'CountDown',
  mixins: [CountDown],
  props: {
    /** 提示文字style */
    labelStyle: {type: Object, require: false, default: () => {}},
    /** 时间块style */
    timeStyle: {type: Object, require: false, default: () => {}},
    /** 冒号style */
    colonStyle: {type: Object, require: false, default: () => {}},
    /** 时、分、秒 style */
    timeNameStyle: {type: Object, require: false, default: () => {}},
    /** 是否显示冒号 */
    showColon: {type: Boolean, require: false, default: true},
    /** 是否显示 时、分、秒 */
    showTimeName: {type: Boolean, require: false, default: false},
    /** 开始前状态 文字 */
    startText: {type: String, require: false, default: '距开始'},
    /** 进行中状态 文字 */
    processingText: {type: String, require: false, default: '距结束'},
    /** 结束后状态 文字 */
    endText: {type: String, require: false, default: '已结束'}
  },
  data() {
    return {
      countDownStatusObj: COUNT_DOWN_STATUS
    }
  },
  computed: {
    countDownLabel() {
      return this.countDownStatus == COUNT_DOWN_STATUS.NOT_START
        ? this.startText
        : this.countDownStatus == COUNT_DOWN_STATUS.PROCESSING
          ? this.processingText
          : this.endText
    }
  },
  filters: {
    formatTime(val) {
      if (val >= 0 && val < 10) {
        return `0${val}`
      }
      return val
    }
  }
}
</script>

<style lang="stylus" scoped>
  .count-label {
    display: inline-block;
    font-size: 12px;
    font-family: PingFangSC-Regular, sans-serif;
    font-weight: 400;
    color: #6f778b;
  }

  .times {
    display: inline-block;

    p {
      display: inline-block;
    }
  }

  .count-time {
    min-width: 19px;
    text-align: center;
    height: 17px;
    line-height: 17px;
    background: #fb4c3e;
    border-radius: 3px;
    font-size: 12px;
    font-family: PingFangSC-Regular, sans-serif;
    font-weight: 400;
    color: #fff;
  }

  .colon {
    color: #fb4c3e;
  }

  .timeName {
    font-size: 12px;
    color: #fff;
  }
</style>
