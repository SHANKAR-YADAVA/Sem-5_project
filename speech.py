import speech_recognition as sr
import pyttsx3

# Initialize the text-to-speech engine
engine = pyttsx3.init()

def speak(text):
    engine.say(text)
    engine.runAndWait()

def listen():
    # Initialize the recognizer
    recognizer = sr.Recognizer()
    
    with sr.Microphone() as source:
        print("Please speak something...")
        # Adjust for ambient noise and record
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)
        
        try:
            # Recognize speech using Google Web Speech API
            command = recognizer.recognize_google(audio)
            print(f"You said: {command}")
            return command
        except sr.UnknownValueError:
            print("Sorry, I could not understand what you said.")
            speak("Sorry, I could not understand what you said.")
            return None
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")
            speak("Could not request results from the service.")
            return None

def main():
    while True:
        command = listen()
        if command:
            # Respond based on the recognized command
            if "hello" in command.lower():
                speak("Hello! How can I help you?")
            elif "exit" in command.lower():
                speak("Goodbye!")
                break
            else:
                speak("I didn't understand that.")

if __name__ == "__main__":
    main()
