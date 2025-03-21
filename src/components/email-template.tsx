import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type EmailTemplateProps = {
  message: string;
  senderEmail: string;
  recipientEmail: string;
};

export default function EmailTemplate({
  message,
  senderEmail,
  recipientEmail,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Email from {recipientEmail}</Preview>
      <Tailwind>
        <Body className="bg-gray-100">
          <Container>
            <Section className="bg-white border border-black/10 my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                Important message from {senderEmail}{" "}
              </Heading>
              <Text>{message}</Text>
              <Hr />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
