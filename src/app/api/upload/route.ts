import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse: unknown = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'techinsight_covers' },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      ).end(buffer);
    });

    const secureUrl =
      typeof uploadResponse === 'object' &&
      uploadResponse !== null &&
      'secure_url' in uploadResponse &&
      typeof (uploadResponse as { secure_url?: string }).secure_url === 'string'
        ? (uploadResponse as { secure_url: string }).secure_url
        : null;

    return NextResponse.json({ success: true, url: secureUrl });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
