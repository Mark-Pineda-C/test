"use server";

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function sendOtp(formData: FormData) {
  const supabase = createClient();
  if (!formData.get("phone")) {
    console.log("no hay fono");
    return;
  }

  const phone = `+51${formData.get("phone")}`;

  console.log(phone);
  const { data, error } = await supabase.auth.signInWithOtp({
    phone,
  });

  if (error) {
    console.log(error);
    return error.message;
  }

  redirect(`/verify-otp?phone=${phone}`);
}

export async function verifyOtp(formData: FormData) {
  const supabase = createClient();
  const input = {
    phone: formData.get("phone") as string,
    token: formData.get("otp") as string,
  };
  if (!input.phone) {
    console.log("no hay fono");
    return;
  }
  if (!input.token) {
    console.log("no hay otp");
    return;
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    ...input,
    type: "sms",
  });

  if (error) {
    return;
  }
  if (session) {
    redirect("/user");
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

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (!error) {
    redirect("/user");
  }
}
