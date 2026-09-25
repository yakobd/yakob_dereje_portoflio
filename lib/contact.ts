// Shared by the contact form (client) and /api/contact (server).

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const limits = {
  name: 100,
  email: 254,
  messageMin: 10,
  messageMax: 5000,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > limits.name)
    errors.name = `Please keep your name under ${limits.name} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > limits.email || !emailPattern.test(email))
    errors.email = "Please enter a valid email address.";

  if (!message) errors.message = "Please enter a message.";
  else if (message.length < limits.messageMin)
    errors.message = `Please write at least ${limits.messageMin} characters.`;
  else if (message.length > limits.messageMax)
    errors.message = `Please keep your message under ${limits.messageMax} characters.`;

  return errors;
}
