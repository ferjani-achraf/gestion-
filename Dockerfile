# الصورة الأساسية فيها Node.js
FROM node:20

# تحديد مجلد العمل داخل الكونتينر
WORKDIR /app

# نسخ ملفات package.json وتثبيت المكتبات
COPY package*.json ./
RUN npm install

# نسخ بقية الكود
COPY . .

# تحديد البورت إلي يسمع فيه السيرفر
EXPOSE 3000

# تشغيل التطبيق
CMD ["node", "server.js"]
