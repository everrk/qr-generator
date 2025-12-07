import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  ExternalLink,
  Globe,
  HeartHandshake,
  Layers,
  Mail,
  MapPin,
  Megaphone,
  Palette,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wand2,
} from 'lucide-react';
import AssetLibrary from './AssetLibrary';

const stats = [
  { label: 'حملات ناجحة', value: '+180', icon: Rocket },
  { label: 'محتويات منجزة', value: '12k', icon: Palette },
  { label: 'معدل رضا العملاء', value: '98%', icon: HeartHandshake },
  { label: 'نمو متابعين', value: '3.2x', icon: BarChart3 },
];

const services = [
  {
    title: 'استراتيجية العلامة التجارية',
    desc: 'بناء هوية تعكس قيمك وتضمن تميزك في السوق.',
    icon: ShieldCheck,
  },
  {
    title: 'إدارة الشبكات الاجتماعية',
    desc: 'محتوى متجدد وجدولة دقيقة مع مراقبة لحظية للأداء.',
    icon: Megaphone,
  },
  {
    title: 'إنتاج إبداعي متكامل',
    desc: 'تصاميم، موشن جرافيك، وتصوير احترافي يدعم حملاتك.',
    icon: Palette,
  },
  {
    title: 'حملات إعلانية مدفوعة',
    desc: 'تحسين الميزانيات للوصول لأفضل نتائج على كل منصة.',
    icon: Rocket,
  },
];

const tools = [
  {
    title: 'بنك الأصول الإبداعية',
    desc: 'لوحة موحدة لرفع، تنظيم، ومشاركة الملفات مع صلاحيات أدوار متعددة.',
    tag: 'جديد',
  },
  {
    title: 'مؤشرات الأداء المباشرة',
    desc: 'لوحة قياس تلخص معدل الوصول، النقرات، والتحويلات لكل حملة.',
    tag: 'مباشر',
  },
  {
    title: 'تجارب سريعة A/B',
    desc: 'حزم جاهزة لاختبار الرسائل والمرئيات مع توصيات آلية.',
    tag: 'ذكي',
  },
  {
    title: 'تدفقات تسليم سهلة',
    desc: 'مسار واضح من الطلب إلى الاعتماد النهائي مع تنبيهات وملخصات.',
    tag: 'مرن',
  },
];

const steps = [
  'تحليل السوق والهدف التجاري',
  'صياغة استراتيجية متكاملة للقنوات',
  'إنتاج محتوى وتفعيل الحملات',
  'متابعة البيانات والتحسين المستمر',
];

const portfolio = [
  {
    title: 'إطلاق هوية جديدة لمتجر أزياء',
    impact: 'زيادة 2.8x في المبيعات الموسمية',
  },
  {
    title: 'حملة موشن لجمعية غير ربحية',
    impact: 'مضاعفة التبرعات خلال أول أسبوع',
  },
  {
    title: 'تسويق محتوى لسلسلة مطاعم',
    impact: 'ارتفاع الحجوزات 65% خلال شهر',
  },
];

const testimonials = [
  {
    name: 'شهد - مديرة تسويق',
    quote: 'الوكالة أحضرت لنا نظام عمل واضح، وسرعة في تنفيذ المحتوى مع تقارير دقيقة.',
  },
  {
    name: 'فهد - مؤسس متجر إلكتروني',
    quote: 'نتائج الحملات المدفوعة كانت واضحة من الأسبوع الأول مع تحسين مستمر للميزانية.',
  },
];

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) {
      setStatus({ type: 'error', text: 'يرجى تعبئة الحقول الأساسية أولاً.' });
      return;
    }
    setStatus({ type: 'success', text: 'تم استلام طلبك، سنتواصل معك خلال 24 ساعة.' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="اسمك"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="رقم التواصل"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="البريد الإلكتروني"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="الميزانية الشهرية"
          value={form.budget}
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
        />
        <input
          className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 md:col-span-2"
          placeholder="الخدمة المطلوبة"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
        />
      </div>
      <textarea
        className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="صف مشروعك أو أهدافك التسويقية"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {status && (
        <div
          className={`px-4 py-3 rounded-xl ${
            status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {status.text}
        </div>
      )}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-purple-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
      >
        أرسل التفاصيل <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center space-y-2 mb-8">
    <p className="text-sm text-purple-600 font-semibold">{subtitle}</p>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
  </div>
);

const AgencyLanding = () => {
  const [showLibrary, setShowLibrary] = useState(false);
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const heroBadges = useMemo(
    () => [
      { icon: Sparkles, text: 'نهج يعتمد على البيانات والإبداع' },
      { icon: CalendarCheck2, text: 'خطة 90 يوم للتسويق المتكامل' },
      { icon: ShieldCheck, text: 'تجربة شفافة مع تقارير أسبوعية' },
    ],
    [],
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen" dir="rtl">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-500 text-white shadow">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">وكالة تسويق متكاملة</p>
              <p className="font-bold text-gray-900">أفق الإبداع</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToContact}
              className="px-4 py-2 rounded-xl border border-purple-200 text-purple-700 font-semibold hover:bg-purple-50"
            >
              ابدأ مشروعك
            </button>
            <button
              onClick={() => setShowLibrary(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-l from-purple-600 to-blue-500 text-white font-semibold shadow"
            >
              افتح أدوات الوكالة
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold">
              <Wand2 className="w-4 h-4" /> وكالة تسويق تشبه mhzam.sa مع أدوات إضافية
            </span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
              نحول الرؤية إلى حملات مؤثرة،
              <br />
              ونربطها بأدوات تشغيل متكاملة.
            </h1>
            <p className="text-lg text-gray-600">
              من بناء الهوية إلى إدارة المحتوى والحملات المدفوعة، نرافقك بخطط واضحة، تقارير مباشرة،
              وبنك أصول إبداعي يضمن تنسيق العمل بين الفريق والعميل.
            </p>
            <div className="flex flex-wrap gap-3">
              {heroBadges.map((badge) => (
                <span
                  key={badge.text}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-700"
                >
                  <badge.icon className="w-4 h-4 text-purple-600" />
                  {badge.text}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={scrollToContact}
                className="px-6 py-3 rounded-xl bg-gradient-to-l from-purple-600 to-blue-500 text-white font-semibold hover:shadow-lg"
              >
                احجز استشارة مجانية
              </button>
              <button
                onClick={() => setShowLibrary(true)}
                className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 font-semibold hover:shadow"
              >
                استعرض بنك الأصول
              </button>
              <a
                href="codebundle.zip"
                download
                className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:shadow inline-flex items-center gap-2"
              >
                تحميل الأكواد
              </a>
            </div>
            <p className="text-sm text-gray-500">
              يتوفر ملف codebundle.zip تلقائياً داخل مجلد dist بعد تشغيل أمر build ليضم جميع الأكواد والصفحات.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-50">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-gray-100">
                  <div className="flex items-center gap-2 text-purple-700 font-semibold mb-2">
                    <stat.icon className="w-4 h-4" />
                    {stat.label}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-2xl bg-purple-600 text-white space-y-2">
              <p className="font-semibold">ما يميزنا</p>
              <ul className="space-y-1 text-sm opacity-95">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> فريق متعدد التخصصات من الاستراتيجية للإنتاج
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> تقارير أسبوعية مع توصيات تحسين واضحة
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> أدوات جاهزة لمشاركة الملفات والمحتوى مع العملاء
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle subtitle="الخدمات" title="باقات متكاملة من الفكرة للتنفيذ" />
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <service.icon className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-lg text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle subtitle="أدوات التشغيل" title="تجربة تشبه mhzam.sa مع أدوات إضافية" />
          <div className="grid md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <div key={tool.title} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{tool.title}</h3>
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-semibold">{tool.tag}</span>
                </div>
                <p className="text-gray-600 mb-3">{tool.desc}</p>
                {tool.title === 'بنك الأصول الإبداعية' && (
                  <button
                    onClick={() => setShowLibrary(true)}
                    className="inline-flex items-center gap-2 text-purple-700 font-semibold"
                  >
                    جرب الآن <ExternalLink className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <SectionTitle subtitle="آلية العمل" title="خطوات واضحة من أول اجتماع" />
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-gray-800 font-semibold">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-3xl p-6 shadow-lg">
            <SectionTitle subtitle="باقة تشغيل" title="خطة 90 يوم" />
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> جلسة استراتيجية + خريطة محتوى شهرية
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> إدارة قنوات التواصل وجدولة المنشورات
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> حملات إعلانية مع متابعة أسبوعية
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> تقارير أداء ولوحة بنك الأصول
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <button className="flex-1 bg-white text-purple-700 font-semibold rounded-xl py-3">اطلب عرض سعر</button>
              <button
                onClick={() => setShowLibrary(true)}
                className="flex-1 bg-purple-800/50 border border-white/30 rounded-xl py-3 font-semibold"
              >
                اطلع على الأدوات
              </button>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle subtitle="أعمال مختارة" title="أمثلة على تأثيرنا" />
          <div className="grid md:grid-cols-3 gap-4">
            {portfolio.map((item) => (
              <div key={item.title} className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-purple-700 font-semibold mb-2">
                  <Globe className="w-4 h-4" /> مشروع
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.impact}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <SectionTitle subtitle="آراء العملاء" title="شركاء نثق بهم" />
            <div className="space-y-4">
              {testimonials.map((item) => (
                <div key={item.name} className="p-4 rounded-2xl bg-gray-50">
                  <p className="text-gray-800 font-semibold mb-2">{item.name}</p>
                  <p className="text-gray-600">“{item.quote}”</p>
                </div>
              ))}
            </div>
          </div>

          <div id="contact" className="space-y-4">
            <SectionTitle subtitle="تواصل" title="ارسل تفاصيل مشروعك" />
            <ContactForm />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700">+966 55 000 0000</span>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700">hello@agency.sa</span>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700">الرياض - جدة</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showLibrary && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setShowLibrary(false)} />
          <div className="relative max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
            <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-l from-purple-600 to-blue-500 text-white">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5" />
                <div>
                  <p className="font-bold">بنك الأصول الإبداعية</p>
                  <p className="text-sm text-white/80">تسجيل الدخول لتجربة إدارة الملفات</p>
                </div>
              </div>
              <button onClick={() => setShowLibrary(false)} className="p-2 rounded-lg bg-white/20 hover:bg-white/30">
                إغلاق
              </button>
            </div>
            <div className="h-[80vh] overflow-y-auto">
              <AssetLibrary />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyLanding;
