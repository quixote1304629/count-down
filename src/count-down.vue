<template>
  <div class="count-down">
    <div class="count-label" :style="labelStyle">{{ countDownLabel }}</div>
    <div v-if="countDownStatus != countDownStatusObj.OVER" class="times flex-center">
      <div class="count-time count-hours flex-center" :style="timeStyle">
        {{ (theCountDown.day * 24 + theCountDown.hours) | formatTime }}
      </div>
      <div v-if="showColon" class="colon" :style="colonStyle">:</div>
      <div v-if="showTimeName" class="timeName" :style="timeNameStyle"
      >时</div
      >
      <div class="count-time count-minute flex-center" :style="timeStyle">
        {{ theCountDown.minute | formatTime }}
      </div>
      <div v-if="showColon" class="colon" :style="colonStyle">:</div>
      <div v-if="showTimeName" class="timeName" :style="timeNameStyle"
      >分</div
      >
      <div class="count-time count-second flex-center" :style="timeStyle">
        {{ theCountDown.second | formatTime }}
      </div>
      <div v-if="showTimeName" class="timeName" :style="timeNameStyle"
      >秒</div
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
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .count-down {
    display flex;
    align-items: center;
    line-height 1;
  }

  .count-label {
    font-size: 12px;
    font-family: PingFangSC-Regular, sans-serif;
    font-weight: 400;
    color: #6f778b;
  }

  .times {
    display flex;
    margin-left 7px;

    div + div {
      margin-left: 3px;
    }
  }

  .count-time {
    padding: 0 1px;
    min-width: 16px;
    height: 16px;
    text-align: center;
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
