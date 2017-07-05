<template>
    <section id="sell">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="section-heading">Kvar efter försäljning</h1>
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="sale" class="col-sm-2 control-label">Försäljningspris</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sale" v-model="sale">
                                    <span class="input-group-addon">kr</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="arvode" class="col-sm-2 control-label">Mäklararvode</label>
                            <div class="col-sm-4">
                                <div class="radio">
                                    <label><input type="radio" name="commisionOption" v-model="commisionOption" value="percentage">Fast procentsats</label>
                                </div>
                                <div class="radio">
                                    <label><input type="radio" name="commisionOption" v-model="commisionOption" value="flatFee">Fast pris + ev. provision</label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group" v-if="commisionOption == 'percentage'">
                            <label for="arvode" class="col-sm-2 control-label">Mäklararvode</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="arvode" v-model="commision">
                                    <span class="input-group-addon">%</span>
                                </div>
                            </div>
                        </div>


                        <div v-if="commisionOption == 'flatFee'">
                            <div class="form-group">
                                <label for="arvode" class="col-sm-2 control-label">Mäklararvode fast pris</label>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="flatFee" v-model.number="commisionFlatFee">
                                        <span class="input-group-addon">kr</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="arvode" class="col-sm-2 control-label">Utgångspris</label>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="startingPrice" v-model.number="startingPrice">
                                        <span class="input-group-addon">kr</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="arvode" class="col-sm-2 control-label">% av belopp över utgångspris</label>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="commisionExtraPercentage" v-model.number="commisionExtraPercentage">
                                        <span class="input-group-addon">%</span>
                                    </div>

                                </div>
                            </div>
                        </div>



                        <div class="form-group">
                            <label for="price" class="col-sm-2 control-label">Inköpspris</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="number" class="form-control" id="price" v-model="price">
                                    <span class="input-group-addon">kr</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="improve" class="col-sm-2 control-label">Förbättringsåtgärder</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="number" class="form-control" id="improve" v-model="improvement">
                                    <span class="input-group-addon">kr</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="uppskov" class="col-sm-2 control-label">Uppskov av skatt</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="number" class="form-control" id="uppskov" v-model="uppskov">
                                    <span class="input-group-addon">kr</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="loan" class="col-sm-2 control-label">Lån på bostaden</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="loan" v-model="loan">
                                    <span class="input-group-addon">kr</span>
                                </div>
                            </div>
                        </div>
                    </form>


                    <table class="table">
                        <colgroup>
                            <col span="2" style="background-color:white">
                            <col span="4" style="background-color:#eee">
                        </colgroup>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Värde nu</th>
                                <th class="negative">-25%</th>
                                <th class="negative">-10%</th>
                                <th>+10%</th>
                                <th>+25%</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Försäljningspris</td>
                                <td class="money bold" v-for="percentage in percentageRanges">{{ saleCalculation(percentage) | formatNumber }}</td>
                            </tr>
                            <tr class="no-border">
                                <td>Mäklararvode</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ -commisionCalculation(percentage) | formatNumber }}</td>
                            </tr>
                            <tr class="no-border">
                                <td>Uppskov av skatt</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ uppskov | formatNumber }}</td>
                            </tr>
                            <tr class="no-border">
                                <td>Inköpspris + förb.</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ (-(price + improvement)) | formatNumber }}</td>
                            </tr>
                            <tr>
                                <td>Reavinst/förlust</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ (capitalGain(percentage)) | formatNumber }}</td>
                            </tr>
                            <tr class="no-border">
                                <td>Skatt (22%)</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ (-tax(percentage)) | formatNumber }}</td>
                            </tr>
                            <tr>
                                <td>Pengar "i handen"</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ (moneyLeft(percentage)) | formatNumber }}</td>
                            </tr>
                            <tr class="no-border">
                                <td>Betala bort lånet</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ (-loan) | formatNumber }}</td>
                            </tr>
                            <tr>
                                <td style="border-top:2px solid #ccc"><strong>Kvar i din plånbok</strong></td>
                                <td class="money" style="border-top:2px solid #ccc" v-for="percentage in percentageRanges"><strong>{{ total(percentage) | formatNumber }}</strong></td>
                            </tr>
                            <tr class="no-border" style="font-style:italic;">
                                <td style="padding-top:40px;">Belåningsgrad</td>
                                <td class="money" style="padding-top:40px;" v-for="percentage in percentageRanges">{{ advanceRation(percentage) | formatNumber }}%</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </section>
</template>
<template>
    <section id="sell">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="section-heading">Kvar efter försäljning</h1>
                    <form class="form-horizontal">
                        <div class="form-group">
                            <label for="sale" class="col-sm-2 control-label">Försäljningspris</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="sale" v-model="sale">
                                    <span class="input-group-addon">kr</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="arvode" class="col-sm-2 control-label">Mäklararvode</label>
                            <div class="col-sm-4">
                                <div class="radio">
                                    <label>
									<input type="radio" name="commisionOption" v-model="commisionOption" value="percentage">
										Fast procentsats
								  </label>
                                </div>
                                <div class="radio">
                                    <label>
									<input type="radio" name="commisionOption" v-model="commisionOption" value="flatFee">
										Fast pris + ev. provision
								  </label>
                                </div>
                            </div>
                        </div>


                        <div class="form-group" v-if="commisionOption == 'percentage'">
                            <label for="arvode" class="col-sm-2 control-label">Mäklararvode</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="arvode" v-model="commision">
                                    <span class="input-group-addon">%</span>
                                </div>
                            </div>
                        </div>


                        <div v-if="commisionOption == 'flatFee'">
                            <div class="form-group">
                                <label for="arvode" class="col-sm-2 control-label">Mäklararvode fast pris</label>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="flatFee" v-model.number="commisionFlatFee">
                                        <span class="input-group-addon">kr</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="arvode" class="col-sm-2 control-label">Utgångspris</label>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="startingPrice" v-model.number="startingPrice">
                                        <span class="input-group-addon">kr</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="arvode" class="col-sm-2 control-label">% av belopp över utgångspris</label>
                                <div class="col-sm-2">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="commisionExtraPercentage" v-model.number="commisionExtraPercentage">
                                        <span class="input-group-addon">%</span>
                                    </div>

                                </div>
                            </div>
                        </div>



                        <div class="form-group">
                            <label for="price" class="col-sm-2 control-label">Inköpspris</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="number" class="form-control" id="price" v-model="price">
                                    <span class="input-group-addon">kr</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="improve" class="col-sm-2 control-label">Förbättringsåtgärder</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="number" class="form-control" id="improve" v-model="improvement">
                                    <span class="input-group-addon">kr</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="uppskov" class="col-sm-2 control-label">Uppskov av skatt</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="number" class="form-control" id="uppskov" v-model="uppskov">
                                    <span class="input-group-addon">kr</span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="loan" class="col-sm-2 control-label">Lån på bostaden</label>
                            <div class="col-sm-2">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="loan" v-model="loan">
                                    <span class="input-group-addon">kr</span>
                                </div>
                            </div>
                        </div>
                    </form>


                    <table class="table">
                        <colgroup>
                            <col span="2" style="background-color:white">
                            <col span="4" style="background-color:#eee">
                        </colgroup>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Värde nu</th>
                                <th class="negative">-25%</th>
                                <th class="negative">-10%</th>
                                <th>+10%</th>
                                <th>+25%</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Försäljningspris</td>
                                <td class="money bold" v-for="percentage in percentageRanges">{{ saleCalculation(percentage) | formatNumber }}</td>
                            </tr>
                            <tr class="no-border">
                                <td>Mäklararvode</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ -commisionCalculation(percentage) | formatNumber }}</td>
                            </tr>
                            <tr class="no-border">
                                <td>Uppskov av skatt</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ uppskov | formatNumber }}</td>
                            </tr>
                            <tr class="no-border">
                                <td>Inköpspris + förb.</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ (-(price + improvement)) | formatNumber }}</td>
                            </tr>
                            <tr>
                                <td>Reavinst/förlust</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ (capitalGain(percentage)) | formatNumber }}</td>
                            </tr>
                            <tr class="no-border">
                                <td>Skatt (22%)</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ (-tax(percentage)) | formatNumber }}</td>
                            </tr>
                            <tr>
                                <td>Pengar "i handen"</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ (moneyLeft(percentage)) | formatNumber }}</td>
                            </tr>
                            <tr class="no-border">
                                <td>Betala bort lånet</td>
                                <td class="money" v-for="percentage in percentageRanges">{{ (-loan) | formatNumber }}</td>
                            </tr>
                            <tr>
                                <td style="border-top:2px solid #ccc"><strong>Kvar i din plånbok</strong></td>
                                <td class="money" style="border-top:2px solid #ccc" v-for="percentage in percentageRanges"><strong>{{ total(percentage) | formatNumber }}</strong></td>
                            </tr>
                            <tr class="no-border" style="font-style:italic;">
                                <td style="padding-top:40px;">Belåningsgrad</td>
                                <td class="money" style="padding-top:40px;" v-for="percentage in percentageRanges">{{ advanceRation(percentage) | formatNumber }}%</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'sell',
  data () {
    return {
      price: 1675000,
      sale: 3450000,
      commision: 3,
      commisionFlatFee: 58000,
      commisionExtraPercentage: 6,
      startingPrice: 2475000,
      improvement: 50000,
      uppskov: 0,
      loan: 1340000,
      percentageRanges: [100, 75, 90, 110, 125],
      commisionOption: 'flatFee'
    };
  },
  methods: {
    saleCalculation: function (percentage) {
      if(!percentage)
        percentage = 100;
      return this.sale * (percentage / 100);
    },
    commisionCalculation: function (percentage) {
      if(this.commisionOption === 'percentage')
        return this.commision * (this.saleCalculation(percentage)) / 100;

      if(percentage > 0)
        return this.commisionFlatFee + (((this.saleCalculation(percentage) - this.startingPrice) * this.commisionExtraPercentage) / 100);

      return this.commisionFlatFee;
    },
    capitalGain: function (percentage) {
      return this.saleCalculation(percentage) - (this.commisionCalculation(percentage) + this.improvement + this.price) + this.uppskov;
    },
    tax: function (percentage) {
      return 0.22 * this.capitalGain(percentage);
    },
    moneyLeft: function (percentage) {
      return this.saleCalculation(percentage) - this.commisionCalculation(percentage) - this.tax(percentage);
    },
    total: function (percentage) {
      return this.moneyLeft(percentage) - this.loan;
    },
    advanceRation: function (percentage) {
      return (this.loan / this.saleCalculation(percentage)) * 100;
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
