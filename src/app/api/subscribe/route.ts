import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const audienceId = process.env.RESEND_AUDIENCE_ID;
const resendApiKey = process.env.RESEND_API_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not set in environment variables.');
    }

    if (!audienceId) {
      throw new Error('RESEND_AUDIENCE_ID is not set in environment variables.');
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.contacts.create({
      email: email,
      audienceId: audienceId,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Subscription error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
} 
