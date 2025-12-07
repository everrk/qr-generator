import React, { useState, useEffect } from 'react';
import {
  Upload,
  Search,
  Download,
  Eye,
  Trash2,
  FolderOpen,
  Image,
  Video,
  FileText,
  Tag,
  Calendar,
  User,
  Bell,
  LogOut,
  Shield,
  Edit,
} from 'lucide-react';

const AssetLibrary = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedClient, setSelectedClient] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [notifications, setNotifications] = useState([]);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    type: 'image',
    client: '',
    project: '',
    tags: '',
  });

  const users = [
    { id: 1, username: 'admin', password: 'admin123', name: 'أحمد المدير', role: 'admin' },
    { id: 2, username: 'designer', password: 'design123', name: 'فاطمة المصممة', role: 'designer' },
    { id: 3, username: 'content', password: 'content123', name: 'سارة المحتوى', role: 'content' },
    { id: 4, username: 'viewer', password: 'view123', name: 'خالد العميل', role: 'viewer' },
  ];

  const rolePermissions = {
    admin: { view: true, upload: true, edit: true, delete: true },
    designer: { view: true, upload: true, edit: true, delete: false },
    content: { view: true, upload: true, edit: false, delete: false },
    viewer: { view: true, upload: false, edit: false, delete: false },
  };

  useEffect(() => {
    if (currentUser) {
      const sampleAssets = [
        {
          id: 1,
          name: 'بوستر حملة رمضان',
          type: 'image',
          client: 'شركة النور',
          project: 'حملة رمضان 2024',
          tags: ['رمضان', 'سوشال ميديا', 'بوستر'],
          uploadedBy: 'أحمد',
          uploadDate: '2024-03-15',
          size: '2.5 MB',
          thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&h=300&fit=crop',
        },
        {
          id: 2,
          name: 'فيديو موشن جرافيك',
          type: 'video',
          client: 'متجر الأزياء',
          project: 'إطلاق المجموعة الصيفية',
          tags: ['موشن', 'فيديو', 'إعلان'],
          uploadedBy: 'فاطمة',
          uploadDate: '2024-03-14',
          size: '45 MB',
          thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop',
        },
        {
          id: 3,
          name: 'محتوى إعلاني - نصوص',
          type: 'document',
          client: 'شركة النور',
          project: 'حملة رمضان 2024',
          tags: ['نصوص', 'كوبي رايتنج', 'محتوى'],
          uploadedBy: 'سارة',
          uploadDate: '2024-03-13',
          size: '150 KB',
          thumbnail: null,
        },
        {
          id: 4,
          name: 'تصميم لوجو جديد',
          type: 'image',
          client: 'مطعم البركة',
          project: 'تجديد الهوية',
          tags: ['لوجو', 'هوية', 'تصميم'],
          uploadedBy: 'أحمد',
          uploadDate: '2024-03-12',
          size: '1.8 MB',
          thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
        },
        {
          id: 5,
          name: 'إنفوجرافيك الخدمات',
          type: 'image',
          client: 'متجر الأزياء',
          project: 'محتوى تعريفي',
          tags: ['انفوجرافيك', 'خدمات', 'تصميم'],
          uploadedBy: 'فاطمة',
          uploadDate: '2024-03-11',
          size: '3.2 MB',
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        },
      ];

      setAssets(sampleAssets);
      setFilteredAssets(sampleAssets);
    }
  }, [currentUser]);

  useEffect(() => {
    let filtered = assets;

    if (searchTerm) {
      filtered = filtered.filter(
        (asset) =>
          asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.tags.some((tag) => tag.includes(searchTerm)) ||
          asset.client.includes(searchTerm),
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((asset) => asset.type === selectedType);
    }

    if (selectedClient !== 'all') {
      filtered = filtered.filter((asset) => asset.client === selectedClient);
    }

    setFilteredAssets(filtered);
  }, [searchTerm, selectedType, selectedClient, assets]);

  const addNotification = (message, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotif.id));
    }, 5000);
  };

  const handleLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setShowLogin(false);
      addNotification(`مرحباً ${user.name}! تم تسجيل الدخول بنجاح`, 'success');
    } else {
      alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  const handleLogout = () => {
    addNotification(`تم تسجيل الخروج. وداعاً ${currentUser.name}!`, 'info');
    setCurrentUser(null);
    setShowLogin(true);
    setAssets([]);
    setFilteredAssets([]);
  };

  const canPerform = (action) => {
    if (!currentUser) return false;
    return rolePermissions[currentUser.role][action];
  };

  const getTypeIcon = (type) => {
    if (type === 'image') return React.createElement(Image, { className: 'w-5 h-5' });
    if (type === 'video') return React.createElement(Video, { className: 'w-5 h-5' });
    return React.createElement(FileText, { className: 'w-5 h-5' });
  };

  const getTypeColor = (type) => {
    if (type === 'image') return 'bg-blue-100 text-blue-600';
    if (type === 'video') return 'bg-purple-100 text-purple-600';
    if (type === 'document') return 'bg-green-100 text-green-600';
    return 'bg-gray-100 text-gray-600';
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { label: 'مدير', color: 'bg-red-100 text-red-700' },
      designer: { label: 'مصمم', color: 'bg-purple-100 text-purple-700' },
      content: { label: 'محتوى', color: 'bg-blue-100 text-blue-700' },
      viewer: { label: 'عميل', color: 'bg-gray-100 text-gray-700' },
    };
    return badges[role] || badges.viewer;
  };

  const clients = ['all', ...new Set(assets.map((a) => a.client))];

  const handleUploadSubmit = () => {
    if (!canPerform('upload')) {
      addNotification('ليس لديك صلاحية رفع الملفات', 'error');
      return;
    }

    if (!uploadForm.name || !uploadForm.client || !uploadForm.project || !uploadForm.tags) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const newAsset = {
      id: assets.length + 1,
      name: uploadForm.name,
      type: uploadForm.type,
      client: uploadForm.client,
      project: uploadForm.project,
      tags: uploadForm.tags.split(',').map((t) => t.trim()),
      uploadedBy: currentUser.name,
      uploadDate: new Date().toISOString().split('T')[0],
      size: '2.1 MB',
      thumbnail:
        uploadForm.type === 'image'
          ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop'
          : null,
    };

    setAssets([newAsset, ...assets]);
    setShowUploadModal(false);
    setUploadForm({ name: '', type: 'image', client: '', project: '', tags: '' });
    addNotification(`تم رفع الملف "${newAsset.name}" بنجاح`, 'success');
  };

  const handleDelete = (id, assetName) => {
    if (!canPerform('delete')) {
      addNotification('ليس لديك صلاحية حذف الملفات', 'error');
      return;
    }

    const confirmed = window.confirm('هل أنت متأكد من حذف هذا الملف؟');
    if (confirmed) {
      setAssets(assets.filter((a) => a.id !== id));
      addNotification(`تم حذف الملف "${assetName}"`, 'info');
    }
  };

  if (showLogin) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4"
        dir="rtl"
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <FolderOpen className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">بنك الأصول الإبداعية</h1>
            <p className="text-blue-100">نظام إدارة ملفات الوكالة</p>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">تسجيل الدخول</h2>

            <LoginForm onLogin={handleLogin} />

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm font-semibold text-blue-800 mb-3">حسابات تجريبية:</p>
              <div className="space-y-2 text-xs text-blue-700">
                <div className="flex justify-between">
                  <span className="font-semibold">مدير:</span>
                  <span>admin / admin123</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">مصمم:</span>
                  <span>designer / design123</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">محتوى:</span>
                  <span>content / content123</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">عميل:</span>
                  <span>viewer / view123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir="rtl">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`fixed top-4 left-4 right-4 md:right-auto md:left-4 md:w-96 p-4 rounded-xl shadow-lg z-50 animate-slide-in ${
            notif.type === 'success'
              ? 'bg-green-500'
              : notif.type === 'error'
                ? 'bg-red-500'
                : 'bg-blue-500'
          } text-white`}
        >
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5" />
            <div className="flex-1">
              <p className="font-semibold">{notif.message}</p>
              <p className="text-xs opacity-75">{notif.time}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">بنك الأصول الإبداعية</h1>
                <p className="text-sm text-gray-500">إدارة ملفات الوكالة</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{currentUser.name}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadge(currentUser.role).color}`}>
                    {getRoleBadge(currentUser.role).label}
                  </span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {currentUser.name.charAt(0)}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                title="تسجيل الخروج"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-gray-800">صلاحياتك في النظام</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div
              className={`p-3 rounded-xl ${
                canPerform('view') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Eye className="w-5 h-5 mb-1" />
              <p className="text-sm font-semibold">عرض الملفات</p>
            </div>
            <div
              className={`p-3 rounded-xl ${
                canPerform('upload') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Upload className="w-5 h-5 mb-1" />
              <p className="text-sm font-semibold">رفع ملفات</p>
            </div>
            <div
              className={`p-3 rounded-xl ${
                canPerform('edit') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Edit className="w-5 h-5 mb-1" />
              <p className="text-sm font-semibold">تعديل الملفات</p>
            </div>
            <div
              className={`p-3 rounded-xl ${
                canPerform('delete') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Trash2 className="w-5 h-5 mb-1" />
              <p className="text-sm font-semibold">حذف الملفات</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">المكتبة</h2>
          {canPerform('upload') && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
            >
              <Upload className="w-5 h-5" />
              رفع ملف جديد
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن ملف، عميل، أو وسم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">جميع الأنواع</option>
              <option value="image">صور</option>
              <option value="video">فيديوهات</option>
              <option value="document">مستندات</option>
            </select>

            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="all">جميع العملاء</option>
              {clients
                .filter((c) => c !== 'all')
                .map((client) => (
                  <option key={client} value={client}>
                    {client}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600">
              عرض <span className="font-bold text-blue-600">{filteredAssets.length}</span> من {assets.length} ملف
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                شبكة
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                قائمة
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {asset.thumbnail ? (
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className={`p-6 rounded-full ${getTypeColor(asset.type)}`}>
                        {getTypeIcon(asset.type)}
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(asset.type)} backdrop-blur-sm`}
                    >
                      {asset.type === 'image' ? 'صورة' : asset.type === 'video' ? 'فيديو' : 'مستند'}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">{asset.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="font-semibold">{asset.client}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FolderOpen className="w-4 h-4" />
                      <span className="line-clamp-1">{asset.project}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{asset.uploadDate}</span>
                      <span className="mr-auto">{asset.size}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {asset.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    {canPerform('view') && (
                      <button
                        onClick={() => setSelectedAsset(asset)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all font-semibold"
                      >
                        <Eye className="w-4 h-4" />
                        عرض
                      </button>
                    )}
                    <button
                      onClick={() => addNotification('تم تحميل الملف', 'success')}
                      className="flex items-center justify-center px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    {canPerform('delete') && (
                      <button
                        onClick={() => handleDelete(asset.id, asset.name)}
                        className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">الملف</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">العميل</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">المشروع</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">التاريخ</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">الحجم</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getTypeColor(asset.type)}`}>{getTypeIcon(asset.type)}</div>
                        <span className="font-medium text-gray-800">{asset.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{asset.client}</td>
                    <td className="px-6 py-4 text-gray-600">{asset.project}</td>
                    <td className="px-6 py-4 text-gray-500">{asset.uploadDate}</td>
                    <td className="px-6 py-4 text-gray-500">{asset.size}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {canPerform('view') && (
                          <button
                            onClick={() => setSelectedAsset(asset)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => addNotification('تم تحميل الملف', 'success')}
                          className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {canPerform('delete') && (
                          <button
                            onClick={() => handleDelete(asset.id, asset.name)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredAssets.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500">جرب تغيير معايير البحث</p>
          </div>
        )}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">رفع ملف جديد</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">اسم الملف</label>
                  <input
                    type="text"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="مثال: بوستر حملة العيد"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">نوع الملف</label>
                  <select
                    value={uploadForm.type}
                    onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="image">صورة</option>
                    <option value="video">فيديو</option>
                    <option value="document">مستند</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">العميل</label>
                  <input
                    type="text"
                    value={uploadForm.client}
                    onChange={(e) => setUploadForm({ ...uploadForm, client: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اسم العميل"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">المشروع</label>
                  <input
                    type="text"
                    value={uploadForm.project}
                    onChange={(e) => setUploadForm({ ...uploadForm, project: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اسم المشروع"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الوسوم (مفصولة بفاصلة)</label>
                  <input
                    type="text"
                    value={uploadForm.tags}
                    onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="مثال: سوشال ميديا, تصميم, إعلان"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">الملف</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">اسحب الملف هنا أو اضغط للاختيار</p>
                    <p className="text-sm text-gray-400 mt-2">PNG, JPG, MP4, PDF (حتى 50MB)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <button
                  onClick={handleUploadSubmit}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  رفع الملف
                </button>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadForm({ name: '', type: 'image', client: '', project: '', tags: '' });
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedAsset && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">{selectedAsset.name}</h2>
              <button onClick={() => setSelectedAsset(null)} className="text-gray-400 hover:text-gray-600 text-2xl">
                ×
              </button>
            </div>

            <div className="p-6">
              {selectedAsset.thumbnail && (
                <img src={selectedAsset.thumbnail} alt={selectedAsset.name} className="w-full rounded-xl mb-6 shadow-lg" />
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">العميل</p>
                  <p className="font-bold text-gray-800">{selectedAsset.client}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">المشروع</p>
                  <p className="font-bold text-gray-800">{selectedAsset.project}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">تاريخ الرفع</p>
                  <p className="font-bold text-gray-800">{selectedAsset.uploadDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">الحجم</p>
                  <p className="font-bold text-gray-800">{selectedAsset.size}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">رفع بواسطة</p>
                  <p className="font-bold text-gray-800">{selectedAsset.uploadedBy}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">النوع</p>
                  <p className="font-bold text-gray-800">
                    {selectedAsset.type === 'image' ? 'صورة' : selectedAsset.type === 'video' ? 'فيديو' : 'مستند'}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3">الوسوم</p>
                <div className="flex flex-wrap gap-2">
                  {selectedAsset.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg flex items-center gap-2 font-semibold"
                    >
                      <Tag className="w-4 h-4" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => addNotification('تم تحميل الملف', 'success')}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  <Download className="w-5 h-5" />
                  تحميل الملف
                </button>
                <button
                  onClick={() => addNotification('تم نسخ رابط المشاركة', 'info')}
                  className="px-6 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                >
                  مشاركة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (username && password) {
      onLogin(username, password);
    } else {
      alert('يرجى إدخال اسم المستخدم وكلمة المرور');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">اسم المستخدم</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="أدخل اسم المستخدم"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="أدخل كلمة المرور"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
      >
        دخول
      </button>
    </div>
  );
};

export default AssetLibrary;
