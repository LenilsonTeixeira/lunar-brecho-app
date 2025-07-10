import { X, AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  type = 'danger',
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  const getTypeConfig = () => {
    switch (type) {
      case 'danger':
        return {
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          buttonColor: 'bg-red-600 hover:bg-red-700',
        };
      case 'warning':
        return {
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          buttonColor: 'bg-orange-600 hover:bg-orange-700',
        };
      case 'info':
        return {
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          buttonColor: 'bg-blue-600 hover:bg-blue-700',
        };
      default:
        return {
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          buttonColor: 'bg-red-600 hover:bg-red-700',
        };
    }
  };

  const config = getTypeConfig();

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-md'>
        <div className='p-6'>
          <div className='flex items-start gap-4'>
            <div
              className={`flex-shrink-0 w-10 h-10 ${config.bgColor} rounded-full flex items-center justify-center`}
            >
              <AlertTriangle className={`w-5 h-5 ${config.iconColor}`} />
            </div>
            <div className='flex-1'>
              <h3 className='text-lg font-semibold text-slate-800 mb-2'>{title}</h3>
              <p className='text-sm text-slate-600'>{message}</p>
            </div>
            <button
              onClick={onCancel}
              className='flex-shrink-0 p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors'
            >
              <X className='w-4 h-4' />
            </button>
          </div>
        </div>

        <div className='px-6 pb-6'>
          <div className='flex gap-3'>
            <button
              onClick={onCancel}
              className='flex-1 py-2 px-4 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors duration-200'
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-2 px-4 text-white font-medium rounded-lg transition-colors duration-200 ${config.buttonColor}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
