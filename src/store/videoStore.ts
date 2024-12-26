import { create } from 'zustand';
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Video } from '../types/video';
import { extractVideoInfo } from '../utils/videoUtils';

interface VideoState {
  videos: Video[];
  loading: boolean;
  error: string | null;
  addVideo: (url: string, userId: string) => Promise<void>;
  fetchUserVideos: (userId: string) => Promise<void>;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  loading: false,
  error: null,

  addVideo: async (url: string, userId: string) => {
    try {
      set({ loading: true, error: null });
      const videoInfo = await extractVideoInfo(url);

      const video: Video = {
        createdAt: Date.now(),
        status: 'pending',
        ...videoInfo
      };
      
      const docRef = await addDoc(collection(db, 'videos'), video);
      const newVideo = { ...video, id: docRef.id } as Video;
      
      set(state => ({
        videos: [...state.videos, newVideo],
        loading: false
      }));
    } catch (error) {
      console.error('Error adding video:', error);
      set({ error: 'Failed to add video', loading: false });
    }
  },

  fetchUserVideos: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const videosRef = collection(db, 'videos');
      const q = query(
        videosRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const videos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];

      set({ videos, loading: false });
    } catch (error) {
      console.error('Error fetching videos:', error);
      set({ error: 'Failed to fetch videos', loading: false });
    }
  }
}));