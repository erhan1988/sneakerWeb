import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
export function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/mbdkpvwj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const inputClasses =
  'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white';
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="text-center mb-16">

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have a question about an order, a product, or just want to say
            hello? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.2
            }}
            className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">

            {isSuccess ?
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 mb-8">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <Button id="btn-send-another" onClick={() => setIsSuccess(false)} variant="outline">
                  Send Another Message
                </Button>
              </div> :

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700">

                      Full Name
                    </label>
                    <input
                    type="text"
                    id="input-fullname"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Your Name" />

                  </div>
                  <div className="space-y-2">
                    <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700">

                      Email Address
                    </label>
                    <input
                    type="email"
                    id="input-email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="john@example.com" />

                  </div>
                </div>

                <div className="space-y-2">
                  <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-700">

                    Subject
                  </label>
                  <input
                  type="text"
                  id="input-subject"
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="Subject" />

                </div>

                <div className="space-y-2">
                  <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700">

                    Message
                  </label>
                  <textarea
                  id="input-message"
                  name="message"
                  required
                  rows={6}
                  value={formState.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                  placeholder="How can we help you?" />

                </div>

                <Button
                id="btn-send-message"
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isSubmitting}
                rightIcon={<Send size={18} />}>

                  Send Message
                </Button>
              </form>
            }
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.3
            }}
            className="space-y-10">

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Visit Us</h4>
                    <p className="text-gray-600 mt-1">
                       Sneaker Street, Fashion District
                      <br />
                      Bitola 7000, Macedonia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Email Us</h4>
                    <p className="text-gray-600 mt-1">
                      demirov.erhan1988@gmail.com
                      <br />
                      support@sneakerstudio.mk
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Call Us</h4>
                    <p className="text-gray-600 mt-1">
                      +389 76 835 635
                      <br />
                      Mon-Fri: 9am - 8pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>);

}