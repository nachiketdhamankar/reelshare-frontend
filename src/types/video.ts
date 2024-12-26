export interface Video {
    id: string;
    url: string;
    title: string;
    platform: 'youtube' | 'instagram' | 'tiktok';
    userId: string;
    createdAt: number;
    transcription?: string;
    status: 'pending' | 'transcribing' | 'completed' | 'error';
  }