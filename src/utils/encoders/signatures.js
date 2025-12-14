/**
 * Digital Signatures & Authentication Encoders
 * Various digital signature formats and authentication mechanisms
 */

// ============================================
// PGP/GPG SIGNATURES
// ============================================

/**
 * PGP/GPG signature format (ASCII-armored)
 * Used for email and file signing
 */
export const encodePGPSignature = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const sigData = btoa(String.fromCharCode(...Array.from({length: 64}, (_, i) =>
      (code * (i + 1) * 1039 + idx) % 256
    )));

    // Format in 64-char lines
    const lines = [];
    for (let i = 0; i < sigData.length; i += 64) {
      lines.push(sigData.slice(i, i + 64));
    }

    const version = `Version: GnuPG v${1 + (code % 3)}.${code % 10}.${(code * 2) % 20}`;

    return `-----BEGIN PGP SIGNATURE-----\n${version}\n\n${lines.join('\n')}\n=${btoa(String.fromCharCode(code % 256)).slice(0, 4)}\n-----END PGP SIGNATURE-----`;
  }).join('\n\n');
};

/**
 * Clearsigned PGP message format
 */
export const encodePGPClearsign = (text) => {
  const hash = 'SHA512';
  const sigData = btoa(text).slice(0, 64);

  return `-----BEGIN PGP SIGNED MESSAGE-----
Hash: ${hash}

${text}
-----BEGIN PGP SIGNATURE-----

${sigData}
-----END PGP SIGNATURE-----`;
};

// ============================================
// JWT (JSON WEB TOKEN)
// ============================================

/**
 * JWT (JSON Web Token) format - Extended version
 * Used for authentication and authorization
 */
export const encodeJWTSignature = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);

    // Header
    const header = {
      alg: ['HS256', 'RS256', 'ES256', 'PS256'][code % 4],
      typ: 'JWT',
      kid: btoa(String.fromCharCode(code)).slice(0, 8)
    };

    // Payload
    const payload = {
      sub: `user_${code}`,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
      jti: btoa(String.fromCharCode(code, idx)).slice(0, 16)
    };

    // Create JWT structure
    const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '');
    const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '');

    // Generate fake signature
    let signature = '';
    for (let i = 0; i < 43; i++) {
      const byte = (code * (i + 1) * 1049 + idx) % 64;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
      signature += chars[byte];
    }

    return `${headerB64}.${payloadB64}.${signature}`;
  }).join('\n');
};

/**
 * Decode JWT signature
 */
export const decodeJWTSignature = (text) => {
  try {
    return text.split('\n').map(jwt => {
      const parts = jwt.split('.');
      if (parts.length >= 2) {
        const payload = JSON.parse(atob(parts[1]));
        const sub = payload.sub || '';
        const match = sub.match(/user_(\d+)/);
        if (match) {
          return String.fromCharCode(parseInt(match[1]));
        }
      }
      return '?';
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// OAUTH & BEARER TOKENS
// ============================================

/**
 * OAuth 2.0 Bearer token format
 */
export const encodeOAuthBearer = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const tokenData = btoa(String.fromCharCode(...Array.from({length: 32}, (_, i) =>
      (code * (i + 1) * 1051 + idx) % 256
    ))).replace(/[^a-zA-Z0-9]/g, '');

    const scope = ['read', 'write', 'admin', 'user:profile'][code % 4];
    const expiresIn = 3600 + (code * 60);

    return `Bearer ${tokenData.slice(0, 64)}\nScope: ${scope}\nExpires: ${expiresIn}s`;
  }).join('\n---\n');
};

/**
 * OAuth 2.0 access token response
 */
export const encodeOAuthToken = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const accessToken = btoa(String.fromCharCode(...Array.from({length: 32}, (_, i) =>
      (code * (i + 1) * 1053) % 256
    ))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 64);

    const refreshToken = btoa(String.fromCharCode(...Array.from({length: 32}, (_, i) =>
      (code * (i + 1) * 1061) % 256
    ))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 64);

    return JSON.stringify({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600 + (code % 7200),
      refresh_token: refreshToken,
      scope: 'read write'
    }, null, 2);
  }).join('\n\n');
};

// ============================================
// WEBAUTHN / FIDO2
// ============================================

/**
 * WebAuthn credential format
 * Modern passwordless authentication
 */
export const encodeWebAuthn = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);

    const credentialId = btoa(String.fromCharCode(...Array.from({length: 16}, (_, i) =>
      (code * (i + 1) * 1063 + idx) % 256
    ))).slice(0, 22);

    const publicKey = btoa(String.fromCharCode(...Array.from({length: 65}, (_, i) =>
      (code * (i + 1) * 1069) % 256
    ))).slice(0, 87);

    const attestation = ['none', 'indirect', 'direct'][code % 3];
    const authData = btoa(String.fromCharCode(...Array.from({length: 37}, (_, i) =>
      (code * (i + 1) * 1087) % 256
    )));

    return JSON.stringify({
      id: credentialId,
      type: 'public-key',
      rawId: credentialId,
      response: {
        clientDataJSON: btoa(JSON.stringify({
          type: 'webauthn.create',
          challenge: btoa(String.fromCharCode(code)).slice(0, 16),
          origin: 'https://example.com'
        })),
        attestationObject: authData
      },
      attestationFormat: attestation,
      publicKey: publicKey
    }, null, 2);
  }).join('\n\n');
};

/**
 * FIDO2 assertion format
 */
export const encodeFIDO2Assertion = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);

    const credId = btoa(String.fromCharCode(code, idx)).slice(0, 22);
    const signature = btoa(String.fromCharCode(...Array.from({length: 64}, (_, i) =>
      (code * (i + 1) * 1091 + idx) % 256
    )));

    const counter = (code * 1000 + idx).toString(16).padStart(8, '0');

    return `Credential ID: ${credId}
Signature: ${signature}
Counter: 0x${counter}
User Present: true
User Verified: true`;
  }).join('\n---\n');
};

// ============================================
// BLOCKCHAIN SIGNATURES
// ============================================

/**
 * Ethereum signed message format
 */
export const encodeEthereumSignature = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);

    let r = '0x';
    let s = '0x';
    for (let i = 0; i < 64; i++) {
      r += ((code * (i + 1) * 1093 + idx) % 16).toString(16);
      s += ((code * (i + 1) * 1097 + idx) % 16).toString(16);
    }

    const v = 27 + (code % 2);

    return `Message: "${char}"
r: ${r}
s: ${s}
v: ${v}
Signature: ${r.slice(2)}${s.slice(2)}${v.toString(16).padStart(2, '0')}`;
  }).join('\n\n');
};

/**
 * Bitcoin signed message format
 */
export const encodeBitcoinSignature = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);

    const address = '1' + btoa(String.fromCharCode(...Array.from({length: 25}, (_, i) =>
      (code * (i + 1) * 1103 + idx) % 256
    ))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 33);

    const signature = btoa(String.fromCharCode(...Array.from({length: 65}, (_, i) =>
      (code * (i + 1) * 1109 + idx) % 256
    )));

    return `-----BEGIN BITCOIN SIGNED MESSAGE-----
${char}
-----BEGIN SIGNATURE-----
${address}
${signature}
-----END BITCOIN SIGNED MESSAGE-----`;
  }).join('\n\n');
};

/**
 * Multisig signature format
 */
export const encodeMultisig = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const signers = 2 + (code % 3); // 2-4 signers
    const threshold = 1 + (code % signers);

    const signatures = [];
    for (let i = 0; i < signers; i++) {
      const sig = btoa(String.fromCharCode(...Array.from({length: 64}, (_, j) =>
        (code * (j + 1) * (1117 + i * 10) + idx) % 256
      ))).slice(0, 88);
      signatures.push(`Signer ${i + 1}: ${sig}`);
    }

    return `Multisig ${threshold}-of-${signers}
${signatures.join('\n')}
Combined: ${btoa(signatures.join('')).slice(0, 64)}`;
  }).join('\n---\n');
};

// ============================================
// XML & SAML SIGNATURES
// ============================================

/**
 * XML Digital Signature (XMLDSig)
 */
export const encodeXMLDSig = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const digestValue = btoa(String.fromCharCode(...Array.from({length: 32}, (_, i) =>
      (code * (i + 1) * 1123) % 256
    )));

    const signatureValue = btoa(String.fromCharCode(...Array.from({length: 256}, (_, i) =>
      (code * (i + 1) * 1129 + idx) % 256
    )));

    return `<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
  <SignedInfo>
    <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
    <SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
    <Reference URI="">
      <DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
      <DigestValue>${digestValue}</DigestValue>
    </Reference>
  </SignedInfo>
  <SignatureValue>${signatureValue}</SignatureValue>
</Signature>`;
  }).join('\n\n');
};

/**
 * SAML assertion signature
 */
export const encodeSAMLAssertion = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const issueInstant = new Date(Date.now() + code * 1000).toISOString();
    const assertionId = `_${btoa(String.fromCharCode(code, idx)).replace(/[^a-zA-Z0-9]/g, '')}`.slice(0, 40);

    const signature = btoa(String.fromCharCode(...Array.from({length: 256}, (_, i) =>
      (code * (i + 1) * 1151 + idx) % 256
    )));

    return `<saml:Assertion ID="${assertionId}" IssueInstant="${issueInstant}">
  <saml:Issuer>https://idp.example.com</saml:Issuer>
  <ds:Signature>
    <ds:SignatureValue>${signature}</ds:SignatureValue>
  </ds:Signature>
  <saml:Subject>
    <saml:NameID>user${code}</saml:NameID>
  </saml:Subject>
</saml:Assertion>`;
  }).join('\n\n');
};

// ============================================
// HMAC & API SIGNATURES
// ============================================

/**
 * HMAC signature format
 */
export const encodeHMACSignature = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const algorithms = ['HMAC-SHA1', 'HMAC-SHA256', 'HMAC-SHA512'];
    const algo = algorithms[code % algorithms.length];

    const hmac = Array.from({length: algo.includes('512') ? 64 : (algo.includes('256') ? 32 : 20)}, (_, i) =>
      ((code * (i + 1) * 1153 + idx) % 256).toString(16).padStart(2, '0')
    ).join('');

    return `Algorithm: ${algo}
HMAC: ${hmac}
Timestamp: ${Date.now() + code * 1000}`;
  }).join('\n---\n');
};

/**
 * AWS Signature V4 format
 */
export const encodeAWSSignature = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const date = new Date(Date.now() + code * 86400000);
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const region = ['us-east-1', 'eu-west-1', 'ap-southeast-1'][code % 3];
    const service = ['s3', 'ec2', 'dynamodb', 'lambda'][code % 4];

    const signature = Array.from({length: 64}, (_, i) =>
      ((code * (i + 1) * 1163 + idx) % 16).toString(16)
    ).join('');

    const credential = `AKIA${btoa(String.fromCharCode(code)).replace(/[^A-Z0-9]/g, '').slice(0, 16)}/${dateStr}/${region}/${service}/aws4_request`;

    return `AWS4-HMAC-SHA256 Credential=${credential}, SignedHeaders=host;x-amz-date, Signature=${signature}`;
  }).join('\n');
};

/**
 * Stripe webhook signature
 */
export const encodeStripeSignature = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const timestamp = Math.floor(Date.now() / 1000) + code;

    const v1 = Array.from({length: 64}, (_, i) =>
      ((code * (i + 1) * 1171 + idx) % 16).toString(16)
    ).join('');

    return `t=${timestamp},v1=${v1}`;
  }).join('\n');
};

/**
 * Decode Stripe signature
 */
export const decodeStripeSignature = (text) => {
  try {
    return text.split('\n').map(sig => {
      const match = sig.match(/t=(\d+)/);
      if (match) {
        const timestamp = parseInt(match[1]);
        const now = Math.floor(Date.now() / 1000);
        const code = timestamp - now;
        if (code >= 0 && code < 256) {
          return String.fromCharCode(code);
        }
      }
      return '?';
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

// ============================================
// CODE SIGNING
// ============================================

/**
 * Authenticode signature (Windows code signing)
 */
export const encodeAuthenticode = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);

    const certSerial = Array.from({length: 16}, (_, i) =>
      ((code * (i + 1) * 1181 + idx) % 256).toString(16).padStart(2, '0')
    ).join(':').toUpperCase();

    const signature = btoa(String.fromCharCode(...Array.from({length: 256}, (_, i) =>
      (code * (i + 1) * 1187 + idx) % 256
    )));

    const timestamp = new Date(Date.now() + code * 86400000).toISOString();

    return `Certificate Serial: ${certSerial}
Signature Algorithm: sha256RSA
Signature:
    ${signature}
Timestamp: ${timestamp}
Signer: CN=Code Signing ${code}`;
  }).join('\n\n');
};

/**
 * Apple code signature format
 */
export const encodeAppleCodeSign = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);

    const teamId = btoa(String.fromCharCode(code)).replace(/[^A-Z0-9]/g, '').slice(0, 10);
    const bundleId = `com.example.app${code}`;

    const cdhash = Array.from({length: 20}, (_, i) =>
      ((code * (i + 1) * 1193 + idx) % 256).toString(16).padStart(2, '0')
    ).join('');

    return `Executable=${bundleId}
Identifier=${bundleId}
Format=app bundle with Mach-O universal (x86_64 arm64)
CodeDirectory v=20500 size=${8192 + code * 100} flags=0x0
CDHash=${cdhash}
TeamIdentifier=${teamId}
Sealed Resources version=2`;
  }).join('\n---\n');
};

// ============================================
// TIMESTAMP TOKENS
// ============================================

/**
 * RFC 3161 Timestamp token
 */
export const encodeTimestampToken = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const timestamp = new Date(Date.now() + code * 86400000).toISOString();

    const serialNumber = Array.from({length: 8}, (_, i) =>
      ((code * (i + 1) * 1201 + idx) % 256).toString(16).padStart(2, '0')
    ).join('').toUpperCase();

    const messageImprint = btoa(String.fromCharCode(...Array.from({length: 32}, (_, i) =>
      (code * (i + 1) * 1213) % 256
    )));

    return `TimeStampToken:
  Version: 1
  Policy: 1.2.3.4.5
  Serial Number: 0x${serialNumber}
  Gen Time: ${timestamp}
  Message Imprint:
    Algorithm: SHA-256
    Digest: ${messageImprint}
  TSA: CN=Time Stamping Authority`;
  }).join('\n\n');
};

// ============================================
// SESSION & COOKIE SIGNATURES
// ============================================

/**
 * Signed cookie format
 */
export const encodeSignedCookie = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);
    const sessionId = btoa(String.fromCharCode(...Array.from({length: 24}, (_, i) =>
      (code * (i + 1) * 1217 + idx) % 256
    ))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 32);

    const signature = Array.from({length: 27}, (_, i) =>
      String.fromCharCode(65 + ((code * (i + 1) * 1223) % 26))
    ).join('');

    return `session=${sessionId}.${signature}; Path=/; HttpOnly; Secure; SameSite=Strict`;
  }).join('\n');
};

/**
 * Decode signed cookie
 */
export const decodeSignedCookie = (text) => {
  try {
    return text.split('\n').map(cookie => {
      const match = cookie.match(/session=([a-zA-Z0-9]+)\.([A-Z]+)/);
      if (match && match[2]) {
        const sig = match[2];
        // Reverse first character
        const firstCharCode = sig.charCodeAt(0) - 65;
        for (let i = 0; i < 256; i++) {
          if ((i * 1223) % 26 === firstCharCode) {
            return String.fromCharCode(i);
          }
        }
      }
      return '?';
    }).join('');
  } catch {
    return '[Decode failed]';
  }
};

/**
 * Kerberos ticket format
 */
export const encodeKerberosTicket = (text) => {
  return text.split('').map((char, idx) => {
    const code = char.charCodeAt(0);

    const realm = ['EXAMPLE.COM', 'CORP.LOCAL', 'AD.DOMAIN'][code % 3];
    const principal = `user${code}@${realm}`;

    const ticket = btoa(String.fromCharCode(...Array.from({length: 256}, (_, i) =>
      (code * (i + 1) * 1229 + idx) % 256
    )));

    const kvno = 2 + (code % 10);

    return `Ticket:
  Server: krbtgt/${realm}@${realm}
  Client: ${principal}
  Encryption: aes256-cts-hmac-sha1-96 (kvno ${kvno})
  Valid: ${new Date().toISOString()} to ${new Date(Date.now() + 36000000).toISOString()}
  Data: ${ticket}`;
  }).join('\n\n');
};
