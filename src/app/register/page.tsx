"use client";

import Button from "@/components/button";
import DatePicker from "@/components/dateInput";
import IconButton from "@/components/iconButton";
import Input from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Schema definition using zod for form validation
const schema = z.object({
  firstName: z.string().min(2, {
    message: "Der Vorname muss mindestens zwei Buchstaben enthalten",
  }),
  lastName: z.string().min(3, {
    message: "Der Nachname muss mindestens drei Buchstaben enthalten",
  }),
  birthDate: z.date(),
  email: z.string().email({ message: "Die E-Mail-Adresse ist ungültig" }),
  password: z
    .string()
    .min(12, { message: "Das Passwort muss mindestens 12 Zeichen lang sein" })
    .regex(/[A-Z]/, {
      message: "Das Passwort muss mindestens einen Großbuchstaben enthalten",
    })
    .regex(/[\W_]/, {
      message: "Das Passwort muss mindestens ein Sonderzeichen enthalten",
    }),
});

// The TypeScript type for the form data based on the zod schema.
type FormData = z.infer<typeof schema>;

export default function Register() {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push("/");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  //log data after validation
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  // Allows the button to trigger the form submission while outside the <form> element
  const handleButtonClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="md:hidden w-full flex flex-col flex-grow">
        <section className="w-full flex flex-col flex-grow">
          <header className="flex items-center px-4 py-[18px] gap-x-4">
            <IconButton onClick={handleBackButtonClick}>
              <ArrowLeft size={20} />
            </IconButton>
            <h1 className="text-h1">ANGLER BANK</h1>
          </header>
          <div className="px-6 mt-8 space-y-2">
            <h2 className="font-bold text-[32px] leading-9">
              Erstelle einen Account
            </h2>
            <p>Sag mir, wer du bist!</p>
            <div className="space-y-1 pb-4">
              <div>
                <Controller
                  defaultValue=""
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Vorname"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.firstName?.message}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  defaultValue=""
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Nachname"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.lastName?.message}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  defaultValue={undefined}
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Geburtsdatum"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.birthDate?.message}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  defaultValue=""
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="E-Mail"
                      type="email"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.email?.message}
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  defaultValue=""
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Passwort"
                      type="password"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.password?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Registration button */}
        <section className="w-full pb-2 px-6">
          <Button onClick={handleButtonClick}>Anmelden</Button>
        </section>
      </div>

      {/* Desktop view message */}
      <section className="hidden md:block">
        <p className="text-xl font-semibold text-center absolute top-[50%] w-full">
          This page is only optimized for mobile view.
        </p>
      </section>
    </div>
  );
}
