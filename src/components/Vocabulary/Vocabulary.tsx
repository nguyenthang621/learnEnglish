"use client";
import { JSX, useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  BookOpen, 
  Target, 
  Globe, 
  GraduationCap, 
  Users, 
  Briefcase, 
  Heart, 
  Plane,
  PlayCircle,
  Brain,
  Plus,
  Clock,
  CheckCircle,
  RotateCcw,
  Star,
  Folder,
  FolderOpen,
  FileText,
  ArrowLeft,
  Volume2,
  BookMarked
} from 'lucide-react';
import { TopicGroup } from '@/types/vocabulary.type';
import vocabularyAPI from '@/apis/vocabulary.api';
import RiveWrapper from '@/components/Animation/RiveWrapper';
import { BookmarkCollection } from './MyVocabulary';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setCollections } from '@/stores/reducers/sharedReducer';
import BookmarkButtonSimple from '../ExtentionTranslate/BookmarkButtonSimple';

// Type definitions matching API structure
interface ApiTopic {
  id: string;
  groupId: string;
  parentTopicId: string | null;
  title: string;
  slug: string | null;
  sortOrder: number;
  isLeaf: boolean;
  createdAt: string;
  updatedAt: string;
  children: ApiTopic[];
  _count: {topicWords: number}
  type?: 'category' | 'topic';
}

// Extended topic with progress data (mock for now)
interface TopicData extends ApiTopic {
  words?: number;
  learned?: number;
  reviewing?: number;
  mastered?: number;
  children: TopicData[];
  type?: 'category' | 'topic';
}

interface IconMap {
  [key: string]: React.ComponentType<{ className?: string }>;
}

type FilterLevel = 'all' | 'beginner' | 'intermediate' | 'advanced';

const iconMap: IconMap = {
  briefcase: Briefcase,
  graduation: GraduationCap,
  globe: Globe,
  plane: Plane,
  heart: Heart,
  users: Users,
  default: BookOpen
};

// Mock progress data generator
const generateMockProgress = (topicId: string) => {
  // Generate consistent mock data based on topic ID
  const hash = topicId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const words = Math.abs(hash % 200) + 50;
  const learnedPercentage = (Math.abs(hash % 70) + 20) / 100; // 20-90%
  const learned = Math.floor(words * learnedPercentage);
  const reviewing = Math.floor(learned * 0.2);
  const mastered = Math.floor(learned * 0.6);
  
  return { words, learned, reviewing, mastered };
};


// --------------------------detail vocabulary API types-----------------------------

interface GroupResponse {
  group: Group;
}

interface Group {
  id: number;
  title: string;
  image: string | null;
  children: any[]; // nếu sau này có type con thì bổ sung
  vocabularies: Vocabulary[];
}

interface Vocabulary {
  id: number;
  word: string;
  pronunciation: string;
  part_of_speech: string;
  definition_en: string | null;
  definition_vi: string | null;
  examples: VocabularyExample[];
}

interface VocabularyExample {
  id: number;
  name: string;
  acronym: string;
  name_vi: string;
  color: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;

  pivot: VocabularyPivot;
}

interface VocabularyPivot {
  vocabulary_id: number;
  vocabulary_type_id: number;
  level_id: number;
  english_example_sentences: string; // HTML string
  vietnamese_translation: string; // HTML string
}
// -----------------------------



interface ThreePaneVocabularyLayoutProps {}

const Vocabulary: React.FC<ThreePaneVocabularyLayoutProps> = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [detailVocabulary, setDetailVocabulary] = useState<GroupResponse | null>(null);
  const [showVocabularyDetail, setShowVocabularyDetail] = useState<boolean>(false);
  const [expandedVocabularies, setExpandedVocabularies] = useState<Set<number>>(new Set());
  // const [collections, setCollections] = useState<Collection[]>([]);
  const [savingVocabId, setSavingVocabId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<FilterLevel>('all');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [groups, setGroups] = useState<TopicGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const collections = useAppSelector((state) => state.root.collections);
  
  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await vocabularyAPI.getGroupVocvabulary({
        page: 1,
        limit: 10,
      });
      if (response.data && response.data.data) {    
        setGroups(response.data.data);
        // Auto select first group if available
        if (response.data.data.length > 0) {
          setSelectedGroup(response.data.data[0].id);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching groups:", error);
      setLoading(false);
    }
  }

  const fetchDetailGroups = async (groupId: number) => {
    try {
      setLoading(true);
      const response = await vocabularyAPI.getDetailGroupVocvabulary(groupId);
      if (response.data && response.data.data) {    
          setDetailVocabulary(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching detail groups:", error);
      setLoading(false);
    }
  }

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const response = await vocabularyAPI.getBookmarkCollections();
      if (response.data && response.status === 200) {  
        dispatch(setCollections(response.data.data));  
        // setCollections(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Collections:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("selectedTopic changed:", selectedTopic);
    if (selectedTopic){
      fetchDetailGroups(Number(selectedTopic));
      setShowVocabularyDetail(false); // Reset về overview khi chọn topic mới
      setExpandedVocabularies(new Set()); // Reset expanded vocabularies
    }
  }, [selectedTopic]);

  useEffect(() => {
    fetchGroups();
    if (collections.length === 0){
      fetchCollections();
    }
  }, []);

  const handleClickBookmark = async (collection: BookmarkCollection) => {
    try {
      const payload = {name: collection.name, description: collection.description || "", is_default: true, collection_id: collection.id};
      const response = await vocabularyAPI.updateBookmarkCollections(payload)

      if (response.data && response.status === 200) {
        await fetchCollections();
      }
    } catch (error) {
      console.error('Error updating collection:', error);
    } 
  }


  const toggleExpanded = (nodeId: string): void => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleVocabularyExpanded = (vocabId: number): void => {
    const newExpanded = new Set(expandedVocabularies);
    if (newExpanded.has(vocabId)) {
      newExpanded.delete(vocabId);
    } else {
      newExpanded.add(vocabId);
    }
    setExpandedVocabularies(newExpanded);
  };

  const handleSaveVocabulary = async (vocabularyId: number, collectionId: number) => {
    try {
      setSavingVocabId(vocabularyId);
      
      // TODO: Replace with actual API call
      // await vocabularyAPI.addToCollection(vocabularyId, collectionId);
      
      console.log(`Saving vocabulary ${vocabularyId} to collection ${collectionId}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success message (you can use a toast notification library)
      alert('Đã lưu từ vựng vào bộ sưu tập!');
      
      setSavingVocabId(null);
    } catch (error) {
      console.error("Error saving vocabulary:", error);
      alert('Có lỗi xảy ra khi lưu từ vựng');
      setSavingVocabId(null);
    }
  };

  const getSelectedTopicData = (): ApiTopic | null => {
    if (!selectedTopic || !selectedGroup) return null;
    const selectedGroupData = groups.find(g => g.id === selectedGroup);
    if (!selectedGroupData || !selectedGroupData.children) return null;
    
    const cTree = selectedGroupData.children;
    
    // Accept a loose array shape so this works with both API types and local Topic types
    const findTopic = (nodes: any[]): ApiTopic | null => {
      for (const node of nodes) {
        if (node.id === selectedTopic) return node as ApiTopic;
        if (node.children && node.children.length > 0) {
          const found = findTopic(node.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findTopic(cTree);
  };

  const renderTreeNode = (node: TopicData, level: number = 0): JSX.Element => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedTopic === node.id;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all duration-200 ${
            isSelected 
              ? 'bg-blue-100 border border-blue-300 text-blue-900' 
              : 'hover:bg-gray-50 text-gray-700'
          }`}
          style={{ marginLeft: `${level * 20}px` }}
          onClick={() => {
            if (node?.children && node.children.length === 0) {
              setSelectedTopic(node.id);
            } else if (hasChildren) {
              toggleExpanded(node.id);
            }
          }}
        >
          {hasChildren ? (
            <button
              className="p-0.5 hover:bg-gray-200 rounded"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                toggleExpanded(node.id);
              }}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          ) : (
            <div className="w-5 h-4" />
          )}

          {/* Icon based on type */}
          <div className="flex-shrink-0">
            {node.isLeaf ? (
              <FileText className="w-4 h-4 text-gray-500" />
            ) : isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-500" />
            ) : (
              <Folder className="w-4 h-4 text-gray-500" />
            )}
          </div>

          <span className={`text-sm font-medium flex-1 ${
            node.type === 'topic' ? 'text-gray-800' : 'text-gray-900'
          }`}>
            {node.title}
          </span>

          {node.type === 'topic' && node.words && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{node.words} từ</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{node.learned ? Math.round((node.learned / node.words) * 100) : 0}%</span>
              </div>
            </div>
          )}
        </div>

        {hasChildren && isExpanded && node.children && (
          <div className="mt-1">
            {node.children.map((child: TopicData) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const selectedTopicData: TopicData | null = getSelectedTopicData();
  const selectedGroupData: TopicGroup | undefined = groups.find((g: TopicGroup) => g.id === selectedGroup);

  // Get topics tree for selected group
  const getTopicsTree = (): TopicData[] => {
    if (!selectedGroup) return [];
    const groupData = groups.find(g => g.id === selectedGroup);
    return groupData && groupData.children ? groupData.children : [];
  };

  const topicsTree = getTopicsTree();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setFilterLevel(e.target.value as FilterLevel);
  };

  const handleGroupClick = (groupId: string): void => {
    setSelectedGroup(groupId);
    setSelectedTopic(null);
    setExpandedNodes(new Set()); // Reset expanded nodes when switching groups
    setShowVocabularyDetail(false);
    setExpandedVocabularies(new Set());
  };



  const handleActionClick = (action: string, topicId: string): void => {
    console.log(`Action clicked: ${action}`, { selectedTopic, selectedGroup });
    if (action === 'quick-learn' && selectedTopic) {
      window.location.href = `/vocabulary/flashcard/${topicId}`;
    }
    if (action === 'quiz' && selectedTopic) {
      window.location.href = `/vocabulary/quiz/${topicId}`;
    }
  };

  const handleShowVocabularyDetail = (): void => {
    setShowVocabularyDetail(true);
  };

  const handleBackToOverview = (): void => {
    setShowVocabularyDetail(false);
    setExpandedVocabularies(new Set());
  };

  // Render vocabulary list
  const renderVocabularyList = () => {
    if (!detailVocabulary?.group?.vocabularies || detailVocabulary.group.vocabularies.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có từ vựng</h3>
            <p className="text-gray-600">Chủ đề này chưa có từ vựng nào.</p>
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBackToOverview}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Quay lại</span>
            </button>
            <span className="text-sm text-gray-600">
              {detailVocabulary.group.vocabularies.length} từ vựng
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {detailVocabulary.group.title}
          </h2>
        </div>

        {/* Vocabulary List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {detailVocabulary.group.vocabularies.map((vocab, index) => {
              const isExpanded = expandedVocabularies.has(vocab.id);
              const hasExamples = vocab.examples && vocab.examples.length > 0;
              const isSaving = savingVocabId === vocab.id;

              return (
                <div 
                  key={vocab.id} 
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                >
                  {/* Word Header - Always Visible */}
              <div 
                className="p-6 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 justify-between">
                      <div className='flex items-center gap-3'>
                        <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          #{index + 1}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {vocab.word}
                        </h3>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                          <Volume2 className="w-5 h-5 text-blue-600" />
                        </button>
                      </div>
                      
                      {/* BookmarkButton - Hiện khi hover với Tailwind group */}
                      <div className="max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                        <BookmarkButtonSimple
                          collections={collections}
                          onSelectCollection={handleClickBookmark}
                          onSave={(collectionId) => handleSaveVocabulary(vocab.id, collectionId)}
                          isLoading={isSaving}
                          isShowTitle={false}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                      <span className="font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">
                        {vocab.pronunciation}
                      </span>
                      <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg font-medium">
                        {vocab.part_of_speech}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Definitions */}
                <div className="space-y-3">
                  {vocab.definition_vi && (
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-green-700">VI</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">
                        {vocab.definition_vi}
                      </p>
                    </div>
                  )}
                  
                  {vocab.definition_en && (
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-700">EN</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed flex-1 italic">
                        {vocab.definition_en}
                      </p>
                    </div>
                  )}
                </div>

                {/* Examples Toggle Button */}
                {hasExamples && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => toggleVocabularyExpanded(vocab.id)}
                      className="w-full flex items-center justify-between text-left hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <BookMarked className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-700">
                          Ví dụ ({vocab.examples.length})
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                )}
              </div>

                  {/* Examples - Collapsible */}
                  {hasExamples && isExpanded && (
                    <div className="px-6 pb-6 space-y-4 animate-in slide-in-from-top-2">
                      {vocab.examples.map((example, idx) => (
                        <div 
                          key={example.id} 
                          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <span 
                              className="text-xs font-bold px-2 py-1 rounded"
                              style={{ 
                                backgroundColor: `${example.color}20`,
                                color: example.color 
                              }}
                            >
                              {example.acronym}
                            </span>
                            <span className="text-xs text-gray-600 font-medium">{example.name_vi}</span>
                          </div>
                          
                          {/* English Example */}
                          <div 
                            className="text-gray-800 mb-2 leading-relaxed font-medium"
                            dangerouslySetInnerHTML={{ 
                              __html: example.pivot.english_example_sentences 
                            }}
                          />
                          
                          {/* Vietnamese Translation */}
                          <div 
                            className="text-gray-600 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: example.pivot.vietnamese_translation 
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] flex bg-gray-50 max-w-7xl mx-auto m-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Pane 1: Groups Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            Nhóm Từ Vựng
          </h2>
              {/* <RiveWrapper
              src="/streak-normal.riv"
              autoplay
              style={{ width: 300, height: 300 }}
            /> */}
          <RiveWrapper
            src="/rive-fire-green.riv"
            autoplay
            style={{ width: 40, height: 40 }}
          />

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm nhóm..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={filterLevel}
              onChange={handleFilterChange}
              className="flex-1 py-1.5 px-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả cấp độ</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Groups List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {groups.map((group: TopicGroup) => {
            const IconComponent = iconMap.default; // Use default icon since API doesn't provide icon field
            const isSelected = selectedGroup === group.id;
            
            return (
              <div
                key={group.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                }`}
                onClick={() => handleGroupClick(group.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative mr-1 flex-shrink-0">
                    <img
                      src={group.image || ""}
                      alt={group.title}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    {/* Fallback icon */}
                    <div className={`hidden w-12 h-12 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        isSelected ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm mb-1 ${
                      isSelected ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {group.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {group.description}
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">{group.children.length || 0} chủ đề</span>
                      <span className="text-gray-500">
                        {/* {new Date(group.createdAt).toLocaleDateString('vi-VN')} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {groups.length === 0 && !loading && (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Không tìm thấy nhóm nào</p>
            </div>
          )}
        </div>
      </div>

      {/* Pane 2: Topics Tree */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {selectedGroupData?.title || 'Chọn nhóm'}
          </h2>
          <p className="text-sm text-gray-600">
            {selectedGroupData ? 'Chọn chủ đề để xem chi tiết' : 'Hãy chọn một nhóm từ vựng'}
          </p>
        </div>

        {/* Tree View */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedGroup && topicsTree.length > 0 ? (
            <div className="space-y-1">
              {topicsTree.map((node: TopicData) => renderTreeNode(node))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Folder className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">
                  {selectedGroup ? 'Không có chủ đề nào' : 'Chọn một nhóm để xem chủ đề'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pane 3: Topic Detail or Vocabulary List */}
      <div className="flex-1 bg-white flex flex-col">
        {showVocabularyDetail && detailVocabulary ? (
          renderVocabularyList()
        ) : selectedTopicData ? (
          <>
            {/* Header */}
            <div className="p-[22px] border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedTopicData.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {selectedTopicData["_count"]?.topicWords || 0 || 0} từ vựng
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      ~{Math.ceil((selectedTopicData["_count"]?.topicWords || 0 || 0) / 0.6)} phút
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleShowVocabularyDetail}
                    className="bg-green-500 hover:bg-[#00c956] text-black px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    Xem Chi Tiết
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Progress Overview */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {selectedTopicData.learned || 0}
                  </div>
                  <div className="text-sm text-blue-700 font-medium">Đã học</div>
                  <div className="text-xs text-blue-600 mt-1">
                    {selectedTopicData.words ? Math.round(((selectedTopicData.learned || 0) / selectedTopicData.words) * 100) : 0}%
                  </div>
                </div>

                <div className="bg-orange-50 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <RotateCcw className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {selectedTopicData.reviewing || 0}
                  </div>
                  <div className="text-sm text-orange-700 font-medium">Đang ôn</div>
                  <div className="text-xs text-orange-600 mt-1">
                    {selectedTopicData.words ? Math.round(((selectedTopicData.reviewing || 0) / selectedTopicData.words) * 100) : 0}%
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {selectedTopicData.mastered || 0}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Thành thạo</div>
                  <div className="text-xs text-green-600 mt-1">
                    {selectedTopicData.words ? Math.round(((selectedTopicData.mastered || 0) / selectedTopicData.words) * 100) : 0}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Tiến độ tổng thể</span>
                  <span className="text-sm text-gray-600">
                    {selectedTopicData.words ? Math.round(((selectedTopicData.learned || 0) / selectedTopicData.words) * 100) : 0}% hoàn thành
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="flex h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500"
                      style={{ width: selectedTopicData.words ? `${((selectedTopicData.mastered || 0) / selectedTopicData.words) * 100}%` : '0%' }}
                    ></div>
                    <div 
                      className="bg-orange-400"
                      style={{ width: selectedTopicData.words ? `${((selectedTopicData.reviewing || 0) / selectedTopicData.words) * 100}%` : '0%' }}
                    ></div>
                    <div 
                      className="bg-blue-400"
                      style={{ width: selectedTopicData.words ? `${(((selectedTopicData.learned || 0) - (selectedTopicData.mastered || 0) - (selectedTopicData.reviewing || 0)) / selectedTopicData.words) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Mô tả</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 leading-relaxed">
                    Chủ đề này bao gồm các từ vựng cần thiết cho {selectedTopicData.title.toLowerCase()}. 
                    Bạn sẽ học được {selectedTopicData["_count"]?.topicWords || 0 || 0} từ vựng quan trọng với các ví dụ thực tế 
                    và bài tập tương tác để củng cố kiến thức.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Hành động</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleActionClick('quick-learn', selectedTopicData.id)}
                    className="flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                  >
                    <PlayCircle className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-semibold">Học nhanh</div>
                      <div className="text-sm opacity-90">Flashcards + Ôn tập</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleActionClick('quiz', selectedTopicData.id)}
                    className="flex items-center gap-3 p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
                  >
                    <Brain className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-semibold">Quiz</div>
                      <div className="text-sm opacity-90">Kiểm tra kiến thức</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleActionClick('add-to-roadmap', selectedTopicData.id)}
                    className="flex items-center gap-3 p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                  >
                    <Plus className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-semibold">Thêm vào lộ trình</div>
                      <div className="text-sm opacity-90">Lên kế hoạch học</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleActionClick('review', selectedTopicData.id)}
                    className="flex items-center gap-3 p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors"
                  >
                    <Star className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-semibold">Ôn tập</div>
                      <div className="text-sm opacity-90">Từ đã học</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Chọn chủ đề để học</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Hãy chọn một chủ đề từ danh sách bên trái để xem chi tiết và bắt đầu học từ vựng
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vocabulary;