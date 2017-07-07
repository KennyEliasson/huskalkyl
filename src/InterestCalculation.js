'use strict';

export default class InterestCalculation {

  constructor (name, deposit, active) {
    this.name = name;
    this.deposit = deposit;
    this.interest = 2;
    this.amount = 10000;
    this.installment = 1000;
    this.active = active;
    this.years = 5;

    this.cachedResult = { key: '' };
  }

  copy (calculation) {
    Object.assign(this, calculation);
    this.cachedResult = { key: '' };
    this.active = false;
  }

  activate (deposit) {
    this.active = true;
    this.deposit = deposit;
  }

  cacheKey () {
    return [this.amount, this.interest, this.installment, this.years].join('_');
  }

  calculate () {
    // Create a list of every calculation later?
    if(this.cachedResult.key === this.cacheKey())
      return this.cachedResult;

    if(this.deposit)
      return this.calculateDeposit(this.interest / 100);

    return this.calculateCosts(this.interest / 100);
  }

  calculateDeposit (interest) {
    var result = this.amount;

    for(var i = 0; i < this.years * 12; i++) {
      var montlyInterestCharge = (result * interest) / 12;
      result += montlyInterestCharge + this.installment;
    }

    return { total: result, amount: this.amount, years: this.years, installment: this.installment };
  }

  calculateCosts (interest) {
    var result = { total: 0 };
    var sum = this.amount;
    var installments = this.amount / this.installment;

    if(this.installment < 100 && installments > 1000) {
      result.tooLowInstallment = true;
      result.total = ((sum * interest) / 12);
      result.lastPaymentDate = '~';
      return result;
    } else if(installments > 10000) {
      result.tooLowInstallment = true;
      result.total = '~';
      result.lastPaymentDate = '~';
      return result;
    }

    var currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1, 1);

    var payments = [];

    while(sum > 0) {
      var montlyInterestCharge = ((sum * interest) / 12);
      result.total += montlyInterestCharge;
      sum = sum - this.installment;
      payments.push({ monthlyCost: montlyInterestCharge, sum: sum, date: new Date(currentDate.getTime()) });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // result.overview = this.paymentOverview(payments, result);

    // result.total = result.total;
    result.lastDate = payments[payments.length - 1].date;
    result.lastPaymentDate = result.lastDate.toLocaleDateString();

    return result;
  }
}
