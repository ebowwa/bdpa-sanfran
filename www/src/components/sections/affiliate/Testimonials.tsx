/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zsF5Je7Jkxo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardContent, CardFooter, Card } from "@/components/ui/common/card";

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

// Content object
const content: TestimonialSectionContent = {
  heading: "Customer Testimonials",
  description: "Check out what our customers have to say about our services.",
  averageRating: 4.0,
  testimonials: [
    {
      content:
        "Professional and courteous service. The team completed the project on time and within budget. I highly recommend their services.",
      rating: 3,
      author: "John Smith",
      date: "3 days ago",
    },
    {
      content:
        "The company did an excellent job with my landscaping project. The attention to detail was impressive, and the results speak for themselves. I am extremely satisfied with the outcome.",
      rating: 5,
      author: "Emily Johnson",
      date: "1 week ago",
    },
    {
      content:
        "The concrete work performed by this company was exceptional. The finish was smooth, and the team paid attention to every detail. I would rate their service 5 stars without hesitation.",
      rating: 5,
      author: "Michael Clark",
      date: "2 days ago",
    },
  ],
};

export default function Component() {
  // Render the content dynamically
  return (
    <section className="w-full py-12 lg:py-24">
      <div className="container px-4 grid max-w-5xl items-center justify-center space-y-10 lg:space-y-0 lg:grid-cols-3 lg:gap-10">
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
        <div className="grid w-full grid-cols-3 items-stretch gap-10 lg:grid-cols-1 lg:gap-0">
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
    <Card>
      <CardContent className="p-6 lg:p-8">
        <p className="text-gray-500 dark:text-gray-400">
          {testimonial.content}
        </p>
      </CardContent>
      <CardFooter>
        <div className="grid grid-cols-2 items-center gap-4">
          <Rating value={testimonial.rating} />
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.date} by {testimonial.author}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

// Reusable StarIcon component
function StarIcon(props: { className: string; half?: boolean }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon
        points={
          props.half
            ? "12 2 15.09 8.26 22 9.27 17 14.14 12 17.77 12 17.77 12 2"
            : "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        }
      />
    </svg>
  );
}