"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function sendOtp(formData: FormData) {
  const supabase = createClient();

  const input = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
  };

  if (!input.phone) {
    console.log("no hay fono");
    return {
      error: "Ingrese el número de teléfono",
      name: null,
      phone: null,
    };
  }

  const phone = `+51${input.phone}`;

  console.log(phone);
  const { data, error } = await supabase.auth.signInWithOtp({
    phone,
  });

  if (error) {
    console.log(error);
    return { error: error.message, name: null, phone: null };
  }

  return { error: null, ...input };
}

export async function verifyOtp(formData: FormData) {
  const supabase = createClient();
  const input = {
    phone: `51${formData.get("phone") as string}`,
    token: formData.get("token") as string,
  };
  if (!input.phone) {
    console.log("no hay fono");
    return;
  }
  if (!input.token) {
    console.log("no hay otp");
    return;
  }

  console.log(input);

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    ...input,
    type: "sms",
  });

  if (error) {
    console.log(error);
    return;
  }
  if (session) {
    const { error } = await supabase.auth.updateUser({
      phone: input.phone,
      data: {
        full_name: formData.get("name") as string,
        phone: input.phone,
      },
    });

    if (error) {
      console.log(error);
    }
    redirect("/auth/set-user-type");
  }
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (!error) {
    redirect("/");
  }
}

export async function signWithGoogle() {
  const supabase = createClient();

  const isLocalEnv = process.env.NODE_ENV === "development";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: isLocalEnv
        ? "http://localhost:3000/auth/callback"
        : "https://test-seven-ivory-10.vercel.app/auth/callback",
    },
  });

  if (data.url) {
    console.log(data.url);
    redirect(data.url);
  }
}

export async function signWithEmail(formData: FormData) {
  const supabase = createClient();
  const input = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (!input.email) {
    return {
      type: "error",
      msg: "El email es obligatorio",
    };
  }
  if (!input.password) {
    return {
      type: "error",
      msg: "La contraseña es obligatoria",
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ ...input });

  if (error) {
    return {
      type: "error",
      msg: error.message,
    };
  }

  redirect("/user");
}
