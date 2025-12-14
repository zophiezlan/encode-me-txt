# Security Policy

## Overview

Creative Text Encoder is a client-side web application for encoding and decoding text. Security is important to us, and we take all security vulnerabilities seriously.

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Features

### Client-Side Processing

- **All encoding/decoding happens in the browser** - No data is sent to servers
- **No backend API** - Completely static application
- **No data collection** - Your text never leaves your device
- **Offline capable** - Works without internet connection via PWA

### Security Headers

The application implements security best practices:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### Content Security Policy

Recommended CSP for deployment:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://api.qrserver.com;
  connect-src 'self' https://api.qrserver.com;
```

## Known Limitations & Considerations

### Not Cryptographically Secure

⚠️ **Important:** This tool is for **educational and creative purposes only**.

- **Caesar Cipher, ROT13**: Trivially breakable, not secure for real data
- **Simple encodings**: Most methods are easily reversible
- **Zero-width steganography**: Can be detected by examining Unicode characters
- **Hash generator**: Uses a simple hash function, not cryptographic

### Privacy Considerations

#### QR Code Generation

- QR codes are generated using a third-party API: `https://api.qrserver.com`
- Text is sent to this service when generating QR codes
- Consider privacy implications before encoding sensitive data as QR codes
- Alternative: The application can work offline for all other encoders

#### Browser Storage

- Favorites and preferences may be stored in `localStorage`
- Service worker caches application files for offline use
- No personal data is stored

## Reporting a Vulnerability

We take security bugs seriously. If you discover a security vulnerability, please follow these steps:

### 1. **Do NOT** open a public issue

Security vulnerabilities should not be publicly disclosed until we've had a chance to address them.

### 2. Report via GitHub Security Advisories

Use GitHub's [private vulnerability reporting](https://github.com/zophiezlan/encode-me-txt/security/advisories/new):

1. Go to the Security tab
2. Click "Report a vulnerability"
3. Fill out the form with details

### 3. Include in Your Report

Please provide:

- **Type of vulnerability** (XSS, injection, etc.)
- **Location** in the codebase (file and line number if possible)
- **Step-by-step instructions** to reproduce
- **Proof of concept** or exploit code (if applicable)
- **Potential impact** of the vulnerability
- **Suggested fix** (if you have one)

### 4. Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Depends on severity
  - **Critical**: Within 7 days
  - **High**: Within 14 days
  - **Medium**: Within 30 days
  - **Low**: Within 60 days

## Security Best Practices for Users

### For Sensitive Data

1. **DO NOT use this tool for encrypting sensitive data** - it's not cryptographically secure
2. **Use proper encryption tools** (GPG, age, etc.) for real security needs
3. **Be aware of QR code privacy** - text is sent to a third-party service

### Safe Usage

1. **Use offline mode** for privacy-sensitive text (all encoders except QR codes work offline)
2. **Clear browser cache** after encoding sensitive information
3. **Verify decoded output** before trusting it
4. **Don't trust user input** if building on this codebase

## Security Checklist for Contributors

When contributing code, ensure:

- [ ] No `eval()` or `Function()` constructor usage
- [ ] All user input is properly sanitized
- [ ] No SQL injection vulnerabilities (N/A for this project)
- [ ] No XSS vulnerabilities
- [ ] No hardcoded secrets or credentials
- [ ] Dependencies are up to date
- [ ] No unnecessary third-party scripts
- [ ] Proper error handling (no sensitive data in errors)

## Dependency Security

### Automated Scanning

We use:

- **Dependabot**: Automatic dependency updates
- **npm audit**: Regular security audits
- **GitHub Security Advisories**: Monitoring for vulnerabilities

### Manual Review

Before merging:

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

## Common Vulnerabilities & Mitigations

### Cross-Site Scripting (XSS)

**Risk**: Medium
**Mitigation**:

- React automatically escapes output
- No `dangerouslySetInnerHTML` usage
- Content Security Policy headers

### Clipboard API Security

**Risk**: Low
**Mitigation**:

- Requires user interaction
- Uses modern Clipboard API
- No automatic clipboard access

### Local Storage

**Risk**: Low
**Mitigation**:

- Only stores non-sensitive preferences
- Limited to favorites and UI state
- Can be cleared by user

### Third-Party Services

**Risk**: Medium (QR Code API)
**Mitigation**:

- User is informed about external service
- Only used when explicitly requested
- All other features work offline
- HTTPS-only connections

## Secure Deployment

### Recommended Configuration

#### Vercel

The included `vercel.json` sets secure headers automatically.

#### Netlify

The included `netlify.toml` configures security headers.

#### GitHub Pages

Security headers are more limited on GitHub Pages. Consider:

- Using Cloudflare for additional security headers
- Implementing CSP via meta tags

### HTTPS Only

Always deploy with HTTPS enabled. Most modern platforms (Vercel, Netlify) do this by default.

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://reactjs.org/docs/security.html)
- [Web.dev Security](https://web.dev/secure/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

## Contact

For security concerns that don't require private disclosure, you can also:

- Open a general discussion on GitHub
- Contact the maintainers via GitHub

Thank you for helping keep Creative Text Encoder safe! 🔒
