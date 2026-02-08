/* eslint-disable @typescript-eslint/no-explicit-any */
// scripts/test-cloudinary.ts
// Run this to verify your Cloudinary credentials are correct

import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

config({ path: '.env.local' });

console.log('🔍 Testing Cloudinary Configuration...\n');

// Check environment variables
console.log('Environment Variables:');
console.log('─────────────────────────────────────');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✓ Set' : '✗ Missing');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Missing');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Missing');
console.log();

// Verify they're not empty strings
if (!process.env.CLOUDINARY_CLOUD_NAME?.trim()) {
  console.error('❌ CLOUDINARY_CLOUD_NAME is empty');
  process.exit(1);
}
if (!process.env.CLOUDINARY_API_KEY?.trim()) {
  console.error('❌ CLOUDINARY_API_KEY is empty');
  process.exit(1);
}
if (!process.env.CLOUDINARY_API_SECRET?.trim()) {
  console.error('❌ CLOUDINARY_API_SECRET is empty');
  process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloudinary Config:');
console.log('─────────────────────────────────────');
console.log('Cloud Name:', cloudinary.config().cloud_name);
console.log('API Key:', cloudinary.config().api_key);
console.log('API Secret:', cloudinary.config().api_secret ? '***' + cloudinary.config().api_secret?.slice(-4) : 'Not set');
console.log();

async function testUpload() {
  try {
    console.log('Testing upload with a simple URL...');
    
    const result = await cloudinary.uploader.upload(
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400',
      {
        folder: 'test',
        public_id: 'test-upload',
      }
    );

    console.log('✅ Upload successful!');
    console.log('Public ID:', result.public_id);
    console.log('URL:', result.secure_url);
    console.log();
    
    // Clean up test image
    console.log('Cleaning up test image...');
    await cloudinary.uploader.destroy(result.public_id);
    console.log('✓ Test image deleted');
    console.log();
    console.log('🎉 Cloudinary is configured correctly!');
    
  } catch (error: any) {
    console.error('❌ Upload failed!');
    console.error('Error:', error.message);
    console.error();
    
    if (error.http_code === 401) {
      console.error('💡 This is an authentication error. Common causes:');
      console.error('   1. API Secret is incorrect (most common)');
      console.error('   2. API Key is incorrect');
      console.error('   3. Cloud Name is incorrect');
      console.error('   4. Extra spaces in your credentials');
      console.error('   5. Credentials are from a different Cloudinary account');
      console.error();
      console.error('📝 How to fix:');
      console.error('   1. Go to https://console.cloudinary.com/');
      console.error('   2. Log in to your account');
      console.error('   3. Go to Settings > API Keys (or Dashboard)');
      console.error('   4. Copy your credentials EXACTLY (no extra spaces)');
      console.error('   5. Update your .env.local file');
      console.error();
      console.error('Your .env.local should look like this:');
      console.error('');
      console.error('CLOUDINARY_CLOUD_NAME=your_cloud_name');
      console.error('CLOUDINARY_API_KEY=123456789012345');
      console.error('CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456');
    }
    
    process.exit(1);
  }
}

testUpload();