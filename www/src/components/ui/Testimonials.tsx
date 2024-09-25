/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zsF5Je7Jkxo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import React from 'react';
import { CardContent, CardFooter, Card } from "@/components/ui/common/card";
import StarIcon from "@/components/ui/icons/StarIcon";
import content from '../../../public/raw-data/testimonials.json';

// Define types for content structure
type Testimonial = {
  content: string;
  rating: number;
  author: string;
  date: string;
};

type TestimonialSectionContent = {
  heading: string;
  description: string;
  averageRating: number;
  testimonials: Testimonial[];
};

export default function Component() {
  // Render the content dynamically
  return (
    <section className="w-full py-12 lg:py-24">
      <div className="container px-4 mx-auto grid max-w-5xl items-center justify-center space-y-10 lg:space-y-0 lg:grid-cols-3 lg:gap-10">
        <div className="space-y-3 lg:col-span-2">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {content.heading}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {content.description}
            </p>
          </div>

          <div className="grid w-full grid-cols-5 items-center gap-2">
            <Rating value={content.averageRating} />
            <div className="grid grid-cols-2 items-center justify-end">
              <span className="font-semibold">{content.averageRating}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Average Rating
              </span>
            </div>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-1 lg:gap-0">
          {content.testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Reusable Rating component
function Rating({ value }: { value: number }) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;

  return (
    <div className="flex items-center space-x-2">
      {[...Array(fullStars)].map((_, index) => (
        <StarIcon key={index} className="w-4 h-4 text-primary-500" />
      ))}
      {hasHalfStar && (
        <StarIcon className="w-4 h-4 text-primary-500" half={true} />
      )}
      {[...Array(5 - Math.ceil(value))].map((_, index) => (
        <StarIcon key={index} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
}

// Reusable TestimonialCard component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="lg:max-w-none hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
      <CardContent className="p-6 lg:p-8">
        <p className="text-gray-500 dark:text-gray-400">{testimonial.content}</p>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
          <Rating value={testimonial.rating} />
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.date} by {testimonial.author}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}