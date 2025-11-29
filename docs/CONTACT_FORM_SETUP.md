# 📧 Contact Form Setup Guide

Your contact form is configured to send emails to: **aryankapoor0303@gmail.com**

## Current Status

✅ Contact form is functional  
✅ Email recipient is set to: `aryankapoor0303@gmail.com`  
⚠️ Email delivery requires Web3Forms configuration

## Quick Setup (5 minutes)

### Step 1: Get Your Web3Forms Access Key

1. Go to [https://web3forms.com](https://web3forms.com)
2. Click "Get Started" or "Create Access Key"
3. Enter your email: `aryankapoor0303@gmail.com`
4. Verify your email (check inbox)
5. Copy your access key (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Step 2: Add to Vercel Environment Variables

1. Go to your Vercel dashboard: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project: **Landing-Page**
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `WEB3FORMS_ACCESS_KEY`
   - **Value:** Your access key from Step 1
   - **Environment:** Production, Preview, Development (select all)
5. Click **Save**

### Step 3: Verify Your Domain in Web3Forms

1. Go to [Web3Forms Dashboard](https://web3forms.com/dashboard)
2. Click on your access key
3. Add your domain: `landing-page-sandy-alpha-26.vercel.app`
4. Click "Verify Domain"
5. Wait for verification (usually instant)

### Step 4: Redeploy on Vercel

1. Go to your Vercel project
2. Click **Deployments**
3. Click the three dots (...) on the latest deployment
4. Click **Redeploy**
5. Wait for deployment to complete

### Step 5: Test the Contact Form

1. Visit your site: [https://landing-page-sandy-alpha-26.vercel.app](https://landing-page-sandy-alpha-26.vercel.app)
2. Go to the Contact page
3. Fill out the form with test data
4. Submit
5. Check your email: `aryankapoor0303@gmail.com`

## How It Works

### Email Flow

```
User fills form → API validates → Web3Forms sends email → Your inbox
```

### What Gets Sent

When someone submits the contact form, you'll receive an email with:

- **From:** The sender's name and email
- **Subject:** "Portfolio Contact: [their subject]"
- **Message:** Their full message
- **Reply-To:** Set to sender's email (you can reply directly)

### Example Email

```
From: John Doe (john@example.com)

Subject: Portfolio Contact: Interested in collaboration

Message:
Hi Aryan,

I came across your portfolio and I'm impressed with your work.
I'd like to discuss a potential collaboration opportunity.

Best regards,
John
```

## Environment Variables

### For Local Development

Create or update `.env.local`:

```env
# Contact Form
CONTACT_EMAIL=aryankapoor0303@gmail.com
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

### For Vercel (Production)

Add in Vercel Dashboard → Settings → Environment Variables:

```
WEB3FORMS_ACCESS_KEY=your_access_key_here
```

## Troubleshooting

### Emails Not Being Received

**Check 1: Environment Variable**
- Verify `WEB3FORMS_ACCESS_KEY` is set in Vercel
- Make sure you redeployed after adding it

**Check 2: Domain Verification**
- Go to [Web3Forms Dashboard](https://web3forms.com/dashboard)
- Verify `landing-page-sandy-alpha-26.vercel.app` is listed and verified
- If not verified, click "Verify Domain"

**Check 3: Spam Folder**
- Check your spam/junk folder in Gmail
- Mark as "Not Spam" if found there

**Check 4: Web3Forms Status**
- Go to [Web3Forms Dashboard](https://web3forms.com/dashboard)
- Check if there are any error messages
- Verify your email quota hasn't been exceeded

### Form Submissions Not Working

**Check 1: Browser Console**
- Open browser DevTools (F12)
- Go to Console tab
- Submit the form
- Look for error messages

**Check 2: Network Tab**
- Open browser DevTools (F12)
- Go to Network tab
- Submit the form
- Check the `/api/contact` request
- Look at the response

**Check 3: Rate Limiting**
- The form has rate limiting (5 submissions per hour per IP)
- Wait an hour or try from a different network

### Testing Locally

1. Add your access key to `.env.local`
2. Restart your dev server: `npm run dev`
3. Test the form at `http://localhost:3000`
4. Check terminal for logs

## Alternative Email Services

If you prefer not to use Web3Forms, you can integrate:

### SendGrid

```typescript
// Install: npm install @sendgrid/mail
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: 'aryankapoor0303@gmail.com',
  from: 'noreply@yourdomain.com',
  subject: `Portfolio Contact: ${subject}`,
  text: message,
  replyTo: email,
});
```

### Resend

```typescript
// Install: npm install resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: 'aryankapoor0303@gmail.com',
  subject: `Portfolio Contact: ${subject}`,
  text: message,
  replyTo: email,
});
```

### Nodemailer (Gmail SMTP)

```typescript
// Install: npm install nodemailer
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

await transporter.sendMail({
  from: process.env.GMAIL_USER,
  to: 'aryankapoor0303@gmail.com',
  subject: `Portfolio Contact: ${subject}`,
  text: message,
  replyTo: email,
});
```

## Security Features

Your contact form includes:

- ✅ **Rate Limiting** - Max 5 submissions per hour per IP
- ✅ **Email Validation** - Validates email format
- ✅ **Input Validation** - Checks length and required fields
- ✅ **Spam Detection** - Basic keyword filtering
- ✅ **IP Logging** - Tracks submission source
- ✅ **Error Handling** - Graceful error messages

## Current Configuration

- **Recipient Email:** `aryankapoor0303@gmail.com`
- **Service:** Web3Forms (free tier)
- **Rate Limit:** 5 submissions/hour per IP
- **Max Message Length:** 5000 characters
- **Domain:** `landing-page-sandy-alpha-26.vercel.app`

## Web3Forms Free Tier

- ✅ 250 submissions per month
- ✅ Unlimited domains
- ✅ Email notifications
- ✅ Spam filtering
- ✅ File attachments (up to 5MB)
- ✅ Custom redirect URLs
- ✅ Webhook support

## Support

If you need help:

1. Check [Web3Forms Documentation](https://docs.web3forms.com)
2. Check [Web3Forms FAQ](https://web3forms.com/faq)
3. Contact Web3Forms support: support@web3forms.com
4. Check Vercel logs for errors

## Quick Reference

### Web3Forms Dashboard
[https://web3forms.com/dashboard](https://web3forms.com/dashboard)

### Vercel Environment Variables
[https://vercel.com/dashboard](https://vercel.com/dashboard) → Your Project → Settings → Environment Variables

### Your Email
aryankapoor0303@gmail.com

---

**Last Updated:** November 28, 2025  
**Status:** Ready for configuration
