import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { createClient } from '@/utils/supabase/client'; // Commented out the Supabase client
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// import { Database, Tables, TablesInsert } from '../../../types_db'; // Commented out database types

const reviewSchema = z.object({
  content: z.string(),
  rating: z.number().min(1).max(5).int('Rating must be an integer between 1 and 5'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

const ReviewForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [isUserNotLoggedIn, setIsUserNotLoggedIn] = React.useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = React.useState<'success' | { type: 'error'; message: string } | null>(null);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<ReviewFormData>({ resolver: zodResolver(reviewSchema) });

  const onSubmit: SubmitHandler<ReviewFormData> = async (data, event) => {
    event?.preventDefault();
    setIsSubmitting(true);
    setIsUserNotLoggedIn(false);
    setSubmitStatus(null);

    try {
      // const supabase = createClient(); // Commented out Supabase client creation
      // const { data: authData, error: authError } = await supabase.auth.getUser(); // Commented out authentication

      // if (authError) {
      //   console.error('Error getting user data:', authError);
      //   setSubmitStatus({ type: 'error', message: 'An error occurred while authenticating. Please try again.' });
      //   return;
      // }

      // if (authData.user) {
      //   const { error } = await supabase
      //     .from('customer_testimonials')
      //     .insert({
      //       content: data.content,
      //       rating: data.rating,
      //       customer_id: authData.user.id,
      //     })
      //     .select()
      //     .single();

      //   if (error) {
      //     console.error('Error inserting data:', error);
      //     setSubmitStatus({ type: 'error', message: error.message });
      //   } else {
      //     console.log('Review submitted successfully');
      //     reset();
      //     setSubmitStatus('success');
      //   }
      // } else {
      //   setIsUserNotLoggedIn(true);
      // }
      console.log('Review submitted:', data);
      reset();
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus({ type: 'error', message: 'An error occurred while submitting your review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {isUserNotLoggedIn && (
        <Alert>
          <AlertTitle>You&apos;re not logged in</AlertTitle>
          <AlertDescription>
            Please <Link href="/signin-signup">sign in or sign up</Link> to leave a review.
          </AlertDescription>
        </Alert>
      )}
      {submitStatus === 'success' && (
        <Alert>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your review has been submitted successfully.</AlertDescription>
        </Alert>
      )}
      {submitStatus && typeof submitStatus === 'object' && submitStatus.type === 'error' && (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{submitStatus.message}</AlertDescription>
        </Alert>
      )}
      <div>
        <label htmlFor="content">Review</label>
        <Textarea
          id="content"
          {...register('content')}
          className={errors.content ? 'border-red-500' : ''}
        />
        {errors.content && <span className="text-red-500">{errors.content.message}</span>}
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="rating">Rating:</label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          {...register('rating', { valueAsNumber: true })}
          className={errors.rating ? 'border-red-500' : ''}
        />
        {errors.rating && <span className="text-red-500">{errors.rating.message}</span>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Loading...' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default ReviewForm;