import { useForm } from 'react-hook-form';

const ContactUsSection = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = () => {
    // console.log('Contact Form Submitted:', data);
    // TODO: send to backend or email API
    reset();
  };

  return (
    <section className="bg-base-100 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-700 p-6 rounded-lg shadow">
            <div>
              <label className="label">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                {...register('name', { required: true })}
              />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register('email', { required: true })}
              />
            </div>
            <div>
              <label className="label">Message</label>
              <textarea
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full"
                rows="4"
                {...register('message', { required: true })}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>

          {/* Contact Info */}
          <div className="bg-gray-700 p-6 rounded-lg shadow ">
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="mb-2">We’d love to hear from you! For any inquiries, feel free to contact us:</p>
            <p><strong>Phone:</strong> <a href="tel:+880123456789" className="link">+880 1234 56789</a></p>
            <p><strong>Email:</strong> <a href="mailto:support@bloodcare.com" className="link">support@pulseLink.com</a></p>
            <p className="mt-4"><strong>Address:</strong> 123 Blood Care Street, Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
