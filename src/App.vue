<template>
  <div class="wrap">
    <CardForm :formData="formData" />
  </div>
</template>

<script lang="ts">
import 'destyle.css';
import { Component, Vue } from 'vue-property-decorator';
import CardForm from './components/CardForm.vue';

@Component({
  components: {
    CardForm,
  },
})
export default class App extends Vue {
  private formData = {
    cardName: '',
    cardNumber: '',
    cardNumberTrim: '',
    cardMonth: '00',
    cardYear: '00',
    cardCvv: '',
    cardType: '',
  };
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato');

.wrap {
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f4ef;
  letter-spacing: 2px;
  font-family: 'Lato', sans-serif;
}
</style>
