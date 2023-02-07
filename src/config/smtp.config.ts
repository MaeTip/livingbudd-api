import { registerAs } from '@nestjs/config';

export default registerAs('smtp', () => ({
  username: process.env.SMTP_USERNAME,
  password: process.env.SMTP_PASSWORD,
  defaultReceiver: process.env.SMTP_DEFAULT_RECEIVER,
  defaultSender: process.env.SMTP_DEFAULT_SENDER,
}));
