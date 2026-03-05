# English – Vietnamese Video Translation System using Machine Learning

![Poster](./images/Poster.png)

[![Watch video](https://img.youtube.com/vi/jTzVYh_J9I4/0.jpg)](https://www.youtube.com/watch?v=jTzVYh_J9I4)

[![Watch video](https://img.youtube.com/vi/dy5tgLu1FEo/1.jpg)](https://www.youtube.com/watch?v=dy5tgLu1FEo)
[![Watch video](https://img.youtube.com/vi/WmPpc6lNOSc/1.jpg)](https://www.youtube.com/watch?v=WmPpc6lNOSc)

## 1. Overview

This project is an end-to-end AI-powered web system that automatically translates English-speaking videos into Vietnamese and vice versa. while synchronizing the speaker’s lip movements with the translated speech.

Instead of relying on subtitles or traditional dubbing, the system produces a new video where:

- The semantic meaning is preserved

- The output speech is in Vietnamese, English

- The lip movements match the translated audio

This project demonstrates the integration of:

- Speech processing

- Natural Language Processing

- Computer Vision

- Web system architecture

into a single production-style pipeline.

## 2. Problem Statement

Most high-quality educational and media videos are produced in English, creating a language barrier for Vietnamese users.
Current solutions (subtitles and dubbing) suffer from:

- Cognitive overload (reading while watching)

- Audio–visual mismatch

- High production cost

The goal is to build an automatic system that:

- Translates spoken content

- Speech synthesis (especially in Vietnamese)

- Edits original videos so that speakers appear to be speaking a different language

- ## 3. Processing Pipeline
```bash
  Input Video (English)
        │
        ▼
Automatic Speech Recognition (ASR)
        │
        ▼
Machine Translation
        │
        ▼
Text-to-Speech and Voice Cloning
        │
        ▼
Lip Sync Model
        │
        ▼
Output Video (Vietnamese, Lip-synced)
```
Each stage is implemented as an independent module, allowing flexible replacement or upgrading of models.

## 4. System Architecture
The system follows a 3-tier architecture:

### 4.1 Frontend (Web UI)

- Upload videos

- Trigger processing pipeline

- Manage processed projects

- Admin dashboard

### 4.2 Backend API

- RESTful API

- Job orchestration

- Authentication & user management

- Database interaction

### 4.3 Cloud Services (AI Model Deployment)

- ASR service

- Translation service

- TTS service

- Lip-sync service

- Video/audio post-processing

## 5. Core Technologies

### 5.1 Speech & Language

- ASR: Whisper / WhisperX

- Translation: Transformer-based & LLM-based MT

- TTS: Zero-shot & multi-speaker Vietnamese TTS

### 5.2 Vision

- Lip-sync models: Wav2Lip, LatentSync, IP-LAP

- Face detection & landmark extraction

### 5.3 Backend & System

- REST API

- Background jobs

- SQL + NoSQL hybrid storage

- AWS S3 for media

- EC2 for model execution

### 5.4 Frontend

- Web-based UI

- Project management interface

- Admin monitoring panel

## 6. Key Features

- Video translation (English, Vietnamese)

- Speech-to-text

- Machine translation

- Vietnamese voice synthesis

- Lip synchronization

- Project history

- User & Admin roles

- Cloud-based processing

## 7. Evaluation

### 7.1 Quantitative Metrics

- Avg Entailment Prob / Avg Log-prob / Avg Perplexity – translation quality

- PSNR / SSIM – visual quality

- LSE-D / LSE-C – lip-sync accuracy

### 7.2 User Study

- Likert-scale surveys

- Evaluation of:

  - Naturalness

  - Output quality

  - Usability

Results indicate that the system is suitable for educational and content localization scenarios.

### 8. Assumptions & Limitations

- Only English and Vietnamese are supported

- Assumes:

  - Single speaker

  - Clear face

  - Low background noise

- Not designed for:

  - Multi-speaker videos

  - Heavy noise

  - Other languages

## 9. Future Work

- Multi-language support

- Real-time processing

- Multi-speaker handling

- Noise-robust ASR

- Emotion-preserving TTS

- Mobile-friendly UI

# Author

Duy Anh
