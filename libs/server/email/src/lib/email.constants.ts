export const EMAIL_CONFIG_TOKEN = Symbol('METADAT:EMAIL_CONFIG');
export const EMAIL_INSTANCE_TOKEN = Symbol('METADATA:EMAIL_INSTANCE');

export const getEmailConfigToken = () => EMAIL_CONFIG_TOKEN;
export const getEmailInstanceToken = () => EMAIL_INSTANCE_TOKEN;

export const VerificationEmail = (
  username: string,
  email: string,
  verificationCode: string,
  unterisServer: string
) => {
  const link = `${unterisServer}/api/verify-email?email=${email}&token=${verificationCode}`;
  return `<html>
<body>
  <h3>Welcome ${username}!</h3>
  </div>
  <p>Thank you for signing up to use the Unteris site! Please verify your email by clicking <a href=${link}>this link</a>.</p>

  <p>If the above link doesn't work, copy and paste this into your browser.</p>
  <p>${link}</p>

  <p>May the Everfather guide your way, and Kurio bless your learnings.</p>
  </div>

  <div>
  <p>Thank you from the Unteris team</p>
  </div>
</body>
</html>
`;
};
