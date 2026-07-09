const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const form = e.currentTarget;

  try {
    // Send Email using EmailJS
    await emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_65nlo8m',
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_b1391e3',
      form,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '6B39GrANe3KTTGYGH'
    );

    // Collect form values
    const formData = new FormData(form);

    // Send WhatsApp notification
    try {
      const response = await fetch(
        "http://localhost:5000/api/send-whatsapp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.get("from_name"),
            email: formData.get("from_email"),
            message: formData.get("message"),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send WhatsApp notification.");
      }

    } catch (whatsappError) {
      console.error("WhatsApp notification failed:", whatsappError);

      // Email already succeeded, so don't block the user.
    }

    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 6000);

  } catch (err) {
    console.error("Email send failed:", err);
    setError("Failed to send message. Please try again or email me directly.");
  } finally {
    setLoading(false);
  }
};