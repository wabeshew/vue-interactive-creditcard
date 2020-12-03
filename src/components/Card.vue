<template>
  <div
    class="card"
    :class="{ 'is-back' : !cardStatus }"
  >
    <div class="card-front">
      <div class="card-top">
        <div class="card-top-item">
          <div class="card_chip"><img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" alt="" class="card_chip-img"></div>
        </div>
        <div class="card-top-item">
          <div class="card_logo">
            <transition name="slide-fade-up">
              <img
                v-if="labels.cardType !== ''"
                :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + labels.cardType + '.png'"
                alt=""
                class="card_logo-img"
              />
            </transition>
          </div>
        </div>
      </div>
      <div class="card-middle">
        <div class="card-middle-item">
          <div
            class="card_number"
            :class="[labels.cardType ? `is-${labels.cardType}` : '']"
          >
            <div
              v-for="(number, index) in checkCardNumberPlaceholder()"
              :key="`key-${index}`"
              class="card_number-item"
            >
              <transition name="slide-fade-up">
                <div
                  v-if="labels.cardNumber.length > index"
                  :key="`key-${index}`"
                  class="card_number-item-inner"
                  :class="{ 'is-blank' : number === ' ' }"
                >{{labels.cardNumber[index]}}</div>
                <div
                  v-else
                  :key="`key-${index + 1}`"
                  class="card_number-item-inner"
                  :class="{ 'is-blank' : number === ' ' }"
                >{{number}}</div>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div class="card-bottom">
        <div class="card-bottom-item">
          <div class="card_name">
            <div class="card_name-label">Card Holder</div>
            <transition name="slide-fade-up">
              <div
                v-if="labels.cardName.length"
                key="input"
                class="card_name-body"
              >
                {{ labels.cardName }}
              </div>
              <div
                v-else
                key="notinput"
                class="card_name-body"
              >
                {{ placeholder.cardName }}
              </div>
            </transition>
          </div>
        </div>
        <div class="card-bottom-item">
          <div class="card_date">
            <div class="card_date-label">Expires</div>
            <div class="card_date-body">
              <div class="card_date_inner">
                <div class="card_date_inner-item">
                  <transition name="slide-fade-up">
                    <div
                      v-if="labels.cardMonth !== '00'"
                      key="selected"
                      class="card_date_inner-item-number"
                    >{{ labels.cardMonth }}</div>
                    <div
                      v-else
                      key="notselected"
                      class="card_date_inner-item-number"
                    >{{ placeholder.cardMonth }}</div>
                  </transition>
                </div>
                <div class="card_date_inner-item">/</div>
                <div class="card_date_inner-item">
                  <transition name="slide-fade-up">
                    <div
                      v-if="labels.cardYear　!== '00'"
                      key="selected"
                      class="card_date_inner-item-number"
                    >{{ labels.cardYear }}</div>
                    <div
                      v-else
                      key="notselected"
                      class="card_date_inner-item-number"
                    >{{ placeholder.cardYear }}</div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-back">
      <div class="card_ccv">
        <div class="card_ccv-label">CCV</div>
        <div class="card_ccv-body">
          <div class="card_ccv_inner">
            <div
              v-for="(number, index) in checkCardCvvPlaceholder()"
              :key="`key-${index}`"
              class="card_ccv_inner-item"
            >
              <transition name="slide-fade-up">
                <div
                  v-if="labels.cardCvv.length > index"
                  :key="`key-${index}`"
                  class="card_ccv_inner-item-number"
                >{{labels.cardCvv[index]}}</div>
                <div
                  v-else
                  :key="`key-${index + 1}`"
                  class="card_ccv_inner-item-number"
                >{{number}}</div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {
  @Prop() private labels!: {
    cardName: string,
    cardNumber: string,
    cardMonth: string,
    cardYear: string,
    cardCvv: string,
    cardType: string,
  };

  @Prop() private cardStatus!: string;

  private placeholder = {
    cardName: 'FULLNAME',
    cardNumber: '#### #### #### ####',
    cardMonth: 'MM',
    cardYear: 'YYYY',
  };

  private cardNumberPlaceholder = {
    amexCardPlaceholder: '#### ###### #####',
    dinersCardPlaceholder: '#### ###### ####',
    defaultCardPlaceholder: '#### #### #### ####',
  };

  private cardCvvPlaceholder = {
    amexCardPlaceholder: '####',
    defaultCardPlaceholder: '###',
  };

  private checkCardNumberPlaceholder() {
    switch (this.labels.cardType) {
      case 'amex':
        return this.cardNumberPlaceholder.amexCardPlaceholder;
      case 'dinersclub':
        return this.cardNumberPlaceholder.dinersCardPlaceholder;
      default:
        return this.cardNumberPlaceholder.defaultCardPlaceholder;
    }
  }

  private checkCardCvvPlaceholder() {
    switch (this.labels.cardType) {
      case 'amex':
        return this.cardCvvPlaceholder.amexCardPlaceholder;
      default:
        return this.cardCvvPlaceholder.defaultCardPlaceholder;
    }
  }
}

</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: min(100%, 400px);
  color: #fff;
  box-sizing: border-box;
  .card-top {
    display: flex;
    justify-content: space-between;
  }
  .card-middle {
    height: 20px;
    margin-top: 40px;
  }
  .card-bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  .card-front {
    padding: 25px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #67568c;
    box-shadow: 0 2px 5px #333;
    backface-visibility: hidden;
    transform: rotateY(0deg);
    transition: 1s transform;
  }
  .card-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 25px;
    border-radius: 10px;
    overflow: hidden;
    background-color: #67568c;
    box-shadow: 0 2px 5px #333;
    transform: rotateY(180deg);
    transition: 1s transform;
    backface-visibility: hidden;
  }
  &.is-back {
    .card-front {
      transform: rotateY(180deg);
    }
    .card-back {
      transform: rotateY(0deg);
    }
  }
}

.card_chip {
  height: 40px;
  .card_chip-img {
    height: 100%;
  }
}

.card_number {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  .card_number-item {
    position: relative;
    .card_number-item-inner {
      &.slide-fade-up-leave-active {
        position: absolute;
        top: 0;
        left: 0;
      }
      &.is-blank {
        width: 25px;
      }
    }
  }
}

.card_logo {
  height: 40px;
  .card_logo-img {
    height: 100%;
  }
}

.card_name {
  font-size: 14px;
  font-weight: bold;
  .card_name-label {
    font-size: 12px;
  }
  .card_name-body {
    margin-top: 6px;
    position: absolute;
  }
}

.card_date {
  font-size: 14px;
  font-weight: bold;
  .card_date-label {
    font-size: 12px;
    font-weight: bold;
  }
  .card_date-body {
    margin-top: 6px;
  }
}

.card_date_inner {
  display: flex;
  align-items: center;
  .card_date_inner-item {
    position: relative;
    .card_date_inner-item-number {
      &.slide-fade-up-leave-active {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    &:not(:first-child) {
      margin-left: 5px;
    }
  }
}

.card_ccv {
  font-size: 14px;
  .card_ccv-label {
    font-weight: bold;
    font-size: 12px;
  }
  .card_ccv-body {
    margin-top: 8px;
  }
}

.card_ccv_inner {
  display: flex;
  .card_ccv_inner-item {
    position: relative;
    .card_ccv_inner-item-number {
      &.slide-fade-up-leave-active {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
}

// transition

.slide-fade-up-enter {
  transform: translateY(10px) translateZ(10px);
  opacity: 0;
}

.slide-fade-up-enter-active {
  transition: transform 0.5s, opacity 0.3s;
}

.slide-fade-up-enter-to {
  transform: translateY(0) translateZ(10px);
  opacity: 1;
}

.slide-fade-up-leave {
  transform: translateY(0) translateZ(0);
  opacity: 1;
}

.slide-fade-up-leave-active {
  transition: transform 0.5s, opacity 0.3s;
}

.slide-fade-up-leave-to {
  transform: translateY(-10px) translateZ(0);
  opacity: 0;
}
</style>
