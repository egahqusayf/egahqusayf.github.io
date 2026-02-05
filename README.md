# Sentiment Analysis of YouTube Comments on the Indonesian Vice President

This project performs large-scale sentiment analysis on YouTube comments from the official
channel of the Indonesian Vice President (Gibran Rakabuming Raka) using a fine-tuned
XLM-RoBERTa model.

## Project Pipeline
1. Scraping 80,000+ YouTube comments using YouTube Data API v3
2. Manual annotation using a custom web-based annotation tool
3. Fine-tuning XLM-RoBERTa on annotated data
4. Inference on large-scale unlabeled comments
5. Visualization and analysis of public sentiment

## Dataset
- Total scraped comments: 80,000+
- Annotated data:
  - Negative (-1): 1000
  - Neutral (0): 800
  - Positive (1): 1000

## Annotation Tool
A lightweight Flask-based web application was developed to efficiently annotate
YouTube comments with real-time statistics and pagination.

**Features:**
- Batch pagination (20 comments per page)
- Realtime label statistics
- In-memory buffering before saving to Excel
- Visual feedback for annotated comments

## Model
- Base model: `xlm-roberta-base`
- Task: Multiclass sentiment classification (negative, neutral, positive)
- Framework: HuggingFace Transformers
- Training: Fine-tuning on manually annotated Indonesian-language comments

## Inference
The trained model was used to classify 80,000+ unlabeled comments using batch inference
on GPU for computational efficiency.

## Visualization
- Sentiment distribution pie chart
- Confidence-based analysis
- Sample qualitative inspection of predictions

## Tech Stack
- Python, Pandas, NumPy
- PyTorch, HuggingFace Transformers
- Flask (Annotation Tool)
- Matplotlib / Seaborn
- Google Colab

## Ethical Considerations
This project is intended strictly for academic research and public sentiment analysis.
No manipulation or targeted political campaigning is conducted.

## Author
**Egah Qusay Fatanasyah**  
Robotics & Artificial Intelligence Engineering  
Universitas Airlangga
