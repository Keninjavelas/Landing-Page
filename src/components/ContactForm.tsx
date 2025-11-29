'use client';

import { useState, FormEvent } from 'react';
import { type Locale } from '@/i18n/config';
import { useClientTranslation } from '@/i18n/client';

interface ContactFormProps {
  locale: Locale;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const { t } = useClientTranslation(locale);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    } else if (formData.subject.trim().length > 200) {
      newErrors.subject = 'Subject must be less than 200 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 2) {
      newErrors.message = 'Message must be at least 2 characters';
    } else if (formData.message.trim().length > 5000) {
      newErrors.message = 'Message must be less than 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: '' });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit directly to Web3Forms to avoid Cloudflare blocking
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      
      if (!accessKey) {
        setSubmitStatus({
          type: 'error',
          message: 'Contact form is not configured. Please email aryankapoor0303@gmail.com directly.',
        });
        setIsSubmitting(false);
        return;
      }

      const web3formsData = {
        access_key: accessKey,
        name: formData.name,
        email: 'aryankapoor0303@gmail.com', // Your email
        from_name: formData.name,
        subject: `Portfolio Contact: ${formData.subject}`,
        message: `From: ${formData.name} (${formData.email})\n\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
        replyto: formData.email,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(web3formsData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! I will get back to you soon.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to send message. Please try again.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="border border-neon-green p-8 rounded-lg bg-bg-darker bg-opacity-30">
      <h3 className="text-2xl text-neon-green mb-8 font-mono text-center">
        [ SEND MESSAGE ]
      </h3>

      {submitStatus.type && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            submitStatus.type === 'success'
              ? 'border-neon-green bg-black text-neon-green'
              : 'border-neon-pink bg-black text-neon-pink'
          } font-mono text-sm`}
          role="alert"
          aria-live="polite"
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-text-secondary font-mono text-sm mb-3">
              {t('contact.form.name').toUpperCase()} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-bg-dark border rounded-lg font-mono focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.name
                  ? 'border-neon-pink text-neon-pink focus:ring-neon-pink'
                  : 'border-neon-green text-neon-green focus:ring-neon-green'
              }`}
              placeholder="John Doe"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-neon-pink font-mono" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-text-secondary font-mono text-sm mb-3">
              {t('contact.form.email').toUpperCase()} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-bg-dark border rounded-lg font-mono focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                errors.email
                  ? 'border-neon-pink text-neon-pink focus:ring-neon-pink'
                  : 'border-neon-green text-neon-green focus:ring-neon-green'
              }`}
              placeholder="john@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-neon-pink font-mono" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-text-secondary font-mono text-sm mb-3">
            {t('contact.form.subject').toUpperCase()} *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-bg-dark border rounded-lg font-mono focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
              errors.subject
                ? 'border-neon-pink text-neon-pink focus:ring-neon-pink'
                : 'border-neon-green text-neon-green focus:ring-neon-green'
            }`}
            placeholder="Project Inquiry"
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1 text-xs text-neon-pink font-mono" role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-text-secondary font-mono text-sm mb-3">
            {t('contact.form.message').toUpperCase()} *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-bg-dark border rounded-lg font-mono focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all ${
              errors.message
                ? 'border-neon-pink text-neon-pink focus:ring-neon-pink'
                : 'border-neon-green text-neon-green focus:ring-neon-green'
            }`}
            placeholder="Tell me about your project, timeline, budget, or any specific requirements..."
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-neon-pink font-mono" role="alert">
              {errors.message}
            </p>
          )}
          <div className="mt-2 text-xs text-text-muted font-mono">
            {formData.message.length}/5000 characters
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-text-muted">
          <span>📌</span>
          <span>Please include project details, timeline, and your preferred communication method for faster response.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 font-mono font-bold rounded-lg transition-all duration-300 text-lg ${
            isSubmitting
              ? 'bg-bg-dark border-2 border-text-muted text-text-muted cursor-not-allowed'
              : 'bg-bg-dark border-2 border-neon-green text-neon-green hover:bg-neon-green hover:bg-opacity-20'
          }`}
          style={{
            boxShadow: isSubmitting ? 'none' : '0 0 20px rgba(129, 199, 132, 0.4)',
          }}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? 'SENDING...' : `▸ ${t('contact.form.send').toUpperCase()}`}
        </button>
      </form>
    </div>
  );
}

