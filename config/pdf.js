const fs = require("fs");
const PDFDocument = require("pdfkit");
const cloud = require("./cloudinary");
const path = require("path");
const moment = require("moment"); // require
//const fs = require('fs');

exports.createInvoice = (invoice, filename) => {
  const pdfPath = path.join(__dirname, "../pdf", filename + ".pdf");
  let doc = new PDFDocument({ margin: 50 });

  generateTitle(doc);
  generateHeader(doc, invoice);
  generateOwnerInformation(doc, invoice);
  generateDetailsInformation(doc, invoice);
  generateSignature(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(pdfPath));
  //console.log("test: ", doc);
};

function generateOwnerInformation(doc, invoice) {
  doc
    .text(`Adresse de location :`, 50, 140)
    .font("Helvetica", 14)
    .text("", 50, 150)
    .font("Helvetica", 10)
    .text(`${invoice[0].adress}`, 50, 160)
    .font("Helvetica", 10)
    .text(`Je soussigné `, 50, 200, { continued: true })
    .font("Helvetica", 12)
    .text(`${invoice[0].owner}`, { continued: true })
    .font("Helvetica", 10)
    .text(
      `, propriétaire du logement désigné ci-dessus, déclare avoir reçu de `,
      { continued: true }
    )
    .font("Helvetica", 12)
    .text(`${invoice[0].tenant} `, { continued: true })
    .font("Helvetica", 10)
    .text(
      `la somme de ${
        invoice[0].golbalCost
      }(=> en lettre aussi), au titre du paiement du loyer et des charges pour la période de location du ${moment(
        invoice[0].startPeriod
      ).format("DD MMMM YYYY")} au ${moment(invoice[0].endPeriod).format(
        "DD MMMM YYYY"
      )} et lui en donne quittance, sous réserve de tous mes droits`,
      { continued: true }
    )
    .font("Helvetica", 10)
    .moveDown();
}

function generateDetailsInformation(doc, invoice) {
  doc
    .text(``, 50, 260)
    .font("Helvetica", 14)
    .text(`Détail du réglement :`, 50, 260)
    .font("Helvetica", 14)
    .text(``, 50, 300)
    .font("Helvetica", 10)
    .text(`Loyer`, 75, 300)
    .font("Helvetica", 10)
    .text(`${invoice[0].rent} €`, 200, 300)
    .font("Helvetica", 10)
    .text(`Provisions pour charges`, 75, 330)
    .font("Helvetica", 10)
    .text(`${invoice[0].provision} €`, 200, 330)
    .font("Helvetica", 10)
    .text(`Charges fixes`, 75, 360)
    .font("Helvetica", 10)
    .text(`${invoice[0].fixedCost} €`, 200, 360)
    .font("Helvetica", 10)
    .text(`Aides sociales`, 75, 390)
    .font("Helvetica", 10)
    .text(`- ${invoice[0].socialSupport} €`, 200, 390)
    .font("Helvetica", 10)
    .text(`Total`, 75, 420)
    .font("Helvetica", 10)
    .text(`${invoice[0].golbalCost} €`, 200, 420)
    .font("Helvetica", 10)
    .text(
      `Date du paiement: ${moment(invoice[0].paymentDate).format(
        "DD MMMM YYYY"
      )}`,
      50,
      460
    )
    .font("Helvetica", 10)
    .moveDown();
}

function generateSignature(doc, invoice) {
  const today = new Date();
  doc
    .text(
      `Fait à ${invoice[0].adress}, le ${moment(today).format("DD MMMM YYYY")}`,
      50,
      500
    )
    .font("Helvetica", 10)
    .text(`Signature `, 50, 540)
    .font("Helvetica", 10);
}

function generateTitle(doc) {
  doc
    .font("Helvetica", 18)
    .text("Quittance de loyer", 50, 50, { align: "center" })
    .moveDown();
}

function generateHeader(doc, invoice) {
  doc
    .font("Helvetica", 14)
    .text(
      `Quittance de loyer du mois de ${moment(invoice[0].startPeriod).format(
        "MMMM YYYY"
      )}`,
      50,
      105,
      { align: "left" }
    )
    .moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      `Cette quittance annule tous les reçus qui auraient pu être établis précédemment en cas de paiement partiel du montant du présent terme. Elle est à conserver pendant cinq ans par le locataire (article 2224 du Code civil).`,
      50,
      680,
      { align: "left", width: 500 }
    );
}
