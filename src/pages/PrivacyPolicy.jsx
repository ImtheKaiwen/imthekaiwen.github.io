import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Bell } from 'lucide-react';
import './PrivacyPolicy.css';

const PRIVACY_DATA = {
  'campus-meal': {
    title: 'Campus Meal',
    lastUpdated: '27 Nisan 2026',
    intro: 'Campus Meal ("biz", "uygulama"), kullanıcılarımızın gizliliğine önem vermektedir. Bu gizlilik politikası, uygulamamızı kullandığınızda verilerinizin nasıl işlendiğini açıklar.',
    sections: [
      {
        icon: <ShieldCheck size={20} />,
        title: '1. Toplanan Veriler',
        content: 'Campus Meal, kullanıcılarından herhangi bir kişisel kimlik bilgisi (isim, e-posta, telefon numarası vb.) toplamaz. Uygulama, üyelik sistemi gerektirmeden çalışmaktadır.'
      },
      {
        icon: <EyeOff size={20} />,
        title: '2. Reklamlar ve Üçüncü Taraflar',
        content: 'Uygulamamızda reklam göstermek amacıyla Google AdMob servislerini kullanmaktayız. AdMob, size kişiselleştirilmiş reklamlar sunmak için cihaz kimliği (IDFA/AAID) gibi anonim verileri kullanabilir. Bu verilerin işlenmesi Google\'ın kendi gizlilik politikasına tabidir.'
      },
      {
        icon: <Bell size={20} />,
        title: '3. Bildirimler',
        content: 'Kullanıcılar kendi istekleriyle yemek hatırlatıcıları kurabilirler. Bu bildirimler tamamen cihaz üzerinde (yerel) çalışmakta olup, sunucularımıza herhangi bir bildirim verisi gönderilmemektedir.'
      },
      {
        icon: <Lock size={20} />,
        title: '4. Veri Güvenliği',
        content: 'Herhangi bir kişisel veri toplamadığımız için, sızdırılacak veya çalınacak bir kullanıcı verisi barındırmıyoruz.'
      },
      {
        icon: <ShieldCheck size={20} />,
        title: '5. İletişim',
        content: 'Gizlilik politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz.'
      }
    ],
    footer: '© 2026 Campus Meal. Tüm hakları saklıdır.'
  },
  'vision-journal': {
    title: 'Vision Journal',
    lastUpdated: '29 Nisan 2026',
    intro: 'Vision Journal, kişisel gelişim yolculuğunuzda size eşlik ederken verilerinizin gizliliğini en üst seviyede tutar.',
    sections: [
      {
        icon: <Lock size={20} />,
        title: 'Veri Yerelliği',
        content: 'Günlük girişleriniz, vizyonlarınız ve hedefleriniz tamamen cihazınızın yerel hafızasında (CoreData/SQLite) saklanır. Bizim bu verilere erişimimiz yoktur.'
      },
      {
        icon: <EyeOff size={20} />,
        title: 'Yedekleme',
        content: 'Eğer iCloud yedeklemeniz açıksa, verileriniz Apple\'ın güvenli sunucularında yedeklenir. Bu veriler üzerinde bizim bir kontrolümüz bulunmamaktadır.'
      },
      {
        icon: <Bell size={20} />,
        title: 'Analiz ve Reklam',
        content: 'Uygulama performansı için anonim hata raporları toplanabilir. Kişisel verileriniz asla reklam ağlarıyla paylaşılmaz.'
      }
    ],
    footer: 'Her türlü sorunuz için: kaiwen.info@gmail.com'
  },
  'vision-journal-desktop': {
    title: 'Vision Journal Desktop',
    lastUpdated: '04 Mayıs 2026',
    intro: 'Vision Journal Desktop, gizliliğinizi en ön planda tutan bir masaüstü uygulamasıdır. Bu uygulama, kullanıcılarından hiçbir şekilde veri toplamaz.',
    sections: [
      {
        icon: <ShieldCheck size={20} />,
        title: 'Veri Toplanmaz',
        content: 'Uygulama hiçbir kişisel veri, kullanım verisi veya cihaz bilgisi toplamaz. Tüm işlemler anonimdir.'
      },
      {
        icon: <Lock size={20} />,
        title: 'Tamamen Yerel Çalışma',
        content: 'Yazdığınız tüm günlükler ve oluşturduğunuz vizyonlar sadece bilgisayarınızın yerel hafızasında saklanır. Herhangi bir bulut sunucusuna veri gönderilmez.'
      },
      {
        icon: <EyeOff size={20} />,
        title: 'Üçüncü Taraf Erişimi Yok',
        content: 'Verileriniz üçüncü taraf servislerle paylaşılmaz. Uygulama içerisinde reklam veya takip mekanizması bulunmaz.'
      }
    ],
    footer: 'Gizlilikle ilgili sorularınız için: kaiwen.info@gmail.com'
  }
};

export default function PrivacyPolicy() {
  const { id } = useParams();
  const policy = PRIVACY_DATA[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!policy) return <div className="privacy-error">Politika bulunamadı.</div>;

  return (
    <motion.div 
      className="privacy-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <Link to={`/project/${id}`} className="back-link">
        <ArrowLeft size={18} /> Geri Dön
      </Link>

      <header className="privacy-header">
        <div className="privacy-icon-box">
          <ShieldCheck size={32} />
        </div>
        <h1>{policy.title}</h1>
        <p className="last-updated">Son Güncelleme: {policy.lastUpdated}</p>
      </header>

      <div className="privacy-content-card">
        <section className="privacy-intro">
          <p>{policy.intro}</p>
        </section>

        <div className="privacy-sections">
          {policy.sections.map((section, idx) => (
            <div className="policy-item" key={idx}>
              <div className="item-header">
                {section.icon}
                <h2>{section.title}</h2>
              </div>
              <p>{section.content}</p>
            </div>
          ))}
        </div>

        <footer className="privacy-page-footer">
          <p>{policy.footer}</p>
        </footer>
      </div>
    </motion.div>
  );
}
