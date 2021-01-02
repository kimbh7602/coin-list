<template>
  <div v-if="ko !== '' && en !== ''" class="description-wrapper">
    <button class="description-btn"
      @click="handleClickDescriptionBtn"
    >
      설명보기 
      <object class="triangle-svg" data="/triangle.svg" type="image/svg+xml"></object>
    </button>
    <div class="description-box" v-if="isOpen">
      <div v-if="ko" v-html="ko"></div>
      <div v-if="ko === '' && en !== ''" v-html="en"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {setLoaded} from "@/store/type";
import {replace} from 'lodash';

const LINE_BREAK_REG_PATTERN = /\r\n/g; // JSON 개행 문자
const LINE_BREAK = "<br />"; // <br /> 태그로 바꿔서 v-html로 입력

export default {
    data: () => ({
      ko: '',
      en: '',
      isOpen: false,
    }),

    computed: {
      ...mapState(['coinDetail'])
    },

    methods: {
        handleClickDescriptionBtn() {
            this.isOpen = !this.isOpen;
        }
    },

    watch: {
      // coinDetail data가 바뀔 때 콜백 함수 실행 description이 있는 경우 넣어주고 없으면 그냥 공백을 넣어줌
      // JSON String 내의 개행문자 <br /> 태그로 바꿔줌
      coinDetail: function(detailData) {
        this.ko = detailData?.description?.ko ? replace(detailData?.description?.ko, LINE_BREAK_REG_PATTERN, LINE_BREAK) : '';
        this.en = detailData?.description?.en ? replace(detailData?.description?.en, LINE_BREAK_REG_PATTERN, LINE_BREAK) : '';
        this.$store.commit(setLoaded);
      }
    }
}
</script>

<style>
.description-btn {
  width: 100%;
  height: 50px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.triangle-svg {
  margin-left: 4px;
  width: 17px;
  height: 17px;
}

.description-box {
  padding-top: 20px;
  border-top: 1px solid #EAEAEA;
}
</style>