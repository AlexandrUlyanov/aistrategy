# 🔧 Backend документация

## Обзор

Backend построен на FastAPI с использованием MongoDB для хранения данных.

**Расположение**: `/app/backend/server.py`

---

## Структура server.py

### Импорты

```python
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
```

**Ключевые библиотеки**:
- `FastAPI` - Веб-фреймворк
- `Motor` - Асинхронный драйвер MongoDB
- `Pydantic` - Валидация данных
- `CORSMiddleware` - Поддержка CORS

---

## Настройка приложения

### 1. Загрузка переменных окружения

```python
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')
```

**Переменные в `.env`**:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=globalscale_agency
```

### 2. Подключение к MongoDB

```python
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]
```

**Объяснение**:
- `AsyncIOMotorClient` - Асинхронное подключение
- `db` - Объект базы данных
- Коллекции создаются автоматически при первой записи

### 3. Создание приложения

```python
app = FastAPI()                           # Основное приложение
api_router = APIRouter(prefix="/api")    # Роутер с префиксом
```

**Почему роутер?**
- Все API эндпоинты будут начинаться с `/api`
- Лучшая организация кода
- Соответствует Kubernetes ingress правилам

---

## Pydantic модели

### StatusCheck - Модель проверки статуса

```python
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str
```

**Объяснение полей**:

#### `id: str = Field(default_factory=...)`
```python
default_factory=lambda: str(uuid.uuid4())
```
- Генерирует уникальный ID
- Пример: `"550e8400-e29b-41d4-a716-446655440000"`

#### `timestamp: datetime = Field(default_factory=datetime.utcnow)`
- Автоматически устанавливает текущее время UTC
- Пример: `2025-02-22T10:30:00.123456`

**Зачем две модели?**
- `StatusCheckCreate` - для входных данных (без id и timestamp)
- `StatusCheck` - для ответа (со всеми полями)

---

## API эндпоинты

### 1. GET / - Проверка работы API

```python
@api_router.get("/")
async def root():
    return {"message": "Hello World"}
```

**Использование**:
```bash
curl http://localhost:8001/api/
```

**Ответ**:
```json
{
  "message": "Hello World"
}
```

### 2. POST /status - Создание записи

```python
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    # Преобразование в словарь
    status_dict = input.dict()
    
    # Создание полной модели (с id и timestamp)
    status_obj = StatusCheck(**status_dict)
    
    # Сохранение в MongoDB
    _ = await db.status_checks.insert_one(status_obj.dict())
    
    # Возврат созданного объекта
    return status_obj
```

**Использование**:
```bash
curl -X POST http://localhost:8001/api/status \
  -H "Content-Type: application/json" \
  -d '{"client_name": "GlobalScale Agency"}'
```

**Ответ**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "client_name": "GlobalScale Agency",
  "timestamp": "2025-02-22T10:30:00.123456"
}
```

**Что происходит**:
1. Pydantic валидирует входные данные
2. Создается объект с автогенерируемыми id и timestamp
3. Данные сохраняются в MongoDB
4. Возвращается JSON с полными данными

### 3. GET /status - Получение всех записей

```python
@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Получение всех записей (максимум 1000)
    status_checks = await db.status_checks.find().to_list(1000)
    
    # Преобразование в Pydantic модели
    return [StatusCheck(**status_check) for status_check in status_checks]
```

**Использование**:
```bash
curl http://localhost:8001/api/status
```

**Ответ**:
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "client_name": "GlobalScale Agency",
    "timestamp": "2025-02-22T10:30:00.123456"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "client_name": "Another Client",
    "timestamp": "2025-02-22T11:00:00.654321"
  }
]
```

---

## Middleware

### CORS конфигурация

```python
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],           # В production: [конкретные домены]
    allow_methods=["*"],           # GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],           # Content-Type, Authorization, etc.
)
```

**Что такое CORS?**
- Cross-Origin Resource Sharing
- Позволяет frontend (порт 3000) делать запросы к backend (порт 8001)
- Без CORS браузер блокирует запросы

**Production настройки**:
```python
allow_origins=[
    "https://globalscale.agency",
    "https://www.globalscale.agency"
]
```

---

## Логирование

```python
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
```

**Использование в эндпоинтах**:
```python
@api_router.post("/contact")
async def create_contact(input: ContactFormCreate):
    logger.info(f"New contact form submission from {input.email}")
    try:
        # Логика...
        return {"success": True}
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise
```

---

## Lifecycle хуки

### Закрытие подключения при остановке

```python
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("MongoDB connection closed")
```

**Когда вызывается**:
- При остановке сервера (Ctrl+C)
- При рестарте
- Graceful shutdown

---

## Расширение API

### Добавление эндпоинта для контактной формы

```python
# Модели
class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str = ""              # Опциональное поле
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    language: str = "en"
    status: str = "new"             # new, processed, replied

class ContactFormCreate(BaseModel):
    name: str
    email: str
    company: str = ""
    message: str
    language: str = "en"

# Эндпоинт
@api_router.post("/contact", response_model=ContactForm)
async def create_contact(input: ContactFormCreate):
    # Логирование
    logger.info(f"New contact from {input.name} <{input.email}>")
    
    # Создание объекта
    contact_dict = input.dict()
    contact_obj = ContactForm(**contact_dict)
    
    # Сохранение в базе
    await db.contacts.insert_one(contact_obj.dict())
    
    # Отправка email уведомления
    try:
        await send_email_notification(contact_obj)
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
    
    return contact_obj

# Получение всех контактов (для админ-панели)
@api_router.get("/contacts", response_model=List[ContactForm])
async def get_contacts(
    status: str = None,           # Фильтр по статусу
    limit: int = 100,
    skip: int = 0
):
    # Формирование запроса
    query = {}
    if status:
        query["status"] = status
    
    # Получение с пагинацией
    contacts = await db.contacts.find(query).skip(skip).limit(limit).to_list(limit)
    return [ContactForm(**contact) for contact in contacts]
```

---

## Email уведомления

### Использование SendGrid

```python
import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content

async def send_email_notification(contact: ContactForm):
    sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
    
    # Создание письма
    from_email = Email("noreply@globalscale.agency")
    to_email = To("contact@globalscale.agency")
    subject = f"New Contact Form: {contact.name}"
    
    content = Content(
        "text/html",
        f"""
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Company:</strong> {contact.company or 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>{contact.message}</p>
        """
    )
    
    mail = Mail(from_email, to_email, subject, content)
    
    # Отправка
    response = sg.client.mail.send.post(request_body=mail.get())
    
    return response.status_code
```

---

## Обработка ошибок

### Пользовательские ошибки

```python
from fastapi import HTTPException, status

@api_router.get("/contact/{contact_id}")
async def get_contact(contact_id: str):
    contact = await db.contacts.find_one({"id": contact_id})
    
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Contact with id {contact_id} not found"
        )
    
    return ContactForm(**contact)
```

### Глобальный обработчик ошибок

```python
from fastapi import Request
from fastapi.responses import JSONResponse

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc) if os.getenv("DEBUG") else "An error occurred"
        }
    )
```

---

## Автодокументация API

FastAPI автоматически генерирует документацию:

- **Swagger UI**: http://localhost:8001/docs
- **ReDoc**: http://localhost:8001/redoc

### Добавление описаний

```python
@api_router.post(
    "/contact",
    response_model=ContactForm,
    summary="Create new contact form submission",
    description="Submit a contact form with name, email, and message",
    tags=["contacts"]
)
async def create_contact(input: ContactFormCreate):
    """Create a new contact form submission.
    
    Args:
        input: Contact form data (name, email, message)
    
    Returns:
        Created contact object with id and timestamp
    
    Raises:
        HTTPException: 400 if validation fails
    """
    pass
```

---

## Запуск сервера

### Разработка

```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Опции**:
- `--reload` - Автоматическая перезагрузка при изменениях
- `--host 0.0.0.0` - Доступ со всех интерфейсов
- `--port 8001` - Порт

### Production

```bash
gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8001
```

**Опции**:
- `-w 4` - 4 рабочих процесса
- `-k uvicorn.workers.UvicornWorker` - Использовать Uvicorn worker

---

## Тестирование

### С pytest

```python
import pytest
from httpx import AsyncClient
from server import app

@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/api/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

@pytest.mark.asyncio
async def test_create_status_check():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post(
            "/api/status",
            json={"client_name": "Test Client"}
        )
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["client_name"] == "Test Client"
```

---

**Следующий раздел**: [STYLES.md](./STYLES.md) - Стили и анимации