import { memo } from 'react';
import { Button } from '../../../components/ui/Button';
import { Trash, X } from 'lucide-react';

interface TodoConfirmModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const TodoConfirmModal = memo(
  ({
    isOpen,
    title,
    onConfirm,
    onCancel,
  }: TodoConfirmModalProps) => {
    // Если модалка закрыта, ничего не рендерим
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 grid place-items-center p-4">
        <div
          className="fixed inset-0 bg-[#0b101b]/80 backdrop-blur-sm"
          onClick={onCancel}
        />

        <div className="relative z-50 w-full max-w-100 overflow-hidden rounded-2xl border border-white/10 bg-[#1e2533] shadow-2xl">
          <div className="p-10 pb-8 text-center">
            {/* Заголовок с увеличенным отступом снизу */}
            <h3 className="mb-6 text-2xl font-black tracking-wider text-white uppercase italic">
              Подтверждение
            </h3>

            {/* Контейнер для текста с хорошим межстрочным интервалом */}
            <div className="flex flex-col gap-4 text-[16px] leading-relaxed font-medium text-gray-400">
              <p>Вы уверены, что хотите удалить задачу</p>

              {/* Название задачи выносим в отдельный блок для контроля отступов */}
              <div className="mt-2 block">
                <span className="font-family-main block text-2xl tracking-tight text-red-500 italic decoration-red-500/30 underline-offset-8">
                  «{title}»
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500 opacity-80">
                Это действие нельзя будет отменить
              </p>
            </div>
          </div>
          <div className="flex gap-3 px-10 pb-10">
            <Button
              onClick={onCancel}
              variant="primary"
              className="flex-1 gap-2 rounded-xl bg-[#2a3447] py-4 text-[13px] font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#364259]"
            >
              <X size={16} strokeWidth={1.5} />
              Отмена
            </Button>
            <Button
              onClick={onConfirm}
              variant="danger"
              className="flex-1 gap-2 rounded-xl bg-blue-600 py-4 text-[13px] font-bold tracking-widest text-white uppercase shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-500 active:scale-95"
            >
              <Trash size={16} strokeWidth={1.5} />
              Удалить
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

TodoConfirmModal.displayName = 'TodoConfirmModal';
