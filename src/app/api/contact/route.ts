import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Rate limiting: max 5 requests per hour per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour
    return true;
  }

  if (record.count >= 5) {
    return false;
  }

  record.count++;
  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters.' },
        { status: 400 }
      );
    }

    // Basic spam detection
    const spamKeywords = ['http://', 'https://', 'www.', '.com/', '[url]', '[link]'];
    const hasSpam = spamKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    if (hasSpam && message.length < 50) {
      return NextResponse.json(
        { error: 'Message contains suspicious content.' },
        { status: 400 }
      );
    }

    // Send email using Web3Forms (free service)
    // You can also use SendGrid, Resend, or other services
    const recipientEmail = 'aryankapoor0303@gmail.com';
    
    // Log the submission
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      ip,
    });

    // Try to send email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        
        const emailResult = await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: recipientEmail,
          replyTo: email,
          subject: `Portfolio Contact: ${subject}`,
          text: `From: ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        });
        
        if (emailResult.data) {
          console.log('✅ Email sent successfully via Resend to:', recipientEmail);
          console.log('📧 Email ID:', emailResult.data.id);
        } else {
          console.error('❌ Resend error:', emailResult.error);
        }
      } catch (emailError) {
        console.error('❌ Email sending error:', emailError);
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY not configured. Email not sent.');
      console.log(`📧 Email would be sent to: ${recipientEmail}`);
    }

    // Return success message
    // Note: Email sending will work once domain is configured in Web3Forms
    return NextResponse.json(
      { 
        success: true,
        message: resendApiKey 
          ? 'Thank you for your message! I will get back to you soon.' 
          : 'Thank you for your message! Your submission has been logged. For immediate contact, please email aryankapoor0303@gmail.com directly.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

