<template>
  <div class="col-md-4 pricing-table bordered hover-animation" v-bind:class="{'deposit': calculation.deposit, 'loan': !calculation.deposit}">
    <div class="locked" v-show="!calculation.active">
      <button type="button" class="btn btn-lg btn-loan" v-on:click="activate(false)">Lägg till ränteberäkning</button>
      <br />
      <br />
      <button type="button" class="btn btn-lg btn-deposit" v-on:click="activate(true)">Lägg till sparandeberäkning</button>
    </div>
    <ul v-bind:class="{'calculation-locked': !calculation.active}">
      <li class="title">
        <span contenteditable>{{calculation.name}}</span>
      </li>
      <li class="price">
        <span class="currency-symbol"></span>
        <strong>{{ calculation.calculate().total | formatNumber }}</strong>
        <sup>kr</sup>
        <br>
        <em v-show="!calculation.deposit">i räntekostnad</em>
        <em v-show="calculation.deposit">på kontot!</em>
      </li>
      <li>
        <div class="form-group">
          <label class="control-label">
            <span v-show="!calculation.deposit">Lånebelopp</span>
            <span v-show="calculation.deposit">Startbelopp</span>
          </label>
          <div class="pull-right col-xs-7 form-control-holder">
            <div class="input-group">
              <input v-model="calculation.amount" type="text" class="form-control text-right" />
              <span class="input-group-addon">kr</span>
            </div>
          </div>
        </div>									
      </li>
      <li>
      
        <div class="form-group">
          <label class="control-label">Räntesats</label>	
          <div class="pull-right col-xs-6 form-control-holder">
            <div class="input-group">
              <input v-model.number="calculation.interest" type="number" class="form-control text-right" />
              <span class="input-group-addon">%</span>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="form-group">
          <label class="control-label">
            <span v-show="!calculation.deposit">Amortering</span>
            <span v-show="calculation.deposit">Månadsinsättning</span>
          </label>	
          <div class="pull-right col-xs-7 form-control-holder">
            <div class="input-group">
              <input v-model="calculation.installment" type="text" class="form-control text-right" />
              <span class="input-group-addon">kr</span>
            </div>
          </div>
        </div>
      </li>
						
      <li>
      
        <div class="form-group" v-show="!calculation.deposit">
          <label class="control-label">Avbetalt</label>	
          
            <div class="pull-right col-xs-7 form-control-holder">
            <span class="pull-right"><a href="">{{calculation.calculate().lastPaymentDate}}</a></span>
<!--
            <div class="input-group" v-show="showDates==true">
              <input type="text" class="form-control text-right" v-show="calculation.dateMode==2" v-on:change="calculation.mode=2;calculate(calculation)" v-on:blur="showDates=false" v-model="calculation.years">
              <input type="text" class="form-control round text-right" v-show="calculation.dateMode==1" v-on:change="calculation.mode=3;calculate(calculation)" v-on:blur="showDates=false" v-model="calculation.months">
              <div class="input-group-btn">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" ng-click="showDateModes=!showDateModes">{{modeText(calculation.dateMode)}}<span class="caret"></span></button>
                <ul role="menu" class="dropdown-menu pull-right" v-show="showDateModes">
                  <li><a href="" v-on:click="calculation.dateMode=2;showDateModes=false;">år</a></li>
                  <li><a href="" v-on:click="calculation.dateMode=1;showDateModes=false;">månader</a></li>
                </ul>
              </div>
            </div>-->
          </div>
        </div>
        
        <div class="form-group" v-show="calculation.deposit">
          <label class="control-label">Antal år</label>	
          <div class="pull-right col-xs-3 form-control-holder">
            <input type="text" v-model="calculation.years" class="form-control text-right">
          </div>
        </div>
      </li>
            

						<!--
						<li class="button" ng-show="!deposit">
							Se beräkning per år
							<a href="" ng-show="!calculation.tooLowInstallment" ng-click="calculation.showOverview=!calculation.showOverview" ng-class="{'glyphicon-chevron-down': !calculation.showOverview, 'glyphicon-chevron-up': calculation.showOverview}" class="glyphicon "></a></span>
							
							<div ng-show="calculation.showOverview && !calculation.tooLowInstallment">
								
								<div>
									<span class="Installment">(Siffra inom parantes avser kostnad inklusive amortering)</span>
									<table class="table table-condensed table-striped table-hover" style="margin-bottom:0;">
										<thead>
											<tr>
												<th style="width:10%"></th>
												<th style="width:50%" class="text-right">Årskostnad</th>
												<th style="width:40%" class="text-right">Månadskostnad</th>
											</tr>
										</thead>
									</table>
								</div>
								<div style="max-height:200px;overflow:auto;">
									
									<table class="table table-condensed table-striped table-hover">
										
										<tbody>
											<tr ng-repeat="year in calculation.result.overview">
												<td style="width:10%">{{year.id}}</td>
												<td style="width:50%" class="text-right">{{year.sum}} <span class="Installment">({{year.sumWithInstallment}})</span></td>
												<td style="width:40%" class="text-right">{{year.monthly}} <span class="Installment">({{year.monthlyWithInstallment}})</span></td>
											</tr>
										</tbody>

									</table>
								</div>
								
							</div>
							
						</li>-->
					</ul>

				</div>
</template>

<script>
export default {
  name: 'InterestCalculation',
  props: ['calculation'],
  data () {
    return {
      showDates: false
    };
  },
  methods: {
    activate (deposit) {
      this.calculation.activate(deposit);
      this.$emit('activate', { });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
