"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactData } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useActiveSection } from "@/lib/active-section";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Instagram } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Subject is too short"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  website: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const { setActiveSectionId } = useActiveSection();
  const { ref, inView } = useInView({ threshold: 0.2 });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (inView) setActiveSectionId("contact");
  }, [inView, setActiveSectionId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      setStatus("submitting");
      const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="section">
      <div className="container">
        <h2 className="text-2xl font-semibold tracking-tight">{contactData.title}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{contactData.description}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="frosted-glass rounded-xl p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Name" {...register("name")} error={errors.name?.message} />
            <Input placeholder="Email" type="email" {...register("email")} error={errors.email?.message} />
            <Input placeholder="Subject" {...register("subject")} error={errors.subject?.message} />
            <Textarea rows={6} placeholder="Message" {...register("message")} error={errors.message?.message} />
            {/* Honeypot field */}
            <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />
            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending..." : "Send Message"}
            </Button>
            {status === "success" && <p className="text-sm text-green-500">Message sent successfully!</p>}
            {status === "error" && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
            </form>
          </div>
          <div className="frosted-glass rounded-xl p-6 space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Email</div>
              <a href={`mailto:${contactData.email}`} className="hover:underline">{contactData.email}</a>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Phone</div>
              <a href={`tel:${contactData.phone}`} className="hover:underline">{contactData.phone}</a>
            </div>
            <div className="flex gap-4 pt-2 text-muted-foreground">
              <a href="https://www.linkedin.com/in/karan-harsh" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
              <a href="https://github.com/Karan-Harsh" aria-label="GitHub" className="hover:text-foreground"><Github className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/_karan_harsh/" aria-label="Instagram" className="hover:text-foreground"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
