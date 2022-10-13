const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  Time: { type: String },
  UserSpecificId: { type: String },
  EmployeeMail: { type: String },
  EmployeeName: { type: String },
  EmployeeAccount: { type: Array },
  ExpenseDate: { type: String },
  ExpenseCategory: { type: String },
  AmountToBeRefunded: { type: Number },
  ExpenseDescription: { type: String },
  InvoiceNo: { type: String },
  VendorName: { type: String },
  EmployeeConsent: { type: String },
  PaidTo: { type: String },
  Invoice: { type: String },
  InvoiceFileName: { type: String },
  InvoiceDate: { type: String },
  EmployeeRole: { type: String },
  AdminMailId: { type: String },
  ApproverMailId: { type: String },
  IsApproved: { type: String },
  ApprovedAccount: { type: String },
  RejectedAccount: { type: String },
  RejectionReason: { type: String },
  IsFundsProcessed: { type: String },
  FundsRejectionReason: { type: String },
  createdAt: { type: String },
});

const FormData = mongoose.model("RECORD", formSchema);

module.exports = FormData;
