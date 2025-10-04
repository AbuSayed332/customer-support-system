import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Implement forgot password API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
        <p className="text-gray-600 mt-2">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      {success ? (
        <Alert
          type="success"
          title="Email Sent!"
          message="Check your inbox for password reset instructions."
          className="mb-6"
        />
      ) : (
        <>
          {error && <Alert type="error" message={error} className="mb-6" />}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <Button type="submit" fullWidth loading={loading}>
              Send Reset Link
            </Button>
          </form>
        </>
      )}

      <Link
        to="/login"
        className="mt-6 flex items-center justify-center text-sm text-primary-600 hover:text-primary-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Login
      </Link>
    </div>
  );
};

export default ForgotPassword;