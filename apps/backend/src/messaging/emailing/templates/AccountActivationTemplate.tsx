import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

import config from './tailwind.config';
import { APP_NAME } from '@common/constants';

export interface IEmailVerificationTemplate {
  code: string;
  name: string;
}

export default function EmailVerificationTemplate(
  props: IEmailVerificationTemplate,
) {
  const appName = APP_NAME.toLowerCase();
  return (
    <Tailwind config={config}>
      <Html lang="en">
        <Head>
          <Font
            fontFamily="Poppins"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Body className="bg-white">
          <Section className="bg-primary-background p-4 rounded-b-2xl">
            <Container>
              <Img
                className="mx-auto"
                src="https://res.cloudinary.com/dk8quhoj2/image/upload/v1694109814/logo_avxn9k.png"
                alt="logo"
                width={105}
                height={65}
              />
              <Heading
                as="h1"
                className="text-white text-center text-5xl font-bold"
              >
                {appName}
              </Heading>
            </Container>
          </Section>
          <Section>
            <Row>
              <Container>
                <Img
                  className="mx-auto"
                  src="https://res.cloudinary.com/dk8quhoj2/image/upload/v1694111262/sqbuuw4wvuppynz295dr.png"
                  alt="account_activation"
                  width={252}
                  height={252}
                />
              </Container>
            </Row>
            <Row>
              <Container>
                <Heading
                  as="h2"
                  className="text-primary-text font-semibold text-center text-xl"
                >
                  Almost There! Just One More Step to Activate Your Account
                </Heading>
                <Text className="text-base text-center font-light m-0">
                  Thank you for signing up with {appName}.
                </Text>
                <Text className="text-base text-center font-light m-0 mb-8">
                  We're thrilled to have you on board!
                </Text>
                <Text className="text-base text-center font-light m-0">
                  To get started, please click the button below to activate your
                  account.
                </Text>
              </Container>
            </Row>
            <Row>
              <Container className="my-10">
                <Link
                  href={props.code ?? 'https://facebook.com'}
                  className="px-10 block text-2xl font-semibold w-fit mx-auto py-2 text-white rounded-full bg-primary-background"
                >
                  Activate
                </Link>
              </Container>
            </Row>
            <Row>
              <Container className="mb-5">
                <Text className="text-xs font-light text-center">
                  If you did not sign up for {appName}, just ignore this email.{' '}
                  <br /> If you have any questions or need assistance, please
                  contact our support team.
                </Text>
              </Container>
            </Row>
            <Row>
              <Container className="my-2.5">
                <Text className="m-0 text-xs font-light text-center">
                  Best wishes,
                </Text>
                <Text className="m-0 text-xs font-light text-center">
                  The {appName} Team
                </Text>
              </Container>
            </Row>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
}
