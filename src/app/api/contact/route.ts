import { NextResponse } from "next/server";
import { transporter } from "@/lib/brevo";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await transporter.sendMail({
      from: `"Portfolio" jahidul@ewwfl.com`,
      to: "namehiron.96@gmail.com",
      subject: `New Contact Message from ${name}`,
      replyTo: email,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
