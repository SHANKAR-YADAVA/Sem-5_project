from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pytesseract
from PIL import Image
import io
from deep_translator import GoogleTranslator
from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Load environment variables
load_dotenv()

# Retrieve Groq API key
groq_api_key = os.getenv("GROQ_API_KEY")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize global variables to store translated text
translated_text_en = ""

# Route for index page
@app.route('/')
def index():
    return render_template('index.html')

# Route for uploading an image and performing OCR + translation
@app.route('/upload', methods=['POST'])
def upload_image():
    global translated_text_en  # Declare as global to modify the variable

    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Read the image file into memory
        img_bytes = file.read()
        image = Image.open(io.BytesIO(img_bytes))

        # Perform OCR using Tesseract to extract text
        text = pytesseract.image_to_string(image)

        # Translate the extracted text to English, Hindi, and Marathi
        translator_en = GoogleTranslator(source='auto', target='en')
        translator_hi = GoogleTranslator(source='auto', target='hi')
        translator_mr = GoogleTranslator(source='auto', target='mr')

        translated_text_en = translator_en.translate(text)  # Translate to English
        translated_text_hi = translator_hi.translate(text)  # Translate to Hindi
        translated_text_mr = translator_mr.translate(text)  # Translate to Marathi

        # Return OCR and translated text
        return jsonify({
            "OCR Result": text,
            "Translated to English": translated_text_en,
            "Translated to Hindi": translated_text_hi,
            "Translated to Marathi": translated_text_mr
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route for chatbot interaction
@app.route('/chatbot', methods=['POST'])
def chatbot():
    global translated_text_en  # Access the global variable

    try:
        # Get user input
        user_input = request.json.get("message")
        if not user_input:
            return jsonify({"error": "No message provided"}), 400

        # Check if there's translated text available
        if not translated_text_en:
            return jsonify({"error": "No translated text found"}), 400

        # Initialize Groq model
        model = ChatGroq(model="Gemma2-9b-It", groq_api_key=groq_api_key)

        # Create prompt for chatbot based on OCR-translated text
        prompt = ChatPromptTemplate.from_messages([
    ("system", f"The following text has been extracted and translated into English: {translated_text_en}. This text represents a form that the user needs assistance with. Please help the user understand the form, explain each section, and guide them in filling it out accurately based on the translated text."),
    ("user", f"User: {user_input}"),
    ("assistant", "How can I assist you with the form? Please specify which section you need help with or ask any questions you have.")
])

        # Initialize output parser
        parser = StrOutputParser()

        # Create a chain combining the prompt, model, and parser
        chain = prompt | model | parser

        # Get chatbot response
        response = chain.invoke({"text": user_input})

        # Return chatbot response
        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Start Flask app
if __name__ == '__main__':
    app.run(debug=True)
