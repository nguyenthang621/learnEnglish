"use client";
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  BookOpen, 
  X, 
  Check,
  Search,
  Star,
  Save,
  Bookmark,
  ArrowRight,
  AlertCircle,
  MoveRight,
  FolderInput,
  Volume2
} from 'lucide-react';
import vocabularyAPI from '@/apis/vocabulary.api';

interface VocabularyType {
  id: number;
  name: string;
  acronym: string;
  name_vi: string;
}

interface Vocabulary {
  id: number;
  word: string;
  level_id: number;
  pronunciation: string;
  part_of_speech: string | null;
  definition_en: string | null;
  definition_vi: string;
  vocabulary_type: VocabularyType[];
  audio_url: string | null;
  image_url: string | null;
  note: string | null;
  frequency_rank: number | null;
  is_irregular: boolean;
  created_at: string;
  updated_at: string;
  label_search: string;
}

interface Bookmark {
  id: number;
  user_id: number;
  collection_id: number;
  bookmarkable_type: string;
  bookmarkable_id: number;
  personal_note: string | null;
  metadata: any;
  created_at: string;
  updated_at: string;
  bookmarkable: Vocabulary;
}

interface BookmarkCollection {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  bookmarks?: Bookmark[];
}

export default function MyBookmarks() {
  const [collections, setCollections] = useState<BookmarkCollection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Modals
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  
  // Editing states
  const [editingCollection, setEditingCollection] = useState<BookmarkCollection | null>(null);
  const [movingBookmark, setMovingBookmark] = useState<Bookmark | null>(null);
  const [targetCollectionId, setTargetCollectionId] = useState<number | null>(null);
  const [editingNote, setEditingNote] = useState<{ bookmarkId: number; note: string } | null>(null);
  
  // Forms
  const [collectionForm, setCollectionForm] = useState({ 
    name: '', 
    description: '', 
    is_default: false 
  });


  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await vocabularyAPI.getBookmarkCollections();
      if (response.data && response.data.data) {    
        setCollections(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Collections:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    if (selectedCollection) {
      loadCollectionDetail(selectedCollection);
    }
  }, [selectedCollection]);


    const loadCollectionDetail = async (collectionId: number) => {
    try {
        const response = await vocabularyAPI.getDeatilBookmarkCollections(collectionId);
        if (response.status !== 200) return;

        const { bookmarks } = response.data; // Destructure để lấy bookmarks
        
        setCollections(prev => prev.map(col => 
        col.id === collectionId 
            ? { ...col, bookmarks } // Spread operator để giữ nguyên properties khác
            : col
        ));
    } catch (error) {
        console.error('Error loading collection detail:', error);
    }
    };

  const handleCreateCollection = async () => {
    if (!collectionForm.name.trim()) return;

    try {
      setLoading(true);
      const response = await fetch('/api/auth/bookmark-collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(collectionForm)
      });

      if (response.ok) {
        await fetchCollections();
        setCollectionForm({ name: '', description: '', is_default: false });
        setShowCollectionModal(false);
      }
    } catch (error) {
      console.error('Error creating collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCollection = async () => {
    if (!editingCollection || !collectionForm.name.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/auth/bookmark-collections/${editingCollection.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(collectionForm)
      });

      if (response.ok) {
        await fetchCollections();
        setCollectionForm({ name: '', description: '', is_default: false });
        setEditingCollection(null);
        setShowCollectionModal(false);
      }
    } catch (error) {
      console.error('Error updating collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCollection = async (collectionId: number) => {
    if (!confirm('Bạn có chắc muốn xóa bộ sưu tập này? Tất cả từ vựng sẽ bị xóa khỏi bookmark.')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/auth/bookmark-collections/${collectionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.ok) {
        await fetchCollections();
        if (selectedCollection === collectionId) {
          setSelectedCollection(null);
        }
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveVocabulary = async () => {
    if (!movingBookmark || !targetCollectionId || !selectedCollection) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/auth/vocabularies/${movingBookmark.bookmarkable_id}/bookmark/move`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          to_collection_id: targetCollectionId,
          from_collection_id: selectedCollection
        })
      });

      if (response.ok) {
        // Reload both collections
        await loadCollectionDetail(selectedCollection);
        await loadCollectionDetail(targetCollectionId);
        await fetchCollections(); // Update counts
        
        setShowMoveModal(false);
        setMovingBookmark(null);
        setTargetCollectionId(null);
      }
    } catch (error) {
      console.error('Error moving vocabulary:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromBookmark = async (bookmarkId: number) => {
    if (!confirm('Bạn có chắc muốn xóa từ này khỏi bookmark?')) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/auth/bookmarks/${bookmarkId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.ok && selectedCollection) {
        await loadCollectionDetail(selectedCollection);
        await fetchCollections(); // Update counts
      }
    } catch (error) {
      console.error('Error removing from bookmark:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (bookmarkId: number, note: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/auth/bookmarks/${bookmarkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ personal_note: note })
      });

      if (response.ok && selectedCollection) {
        await loadCollectionDetail(selectedCollection);
        setEditingNote(null);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedCollectionData = collections.find(c => c.id === selectedCollection);
  const bookmarks = selectedCollectionData?.bookmarks || [];
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const vocab = bookmark.bookmarkable;
    return vocab.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
           vocab.definition_vi.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (bookmark.personal_note && bookmark.personal_note.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const colorClasses: { [key: string]: string } = {
    default: 'border-blue-500 bg-blue-50',
    normal: 'border-gray-300 bg-white'
  };

  return (
    <div className="h-[90vh] flex max-w-7xl mx-auto m-6 border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Pane 1: Collections */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-500" />
            Bộ Sưu Tập Của Tôi
          </h2>

          <button
            onClick={() => {
              setEditingCollection(null);
              setCollectionForm({ name: '', description: '', is_default: false });
              setShowCollectionModal(true);
            }}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Tạo Bộ Sưu Tập
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading && collections.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Đang tải...
            </div>
          ) : collections.length === 0 ? (
            <div className="text-center py-8">
              <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Chưa có bộ sưu tập nào</p>
            </div>
          ) : (
            collections.map(collection => {
              const isSelected = selectedCollection === collection.id;
              return (
                <div
                  key={collection.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all group ${
                    isSelected 
                      ? collection.is_default
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-indigo-500 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => setSelectedCollection(collection.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {collection.is_default ? (
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-indigo-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm truncate">{collection.name}</h3>
                        {collection.is_default && (
                          <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded">
                            Mặc định
                          </span>
                        )}
                      </div>
                      {collection.description && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{collection.description}</p>
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {collection.bookmarks?.length || 0} từ vựng
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCollection(collection);
                          setCollectionForm({
                            name: collection.name,
                            description: collection.description || '',
                            is_default: collection.is_default
                          });
                          setShowCollectionModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {!collection.is_default && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCollection(collection.id);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Pane 2: Vocabularies */}
      <div className="flex-1 bg-white flex flex-col">
        {selectedCollectionData ? (
          <>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{selectedCollectionData.name}</h1>
                    {selectedCollectionData.is_default && (
                      <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  {selectedCollectionData.description && (
                    <p className="text-sm text-gray-600 mb-2">{selectedCollectionData.description}</p>
                  )}
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    {selectedCollectionData.bookmarks?.length || 0} từ vựng đã lưu
                  </div>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm từ vựng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
            {loading && !filteredBookmarks.length ? (
                <div className="text-center py-12 text-gray-500">
                Đang tải từ vựng...
                </div>
            ) : filteredBookmarks.length === 0 ? (
                <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                    {searchTerm ? 'Không tìm thấy từ vựng nào' : 'Chưa có từ vựng nào trong bộ sưu tập này'}
                </p>
                </div>
            ) : (
                <div className="space-y-3">
                {filteredBookmarks.map(bookmark => {
                    const vocab = bookmark.bookmarkable;
                    return (
                    <div
                        key={bookmark.id}
                        className="group relative bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-150"
                    >
                        {/* Main Content */}
                        <div className="p-6">
                        {/* Word Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                            <div className="flex items-baseline gap-3 mb-2">
                                <h4 className="text-2xl font-semibold text-gray-900">
                                {vocab.word}
                                </h4>
                                {vocab.pronunciation && (
                                <span className="text-sm text-gray-500 font-mono">
                                    /{vocab.pronunciation}/
                                </span>
                                )}
                                {vocab.audio_url && (
                                <button
                                    onClick={() => {
                                    const audio = new Audio(vocab.audio_url!);
                                    audio.play();
                                    }}
                                    className="ml-2 p-1.5 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                                    title="Phát âm"
                                >
                                    <Volume2 className="w-4 h-4" />
                                </button>
                                )}
                            </div>

                            {/* Tags - MongoDB style: simple, flat */}
                            <div className="flex flex-wrap items-center gap-2">
                                {vocab.part_of_speech && (
                                <span className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                                    {vocab.part_of_speech}
                                </span>
                                )}
                                {vocab.vocabulary_type?.map(type => (
                                <span 
                                    key={type.id} 
                                    className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50 rounded"
                                >
                                    {type.name_vi}
                                </span>
                                ))}
                                {vocab.is_irregular && (
                                <span className="px-2 py-0.5 text-xs font-medium text-orange-700 bg-orange-50 rounded">
                                    Irregular
                                </span>
                                )}
                                {vocab.frequency_rank && (
                                <span className="px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-50 rounded">
                                    #{vocab.frequency_rank}
                                </span>
                                )}
                            </div>
                            </div>

                            {/* Actions - Hidden until hover */}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                            <button
                                onClick={() => {
                                setMovingBookmark(bookmark);
                                setTargetCollectionId(null);
                                setShowMoveModal(true);
                                }}
                                className="p-2 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors"
                                title="Di chuyển"
                            >
                                <FolderInput className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleRemoveFromBookmark(bookmark.id)}
                                className="p-2 rounded hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                                title="Xóa"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            </div>
                        </div>

                        {/* Definitions */}
                        <div className="space-y-3">
                            {/* Vietnamese Definition */}
                            <div className="flex gap-3">
                            <div className="flex-shrink-0 w-6 pt-0.5">
                                <span className="inline-block w-6 h-6 rounded bg-gray-900 text-white text-xs font-semibold leading-6 text-center">
                                VI
                                </span>
                            </div>
                            <div className="flex-1 pt-0.5">
                                <p className="text-base text-gray-900 leading-relaxed">
                                {vocab.definition_vi}
                                </p>
                            </div>
                            </div>

                            {/* English Definition */}
                            {vocab.definition_en && (
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-6 pt-0.5">
                                <span className="inline-block w-6 h-6 rounded bg-gray-500 text-white text-xs font-semibold leading-6 text-center">
                                    EN
                                </span>
                                </div>
                                <div className="flex-1 pt-0.5">
                                <p className="text-base text-gray-700 leading-relaxed">
                                    {vocab.definition_en}
                                </p>
                                </div>
                            </div>
                            )}

                            {/* Vocabulary Note */}
                            {vocab.note && (
                            <div className="flex gap-3 p-3 bg-blue-50 rounded border border-blue-100">
                                <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-900 leading-relaxed">
                                {vocab.note}
                                </p>
                            </div>
                            )}
                        </div>

                        {/* Personal Note Section */}
                        {(bookmark.personal_note || editingNote?.bookmarkId === bookmark.id) ? (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 pt-0.5">
                                <span className="text-sm font-medium text-gray-700">Note</span>
                                </div>
                                <div className="flex-1">
                                {editingNote?.bookmarkId === bookmark.id ? (
                                    <div className="space-y-2">
                                    <textarea
                                        value={editingNote.note}
                                        onChange={(e) => setEditingNote({ ...editingNote, note: e.target.value })}
                                        className="w-full text-sm text-gray-900 bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                        rows={3}
                                        placeholder="Thêm ghi chú cá nhân..."
                                    />
                                    <div className="flex gap-2">
                                        <button
                                        onClick={() => handleUpdateNote(bookmark.id, editingNote.note)}
                                        className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                                        >
                                        Save
                                        </button>
                                        <button
                                        onClick={() => setEditingNote(null)}
                                        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                        >
                                        Cancel
                                        </button>
                                    </div>
                                    </div>
                                ) : (
                                    <div className="group/note flex items-start gap-2">
                                    <p className="flex-1 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {bookmark.personal_note}
                                    </p>
                                    <button
                                        onClick={() => setEditingNote({ 
                                        bookmarkId: bookmark.id, 
                                        note: bookmark.personal_note || '' 
                                        })}
                                        className="flex-shrink-0 p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 opacity-0 group-hover/note:opacity-100 transition-all"
                                        title="Chỉnh sửa"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    </div>
                                )}
                                </div>
                            </div>
                            </div>
                        ) : (
                            <button
                            onClick={() => setEditingNote({ bookmarkId: bookmark.id, note: '' })}
                            className="mt-4 pt-4 w-full text-left border-t border-gray-200 text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
                            >
                            <Edit2 className="w-3.5 h-3.5" />
                            Add a personal note
                            </button>
                        )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                            Saved {new Date(bookmark.created_at).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                            </div>
                            {bookmark.updated_at !== bookmark.created_at && (
                            <div className="text-xs text-gray-500">
                                Updated {new Date(bookmark.updated_at).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                                })}
                            </div>
                            )}
                        </div>
                        </div>
                    </div>
                    );
                })}
                </div>
            )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chọn bộ sưu tập</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Hãy chọn một bộ sưu tập từ danh sách bên trái để xem các từ vựng đã lưu
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Collection Modal */}
      {showCollectionModal && (
        <div className="fixed inset-0 bg-slate-900/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {editingCollection ? 'Chỉnh Sửa Bộ Sưu Tập' : 'Tạo Bộ Sưu Tập Mới'}
              </h3>
              <button onClick={() => setShowCollectionModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên bộ sưu tập *</label>
                <input
                  type="text"
                  value={collectionForm.name}
                  onChange={(e) => setCollectionForm({ ...collectionForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Từ vựng IELTS, Business English..."
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={collectionForm.description}
                  onChange={(e) => setCollectionForm({ ...collectionForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Mô tả về bộ sưu tập này..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_default"
                  checked={collectionForm.is_default}
                  onChange={(e) => setCollectionForm({ ...collectionForm, is_default: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="is_default" className="text-sm text-gray-700 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Đặt làm bộ sưu tập mặc định
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={editingCollection ? handleUpdateCollection : handleCreateCollection}
                  disabled={loading || !collectionForm.name.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>Đang xử lý...</>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      {editingCollection ? 'Cập Nhật' : 'Tạo'}
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowCollectionModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Move Vocabulary Modal */}
      {showMoveModal && movingBookmark && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Di Chuyển Từ Vựng</h3>
              <button onClick={() => setShowMoveModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">{movingBookmark.bookmarkable.word}</span>
                  {movingBookmark.bookmarkable.pronunciation && (
                    <span className="text-sm text-blue-700">/{movingBookmark.bookmarkable.pronunciation}/</span>
                  )}
                </div>
                <p className="text-sm text-gray-700">{movingBookmark.bookmarkable.definition_vi}</p>
                {movingBookmark.personal_note && (
                  <p className="text-xs text-yellow-700 mt-2 italic">📝 {movingBookmark.personal_note}</p>
                )}
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="font-medium">{selectedCollectionData?.name}</span>
                <MoveRight className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400">Chọn bộ sưu tập đích</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn bộ sưu tập đích *
                </label>
                <select
                  value={targetCollectionId || ''}
                  onChange={(e) => setTargetCollectionId(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn bộ sưu tập --</option>
                  {collections
                    .filter(c => c.id !== selectedCollection)
                    .map(collection => (
                      <option key={collection.id} value={collection.id}>
                        {collection.name} ({collection.bookmarks?.length || 0} từ)
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  Từ vựng sẽ được di chuyển từ bộ sưu tập hiện tại sang bộ sưu tập đích.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleMoveVocabulary}
                  disabled={loading || !targetCollectionId}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>Đang di chuyển...</>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Xác Nhận Di Chuyển
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowMoveModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}