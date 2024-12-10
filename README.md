# 🧪 [Laboratuvar Raporlama Sistemi](https://github.com/sumeyycakir/Laboratuvar_Raporlama_Sistemi/issues)

Laboratuvar Raporlama Sistemi, laborantların ve adminlerin hasta verilerini ve departmanlarını kolayca yönetmesine olanak tanıyan bir web uygulamasıdır.  


---

## 📌 Proje Özellikleri  

## 🎛️ Admin Paneli  
- Laborant ekleme, silme, güncelleme ve tüm laborantları görüntüleme yetkisi.
- - Hastaları ekleme, silme ve güncelleme yetkisi.  
- **Departman Yönetimi**:  
  - Yeni departmanlar ekleme ve mevcutları silme/güncelleme yetkisi.  
  - Laborantları belirli departmanlara atama özelliği.  

### 👩‍🔬 Laborant Paneli  
- Hastaları ekleme ve güncelleme yetkisi.  
- Kullanıcı şifresini değiştirme özelliği.  

---
## Sistem Gereksinimleri
- Node.js: Node.js 14.17.3 veya üstü kurulu olmalı.
- MongoDB Atlas: MongoDB veritabanı için bir MongoDB Atlas hesabı gereklidir.

---
## 🚀 Kurulum ve Çalıştırma  

### 1. Depoyu Klonlayın  
```bash
git clone  https://github.com/sumeyycakir/Laboratuvar_Raporlama_Sistemi.git
cd lms
```

---
## 🛠️ Derleme Ve Çalıştırma
1. Bağımlılıkları Yükleyin:
Backend ve frontend için gerekli olan bağımlılıkları yüklemek üzere 'lms' dizini içinde aşağıdaki komutları çalıştırın:

Backend için:

```bash
cd server
npm install
```

Frontend için:

```bash
cd frontend
npm install
```

2. Uygulamayı Çalıştırın: Her iki kısmı ayrı ayrı çalıştırmanız gerekmektedir.

Frontend için:

```bash
npm run dev
```
Tarayıcınızda http://localhost:5000 adresine giderek uygulamayı login sayfasında görüntüleyebilirsiniz.

Backend için:

```bash
npm start
```

---

## 🔐 Test Giriş Bilgileri  

### Admin Girişi  
- **E-posta**: `admin@gmail.com`  
- **Şifre**: `admin`  

---


## Ortam Değişkenlerini Yapılandırın

MongoDB URI'si:
MongoDB veritabanı bağlantısını kurabilmek için MongoDB Atlas hesabı oluşturmanız gerekiyor.
Hesabınızı oluşturduktan sonra, bağlantı URI'sini alabilirsiniz.
Server klasöründe bulunan .env dosyasını kendi verilerinizle doldurun.
```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lms
PORT=5000
JWT_SECRET=secret_key
```

