"use server";

import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";
import React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  senderEmail,
  recipientEmail,
  message,
}: {
  senderEmail: string;
  recipientEmail: string;
  message: string;
}) => {
  if (!senderEmail || !recipientEmail || !message) {
    return { error: "All fields are required" };
  }

  await resend.emails.send({
    from: "Email Sender Website <portfolio@rishabnagwani.tech>",
    to: recipientEmail,
    subject: `Email from ${recipientEmail}`,
    replyTo: senderEmail,
    react: React.createElement(EmailTemplate, {
      message,
      senderEmail,
      recipientEmail,
    }),
  });

  return { success: "Email sent successfully!" };
};
