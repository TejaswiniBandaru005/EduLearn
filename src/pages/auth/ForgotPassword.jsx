import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { FormGroup, Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        setMessage(result.message);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset your password</CardTitle>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Enter your email and we'll send you a link to reset your password
          </p>
        </CardHeader>
        <CardContent>
          {message && (
            <div className="mb-4 p-3 bg-success-50 text-success-600 text-sm rounded-md border border-success-200 dark:bg-success-900 dark:text-success-300 dark:border-success-800">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-error-50 text-error-500 text-sm rounded-md border border-error-200 dark:bg-error-900 dark:text-error-300 dark:border-error-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormGroup label="Email" htmlFor="email">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<Mail size={18} />}
              />
            </FormGroup>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Send reset link
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            to="/login"
            className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};