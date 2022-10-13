const express = require("express");
let nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const creds = require("./credential.json");

let app = express();

const path = require("path");

app.use(express.static(path.join(__dirname + "/public")));

// PATH CONFIGURATION TO RESPOND TO A REQUEST TO STATIC ROUTE REQUEST BY SERVING index.html
// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "/public", "index.html"));
// });

app.use(bodyParser.json({ limit: "500mb" }));

app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

app.use(require("./router/form"));

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: creds.auth.user,
    pass: creds.auth.pass,
  },
});

const emailTemplate = (
  name,
  time,
  email,
  userId,
  expenseDate,
  expenseItem,
  refundAmount,
  invoiceDate,
  message,
  invoiceNo,
  vendorName,
  consent,
  paidTo
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New email template 2021-02-21</title> <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">#outlook a {    padding:0;}.ExternalClass { width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {  line-height:100%;}.es-button {  mso-style-priority:100!important;   text-decoration:none!important;}a[x-apple-data-detectors] { color:inherit!important;    text-decoration:none!important; font-size:inherit!important;    font-family:inherit!important;  font-weight:inherit!important;  line-height:inherit!important;}.es-desk-hidden {    display:none;   float:left; overflow:hidden;    width:0;    max-height:0;   line-height:0;  mso-hide:all;}@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 20px 10px 20px!important } }</style></head>
  <body>

    <div style='margin: 20px auto;
    max-width: 90vw;
    width: 640px;
    padding:15px;
    background-color: rgb(242, 236, 233);
    -webkit-box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;'>
      <div>
      <div style='display: block; text-align:center'>
        <img src="https://firebasestorage.googleapis.com/v0/b/login-firebase-7ae28.appspot.com/o/mindera-symbol.png?alt=media&token=4392cd02-7e74-48f7-87f2-8ade4f62a5b0" style=' height: 80px;
    margin-bottom: 20px;
    object-fit: cover;'/>
        </div>
        <div style='text-align: center'>
        <img src = 'https://firebasestorage.googleapis.com/v0/b/login-firebase-7ae28.appspot.com/o/mindera-logo-2.png?alt=media&token=de234faf-de4a-4681-b761-e1adca98eedf' style='display: inline-block;
    height: 50px;
    width: auto;
    margin-bottom: 30px;'/>
      </div>
      <div>
        <hr style='background-color: #000000; height: 3px; margin-top:-15px'/>
      </div>

    <p style='margin-top:10px'>Hi <b>${name}</b>,</p>

    <p style='margin-top:10px'>Thank you for filling the Reimbursement Form.</p>

    <p style='margin-top:10px'>Right now your responses are awaiting approval.</p>
    
    <p style='margin-top:10px'>Please Find the attached document for the Reimbursement Proof.</p>
   
    <p style='margin-top:10px'>Here is the transcript of the details of your expense -</p>
   
    <p style='margin-top:10px'>Time : ${time}</p>
    
    <p style='margin-top:10px'>Employee Mail Id : ${email}</p>
   
    <p style='margin-top:10px'>Employee Id : ${userId}</p>
    
    <p style='margin-top:10px'>Expense Date : ${expenseDate}</p>
    
    <p style='margin-top:10px'>Expense Category : ${expenseItem}</p>
    
    <p style='margin-top:10px'>Amount : ${refundAmount}</p>

    <p style='margin-top:10px'>Invoice Date : ${invoiceDate}</p>
    
    <p style='margin-top:10px'>Expense Description : ${message}</p>
    
    <p style='margin-top:10px'>Invoice No : ${invoiceNo}</p>

    <p style='margin-top:10px'>Vendor Name : ${vendorName}</p>
    
   <p style='margin-top:10px'>Employee Consent : ${consent}<p>
    
  <p style='margin-top:10px'>Paid to : ${paidTo}</p>
  <br/>
  <div>
  </div>
  </body>
  `;
};

const approvalEmailTemplate = (
  name,
  time,
  email,
  userId,
  account,
  expenseDate,
  expenseItem,
  refundAmount,
  invoiceDate,
  message,
  invoiceNo,
  vendorName,
  consent,
  paidTo
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New email template 2021-02-21</title> <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">#outlook a {    padding:0;}.ExternalClass { width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {  line-height:100%;}.es-button {  mso-style-priority:100!important;   text-decoration:none!important;}a[x-apple-data-detectors] { color:inherit!important;    text-decoration:none!important; font-size:inherit!important;    font-family:inherit!important;  font-weight:inherit!important;  line-height:inherit!important;}.es-desk-hidden {    display:none;   float:left; overflow:hidden;    width:0;    max-height:0;   line-height:0;  mso-hide:all;}@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 20px 10px 20px!important } }</style></head>
  <body>

    <div style='margin: 20px auto;
    max-width: 90vw;
    width: 640px;
    padding:15px;
    background-color: #bbff99;
    -webkit-box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;'>
      <div>
      <div style='display: block; text-align:center'>
        <img src="https://firebasestorage.googleapis.com/v0/b/login-firebase-7ae28.appspot.com/o/mindera-symbol.png?alt=media&token=4392cd02-7e74-48f7-87f2-8ade4f62a5b0" style=' height: 80px;
    margin-bottom: 20px;
    object-fit: cover;'/>
        </div>
        <div style='text-align: center'>
        <img src = 'https://firebasestorage.googleapis.com/v0/b/login-firebase-7ae28.appspot.com/o/mindera-logo-2.png?alt=media&token=de234faf-de4a-4681-b761-e1adca98eedf' style='display: inline-block;
    height: 50px;
    width: auto;
    margin-bottom: 30px;'/>
      </div>
      <div>
        <hr style='background-color: #000000; height: 3px; margin-top:-15px'/>
      </div>

    <p style='margin-top:10px'>Hi <b>${name}</b>,</p>

    <p style='margin-top:10px'>Thank you for filling the Reimbursement Form.</p>
    
    <p style='margin-top:10px'>Your form is approved for Reimbursement.</p>
   
    <p style='margin-top:10px'>Here is the transcript of the details of your expense -</p>
   
    <p style='margin-top:10px'>Time of Approval : ${time}</p>
    
    <p style='margin-top:10px'>Employee Mail Id : ${email}</p>
   
    <p style='margin-top:10px'>Employee Id : ${userId}</p>

    <p style='margin-top:10px'>Approved Account : ${account}</p>
    
    <p style='margin-top:10px'>Expense Date : ${expenseDate}</p>
    
    <p style='margin-top:10px'>Expense Category : ${expenseItem}</p>
    
    <p style='margin-top:10px'>Amount : ${refundAmount}</p>

    <p style='margin-top:10px'>Invoice Date : ${invoiceDate}</p>
    
    <p style='margin-top:10px'>Expense Description : ${message}</p>
    
    <p style='margin-top:10px'>Invoice No : ${invoiceNo}</p>

    <p style='margin-top:10px'>Vendor Name : ${vendorName}</p>
    
   <p style='margin-top:10px'>Employee Consent : ${consent}<p>
    
  <p style='margin-top:10px'>Paid to : ${paidTo}</p>
  <br/>
  <div>
  </div>
  </body>
  `;
};

const rejectedEmailTemplate = (
  name,
  time,
  email,
  rejectionText,
  userId,
  account,
  expenseDate,
  expenseItem,
  refundAmount,
  invoiceDate,
  message,
  invoiceNo,
  vendorName,
  consent,
  paidTo
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New email template 2021-02-21</title> <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">#outlook a {    padding:0;}.ExternalClass { width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {  line-height:100%;}.es-button {  mso-style-priority:100!important;   text-decoration:none!important;}a[x-apple-data-detectors] { color:inherit!important;    text-decoration:none!important; font-size:inherit!important;    font-family:inherit!important;  font-weight:inherit!important;  line-height:inherit!important;}.es-desk-hidden {    display:none;   float:left; overflow:hidden;    width:0;    max-height:0;   line-height:0;  mso-hide:all;}@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 20px 10px 20px!important } }</style></head>
  <body>

    <div style='margin: 20px auto;
    max-width: 90vw;
    width: 640px;
    padding:15px;
    background-color: #fff2cc;
    -webkit-box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;'>
      <div>
      <div style='display: block; text-align:center'>
        <img src="https://firebasestorage.googleapis.com/v0/b/login-firebase-7ae28.appspot.com/o/mindera-symbol.png?alt=media&token=4392cd02-7e74-48f7-87f2-8ade4f62a5b0" style=' height: 80px;
    margin-bottom: 20px;
    object-fit: cover;'/>
        </div>
        <div style='text-align: center'>
        <img src = 'https://firebasestorage.googleapis.com/v0/b/login-firebase-7ae28.appspot.com/o/mindera-logo-2.png?alt=media&token=de234faf-de4a-4681-b761-e1adca98eedf' style='display: inline-block;
    height: 50px;
    width: auto;
    margin-bottom: 30px;'/>
      </div>
      <div>
        <hr style='background-color: #000000; height: 3px; margin-top:-15px'/>
      </div>
    <p style='margin-top:10px'>Hi <b>${name}</b>,</p>

    <p style='margin-top:10px'>Thank you for filling the Reimbursement Form.</p>
    
    <p style='margin-top:10px'>We are Sorry your form is rejected for Reimbursement.</p>
   
    <p style='margin-top:10px'>Here is the transcript of the details of your expense -</p>
   
    <p style='margin-top:10px'>Time of Rejection : ${time}</p>

    <p style='margin-top:10px'>Employee Mail Id : ${email}</p>

    <p style='margin-top:10px'><b>Rejection Reason: ${rejectionText}</b></p>
   
    <p style='margin-top:10px'>Employee Id : ${userId}</p>

    <p style='margin-top:10px'> Rejected Account : ${account}</p>
    
    <p style='margin-top:10px'>Expense Date : ${expenseDate}</p>
    
    <p style='margin-top:10px'>Expense Category : ${expenseItem}</p>
    
    <p style='margin-top:10px'>Amount : ${refundAmount}</p>
    
    <p style='margin-top:10px'>Invoice Date : ${invoiceDate}</p>

    <p style='margin-top:10px'>Expense Description : ${message}</p>
    
    <p style='margin-top:10px'>Invoice No : ${invoiceNo}</p>

    <p style='margin-top:10px'>Vendor Name : ${vendorName}</p>
    
   <p style='margin-top:10px'>Employee Consent : ${consent}<p>
    
  <p style='margin-top:10px'>Paid to : ${paidTo}</p>
  <br/>
  <div>
  </div>
  </body>
  `;
};

const fundsProcessedEmailTemplate = (
  name,
  time,
  email,
  userId,
  account,
  expenseDate,
  expenseItem,
  refundAmount,
  invoiceDate,
  message,
  invoiceNo,
  vendorName,
  consent,
  paidTo
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New email template 2021-02-21</title> <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">#outlook a {    padding:0;}.ExternalClass { width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {  line-height:100%;}.es-button {  mso-style-priority:100!important;   text-decoration:none!important;}a[x-apple-data-detectors] { color:inherit!important;    text-decoration:none!important; font-size:inherit!important;    font-family:inherit!important;  font-weight:inherit!important;  line-height:inherit!important;}.es-desk-hidden {    display:none;   float:left; overflow:hidden;    width:0;    max-height:0;   line-height:0;  mso-hide:all;}@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 20px 10px 20px!important } }</style></head>
  <body>

    <div style='margin: 20px auto;
    max-width: 90vw;
    width: 640px;
    padding:15px;
    background-color: #FFFF14;
    -webkit-box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;'>
      <div>
      <div style='display: block; text-align:center'>
        <img src="https://firebasestorage.googleapis.com/v0/b/login-firebase-7ae28.appspot.com/o/mindera-symbol.png?alt=media&token=4392cd02-7e74-48f7-87f2-8ade4f62a5b0" style=' height: 80px;
    margin-bottom: 20px;
    object-fit: cover;'/>
        </div>
        <div style='text-align: center'>
        <img src = 'https://firebasestorage.googleapis.com/v0/b/login-firebase-7ae28.appspot.com/o/mindera-logo-2.png?alt=media&token=de234faf-de4a-4681-b761-e1adca98eedf' style='display: inline-block;
    height: 50px;
    width: auto;
    margin-bottom: 30px;'/>
      </div>
      <div>
        <hr style='background-color: #000000; height: 3px; margin-top:-15px'/>
      </div>
    <p style='margin-top:10px'>Hi <b>${name}</b>,</p>

    <p style='margin-top:10px'>Thank you for filling the Reimbursement Form.</p>
    
    <p style='margin-top:10px'>The Funds have been processed for you Reimbursement Form.</p>
   
    <p style='margin-top:10px'>Here is the transcript of the details of your expense -</p>
   
    <p style='margin-top:10px'>Time of Processing : ${time}</p>

    <p style='margin-top:10px'>Employee Mail Id : ${email}</p>
   
    <p style='margin-top:10px'>Approved Account : ${account}</p>

    <p style='margin-top:10px'>Employee Id : ${userId}</p>
    
    <p style='margin-top:10px'>Expense Date : ${expenseDate}</p>
    
    <p style='margin-top:10px'>Expense Category : ${expenseItem}</p>
    
    <p style='margin-top:10px'>Amount : ${refundAmount}</p>

    <p style='margin-top:10px'>Invoice Date : ${invoiceDate}</p>
    
    <p style='margin-top:10px'>Expense Description : ${message}</p>
    
    <p style='margin-top:10px'>Invoice No : ${invoiceNo}</p>

    <p style='margin-top:10px'>Vendor Name : ${vendorName}</p>
    
   <p style='margin-top:10px'>Employee Consent : ${consent}<p>
    
  <p style='margin-top:10px'>Paid to : ${paidTo}</p>
  <br/>
  <div>
  </div>
  </body>
  `;
};

const fundsRejectedEmailTemplate = (
  name,
  time,
  email,
  rejectionText,
  userId,
  account,
  expenseDate,
  expenseItem,
  refundAmount,
  invoiceDate,
  message,
  invoiceNo,
  vendorName,
  consent,
  paidTo
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New email template 2021-02-21</title> <!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><style type="text/css">#outlook a {    padding:0;}.ExternalClass { width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {  line-height:100%;}.es-button {  mso-style-priority:100!important;   text-decoration:none!important;}a[x-apple-data-detectors] { color:inherit!important;    text-decoration:none!important; font-size:inherit!important;    font-family:inherit!important;  font-weight:inherit!important;  line-height:inherit!important;}.es-desk-hidden {    display:none;   float:left; overflow:hidden;    width:0;    max-height:0;   line-height:0;  mso-hide:all;}@media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 20px 10px 20px!important } }</style></head>
  <body>

    <div style='margin: 20px auto;
    max-width: 90vw;
    width: 640px;
    padding:15px;
    background-color: #cccccc;
    -webkit-box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;'>
      <div>
      <div style='display: block; text-align:center'>
        <img src="https://firebasestorage.googleapis.com/v0/b/login-firebase-7ae28.appspot.com/o/mindera-symbol.png?alt=media&token=4392cd02-7e74-48f7-87f2-8ade4f62a5b0" style=' height: 80px;
    margin-bottom: 20px;
    object-fit: cover;'/>
        </div>
        <div style='text-align: center'>
        <img src = 'https://firebasestorage.googleapis.com/v0/b/login-firebase-7ae28.appspot.com/o/mindera-logo-2.png?alt=media&token=de234faf-de4a-4681-b761-e1adca98eedf' style='display: inline-block;
    height: 50px;
    width: auto;
    margin-bottom: 30px;'/>
      </div>
      <div>
        <hr style='background-color: #000000; height: 3px; margin-top:-15px'/>
      </div>
    <p style='margin-top:10px'>Hi <b>${name}</b>,</p>

    <p style='margin-top:10px'>Thank you for filling the Reimbursement Form.</p>
    
    <p style='margin-top:10px'>The Funds have been rejected for you Reimbursement Form.</p>
   
    <p style='margin-top:10px'>Here is the transcript of the details of your expense -</p>
   
    <p style='margin-top:10px'>Time of Processing : ${time}</p>

    <p style='margin-top:10px'>Employee Mail Id : ${email}</p>

    <p style='margin-top:10px'><b>Funds Rejection Reason: ${rejectionText}</b></p>
   
    <p style='margin-top:10px'>Employee Id : ${userId}</p>

    <p style='margin-top:10px'>Approved Account : ${account}</p>
    
    <p style='margin-top:10px'>Expense Date : ${expenseDate}</p>
    
    <p style='margin-top:10px'>Expense Category : ${expenseItem}</p>
    
    <p style='margin-top:10px'>Amount : ${refundAmount}</p>

    <p style='margin-top:10px'>Invoice Date : ${invoiceDate}</p>
    
    <p style='margin-top:10px'>Expense Description : ${message}</p>
    
    <p style='margin-top:10px'>Invoice No : ${invoiceNo}</p>

    <p style='margin-top:10px'>Vendor Name: ${vendorName}</p>
    
   <p style='margin-top:10px'>Employee Consent : ${consent}<p>
    
  <p style='margin-top:10px'>Paid to : ${paidTo}</p>
  <br/>
  <div>
  </div>
  </body>
  `;
};

app.post("/mail", (req, res) => {
  var name = req.body.employeeTitle;
  var time = new Date().toLocaleString();
  var email = req.body.employeeMail;
  var userID = req.body.id;
  var message = req.body.description;
  var subject = "Reimbursement-Details";
  var consent = req.body.employee_consent;
  var expenseDate = req.body.date;

  var refundAmount = req.body.amount;
  var invoiceDate = req.body.invoiceDate;
  var invoiceNo = req.body.invoice;
  var vendorName = req.body.vendorCategory;
  var expenseItem = req.body.expenseCategory;

  var paidTo = req.body.emailId;
  var fileLink = req.body.pdfFile;
  var approverMailId = req.body.approverMailId;

  const mailOptions = {
    from: creds.auth.user,
    to: email,
    cc: approverMailId,
    subject: subject,

    html: emailTemplate(
      (name = name),
      (time = time),
      (email = email),
      (userID = userID),
      (expenseDate = expenseDate),
      (expenseItem = expenseItem),
      (refundAmount = refundAmount),
      (invoiceDate = invoiceDate),
      (message = message),
      (invoiceNo = invoiceNo),
      (vendorName = vendorName),
      (consent = consent),
      (paidTo = paidTo)
    ),
    attachments: [
      {
        filename: "Proof of Reimbursement",
        // content: fileLink.split("base64,")[1],
        // cid: `${fileLink}`, //same cid value as in the html img src
        path: fileLink,
      },
    ],
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({
        status: err,
      });
      console.log(err);
    } else {
      res.json({
        status: "success",
      });
      console.log("Responses Email Sent");
    }
  });
});

app.post("/approvalMail", (req, res) => {
  var subject = "Reimbursement-Approval";
  var name = req.body.approvedEmployeeName;
  var time = new Date().toLocaleString();
  var email = req.body.approvedEmailAddress;

  var userID = req.body.approvedEmployeeId;
  var account = req.body.approvedAccount;
  var expenseDate = req.body.approvedDate;
  var expenseItem = req.body.approvedExpenseCategory;
  var refundAmount = req.body.approvedAmount;
  var invoiceDate = req.body.approvedInvoiceDate;
  var message = req.body.approvedDescription;
  var invoiceNo = req.body.approvedInvoiceNo;
  var vendorName = req.body.approvedVendor;
  var consent = req.body.approvedConsent;
  var paidTo = req.body.approvedPaidTo;
  var fileLink = req.body.approvedFileLink;
  var approverMailId = req.body.approverMailId;
  var adminMailId = req.body.adminMailId;
  const approvalMailOptions = {
    from: creds.auth.user,
    to: email,
    cc: adminMailId,
    bcc: approverMailId,
    subject: subject,

    html: approvalEmailTemplate(
      (name = name),
      (time = time),
      (email = email),
      (userID = userID),
      (account = account),
      (expenseDate = expenseDate),
      (expenseItem = expenseItem),
      (refundAmount = refundAmount),
      (invoiceDate = invoiceDate),
      (message = message),
      (invoiceNo = invoiceNo),
      (vendorName = vendorName),
      (consent = consent),
      (paidTo = paidTo)
    ),

    attachments: [
      {
        filename: "Approved-Proof of Reimbursement",
        // content: fileLink.split("base64,")[1],
        // cid: `${fileLink}`, //same cid value as in the html img src
        path: fileLink,
      },
    ],
  };

  transporter.sendMail(approvalMailOptions, (err, data) => {
    if (err) {
      res.json({
        status: err,
      });
      console.log(err);
    } else {
      res.json({
        status: "success",
      });
      console.log("Approval Email Sent");
    }
  });
});

app.post("/rejectionMail", (req, res) => {
  var subject = "Reimbursement-Rejected";
  var name = req.body.rejectedEmployeeName;
  var time = new Date().toLocaleString();
  var email = req.body.rejectedEmailAddress;
  var rejectionText = req.body.rejectedReason;
  var userID = req.body.rejectedEmployeeId;
  var account = req.body.rejectedAccount;
  var expenseDate = req.body.rejectedDate;
  var expenseItem = req.body.rejectedExpenseCategory;
  var refundAmount = req.body.rejectedAmount;
  var invoiceDate = req.body.rejectedInvoiceDate;
  var message = req.body.rejectedDescription;
  var invoiceNo = req.body.rejectedInvoiceNo;
  var vendorName = req.body.rejectedVendor;
  var consent = req.body.rejectedConsent;
  var paidTo = req.body.rejectedPaidTo;
  var fileLink = req.body.rejectedFileLink;
  var approverMailId = req.body.approverMailId;
  var adminMailId = req.body.adminMailId;

  const rejectedMailOptions = {
    from: creds.auth.user,
    to: email,
    cc: adminMailId,
    bcc: approverMailId,
    subject: subject,

    html: rejectedEmailTemplate(
      (name = name),
      (time = time),
      (email = email),
      (rejectionText = rejectionText),
      (userID = userID),
      (account = account),
      (expenseDate = expenseDate),
      (expenseItem = expenseItem),
      (refundAmount = refundAmount),
      (invoiceDate = invoiceDate),
      (message = message),
      (invoiceNo = invoiceNo),
      (vendorName = vendorName),
      (consent = consent),
      (paidTo = paidTo)
    ),

    attachments: [
      {
        filename: "Rejected-Proof of Reimbursement",
        // content: fileLink.split("base64,")[1],
        // cid: `${fileLink}`, //same cid value as in the html img src
        path: fileLink,
      },
    ],
  };

  transporter.sendMail(rejectedMailOptions, (err, data) => {
    if (err) {
      res.json({
        status: err,
      });
      console.log(err);
    } else {
      res.json({
        status: "success",
      });
      console.log("Rejection Email Sent");
    }
  });
});

app.post("/fundsProcessedMail", (req, res) => {
  var subject = " Reimbursement-Funds Processed";
  var name = req.body.fundProcessedEmployeeName;
  var time = new Date().toLocaleString();
  var email = req.body.fundProcessedEmailAddress;
  var userID = req.body.fundProcessedEmployeeId;
  var account = req.body.fundProcessedApprovedAccount;
  var expenseDate = req.body.fundProcessedDate;
  var expenseItem = req.body.fundProcessedExpenseCategory;
  var refundAmount = req.body.fundProcessedAmount;
  var invoiceDate = req.body.fundProcessedInvoiceDate;
  var message = req.body.fundProcessedDescription;
  var invoiceNo = req.body.fundProcessedInvoiceNo;
  var vendorName = req.body.fundProcessedVendorName;
  var consent = req.body.fundProcessedConsent;
  var paidTo = req.body.fundProcessedPaidTo;
  var fileLink = req.body.fundProcessedFileLink;
  var approverMailId = req.body.approverMailId;
  var adminMailId = req.body.adminMailId;

  const fundsProcessedMailOptions = {
    from: creds.auth.user,
    to: email,
    cc: approverMailId,
    bcc: adminMailId,
    subject: subject,

    html: fundsProcessedEmailTemplate(
      (name = name),
      (time = time),
      (email = email),
      (userID = userID),
      (account = account),
      (expenseDate = expenseDate),
      (expenseItem = expenseItem),
      (refundAmount = refundAmount),
      (invoiceDate = invoiceDate),
      (message = message),
      (invoiceNo = invoiceNo),
      (vendorName = vendorName),
      (consent = consent),
      (paidTo = paidTo)
    ),

    attachments: [
      {
        filename: "Proof of Reimbursement",
        // content: fileLink.split("base64,")[1],
        // cid: `${fileLink}`, //same cid value as in the html img src
        path: fileLink,
      },
    ],
  };

  transporter.sendMail(fundsProcessedMailOptions, (err, data) => {
    if (err) {
      res.json({
        status: err,
      });
      console.log(err);
    } else {
      res.json({
        status: "success",
      });
      console.log("Funds Processed Email Sent");
    }
  });
});

app.post("/fundsRejectedMail", (req, res) => {
  var subject = "Reimbursement-Funds Declined";
  var name = req.body.fundRejectedEmployeeName;
  var time = new Date().toLocaleString();
  var email = req.body.fundRejectedEmailAddress;
  var rejectionText = req.body.fundRejectedReason;
  var userID = req.body.fundRejectedEmployeeId;
  var account = req.body.fundRejectedAccount;
  var expenseDate = req.body.fundRejectedDate;
  var expenseItem = req.body.fundRejectedExpenseCategory;
  var refundAmount = req.body.fundRejectedAmount;
  var invoiceDate = req.body.fundRejectedInvoiceDate;
  var message = req.body.fundRejectedDescription;
  var invoiceNo = req.body.fundRejectedInvoiceNo;
  var consent = req.body.fundRejectedConsent;
  var vendorName = req.body.fundRejectedVendorName;
  var paidTo = req.body.fundRejectedPaidTo;
  var fileLink = req.body.fundRejectedFileLink;
  var approverMailId = req.body.approverMailId;
  var adminMailId = req.body.adminMailId;

  const fundsRejectedMailOptions = {
    from: creds.auth.user,
    to: email,
    cc: approverMailId,
    bcc: adminMailId,
    subject: subject,

    html: fundsRejectedEmailTemplate(
      (name = name),
      (time = time),
      (email = email),
      (rejectionText = rejectionText),
      (userID = userID),
      (account = account),
      (expenseDate = expenseDate),
      (expenseItem = expenseItem),
      (refundAmount = refundAmount),
      (invoiceDate = invoiceDate),
      (message = message),
      (invoiceNo = invoiceNo),
      (vendorName = vendorName),
      (consent = consent),
      (paidTo = paidTo)
    ),

    attachments: [
      {
        filename: "Proof of Reimbursement",
        // content: fileLink.split("base64,")[1],
        // cid: `${fileLink}`, //same cid value as in the html img src
        path: fileLink,
      },
    ],
  };

  transporter.sendMail(fundsRejectedMailOptions, (err, data) => {
    if (err) {
      res.json({
        status: err,
      });
      console.log(err);
    } else {
      res.json({
        status: "success",
      });
      console.log("Funds Rejected Email Sent");
    }
  });
});

transporter.verify(function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is ready to send the emails");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.info("Server Has Started", PORT));
