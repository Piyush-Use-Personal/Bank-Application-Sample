/**
 * Created by Piyush on Thu Nov 26 2020 21:00:31 GMT+0530 (India Standard Time)
 * Loan Management - CRUD , along with the Approval Mechanism of the same
 * Updated by Piyush on Thu Nov 26 2020 21:00:31 GMT+0530 (India Standard Time)
 * Loan Management - CRUD , along with the Approval Mechanism of the same
 */

const LoanType = ['personal', 'housing', 'business', 'educational', 'gold'] // more fields
module.exports = (function LoanSchema () {
    var Schema = mongoose.Schema;
  
    var LoanSchema = new Schema({
      loanId: { type: String, trim: true, required: true },
      userId: { type: String, trim: true, required: true },
      amount: { type: String, trim: true, required: true },

      duration: { type: Number, trim: true, required: true },
      interestRate: { type: Number, trim: true, required: true },
      failedInterestRate: { type: Number, trim: true, required: true },
      noticePeriod: { type: Number, trim: true, required: true },

      prefferedPaymentMethod: { type: String, trim: true, required: true },
      guarantor: { type: String, trim: true, required: true },
      loanType: {type: String, enum : LoanType},
      ITReturn : {type: String},
      serviceLetter : {type: String},
      remark : {type: String},

      isApproved : {type: Boolean, default: false},
      isReject : {type: Boolean, default: false},
      ROR: { type: String, trim: true },
      
      createdBy: { type: String, trim: true },
      updatedBy: { type: String, trim: true },
    }, {timestamps: true} );
  
    var Loan = mongoose.model('Loan', LoanSchema);
  
    return Loan;
  })();
  