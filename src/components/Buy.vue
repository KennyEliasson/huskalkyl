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
                    <input type="text" class="form-control" id="price" v-model.number="price">
                    <span class="input-group-addon">kr</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">Beräkna kontantinsats</label>
                <div class="col-sm-6">
                <div class="radio">
                  <label>
                    <input type="radio" name="contributionCalculation" v-model="contributionCalculation" value="minimumContribution" v-on:change="contribution=minimumContribution">
                    15% belåningsgrad, minimum kontantinsats ({{minimumContribution | formatNumber }} kr)
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="contributionCalculation" v-model="contributionCalculation" value="lessInstallment" v-on:change="contribution=calculateContribution(0.3)">
                    70% belåningsgrad ({{calculateContribution(0.3) | formatNumber }} kr)
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="contributionCalculation" v-model="contributionCalculation" value="noNewMortgageDeeds" v-on:change="contribution=loanWithoutNewMortgageDeeds">
                    Utan att ta ut nya pantbrev ({{loanWithoutNewMortgageDeeds | formatNumber }} kr)
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="contributionCalculation" v-model="contributionCalculation" value="custom">
                    Egen summa
                  </label>
                </div>
                </div>
              </div>

              <div class="form-group">
                <label for="contribution" class="col-sm-2 control-label">Kontantinsats</label>
                <div class="col-sm-2">
                  <div class="input-group">
                    <input type="text" class="form-control" id="contribution" v-bind:disabled="contributionCalculation != 'custom'" v-model.number="contribution">
                    <span class="input-group-addon">kr</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="operatingCost" class="col-sm-2 control-label">Driftskostnad/år</label>
                <div class="col-sm-2">
                  <div class="input-group">
                    <input type="text" class="form-control" id="operatingCost" v-model.number="operatingCost">
                    <span class="input-group-addon">kr</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="assessedValue" class="col-sm-2 control-label">Taxeringsvärde</label>
                <div class="col-sm-2">
                  <div class="input-group">
                    <input type="text" class="form-control" id="assessedValue" v-model.number="assessedValue">
                    <span class="input-group-addon">kr</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="mortgageDeed" class="col-sm-2 control-label">Befintliga pantbrev</label>
                <div class="col-sm-2">
                  <div class="input-group">
                    <input type="text" class="form-control" id="mortgageDeed" v-model.number="mortgageDeed">
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
                <th>Totalt *</th>
                <th>Totalt per år *</th>
                <th></th>
              </tr>
              </thead>

              <tbody>
                <tr v-for="(interest, index) in interests">
                  <td>{{interest | formatDecimal }}%</td>
                  <td>{{interestCharge(interest) | formatNumber }}</td>
                  <td>{{installment | formatNumber }}</td>
                  <td>{{operatingCostMonthly | formatNumber }}</td>
                  <td>{{total(interest) | formatNumber}} <small>({{totalWithDeduction(interest) | formatNumber}})</small></td>
                  <td>{{total(interest)*12 | formatNumber}} <small>({{totalWithDeduction(interest)*12 | formatNumber}})</small></td>
                  <td class="clickable" v-on:click="removeInterestCalculation(index)"><button class="btn-xs btn btn-danger">Ta bort</button></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="7">
                    <small class="pull-right">* Siffran inom parentes avser kostnad efter ränteavdrag</small>

                    <div class="form-inline">
                      <div class="col-xs-2">
                        <div class="input-group">
                          <input type="number" class="form-control input-sm" lang="en-150" min="0" max="100" step="0.01" v-model="newInterest" />
                          <span class="input-group-addon">%</span>
                        </div>
                      </div>
                      <button class="btn btn-primary btn-sm" v-on:click="addInterestCalculation">Lägg till ränteberäkning</button>
                    </div>
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
      newInterest: 1,
      contributionCalculation: 'custom'
    };
  },
  watch: {
    contribution (val) {
      if(val > this.price)
        this.contribution = this.price;
    }
  },
  computed: {
    minimumContribution () {
      return this.calculateContribution(0.15);
    },
    loanWithoutNewMortgageDeeds () {
      return this.price - this.mortgageDeed;
    },
    loan () {
      return this.price - this.contribution;
    },
    operatingCostMonthly () {
      return this.operatingCost / 12;
    },
    advanceRation () {
      return (this.loan / this.price) * 100;
    },
    installmentRatePerYear () {
      if(this.advanceRation > 70)
        return 0.02;

      if(this.advanceRation > 50)
        return 0.01;

      return 0;
    },
    installment () {
      if(this.installmentRatePerYear > 0)
        return this.loan * this.installmentRatePerYear / 12;

      return 0;
    },
    mortgageDeedCost () {
      var mortgageDeedDiff = this.loan - this.mortgageDeed;
      if(mortgageDeedDiff > 0)
        return mortgageDeedDiff * 0.02;

      return 0;
    },
    titleDeedCost () {
      return 825 + (this.price * 0.015);
    },
    valid () {
      if(this.price < 1)
        return false;

      if(this.contribution > this.price)
        return false;

      if(!this.satisfiedMinimumContribution)
        return false;

      return true;
    },
    satisfiedMinimumContribution () {
      return this.minimumContribution <= this.contribution;
    }
  },
  methods: {
    interestCharge (interest) {
      return ((this.loan * (interest)) / 100) / 12;
    },
    total (interest) {
      return this.interestCharge(interest) + this.installment + this.operatingCostMonthly;
    },
    totalWithDeduction (interest) {
      return this.total(interest) * 0.7;
    },
    addInterestCalculation () {
      this.interests.push(this.newInterest);
      this.interests.sort((a, b) => a - b);
    },
    removeInterestCalculation (index) {
      this.interests.splice(index, 1);
    },
    calculateContribution (percentage) {
      if(percentage)
        return this.price * percentage;

      return this.price * 0.15;
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
