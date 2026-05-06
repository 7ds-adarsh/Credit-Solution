import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  debt: string;
  solution: string;
  additional?: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const recipientEmail = "adarshpawaiya345@gmail.com";

const requiredFields: Array<keyof ContactPayload> = [
  "firstName",
  "lastName",
  "phone",
  "debt",
  "solution",
];

export async function POST(request: Request) {
  if (!resend) {
    return NextResponse.json(
      { message: "Email service is not configured. Add RESEND_API_KEY." },
      { status: 500 },
    );
  }

  let body: Partial<ContactPayload>;

  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  for (const field of requiredFields) {
    const value = body[field];
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json(
        { message: `Please provide a valid ${field}.` },
        { status: 400 },
      );
    }
  }

  const fullName = `${body.firstName} ${body.lastName}`.trim();
  const additionalInfo = body.additional?.trim() || "Not provided";

  try {
    await resend.emails.send({
      from: "Credit Solutions <onboarding@resend.dev>",
      to: recipientEmail,
      subject: `New consultation request from ${fullName}`,
      text: [
        "A new consultation request was submitted.",
        "",
        `Name: ${fullName}`,
        `Phone: ${body.phone}`,
        `Approximate Debt: ${body.debt}`,
        `Solution of Interest: ${body.solution}`,
        "",
        "Additional Information:",
        additionalInfo,
      ].join("\n"),
    });

    return NextResponse.json(
      { message: "Consultation request sent successfully." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Unable to send email right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
