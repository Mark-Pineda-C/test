"use server";

import { redirect } from "next/navigation";
import { createAdmin, createClient } from "../supabase/server";

export async function GoogleSignIn() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/auth/callback"
          : "https://your-app.vercel.app/auth/callback",
    },
  });
  if (error) {
    console.error(error);
    return { error: error.message };
  }
  if (data.url) {
    redirect(data.url);
  }
}

export async function createProfile(formData: FormData): Promise<{
  type: "error" | "success";
  message: string;
  returns?: "email" | "phone";
}> {
  const hasEmail = parseInt(formData.get("has-email") as string);
  const hasPhone = parseInt(formData.get("has-phone") as string);
  const input = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    phoneCode: formData.get("phone-code") as string,
  };

  const supabase = createAdmin();

  if (!input.name) {
    return { type: "error", message: "El nombre es requerido" };
  }

  if (!!hasPhone) {
    if (!input.email) {
      return { type: "error", message: "El correo es requerido" };
    }

    const {
      data: { user: client },
    } = await supabase.auth.getUser();

    if (!client) {
      return {
        type: "error",
        message: "Error al actualizar los datos el usuario",
      };
    }

    const {
      data: { user },
    } = await supabase.auth.admin.updateUserById(client.id, {
      email: input.email,
    });

    if (!user) {
      return {
        type: "error",
        message: "Error al actualizar los datos el usuario",
      };
    }

    redirect("/auth/set-profile-type");
  }

  if (!!hasEmail) {
    if (!input.phone) {
      return { type: "error", message: "El teléfono es requerido" };
    }

    if (!input.phoneCode) {
      return { type: "error", message: "El código de país es requerido" };
    }

    const {
      data: { user: client },
    } = await supabase.auth.getUser();

    if (!client) {
      return {
        type: "error",
        message: "Error al actualizar los datos el usuario",
      };
    }

    const {
      data: { user },
    } = await supabase.auth.admin.updateUserById(client.id, {
      phone: input.phoneCode.replace("+", "") + input.phone,
    });

    if (!user) {
      return {
        type: "error",
        message: "Error al actualizar los datos el usuario",
      };
    }

    redirect("/auth/set-profile-type");
  }

  return { type: "error", message: "Error desconocido" };
}

export async function sendOtp(formData: FormData): Promise<{
  type: "error" | "success";
  message: string;
  returns?: "email" | "phone";
}> {
  const hasEmail = parseInt(formData.get("has-email") as string);
  const hasPhone = parseInt(formData.get("has-phone") as string);
  const input = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    phoneCode: formData.get("phone-code") as string,
  };

  const supabase = createAdmin();

  if (!input.name) {
    return { type: "error", message: "El nombre es requerido" };
  }

  if (!!hasPhone) {
    if (!input.email) {
      return { type: "error", message: "El correo es requerido" };
    }

    const {
      data: { user: client },
    } = await supabase.auth.getUser();

    if (!client) {
      return {
        type: "error",
        message: "Error al actualizar los datos el usuario",
      };
    }

    const { data: user } = await supabase.auth.admin.updateUserById(client.id, {
      email: input.email,
    });

    if (!user) {
      return {
        type: "error",
        message: "Error al actualizar los datos el usuario",
      };
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: input.email,
    });

    if (error) {
      return { type: "error", message: error.message };
    }

    return {
      type: "success",
      message: input.email,
      returns: "email",
    };
  }

  if (!!hasEmail) {
    if (!input.phone) {
      return { type: "error", message: "El teléfono es requerido" };
    }

    if (!input.phoneCode) {
      return { type: "error", message: "El código de país es requerido" };
    }

    const { data: user } = await supabase.auth.updateUser({
      phone: input.phoneCode.replace("+", "") + input.phone,
    });

    if (!user) {
      return {
        type: "error",
        message: "Error al actualizar los datos el usuario",
      };
    }

    const { error } = await supabase.auth.signInWithOtp({
      phone: input.phoneCode + input.phone,
    });

    if (error) {
      return { type: "error", message: error.message };
    }

    return {
      type: "success",
      message: input.phoneCode.replace("+", "") + input.phone,
      returns: "phone",
    };
  }

  return { type: "error", message: "Error desconocido" };
}

export async function verifyOtp(
  formData: FormData
): Promise<{ type: "error" | "success"; message: string }> {
  const validator = formData.get("validator") as string;
  const returns = formData.get("returns") as "email" | "phone";
  const token = formData.get("token") as string;

  const supabase = createClient();

  const { data, error } = await supabase.auth.verifyOtp(
    returns === "email"
      ? { email: validator, token, type: "email" }
      : { phone: validator, token, type: "sms" }
  );

  if (error) {
    return { type: "error", message: error.message };
  }

  if (!data) {
    return {
      type: "error",
      message: "Error al verificar el código, intentelo de nuevo más tarde",
    };
  }

  return { type: "success", message: "Cuenta creada con éxito" };
}

export async function setProfileType(formData: FormData) {
  const role = formData.get("role") as string;

  const supabase = createAdmin();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { type: "error", message: error.message };
  }

  if (!user) {
    return { type: "error", message: "Usuario no encontrado" };
  }

  const {
    data: { user: updatedUser },
    error: updateError,
  } = await supabase.auth.admin.updateUserById(user.id, {
    user_metadata: { role },
  });

  if (updateError) {
    return { type: "error", message: updateError.message };
  }

  if (!updatedUser) {
    return { type: "error", message: "Error al actualizar el usuario" };
  }

  const newUser = {
    account_id: user.id,
    name: user.user_metadata.name,
    email: user.email ?? "",
    phone: user.phone,
    avatar_url: user.user_metadata.avatar_url ?? "",
  };

  const { error: passengerError } = await supabase
    .from("passenger_profile")
    .insert(newUser);

  if (passengerError) {
    console.log(passengerError);
    return { type: "error", message: passengerError.message };
  }

  if (role === "driver") {
    const { error: driverError } = await supabase
      .from("driver_profile")
      .insert(newUser);

    if (driverError) {
      return { type: "error", message: driverError.message };
    }
  }

  redirect("/search");

  return { type: "success", message: "Perfil creado con éxito" };
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (!error) {
    redirect("/");
  }
}
