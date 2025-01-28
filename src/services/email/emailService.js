import {
  passwordResetOTPSendTemplete,
  userAccountActivatedNotificationTemplete,
  userActivationUrlEmailTemplete,
  userProfileUpdatedNotificationTemplete,
} from "./emailTemplates.js";
import { emailTransporter } from "./transport.js";

export const userActivationUrlEmail = async (obj) => {
  const transport = emailTransporter();
  const info = await transport.sendMail(userActivationUrlEmailTemplete(obj));
  return info.messageId;
};
export const userAccountActivatedNotification = async (obj) => {
  const transport = emailTransporter();
  const info = await transport.sendMail(
    userAccountActivatedNotificationTemplete(obj)
  );
  return info.messageId;
};
export const passwordResetOTPNotificationEmail = async (obj) => {
  const transport = emailTransporter();
  const info = await transport.sendMail(passwordResetOTPSendTemplete(obj));
  return info.messageId;
};
export const userProfileUpdatedNotificationEmail = async (obj) => {
  const transport = emailTransporter();
  const info = await transport.sendMail(
    userProfileUpdatedNotificationTemplete(obj)
  );
  return info.messageId;
};
