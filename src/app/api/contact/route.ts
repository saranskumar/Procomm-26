import { NextResponse } from "next/server";
import { z } from "zod";

// Same validation schema on the backend for maximum safety
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  institution: z.string().min(3),
  role: z.string().min(1),
  message: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Parse/validate request body
    const parseResult = contactSchema.safeParse(body);
    
    if (!parseResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Validation failed.", 
          errors: parseResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }
    
    const { name, email, institution, role, message } = parseResult.data;
    
    // In a real-world project, this is where we would save the data to a database
    // (e.g. Supabase, Prisma) or send an email notification using Resend/SendGrid.
    console.log(`[Contact Submission Received]
      Name: ${name}
      Email: ${email}
      Institution: ${institution}
      Role: ${role}
      Message: ${message}
    `);

    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      message: "Your submission was received. We will get back to you soon!",
    });
  } catch (error) {
    console.error("API error during contact submission:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
