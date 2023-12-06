import speech_recognition as sr
import logging
from pydub import AudioSegment
import editdistance
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import moviepy.editor as moviepy

recognizer = sr.Recognizer()

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)
CORS(app)

def convert_mp3_to_wav(webm_file, wav_file):
    try:
        input_file = "C:\\Users\\sahil\\OneDrive\\Desktop\\project\\regional-language-learning\\recorded_audio.webm"
        output_file = "C:\\Users\\sahil\\OneDrive\\Desktop\\project\\regional-language-learning\\output_file.wav"

         # Define the ffmpeg command
        command = f'ffmpeg -i "{input_file}" -ar 44100 -ac 2 -vn "{output_file}"'

        # Execute the command
        os.system(command)
       
        # audio = AudioSegment.from_mp3(mp3_file)
        # audio.export(wav_file, format="wav")
    except Exception as e:
        print(f"Error during MP3 to WAV conversion: {e}")
        raise e

def calculate_partial_similarity(word1, word2):
    distance = editdistance.eval(word1, word2)
    max_length = max(len(word1), len(word2))
    similarity_score = 1 - (distance / max_length)
    similarity_percentage = round(similarity_score * 100, 2)
    print("=============================> Similarity scores are ", similarity_percentage)
    return similarity_percentage

@app.route('/upload-audio', methods=['POST'])
def upload_audio():
    try:
        audio_file = request.files['audio']
        text1 = "Anaar"
        text2 = str()
        audio_file.save('recorded_audio.webm')
        # print(audio_file)
        try:
            convert_mp3_to_wav(audio_file, 'recorded_audio2.wav')
        except Exception as conversion_error:
            return f'MP3 to WAV conversion failed: {str(conversion_error)}', 500

        with sr.AudioFile('output_file.wav') as source:
            audio_text = recognizer.listen(source)
            try:
                text2 = recognizer.recognize_google(audio_text)
            except sr.UnknownValueError:
                print('Speech Recognition could not understand audio')
                return "Recognition failed", 400

        similarity_score = calculate_partial_similarity(text1, text2)
        resp = {"sim_score": similarity_score}
        os.remove("C:\\Users\\sahil\\OneDrive\\Desktop\\project\\regional-language-learning\\recorded_audio.webm")
        os.remove("C:\\Users\\sahil\\OneDrive\\Desktop\\project\\regional-language-learning\\output_file.wav")
        # return str(similarity_score)
        return jsonify(resp)

    except Exception as e:
        print(e)
        return f'Error: {str(e)}', 500

if __name__ == '__main__':
    app.run(debug=True)