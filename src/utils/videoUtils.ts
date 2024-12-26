const YOUTUBE_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;
const INSTAGRAM_REGEX = /^(https?:\/\/)?(www\.)?(instagram\.com\/reels?\/[a-zA-Z0-9_-]+)/;
const TIKTOK_REGEX = /^(https?:\/\/)?(www\.)?(tiktok\.com\/@[\w.-]+\/video\/\d+)/;

export function getVideoPlatform(url: string) {
  if (YOUTUBE_REGEX.test(url)) return 'youtube';
  if (INSTAGRAM_REGEX.test(url)) return 'instagram';
  if (TIKTOK_REGEX.test(url)) return 'tiktok';
  return null;
}

export function validateVideoUrl(url: string): boolean {
  return Boolean(getVideoPlatform(url));
}

export function extractVideoId(url: string, platform: string): string {
  switch (platform) {
    case 'youtube': {
      const match = url.match(YOUTUBE_REGEX);
      return match?.[4] || '';
    }
    case 'instagram': {
      const match = url.match(INSTAGRAM_REGEX);
      return match?.[3] || '';
    }
    case 'tiktok': {
      const match = url.match(TIKTOK_REGEX);
      return match?.[3] || '';
    }
    default:
      return '';
  }
}

export interface VideoInfo {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  platform: 'youtube' | 'instagram' | 'tiktok';
  url: string;
  userId: string;
}

export async function extractVideoInfo(url: string): Promise<VideoInfo> {
  const response = await fetch(`/api/video-info?url=${encodeURIComponent(url)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch video info');
  }
  return response.json();
}