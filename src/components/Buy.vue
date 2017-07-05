<template>
  <section id="buy">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="section-heading">Kostnader vid köp och drift</h1>

          <form class="form-horizontal">
            <div class="form-group">
              <label for="price" class="col-sm-2 control-label">Försäljningspris</label>
              <div class="col-sm-2">
                <div class="input-group">
                  <input type="text" class="form-control" id="price" v-model="price">
                  <span class="input-group-addon">kr</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="contribution" class="col-sm-2 control-label">Kontantinsats</label>
              <div class="col-sm-2">
                <div class="input-group">
                  <input type="text" class="form-control" id="contribution" v-model="contribution">
                  <span class="input-group-addon">kr</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="operatingCost" class="col-sm-2 control-label">Driftskostnad/år</label>
              <div class="col-sm-2">
                <div class="input-group">
                  <input type="text" class="form-control" id="operatingCost" v-model="operatingCost">
                  <span class="input-group-addon">kr</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="assessedValue" class="col-sm-2 control-label">Taxeringsvärde</label>
              <div class="col-sm-2">
                <div class="input-group">
                  <input type="text" class="form-control" id="assessedValue" v-model="assessedValue">
                  <span class="input-group-addon">kr</span>
                </div>
              </div>
            </div>


            <div class="form-group">
              <label for="mortgageDeed" class="col-sm-2 control-label">Befintliga pantbrev</label>
              <div class="col-sm-2">
                <div class="input-group">
                  <input type="text" class="form-control" id="mortgageDeed" v-model="mortgageDeed">
                  <span class="input-group-addon">kr</span>
                </div>
              </div>
            </div>
            
          </form>
                  
          <table class="table">
                      
            <thead>
            <tr>
              <th>Ränta</th>
              <th>Räntekostnad</th>
              <th>Amortering</th>
              <th>Driftskostnad</th>
              <th>Totalt</th>
              <th>Belåningsgrad</th>
            </tr>
            </thead>

            <tbody>
              <tr v-for="interest in interests">
                <td>{{interest}}%</td>
                <td>{{interestCharge(interest) | formatNumber }}</td>
                <td>{{installment | formatNumber }}</td>
                <td>{{operatingCostMonthly | formatNumber }}</td>
                <td>{{total(interest) | formatNumber}}</td>
                <td>{{advanceRation | formatNumber }}%</td>
              </tr>
            </tbody>
          </table>
        
          <dd>Kostnad för nya pantbrev</dd>
          <dt>{{mortgageDeedCost}}</dt>
          <dd>Kostnad för lagfart</dd>
          <dt>{{titleDeedCost}}</dt>
        </div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
  name: 'buy',
  data () {
    return {
      price: 4100000,
      contribution: 1520000,
      operatingCost: 24500,
      assessedValue: 0,
      mortgageDeed: 2583000,
      interests: [1.37, 1.5, 2, 5, 7]
    };
  },
  computed: {
    loan: function () {
      return this.price - this.contribution;
    },
    operatingCostMonthly: function () {
      return this.operatingCost / 12;
    },
    advanceRation: function () {
      return (this.loan / this.price) * 100;
    },
    installment: function () {
      if(this.advanceRation > 70)
        return this.loan * 0.02 / 12;

      if(this.advanceRation > 50)
        return this.loan * 0.01 / 12;

      return 0;
    },
    mortgageDeedCost: function () {
      var mortgageDeedDiff = this.loan - this.mortgageDeed;
      if(mortgageDeedDiff > 0)
        return mortgageDeedDiff * 0.02;

      return 0;
    },
    titleDeedCost: function () {
      return 825 + (this.price * 0.015);
    }
  },
  methods: {
    interestCharge: function (interest) {
      return ((this.loan * (interest)) / 100) / 12;
    },
    total: function (interest) {
      return this.interestCharge(interest) + this.installment + this.operatingCostMonthly;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
