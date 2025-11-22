import React, { useState } from 'react';
import { Bookmark, ChevronDown } from 'lucide-react';
import PopoverClick from '../Popover/PopoverClick';


interface Collection {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  bookmarks_count: number;
}

interface BookmarkButtonProps {
  collections: Collection[];
  onSave?: (collectionId: number) => void;
  onSelectCollection?: (collection: Collection) => void;
  isLoading?: boolean;
  className?: string;
  isShowTitle?: boolean;
}

export default function BookmarkButtonSimple({ 
  collections, 
  onSave, 
  onSelectCollection,
  isLoading = false,
  className = '',
  isShowTitle = true,
}: BookmarkButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Tìm collection mặc định
  const defaultCollection = collections.find(c => c.is_default) || collections[0];
  const [selectedCollection, setSelectedCollection] = useState(defaultCollection);

  const handleAddWord = () => {
    if (onSave) {
      onSave(selectedCollection.id);
    }
  };

  const handleSelectCollection = (collection: Collection) => {
    onSelectCollection && onSelectCollection(collection);
    setSelectedCollection(collection);
    setIsOpen(false);
  };

  const renderCollectionMenu = (
    <div className="w-64 rounded-lg bg-white shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
      <div className="p-2">
        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
          Chọn bộ sưu tập
        </div>
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => handleSelectCollection(collection)}
            className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
              selectedCollection.id === collection.id
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{collection.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {collection.bookmarks_count} từ
                  {collection.is_default && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Mặc định
                    </span>
                  )}
                </div>
              </div>
              {selectedCollection.id === collection.id && (
                <svg className="w-5 h-5 text-blue-600 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`relative w-full ${className} z-20`}>
      <div className="flex items-center gap-0 w-full">
        {/* Nút chính - Lưu từ */}
        <button
          onClick={handleAddWord}
          disabled={isLoading}
          className="flex items-center justify-center rounded-l-lg bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <Bookmark className="w-4 h-4 flex-shrink-0" />
          {isShowTitle && <span className="truncate ml-2">Lưu vào: {selectedCollection.name}</span>}
        </button>

        {/* Nút dropdown với Popover */}
        <PopoverClick
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          renderPopover={renderCollectionMenu}
          placement="bottom-end"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            disabled={isLoading}
            className="rounded-r-lg bg-blue-500 px-1 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm border-l border-blue-400"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </PopoverClick>
      </div>
    </div>
  );
}