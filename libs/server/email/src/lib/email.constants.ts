export const EMAIL_CONFIG_TOKEN = Symbol('METADAT:EMAIL_CONFIG');
export const EMAIL_INSTANCE_TOKEN = Symbol('METADATA:EMAIL_INSTANCE');

export const getEmailConfigToken = () => EMAIL_CONFIG_TOKEN;
export const getEmailInstanceToken = () => EMAIL_INSTANCE_TOKEN;

export const verificationEmail = (
	username: string,
	verificationCode: string,
	unterisServer: string,
) => {
	const link = `${unterisServer}/verify?token=${verificationCode}`;
	return `<html>
<body>
  <h3>Welcome ${username}!</h3>
  <div>
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

export const passwordResetEmail = (
	resetToken: string,
	unterisServer: string,
): string => {
	const link = `${unterisServer}/reset-password?resetToken=${resetToken}`;
	return `<html>
<body>
  <h3>Password Reset</h3>
  <div>
    <p>We've received your request to be able to resett your password.</p>
    <p>Please <a href=${link}>click here</a> to reset your password.</p>
    <p>If the above link doesn't work, copy and paste this into your browser:</p>
    <p>${link}</p>
    <p>This link will expire in one hour.</p>
    <p>If you did not request to reset your password, you should be able to ignore this email.</p>
  </div>
  <div>
    <p>Thank you from the Unteris team</p>
  </div>  
</body>    
</html>
`;
};
