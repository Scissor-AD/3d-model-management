import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, signUpForNews, subject, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const db = await getDb();

    await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      subject,
      message,
      signUpForNews: !!signUpForNews,
      createdAt: new Date(),
    });

    if (signUpForNews) {
      await db.collection('newsletter').updateOne(
        { email },
        {
          $set: { email, firstName, lastName, updatedAt: new Date() },
          $setOnInsert: { subscribedAt: new Date() },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
