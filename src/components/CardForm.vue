<template>
  <div class="cardform">
    <div class="cardform-card">
      <Card
        :labels="formData"
        :cardStatus="isCardFront"
      />
    </div>
    <ValidationObserver tag="form" method="POST" action="/dummy.php" v-slot="{ invalid }">
      <div class="cardform-field">
        <div class="cardform_field">
          <div class="cardform_field-row">
            <div class="cardform_field-row-column">
              <ValidationProvider
                rules="required|alpha_spaces"
                v-slot="{
                  errors,
                  classes,
                }"
              >
                <div
                  class="cardform_field_item js-cardform_field_item"
                  :class="classes"
                >
                  <label for="cardname" class="cardform_field_item-label">Card Name</label>
                  <input
                    id="cardname"
                    v-model="formData.cardName"
                    type="text"
                    class="cardform_field_item-input"
                    name="cardname"
                  >
                  <div class="cardform_field_item-error">{{ errors[0] }}</div>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <div class="cardform_field-row">
            <div class="cardform_field-row-column">
              <ValidationProvider
                :rules="{
                  required: true,
                  regex: /^[0-9\s]+$/,
                  numberMin: cardNumberMaxLength,
                }"
                v-slot="{
                  errors,
                  classes,
                }"
              >
                <div
                  class="cardform_field_item js-cardform_field_item"
                  :class="classes"
                >
                  <label for="cardnumber" class="cardform_field_item-label">Card Number</label>
                  <input
                    id="cardnumber"
                    v-model="formData.cardNumber"
                    @input="trimNumber($event)"
                    type="text"
                    class="cardform_field_item-input"
                    name="cardnumber"
                    :maxlength="cardNumberMaxLength"
                  >
                  <div class="cardform_field_item-error">{{ errors[0] }}</div>
                </div>
              </ValidationProvider>
            </div>
          </div>
          <div class="cardform_field-row">
            <div class="cardform_field-row-column">
              <div class="cardform_field_date">
                <div class="cardform_field_date-item">
                  <ValidationProvider
                    :rules="{
                      excluded: '00',
                    }"
                    v-slot="{
                      errors,
                      classes,
                    }"
                  >
                    <div
                      class="cardform_field_date_item"
                      :class="classes"
                    >
                      <label for="cardmonth" class="cardform_field_date_item-label">Month</label>
                      <select
                        id="cardmonth"
                        v-model="formData.cardMonth"
                        class="cardform_field_date_item-select"
                        name="cardmonth"
                      >
                        <option value="00">Month</option>
                        <option value="01">01</option>
                      </select>
                      <div class="cardform_field_date_item-error">{{ errors[0] }}</div>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="cardform_field_date-item">
                  <ValidationProvider
                    :rules="{
                      excluded: '00',
                    }"
                    v-slot="{
                      errors,
                      classes,
                    }"
                  >
                    <div
                      class="cardform_field_date_item"
                      :class="classes"
                    >
                      <label for="cardyear" class="cardform_field_date_item-label">Year</label>
                      <select
                        id="cardyear"
                        v-model="formData.cardYear"
                        class="cardform_field_date_item-select"
                        name="cardyear"
                      >
                        <option value="00">Year</option>
                        <option value="2020">2020</option>
                      </select>
                      <div class="cardform_field_date_item-error">{{ errors[0] }}</div>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="cardform_field-row-column">
              <ValidationProvider
                :rules="{
                  required: true,
                  regex: /^[0-9]+$/,
                  cvvMin: cardCvvMaxLength,
                }"
                v-slot="{
                  errors,
                  classes,
                }"
              >
                <div
                  class="cardform_field_item js-cardform_field_item"
                  :class="classes"
                >
                  <label for="CVV" class="cardform_field_item-label">CVV</label>
                  <input
                    id="CVV"
                    v-model="formData.cardCvv"
                    @focus="updateCardStatus(false); trimCvv($event)"
                    @input="trimCvv($event)"
                    @blur="updateCardStatus(true)"
                    type="text"
                    class="cardform_field_item-input"
                    name="cardcvv"
                    :maxlength="cardCvvMaxLength"
                  >
                  <div class="cardform_field_item-error">{{ errors[0] }}</div>
                </div>
              </ValidationProvider>
            </div>
          </div>
        </div>
      </div>
      <div class="cardform-submit">
        <button
          :disabled="invalid"
          class="cardform_submit"
          :class="{ 'is-inactive' : invalid }"
        >Submit</button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate';
import { required, alpha_spaces, min, regex, excluded } from 'vee-validate/dist/rules';
import Card from './Card.vue';

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

extend('required', {
  ...required,
  message: '必須項目です',
});

extend('numberMin', {
  ...min,
  message: 'カード番号が不正です',
});

extend('cvvMin', {
  ...min,
  message: 'セキュリティコードが不正です',
});

extend('alpha_spaces', {
  ...alpha_spaces,
  message: '英字を入力してください',
});

extend('excluded', {
  ...excluded,
  message: '必須項目です',
});

extend('regex', {
  ...regex,
  message: '半角数字を入力してください',
});

@Component({
  components: {
    Card,
    ValidationProvider,
    ValidationObserver,
  },
})
export default class CardForm extends Vue {
  @Prop({type: Object})

  private formData!: {
    cardName: string,
    cardNumber: string,
    cardMonth: string,
    cardYear: string,
    cardCvv: string,
    cardType: string,
  };

  private isCardFront: boolean = true;

  private cardNumberMaxLength: number = 16;

  private cardCvvMaxLength: number = 3;

  private company: string = '';

  get cardType(): string {
    const cardNumber: string = this.formData.cardNumber;

    if (cardNumber.match(new RegExp('^4')) != null) { return 'visa'; }

    if (cardNumber.match(new RegExp('^(34|37)')) != null) { return 'amex'; }

    if (cardNumber.match(new RegExp('^5[1-5]')) != null) { return 'mastercard'; }

    if (cardNumber.match(new RegExp('^6011')) != null) { return 'discover'; }

    if (cardNumber.match(new RegExp('^62')) != null) { return 'unionpay'; }

    if (cardNumber.match(new RegExp('^9792')) != null) { return 'troy'; }

    if (cardNumber.match(new RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}')) != null) { return 'dinersclub'; }

    if (cardNumber.match(new RegExp('^35(2[89]|[3-8])')) != null) { return 'jcb'; }

    return ''; // default type
  }

  private trimNumber(e: any): void {
      this.formData.cardNumber = e.target.value;
      const value: string = this.formData.cardNumber.replace(/\D/g, '');
      this.formData.cardType = this.cardType;
      if ((/^3[47]\d{0,13}$/).test(value)) {
        this.formData.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        this.cardNumberMaxLength = 17;
      } else if ((/^3(?:0[0-5]|[68]\d)\d{0,11}$/).test(value)) {
        this.formData.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        this.cardNumberMaxLength = 16;
      } else if ((/^\d{0,16}$/).test(value)) {
        this.formData.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        this.cardNumberMaxLength = 19;
      }
      if (e.inputType === 'deleteContentBackward') {
        const lastChar = this.formData.cardNumber.substring(this.formData.cardNumber.length, this.formData.cardNumber.length - 1);
        if (lastChar === ' ') {
          this.formData.cardNumber = this.formData.cardNumber.substring(0, this.formData.cardNumber.length - 1);
        }
      }
  }

  private trimCvv(e: any): void {
      this.formData.cardCvv = e.target.value.replace(/\D/g, '');
      if (this.cardType === 'amex') {
        this.cardCvvMaxLength = 4;
      } else {
        this.cardCvvMaxLength = 3;
      }
  }

  private updateCardStatus(status: boolean): void {
      this.isCardFront = status;
  }
}
</script>

<style lang="scss" scoped>
.cardform {
  .cardform-card {
    display: flex;
    justify-content: center;
  }
  .cardform-field {
    margin-top: 30px;
  }
  .cardform-submit {
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
}

.cardform_field {
  .cardform_field-row {
    display: flex;
    &:not(:first-child) {
      margin-top: 10px;
    }
    .cardform_field-row-column {
      flex-grow: 1;
      &:not(:first-child) {
        margin-left: 15px;
      }
    }
  }

  @media screen and (max-width: 414px) {
    .cardform_field-row {
      display: flex;
      flex-direction: column;
      .cardform_field-row-column {
        &:not(:first-child) {
          margin-top: 10px;
          margin-left: 0;
        }
      }
    }
  }
}

.cardform_field_item {
  display: flex;
  flex-direction: column;
  .cardform_field_item-label {
    font-size: 12px;
    font-weight: bold;
  }
  .cardform_field_item-input {
    width: 100%;
    height: 45px;
    margin-top: 3px;
    padding: 5px 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 18px;
  }
  .cardform_field_item-error {
    margin-top: 4px;
    color: #d7003a;
    font-size: 12px;
  }
}

.cardform_field_date {
  display: flex;
  min-width: 160px;
  .cardform_field_date-item {
    flex: 1;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
}

.cardform_field_date_item {
  display: flex;
  flex-direction: column;
  .cardform_field_date_item-label {
    font-size: 12px;
    font-weight: bold;
  }
  .cardform_field_date_item-select {
    height: 45px;
    margin-top: 3px;
    padding: 5px 26px 5px 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 18px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC);
    background-size: 12px;
    background-position: right 10px center;
    background-repeat: no-repeat;
  }
  .cardform_field_date_item-error {
    margin-top: 4px;
    color: #d7003a;
    font-size: 12px;
  }
}

.cardform_submit {
  display: flex;
  padding: 10px 30px;
  color: #fff;
  font-weight: bold;
  background-color: #00437c;
  border-radius: 5px;
  box-shadow: 0 -2px 0 inset #000d19;
  &.is-inactive {
    background-color: #ccc;
    border-radius: 5px;
    box-shadow: 0 -2px 0 inset #aaa;
  }
}
</style>

