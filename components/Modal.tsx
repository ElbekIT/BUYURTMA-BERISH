import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  actions?: ReactNode
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-card border border-border rounded-2xl shadow-xl">
              {title && (
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="text-xl font-bold text-foreground">{title}</h2>
                </div>
              )}

              <div className="px-6 py-4">{children}</div>

              {actions && (
                <div className="px-6 py-4 border-t border-border flex gap-3 justify-end">
                  {actions}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export const SuccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Muvaffaqiyatli!"
      actions={<Button onClick={onClose}>Yopish</Button>}
    >
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-green-500 mx-auto animate-bounce"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-foreground font-medium">
          Buyurtmangiz qabul qilindi!
        </p>
        <p className="text-muted-foreground text-sm mt-2">
          Tez orada biz siz bilan bog&apos;lanamiz.
        </p>
      </div>
    </Modal>
  )
}

export const ErrorModal = ({
  isOpen,
  onClose,
  message,
}: {
  isOpen: boolean
  onClose: () => void
  message: string
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Xato!"
      actions={<Button onClick={onClose}>Qayta urinish</Button>}
    >
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-destructive mx-auto"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="text-foreground font-medium">Xato yuz berdi</p>
        <p className="text-muted-foreground text-sm mt-2">{message}</p>
      </div>
    </Modal>
  )
}
