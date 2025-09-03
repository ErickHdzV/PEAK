// ------------------- BACKEND EXPRESS + NODEMAILER (SMTP GMAIL) ------------------- //
const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require("cors");
const backendApp = express();

backendApp.use(
  cors({
    origin: ["http://localhost:5500"],
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
backendApp.use(express.json());

backendApp.post("/api/contact", async (req, res) => {
  const { name, lastName, email, number, message, options } = req.body;

  // Configuración para SMTP de Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.DEST_EMAIL,
    subject: "Nuevo mensaje de contacto",
    text: `Nombre: ${name || ""} ${
      lastName || ""
    }\nEmail: ${email}\nTeléfono: ${number}\nOpciones: ${(options || []).join(
      ", "
    )}\nMensaje: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mensaje enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo enviar el mensaje" });
  }
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  backendApp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
// ------------------- FIN BACKEND ------------------- //
