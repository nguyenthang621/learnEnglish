import { useAppSelector } from '@/stores/hooks';
import { PracticesType } from '@/types/utils.type';
import React, { useState } from 'react';

interface LearningModePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string, mode: PracticesType) => void;
  title?: string;
}

const LearningModePopup: React.FC<LearningModePopupProps> = ({
  isOpen,
  onClose,
  onSelect,
  title = "Choose Learning Mode"
}) => {
  const currentPassageId= useAppSelector(
      (state) => state.root.currentPassageId
  );
  const [selectedMode, setSelectedMode] = useState<PracticesType | null>(null);

  const modes = [
    {
      id: "WRITING" as const,
      title: 'WRITING',
      description: 'Practice WRITING comprehension and vocabulary',
      icon: '📚',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    // {
    //   id: 'SPEAKING' as const,
    //   title: 'SPEAKING',
    //   description: 'Improve pronunciation and speaking skills',
    //   icon: '🎤',
    //   color: 'bg-green-500',
    //   hoverColor: 'hover:bg-green-600',
    //   borderColor: 'border-green-200',
    //   textColor: 'text-green-700'
    // },
    {
      id: 'LISTENING' as const,
      title: 'LISTENING',
      description: 'Practice writing and grammar skills',
      icon: '✍️',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700'
    },
    {
      id: 'READING' as const,
      title: 'READING',
      description: 'Practice reading skills',
      icon: '📚',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700'
    }
  ];

  const handleModeSelect = (mode: PracticesType) => {
    setSelectedMode(mode);
    if (currentPassageId){
      setTimeout(() => {
        onSelect(currentPassageId, mode);
        setSelectedMode(null);
      }, 200);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform animate-slideUp">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">Select your preferred learning method</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-3">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => handleModeSelect(mode.id)}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all duration-200 group
                  ${selectedMode === mode.id 
                    ? `${mode.color} text-white transform scale-105` 
                    : `bg-white ${mode.borderColor} hover:shadow-md hover:border-opacity-60`
                  }
                `}
                disabled={selectedMode !== null}
              >
                <div className="flex items-start space-x-4">
                  <div className={`
                    text-2xl transition-transform duration-200 
                    ${selectedMode === mode.id ? 'scale-110' : 'group-hover:scale-110'}
                  `}>
                    {mode.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`
                      font-semibold text-lg mb-1 transition-colors duration-200
                      ${selectedMode === mode.id 
                        ? 'text-white' 
                        : `${mode.textColor} group-hover:text-opacity-80`
                      }
                    `}>
                      {mode.title}
                    </h3>
                    <p className={`
                      text-sm transition-colors duration-200
                      ${selectedMode === mode.id 
                        ? 'text-white text-opacity-90' 
                        : 'text-gray-600'
                      }
                    `}>
                      {mode.description}
                    </p>
                  </div>
                  <div className={`
                    transition-all duration-200
                    ${selectedMode === mode.id 
                      ? 'text-white' 
                      : 'text-gray-400 group-hover:text-gray-600'
                    }
                  `}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
          <p className="text-xs text-gray-500 text-center">
            You can change your learning mode anytime in settings
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LearningModePopup