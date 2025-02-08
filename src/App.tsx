import React, { useState, ChangeEvent } from 'react';
import { jsPDF } from 'jspdf';
import './App.css';
import RobotoFont from './fonts/Roboto-Regular.ttf';
import Rating from './Rating';

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

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');

      // создаем PDF с нужной ориентацией
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm'
      });

      // добавляем поддержку кириллицы
      pdf.addFont(RobotoFont, 'Roboto', 'normal');
      pdf.setFont('Roboto');

      // устанавливаем отступы и максимальную высоту страницы в зависимости от ориентации
      const margin = 10;
      const maxPageHeight = isLandscape ? 210 : 297;
      const maxLineWidth = isLandscape ? 2.8*277 : 3*190;
      let y = margin;
      const x = margin;

      lines.forEach((line) => {
        // если текст не помещается на текущей странице, добавляем новую
        if (y > maxPageHeight - margin) {
          pdf.addPage();
          y = margin;
        }

        // получаем фактическую ширину строки
        const lineWidth = pdf.getStringUnitWidth(line) * pdf.getFontSize();

        // если строка слишком длинная, разбиваем её на части
        if (lineWidth > maxLineWidth) {
          const words = line.split(' ');
          let currentLine = '';

          words.forEach((word) => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const testWidth = pdf.getStringUnitWidth(testLine) * pdf.getFontSize();

            //console.log(`Line width: ${testWidth}mm, Max width: ${maxLineWidth}mm, Text: ${testLine}`);
            if (testWidth > maxLineWidth) {
              pdf.text(currentLine, x, y);
              y += 7; 
              if (y > maxPageHeight - margin) {
                pdf.addPage();
                y = margin;
              }
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          });

          if (currentLine) {
            pdf.text(currentLine, x, y);
            y += 7;
          }
        } else {
          pdf.text(line, x, y);
          y += 7;
        }
      });

      // создаем URL для скачивания PDF
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      //// для расширения Chrome: открываем PDF в новой вкладке
      //if (chrome?.tabs) {
      //  chrome.tabs.create({ url: url });
      //}
    };

    reader.readAsText(selectedFile, 'UTF-8'); // явно указываем кодировку UTF-8
  };

  return (
    <div className={`w-[400px] ${pdfUrl ? 'h-[440px]' : 'h-[400px]'} bg-gray-100 p-4`}>
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
            <a
              href={pdfUrl}
              download="converted.pdf"
              className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-base font-medium" // добавили text-base font-medium
            >
              Download
            </a>
          )}

          <Rating />

        </div>
      </div>
    </div>
  )
}

export default App
