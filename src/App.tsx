import React, { useState, ChangeEvent } from 'react';
import './App.css';
import RateUs from './RateUs';
import { PDFDocument, StandardFonts } from 'pdf-lib';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setPdfUrl(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files && files[0]) {
      // проверка, является ли файл текстовым
      if (files[0].type === 'text/plain' || files[0].name.endsWith('.txt')) {
        setSelectedFile(files[0]);
        setPdfUrl(null);
      } else {
        alert('Please drop only TXT files!');
      }
    }
  };

  const convertToPdf = async () => {
    if (!selectedFile) return;

    try {
      const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;

      // создаем PDF с нужной ориентацией
      const pdf = await PDFDocument.create();
      const page = pdf.addPage(isLandscape ? [842, 595] : [595, 842]);

      // добавляем шрифт 
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const fontSize = 12;

      // добавляем текст  
      const lines = text.split('\n');
      const margin = 50;
      let y = page.getHeight() - margin;
      
      page.setFont(font);
      page.setFontSize(fontSize);
      
      lines.forEach(line => {
        if (y > margin) {
          page.drawText(line, {
            x: margin,
            y: y,
            font,
            size: fontSize,
          });
          y -= fontSize * 1.2; // межстрочный интервал
        }
      });
      
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    }
    
    };

    reader.readAsText(selectedFile, 'UTF-8'); // явно указываем кодировку UTF-8
  };

  // Добавьте новую функцию для сохранения PDF
  const handleDownload = () => {
    if (pdfUrl) {
      const fileName = selectedFile ? selectedFile.name.replace('.txt', '.pdf') : 'converted.pdf';
      
      // Создаем невидимый элемент для скачивания
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={`w-[400px] ${pdfUrl ? 'h-[360px]' : 'h-[320px]'} bg-gray-100 p-4`}>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h1 className="text-xl font-bold text-center mb-4">
          Convert TXT to PDF
        </h1>

        <div className="space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
              isDragging
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-300 hover:border-indigo-400'
            }`}
          >
            
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {selectedFile
                  ? selectedFile.name
                  : 'Drag and drop TXT file here or click to select'}
              </p>
              {!selectedFile && (
                <p className="text-xs text-gray-500 mt-1">
                  Only .txt files are supported
                </p>
              )}
            </div>
          </div>

          {/* Добавляем переключатель ориентации */}
          <div className="flex items-center justify-between px-2">
            <span className="text-sm text-gray-600">Portrait</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox"
                className="sr-only peer"
                checked={isLandscape}
                onChange={(e) => setIsLandscape(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
            <span className="text-sm text-gray-600">Landscape</span>
          </div>

          <button
            onClick={convertToPdf}
            disabled={!selectedFile}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-base font-medium" // добавили text-base font-medium
          >
            Convert
          </button>

          {pdfUrl && (
            <button
              onClick={handleDownload}
              className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-base font-medium"
            >
              Download
            </button>
          )}
          <div className="flex items-center gap-2 justify-center w-full">
            <RateUs />
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default App;
