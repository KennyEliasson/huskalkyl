<template>
  <section id="interest">
    <div class="container">
      <div class="row">
          <h1 class="page-header">Ränteberäkning</h1>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Räkna snabbt ut räntekostnader eller ränta på ränta</h3>
            </div>
            <div class="panel-body">
              <p>Jämför hur olika räntor, amorteringsbelopp och avbetalningshastigheter påverkar din ekonomi.</p>
              <p>Eller varför inte se hur ett månadssparande över tid växer och ger dig en rejäl skjuts i din privatekonomi.</p>
            </div>
          </div>
      </div>

      <div class="row">
				<InterestCalculationComponent v-for="loan in loans" v-bind:key="loan" v-bind:calculation="loan" v-on:activate="calculationActivated" />
      </div>

    </div>
  </section>
</template>

<script>

import InterestCalculationComponent from './InterestCalculation.vue';
import InterestCalculation from '../InterestCalculation';

export default {
  name: 'interest',
  components: { InterestCalculationComponent },
  data () {
    return {
      loans: [
        new InterestCalculation('Sparande #1')
      ]
    };
  },
  methods: {
    calculationActivated () {
      var interestCalculation = new InterestCalculation();
      interestCalculation.copy(this.loans[this.loans.length - 1]);
      this.loans.push(interestCalculation);
    }
  }
};
</script>
