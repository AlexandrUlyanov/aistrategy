from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import ssl
import certifi


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection with SSL configuration
mongo_url = os.environ['MONGO_URL']

# Parse connection string and add necessary SSL parameters
import ssl

# Create MongoDB client with proper SSL settings
client = AsyncIOMotorClient(
    mongo_url,
    tls=True,
    tlsAllowInvalidCertificates=True,  # Temporary for testing
    tlsCAFile=certifi.where(),  # Use certifi's CA bundle
    serverSelectionTimeoutMS=10000,
    connectTimeoutMS=10000,
    socketTimeoutMS=10000
)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Models
class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: str = ""
    message: str
    language: str = "en"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    company: str = ""
    message: str
    language: str = "en"

# Email sending function
async def send_contact_email(contact: ContactForm):
    try:
        # Email configuration
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        sender_email = os.environ.get('SMTP_EMAIL', 'noreply@aureumdigital.com')
        sender_password = os.environ.get('SMTP_PASSWORD', '')
        recipient_email = "ulyanov.ht@gmail.com"

        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f"New Contact from {contact.name} - AUREUM DIGITAL"
        msg['From'] = sender_email
        msg['To'] = recipient_email

        # HTML content
        html_content = f"""
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2c2c2c;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 20px;">
                <h2 style="color: #2c2c2c; margin: 0;">AUREUM DIGITAL</h2>
                <p style="color: #D4AF37; margin: 5px 0 0 0;">New Contact Form Submission</p>
              </div>
              
              <div style="background: #fafafa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0;"><strong>Name:</strong> {contact.name}</p>
                <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:{contact.email}" style="color: #D4AF37;">{contact.email}</a></p>
                <p style="margin: 0 0 10px 0;"><strong>Company:</strong> {contact.company if contact.company else 'Not provided'}</p>
                <p style="margin: 0 0 10px 0;"><strong>Language:</strong> {contact.language.upper()}</p>
                <p style="margin: 0;"><strong>Date:</strong> {contact.timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
              </div>
              
              <div style="background: white; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
                <h3 style="color: #2c2c2c; margin-top: 0;">Message:</h3>
                <p style="color: #666; white-space: pre-wrap;">{contact.message}</p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; color: #999; font-size: 12px;">
                <p>AUREUM DIGITAL © 2025 | San Sebastián, Spain</p>
              </div>
            </div>
          </body>
        </html>
        """

        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)

        # Send email
        if sender_password:  # Only try to send if password is configured
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
            server.quit()
            logger.info(f"Email sent successfully to {recipient_email}")
            return True
        else:
            logger.warning("SMTP credentials not configured, email not sent")
            return False
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/contact", response_model=ContactForm)
async def create_contact(input: ContactFormCreate):
    logger.info(f"New contact form submission from {input.name} <{input.email}>")
    
    # Create contact object
    contact_dict = input.dict()
    contact_obj = ContactForm(**contact_dict)
    
    # Save to database
    await db.contacts.insert_one(contact_obj.dict())
    
    # Send email notification
    email_sent = await send_contact_email(contact_obj)
    
    if not email_sent:
        logger.warning("Email notification was not sent (SMTP not configured)")
    
    return contact_obj

@api_router.get("/contacts", response_model=List[ContactForm])
async def get_contacts(limit: int = 100):
    contacts = await db.contacts.find().sort("timestamp", -1).limit(limit).to_list(limit)
    return [ContactForm(**contact) for contact in contacts]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()