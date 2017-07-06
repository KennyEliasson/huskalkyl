<template>
  <section id="buy">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">

        <h1 class="page-header">Köp och driftskostnad</h1>

        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Bostad och prisuppgifter</h3>
          </div>
          <div class="panel-body">
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
                 <span class="help-block small clickable" v-on:click="contribution=minimumContribution">Minsta kontantinsatsen är {{minimumContribution | formatNumber }} kr</span>
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
          </div>
        </div>

        <div class="panel panel-default" v-show="valid">
          <div class="panel-heading">Boendekostnader</div>
          <div class="panel-body">
            <p>
              Med de uppgifter som matades in ovan kan du lätt se hur dina boendekostnader ser ut per månad och år.
              <br>
              Du ser även hur en förändrad ränta påverkar din ekonomi.
            </p>
            <p>Beroende på belåningsgrad så gäller olika amorteringsregler.</p>
            <dl class="dl-horizontal">
              <dt>> 85%</dt>
              <dd>De flesta banker kommer inte ge ett lån</dd>
              <dt>&gt; 70% </dt>
              <dd>Amortering med 2% per år</dd>
              <dt>&gt; 50% </dt>
              <dd>Amortering med 1% per år</dd>
              <dt>&lt; 50% </dt>
              <dd>Ingen amortering behövs</dd>
            </dl>

            <p>
              Vid nuvarande beräkning har du en belåningsgrad på <strong>{{advanceRation | formatNumber }}%</strong> och behöver därför amortera <strong>{{installmentRatePerYear*100}}%</strong> per år.
            </p>
          </div>
          <div class="table-responsive">
          <table class="table table-striped">
                      
            <thead>
            <tr>
              <th>Ränta</th>
              <th>Räntekostnad</th>
              <th>Amortering</th>
              <th>Driftskostnad</th>
              <th>Totalt</th>
              <th>Totalt per år</th>
              <th></th>
            </tr>
            </thead>

            <tbody>
              <tr v-for="(interest, index) in interests">
                <td>{{interest | formatDecimal }}%</td>
                <td>{{interestCharge(interest) | formatNumber }}</td>
                <td>{{installment | formatNumber }}</td>
                <td>{{operatingCostMonthly | formatNumber }}</td>
                <td>{{total(interest) | formatNumber}}</td>
                <td>{{total(interest)*12 | formatNumber}}</td>
                <td class="clickable" v-on:click="removeInterestCalculation(index)">Ta bort</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="100" class="form-inline">
                  <div class="input-group">
                    <input type="number" lang="en-150" class="form-control input-sm" min="0" max="100" step="0.01" v-model="newInterest" />
                    <span class="input-group-addon">%</span>
                  </div>
                  <button class="btn btn-primary btn-sm" v-on:click="addInterestCalculation">Lägg till ränteberäkning</button>
                </td>
              </tr>
            </tfoot>
          </table>
          </div>
        </div>


        <div class="panel panel-default" v-show="valid">
          <div class="panel-heading">Lagfart och pantbrev</div>
          <div class="panel-body">
            <p>
              När man köper en bostad så finns det även kostnader kring lagfart och pantbrev.
            </p>
            <dl class="dl-horizontal">
              <dt>Lagfart</dt>
              <dd>{{titleDeedCost | formatNumber }} kr<br/><small>1,5% av köpesumman eller taxeringsvärdet (värdet som är högst) + 825 kr i expeditionsavgift</small></dd>
              <dt>Pantbrev</dt>
              <dd>{{mortgageDeedCost | formatNumber }} kr<br/><small>2% av pantbrevsbeloppet. Dvs skillnaden mellan nuvarande pantbrevsbelopp och det nya pantbrevsbeloppet tas det ut en avgift på.</small></dd>
            </dl>
          </div>
         
        </div>
        
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
      interests: [1.37, 1.5, 2, 5, 7],
      newInterest: 1
    };
  },
  watch: {
    'contribution': function (val) {
      if(val > this.price)
        this.contribution = this.price;
    }
  },
  computed: {
    minimumContribution: function () {
      return this.price * 0.15;
    },
    loan: function () {
      return this.price - this.contribution;
    },
    operatingCostMonthly: function () {
      return this.operatingCost / 12;
    },
    advanceRation: function () {
      return (this.loan / this.price) * 100;
    },
    installmentRatePerYear: function () {
      if(this.advanceRation > 70)
        return 0.02;

      if(this.advanceRation > 50)
        return 0.01;

      return 0;
    },
    installment: function () {
      if(this.installmentRatePerYear > 0)
        return this.loan * this.installmentRatePerYear / 12;

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
    },
    valid: function () {
      if(this.price < 1)
        return false;

      if(this.contribution > this.price)
        return false;

      if(!this.satisfiedMinimumContribution)
        return false;

      return true;
    },
    satisfiedMinimumContribution: function () {
      return this.minimumContribution <= this.contribution;
    }
  },
  methods: {
    interestCharge: function (interest) {
      return ((this.loan * (interest)) / 100) / 12;
    },
    total: function (interest) {
      return this.interestCharge(interest) + this.installment + this.operatingCostMonthly;
    },
    addInterestCalculation: function () {
      this.interests.push(this.newInterest);
      this.interests.sort((a, b) => a - b);
    },
    removeInterestCalculation: function (index) {
      this.interests.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
