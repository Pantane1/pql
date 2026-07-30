const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const form = e.currentTarget;

  const serviceId =
    import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_65nlo8m";

  const contactTemplate =
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_b1391e3";

  const autoReplyTemplate =
    import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || "template_y88lggc";

  const publicKey =
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "6B39GrANe3KTTGYGH";

  try {
    // Send notification to you
    await emailjs.sendForm(
      serviceId,
      contactTemplate,
      form,
      publicKey
    );

    // Grab values from the form
    const fromName = (
      form.elements.namedItem("from_name") as HTMLInputElement
    ).value;

    const fromEmail = (
      form.elements.namedItem("from_email") as HTMLInputElement
    ).value;

    const message = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value;

    // Send auto reply to the visitor
    await emailjs.send(
      serviceId,
      autoReplyTemplate,
      {
        to_name: fromName,
        to_email: fromEmail,
        message,
      },
      publicKey
    );

    setSubmitted(true);
    form.reset();

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  } catch (err) {
    console.error(err);

    setError(
      "Failed to send message. Please try again or email me directly."
    );
  } finally {
    setLoading(false);
  }
};
