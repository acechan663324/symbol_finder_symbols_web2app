
import React, { useState, useMemo } from 'react';
import { FANCY_FONTS } from '../constants';

interface FancyTextGeneratorProps {
    onCopy: (text: string) => void;
}

const transformText = (text: string, map: { [key: string]: string }): string => {
    return text.split('').map(char => map[char] || char).join('');
};

const FancyTextGenerator: React.FC<FancyTextGeneratorProps> = ({ onCopy }) => {
    const [inputText, setInputText] = useState('Hello World');

    const generatedTexts = useMemo(() => {
        if (!inputText) return [];
        return FANCY_FONTS.map(font => ({
            ...font,
            outputText: transformText(inputText, font.map)
        }));
    }, [inputText]);

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
            <div>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type here to see magic..."
                    className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-lg text-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    rows={4}
                />
            </div>

            <div className="flex flex-col gap-4">
                {generatedTexts.map(({ name, description, outputText }) => (
                    <div key={name} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-lg text-indigo-400">{name}</h3>
                            <button
                                onClick={() => onCopy(outputText)}
                                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{description}</p>
                        <p className="text-xl break-words">{outputText}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FancyTextGenerator;
