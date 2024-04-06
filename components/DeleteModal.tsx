"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "@/firebase"
import { deleteDoc, doc } from "firebase/firestore"
import toast from "react-hot-toast"

export function DeleteModal() {
  const { user } = useUser()

  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore(state => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.fileId,
    state.setFileId
  ])

  async function deleteFile() {
    if(!user || !fileId) return

    const toastId = toast.loading('Deleting the file...')

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

    try{
      deleteObject(fileRef).then(async () => {
        deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
          console.log("Document successfully deleted!")

          toast.success('File deleted successfully', { id: toastId })
        })
      }).finally(() => {
        setIsDeleteModalOpen(false)
      })
    } catch (error) {
      console.error('Error deleting file:', error)
      setIsDeleteModalOpen(false)

      toast.error('Error deleting file', { id: toastId })
    }
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you shure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the file.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <Button
            size='sm'
            className="px-3 flex-1"
            variant={"destructive"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size='sm'
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
