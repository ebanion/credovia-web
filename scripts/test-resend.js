const { Resend } = require('resend');
const fs = require('fs');
const path = require('path');

// Read .env.local manually since we aren't in Next.js context
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/RESEND_API_KEY=(.+)/);
const apiKey = match ? match[1].trim() : null;

if (!apiKey) {
  console.error('Could not find RESEND_API_KEY in .env.local');
  process.exit(1);
}

console.log('Using API Key:', apiKey.substring(0, 5) + '...');

const resend = new Resend(apiKey);

async function send() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Credovia Web <onboarding@resend.dev>',
      to: ['credovia.hogar@gmail.com'],
      subject: 'Test Email from Script',
      html: '<p>It works!</p>'
    });

    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', data);
    }
  } catch (err) {
    console.error('Exception:', err);
  }
}

send();
