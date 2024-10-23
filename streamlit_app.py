import streamlit as st
import pytesseract
from PIL import Image
import requests

# Uncomment and modify the following line if necessary
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

st.title("Image Upload for OCR")

uploaded_file = st.file_uploader("Choose an image...", type=["png", "jpg", "jpeg"])

if uploaded_file is not None:
    # Open the uploaded image
    image = Image.open(uploaded_file)
    # Perform OCR using the Flask backend
    with st.spinner("Processing..."):
        # Convert the image to bytes and send it to the Flask backend
        response = requests.post('http://127.0.0.1:5000/upload', files={'image': uploaded_file})

        if response.status_code == 200:
            result = response.json()
            st.subheader("OCR Result:")
            st.write(result.get("OCR Result", "No result found."))
        else:
            # Print the raw response for debugging
            st.error("Error: " + str(response.status_code) + " - " + response.text)
