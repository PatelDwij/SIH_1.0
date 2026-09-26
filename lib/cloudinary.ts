export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  resource_type?: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  duration?: number;
  created_at?: string;
}

export interface CloudinaryUploadError {
  message: string;
  http_code?: number;
}

/**
 * Uploads an image, video, or media file to Cloudinary using an unsigned upload preset.
 *
 * @param file - The File object to upload (captured from input or dropzone)
 * @returns Promise<{ secure_url: string; public_id: string; ... }>
 */
export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResponse> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName) {
    throw new Error(
      "Missing Cloudinary Cloud Name. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in .env.local"
    );
  }

  if (!uploadPreset) {
    throw new Error(
      "Missing Cloudinary Upload Preset. Please set NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local"
    );
  }

  if (!file) {
    throw new Error("No file provided for upload.");
  }

  // Determine resource type: auto allows Cloudinary to detect image vs video automatically
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data?.error?.message || `Cloudinary upload failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      resource_type: data.resource_type,
      format: data.format,
      bytes: data.bytes,
      width: data.width,
      height: data.height,
      duration: data.duration,
      created_at: data.created_at,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error during media upload.";
    console.error("[Cloudinary Upload Error]:", message);
    throw new Error(message);
  }
}
