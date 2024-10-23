from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import io

app = Flask(__name__)

# Uncomment and modify the following line if necessary
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    try:
        # Read the image file into memory
        img_bytes = file.read()
        image = Image.open(io.BytesIO(img_bytes))  # Open the image from bytes
        text = pytesseract.image_to_string(image)  # Perform OCR
        return jsonify({"OCR Result": text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
