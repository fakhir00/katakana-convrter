from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sys

# Add local path to sys for imports if needed
sys.path.append(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)

# Attempt to load e2k
try:
    from e2k import C2K
    
    # Path to the downloaded models in api/models/
    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    c2k_path = os.path.join(models_dir, 'model-c2k.npz')
    
    # Instantiate C2K
    # Based on Patchethium/e2k usage, we may need to specify the path
    if os.path.exists(c2k_path):
        # The library usually looks for files in src/models/ or takes a path
        # If the library is installed via pip, it might be tricky.
        # We try to initialize it.
        try:
            c2k = C2K(path=c2k_path)
            print(f"Loaded C2K with path: {c2k_path}")
        except:
            c2k = C2K()
            print("Loaded C2K with default path")
    else:
        c2k = C2K()
        print("Model file not found in api/models, using default")
except Exception as e:
    print(f"Failed to initialize e2k: {e}")
    c2k = None

@app.route('/api/convert', methods=['GET', 'POST'])
def convert():
    if request.method == 'POST':
        data = request.get_json()
        text = data.get('text', '')
    else:
        text = request.args.get('text', '')

    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    if not c2k:
        return jsonify({"error": "e2k engine not initialized"}), 500
    
    try:
        # e2k performs best on lowercase English input
        result = c2k(text.lower().strip())
        return jsonify({
            "katakana": result,
            "engine": "e2k",
            "source": text
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Vercel entry point
def handler(request):
    return app(request)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
