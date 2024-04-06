import { create } from "zustand";

interface AppState {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isOpen: boolean) => void;

  isRenameModalOpen: boolean;
  setIsRenameModalOpen: (isOpen: boolean) => void;

  fileId: string | null;
  setFileId: (filedId: string) => void;

  filename: string;
  setFilename: (filename: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isDeleteModalOpen: false,
  setIsDeleteModalOpen: (open) => set({ isDeleteModalOpen: open }),

  isRenameModalOpen: false,
  setIsRenameModalOpen: (open) => set({ isRenameModalOpen: open }),

  fileId: null,
  setFileId: (fileId) => set({ fileId }),
  
  filename: "",
  setFilename: (filename) => set({ filename }),
}))