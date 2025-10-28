from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Google Cloud Firestore
from google.cloud import firestore
from google.oauth2 import service_account


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

app = FastAPI(title="AUREUM DIGITAL API")
api_router = APIRouter(prefix="/api")

# CORS configuration
origins = os.environ.get('CORS_ORIGINS', '*').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Firestore configuration
try:
    # Try to load service account key if provided
    credentials_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
    if credentials_path and os.path.exists(credentials_path):
        credentials = service_account.Credentials.from_service_account_file(credentials_path)
        db = firestore.Client(credentials=credentials)
    else:
        # Use default credentials (works on Cloud Run)
        db = firestore.Client()
    
    logging.info("✅ Firestore connection successful")
except Exception as e:
    logging.error(f"❌ Firestore connection failed: {e}")
    db = None


# Pydantic models
class ContactForm(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str = ""
    company: str = ""
    message: str
    language: str = "en"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    status: str = "healthy"


# API Routes
@api_router.get("/status")
async def get_status():
    """Health check endpoint"""
    firestore_status = "connected" if db else "disconnected"
    return {
        "status": "healthy",
        "service": "AUREUM DIGITAL API",
        "database": firestore_status,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }


@api_router.post("/contact")
async def submit_contact_form(contact: ContactForm):
    """Submit contact form and send email"""
    try:
        # Save to Firestore
        if db:
            contact_dict = contact.model_dump()
            # Convert datetime to string for Firestore
            contact_dict['created_at'] = contact_dict['created_at'].isoformat()
            
            # Save to Firestore collection 'contacts'
            doc_ref = db.collection('contacts').document(contact.id)
            doc_ref.set(contact_dict)
            logging.info(f"✅ Contact saved to Firestore: {contact.id}")
        
        # Send email notification
        try:
            smtp_email = os.environ.get('SMTP_EMAIL')
            smtp_password = os.environ.get('SMTP_PASSWORD')
            
            if smtp_email and smtp_password:
                msg = MIMEMultipart('alternative')
                msg['Subject'] = f"New Contact from AUREUM DIGITAL - {contact.name}"
                msg['From'] = smtp_email
                msg['To'] = "ulyanov.ht@gmail.com"
                
                # Email body
                text = f"""
                New Contact Form Submission
                
                Name: {contact.name}
                Email: {contact.email}
                Phone: {contact.phone}
                Company: {contact.company}
                Language: {contact.language}
                
                Message:
                {contact.message}
                
                Submitted: {contact.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}
                """
                
                html = f"""
                <html>
                <body style="font-family: Arial, sans-serif;">
                    <h2 style="color: #D4AF37;">New Contact from AUREUM DIGITAL</h2>
                    <p><strong>Name:</strong> {contact.name}</p>
                    <p><strong>Email:</strong> <a href="mailto:{contact.email}">{contact.email}</a></p>
                    <p><strong>Phone:</strong> {contact.phone}</p>
                    <p><strong>Company:</strong> {contact.company}</p>
                    <p><strong>Language:</strong> {contact.language}</p>
                    <hr>
                    <p><strong>Message:</strong></p>
                    <p>{contact.message}</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">Submitted: {contact.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
                </body>
                </html>
                """
                
                part1 = MIMEText(text, 'plain')
                part2 = MIMEText(html, 'html')
                msg.attach(part1)
                msg.attach(part2)
                
                # Send email via Gmail SMTP
                with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                    server.login(smtp_email, smtp_password)
                    server.send_message(msg)
                
                logging.info("✅ Email sent successfully")
        except Exception as email_error:
            logging.error(f"❌ Email sending failed: {email_error}")
            # Don't fail the whole request if email fails
        
        return {
            "success": True,
            "message": "Contact form submitted successfully",
            "id": contact.id
        }
    
    except Exception as e:
        logging.error(f"❌ Contact form submission failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/contacts")
async def get_contacts(limit: int = 50):
    """Get recent contacts (admin endpoint)"""
    try:
        if not db:
            raise HTTPException(status_code=503, detail="Database not available")
        
        # Get contacts from Firestore
        contacts_ref = db.collection('contacts')
        docs = contacts_ref.order_by('created_at', direction=firestore.Query.DESCENDING).limit(limit).stream()
        
        contacts = []
        for doc in docs:
            contact_data = doc.to_dict()
            contacts.append(contact_data)
        
        return {
            "success": True,
            "count": len(contacts),
            "contacts": contacts
        }
    
    except Exception as e:
        logging.error(f"❌ Failed to fetch contacts: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Include router
app.include_router(api_router)


# Startup event
@app.on_event("startup")
async def startup_db_client():
    logging.info("🚀 Starting AUREUM DIGITAL API...")
    if db:
        logging.info("✅ Firestore initialized")
    else:
        logging.warning("⚠️ Firestore not available")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_db_client():
    logging.info("👋 Shutting down AUREUM DIGITAL API...")