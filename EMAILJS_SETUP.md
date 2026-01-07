# EmailJS Setup Guide for Burma Court Playgroup Contact Form

## Overview
The contact form is configured to send emails to **leighbcp@gmail.com** using EmailJS service. Follow these steps to complete the setup.

## Setup Instructions

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose **Gmail** (recommended)
4. Follow the OAuth authentication process to connect your email
5. Note down your **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Contact Form Submission - Burma Court Playgroup

Hello,

You have received a new {{inquiry_type}} submission from the Burma Court Playgroup website.

Contact Details:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}
Inquiry Type: {{reason_for_contacting}}

{{#if child_name}}
Child Information:
Child's Name: {{child_name}}
Date of Birth: {{date_of_birth}}
Desired Start Date: {{desired_start_date}}
{{/if}}

Message:
{{message}}

How did they hear about us: {{how_did_you_hear}}

---
Submitted on: {{submission_date}}
Sent via Burma Court Playgroup website contact form
```

4. Set the **To Email** to: `{{to_email}}`
5. Set the **From Email** to: `{{from_email}}`
6. Set the **From Name** to: `{{from_name}}`
7. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_abcdefghijk`)

### 5. Update Environment Variables
1. Open the `.env` file in the project root
2. Replace the placeholder values with your actual EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
VITE_TARGET_EMAIL=leighbcp@gmail.com
```

### 6. Test the Setup
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3001/contact`
3. Fill out and submit the contact form
4. Check that the email arrives at leighbcp@gmail.com

## Troubleshooting

### Common Issues

**"EmailJS not configured" message:**
- Ensure all environment variables are set correctly in `.env`
- Restart the development server after updating `.env`
- Check that variable names start with `VITE_`

**Emails not being received:**
- Verify the EmailJS service is active
- Check spam/junk folder
- Ensure the template is saved and published
- Test with EmailJS dashboard first

**Template variables not working:**
- Ensure template variable names match exactly (case-sensitive)
- Use `{{variable_name}}` syntax in EmailJS template
- Check the console for any error messages

### Development vs Production

**Development:**
- Form works with fallback message when EmailJS not configured
- All form data is logged to console for debugging

**Production:**
- EmailJS must be properly configured for emails to send
- Add proper error handling and user notifications

## Security Notes

- Environment variables starting with `VITE_` are publicly accessible
- EmailJS public key is safe to expose in client-side code
- Never include private keys or sensitive credentials in client code
- The `.env` file should not be committed to version control

## Form Features

✅ **Multi-step form** with conditional fields
✅ **Form validation** with real-time error feedback
✅ **Responsive design** for all device sizes
✅ **Email integration** with structured template
✅ **Error handling** with user-friendly messages
✅ **Accessibility** support with ARIA labels

## Support

For technical issues with EmailJS setup, refer to:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration Guide](https://www.emailjs.com/docs/examples/reactjs/)