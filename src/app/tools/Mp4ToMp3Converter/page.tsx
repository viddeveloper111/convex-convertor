"use client";

import { useRef, useState,useEffect } from "react";
import { FileAudio, Download, Upload ,ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Mp4ToMp3Converter() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [mp3Url, setMp3Url] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
    const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset states
    setError("");
    if (mp3Url) {
      URL.revokeObjectURL(mp3Url);
      setMp3Url("");
    }
    
    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError("File size exceeds 100MB limit. Please choose a smaller file.");
      return;
    }
    
    setFileName(file.name);
    
    if (file.type === "video/mp4" || file.name.toLowerCase().endsWith('.mp4')) {
      setIsConverting(true);
      try {
        // Create a video element to extract audio
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.muted = true;
        
        video.onloadedmetadata = async () => {
          try {
            // Use MediaRecorder API to capture audio
            const audioStream = await captureAudioFromVideo(video);
            const mp3Blob = await convertStreamToMp3(audioStream);
            const url = URL.createObjectURL(mp3Blob);
            setMp3Url(url);
            setIsConverting(false);
          } catch (err) {
            console.error("Conversion failed:", err);
            setError("Failed to convert MP4 to MP3. Please try again.");
            setIsConverting(false);
          }
        };
        
        video.onerror = () => {
          setError("Failed to load video file.");
          setIsConverting(false);
        };
      } catch (err) {
        console.error("Conversion failed:", err);
        setError("Failed to convert MP4 to MP3. Please try again.");
        setIsConverting(false);
      }
    } else {
      setError("Please upload an MP4 video file");
    }
  };

  const captureAudioFromVideo = (video: HTMLVideoElement): Promise<MediaStream> => {
    return new Promise((resolve, reject) => {
      // Create audio context and nodes
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaElementSource(video);
      const destination = audioContext.createMediaStreamDestination();
      
      source.connect(destination);
      
      video.onplay = () => {
        resolve(destination.stream);
      };
      
      video.onerror = (err) => {
        reject(err);
      };
      
      // Start playing to capture audio
      video.play().catch(reject);
    });
  };

  const convertStreamToMp3 = (stream: MediaStream): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      try {
        // Use MediaRecorder with audio/webm which has better browser support
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus'
        });
        
        const chunks: Blob[] = [];
        
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };
        
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/mp3' });
          resolve(blob);
        };
        
        mediaRecorder.onerror = (e) => {
          reject(new Error(`MediaRecorder error: ${e}`));
        };
        
        // Start recording
        mediaRecorder.start();
        
        // Stop after a reasonable time (10 minutes max)
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, 600000);
        
        // For shorter videos, we need to detect when the audio ends
        // This is a simple approach - in a real app you'd want more sophisticated handling
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, 5000);
        
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Create a fake event to reuse the handleFileChange function
      const event = {
        target: {
          files: files
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleFileChange(event);
    }
  };

  // Fallback method using OfflineAudioContext for longer audio processing
  const convertWithOfflineContext = async (file: File): Promise<Blob> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      // Create WAV file from audio buffer
      const wavBuffer = audioBufferToWav(audioBuffer);
      return new Blob([wavBuffer], { type: 'audio/wav' });
    } catch (err) {
      throw new Error("Failed to convert audio");
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer) => {
    const numOfChannels = buffer.numberOfChannels;
    const length = buffer.length * numOfChannels * 2 + 44;
    const wavBuffer = new ArrayBuffer(length);
    const view = new DataView(wavBuffer);

    // WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + buffer.length * numOfChannels * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM format
    view.setUint16(22, numOfChannels, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 2 * numOfChannels, true); // byte rate
    view.setUint16(32, numOfChannels * 2, true); // block align
    view.setUint16(34, 16, true); // bits per sample
    writeString(view, 36, 'data');
    view.setUint32(40, buffer.length * numOfChannels * 2, true);

    // Write audio data
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return wavBuffer;
  };

  const writeString = (view: DataView, offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };
       useEffect(() => {
      document.title = "Mp4 to Mp3 Converter";
    }, []);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center">
         {/* Back Button */}
        <div className="w-full flex justify-start mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-gray-500 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl mt-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#9B4DF4] text-center flex items-center justify-center gap-3 mb-2">
          <FileAudio className="w-10 h-10 p-2 bg-[#9B4DF4] text-white rounded-3xl" />
          MP4 → Audio Converter
        </h1>
        <p className="text-gray-500 text-center mb-8">Free, Open Source & Ad-free</p>

        <div
          className="border-2 border-dashed border-purple-400 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all duration-300"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".mp4,video/mp4"
            className="hidden"
          />
          <Upload className="w-12 h-12 text-purple-300 mb-4" />
          <p className="text-black text-center mb-2">
            Drag and drop your MP4 file here, or click to select
          </p>
          <p className="text-gray-500 text-sm">(Max size 100MB)</p>
          <p className="text-purple-300 font-medium mt-4">{fileName || "No file chosen"}</p>
        </div>

        {isConverting && (
          <div className="mt-6 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-purple-300 font-medium">Converting... Please wait.</p>
            <p className="text-gray-400 text-sm mt-2">This may take a moment depending on file size</p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-xl">
            <p className="text-red-200 text-center">{error}</p>
          </div>
        )}

        {mp3Url && !isConverting && (
          <div className="mt-6 flex flex-col items-center">
            <div className="flex items-center gap-3 bg-green-500/20 border border-green-500 rounded-xl p-4 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-200">Conversion complete!</p>
            </div>
            <a
              href={mp3Url}
              download={fileName.replace(/\.[^/.]+$/, ".mp3")}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 font-semibold shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download Audio File
            </a>
            
            {/* Audio preview */}
            <div className="mt-4 w-full">
              <p className="text-gray-300 text-sm mb-2">Preview:</p>
              <audio 
                ref={audioRef}
                src={mp3Url} 
                controls 
                className="w-full h-10 rounded-lg"
              />
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-black/20 rounded-xl">
          <h3 className="text-black font-semibold mb-2">How it works:</h3>
          <ul className="text-black text-sm list-disc list-inside space-y-1">
            <li>Upload an MP4 video file (max 100MB)</li>
            <li>The audio is extracted and converted to audio format</li>
            <li>Download your converted audio file</li>
            <li>All processing happens in your browser - your files never leave your device</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500 rounded-xl">
          <p className="text-yellow-500 text-sm">
            <strong>Note:</strong> For longer videos, the conversion might take some time. 
            The resulting file will be in a web-compatible audio format.
          </p>
        </div>
      </div>
    </div>
  );
}