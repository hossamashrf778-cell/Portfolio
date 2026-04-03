function initAdminPanel() {
    if(!isAdmin) return;
    
    const adminPanel = document.createElement('div');
    adminPanel.className = 'admin-panel';
    adminPanel.innerHTML = `
        <div class="admin-panel-header">
            <h3><i class="fas fa-user-shield"></i> لوحة تحكم المدير</h3>
            <button id="closeAdminPanel"><i class="fas fa-times"></i></button>
        </div>
        <div class="admin-panel-tabs">
            <button class="tab-btn active" data-tab="general">عام</button>
            <button class="tab-btn" data-tab="add">إضافة عنصر</button>
            <button class="tab-btn" data-tab="delete">حذف عنصر</button>
            <button class="tab-btn" data-tab="images">إدارة الصور</button>
            <button class="tab-btn" data-tab="comments">إدارة التعليقات</button>
        </div>
        <div class="admin-panel-content">
            <div class="tab-content active" id="tab-general">
                <h4>المعلومات العامة</h4>
                <div class="admin-field"><label>اسم الموقع</label><input type="text" id="adminSiteTitle" value="${window.siteData.siteTitle}"></div>
                <div class="admin-field"><label>العنوان الرئيسي</label><input type="text" id="adminHeroTitle" value="${window.siteData.heroTitle}"></div>
                <div class="admin-field"><label>النص التعريفي</label><textarea id="adminHeroDesc" rows="3">${window.siteData.heroDesc}</textarea></div>
                <div class="admin-field"><label>عدد المشاريع</label><input type="number" id="adminProjects" value="${window.siteData.stats.projects}"></div>
                <div class="admin-field"><label>عدد العملاء</label><input type="number" id="adminClients" value="${window.siteData.stats.clients}"></div>
                <div class="admin-field"><label>سنوات الخبرة</label><input type="number" id="adminYears" value="${window.siteData.stats.years}"></div>
                <div class="admin-field"><label>اللون الأساسي</label><input type="color" id="adminPrimaryColor" value="${window.siteData.colors.primary}"></div>
                <div class="admin-field"><label>اللون الثانوي</label><input type="color" id="adminSecondaryColor" value="${window.siteData.colors.secondary}"></div>
                <div class="admin-field"><label>رابط بينانس</label><input type="text" id="adminBehance" value="${window.siteData.social.behance}"></div>
                <div class="admin-field"><label>رابط انستقرام</label><input type="text" id="adminInstagram" value="${window.siteData.social.instagram}"></div>
                <div class="admin-field"><label>رابط واتساب</label><input type="text" id="adminWhatsapp" value="${window.siteData.social.whatsapp}"></div>
                <div class="admin-field"><label>البريد الإلكتروني</label><input type="email" id="adminEmail" value="${window.siteData.social.email}"></div>
                <button id="saveGeneralBtn" class="admin-save-btn"><i class="fas fa-save"></i> حفظ التغييرات</button>
            </div>
            
            <div class="tab-content" id="tab-add">
                <h4>إضافة عنصر جديد</h4>
                <div class="admin-field"><label>نوع العنصر</label>
                    <select id="addType">
                        <option value="service">خدمة</option>
                        <option value="pricing">باقة سعرية</option>
                        <option value="testimonial">رأي عميل</option>
                        <option value="project">مشروع/صورة</option>
                    </select>
                </div>
                <div id="addFields"></div>
                <button id="addItemBtn" class="admin-save-btn"><i class="fas fa-plus"></i> إضافة العنصر</button>
            </div>
            
            <div class="tab-content" id="tab-delete">
                <h4>حذف عنصر</h4>
                <div class="admin-field"><label>نوع العنصر</label>
                    <select id="deleteType">
                        <option value="service">خدمة</option>
                        <option value="pricing">باقة سعرية</option>
                        <option value="testimonial">رأي عميل</option>
                        <option value="project">مشروع/صورة</option>
                    </select>
                </div>
                <div id="deleteList"></div>
            </div>
            
            <div class="tab-content" id="tab-images">
                <h4>إضافة صورة جديدة للمعرض</h4>
                <div class="admin-field"><label>عنوان الصورة</label><input type="text" id="newImageTitle" placeholder="مثال: تصميم جديد"></div>
                <div class="admin-field"><label>رابط الصورة (URL)</label><input type="text" id="newImageUrl" placeholder="https://..."></div>
                <div class="admin-field"><label>التصنيف</label><input type="text" id="newImageCategory" placeholder="مثال: تصاميم ويب"></div>
                <button id="addImageBtn" class="admin-save-btn"><i class="fas fa-image"></i> إضافة الصورة</button>
                <hr style="margin: 20px 0; border-color: rgba(255,107,107,0.3);">
                <h4>الصور الحالية</h4>
                <div id="imagesList"></div>
            </div>
            
            <div class="tab-content" id="tab-comments">
                <h4>إدارة التعليقات</h4>
                <div id="commentsManageList"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(adminPanel);
    
    const adminBtn = document.createElement('div');
    adminBtn.className = 'admin-toggle-btn';
    adminBtn.innerHTML = '<i class="fas fa-cog"></i>';
    adminBtn.title = 'لوحة التحكم (خاص بالمدير)';
    adminBtn.onclick = () => adminPanel.classList.toggle('open');
    document.body.appendChild(adminBtn);
    
    document.getElementById('closeAdminPanel').onclick = () => adminPanel.classList.remove('open');
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
            if(btn.dataset.tab === 'delete') loadDeleteList();
            if(btn.dataset.tab === 'images') loadImagesList();
            if(btn.dataset.tab === 'comments') loadCommentsManage();
        };
    });
    
    document.getElementById('addType').onchange = () => updateAddFields();
    updateAddFields();
    
    document.getElementById('saveGeneralBtn').onclick = saveGeneralSettings;
    document.getElementById('addItemBtn').onclick = addNewItem;
    document.getElementById('addImageBtn').onclick = addNewImage;
    
    loadDeleteList();
    loadImagesList();
    loadCommentsManage();
}

function updateAddFields() {
    const type = document.getElementById('addType').value;
    const container = document.getElementById('addFields');
    if(type === 'service') {
        container.innerHTML = `<div class="admin-field"><label>عنوان الخدمة</label><input type="text" id="addTitle" placeholder="مثال: تصميم جرافيك"></div>
        <div class="admin-field"><label>وصف الخدمة</label><textarea id="addDesc" rows="2" placeholder="وصف الخدمة"></textarea></div>
        <div class="admin-field"><label>السعر</label><input type="text" id="addPrice" placeholder="مثال: 500 ج"></div>
        <div class="admin-field"><label>أيقونة (Font Awesome)</label><input type="text" id="addIcon" value="fas fa-star" placeholder="fas fa-star"></div>`;
    } else if(type === 'pricing') {
        container.innerHTML = `<div class="admin-field"><label>اسم الباقة</label><input type="text" id="addTitle" placeholder="مثال: باقة ذهبية"></div>
        <div class="admin-field"><label>السعر</label><input type="text" id="addPrice" placeholder="مثال: 5000"></div>
        <div class="admin-field"><label>المميزات (كل سطر مميزة)</label><textarea id="addFeatures" rows="3" placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"></textarea></div>`;
    } else if(type === 'testimonial') {
        container.innerHTML = `<div class="admin-field"><label>اسم العميل</label><input type="text" id="addName" placeholder="مثال: أحمد محمد"></div>
        <div class="admin-field"><label>التعليق</label><textarea id="addText" rows="3" placeholder="نص التعليق"></textarea></div>`;
    } else if(type === 'project') {
        container.innerHTML = `<div class="admin-field"><label>عنوان المشروع</label><input type="text" id="addTitle" placeholder="مثال: تصميم هوية"></div>
        <div class="admin-field"><label>رابط الصورة</label><input type="text" id="addImageUrl" placeholder="https://..."></div>
        <div class="admin-field"><label>التصنيف</label><input type="text" id="addCategory" placeholder="مثال: لوجوهات"></div>`;
    }
}

function saveGeneralSettings() {
    window.siteData.siteTitle = document.getElementById('adminSiteTitle').value;
    window.siteData.heroTitle = document.getElementById('adminHeroTitle').value;
    window.siteData.heroDesc = document.getElementById('adminHeroDesc').value;
    window.siteData.stats.projects = parseInt(document.getElementById('adminProjects').value);
    window.siteData.stats.clients = parseInt(document.getElementById('adminClients').value);
    window.siteData.stats.years = parseInt(document.getElementById('adminYears').value);
    window.siteData.colors.primary = document.getElementById('adminPrimaryColor').value;
    window.siteData.colors.secondary = document.getElementById('adminSecondaryColor').value;
    window.siteData.social.behance = document.getElementById('adminBehance').value;
    window.siteData.social.instagram = document.getElementById('adminInstagram').value;
    window.siteData.social.whatsapp = document.getElementById('adminWhatsapp').value;
    window.siteData.social.email = document.getElementById('adminEmail').value;
    
    localStorage.setItem('siteData', JSON.stringify(window.siteData));
    updateContent();
    alert('✅ تم حفظ التغييرات بنجاح!');
}

function addNewItem() {
    const type = document.getElementById('addType').value;
    const newId = Date.now().toString();
    
    if(type === 'service') {
        window.siteData.services.push({
            id: newId,
            icon: document.getElementById('addIcon').value,
            title: document.getElementById('addTitle').value,
            desc: document.getElementById('addDesc').value,
            price: document.getElementById('addPrice').value,
            priceNote: ""
        });
    } else if(type === 'pricing') {
        const features = document.getElementById('addFeatures').value.split('\n').filter(f => f.trim());
        window.siteData.pricing.push({
            id: newId,
            title: document.getElementById('addTitle').value,
            price: document.getElementById('addPrice').value,
            features: features,
            button: "اطلب الباقة",
            type: "outline"
        });
    } else if(type === 'testimonial') {
        window.siteData.testimonials.push({
            id: newId,
            name: document.getElementById('addName').value,
            text: document.getElementById('addText').value
        });
    } else if(type === 'project') {
        window.siteData.projects.push({
            id: newId,
            title: document.getElementById('addTitle').value,
            img: document.getElementById('addImageUrl').value,
            category: document.getElementById('addCategory').value
        });
    }
    
    localStorage.setItem('siteData', JSON.stringify(window.siteData));
    updateContent();
    alert('✅ تم إضافة العنصر بنجاح!');
    document.querySelector('.admin-panel').classList.remove('open');
    location.reload();
}

function addNewImage() {
    const title = document.getElementById('newImageTitle').value;
    const url = document.getElementById('newImageUrl').value;
    const category = document.getElementById('newImageCategory').value;
    
    if(!title || !url) {
        alert('❌ الرجاء إدخال عنوان ورابط الصورة');
        return;
    }
    
    window.siteData.projects.push({
        id: Date.now().toString(),
        title: title,
        img: url,
        category: category || "عام"
    });
    
    localStorage.setItem('siteData', JSON.stringify(window.siteData));
    updateContent();
    alert('✅ تم إضافة الصورة بنجاح!');
    loadImagesList();
    location.reload();
}

function loadDeleteList() {
    const type = document.getElementById('deleteType').value;
    const container = document.getElementById('deleteList');
    
    let items = [];
    if(type === 'service') items = window.siteData.services;
    else if(type === 'pricing') items = window.siteData.pricing;
    else if(type === 'testimonial') items = window.siteData.testimonials;
    else if(type === 'project') items = window.siteData.projects;
    
    container.innerHTML = items.map(item => `
        <div class="delete-item">
            <span>${item.title || item.name || 'عنصر'}</span>
            <button onclick="deleteItem('${type}', '${item.id}')" class="delete-btn"><i class="fas fa-trash"></i> حذف</button>
        </div>
    `).join('');
    
    if(items.length === 0) container.innerHTML = '<p style="color:#888;">لا توجد عناصر لحذفها</p>';
}

function deleteItem(type, id) {
    if(confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
        if(type === 'service') window.siteData.services = window.siteData.services.filter(i => i.id !== id);
        else if(type === 'pricing') window.siteData.pricing = window.siteData.pricing.filter(i => i.id !== id);
        else if(type === 'testimonial') window.siteData.testimonials = window.siteData.testimonials.filter(i => i.id !== id);
        else if(type === 'project') window.siteData.projects = window.siteData.projects.filter(i => i.id !== id);
        
        localStorage.setItem('siteData', JSON.stringify(window.siteData));
        updateContent();
        alert('✅ تم الحذف بنجاح!');
        loadDeleteList();
        location.reload();
    }
}

function loadImagesList() {
    const container = document.getElementById('imagesList');
    container.innerHTML = window.siteData.projects.map(img => `
        <div class="delete-item">
            <div style="display:flex; gap:10px; align-items:center;">
                <div style="width:50px; height:50px; background:url('${img.img}') center/cover; border-radius:10px;"></div>
                <span>${img.title}</span>
            </div>
            <button onclick="deleteItem('project', '${img.id}')" class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
}

function loadCommentsManage() {
    const container = document.getElementById('commentsManageList');
    container.innerHTML = window.siteData.comments.map((c, idx) => `
        <div class="delete-item">
            <div><strong>${c.name}</strong><br><small>${c.text}</small></div>
            <button onclick="deleteComment(${idx})" class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');
    
    if(window.siteData.comments.length === 0) container.innerHTML = '<p style="color:#888;">لا توجد تعليقات حالياً</p>';
}

function deleteComment(index) {
    if(confirm('هل تريد حذف هذا التعليق؟')) {
        window.siteData.comments.splice(index, 1);
        localStorage.setItem('siteData', JSON.stringify(window.siteData));
        loadCommentsManage();
        displayComments();
    }
}

window.deleteItem = deleteItem;
window.deleteComment = deleteComment;