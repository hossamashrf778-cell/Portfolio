window.siteData = {
    siteTitle: "Hossam Design",
    heroTitle: "البورتفوليو نور بيك",
    heroSubtitle: "حسام ديزاين - جرافيك ديزاينر محترف",
    heroTagline: '"إحساسك بالجمال .. مسؤوليتي"',
    heroDesc: "بتفاصيل ملهاش حدود، بخلّي كل تصميم يحكي قصة ويسحر العين. بشتغل بإبداع غير تقليدي عشان تطلع بتحفة فنية تخلي علامتك التجارية تتكلم من أول نظرة.",
    
    stats: { projects: 165, clients: 134, years: 9 },
    
    services: [
        { id: "s1", icon: "fas fa-crown", title: "هوية بصرية متكاملة", desc: "لوجو، ألوان، استراتيجية بصرية", price: "2500 ج", priceNote: "تبدأ من" },
        { id: "s2", icon: "fas fa-chart-line", title: "تصميم سوشيال ميديا", desc: "بوستات، قصص، غلافات احترافية", price: "300 ج", priceNote: "للبوست" },
        { id: "s3", icon: "fas fa-print", title: "مطبوعات فاخرة", desc: "بروشورات، كروت شخصية", price: "500 ج", priceNote: "تبدأ من" },
        { id: "s4", icon: "fas fa-gem", title: "تصاميم VIP", desc: "أعمال فريدة مخصصة", price: "حسب الاتفاق", priceNote: "" }
    ],
    
    pricing: [
        { id: "p1", title: "باقة أساسية", price: "1500", features: ["5 تصاميم سوشيال ميديا", "2 تعديلات مجانية", "تسليم خلال 3 أيام"], button: "اطلب الباقة", type: "outline" },
        { id: "p2", title: "باقة احترافية", price: "3500", features: ["15 تصميم + لوجو", "5 تعديلات مجانية", "تسليم خلال 5 أيام", "ملفات مصدر"], button: "اطلب الباقة", type: "primary" },
        { id: "p3", title: "باقة VIP", price: "مخصص", features: ["هوية بصرية متكاملة", "تصميم غير محدود", "أولوية التنفيذ", "دعم فني شهر كامل"], button: "تواصل معنا", type: "outline" }
    ],
    
    testimonials: [
        { id: "t1", text: "أفضل جرافيك ديزاينر تعاملت معاه، شغله ولا أروع!", name: "أحمد محمد" },
        { id: "t2", text: "إبداع حقيقي، حسام فاهم الذوق ونفذ رؤيتي بشكل فاق توقعاتي.", name: "نورهان سامي" },
        { id: "t3", text: "احترافية في التعامل + تصميمات تخطف الأنفاس.", name: "خالد إبراهيم" }
    ],
    
    projects: [
        { id: "pr1", title: "هوية بصرية - علامة تجارية", img: "https://kommodo.ai/i/4yY6KmsS9LqYVydn6XpR", category: "لوجوهات متكاملة" },
        { id: "pr2", title: "تصميم بوست تفاعلي", img: "https://kommodo.ai/i/PAfYt8hRwaBHn6xBLWqL", category: "سوشيال ميديا" },
        { id: "pr3", title: "بروشور إعلاني فاخر", img: "https://kommodo.ai/i/f0xhiP87MFJ2AXk7CeRo", category: "مطبوعات" },
        { id: "pr4", title: "غلاف فيسبوك احترافي", img: "https://kommodo.ai/i/7WzTALp21fqxBjz8E9QS", category: "تصاميم ويب" },
        { id: "pr5", title: "بطاقة شخصية ذهبية", img: "https://kommodo.ai/i/Ll3H9GkF2KHyQ1YbrP7G", category: "هوية فاخرة" },
        { id: "pr6", title: "تصميم يوتيوب ثامب", img: "https://kommodo.ai/i/68qRJmvBgcQs7AXkM2oD", category: "فيديو ماركتنج" }
    ],
    
    comments: [],
    
    social: {
        behance: "https://www.behance.net/hossamdesign",
        instagram: "https://www.instagram.com/el_hoos97",
        whatsapp: "https://wa.me/message/N3XUZ37ZGJDWC1",
        email: "hossamamer788@gmail.com"
    },
    
    colors: { primary: "#ff6b6b", secondary: "#ff8e53" }
};

let adminPassword = "hossam2024";
let isAdmin = false;

function checkAdminAccess() {
    const savedAdmin = sessionStorage.getItem('adminAccess');
    if(savedAdmin === 'true') {
        isAdmin = true;
        return true;
    }
    return false;
}

function requestAdminAccess() {
    const password = prompt("🔐 هذا القسم خاص بصاحب الموقع فقط. الرجاء إدخال كلمة المرور:");
    if(password === adminPassword) {
        sessionStorage.setItem('adminAccess', 'true');
        isAdmin = true;
        alert("✅ تم التحقق! يمكنك الآن تعديل الموقع.");
        location.reload();
        return true;
    } else if(password !== null) {
        alert("❌ كلمة المرور غير صحيحة!");
    }
    return false;
}