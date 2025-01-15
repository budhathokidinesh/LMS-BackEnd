export const userActivationUrlEmailTemplete = ({ email, name, url }) => {
  return {
    // send mail with defined transport object

    from: `"Dinesh Library" <${process.env.SMTP_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Action Required-Activate your new account", // Subject line
    text: `Hellow, ${name} follow the link to activate your account. ${url}`, // plain text body
    html: `
    <p>Hellow ${name}</p>
    <br />
    <br />
    <br />
    <p>Your account has been activated. CLick the button below to activate your account</p>
    <br />
    <br />
    <a href = ${url}
    <button style = "background: green; color:white; padding: 2rem">Activate Now</button> </a>
    <br />
    <br />
    <br />
    <br />
    Regards,
    -Dinesh Budhathoki
    `, // html body
  };
};

// this is for notification email
export const userAccountActivatedNotificationTemplete = ({
  email,
  name,
  url,
}) => {
  return {
    // send mail with defined transport object

    from: `"Dinesh Library" <${process.env.SMTP_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Your account is now active", // Subject line
    text: `Hellow, ${name} Your account is ready to use. You may go and sign in now. ${url}`, // plain text body
    html: `
    <p>Hellow ${name}</p>
    <br />
    <br />
    <br />
    <p>Your account has been activated. You may go and sign in now.</p>
    <br />
    <br />
   
    <br />
    <br />
    <br />
    <br />
    Regards,
    -Dinesh Budhathoki
    `, // html body
  };
};
